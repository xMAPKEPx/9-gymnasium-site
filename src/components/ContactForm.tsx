import { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  return (
    <form className="flex flex-col gap-3 w-64">
      <label className="text-sm font-medium">Имя
        <input
          type="text"
          className="mt-1 border rounded px-2 py-1 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label className="text-sm font-medium">Телефон
        <input
          type="tel"
          className="mt-1 border rounded px-2 py-1 w-full"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </label>
      <label className="text-sm font-medium">Комментарий
        <textarea
          className="mt-1 border rounded px-2 py-1 w-full resize-none"
          rows={3}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
        disabled
      >
        Отправить
      </button>
    </form>
  );
};

export default ContactForm; 