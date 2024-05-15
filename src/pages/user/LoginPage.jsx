
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, useAuth } from '../../util/Auth';

const LoginPage = ({ isLoginSuccess, className = '' }) => {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("username", id);
        formData.append("password", password);

        axios.post(BASE_URL+"/login", formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem("username", id);

                    login(res.headers.authorization);

                    axios.get(BASE_URL+"/role", {
                        headers: {
                            Authorization: localStorage.getItem("accessToken")
                        }
                    })
                        .then(res => {
                            localStorage.setItem("role", res.data);
                        })
                    isLoginSuccess();
                }
                if (res.status === 401) {
                    console.log("로그인 실패");
                }
            }).catch(err => console.log(err));
    }

    const activeEnter = (e) => {
        if (e.key === "Enter") {
            handleLogin(e);
        }
    }

    return (
        <div className={`w-[30%] ${className}`}>
            <div className="p-8 h-full rounded-xl border-[1px]">
                <div className="h-1/4 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold text-gray-700 text-center">로그인</h2>
                </div>
                <form className="mt-4">
                    <div>
                        <label className="block text-sm">
                            <span className="text-gray-700">아이디</span>
                            <input
                                onChange={(e) => setId(e.target.value)}
                                className="block w-full mt-1 px-4 py-2 bg-white border rounded-md shadow-sm focus:border-blue-500"
                                placeholder="아이디를 입력하세요"
                            />
                        </label>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm">
                            <span className="text-gray-700">비밀번호</span>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="block w-full mt-1 px-4 py-2 bg-white border rounded-md shadow-sm focus:border-blue-500"
                                placeholder="비밀번호를 입력하세요"
                                onKeyDown={activeEnter} // 엔터 키 입력 감지
                            />
                        </label>
                    </div>
                    <div className="flex justify-center gap-3 my-10">
                        <button
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                            onClick={() => navigate('register')}>
                            회원가입
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            onClick={handleLogin}>
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
