import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const PostModify = () => {
    let params = useParams();
    let navigate = useNavigate();

    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 글 정보 가져오기
    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    useEffect(() => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
    }, [postInfo]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("모든 항목을 채워주세요.");
        }

        let body = {
            title: title,
            content: content,
            postNum: params.postNum
        }

        axios
            .post("/api/post/modify", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 수정이 완료되었습니다.")
                    navigate("/list");
                } else {
                    alert("글 수정이 실패하였습니다.")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>MODIFY</h3>
                <p>게시글을 수정해주세요.</p>
            </div>
            <form className="login__form">
                <fieldset>
                    <legend className="blind">글쓰기 영역</legend>
                    <div>
                        <label htmlFor="title" className="required blind">제목</label>
                        <input
                            id="title"
                            type="text"
                            placeholder='제목을 입력해주세요'
                            value={title || ""}
                            onChange={(e) => {
                                setTitle(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="required blind">내용</label>
                        <textarea
                            id="content"
                            type="text"
                            value={content || ""}
                            placeholder='내용을 입력해주세요'
                            onChange={(e) => {
                                setContent(e.currentTarget.value);
                            }}
                        ></textarea>
                    </div>
                    <div className='modify_btn'>
                        <button
                            type="submit"
                            className="btn__style2 mt50"
                            onClick={(e) => {
                                onSubmit(e);
                            }}
                        >수정하기</button>
                        <button
                            type="submit"
                            className="btn__style2 mt50"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1);
                            }}
                        >취소하기</button>
                    </div>

                </fieldset>
            </form>
        </div>
    )
}

export default PostModify