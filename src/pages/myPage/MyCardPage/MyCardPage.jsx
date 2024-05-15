import React, { useState } from 'react';
import CardImg from '../../../assets/images/cardImg.gif';
import MyCardDetailEx from '../../../component/myPage/MyCardDetailEx';
import RecommandCard from '../../../component/myPage/RecommandCard';

function MyCardPage() {
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <div style={{ display: 'flex', padding: '20px', alignItems: 'flex-start', maxWidth: '1200px', margin: 'auto' }}>
            {!selectedCard ? (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginRight: '20px' }}>
                        {dummyCards.map(card => (
                            <img
                                key={card.id}
                                src={CardImg}
                                alt={card.name}
                                onClick={() => setSelectedCard(card)}
                                style={{ cursor: 'pointer', width: '100%', transition: 'transform 0.5s' }}
                            />
                        ))}
                    </div>
                    <h1>카드 추천</h1>
                    <RecommandCard />
                </>
            ) : (
                <>
                    <img
                        src={CardImg}
                        alt={selectedCard.name}
                        style={{ maxWidth: '188px', transition: 'transform 0.5s', marginRight: '20px' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                        <MyCardDetailEx card={selectedCard} />
                        <button onClick={() => setSelectedCard(null)} style={{ marginTop: '20px' }}>돌아가기</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default MyCardPage;