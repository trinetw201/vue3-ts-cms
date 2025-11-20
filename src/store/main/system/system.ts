import { defineStore } from "pinia"
import {
  usersList,
  getRoleList,
  getDepartmentList,
  insertUser,
  deleteUserById,
  editUserById,
  getPageList,
  deletePageById,
  insertPage,
  editPageById,
} from "@/service/main/system/system"
import type { EditUserData, InsertUserData } from "@/types/main/system/system"
import type { Department, Role } from "@/types/login"

//users
const useSystemStore = defineStore("system", {
  state: () => ({
    usersList: [] as any[],
    usersTotalCount: 0,

    //共用page
    pageList: [] as any[],
    totalCount: 0,
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await usersList(queryInfo)
      if (usersListResult.code == 0) {
        this.usersList = usersListResult.data.list
        this.usersTotalCount = usersListResult.data.totalCount
      }
    },
    async getRoleListAction() {
      const roleListResult = await getRoleList()
      if (roleListResult.code == 0) {
        return <Role[]>roleListResult.data.list
      }
    },
    async getDepartmentListAction() {
      const departmentListResult = await getDepartmentList()
      if (departmentListResult.code == 0) {
        return <Department[]>departmentListResult.data.list
      }
    },
    async deleteUserAction(userId: number) {
      if (!userId) return false
      const deleteUserResult = await deleteUserById(userId)
      if (deleteUserResult.code == 0) {
        this.postUsersListAction({ offset: 0, size: 10 })
        return true
      }
      return false
    },
    async insertUserAction(insertUserData: InsertUserData) {
      if (!insertUserData) return false
      const insertUserResult = await insertUser(insertUserData)
      if (insertUserResult.code == 0) {
        this.postUsersListAction({ offset: 0, size: 10 })
        return true
      }
      return false
    },
    async editUserAction(userId: number | undefined, editUserData: EditUserData) {
      if (!userId || !editUserData) return false
      const editUserResult = await editUserById(userId, editUserData)
      if (editUserResult.code == 0) {
        this.postUsersListAction({ offset: 0, size: 10 })
        return true
      }
      return false
    },

    //共用page
    async postPageListAction<T = any, D = any>(pageName: string, queryInfo: T) {
      const pageListResult = await getPageList<T, D>(pageName, queryInfo)
      if (pageListResult.code == 0) {
        this.pageList = pageListResult.data.list
        this.totalCount = pageListResult.data.totalCount
      }
    },
    async deletePageAction(pageName: string, id: number) {
      if (!pageName || !id) return false
      const deleteResult = await deletePageById(pageName, id)
      if (deleteResult.code == 0) {
        this.postPageListAction(pageName, { offset: 0, size: 10 })
        return true
      }
      return false
    },
    async insertPageAction(pageName: string, insertData: any) {
      if (!insertData) return false
      const insertResult = await insertPage(pageName, insertData)
      if (insertResult.code == 0) {
        this.postPageListAction(pageName, { offset: 0, size: 10 })
        return true
      }
      return false
    },
    async editPageAction(pageName: string, userId: number | undefined, editUserData: any) {
      if (!userId || !editUserData) return false
      const editPageResult = await editPageById(pageName, userId, editUserData)
      if (editPageResult.code == 0) {
        this.postPageListAction(pageName, { offset: 0, size: 10 })
        return true
      }
      return false
    },
  },
})

export default useSystemStore
