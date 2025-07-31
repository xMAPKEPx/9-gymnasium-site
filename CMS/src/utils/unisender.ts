import axios from 'axios';

interface SendUnisenderEmailParams {
  api_key: string;
  email: string;
  sender_name: string;
  sender_email: string;
  subject: string;
  body: string;
  list_id: number;
  error_checking?: number;
  strapi?: any; // для логгирования
}

export async function sendUnisenderEmail({
  api_key,
  email,
  sender_name,
  sender_email,
  subject,
  body,
  list_id,
  error_checking = 1,
  strapi,
}: SendUnisenderEmailParams) {
  try {

    const response = await axios.post('https://api.unisender.com/ru/api/sendEmail', null, {
      params: {
        api_key,
        email,
        sender_name,
        sender_email,
        subject,
        body,
        list_id,
        error_checking,
        format: 'json',
      },
    });
    if (strapi) {
      strapi.log.info(`Unisender: Email успешно отправлен на ${email} (subject: ${subject})`);
      console.log('Unisender: Email успешно отправлен на', email, subject);
      try {
        console.log('Unisender response errs:', response.data.result[0]?.errors);
        console.log('Unisender response raw:', response.data);
      } catch (e) {
        console.log('Ошибка при логировании ответа Unisender:', e);
      }
    }
    return response.data;
  } catch (error: any) {
    if (strapi) {
      strapi.log.error(`Unisender: Ошибка отправки email на ${email} (subject: ${subject}): ${error?.message}`);
      if (error?.response) {
        strapi.log.error(`Unisender response: ${JSON.stringify(error.response.data)}`);
      }
    }
    throw error;
  }
} 