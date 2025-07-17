import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { postMemory } from '../api/api';

const SECTIONS = [
  'История класса',
  'Люди девятки',
];

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  defaultYear?: string | number;
}

const initialState = {
  name: '',
  year: '',
  photo: null as File | null,
  story: '',
  attachTo: '',
};

const FeedbackModal = ({ open, onClose, defaultYear }: FeedbackModalProps) => {
  const [values, setValues] = useState({ ...initialState, year: defaultYear ? String(defaultYear) : '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    if (open) {
      setValues({ ...initialState, year: defaultYear ? String(defaultYear) : '' });
      setErrors({});
      setSubmitted(false);
    }
  }, [open, defaultYear]);

  const validate = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = 'Поле обязательно для заполнения';
    if (values.year && (+values.year < 1930 || +values.year > currentYear)) {
      newErrors.year = 'Некорректный год выпуска';
    }
    if (!values.attachTo) newErrors.attachTo = 'Выберите раздел';
    if (!values.story || values.story.length < 500 || values.story.length > 2000) {
      newErrors.story = 'Текст должен быть от 500 до 2000 символов';
    }
    if (values.photo) {
      if (!['image/jpeg', 'image/png'].includes(values.photo.type)) {
        newErrors.photo = 'Только JPG или PNG';
      }
      if (values.photo.size > 10 * 1024 * 1024) {
        newErrors.photo = 'Файл не больше 10MB';
      }
    }
    return newErrors;
  }, [values, currentYear]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value } = target;
    if (name === 'photo' && target instanceof HTMLInputElement && target.files) {
      setValues(v => ({ ...v, photo: target.files![0] ? target.files![0] : null }));
      setErrors(err => ({ ...err, photo: '' }));
    } else {
      setValues(v => ({ ...v, [name]: value }));
      setErrors(err => ({ ...err, [name]: '' }));
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setValues(v => ({ ...v, photo: e.dataTransfer.files[0] }));
      setErrors(err => ({ ...err, photo: '' }));
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await postMemory({
        Full_name: values.name,
        Graduate_year: values.year ? Number(values.year) : 0,
        Section: values.attachTo,
        Story: values.story,
        Photo: values.photo,
      });
      setSubmitted(true);
    } catch {
      setErrors({ form: 'Ошибка при отправке. Попробуйте позже.' });
    }
  }, [validate, values]);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // --- Условие после всех хуков ---
  if (!open) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl relative" onClick={handleModalClick}>
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose} aria-label="Закрыть">×</button>
          <div className="text-green-600 font-medium py-8 text-center text-lg">Спасибо за ваше воспоминание!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-3xl p-8 max-w-md w-full flex flex-col items-center shadow-xl relative"
        onClick={handleModalClick}
      >
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose} aria-label="Закрыть">×</button>
        <h2 className="text-2xl font-bold mb-8 text-center text-[#1A3E8A]">Отправить воспоминание</h2>
        <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
          {errors.form && (
            <div className="text-red-500 text-sm mb-2">{errors.form}</div>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-gray-700 mb-1">ФИО<span className="text-red-500">*</span></label>
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
            />
            {errors.year && <span id="year-error" className="text-red-500 text-xs mt-1">{errors.year}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700 mb-1">Фотография</label>
            <div
              className={`border-2 border-dashed rounded-xl px-4 py-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${dragActive ? 'border-blue-600 bg-blue-50' : 'border-blue-400 bg-blue-50'} ${errors.photo ? 'border-red-500' : ''}`}
              onClick={handleFileClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                ref={fileInputRef}
                type="file"
                name="photo"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleChange}
              />
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mb-2 text-[#1A3E8A]"><path fill="currentColor" d="M12 16a1 1 0 0 1-1-1V9.83l-1.88 1.88a1 1 0 1 1-1.42-1.42l3.59-3.59a1 1 0 0 1 1.42 0l3.59 3.59a1 1 0 1 1-1.42 1.42L13 9.83V15a1 1 0 0 1-1 1Z"/><path fill="currentColor" d="M19 18H5a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2Z"/></svg>
              {values.photo ? (
                <span className="text-gray-700 text-sm text-center">{values.photo.name}</span>
              ) : (
                <>
                  <span className="text-gray-700 text-base text-center">Перетащите файл сюда или нажмите для выбора</span>
                  <span className="text-gray-400 text-xs mt-1">JPG, PNG (макс. 10MB)</span>
                </>
              )}
            </div>
            {errors.photo && <span className="text-red-500 text-xs mt-1">{errors.photo}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="story" className="font-medium text-gray-700 mb-1">История</label>
            <textarea
              id="story"
              name="story"
              value={values.story}
              onChange={handleChange}
              placeholder="Расскажите о вашем школьном воспоминании..."
              className={`rounded-lg border border-gray-300 px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${errors.story ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.story}
              aria-describedby={errors.story ? 'story-error' : undefined}
              required
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{values.story.length} / 2000</span>
              {errors.story && <span id="story-error" className="text-red-500">{errors.story}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="attachTo" className="font-medium text-gray-700 mb-1">Куда прикрепляем</label>
            <select
              id="attachTo"
              name="attachTo"
              value={values.attachTo}
              onChange={handleChange}
              className={`rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${errors.attachTo ? 'border-red-500' : ''}`}
              aria-invalid={!!errors.attachTo}
              aria-describedby={errors.attachTo ? 'attachTo-error' : undefined}
              required
            >
              <option value="">Выберите раздел</option>
              {SECTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.attachTo && <span id="attachTo-error" className="text-red-500 text-xs mt-1">{errors.attachTo}</span>}
          </div>
          <button
            type="submit"
            aria-label="Отправить воспоминание"
            className={`block w-full py-2 text-base font-bold rounded-lg bg-[#1A3E8A] text-white hover:bg-[#23407C] focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 mt-2 ${Object.keys(validate()).length > 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={Object.keys(validate()).length > 0}
          >
            Отправить воспоминание
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal; 