import React from 'react';
import DefaultLayout from "../../../layouts/DefaultLayout";
import MyCardComponent from "../MyCardPage/MyCardComponent";
import MyRecommandComponent from "../myRecommandPage/MyRecommandComponent";
import MypageProfile from "../propfiePage/MypageProfile";


const LoginedMyPageMain = () => {


  return (
    <DefaultLayout>


      <div className="bg-white shadow-md rounded-lg p-4 my-4">
        <div className="flex justify-center">
          <div>
            <MypageProfile />
            <MyCardComponent />
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 my-4">
        <MyRecommandComponent />
      </div>


    </DefaultLayout>
  )
}

export default LoginedMyPageMain