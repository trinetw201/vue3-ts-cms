export interface IAccount {
  account: string
  password: string
}

export interface UserInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: string
  updateAt: string
  role: Role
  department: Department
}

export interface Role {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface Department {
  id: number
  name: string
  parentId: any
  createAt: string
  updateAt: string
  leader: string
}

export interface UserMenus {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  createAt: string
  updateAt: string
  children: Children[]
}

export interface Children {
  id: number
  url: string
  name: string
  sort: number
  type: number
  children?: Children2[]
  createAt: string
  parentId: number
  updateAt: string
}

export interface Children2 {
  id: number
  url: string
  name: string
  sort: number
  type: number
  createAt: string
  parentId: number
  updateAt: string
  permission: string
}
