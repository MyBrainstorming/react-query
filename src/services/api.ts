import axios from 'axios'
import type { User } from '../types/user'

const BaseUrl = 'http://localhost:3000'
const axiosInstance = axios.create({
  baseURL: BaseUrl,
  timeout: 5000,
  headers: {
  }
})

//获取用户id列表 正确地址测试react-query
export const getUsersName = async () => {
  return (await axiosInstance.get<User[]>('/users')).data.map((user: any) => user.id)
}

//获取用户列表 错误地址测试react-query
export const getUsersError = async () => {
  return (await axiosInstance.get('/users-error')).data.map((user: any) => user.name)
}

//根据id值获取用户的详细信息
export const getUser = async (id: number) => {
  return (await axiosInstance.get<User>(`users/${id}`)).data
}

//添加用户
export const createUser = async (user: User) => {
  return (await axiosInstance.post('/users', user)).data
}

//修改用户信息
export const updateUser = async (user: User) => {
  return (await axiosInstance.put(`/users/${user.id}`, user)).data
}

//删除用户
export const deleteUser = async (id: number) => {
  return (await axiosInstance.delete(`/users/${id}`)).data
}
