export interface SearchFormItem {
  type: string
  prop: string
  label: string
  initialValue?: string | undefined
  placeholder?: string | undefined
  option?: SelectOption[]
}

export interface SelectOption {
  label: string
  value: number | string | undefined
}

export interface SearchForm {
  [index: string]: string | number | undefined
}
