import type { TableColumnItemType } from "@/views/main/system/department/config/pageContentConfig"

export interface PageContentConfig {
  pageName: string
  header?: {
    title?: string
    btnTitle: string
  }
  tableColumn?: TableColumnItem[]
}

export interface TableColumnItem {
  type: TableColumnItemType
  label: string
  prop?: string
  width?: string
}
