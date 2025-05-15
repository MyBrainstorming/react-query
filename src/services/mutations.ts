import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUser, deleteUser, updateUser } from "./api"
import type { User } from "../types/user"
import { message } from "antd"
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