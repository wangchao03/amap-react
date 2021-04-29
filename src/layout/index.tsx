import { Layout, Menu } from 'antd';
import React, { useCallback, useState } from 'react';
import './index.scss';
import { useHistory } from 'react-router';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import { MenuItemProps } from 'antd/lib/menu/MenuItem';

interface MenuConfig extends MenuItemProps {
  path: string;
  children?: MenuConfig[];
  key?: number;
}

const userMenus: MenuConfig[] = [
  { path: '/home', title: 'Home', icon: <VideoCameraOutlined /> },
  { path: '/about', title: 'About', icon: <UploadOutlined /> },
];

type LayoutProps = {
  children: React.ReactNode;
};

const Root: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = useCallback(() => setCollapsed(!collapsed), [collapsed]);
  const { Header, Sider, Content } = Layout;
  const history = useHistory();

  return (
    <Layout id="app-components_layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
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
