import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CompareCard from '../../pages/card/CompareCard';
import Modal from '../ui/modal/Modal';
import BestPick from './rank/BestPick';
import MBTIPick from './rank/MBTIPick';
import { BASE_URL } from '../../util/Auth';

const CardRank = () => {
    const [isBest, setIsBestRank] = useState(true);
    const [cardList, setCardList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleClose = () => setIsModalOpen(false);

    useEffect(() => {
        
        const url = isBest ? BASE_URL+'/cards' : BASE_URL+'/recommend/mymbti';
        axios.get(url, {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })
        .then(response => {
            setCardList(response.data);
        })
        .catch(error => console.log(error));
    }, [isBest]);

    return (
        <div className="w-full bg-white flex flex-col mt-5 ">
            <div className="flex">
                <button onClick={() => setIsBestRank(true)}
                    className={`px-6 py-2 min-w-[120px] text-center text-xl
                                ${isBest ? 'border-2 border-blue-500 bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-500 hover:text-white'} rounded-tl rounded-tr`}>
                    베스트 픽
                </button>

                <button onClick={() => setIsBestRank(false)}
                    className={`px-6 py-2 min-w-[120px] text-center text-xl
                                ${!isBest ? 'border-2 border-blue-500 bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-500 hover:text-white'} rounded-tl rounded-tr`}>
                    MBTI 픽
                </button>
            </div>
            {isModalOpen && createPortal(<Modal onClose={handleClose}><CompareCard /></Modal>, document.body)}
            <div className={`rounded-bl rounded-br transition-colors duration-300 border-BLUE-200 border-[1px] ${isBest ? 'rounded-tr rounded-bl rounded-br' : 'rounded-lg'}`}>
                {isBest ? <BestPick cardList={cardList} /> : <MBTIPick cardList={cardList} />}
            </div>        
        </div>
    )
}

export default CardRank;
