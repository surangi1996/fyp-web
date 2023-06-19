import { InboxOutlined } from '@ant-design/icons';
import { Button, Upload, Space, Card } from 'antd';
import '../styles/ImageUpload.css';
import { useState } from 'react';
import baseUrl from '../api/baseUrl';

const { Dragger } = Upload;

export default function ImageUpload() {
    const [image, setImage] = useState(null);

    const [extractedText, setExtractedText] = useState(null);
    const [selectedHighlight, setSelectedHighlight] = useState(null);
    const [caption, setCaption] = useState(null);

    const handleImageChange = (info) => {
        const fileList = [...info.fileList];
        fileList.slice(-1);
        setImage(fileList[0].originFileObj);
    };

    const genCaption = (e) => {
        const text = extractedText.map(function (e) {
            return e.description;
        }).join(" ");
        console.log("text :" + text);

        const formData = new FormData();
        formData.append("text", text);
        // formData.append("file", image);

        baseUrl.post("/predict", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log("result : ", res.data)
                setCaption(res.data)
            })
            .catch((err) => {
                alert(err)
            })

    };

    function getText() {
        const formData = new FormData();
        formData.append("image", image);

        baseUrl.post("/get_text", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log("result : ", res.data)
                setExtractedText(res.data)
            })
            .catch((err) => {
                alert(err)
            })
    }
    console.log("caption " + { extractedText });

    return (
        <div className='container'>
            <div className='image-upload'>
                <h1 style={{ fontSize: 50, fontWeight: 10 }}>We will find you a good caption. Don't worry !</h1>
                {image ? (
                    <>
                        <div className="preview-container">
                            <img className='image-preview' src={URL.createObjectURL(image)} alt="Selected" />
                            {extractedText && extractedText.map((fragment, i) => {
                                if (fragment.suggestions.length === 0) {
                                    return (<div></div>);
                                }
                                return (
                                    <div className='highlight' onClick={() => setSelectedHighlight({ ...fragment, index: i })} style={{
                                        height: fragment.vertices[2].y - fragment.vertices[0].y + 'px',
                                        width: fragment.vertices[2].x - fragment.vertices[0].x + 'px',
                                        top: fragment.vertices[0].y + 'px',
                                        left: fragment.vertices[0].x + 'px'
                                    }}>
                                    </div>
                                )
                            })}
                            {selectedHighlight &&
                                <div className="menu" style={{
                                    top: selectedHighlight.vertices[2].y + 'px',
                                    left: selectedHighlight.vertices[2].x + 'px'
                                }}>
                                    <ul>
                                        {selectedHighlight.suggestions.map(suggestion => {
                                            return (<li onClick={() => setExtractedText(extractedText.map((text, i) => {
                                                setSelectedHighlight(null);
                                                if (selectedHighlight.index === i) {
                                                    return { ...text, description: suggestion, suggestions: [] };
                                                }
                                                return text;
                                            }))}>{suggestion}</li>)
                                        })}
                                    </ul>
                                </div>
                            }
                        </div>

                    </>
                ) : (
                    <Dragger
                        accept="image/*"
                        beforeUpload={() => false} // Prevent immediate upload`
                        onChange={handleImageChange}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag your image to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                        </p>
                    </Dragger>
                )}
                {image && extractedText == null &&
                    <Button style={{backgroundColor: '#03146a ', color: 'white'}} onClick={getText}>Submit</Button>
                }
                {extractedText != null && caption == null &&
                    <Button style={{backgroundColor: '#03146a ', color: 'white'}} onClick={genCaption}>Genarate Caption</Button>
                }
                {caption && (
                    <Card style={{margin: 30, backgroundColor: 'rgb(220, 220, 220)'}}>
                        <p>{caption.caption}</p>
                    </Card>
                )


                }

            </div>
        </div>
    );
}
