import { useState } from 'react';

const ContactForm = () => {
  const [values, setValues] = useState({ name: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = 'Введите имя';
    if (!values.phone) newErrors.phone = 'Введите телефон';
    else if (!/^[-+() 0-9]+$/.test(values.phone)) newErrors.phone = 'Некорректный телефон';
    if (!values.message) newErrors.message = 'Введите сообщение';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  if (submitted) {
    return <div className="text-green-600 font-medium py-4 text-center">Спасибо за ваше сообщение!</div>;
  }

  return (
    <form className="w-full max-w-xl mx-auto flex flex-col gap-5" onSubmit={handleSubmit} aria-label="Форма обратной связи">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-medium text-gray-700 mb-1">Имя</label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
          className={`rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${errors.name ? 'border-red-500' : ''}`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          required
        />
        {errors.name && <span id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="font-medium text-gray-700 mb-1">Телефон</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={values.phone}
          onChange={handleChange}
          placeholder="Телефон"
          className={`rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${errors.phone ? 'border-red-500' : ''}`}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          required
        />
        {errors.phone && <span id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="subject" className="font-medium text-gray-700 mb-1">Тема</label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          placeholder="Тема"
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="font-medium text-gray-700 mb-1">Сообщение</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Сообщение"
          className={`rounded-lg border border-gray-300 px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${errors.message ? 'border-red-500' : ''}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          required
        />
        {errors.message && <span id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</span>}
      </div>
      <button
        type="submit"
        aria-label="Отправить сообщение"
        className="block w-full py-2 text-base font-medium rounded-lg bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
      >
        Отправить
      </button>
    </form>
  );
};

export default ContactForm; 