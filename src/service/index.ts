import { BASE_URL, TIME_OUT } from "./config"
import type { MYRequestConfig } from "./request/type"
import MYRequest from "./request"
import useLoginStore from "@/store/login"

const MyRequest = new MYRequest(<MYRequestConfig>{
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // token
      const useLogin = useLoginStore()
      const token = useLogin.token
      if (config.headers && token) {
        config.headers.Authorization = "Bearer " + token
      }
      return config
    },
  },
})

export default MyRequest
