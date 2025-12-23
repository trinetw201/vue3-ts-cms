import type { PageModalConfig } from "@/components/page-modal/page-modal"

export const pageModalConfig: PageModalConfig = {
  pageName: "department",
  title: "部門",
  insertForms: [
    {
      type: "input",
      label: "部門名稱",
      prop: "name",
      initialValue: "",
      placeholder: "請輸入部門名稱",
    },
    {
      type: "input",
      label: "部門主管",
      prop: "leader",
      initialValue: "請輸入部門主管",
    },
  ],
  editForms: [
    {
      type: "input",
      label: "部門名稱",
      prop: "name",
      initialValue: "",
      placeholder: "請輸入部門名稱",
    },
    {
      type: "input",
      label: "部門主管",
      prop: "leader",
      initialValue: "請輸入部門主管",
    },
  ],
}
