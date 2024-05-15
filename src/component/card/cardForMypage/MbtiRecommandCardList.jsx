import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardItem from '../CardItem';
import MyCardDetail from "../../../component/card/cardForMypage/MyCardDetail";

const MbtiRecommandCardList = ({ selectedCategory, search }) => {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

        axios.get('http://localhost:8080/recommend/member/mymbti', {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })
            .then(response => {
                setCardList(response.data);
                setLoading(false);
            })
            .catch(error => console.log(error));

    }, [selectedCategory, search]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-4 bg-white rounded-lg">
          <div className="flex flex-col">
            {cardList.slice(0, 2).map((card) => (
              <div key={card.cardUid} className="w-full sm:w-auto">
                {/* <CardItem data={card} className="h-48" /> */}
                <MyCardDetail data={card} className="h-48" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default MbtiRecommandCardList;
