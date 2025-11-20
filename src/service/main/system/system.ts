import MyRequest from "@/service/index"
import type { EditUserData, InsertUserData } from "@/types/main/system/system"

//根據搜尋條件取得用戶列表
export function usersList(queryInfo: any) {
  return MyRequest.post({
    url: "users/list",
    data: queryInfo,
  })
}

//新增用戶
export function insertUser(insertUserData: InsertUserData) {
  return MyRequest.post({
    url: "users",
    data: insertUserData,
  })
}

//刪除用戶
export function deleteUserById(userId: number) {
  return MyRequest.delete({
    url: `users/${userId}`,
  })
}

export function editUserById(userId: number, editUserData: EditUserData) {
  return MyRequest.patch({
    url: `users/${userId}`,
    data: editUserData,
  })
}

//取得部門列表（新增用戶）
export function getDepartmentList() {
  return MyRequest.post({
    url: "department/list",
  })
}

//取得角色列表（新增用戶）
export function getRoleList() {
  return MyRequest.post({
    url: "role/list",
  })
}

//Page
//根據搜尋條件取得列表
export function getPageList<T, D>(pageName: string, queryInfo: T) {
  return MyRequest.post<D>({
    url: `${pageName}/list`,
    data: queryInfo,
  })
}

//
//刪除
export function deletePageById(pageName: string, id: number) {
  return MyRequest.delete({
    url: `${pageName}/${id}`,
  })
}

//新增用戶
export function insertPage(pageName: string, insertData: any) {
  return MyRequest.post({
    url: `${pageName}`,
    data: insertData,
  })
}

export function editPageById(pageName: string, userId: number, editData: any) {
  if (editData.parentId === undefined) editData.parentId = null

  return MyRequest.patch({
    url: `${pageName}/${userId}`,
    data: editData,
  })
}
