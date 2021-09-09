import config from '../config';
import axios from 'axios';

export class CheffAdminApi {
  async sendContactHelp(contactPayload) {
    try {
      const response = await axios.post(`${config.BASE_URL_ADMIN_API}/contact-help`, contactPayload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
