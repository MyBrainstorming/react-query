import axios from 'axios'
import type { User } from '../types/user'
const BaseUrl = 'http://localhost:3000'
const axiosInstance = axios.create({
  baseURL: BaseUrl,
  timeout: 5000,
  headers: {
  }
})
export const getUsersName = async () => {
  return (await axiosInstance.get<User[]>('/users')).data.map((user: any) => user.name)
}
export const getUsersError = async () => {
  return (await axiosInstance.get('/users-error')).data.map((user: any) => user.name)
}
export const getUser = async (id: number) => {
  return (await axiosInstance.get<User>(`users/${id}`)).data
}
