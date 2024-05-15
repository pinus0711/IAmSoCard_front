import React, { useState, useEffect } from "react";
import axios from 'axios';
import CardBenefitDetail from "./MyCardBenefitDetail";

const CardDetail = ({ data }) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (data) {
      setMessage("신청하신 " + data.name + "는 " + data.cardVendor.name + "의 " + data.type + "카드고, 연회비는 " + data.annualFee + "입니다." );
    }
  }, [data]);

  const sendMessage = async () => {
    setSending(true);
    const headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `accessToken`,
    };
    try {
        const response = await axios.post('http://localhost:8080/send-slack-message', JSON.stringify({ message }), { headers });
        // setResponseMessage('Message sent successfully: ' + JSON.stringify(response.data));
    } catch (error) {
        console.error('Error sending message:', error);
        setResponseMessage('Failed to send message: ' + error.message);
    } finally {
        setSending(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="flex flex-1 w-full">
        <img src={data.image} alt="카드이미지" className="shadow-sm h-40 w-40 rounded-full" />
        <div className="flex flex-col flex-1 ml-4">
          <h4 className="text-3xl font-semibold">{data.name}</h4>
          <hr className="my-2" />
          <div className="flex justify-around items-center text-center">
            <h4 className="text-md ">{data.type}</h4>
            <h4 className="text-md ">{data.cardVendor.name}</h4>
            <span className="px-3 py-1 rounded-full text-sm font-bold shadow">
              {data.mbti.value}
            </span>
          </div>
          <CardBenefitDetail data={data} />
          <button className="mt-4 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={() => () => { window.open(data.url) }}>
            카드신청
          </button>
        </div>
      </div>
      {responseMessage && <div className="mt-4 text-sm text-green-600">{responseMessage}</div>}
      <div className="flex w-full justify-between text-xs text-gray-500 mt-4 px-2">
        <div className="text-center">국내외용 없음</div>
        <div className="text-center">해외결제용 없음</div>
        <div className="text-center">전월실적 없음</div>
      </div>
    </div>
  );
};

export default CardDetail;
