import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import CardRank from '../../component/card/CardRank.jsx';
import MainBanner from '../../component/ui/banner/MainBanner.jsx';
import Modal from '../../component/ui/modal/Modal.jsx';
import DefaultLayout from '../../layouts/DefaultLayout.jsx';
import { BASE_URL, useAuth } from '../../util/Auth.jsx';
import CompareCard from '../card/CompareCard.jsx';
import Profile from '../myPage/propfiePage/Profile.jsx';
import LoginPage from '../user/LoginPage.jsx';
import axios from 'axios';

function MainPage() {

    const { isLoggedIn } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    axios.get(BASE_URL+"/cards")
    .then(res=>console.log(res.data));

    return (
        <div>
            <DefaultLayout>
                {/* 상단 배너 */}

                <div className='flex justify-between '>
                    <MainBanner />
                    {isLoggedIn ? <Profile /> : <LoginPage className='w-[30%]' />}
                </div>


                <CardRank />
            </DefaultLayout>
            <div className="flex fixed items-center  bottom-10 right-20 ">
                <button
                    className="bg-gray-900 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded h-10 whitespace-nowrap "
                    onClick={handleOpen}
                >
                    비교함
                </button>
                {isModalOpen && createPortal(
                    <Modal onClose={handleClose} className='w-2/5'>
                        <CompareCard />
                    </Modal>,
                    document.body
                )}
            </div>
        </div>
    );
};

export default MainPage;   