import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import PostImage from './PostImage';

const PostWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    let navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!user.accessToken) {
            alert("로그인한 회원만 글을 작성할 수 있습니다.");
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("제목 또는 내용을 입력해주세요.")
        }

        let body = {
            title: title,
            content: content,
            image: image,
            uid: user.uid
        }

        axios
            .post("/api/post/write", body)
            .then((resopnse) => {
                if (resopnse.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    navigate("/list");
                } else {
                    alert("글 작성이 실패하였습니다.")
                }
            })
    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>WRITE</h3>
                <p>게시글을 작성해주세요.</p>
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
                            value={title}
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
                            value={content}
                            placeholder='내용을 입력해주세요'
                            onChange={(e) => {
                                setContent(e.currentTarget.value);
                            }}
                        ></textarea>
                    </div>
                    <PostImage setImage={setImage} />

                    <button
                        type="submit"
                        className="btn__style2 mt50"
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >
                        글쓰기
                    </button>
                </fieldset>
            </form>
        </div>
    )
}

export default PostWrite