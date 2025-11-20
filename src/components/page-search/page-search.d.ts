export interface SearchFormItem {
  type: string
  prop: string
  label: string
  initialValue?: string | undefined
  placeholder?: string | undefined
  option?: selectOption[]
}

export interface selectOption {
  label: string
  value: number | string | undefined
}

export interface SearchForm {
  [index: string]: string | number | undefined
}
