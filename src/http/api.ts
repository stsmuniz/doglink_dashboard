import type  {AxiosInstance} from "axios";
import axios from "axios";

const http: AxiosInstance = axios

http.defaults.baseURL = 'http://localhost:8000'

const setBearerToken = (token: string|null) => {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export {setBearerToken}
export default http
