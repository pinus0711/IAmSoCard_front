import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import Modal from '../../../component/ui/modal/Modal';
import LoginPage from '../../../pages/user/LoginPage';
import { useAuth } from '../../../util/Auth';
import './navbar.css';

const links = [
    {
        id: 1,
        url: '/mbti',
        text: 'MBTI',
    },
    {
        id: 2,
        url: '/cards',
        text: '카드',
    },
    {
        id: 3,
        url: '/mypage',
        text: '마이',
    },
]

const Navbar = (props) => {

    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => { setIsModalOpen(!isModalOpen) }
    const handleClose = () => { setIsModalOpen(!isModalOpen) }

    const [showLinks, setShowLinks] = useState(false);
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);
    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        if (showLinks) {
            linksContainerRef.current.style.height = `${linksHeight}px`;
        } else {
            linksContainerRef.current.style.height = '0px';
        }
    }, [showLinks]);


    return (
        <nav>
            <div className='nav-center'>
                <div className='nav-header'>
                    <button className='logo-button' onClick={() => navigate('/')}>
                        <img src={logo} className='logo' alt='logo' />
                    </button>
                    <button className='nav-toggle' onClick={toggleLinks}>
                        <FaBars />
                    </button>
                </div>
                <div className='links-container' ref={linksContainerRef}>
                    <ul className='links' ref={linksRef}>

                        {links.map((link) => {
                            const { id, url, text } = link;
                            return (
                                <li key={id}>
                                    <a className="font-bold" href={url}>{text}</a>
                                </li>
                            );
                        })}
                        {isLoggedIn ? (
                            <button className=" text-2xl mx-2 font-bold" onClick={logout}>로그아웃</button>
                        ) : (
                            <button className=" text-2xl mx-2 font-bold" onClick={handleOpen}>로그인</button>
                        )}

                        {
                            isModalOpen && createPortal(<Modal
                            className='w-1/3'
                                onClose={handleClose}>
                                <LoginPage
                                className='w-full'
                                    isLoginSuccess={() => {
                                        setIsModalOpen(false);
                                    }}
                                />
                            </Modal>, document.body)
                        }
                    </ul>

                </div>
            </div>
        </nav >
    );
};

export default Navbar;