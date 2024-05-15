import React, { useContext, useEffect, useState } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';
import '../../styles/CardItem.css';
import { CardContext } from '../../util/CardContext';
import CardBenefitDetail from './CardBenefitDetail';

const CardItem = ({ name, data }) => {
    const { cards, dispatch } = useContext(CardContext);
    const [isCardPage, setIsCardPage] = useState(true);

    useEffect(() => {
        if (name) {
            setIsCardPage(name.startsWith("card"));
        }
    }, [name])

    const handleAddCard = (id) => {
        if (cards.length < 2)
            dispatch({ type: 'ADD', payload: id });
        else
            alert("추가 금지");
    };

    return (
        <div className='CardContainer'>
            <div className='ProductBox'>
                <div className='CardInfo flex flex-col justify-center items-center'>
                    <img className='CardImage' src={data.image} />
                    <div className='CardContent'>
                        <div className='mt-4 text-xl font-bold'>{data.name}</div>
                    </div>
                </div>
                <div className='CardOverlay'>
                    <div>
                        <div className='text-xl font-bold'>{data.name + ' 카드 혜택'}</div>
                        <div className='mt-4'>
                            <CardBenefitDetail data={data} />
                        </div>
                    </div>
                    <div>
                        {isCardPage &&
                            <button onClick={() => handleAddCard(data)}
                                className="mb-2 py-2 px-3 me-2 text-sm w-full font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <div className='flex justify-center items-center'>
                                    <FiPlusCircle className='me-1' />
                                    비교함 담기
                                </div>
                            </button>}
                        <Link to={`/cards/card/${data.cardUid}`}>
                            <button
                                className="bg-gray-900 py-2 px-3 me-2 w-full text-sm font-medium text-white focus:outline-none rounded-lg border border-gray-200 hover: hover:text-yellow-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                자세히 보기
                            </button></Link>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default React.memo(CardItem)