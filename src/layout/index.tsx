import { Layout, Menu } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import './index.scss';
import { useHistory, matchPath } from 'react-router';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import { MenuItemProps } from 'antd/lib/menu/MenuItem';

import { OpenEventHandler } from 'rc-menu/lib/interface';

interface MenuConfig extends MenuItemProps {
  title: string,
  path: string;
  children?: MenuConfig[];
  key?: number;
}

const userMenus: MenuConfig[] = [
  { path: '/home', title: 'Home', icon: <VideoCameraOutlined /> },
  { title: 'About', path: '/about', icon: <UploadOutlined />, children: [{
    path: '/about/child1', title: 'About_child1', icon: <UploadOutlined />
  }]},
];

type LayoutProps = {
  children: React.ReactNode;
};

const Root: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = useCallback(() => setCollapsed(!collapsed), [collapsed]);
  const { Header, Sider, Content } = Layout;
  const history = useHistory();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const location = useLocation();
  const pathname = location.pathname;

  const onOpenChange: OpenEventHandler = (keys) => {
    setOpenKeys(keys as string[])
  };

  // 菜单随路由高亮
  useEffect(() => {
    const getMatched = (arr: MenuConfig[]) => arr.find(i => matchPath(pathname, { path: i.path }));
    const isRoot = pathname === '/';
    const matched = getMatched(userMenus.filter(i => i.path !== '/'));
    const opens = matched?.children ? [matched.path] : [];
    const selectItems = matched?.children ? [getMatched(matched.children)?.path] : [matched?.path];
    setSelectedKeys(isRoot ? ['/'] : selectItems as string[]);
    setOpenKeys(isRoot ? [] : opens);
  }, [pathname]);

  return (
    <Layout id="app-components_layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={onOpenChange}
        >
          {userMenus.map(({ children, path, title, icon }) =>
            children ? (
              <Menu.SubMenu key={path} title={title} icon={icon}>
                {children.map(({ path, title }) => {
                  return (
                    <Menu.Item key={path} onClick={() => history.push(path)}>
                      {title}
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            ) : (
              <Menu.Item
                key={path}
                icon={icon}
                onClick={() => history.push(path)}
              >
                {title}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <span onClick={onCollapse} className="trigger">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Root;
