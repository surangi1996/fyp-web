import React, { useState } from "react"
import {
    MenuFoldOutlined,
    UserAddOutlined,
    FileImageOutlined,
    WechatOutlined,
    LoginOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Image, Card, Space } from 'antd';
import logo from '../assets/logo.svg'
import '../styles/Home.css'
import ImageUpload from "./ImageUpload";
import Chat from "./Chat";
import ExpertReg from "./ExpertReg";
import Login from "./Login";

const { Header, Sider, Content } = Layout;

export default function Home() {
    const [collapsed, setCollapsed] = useState(false);
    const [key, setKey] = useState('1');

    const handleClick = (key) => {
        setKey(key);
        console.log('key  :' + key);
    }


    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout bodyStyle={{ minHeight: "100%", overflow: "auto" }}>
            <Sider style={{ height: 2000 }} trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div style={{ height: 100, padding: 20 }}>
                    <Image
                        width={100}
                        src={logo}
                    />
                </div>
                <Menu
                    style={{ height: '100vh' }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => handleClick(key)}
                    items={[
                        {
                            key: '1',
                            icon: <FileImageOutlined />,
                            label: 'Image Upload',
                        },
                        {
                            key: '2',
                            icon: <WechatOutlined />,
                            label: 'Ask a Question',
                        },
                        {
                            key: '3',
                            icon: <UserAddOutlined />,
                            label: 'Expert Register',
                        },
                        {
                            key: '4',
                            icon: <LoginOutlined />,
                            label: 'Login',
                        },

                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuFoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            display: 'flex',
                            marginLeft: 10,
                            marginTop: 15
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '100hv',
                        background: colorBgContainer,
                    }}
                >
                    {key === '1' && (
                        <ImageUpload />
                    )}
                    {key === '2' && (
                        <Chat />
                    )}
                    {key === '3' && (
                        <ExpertReg />
                    )}

                    {key === '4' && (
                        <Login />
                    )}
                </Content>
            </Layout>
        </Layout>
    );
}