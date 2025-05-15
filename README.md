# React Query 用户管理系统

这是一个基于 React Query 实现的用户管理系统，展示了如何使用 React Query 进行数据获取、缓存管理和状态更新。

## 功能特点

- 用户管理的完整 CRUD 操作
  - 创建用户（带表单验证）
  - 读取用户信息（列表和详情）
  - 更新用户信息（模态框表单）
  - 删除用户（带确认提示）
- 实时数据同步和缓存管理
- 错误处理和加载状态展示
- 响应式界面设计

## 技术栈

- React 18
- React Query (TanStack Query)
- Axios
- React Hook Form
- Ant Design
- JSON Server (模拟后端)

## 项目结构

```
src/
├── components/      # React 组件
├── services/        # API 和查询相关服务
├── types/          # TypeScript 类型定义
└── ...
```

## 安装和运行

1. 克隆项目并安装依赖：

```bash
git clone <repository-url>
cd react-query-test
npm install
```

2. 启动 JSON Server（模拟后端服务）：

```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

3. 在新的终端窗口中启动前端开发服务器：

```bash
npm run dev
```

4. 打开浏览器访问：`http://localhost:5173`

## 开发说明

### API 服务

- 基础 URL：`http://localhost:3000`
- 支持的端点：
  - GET /users - 获取所有用户
  - GET /users/:id - 获取单个用户
  - POST /users - 创建用户
  - PUT /users/:id - 更新用户
  - DELETE /users/:id - 删除用户

### 数据结构

用户对象结构：

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}
```

## 性能优化

项目实现了以下性能优化措施：

- 使用 React Query 进行数据缓存
- 批量数据获取优化
- 表单验证和错误处理
- 优化的重新验证策略

## 注意事项

1. 确保 JSON Server 在前端应用启动前运行
2. 默认数据存储在 `db.json` 文件中
3. 所有 API 请求超时设置为 5000ms

## 后续优化计划

1. 数据层优化
   - 实现分页加载
   - 优化批量数据获取
   - 添加搜索和筛选功能

2. 架构优化
   - 实现统一的错误处理
   - 抽象可复用组件
   - 优化状态管理

3. 性能优化
   - 实现数据预加载
   - 优化缓存策略
   - 添加性能监控

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License - 详见 LICENSE 文件
