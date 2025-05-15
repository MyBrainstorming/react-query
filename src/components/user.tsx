/**
 * 用户管理组件
 * 实现用户的增删改查功能，包含表单验证和错误处理
 */
import { useUserIds ,useUser } from "../services/queries"
import { useIsFetching } from '@tanstack/react-query'
import { useCreateUser, useDeleteUser, useUpdateUser } from "../services/mutations"
import type { User as UserType } from "../types/user"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { message, Modal, Button, Popconfirm } from 'antd'
import { useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export default function User() {
    // 获取用户ID列表的查询
    const userNameQuery = useUserIds()
    // 根据ID列表批量获取用户详细信息
    const userQueries = useUser(userNameQuery.data)
    // 获取当前正在进行的查询数量
    const isFetching = useIsFetching()
    
    // 控制更新用户模态框的显示状态
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false)
    // 存储当前选中的用户信息
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null)

    // 创建用户的mutation hook
    const createUserMutation = useCreateUser()
    // 创建用户表单的hook
    const { 
        register: createRegister, 
        handleSubmit: handleCreateSubmit, 
        formState: { errors: createErrors }, 
        reset: createReset 
    } = useForm<UserType>()

    // 更新用户表单的hook
    const { 
        register: updateRegister, 
        handleSubmit: handleUpdateSubmit, 
        formState: { errors: updateErrors }, 
        reset: updateReset, 
        setValue 
    } = useForm<UserType>()

    /**
     * 处理创建用户的提交事件
     * @param {UserType} data - 表单提交的用户数据
     */
    const handleCreateUser: SubmitHandler<UserType> = async (data) => {
        try {
            await createUserMutation.mutateAsync(data)
            message.success('用户创建成功！')
            createReset() // 重置表单
        } catch (error) {
            message.error('创建用户失败：' + (error as Error).message)
        }
    }

    // 更新用户的mutation hook
    const updateUserMutation = useUpdateUser()
    /**
     * 处理更新用户的提交事件
     * @param {UserType} data - 表单提交的用户数据
     */
    const handleUpdateUser: SubmitHandler<UserType> = async (data) => {
        try {
            await updateUserMutation.mutateAsync(data)
            message.success('用户更新成功！')
            setIsUpdateModalVisible(false)
            updateReset()
        } catch (error) {
            message.error('更新用户失败：' + (error as Error).message)
        }
    }

    // 删除用户的mutation hook
    const deleteUserMutation = useDeleteUser()
    /**
     * 处理删除用户事件
     * @param {number} id - 要删除的用户ID
     */
    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUserMutation.mutateAsync(id)
            message.success('用户删除成功！')
        } catch (error) {
            message.error('删除用户失败：' + (error as Error).message)
        }
    }

    /**
     * 显示更新用户的模态框
     * @param {UserType} user - 要更新的用户信息
     */
    const showUpdateModal = (user: UserType) => {
        setSelectedUser(user)
        // 预填充表单数据
        setValue('id', user.id)
        setValue('name', user.name)
        setValue('email', user.email)
        setValue('avatar', user.avatar)
        setIsUpdateModalVisible(true)
    }

    return <>
        {/* 创建用户表单 */}
        <form onSubmit={handleCreateSubmit(handleCreateUser)} style={{
            maxWidth: '400px',
            margin: '20px auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px'
        }}>
            {/* 用户名输入字段 */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>姓名：</label>
                <input
                    type="text"
                    id="name"
                    placeholder="请输入用户名"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                    {...createRegister('name', {
                        required: '用户名是必填的',
                        minLength: { value: 2, message: '用户名至少2个字符' }
                    })}
                />
                {createErrors.name && <span style={{ color: 'red', fontSize: '12px' }}>{createErrors.name.message}</span>}
            </div>

            {/* 邮箱输入字段 */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>邮箱：</label>
                <input
                    type="email"
                    id="email"
                    placeholder="请输入邮箱"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                    {...createRegister('email', {
                        required: '邮箱是必填的',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: '请输入有效的邮箱地址'
                        }
                    })}
                />
                {createErrors.email && <span style={{ color: 'red', fontSize: '12px' }}>{createErrors.email.message}</span>}
            </div>

            {/* 头像URL输入字段 */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="avatar" style={{ display: 'block', marginBottom: '5px' }}>头像URL：</label>
                <input
                    type="text"
                    id="avatar"
                    placeholder="请输入头像URL"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                    {...createRegister('avatar', {
                        required: '头像URL是必填的',
                        pattern: {
                            value: /^(http|https):\/\/.+/,
                            message: '请输入有效的URL地址'
                        }
                    })}
                />
                {createErrors.avatar && <span style={{ color: 'red', fontSize: '12px' }}>{createErrors.avatar.message}</span>}
            </div>

            {/* 提交按钮 */}
            <button
                type="submit"
                disabled={createUserMutation.isPending}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: createUserMutation.isPending ? '#ccc' : '#1890ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: createUserMutation.isPending ? 'not-allowed' : 'pointer'
                }}
            >
                {createUserMutation.isPending ? '创建中...' : '创建用户'}
            </button>
        </form>

        {/* 查询状态显示 */}
        <h4>查询请求的数量isFetching:{isFetching}</h4>
        <h4>获取的网络状态fetchStatus：{userNameQuery.fetchStatus}</h4>
        <h4>查询的整体状态status：{userNameQuery.status}</h4>

        {/* 显示用户ID列表 */}
        {userNameQuery.data?.map((name, index) => <div key={index}>{name}</div>)}

        {/* 用户详细信息列表 */}
        <h3>通过id值获取到的用户信息</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {userQueries?.map(({ data }, index) => (
                <li key={data?.id || `user-item-${index}`} style={{
                    padding: '15px',
                    margin: '10px 0',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* 用户信息显示 */}
                        <div>
                            <div>ID: {data?.id}</div>
                            <div>姓名: {data?.name}</div>
                            <div>邮箱: {data?.email}</div>
                        </div>
                        {/* 操作按钮 */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => data && showUpdateModal(data)}
                            >
                                修改
                            </Button>
                            <Popconfirm
                                title="删除确认"
                                description="确定要删除这个用户吗？此操作不可恢复。"
                                onConfirm={() => data && handleDeleteUser(data.id)}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    loading={deleteUserMutation.isPending}
                                >
                                    删除
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                </li>
            ))}
        </ul>

        {/* 更新用户模态框 */}
        <Modal
            title="修改用户信息"
            open={isUpdateModalVisible}
            onCancel={() => setIsUpdateModalVisible(false)}
            footer={null}
        >
            <form onSubmit={handleUpdateSubmit(handleUpdateUser)}>
                <input type="hidden" {...updateRegister('id')} />
                {/* 用户名输入字段 */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="update-name" style={{ display: 'block', marginBottom: '5px' }}>姓名：</label>
                    <input
                        type="text"
                        id="update-name"
                        placeholder="请输入用户名"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                        {...updateRegister('name', {
                            required: '用户名是必填的',
                            minLength: { value: 2, message: '用户名至少2个字符' }
                        })}
                    />
                    {updateErrors.name && <span style={{ color: 'red', fontSize: '12px' }}>{updateErrors.name.message}</span>}
                </div>

                {/* 邮箱输入字段 */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="update-email" style={{ display: 'block', marginBottom: '5px' }}>邮箱：</label>
                    <input
                        type="email"
                        id="update-email"
                        placeholder="请输入邮箱"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                        {...updateRegister('email', {
                            required: '邮箱是必填的',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: '请输入有效的邮箱地址'
                            }
                        })}
                    />
                    {updateErrors.email && <span style={{ color: 'red', fontSize: '12px' }}>{updateErrors.email.message}</span>}
                </div>

                {/* 头像URL输入字段 */}
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="update-avatar" style={{ display: 'block', marginBottom: '5px' }}>头像URL：</label>
                    <input
                        type="text"
                        id="update-avatar"
                        placeholder="请输入头像URL"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                        {...updateRegister('avatar', {
                            required: '头像URL是必填的',
                            pattern: {
                                value: /^(http|https):\/\/.+/,
                                message: '请输入有效的URL地址'
                            }
                        })}
                    />
                    {updateErrors.avatar && <span style={{ color: 'red', fontSize: '12px' }}>{updateErrors.avatar.message}</span>}
                </div>

                {/* 模态框底部按钮 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <Button onClick={() => setIsUpdateModalVisible(false)}>
                        取消
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={updateUserMutation.isPending}
                    >
                        {updateUserMutation.isPending ? '更新中...' : '更新'}
                    </Button>
                </div>
            </form>
        </Modal>
    </>
}