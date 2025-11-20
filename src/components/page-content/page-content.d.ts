enum elTableColumnType {
  "default",
  "selection",
  "index",
  "expand",
}

export interface tableColumnItem {
  type?: elTableColumnType
  label: string
  prop?: string
}
