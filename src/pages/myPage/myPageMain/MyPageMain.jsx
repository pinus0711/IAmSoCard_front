import React from "react";
import { useAuth } from '../../../util/Auth.jsx';
import LoginPage from '../../user/LoginPage.jsx';
import LoginedMyPageMain from "./LoginedMyPageMain.jsx";


const MyPageMain = () => {

  const { isLoggedIn } = useAuth();

  return (
    <div className="grid place-items-center mt-24">
      {isLoggedIn ? <LoginedMyPageMain /> : <LoginPage />}
    </div>
  );
};

export default MyPageMain;
