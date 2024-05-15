// LegalDisclaimer.js
import React from 'react';
import LegalList from './LegalList';

const LegalNotice = () => {
  return (
    <div className="legal-disclaimer bg-gray-100 p-4 rounded-lg shadow-md text-sm">
      <h3 className="font-bold text-lg">법적 고지사항</h3>
      <p>본 서비스를 이용함으로써, 사용자는 다음의 조건들을 준수하기로 동의합니다:</p>
      <ul>{
        LegalList.map((key)=>
          <div key={key.title} className="w-full sm:w-auto">
            <h3 className="font-bold text-lg">{key.title}</h3>
        <p className="content" style={{ whiteSpace: "pre-wrap" }}>{key.content}</p>
          </div>
        )
        }
      </ul>
    </div>
  );
};

export default LegalNotice;
