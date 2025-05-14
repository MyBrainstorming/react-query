import { useUserNames, useUser } from "../services/queries"
import { useIsFetching } from '@tanstack/react-query'
export default function User() {
    const userNameQuery = useUserNames()
    const isFetching = useIsFetching()
    const userQueries = useUser([1, 2, 3, 4])
    console.log(userQueries);

    if (userNameQuery.isPending) {
        return <>loading....</>
    }
    if (userNameQuery.isError) {
        return <>error</>
    }

    return <>
        {/* useIsFetching是React Query提供的一个Hook，主要用于以下场景：
        1、全局加载状态监控:
            返回一个数字，表示当前应用中正在进行的查询请求数量
            可以用来实现全局的加载指示器（loading indicator）
            当有任何查询在后台进行时，这个数字会大于0
        2、特定查询监控
            可以通过传入queryKey来监控特定类型的查询
            例如：useIsFetching(['posts'])只会统计查询键以'posts'开头的请求
        3、isFetching与查询的status是不同的概念：
            status表示查询的整体状态（pending/error/success）
            isFetching表示是否有网络请求正在进行
        */}
        <h4>查询请求的数量isFetching:{isFetching}</h4>

        {/* fetchStatus表示获取的网络状态,有三种可能的值 : 
                fetching:正在进行网络请求 
                paused:请求被暂停(比如网络断开的时候)
                idle:没有进行网络请求(请求结束了,进入闲置状态)
        */}
        <h4>获取的网络状态fetchStatus：{userNameQuery.fetchStatus}</h4>

        {/* status：表示查询的整体状态 有四种可能的值
                pending:初始加载状态,第一次请求数据是
                error:请求失败
                success:请求成功
                loading:重新获取数据时的状态
        */}
        <h4>查询的整体状态status：{userNameQuery.status}</h4>
        {userNameQuery.data?.map((name, index) => <div key={index}>{name}</div>)}

        <h3>通过id值获取到的用户信息</h3>
        <ul>
            {userQueries?.map(({ data }) => {

                return (
                    <li key={data?.id}>
                        <div>ID: {data?.id}</div>
                        <div>姓名: {data?.name}</div>
                        <div>邮箱: {data?.email}</div>
                    </li>
                )
            })}
        </ul>
    </>
}