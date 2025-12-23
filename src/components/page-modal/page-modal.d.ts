export interface PageModalConfig {
  pageName: string
  title: string
  insertForms: form[]
  editForms: form[]
}

export interface form {
  type: string
  label: string
  prop: string
  placeholder?: string
  initialValue?: string | number | undefined
  width?: string
}

export interface ModalForm {
  [index: string]: string | number | undefined
}
