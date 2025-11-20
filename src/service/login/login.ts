import MyRequest from ".."
import type { IAccount } from "@/types/login"

export function accountLoginRequest(account: IAccount) {
  return MyRequest.post({
    url: "login",
    data: { name: account.account, password: account.password },
  })
}

export function getUserInfoByID(id: number) {
  return MyRequest.get({
    url: `/users/${id}`,
  })
}

export function getUserMenusByRoleId(roleId: number) {
  return MyRequest.get({
    url: `/role/${roleId}/menu`,
  })
}
