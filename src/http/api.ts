import type  {AxiosInstance} from "axios";
import axios from "axios";

const http: AxiosInstance = axios

http.defaults.baseURL = 'https://api.doglink.net'

const setBearerToken = (token: string|null) => {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export {setBearerToken}
export default http
