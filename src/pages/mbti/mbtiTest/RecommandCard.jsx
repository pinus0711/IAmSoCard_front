import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RecommandCard = ({ mbti }) => {

    const [cardList, setCardList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        axios.get(`http://localhost:8080/cards/mbti/${mbti}`)
            .then(response => {
                setCardList(response.data);
                setLoading(false);
            })
            .catch(error => console.log(error));

    }, []);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="mx-auto h-80vh">
                    <div className="grid-cols-3 gap-4 flex justify-center items-center text-center font-bold">
                        {cardList.map(card => (
                            <div key={card.cardUid} className="w-full sm:w-auto">
                                <div className='text-xl'>{card.name}</div>
                                <div>{card.type}</div>
                                <img className='CardImage' src={card.image} />
                                <ul>{card.benefits.map((benefit, idx) => (
                                    <li key={idx}>{benefit.benefitOn}: {benefit.amount}{benefit.unit}</li>))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
export default RecommandCard;