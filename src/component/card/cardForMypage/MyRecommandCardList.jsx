import axios from "axios";
import React, { useEffect, useState } from "react";
import CardItem from "../CardItem";
// import { response } from 'express';

const MyRecommandCardList = ({ selectedCategory, search }) => {
    const [cardList, setCardList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        axios
            .get("http://localhost:8080/recommend/member/mymbti", {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                setCardList(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [selectedCategory, search]);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="w-4/5 mx-auto h-80vh overflow-y-auto">
                    <div className="grid grid-cols-5 gap-4">
                        {cardList.map((card) => (
                            <div key={card.cardUid} className="w-full sm:w-auto">
                                <CardItem data={card} className="h-48" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
export default MyRecommandCardList;
