import axios from "axios"
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios"
import type { AppData, AppResponse, MYRequestConfig } from "./type"

class MYRequest {
  instance: AxiosInstance
  constructor(config?: MYRequestConfig) {
    this.instance = axios.create(config)

    //每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        return res
      },
      (err) => {
        return err
      },
    )
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data
      },
      (err: AxiosError) => {
        return err
      },
    )

    this.instance.interceptors.request.use(
      config?.interceptors?.requestSuccessFn,
      config?.interceptors?.requestFailureFn,
    )
    this.instance.interceptors.response.use(
      config?.interceptors?.responseSuccessFn,
      config?.interceptors?.responseFailureFn,
    )
  }

  request<T = any, S = AppResponse<T>>(config: MYRequestConfig) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as any)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T, any>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: MYRequestConfig) {
    return this.request({ ...config, method: "GET" })
  }
  post<T = any>(config: MYRequestConfig) {
    return this.request({ ...config, method: "POST" })
  }
  delete<T = any>(config: MYRequestConfig) {
    return this.request({ ...config, method: "DELETE" })
  }
  patch<T = any>(config: MYRequestConfig) {
    return this.request({ ...config, method: "PATCH" })
  }
}

export default MYRequest
