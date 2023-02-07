import axios from "axios";


export const api = axios.create({
/*   baseURL: import.meta.env.AXIOS_API */
  baseURL: "https://fabianoapi.onrender.com"
})