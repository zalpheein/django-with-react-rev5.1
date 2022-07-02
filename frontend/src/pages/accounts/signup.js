import React, { useState, useInsertionEffect } from "react"

function Signup() {
    // react 에서는 각 입력값들을 어떠한 상태값에 누적을 시키는 방식
    // 아래 두 줄은 2개의 오브젝트로 처리 한다는 의미.. 하지만 하나로 통합도 가능
    // const [username, setUsername] = userState("");  // userState("") 은 빈 문자열로 초기화 의미
    // const [password, setPassword] = userState("");  // userState("") 은 빈 문자열로 초기화 의미

    // 사용자 입력값들을 하나의 오브젝트(inputs) 로 받을 경우
    const [inputs, setInputs] = useState({});

    // 사용자 입력이 발생 할 경우
    const onSubmit = (e) => {
        e.preventDefault(); // submit의 기본 실행인 새로고침을 금지
        console.log("onSubmit : ", inputs); // 서브밋 버튼 클릭시점의 입력갑 출력
    }

    const onChange = e => {
        // e.target 은 변경이 발생한 <input ~/> 자체를 의미
        // 고로 name 으로..... 이것이 username 인지, password 인지를 구분하여 입력값을 계속 누적함
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
        // setInputs({
        //     ...inputs,
        //     [name]: value
        // });

    }

    // 위의 코드를 브라우저 개발자 도구에서 확인 하는 방법
    useInsertionEffect(() => {
        console.log("change inputs :", inputs);
    }, [inputs]);

    return (
        <div>
            <form onSubmit={onSubmit} >
                {/* 고로 입력값이 변경 될때마다(onChange) 해당 값을 누적 */}
                <input type="text" name="username" id="username" onChange={ onChange } />
                <input type="password" name="password" onChange={ onChange } />
                <input type="submit" value="회원가입" />
            </form>
        </div>
    );
}

export default Signup;
