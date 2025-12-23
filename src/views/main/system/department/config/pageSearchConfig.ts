import type { PageSearchConfig } from "@/components/page-search/page-search"

export const pageSearchConfig: PageSearchConfig = {
  pageName: "department",
  searchFormItem: [
    {
      type: "input",
      prop: "name",
      label: "部門名稱",
      placeholder: "請輸入部門名稱",
      initialValue: "",
    },
    {
      type: "input",
      prop: "leader",
      label: "部門主管",
      placeholder: "請輸入部門主管",
      initialValue: "",
    },
    {
      type: "datePicker",
      prop: "createAt",
      label: "創建時間",
      initialValue: undefined,
    },
  ],
}
