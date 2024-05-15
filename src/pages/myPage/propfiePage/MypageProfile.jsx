import { CreditCardIcon, UsersIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../component/ui/button/Button.jsx";
import { useAuth } from "../../../util/Auth.jsx";

function MypageProfile() {
  const [user, setUser] = useState({});
  const [mydata, setMydata] = useState();
  const [mycards, setMycards] = useState([]);
  const { isLoggedIn } = useAuth();



  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/customer/myInfo", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res_user) => {
        console.log(res_user.data.mbti);
        setUser(res_user.data);
      });

    axios
      .get("http://localhost:8080/customer/myData", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res_mydata) => {
        console.log("*********************************")
        console.log(res_mydata.data);
        setMydata(res_mydata.data);
      });

    axios
      .get("http://localhost:8080/customer/myCards", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res_mycards) => {
        console.log(res_mycards.data);
        setMycards(res_mycards.data);
      })

      .catch((error) => console.log(error));
  }, []);

  const num_mycards = mycards.length;

  return (
    <>

      {isLoggedIn ? (
        <div>
          <div>
            <div className="flex items-center gap-5 ml-12">
              <div className="flex items-center w-1/2">
                <div className="mr-4">
                  <div className="bg-gray-300 h-32 w-32 rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold">
                    {user ? user.lastName : "No last name"}님 안녕하세요!
                  </h1>
                  <div className="pt-5">
                    <Button text={"나의 정보 수정하기"} type="Long" onClick={() => { navigate('/mypage/profileForm'); }} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center">
                  <CreditCardIcon className="h-10 w-10 text-gray-500" />
                  <p className="ml-1 text-gray-500 text-2xl">나의 카드</p>
                  <p>
                    <span className="text-blue-500 text-3xl ml-4">
                      {num_mycards}
                    </span>
                    <span className="text-2xl">개</span>
                  </p>
                </div>

                <div className="flex items-center">
                  <UsersIcon className="h-10 w-10 text-gray-500" />
                  <p className="ml-1 text-gray-500 text-2xl">
                    <span>나의 MBTI </span>
                    <span className="text-blue-500 text-3xl ml-4">{user.mbti}</span>
                  </p>
                </div>

                <div className="flex items-center">
                  <UsersIcon className="h-10 w-10 text-gray-500" />
                  <div className="ml-1 text-gray-500 text-2xl">
                    <p>Life Stage </p>
                    <p className="text-blue-500 text-3xl ml-4">{mydata ? mydata.lifeStage : 'No lifeStage'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>loading</h2>
      )}
    </>
  );
}

export default React.memo(MypageProfile);
