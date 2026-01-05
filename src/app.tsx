import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import React from 'react';
import {
  AvatarDropdown,
  AvatarName,
  Footer,
  Question,
  SelectLang,
} from '@/components';
import { currentUser as queryCurrentUser, getDatasets } from '@/services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import '@ant-design/v5-patch-for-react-19';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see https://umijs.org/docs/api/runtime-config#getinitialstate
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  // const fetchUserInfo = async () => {
  //   try {
  //     const msg = await queryCurrentUser({
  //       skipErrorHandler: true,
  //     });
  //     return msg.data;
  //   } catch (_error) {
  //     history.push(loginPath);
  //   }
  // };
    const fetchUserInfo = async () => {
    // try {
    //   const msg = await queryCurrentUser({
    //     skipErrorHandler: true,
    //   });
    //   return msg.data;
    // } catch (_error) {
    //   history.push(loginPath);
    // }
     try {
      // 本地开发环境下返回模拟用户信息
      if (isDev) {
        return {
          name: 'admin',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          userid: '00000001',
          email: 'admin@example.com',
          signature: '海纳百川，有容乃大',
          title: '管理员',
        };
      }
      // 生产环境下调用实际接口
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
  } catch (_error) {
    history.push(loginPath);
  }
    return undefined;
  };

  const fetchDatasets = async () => {
    
    try {
      const res = await getDatasets();
      return res?.data?.list || [];
    } catch {
      return [];
    }
  };

  // 如果不是登录页面，执行
  const { location } = history;
  if (
    ![loginPath, '/user/register', '/user/register-result'].includes(
      location.pathname,
    )
  ) {
    const [currentUser, datasets] = await Promise.all([fetchUserInfo(), fetchDatasets()]);

    return {
      fetchUserInfo,
      currentUser,
      datasets,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    actionsRender: () => [
      <Question key="doc" />,
      <SelectLang key="SelectLang" />,
    ],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
     onPageChange: () => {
    const { location } = history;
    const match = location.pathname.match(/^\/list(?:\/([^/]+))?/);
    if (match) {
      const datasetId = match[1];
      const selectedDataset = initialState?.datasets?.find((d: any) => d.dataset_id === datasetId);
      setInitialState((s) => ({ ...s, selectedDatasetId: datasetId, selectedDataset }));
    }
  },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    // 修改tab页面标题
    // pageTitleRender: () => {
    //   return '数据平台';
    // },
    // 动态生成菜单
    menuDataRender: (menuList: any[]) => {
    return menuList.map((item) => {
      if (item.name === '数据集' || item.path === '/list') {
        const datasets = initialState?.datasets || [];
        const dynamicChildren = datasets.map((ds: any) => ({
          name: `${ds.dataset_name} ${ds.dataset_version}`,
          path: `/list/${ds.dataset_id}`,
          key: `/list/${ds.dataset_id}`,
        }));
        // 去重：保留已有 item.children，再 append 不重复的 dynamicChildren
        const existPaths = new Set((item.children || []).map((c: any) => c.path));
        const children = [...(item.children || [])];
        dynamicChildren.forEach((c) => { if (!existPaths.has(c.path)) children.push(c); });
        return { ...item, children };
      }
      return item;
    });
  },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
// export const layout: RunTimeLayoutConfig = ({
//   initialState,
//   setInitialState,
// }) => ({
//   actionsRender: () => [
//     <Question key="doc" />,
//     <SelectLang key="SelectLang" />,
//   ],
//   avatarProps: {
//     src: initialState?.currentUser?.avatar,
//     title: <AvatarName />,
//     render: (_, avatarChildren) => {
//       return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
//     },
//   },
//   waterMarkProps: {
//     content: initialState?.currentUser?.name,
//   },
//   footerRender: () => <Footer />,
//   onPageChange: () => {
//     const { location } = history;
//     // 如果没有登录，重定向到 login
//     if (!initialState?.currentUser && location.pathname !== loginPath) {
//       history.push(loginPath);
//     }
//   },
//   bgLayoutImgList: [
//     {
//       src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
//       left: 85,
//       bottom: 100,
//       height: '303px',
//     },
//     {
//       src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
//       bottom: -68,
//       right: -45,
//       height: '303px',
//     },
//     {
//       src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
//       bottom: 0,
//       left: 0,
//       width: '331px',
//     },
//   ],
//   menuHeaderRender: undefined,
//   childrenRender: (children) => {
//     return (
//       <>
//         {children}
//         {isDev && (
//           <SettingDrawer
//             disableUrlParams
//             enableDarkTheme
//             settings={initialState?.settings}
//             onSettingChange={(settings) => {
//               setInitialState((preInitialState) => ({
//                 ...preInitialState,
//                 settings,
//               }));
//             }}
//           />
//         )}
//       </>
//     );
//   },
//   pageTitleRender: () => {
//     return '数据平台';
//   },
//   // 动态生成菜单
//   menuDataRender: (menuList: any[]) => {
//     return menuList.map((item) => {
//       // 匹配数据集菜单
//       if (item.name === '数据集' || item.path === '/list') {
//         // 动态添加子菜单
//         const datasetSubMenus = initialState?.datasets?.map((dataset: any) => ({
//           name: `${dataset.dataset_name} ${dataset.dataset_version}`,
//           path: `/list/${dataset.dataset_id}`,
//           icon: 'file-text',
//           component: './table-list/[id]',
//         })) || [];
        
//         return {
//           ...item,
//           children: datasetSubMenus,
//         };
//       }
//       return item;
//     });
//   },
//   ...initialState?.settings,
// });

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  baseURL: 'http://localhost:3001', // 修改为本地Node服务地址
  //  baseURL: 'https://proapi.azurewebsites.net',
  ...errorConfig,
};
