/**
 * 查询服务模块
 * 封装了所有与React Query相关的查询hooks
 */
import { useQuery, useQueries } from "@tanstack/react-query";
import { getUser, getUsersName } from "./api";
import type { User } from "../types/user";

/**
 * 获取所有用户ID的查询hook
 * @returns {UseQueryResult} 返回包含用户ID列表的查询结果
 * @description 
 * - 使用useQuery获取所有用户的ID列表
 * - queryKey: ["users"]作为缓存的唯一标识
 * - queryFn调用getUsersName获取数据
 */
export function useUserIds() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsersName,
    })
}

/**
 * 批量获取用户详细信息的查询hook
 * @param {(number | undefined)[] | undefined} ids - 用户ID数组
 * @returns {UseQueryResult[]} 返回包含用户详细信息的查询结果数组
 * @description
 * - 使用useQueries同时获取多个用户的详细信息
 * - 参数ids是一个可能包含undefined的数字数组
 * - 使用 ?? 空值合并运算符，如果ids为undefined则使用空数组
 * - 对每个id创建一个查询配置：
 *   - queryKey: ["user", id]：每个用户查询的唯一标识
 *   - queryFn: () => getUser(id!)：获取单个用户数据
 *   - id!表示类型断言，确保id不为undefined
 */
export function useUser(ids: (number | undefined)[] | undefined) {
    return useQueries({
        queries: (ids ?? []).map(id => {
            return {
                queryKey: ["user", id],
                queryFn: () => getUser(id!)
            }
        })
    })
}