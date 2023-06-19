import React from 'react';
import { Input } from 'antd';
import { useState } from 'react';
import '../styles/Chat.css';
import { Avatar, Button, Card } from 'antd';
import { UserOutlined, SendOutlined, SmileOutlined, WechatOutlined } from '@ant-design/icons';
import baseUrlChatBot from '../api/baseUrlChatBot';
const { TextArea } = Input;

export default function Chat() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState("Hello, How I can Help You?");

    function getAnswer() {
        if(question==""){
            alert("please enter the question first")
            return
        }

        baseUrlChatBot.get("/getAnswer?question=" + question, {
        })
            .then((res) => {
                // alert(res.data.message)
                console.log("result : ", res.data)
                setAnswer(res.data.message)
            })
            // Catch errors if any
            .catch((err) => {
                alert(err)
            })
    }

    return (
        <div>
            <h1 style={{
                fontSize: 40,
                fontWeight: 80
            }}>Hi there ! Lets have a chat..... {<SmileOutlined style={{ color: 'grey' }} />}</h1>
            <div className='chat'>
                <Avatar style={{ marginRight: 10 }} size={46} icon={<UserOutlined />} />
                <div style={{ position: 'relative', width: '100%' }}>
                    <TextArea
                        placeholder="Send a message"
                        autoSize={{
                            minRows: 2,
                            maxRows: 6,
                        }}
                        style={{ paddingRight: 50 }}
                        value={question} 
                        onChange={e=>setQuestion(e.target.value)}
                    />
                    <Button style={{
                        position: 'absolute',
                        bottom: 15,
                        right: 15,
                        cursor: 'pointer',
                        backgroundColor: '#03146a ',
                    }}
                    onClick={getAnswer}
                    >
                        <SendOutlined
                            style={{
                                fontSize: '20px',
                                color: 'white'
                            }}
                        />
                    </Button>

                </div>
            </div>
            <div className='message' style={{ marginTop: 50, marginLeft: 40 }}>
                <WechatOutlined style={{ fontSize: 40, color: 'grey', marginRight: 10 }} />
                <Card style={{
                    width: 600,
                    margin: "20px",
                }}
                bodyStyle={{borderStyle: 'groove', borderRadius: '10px',
                overflow: "hidden"}}>
                    <p>{answer}</p>
                </Card>
            </div>
        </div>
    );
}
