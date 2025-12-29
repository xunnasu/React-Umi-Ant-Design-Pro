## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

# AntD Pro Lite

基于 Umi + React + TypeScript + Ant Design Pro Components 的轻量级后台管理系统。

## 技术栈

- **前端框架**: React 19.1.0
- **开发框架**: Umi Max 4.3.24
- **UI 组件库**: Ant Design 5.25.4 + Ant Design Pro Components 2.7.19
- **编程语言**: TypeScript 5.6.3
- **工具库**: classnames, dayjs, antd-style
- **构建工具**: Umi 4
- **测试框架**: Jest 30.0.4, Testing Library
- **Mock 数据**: Mock.js

## 项目结构

```
data-platform/
├── config/               # 项目配置文件
│   ├── config.ts         # 主配置文件
│   ├── defaultSettings.ts # 主题配置
│   └── routes.ts         # 路由配置
├── mock/                 # 模拟数据
│   ├── user.ts           # 用户相关Mock
│   └── listTableList.ts  # 表格数据Mock
├── public/               # 静态资源
├── src/                  # 源代码
│   ├── components/       # 公共组件
│   ├── locales/          # 国际化配置
│   ├── pages/            # 页面组件
│   ├── services/         # API服务
│   └── app.tsx           # 应用入口配置
└── tests/                # 测试文件
```

## 功能特性

- ✅ 用户认证系统（登录/登出）
- ✅ 权限管理
- ✅ 数据表格（增删改查功能）
- ✅ 响应式布局
- ✅ 国际化支持
- ✅ 模拟数据支持

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

开发服务器将在 http://localhost:8000 启动

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist` 目录

### Check code style

```bash
npm run lint
```

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

### 本地开发环境

使用以下账号登录（本地 Mock 数据）：

- **管理员账号**: admin / 123qwe
- **普通用户账号**: user / 123qwe

> 注意：本地开发使用 Mock 数据，无需连接真实 API

### 修改 API 基础 URL

在 `src/app.tsx` 文件中修改 `request` 配置：

```typescript
// src/app.tsx
import { RequestConfig } from "umi";

export const request: RequestConfig = {
  baseURL: "https://your-api-url.com", // 修改为你的API地址
};
```

### 修改主题

在 `config/defaultSettings.ts` 文件中修改主题配置：

```typescript
// config/defaultSettings.ts
export default {
  navTheme: "light", // 导航主题: light / dark
  primaryColor: "#1890ff", // 主色调
  layout: "mix", // 布局方式: side / top / mix
  contentWidth: "Fluid", // 内容宽度: Fluid / Fixed
  fixedHeader: false, // 固定头部
  fixSiderbar: true, // 固定侧边栏
  menu: {
    locale: false, // 关闭菜单国际化
  },
  title: "数据平台", // 页面标题
};
```

### 隐藏/显示 UI 元素

在 `src/app.tsx` 文件中修改布局配置：

```typescript
// src/app.tsx
export const layout: RunTimeLayoutConfig = {
  actionsRender: () => [], // 隐藏右上角的帮助和语言选择按钮
};
```

## License

MIT License

基于 Ant Design Pro 构建

© 2025 数据平台
