import React, { useEffect, useState  } from "react";
import Axios from "axios";
import Post from "./Post";


const apiUrl = "http://127.0.0.1:8000/api/posts/";

function PostList() {

    const [ postList, setPostList ] = useState([]);

    // userEffect(함수, []) 형태
    useEffect(() => {
        console.log("마운트 되었을 때, 처음 1회만 호출 됨");

        // 여기에서 axios 를 이용하여 PostList API 호출
        // Axios.get 함수는 프로미스 객체를 반환.. 그래서 then 과 catch 로 처리
        Axios.get(apiUrl)
            .then(response => {
                console.log("loaded response :", response)
                const { data } = response;
                setPostList(data);
            })
            .catch(error => {
                // 응답을 받기 전과 후 모두 error 가 발생 할 수 있음
                console.log(error.response);
            })

    }, []);

    return (
        <div>
            {postList.map(
                // postList 단위가 아닌 post 단위로. 즉, 
                // n개 post 가 postList를 구성하는 방식으로 사용하기를 권장
                // post.js 파일 생성하여 단위 처리 진행
                post => {
                    return <Post post={post}  key={post.id} />
                }
            )};
        </div>
    )
}

export default PostList;
