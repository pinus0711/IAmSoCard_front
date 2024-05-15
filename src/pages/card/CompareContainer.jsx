import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CardBenefitDetail from '../../component/card/CardBenefitDetail';
import { CardContext } from '../../util/CardContext';

const CompareContainer = ({ data }) => {
    const { dispatch } = useContext(CardContext);

    const handleDeleteCard = (id) => {
        dispatch({
            type: 'DEL',
            payload: id
        });
    };

    return (
        <>
            <div className="h-full p-2 flex flex-col items-center border border-gray-400 ">


                <div className="p-2 w-full h-1/2 items-center flex flex-col border-b border-solid border-gray-500">
                    {data == null ? <p>담긴 카드가 없습니다.</p> :
                        <div>
                            <img className="CardImage" src={data.image} alt="카드 이미지" />
                            <div className="mt-auto">
                                <Link to={`/cards/card/${data.cardUid}`}>
                                    <button
                                        className="bg-gray-900 py-2 px-3 w-40 text-sm font-medium text-white focus:outline-none rounded-lg border border-gray-200 hover: hover:text-yellow-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        자세히 보기
                                    </button>
                                </Link>
                            </div> </div>}
                </div>
                <div className="h-1/2 w-full items-start">
                    <div className="h-1/2 border-b border-solid border-gray-400 flex items-center justify-center">
                        {data && (
                            <div className="flex flex-col items-center">
                                <CardBenefitDetail data={data} />
                            </div>
                        )}
                    </div>

                    {data && (
                        <div className="flex flex-col items-center justify-center h-1/2">
                            <div className="mb-2">국내외용 없음</div>
                            <div className="mb-2">해외결제용 없음</div>
                            <div className="mb-2">전월실적 없음</div>
                        </div>
                    )}
                </div>
                <div className='mt-auto bg-gray-100 h-10'>
                    {data && <button
                        className="bg-gray-100 py-2 px-3  w-40 text-sm font-medium text-black focus:outline-none rounded-lg border border-gray-200 hover: hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
                        onClick={() => handleDeleteCard(data.cardUid)}>delete</button>}
                </div>

            </div>

        </>
    )
}

export default CompareContainer;