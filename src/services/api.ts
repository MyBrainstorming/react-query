/**
 * API服务模块
 * 包含所有与后端交互的API请求方法
 */
import axios from 'axios'
import type { User } from '../types/user'

// 定义API基础URL
const BaseUrl = 'http://localhost:3000'

// 创建axios实例，配置基础设置
const axiosInstance = axios.create({
  baseURL: BaseUrl,
  timeout: 5000, // 请求超时时间：5秒
  headers: {
    // 可以在这里添加通用请求头
  }
})

/**
 * 获取用户ID列表
 * @returns {Promise<number[]>} 返回用户ID数组
 * @description 用于测试react-query的正确请求处理
 */
export const getUsersName = async () => {
  return (await axiosInstance.get<User[]>('/users')).data.map((user: any) => user.id)
}

/**
 * 获取用户列表（错误地址）
 * @returns {Promise<string[]>} 返回用户名数组
 * @description 用于测试react-query的错误处理机制
 */
export const getUsersError = async () => {
  return (await axiosInstance.get('/users-error')).data.map((user: any) => user.name)
}

/**
 * 根据ID获取用户详细信息
 * @param {number} id - 用户ID
 * @returns {Promise<User>} 返回用户详细信息
 */
export const getUser = async (id: number) => {
  return (await axiosInstance.get<User>(`users/${id}`)).data
}

/**
 * 创建新用户
 * @param {User} user - 用户信息对象
 * @returns {Promise<User>} 返回创建的用户信息
 */
export const createUser = async (user: User) => {
  return (await axiosInstance.post('/users', user)).data
}

/**
 * 更新用户信息
 * @param {User} user - 更新的用户信息对象
 * @returns {Promise<User>} 返回更新后的用户信息
 */
export const updateUser = async (user: User) => {
  return (await axiosInstance.put(`/users/${user.id}`, user)).data
}

/**
 * 删除用户
 * @param {number} id - 要删除的用户ID
 * @returns {Promise<any>} 返回删除操作的结果
 */
export const deleteUser = async (id: number) => {
  return (await axiosInstance.delete(`/users/${id}`)).data
}
