import { useState } from 'react';

interface VisitFormProps {
  open: boolean;
  onClose: () => void;
}

const initialState = {
  name: '',
  year: '',
  date: '',
  time: '',
  email: '',
};

function getNextThursday(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  // Если сегодня четверг (4), возвращаем сегодня
  if (day === 5) {
    d.setHours(0, 0, 0, 0);
    return d;
  }
  // Иначе ищем следующий четверг
  const diff = (12 - day) % 7; // 4 - day, но если day > 4, то до следующего четверга
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

const VisitForm = ({ open, onClose }: VisitFormProps) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const currentYear = new Date().getFullYear();

  // Ограничения для выбора даты только четвергами
  const minDate = getNextThursday();
  const maxDate = new Date(minDate);
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  // --- ВРЕМЕННЫЕ ОГРАНИЧЕНИЯ ---
  const now = new Date();
  const todayStr = formatDate(now);
  const isToday = values.date === todayStr;
  const isTodayThursday = now.getDay() === 4 && values.date === todayStr;
  const after15 = now.getHours() > 15 || (now.getHours() === 15 && now.getMinutes() > 0);

  // Если сегодня четверг и уже после 15:00 — нельзя выбрать сегодня
  let realMinDate = minDate;
  if (isTodayThursday && after15) {
    // minDate становится следующий четверг
    const next = new Date(minDate);
    next.setDate(next.getDate() + 7);
    realMinDate = next;
  }

  // Генерируем опции времени с учётом ограничения "не позднее чем за час до назначенного времени"
  const getAvailableTimeOptions = () => {
    const options = [];
    let hour = 10;
    let minute = 0;
    while (hour < 15 || (hour === 15 && minute === 0)) {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      const t = `${h}:${m}`;
      if (isToday) {
        // Время в формате HH:MM
        const visit = new Date(values.date + 'T' + t);
        const minAllowed = new Date(now.getTime() + 60 * 60 * 1000); // +1 час
        if (visit < minAllowed) {
          minute += 30;
          if (minute === 60) { minute = 0; hour++; }
          continue;
        }
      }
      options.push(t);
      minute += 30;
      if (minute === 60) { minute = 0; hour++; }
    }
    return options;
  };
  const timeOptions = getAvailableTimeOptions();

  if (!open) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = 'Поле обязательно для заполнения';
    const yearNum = Number(values.year);
    if (!values.year || isNaN(yearNum) || yearNum < 1930 || yearNum > currentYear) {
      newErrors.year = 'Некорректный год выпуска';
    }
    if (!values.date) {
      newErrors.date = 'Выберите дату';
    }
    if (!values.time || !timeOptions.includes(values.time)) {
      newErrors.time = 'Выберите время с 10:00 до 15:00';
    }
    if (!values.email) newErrors.email = 'Введите почту';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) newErrors.email = 'Некорректная почта';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    // Здесь отправка формы
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl relative" onClick={handleModalClick}>
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose} aria-label="Закрыть">×</button>
          <div className="text-green-600 font-medium py-8 text-center text-lg">Спасибо за вашу заявку!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl relative" onClick={handleModalClick}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose} aria-label="Закрыть">×</button>
        <h2 className="text-2xl font-bold text-center text-[#1A3E8A] mb-8">Запись на посещение</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-gray-700 mb-1">ФИО</label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              placeholder="Иванов Иван Иванович"
              className={`rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${errors.name ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              required
            />
            {errors.name && <span id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="year" className="font-medium text-gray-700 mb-1">Год выпуска</label>
            <input
              id="year"
              name="year"
              type="number"
              value={values.year}
              onChange={handleChange}
              placeholder="2024"
              min={1930}
              max={currentYear}
              className={`rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${errors.year ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.year}
              aria-describedby={errors.year ? 'year-error' : undefined}
              required
            />
            {errors.year && <span id="year-error" className="text-red-500 text-xs mt-1">{errors.year}</span>}
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="date" className="font-medium text-gray-700 mb-1">Дата посещения</label>
              <input
                id="date"
                name="date"
                type="date"
                value={values.date}
                onChange={handleChange}
                min={formatDate(realMinDate)}
                max={formatDate(maxDate)}
                step={7}
                className={`rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${errors.date ? 'border-red-500' : ''}`}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? 'date-error' : undefined}
                required
              />
              {errors.date && <span id="date-error" className="text-red-500 text-xs mt-1">{errors.date}</span>}
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="time" className="font-medium text-gray-700 mb-1">Время посещения</label>
              <select
                id="time"
                name="time"
                value={values.time}
                onChange={handleChange}
                className={`rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${errors.time ? 'border-red-500' : ''}`}
                aria-invalid={!!errors.time}
                aria-describedby={errors.time ? 'time-error' : undefined}
                required
              >
                <option value="">--:-- --</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.time && <span id="time-error" className="text-red-500 text-xs mt-1">{errors.time}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-gray-700 mb-1">Почта</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="example@mail.ru"
              className={`rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${errors.email ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              required
            />
            {errors.email && <span id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</span>}
          </div>
          <button
            type="submit"
            aria-label="Отправить заявку"
            className="block w-full py-2 text-base font-bold rounded-lg bg-[#1A3E8A] text-white hover:bg-[#23407C] focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 mt-2"
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisitForm; 