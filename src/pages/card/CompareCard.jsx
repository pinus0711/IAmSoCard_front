import React, { useContext } from 'react';
import { CardContext } from '../../util/CardContext';
import CompareContainer from './CompareContainer';
const CompareCard = () => {
    const { cards } = useContext(CardContext);

    return (
        <>
            <div className='h-full w-full'>
                {
                    cards.length == 0 ? <div className='text-2xl text-black'>비교함이 비어있습니다.</div> :
                        <div className='h-[80vh] '>
                            <div className="h-full grid grid-cols-2 ">
                                <CompareContainer data={cards[0]} />
                                <CompareContainer data={cards[1]} />
                            </div>
                        </div>

                }

            </div>
        </>
    )
}

export default CompareCard;