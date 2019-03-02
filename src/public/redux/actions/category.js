import axios from "axios";
import { server } from '../../../server';

export const allCategory = () => {
    return {
      type: 'ALL_CATEGORIES',
      payload: axios({
                  method: 'GET',
                  url: `${server.url}/api/v1/categories`
               })
    }
}
  