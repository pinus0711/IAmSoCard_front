import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';
import { BASE_URL } from '../../util/Auth';

const CardList = ({ selectedCategory, selectedKeyword, search }) => {
    const [cardList, setCardList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredCardList, setFilteredCardList] = useState([]);

    useEffect(() => {
        setLoading(true);

        let category = '';
        if (selectedCategory === '신용카드') {
            category = '/creditCards';
        } else if (selectedCategory === '체크카드') {
            category = '/prepaidCards';
        }

        axios.get(BASE_URL+`/cards${category}`)
            .then(response => {
                const data = response.data;
                setCardList(data);

                let filterList = data;

                if (search) { 
                    filterList = filterList.filter(card => card.name.includes(search));
                } else if (selectedKeyword) { 
                    filterList = filterList.filter(card =>
                        card.benefits.some(benefit => benefit.benefitOn.includes(selectedKeyword))
                    );
                }

                setFilteredCardList(filterList);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error loading cards:", error);
                setLoading(false);
            });
    }, [selectedCategory, selectedKeyword, search]);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="w-4/5 mx-auto h-80vh overflow-y-auto">
                    <div className="grid grid-cols-4 gap-4">
                        {filteredCardList.map(card => (
                            <div key={card.cardUid} className="w-full sm:w-auto">
                                <CardItem name={"cardPage"}  data={card} className="h-48" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default React.memo(CardList);
