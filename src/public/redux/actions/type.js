import axios from "axios";
import { server } from '../../../server';

export const allType = () => {
    return {
      type: 'ALL_TYPES',
      payload: axios({
                  method: 'GET',
                  url: `${server.url}/api/v1/types`
               })
    }
}
  