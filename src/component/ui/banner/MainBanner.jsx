import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './/MainBanner.css';

const MainBanner = () => {

    const navigate = useNavigate();

    return (
        <div className='w-2/3 h-[500px]'>
            <div className="bg-main-background bg-cover rounded-xl bg-center h-full relative border-gray-200 border-[1px]">
                <button
                    className="absolute right-6 bottom-10 bg-blue-500 text-lg font-bold text-white py-2 px-4 rounded "
                    onClick={() => { navigate('/mbti'); }}>검사하러 가기
                </button>
            </div>
        </div>
    )
}

export default MainBanner;