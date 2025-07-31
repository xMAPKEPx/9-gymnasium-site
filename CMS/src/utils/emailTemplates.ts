// Типы для "Новой заявки на посещение"
export interface VisitRequestData {
  full_name: string;
  graduation_year: string;
  visit_date: string;
  visit_time: string;
}

// Типы для "Нового воспоминания"
export interface MemoryFormData {
  full_name: string;
  graduation_year: string;
  form_theme: string;
  form_text: string;
  form_files?: string[]; // Массив ссылок или названий файлов
}

function escapeHtml(unsafe: any): string {
  if (typeof unsafe !== 'string') {
    return unsafe === undefined || unsafe === null ? '' : String(unsafe);
  }
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function renderVisitRequestTemplate(data: VisitRequestData): string {
  const template = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Новая заявка на посещение</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 15px; text-align: center; }
        .content { margin: 25px 0; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #495057; }
        .footer { color: #6c757d; font-size: 0.9em; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Новая заявка на посещение</h2>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="label">ФИО:</span> 
            <span>{full_name}</span>
          </div>
          <div class="field">
            <span class="label">Год выпуска:</span> 
            <span>{graduation_year}</span>
          </div>
          <div class="field">
            <span class="label">Дата:</span> 
            <span>{visit_date}</span>
          </div>
          <div class="field">
            <span class="label">Время:</span> 
            <span>{visit_time}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>Это письмо сгенерировано автоматически. Пожалуйста, не отвечайте на него.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return template
    .replace('{full_name}', escapeHtml(data.full_name))
    .replace('{graduation_year}', escapeHtml(data.graduation_year))
    .replace('{visit_date}', escapeHtml(data.visit_date))
    .replace('{visit_time}', escapeHtml(data.visit_time));
}

export function renderMemoryFormTemplate(data: MemoryFormData): string {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT ? `:${process.env.PORT}` : '';
  const protocol = process.env.PROTOCOL || 'http';
  const baseUrl = `${protocol}://${host}${port}`;
  const filesHtml = data.form_files && data.form_files.length > 0
    ? `<ul>${data.form_files.map(file => `<li><a href="${baseUrl}${file}" target="_blank">${baseUrl}${file}</a></li>`).join('')}</ul>`
    : 'Нет прикрепленных материалов';

  const template = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Новое воспоминание</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; }
        .header { background-color: #e6f7ff; padding: 15px; text-align: center; }
        .content { margin: 25px 0; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0056b3; }
        .text-block { background: #f1f9ff; padding: 15px; border-radius: 4px; }
        .footer { color: #6c757d; font-size: 0.9em; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Новое воспоминание</h2>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="label">ФИО:</span> 
            <span>{full_name}</span>
          </div>
          <div class="field">
            <span class="label">Год выпуска:</span> 
            <span>{graduation_year}</span>
          </div>
          <div class="field">
            <span class="label">Тема:</span> 
            <span>{form_theme}</span>
          </div>
          <div class="field">
            <span class="label">Текст:</span>
            <div class="text-block">{form_text}</div>
          </div>
          <div class="field">
            <span class="label">Прикрепляемые материалы:</span> 
            <span>{form_files}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>Это письмо сгенерировано автоматически. Пожалуйста, не отвечайте на него.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return template
    .replace('{full_name}', escapeHtml(data.full_name))
    .replace('{graduation_year}', escapeHtml(data.graduation_year))
    .replace('{form_theme}', escapeHtml(data.form_theme))
    .replace('{form_text}', escapeHtml(data.form_text))
    .replace('{form_files}', filesHtml);
} 