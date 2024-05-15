import React from 'react';
import CardBenefitDetail from './CardBenefitDetail';
import LegalNotice from '../../pages/card/cardDetailPage/LegalNotice';

const CardDetail = ({ data }) => {

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-full max-w-4xl mx-auto h-full">
            <div className="flex flex-1 w-full h-3/4" >
                <div className="flex w-1/2 rounded-lg shadow-sm justify-center items-center p-6 bg-gray-200">
                    <img src={data.image} alt="카드이미지"  />
                </div>
                
                <div className="flex flex-col flex-1 ml-4">
                    <h4 className="text-3xl font-semibold mb-3">{data.name}</h4>
                    <div className='flex justify-start items-start text-start mb-3'>
                        <h4 className='text-sm  '>{data.type}</h4>
                        <h4 className='text-sm mx-10'>{data.cardVendor.name}</h4>
                        
                    </div>
                    <h1 className="px-3 py-1 font-bold text-2xl bg-blue-200 flex">
                            {data.mbti.value}
                    </h1>
                    <CardBenefitDetail className="text-lg font-bold" data={data} />
                    
                </div>
            </div>
            <div className="flex w-full justify-between text-xs text-gray-500 mt-4 px-2 mb-5">
                <div className="text-center ">국내외용 없음</div>
                <div className="text-center">해외결제용 없음</div>
                <div className="text-center">전월실적 없음</div>
            </div>

            <LegalNotice />
        </div>
    );
}
export default CardDetail;
