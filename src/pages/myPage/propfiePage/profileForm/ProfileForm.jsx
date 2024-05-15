import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email(),
    phoneNumber: yup.string()
        .matches(/^[0-9]+$/, '숫자만 입력해주세요.'),
    password: yup.string()
        .min(8, "비밀번호는 8자리 이상이어야 합니다.")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/, "영문자 및 숫자로 조합해주세요"),
});

const profileForm = () => {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });


    const onSubmit = (data) => {
        if (!email) email = userInfo.email;
        if (!phone) phone = userInfo.phone;

        const registerData = {
            "gender": gender,
            "firstName": firstname,
            "lastName": lastname,
            "email": email,
            "phone": phoneNumber,
            "accountId": id,
            "accountPassword": password
        }
        axios.post("http://localhost:8080/register", registerData, {
        })
            .then(res => {
                if (res.status === 200) {
                    goHome();
                } else {
                    alert('개인정보 수정에 실패했습니다. 다시 시도해주세요.');
                }
            }).catch(err => {
                alert('개인정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
            });
    };

    return (
        <>
            <div className="max-w-lg mx-auto py-5 px-4 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-extrabold mb-4 text-center">개인정보 수정</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1">성별</label>
                        <div className="w-80">
                            {userInfo.gender === "f" ?
                                <div className="flex rounded-md shadow-sm">
                                    <button onClick={() => setValue('gender', "m")} style={{ cursor: "pointer" }} disabled
                                        type="button" className="mr-1 flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-200 hover:bg-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:text-white rounded-l-md rounded-r-none">

                                        남성
                                    </button>
                                    <button onClick={() => setValue('gender', "f")} style={{ cursor: "pointer" }} disabled
                                        type="button" className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-200 outline-none ring-2 ring-offset-2 ring-offset-white ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:text-white rounded-r-md">
                                        여성
                                    </button>
                                </div>
                                :
                                <div className="flex rounded-md shadow-sm">
                                    <button onClick={() => setValue('gender', "m")} style={{ cursor: "pointer" }} disabled
                                        type="button" className="mr-1 flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-blue-200 outline-none ring-2 ring-offset-2 ring-offset-white ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:text-white rounded-l-md rounded-r-none">
                                        남성
                                    </button>
                                    <button onClick={() => setValue('gender', "f")} style={{ cursor: "pointer" }} disabled
                                        type="button" className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-200 hover:bg-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:text-white rounded-r-md">
                                        여성
                                    </button>
                                </div>}
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1">이름</label>
                        <input
                            type="text"
                            value={userInfo.lastName}
                            {...register('firstname')}
                            className=" bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <label className="block mb-1">성</label>
                        <input
                            type="text"
                            value={userInfo.firstName}
                            {...register('lastname')}
                            className="bg-gray-200 border border-gray-300  text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-1">이메일</label>
                        <input type="email" {...register('email')} placeholder={userInfo.email}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1">전화번호</label>
                        <input type="text" placeholder={userInfo.phone} {...register('phoneNumber')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-1">ID</label>
                        <input
                            type="text"
                            value={userInfo.accountId}
                            {...register('id')}
                            disabled
                            className="bg-gray-200 border border-gray-300  text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block mb-1">비밀번호</label>
                        <input type="password" {...register('password')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div className="flex justify-between pt-3">
                        <button type="submit" className="w-1/3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-600">수정완료</button>
                        <button type="button" onClick={() => { navigate(-1); }} className="w-1/3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500 focus:border-red-500 hover:bg-red-600">취소</button>
                    </div >
                </form>
            </div>
        </>
    );
}

export default profileForm;