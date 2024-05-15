import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../component/ui/button/Button.jsx';
import { useAuth } from '../../../util/Auth.jsx';


function Profile() {

    const [user, setUser] = useState({});
    const [mydata, setMydata] = useState();
    const [mycards, setMycards] = useState([]);
    const { isLoggedIn, logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const role = localStorage.getItem("role");


    useEffect(() => {
        setLoading(true);

        axios.get("http://localhost:8080/customer/myInfo", {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })
            .then(res_user => {
                setUser(res_user.data);
            })

        axios.get("http://localhost:8080/customer/myData", {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })
            .then(res_mydata => {
                setMydata(res_mydata.data);
            })

        axios.get("http://localhost:8080/customer/myCards", {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            }
        })
            .then(res_mycards => {
                setMycards(res_mycards.data);
            })

            .catch(error => console.log(error))
        setLoading(false)

    }, []);

    const num_mycards = mycards.length;

    return (
        <>
            {loading ? (null) : (
                isLoggedIn ?
                    (<div className="bg-[#f1f5f9] rounded-lg flex flex-col w-[30%] items-center justify-center">

                        <div className='flex justify-center p-5'>
                            <img className='rounded-full h-[130px]' src="public\profile.jpg"></img>
                        </div>

                        <div className=" flex flex-col justify-center">
                            <h1 className="p-1 text-2xl font-bold text-center">{user ? user.lastName : 'No last name'}님</h1>
                            <h1 className='text-2xl font-bold text-center'> 안녕하세요!</h1>

                            {role === "ROLE_ADMIN" ? null : (
                                <div className="mt-3  text-left grid grid-flow-row justify-center">
                                    <p className="text-xl font-bold">나의 카드: {num_mycards}개</p>
                                    <p className="text-xl font-bold">나의 MBTI: ENTP</p>
                                    <p className="text-xl font-bold">Life Stage: {mydata ? mydata.lifeStage : 'No lifeStage'}</p>
                                </div>)}
                        </div>

                        <div className="flex flex-col pt-6  gap-3 items-center font-bold"  >
                            {
                                role === "ROLE_ADMIN" ?
                                    <Button text="관리자페이지 가기" onClick={() => navigate("/admin")} />
                                    : <Button text={"나의 정보 수정하기"} type="Long" onClick={() => { navigate('/mypage/profileForm'); }} />
                            }

                            <Button text={"로그아웃"} type="Long" onClick={logout} />
                        </div>
                    </div>

                    )
                    : (<h2>loading</h2>)

            )}
        </>
    );
};

export default React.memo(Profile);

