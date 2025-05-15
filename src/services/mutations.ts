/**
 * 变更操作服务模块
 * 封装了所有与React Query相关的mutation hooks
 * 包括创建、更新和删除用户的操作
 */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUser, deleteUser, updateUser } from "./api"
import type { User } from "../types/user"
import { message } from "antd"

/**
 * 创建用户的mutation hook
 * @returns {UseMutationResult} 返回创建用户的mutation结果
 * @description
 * - 使用useMutation处理创建用户的异步操作
 * - 成功后自动使缓存失效并重新获取用户列表
 * - 通过queryClient.invalidateQueries使相关查询失效
 */
export function useCreateUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: User) => createUser(data),
        onMutate: (data: User) => {
            console.log('Creating user:', data)
        },
        onSuccess: (data: User) => {
            console.log('User created:', data)
        },
        onError: (error: Error) => {
            console.error('Error creating user:', error)
        },
        onSettled: (_, error) => {
            if (error) {
                message.error('创建用户失败')
            } else {
                queryClient.invalidateQueries({ queryKey: ['users'] })
            }
        }
    })
}

/**
 * 更新用户的mutation hook
 * @returns {UseMutationResult} 返回更新用户的mutation结果
 * @description
 * - 使用useMutation处理更新用户的异步操作
 * - 成功后使相关缓存失效：
 *   1. users查询（用户列表）
 *   2. 特定用户的详情查询
 */
export function useUpdateUser() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: User) => updateUser(data),
        onSettled: async (_, error, variables) => {
            if (error) {
                message.error('修改用户失败')
            } else {
                await queryClient.invalidateQueries({ queryKey: ['users'] })
                await queryClient.invalidateQueries({ queryKey: ['user'] })
                await queryClient.invalidateQueries({ queryKey: ['users', variables.id] })
            }
        },
        onSuccess: (data: User) => {
            console.log('User updated:', data)
        }
    })
}

/**
 * 删除用户的mutation hook
 * @returns {UseMutationResult} 返回删除用户的mutation结果
 * @description
 * - 使用useMutation处理删除用户的异步操作
 * - 成功后使相关缓存失效：
 *   1. users查询（用户列表）
 *   2. 被删除用户的详情查询
 */
export function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSettled: async (_, error) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({ queryKey: ['users'] })
                await queryClient.invalidateQueries({ queryKey: ['user'] })
            }
        }
    })
}