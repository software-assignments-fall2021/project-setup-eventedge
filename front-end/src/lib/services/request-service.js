import axios from 'axios';
import {API_BASE_URL} from '../constants';

class RequestService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      // remove after we are done with mocked API
      headers: {'X-API-Key': process.env.REACT_APP_MOCKAROO_API_KEY},
    });
  }

  async request(method, url) {
    try {
      const {data} = await this.client.request({method, url, data: this.body});

      return data;
    } catch (error) {
      console.error(`Error: ${error}`);

      throw error;
    }
  }

  withHeader(header) {
    this.client.defaults.headers = {...this.client.defaults.headers, ...header};

    return this;
  }

  withBody(body) {
    this.body = body;

    return this;
  }

  get(url) {
    return this.request('GET', url);
  }

  post(url) {
    return this.request('POST', url);
  }
}

export const request = () => new RequestService();
