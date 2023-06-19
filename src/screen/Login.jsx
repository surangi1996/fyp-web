import React from "react";
import { Button, Checkbox, Form, Input, Divider } from 'antd';
import '../styles/Login.css'
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function Login() {
    return (
        <div className="login-container">
            <h1 style={{ fontSize: 50, fontWeight: 100 }}>Welcom to the team DivGen </h1>
            <div style={{ margin: 10 }}>
                <h1 style={{ fontSize: 30, fontWeight: 50 }}>Are you an admin or a Expert ? </h1>
                <button style={{ backgroundColor: '#03146a ', color: 'white', height: '40px', borderRadius: '5px' }}>Adimi Login</button>
                <Divider type="vertical" />
                <button style={{ backgroundColor: '#03146a ', color: 'white', height: '40px', borderRadius: '5px' }}>Expert Login</button>
            </div>
            <div className="form">
                <Form
                    className="form-set"
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your username!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button style={{ backgroundColor: '#03146a' }} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>

    );
}