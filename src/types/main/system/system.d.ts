//UserSearchForm 欄位
export interface UserSearchForm {
  name: string
  realname: string
  cellphone: string
  enable: int
  createAt?: Array
}

//usersList API 資料結構
export interface UsersList {
  usersList: UserItem[]
  usersTotalCount: number
}

export interface UserItem {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

//新增用戶資料
export interface InsertUserData {
  name: string
  realname: string
  password: string
  cellphone?: number
  roleId?: number
  departmentId?: number
}

export type EditUserData = InsertUserData
