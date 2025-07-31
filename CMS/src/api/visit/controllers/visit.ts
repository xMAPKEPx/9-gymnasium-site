/**
 * visit controller
 */

import { factories } from '@strapi/strapi';
import { renderVisitRequestTemplate } from '../../../utils/emailTemplates';
import { sendUnisenderEmail } from '../../../utils/unisender';

export default factories.createCoreController('api::visit.visit', ({ strapi }) => ({
  async create(ctx) {
    const { Full_name, Graduate_year, Date, Time, Email } = ctx.request.body;

    // Создаём запись в базе
    const entry = await strapi.entityService.create('api::visit.visit', {
      data: { Full_name, Graduate_year, Date, Time, Email },
    });

    // Генерируем HTML для письма
    const html = renderVisitRequestTemplate({
      full_name: Full_name,
      graduation_year: Graduate_year,
      visit_date: Date,
      visit_time: Time,
    });

    // Отправляем email админу через Unisender
    await sendUnisenderEmail({
      api_key: process.env.UNISENDER_API_KEY!,
      email: process.env.UNISENDER_ADMIN_EMAIL!,
      sender_name: process.env.UNISENDER_SENDER_NAME!,
      sender_email: process.env.UNISENDER_SENDER_EMAIL!,
      subject: 'Новая заявка на посещение',
      body: html,
      list_id: Number(process.env.UNISENDER_LIST_ID!),
      strapi,
    });

    ctx.body = entry;
  },
}));
