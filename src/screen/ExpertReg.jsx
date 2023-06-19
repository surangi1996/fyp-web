import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
} from 'antd';
import '../styles/ExpertReg.css'
import baseUrlChatBot from '../api/baseUrlChatBot';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function ExpertReg() {
    const [form] = Form.useForm();
    const [values, setValues] = useState();
    const onFinish = (values) => {
        setValues(values);
        console.log('Received values of form: ', values);
    };

    const createUser = () => {
        const formData = new FormData();
        formData.append("values", values);

        baseUrlChatBot.post("/predict", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log("result : ", res.data)
            })
            .catch((err) => {
                alert(err)
            })

    };

    return (
        <div className='register-form'>
            <h1 style={{ fontSize: 40, fontWeight: 100 }}>Fill the form to be our expert !</h1>
            <div className='form'>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '86',
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="Address"
                        label="Address"
                        // tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="Certificates"
                        label="Certificates"
                        // tooltip="What do you want others to call you?"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="Position"
                        label="Position"
                        rules={[
                            {
                                required: true,
                                message: 'Please input website!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="Experiences"
                        label="Experiences"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Intro',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button style={{backgroundColor: '#03146a ', color: 'white'}} htmlType="submit" onClick={(e) => createUser()}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}