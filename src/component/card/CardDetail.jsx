import React from 'react';
import { BsCreditCard } from "react-icons/bs";
import LegalNotice from '../../pages/card/cardDetailPage/LegalNotice';
import CardBenefitDetail from './CardBenefitDetail';


const CardDetail = ({ data }) => {

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-full max-w-4xl mx-auto h-full">
            <div className="flex flex-1 w-full h-3/4  border-b">
                <div className="flex w-1/2 rounded-lg justify-center items-center p-6">
                    <img src={data.image} alt="카드이미지" style={{ width: 230 }} />
                </div>

                <div className="flex flex-col flex-1 ml-4 justify-center">
                    <div className='flex justify-start items-center mb-3'>
                        <h4 className="text-3xl font-normal ">{data.name}</h4>
                        <h1 className="mbti">{data.mbti.value}</h1>
                    </div>
                    <div className='text-base font-semibold mb-7'>{data.cardVendor.name}</div>
                    <div className='flex items-center mb-3'>
                        <BsCreditCard className='text-2xl mr-2 text-gray-400 ml-1' />
                        <div className='text-base font-semibold mr-10'>{data.type}</div>
                    </div>
                    <CardBenefitDetail data={data} />
                    <button
                        className="w-1/2 mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-600 transition duration-300 ease-in-out"
                        onClick={() => { window.open(data.url) }}>카드신청</button>
                </div>
            </div>
            <hr />
            <div className="flex w-3/5 justify-between text-xs text-gray-500 mt-4 px-2 mb-5 ">
                <div className="text-center ">국내외용 없음</div>
                <div className="text-center">해외결제용 없음</div>
                <div className="text-center">전월실적 없음</div>
            </div>
            <br />
            <LegalNotice />
        </div>
    );
}
export default CardDetail;
