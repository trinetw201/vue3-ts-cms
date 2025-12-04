import type { PageContentConfig } from "@/components/page-content/page-content"

export enum TableColumnItemType {
  default = "default",
  selection = "selection",
  index = "index",
  expand = "expand",
  date = "date",
}

export const pageContentConfig: PageContentConfig = {
  header: {
    title: "部門列表",
    btnTitle: "新增部門",
  },
  tableColumn: [
    {
      type: TableColumnItemType.index,
      label: "序號",
      width: "55",
    },
    {
      type: TableColumnItemType.default,
      prop: "name",
      label: "部門名稱",
      width: "100",
    },
    {
      type: TableColumnItemType.default,
      prop: "leader",
      label: "部門主管",
      width: "100",
    },
    {
      type: TableColumnItemType.default,
      prop: "parentId",
      label: "上級部門",
      width: "100",
    },
  ],
}
