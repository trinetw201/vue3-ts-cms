import type {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios"

export interface MYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (res: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: AxiosError) => AxiosError
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: AxiosError) => AxiosError
}

export interface MYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MYInterceptors<T>
}

export interface AppResponse<T = any> {
  code: number
  data: AppData<T>
}

export interface AppData<T> {
  list: T[]
  totalCount: number
}
