import React, { useState } from 'react';
import CardItem from '../CardItem';
import './CardPick.css';

const BestPick = ({ cardList }) => {

    const [animate, setAnimate] = useState(true);
    const onStop = () => setAnimate(false);
    const onRun = () => setAnimate(true);

    return (
        <div className="wrapper">
            {
                cardList.length===0?null:
                <div className="slide_container">
                <ul
                    className="slide_wrapper"
                    onMouseEnter={onStop}
                    onMouseLeave={onRun}
                >
                    <div
                        className={"slide original".concat(
                            animate ? "" : " stop"
                        )}
                    >
                        {cardList.map((card) => (
                            <li key={card.cardUid} className='cardItem'>
                                <CardItem data={card} />
                            </li>
                        ))}
                    </div>
                    <div
                        className={"slide clone".concat(animate ? "" : " stop")}
                    >
                        {cardList.map((card) => (
                            <li key={card.cardUid} className='cardItem'>
                                <CardItem data={card} />
                            </li>
                        ))}
                    </div>
                </ul>
            </div>}
        </div>
    );
}

export default BestPick;