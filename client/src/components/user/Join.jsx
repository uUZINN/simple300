import React, { useState } from 'react'

import firebase from '../../firebase.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Join = () => {

    const [youName, setYouName] = useState("");
    const [youEmail, setYouEmail] = useState("");
    const [youPass, setYouPass] = useState("");
    const [youPassC, setYouPassC] = useState("");
    const [flag, setFlag] = useState(false);

    let navigate = useNavigate();

    const joinFunc = async (e) => {
        setFlag(true);
        e.preventDefault();

        if (!(youName && youEmail && youPass && youPassC)) {
            return alert("모든 항목을 채워야 회원가입이 가능합니다.");
        }
        if (youPass !== youPassC) {
            return alert("비밀번호가 다릅니다!");
        }

        // firebase 회원가입
        let createdUser = await firebase.auth().createUserWithEmailAndPassword(youEmail, youPass);

        await createdUser.user.updateProfile({
            displayName: youName,
        });

        console.log(createdUser.user)

        // mongoDB 회원가입
        let body = {
            email: createdUser.user.multiFactor.user.email,
            displayName: createdUser.user.multiFactor.user.displayName,
            uid: createdUser.user.multiFactor.user.uid,
        }

        axios.post("/api/user/join", body)
            .then((response) => {
                if (response.data.success) {
                    alert("회원가입이 완료되었습니다.");
                    navigate("/login");
                } else {
                    alert("회원가입이 실패하였습니다.")
                }
            })
    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>JOIN</h3>
                <p>회원가입 후 로그인 해주세요.</p>
            </div>
            <form className="login__form">
                <fieldset>
                    <legend className="blind">회원가입 영역</legend>
                    <div>
                        <label htmlFor="youName" className="required blind">이름</label>
                        <input
                            type="text"
                            id="youName"
                            value={youName}
                            name="youName"
                            placeholder="이름"
                            autoComplete='off'
                            className="input__style"
                            required
                            onChange={(e) => setYouName(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youEmail" className="required blind">이메일</label>
                        <input
                            type="email"
                            id="youEmail"
                            value={youEmail}
                            name="youEmail"
                            placeholder="이메일"
                            autoComplete='off'
                            className="input__style"
                            required
                            onChange={(e) => setYouEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required blind">비밀번호</label>
                        <input
                            type="password"
                            id="youPass"
                            value={youPass}
                            name="youPass"
                            placeholder="비밀번호"
                            autoComplete='off'
                            className="input__style"
                            required
                            minLength={8}
                            onChange={(e) => setYouPass(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPassC" className="required blind">비밀번호 확인</label>
                        <input
                            type="password"
                            id="youPassC"
                            value={youPassC}
                            name="youPassC"
                            placeholder="다시 한번 비밀번호를 적어주세요!"
                            autoComplete='off'
                            className="input__style"
                            required
                            minLength={8}
                            onChange={(e) => setYouPassC(e.currentTarget.value)}
                        />
                    </div>
                    <button disabled={flag} type="submit" className="btn__style2 mt50" onClick={(e) => joinFunc(e)}>회원가입</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Join