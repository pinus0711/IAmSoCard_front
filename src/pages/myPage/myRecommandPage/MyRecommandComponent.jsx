import React from "react";
import MbtiRecommandCardList from "../../../component/card/cardForMypage/MbtiRecommandCardList";
import MydataRecommandCardList from "../../../component/card/cardForMypage/MydataRecommandCardList";

const MyRecommandComponent = () => {

  return (
    <>
      <div className="flex gap-4 ">
        <div className="flex-1">
          <div className="pt-3">
            <div className="pl-11 font-sans text-gray-800 text-lg font-semibold tracking-wide">MBTI 추천</div>
            <div className="p-4">
              <MbtiRecommandCardList />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="pt-3">
            <div className="pl-11 font-sans text-gray-800 text-lg font-semibold tracking-wide">Mydata 추천</div>
            <div className="p-4">
              <MydataRecommandCardList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRecommandComponent;

