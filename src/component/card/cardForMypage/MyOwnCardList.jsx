import axios from "axios";
import React, { useEffect, useState } from "react";
import MyOwnCardItem from "./MyOwnCardItem";

const MyOwnCardList = () => {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:8080/customer/myCards", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setCardList(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-nowrap space-x-4">
          {cardList.map((card) => (
            <div key={card.cardUid} className="flex-none">
              <MyOwnCardItem data={card} className="h-48" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyOwnCardList;
