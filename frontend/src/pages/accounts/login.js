import React, { useState, useInsertionEffect } from "react"
import { Card, Form, Input, Button, notification  } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import useLocalStorage from "utils/useLocalStorage";



export default function Login() {

    const history = useHistory();
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = (values) => {
        console.log("onFinish : ", values);

        async function fn() {
            // 사용자 입력(response) 에서 username, password 를 구분하여 저장
            const { username, password } = values;

            // 에러필드 초기화
            setFieldErrors({});

            const data = { username, password };
            try {
                const response = await Axios.post("http://127.0.0.1:8000/accounts/token/", data);
                //console.log("response : ", response);

                // const { data : token } = response;
                // 위의 코드는
                // const token = response.data 과 동일한 의미

                // const { data : { token } } = response;
                // 위의 코드는
                // const token = response.data.token 과 동일한 의미

                // const { data : { token: jwtToken } } = response;
                // 위의 코드는
                // const jwtToken = response.data.token 과 동일한 의미

                const { data : { token: jwtToken } } = response;
                // console.log("jwtToken : ", jwtToken);

                // 토큰값 저장
                setJwtToken(jwtToken);

                // 알림 박스
                notification.open ({
                    message: "로그인 성공",
                    description: "로그인 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });

                // // 로그인 성공시 페이지 이동
                // history.push("/accounts/login");
            }
            catch (error) {
                if ( error.response ) {
                    // 알림 박스
                    notification.open({
                        message: "로그인 실패",
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
    }

    return (
        <Card title="로그인">
            <Form
                {...layout}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' },
                            { min:5, message: "5글자 입력해주세요."}
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}
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
        
                <Form.Item 
                    {...tailLayout}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
  
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};





