import React, { useState, useInsertionEffect } from "react"
import { Form, Input, Button, notification  } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Axios from "axios";


function Signup() {

    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = (values) => {
        console.log("onFinish : ", values);

        async function fn() {
            const { username, password } = values;

            setFieldErrors({});

            const data = { username, password };
            try {
                await Axios.post("http://127.0.0.1:8000/accounts/signup/", data);

                // 알림 박스
                notification.open ({
                    message: "회원가입 성공",
                    description: "로그인 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });

                // 로그인 성공시 페이지 이동
                history.push("/accounts/login");
            }
            catch (error) {
                if ( error.response ) {
                    // 알림 박스
                    notification.open({
                        message: "회원가입 실패",
                        description: "아이디/암호를 확인해주세요.",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />
                      });

                    // 에러 응답을 fieldsErrorMessages 라는 명칭으로 이름을 변경
                    const { data : fieldsErrorMessages } = error.response;

                    // error 가 발생하면 error 값을  setFieldErrors 함수를 이용하여  에 저장
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                          (acc, [fieldName, errors]) => {
                            // errors : ["m1", "m2"].join(" ") => "m1 "m2"
                            acc[fieldName] = {
                              validateStatus: "error",
                              help: errors.join(" ")
                            };
                            return acc;
                          },
                          {}
                        )
                      );



                }
            }
    
        }

        fn();


    };

    return (
        <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' },
                    { min:5, message: "5글자 입력해주세요."}
            ]}
            hasFeedback
            {...fieldErrors.username}
            >
                <Input />
            </Form.Item>
    
            <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            {...fieldErrors.password}
            >
                <Input.Password />
            </Form.Item>
    
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
      </Form>
    );
}

export default Signup;
