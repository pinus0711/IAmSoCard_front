import React from "react";
import { useAuth } from "../../../util/Auth";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            {localStorage.getItem("role") === 'ROLE_ADMIN' ? <div><li className="hover: cursor-pointer" onClick={() => navigate("/admin")}>관리자페이지</li></div> : null}
            <li onClick={logout} className="hover: cursor-pointer">로그아웃</li>

        </>
    );
}

export default Dropdown;