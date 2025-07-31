/**
 * memory controller
 */

import { factories } from '@strapi/strapi';
import { renderMemoryFormTemplate } from '../../../utils/emailTemplates';
import { sendUnisenderEmail } from '../../../utils/unisender';

export default factories.createCoreController('api::memory.memory', ({ strapi }) => ({
  async create(ctx) {
    const { Full_name, Graduate_year, Section, Story } = ctx.request.body;

    // Проверяем наличие файла, так как поле Photo обязательно
    if (!ctx.request.files || !ctx.request.files.Photo) {
      strapi.log.error('Ошибка: не загружено фото, а поле Photo обязательно');
      ctx.throw(400, 'Необходимо загрузить фото');
    }

    // 1. Загружаем фото
    const uploadedFiles = await strapi
      .plugin('upload')
      .service('upload')
      .upload({
        data: {},
        files: ctx.request.files.Photo,
      });
    strapi.log.info('Загружены файлы:', uploadedFiles);

    if (!uploadedFiles || !uploadedFiles[0] || !uploadedFiles[0].id) {
      strapi.log.error('Ошибка: не удалось загрузить фото');
      ctx.throw(500, 'Ошибка загрузки фото');
    }

    // 2. Создаём запись с привязанным фото
    const entry = await strapi.entityService.create('api::memory.memory', {
      data: {
        Full_name,
        Graduate_year,
        Section,
        Story,
        Photo: uploadedFiles[0].id,
      },
    });
    strapi.log.info('Создана запись memory:', entry);
    strapi.log.info('ID созданной записи:', entry.id);

    // 3. Получаем запись с populate
    const updatedEntry = await strapi.entityService.findOne('api::memory.memory', entry.id, {
      populate: ['Photo'],
    });
    strapi.log.info('Обновлённая запись memory:', updatedEntry);

    if (!updatedEntry) {
      strapi.log.error('Ошибка: не удалось получить запись воспоминания после создания. entry:', entry);
      ctx.throw(500, 'Ошибка: не удалось получить запись воспоминания после создания.');
    }

    // Генерируем HTML для письма
    let files: string[] = [];
    const photo = (updatedEntry as any).Photo;
    if (photo && typeof photo === 'object' && photo.url) {
      files = [photo.url];
    }
    const html = renderMemoryFormTemplate({
      full_name: Full_name,
      graduation_year: Graduate_year,
      form_theme: Section,
      form_text: Story,
      form_files: files,
    });

    // Отправляем email админу через Unisender
    await sendUnisenderEmail({
      api_key: process.env.UNISENDER_API_KEY!,
      email: process.env.UNISENDER_ADMIN_EMAIL!,
      sender_name: process.env.UNISENDER_SENDER_NAME!,
      sender_email: process.env.UNISENDER_SENDER_EMAIL!,
      subject: 'Новое воспоминание',
      body: html,
      list_id: Number(process.env.UNISENDER_LIST_ID!),
      strapi,
    });
    strapi.log.info('Email отправлен админу через Unisender');

    ctx.body = updatedEntry;
  },
}));
