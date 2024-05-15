import axios from "axios";
import React, { useEffect, useState } from "react";
import MyCardDetail from "../../../component/card/cardForMypage/MyCardDetail";

const MydataRecommandCardList = ({ selectedCategory, search }) => {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:8080/recommend/mydata", {
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
        <div className="p-4 bg-white rounded-lg">
          <div className="flex flex-col">
            {cardList.slice(0, 1).map((card) => (
              <div key={card.cardUid} className="w-full sm:w-auto">
                <MyCardDetail data={card} className="h-48" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default MydataRecommandCardList;
