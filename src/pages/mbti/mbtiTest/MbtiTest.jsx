import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiBox } from "react-icons/bi";
import { FaBars, FaSearch } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { useAuth } from '../../../util/Auth.jsx';
import './MbtiTest.css';
import RecommandCard from './RecommandCard.jsx';

const questionList = [
  {
    id: 0,
    q: ['이번 주말에 뭐해!?', '나랑 수원 스타필드 쇼핑 갈래?'],
    a: [
      { type: "I", text: "미안🙏, 이번 주말에 안방 인테리어하고 배달시켜먹기로 했어" },
      { type: "E", text: "미~안, 주말에 다른 친구랑 캠핑가기로 해서 못 갈것 같아😓" }
    ]
  },
  {
    id: 1,
    q: ['그래?😢그럼 어쩔 수 없지,,', '너 그거 알어?', '절약왕에서 뮤지컬 티켓이랑 m마트 상품권 네고했대.', '두개 중 하나만 1000원 딜이래!', '넌 뭐 사고싶어?'],
    a: [
      { type: "T", text: "그래? 그럼 난 문화 공연 좀 즐겨보게 뮤지컬 티켓 사야겠다" },
      { type: "F", text: "오, 상품권해야겠다. 그걸로 이것저것 사러가야겠다" }
    ]
  },
  {
    id: 2,
    q: ['역시 너 답다😎', '너 이번 달에도 그거 해?', '나에게 주는 선물!💝', '이번엔 어떤 선물을 사줄거야?'],
    a: [
      { type: "T", text: "개발자 인생은 공부로 시작해서 공부로 끝나니까 IT도서와 강의📚" },
      { type: "F", text: "나 곧 바다로 돌아갈 것 같아서,, 거묵목 방지를 위한 안마기 및 영양제💪." }
    ]
  },
  {
    id: 3,
    q: ['그게 뭐야 ㅋㅋㅋㅋ', '그럼 너는 쇼핑할 때 필요한것만 사기, 어디든 구경하기', '너는 어떤 스타일이야?'],
    a: [
      { type: "J", text: "사야할 것만 사면 되지. 필요한 것만 사러 직진해" },
      { type: "P", text: "혹시 모르니까 여기도 저기도 둘러보는게 좋아. 관심가는 곳이면 어디든 구경하며 움직이기." }
    ]
  },
  {
    id: 4,
    q: ['너도 그렇지?! 나도!', '쇼핑하니까 생각났네!', '너 저번에 너가 계속 사고 싶었던 옷 봤다며!', '그때 놓치면 언제 또 볼지 모른다며 엄청 고민했잖아.', '결국 샀어?🤷‍♂️'],
    a: [
      { type: "J", text: "아니, 아쉽지만 생활비가 정해져 있으니까 안 샀어." },
      { type: "P", text: "그럼~ 언제 또 찾을지 모르는데, 절대 못 참지. 지갑 OPEN! 해버렸다" }
    ]
  },
  {
    id: 5,
    q: ['ㅋㅋㅋㅋ 옷 얘기 하니까, 여행가고싶어.', '너 이번 여름휴가때 뭐 할지 정했어?'],
    a: [
      { type: "E", text: "휴가엔 무조건 비행기 한번은 타 줘야 휴가라고 할 수 있지✈️. 해외여행 갈거야." },
      { type: "I", text: "휴가엔 여유가 있어야지🎶. 여유롭게 일어나서 집근처 새로 생긴 음식점 도장깨기 간다." }
    ]
  },
  {
    id: 6,
    q: ['굿~ 좋은 계획이네!', '아, 오늘 시간 좀 비어서 심심하다.', '너는 시간 빌때 뭐 하는거 좋아해?'],
    a: [
      { type: "S", text: "전시회 가거나, 놀이동산 같은 곳 가서 즐기고 체험하는거 좋아해" },
      { type: "N", text: "온라인 쇼핑? 사고싶은 물건 찾아보고 최저가 비교하기!" }
    ]
  },
  {
    id: 7,
    q: ['오래만에 얘기 하니까 재미있네.', '다음주에는 약속 없어? 그땐 같이 쇼핑 갈 수 있어?'],
    a: [
      { type: "S", text: "그래, 물건은 직접 보면서 사야하니까! 다음주에 같이 쇼핑하러 가자!" },
      { type: "N", text: "나 물건은 온라인으로 시키는거 좋아해. 퓨팡 매니아는 쇼핑하러 외출하지 않아." }
    ]
  },
];

const mbtiExplanation = [
  {
    type: "E",
    usually: ["스트레스 받을 때는 바깥으로 나가 여유를 느끼기는걸 즐겨요.", "여행은 내 삶의 낙! 여행 속에서 돈버는 이유를 찾아요.",
      "혼자 있을 때 보다는 사람들과 함께 있을때 더 많이 쓰는 편이에요."],
    openWallet: ["비행기 마일리지가 많이 쌓였을 때", "인생샷을 남길 수 있는 여행지를 찾았을 때"],
    protectWallet: "분위기에 취해 '내가 결제할게.' 라고 하지 않아요",
  },
  {
    type: "I",
    usually: ["이불 속에서 찐 행복을 느끼는 나, 홈테리어에 투자를 아끼지 않아요.", "나의 주된 소비 활동지인 집 주변의 상권은 내 손안에 있어요.",
      "집에서 나만의 시간을 보내며 에너지를 충전해요."],
    openWallet: ["집근처에 새로 생긴 핫플레이스를 발견했을 때", "배달앱 할인쿠폰을 제공해줄 때"],
    protectWallet: "배달음식보다는 직접 음식을 해먹어요",
  },
  {
    type: "S",
    usually: ["평소에 눈으로 봐야 마음이 편한 나는 온라인보다 오프라인 쇼핑을 선호해요.", "직접 해보는 경험만이 나를 성장시킨다고 생각해요"],
    openWallet: ["내가 즐기는 브랜드의 신상 박람회가 개최했을 때", "기간 한정 팝업 스토어가 열렸을 때",
      "놀이동산 할인 쿠폰이 생겼을 때"],
    protectWallet: ["같은 물건을 온라인에서 더 저렴하게 판매하는지 살펴보아요.", "비슷한 유형의 팝업스토어를 가기 전 갈지말지 고민해보아요."],
  },
  {
    type: "N",
    usually: ["온라인 소비가 많은 나는 온라인 쇼핑 플랫폼을 섭렵하고 있어요.", "내가 사고 싶은 거라면 해외 직구도 두렵지 않다!"],
    openWallet: ["온라인 맴버십에 카드사 중복 할인까지 중복할인될 때", "이벤트와 함께 진행되는 라이브 쇼핑이 진행될 때"],
    protectWallet: "장바구니에 다양한 물건을 담아두고 가격을 비교해서 구매해요.",
  },
  {
    type: "T",
    usually: ["나를 위한 일이라면 얼마가 들더라도 투자하는 편이에요", "내 인생의 라이벌은 어제의 나! 자기 개발에 아낌 없이 투자해요."],
    openWallet: ["내가 평소 보고싶었던 해외 공연이 한국에서 진행할 때", "내가 성장할 수 있다는 느낌이 올 때"],
    protectWallet: "내 소비를 바탕으로 구독형 서비스를 이용해 다양한 자기 개발에 투자해요.",
  },
  {
    type: "F",
    usually: ["집안 살림과 관련된 소비 비교는 모두 내게 맞겨라! 생활력 만랩인 나!",
      "건강에 관련된 것에서는 돈을 아끼지 않아요.", "건강을 젊어서부터 챙기는 것!"],
    openWallet: ["SNS에서 핫한 이색 맛집을 발견했을 때", "특별한 기념일일때 외식장소를 예약할 때",
      "몸에 좋은 영양제가 특별 할인 행사를 진행할 때"],
    protectWallet: "생활 영역에 특화된 카드를 사용해요.",
  },
  {
    type: "P",
    usually: "내일은 내일의 내가 책임질거야! FLEX하는 것이 나의 소비법!",
    openWallet: ["특가 이벤트가 발견되었을때", "생각지도 못한 보너스가 생겼을 때",
      "내가 평소 갖고 싶었던 물건의 할인 쿠폰이 생겼을 때"],
    protectWallet: ["지금 꼭 필요한가에 대해 생각해보아요.", "더 높은 할인을 받을 수 있을 때까지 기다려요."],
  },
  {
    type: "J",
    usually: ["카드 혜택, 할인은 꼼꼼하게 챙기며 소비하는 편이에요.", "적은 돈이라도 허투루 쓰는 법이 없어요.", "소비는 언제나 신중하게!"],
    openWallet: ["나와 잘 맞는 취미를 찾았을 때", "큰 금액이라도 3개월 이상 무이자 할부가 가능 할 때",
      "좋아하는 브랜드의 포인트가 많이 쌓였을 때"],
    protectWallet: "내 생활패턴에 관한 특화 혜택이 있는 카드를 사용해요.",
  },
]

const MbtiTest = () => {

  const { isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const timeout = () => {
    setTimeout(() => {
      setPage(1)
    }, 2000);
  };
  useEffect(() => {
    timeout();
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const time = () => {
    const today = new Date();
    const hour = today.getHours();
    let minute = today.getMinutes();
    if (parseInt(minute) < 10) minute = "0" + minute;
    if (parseInt(hour) > 12) {
      return (
        today.getHours() === 12 ?
          `오후 ${hour}:${minute}`
          :
          `오후 ${hour - 12}:${minute}`
      )
    } else {
      return `오전 ${hour}:${minute}`;
    }
  }

  const Datetime = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    return formattedDate;
  }

  const [page, setPage] = useState(0);
  const [mbtiResult, setMbtiResult] = useState("");
  const [mbtiList, setMbtiList] = useState([
    { name: "E", count: 0 }, { name: "I", count: 0 }, { name: "S", count: 0 }, { name: "N", count: 0 },
    { name: "T", count: 0 }, { name: "F", count: 0 }, { name: "P", count: 0 }, { name: "J", count: 0 }
  ]);

  const handleClickAnswer = (type, text, idx) => {
    const list = mbtiList;
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === type) {
        list[i].count += 1;
      }
    }
    setMbtiList(list);
    setPage(page + 1);
    // setAnswers(answers => ({ ...answers, id: idx, text: text }));

    if (idx + 1 === questionList.length) {
      setMbti();
    }
  };

  const [mbtiContents, setMbtiContents] = useState([]);
  const [mbtiUsually, setMbtiUsually] = useState([]);
  const [mbtiOpenWallet, setMbtiOpenWallet] = useState([]);
  const [mbtiProtectWallet, setMbtiProtectWallet] = useState([]);

  useEffect(() => {
    const formDataPhone = new FormData();

    formDataPhone.append('value', mbtiResult);

    axios.post("http://localhost:8080/customer/myInfo/update", formDataPhone, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem("accessToken"),
        target: "mbti"
      },
    })
      .then(res => {
        if (res.status === 200) {
        }
      }).catch(err => {
      }, [mbtiResult])
  })

  function setMbti() {
    let mbtiType = [
      { mbti: "ESTP", contents: '티클 모아 티클 흥청망청 배짱이', best: "ESTJ", worst: "INFP" },
      { mbti: "ESTJ", contents: '충동구매따윈 없다. 소비 마스터', best: "ESTP", worst: "INFJ" },
      { mbti: "ESFP", contents: '여가생활 즐기는 FLEXER', best: "ESFJ", worst: "INTP" },
      { mbti: "ESFJ", contents: '소비의 왕. 스마트한 카드 셀렉터', best: "ESFP", worst: "INTJ" },
      { mbti: "ENTP", contents: '쇼핑은 온라인에서 인터넷 쇼핑 홀릭', best: "ENTJ", worst: "ISFP" },
      { mbti: "ENTJ", contents: '자기관리 마스터. 당신은 소비 천재', best: "ENTP", worst: "ISFJ" },
      { mbti: "ENFP", contents: '나는야 소비 트렌드세터. 유행이여 나를 따르라', best: "ENFJ", worst: "ISTP" },
      { mbti: "ENFJ", contents: '여가를 즐기는 알잘딱깔센 소비러', best: "ENFP", worst: "ISTJ" },
      { mbti: "ISTP", contents: '집주면 핫플 마스터 자격증 보유자', best: "ISTJ", worst: "ENFP" },
      { mbti: "ISTJ", contents: '오늘의 나는 내일의 나를 키운다', best: "ISTP", worst: "ENFJ" },
      { mbti: "ISFP", contents: '핫플알림! 핫플알림! 유행 알고리즘 통신병', best: "ISFJ", worst: "ENTP" },
      { mbti: "ISFJ", contents: '주변 상권은 제가 살리겠습니다', best: "ISFP", worst: "ENTJ" },
      { mbti: "INTP", contents: '유행이라면 뭐든지 방구석 힙스터', best: "INFJ", worst: "ISTP" },
      { mbti: "INTJ", contents: '온라인 쇼핑 가격비교는 내게 맞겨줘', best: "INTP", worst: "ESFJ" },
      { mbti: "INFP", contents: '내가 예측하는 유행. 유행의 중심은 나', best: "INFJ", worst: "ISTP" },
      { mbti: "INFJ", contents: '내 지갑은 내가 지킨다. 지갑프로텍터', best: "INFP", worst: "ESTJ" },
    ]

    let IorE = mbtiList.find(function (data) { return data.name === "I" }).count >
      mbtiList.find(function (data) { return data.name === "E" }).count ? "I" : "E";

    let NorS = mbtiList.find(function (data) { return data.name === "N" }).count >
      mbtiList.find(function (data) { return data.name === "S" }).count ? "N" : "S";

    let TorF = mbtiList.find(function (data) { return data.name === "T" }).count >
      mbtiList.find(function (data) { return data.name === "F" }).count ? "T" : "F";

    let PorJ = mbtiList.find(function (data) { return data.name === "P" }).count >
      mbtiList.find(function (data) { return data.name === "J" }).count ? "P" : "J";

    let mbti = IorE + NorS + TorF + PorJ;
    setMbtiResult(mbti)
    let mbtiArray = [IorE, NorS, TorF, PorJ];


    mbtiExplanation.map((explain) => {
      mbtiArray.map((thing) => {
        if (thing === explain.type) {
          setMbtiUsually([...explain.usually], '/n');
          setMbtiOpenWallet([...explain.openWallet]);
          setMbtiProtectWallet([...explain.protectWallet]);
        }
      })
    });
    setMbtiContents(mbtiType.filter((val) => val.mbti === mbti)[0]);
  };

  return (
    <div className="mbtiLayout">
      {page === 0 ?
        <div className='startPageLayout' onClick={() => setPage(1)}>
          <div className='startLogo'>
            <div>소비TI</div>
            <div>▼</div>
          </div>
        </div>
        : page <= questionList.length ?
          <div className='questionLayout'>
            <div className='page'>{`${page} / ${questionList.length}`}</div>
            <div className='mbtiTitle'>
              <div className='titleProfileImg'></div>
              <div>소비TI 테스트</div>
              <div className='icon'>
                <FaSearch />
                <BiBox />
                <FaBars />
              </div>
            </div>
            <div className='datetime'>
              <IoCalendarOutline />
              <div>{Datetime()}</div>
            </div>
            {questionList.map((val, idx) =>
              <div className='questionList' key={idx} style={{ display: page === idx + 1 ? "flex" : "none" }}>
                <div className='questionItemLayout'>
                  <div className='questionProfileImg'>
                  </div>
                  <div className="questionChatListLayout">
                    <div className='sendName'>우리fis_유정호</div>
                    {val.q.map((qval, qidx) =>
                      <div key={qidx} className='chatBox'>
                        <div></div>
                        <div>◀</div> <div> {qval} </div> <div>{time()}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='answerItemLayout'>
                  <div className="answerChatBox">
                    <div>+</div> <div>#</div>
                  </div>
                  {val.a.map((aval, aidx) =>
                    <div key={aidx} className="answerBox" onClick={() => handleClickAnswer(aval.type, aval.text, idx)}>
                      {aval.text}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          :
          <div className='questionLayout'>
            <div className='resultPage'>결과</div>
            <div className='mbtiTitle'>
              <div className='titleProfileImg'></div>
              <div>소비TI 테스트</div>
              <div className='icon'>
                <FaSearch />
                <BiBox />
                <FaBars />
              </div>
            </div>
            <div className='datetime'>
              <IoCalendarOutline />
              <div>{Datetime()}</div>
            </div>
            <div className='resultList' style={{ display: "flex" }}>
              <div className='resultItemLayout'>
                <div className='resultProfileImg'>
                </div>
                <div className="resultChatListLayout">
                  <div className='resultChatBox'>
                    <div>◀</div> <div className='typing-animation'>당신의 MBTI는 {mbtiContents.mbti} 입니다.</div> <div>{time()}</div>
                  </div>
                  <div className='resultChatBox'>
                    <div>◀</div> <div>당신을 한줄로 표현하면 {mbtiContents.contents}입니다. </div> <div>{time()}</div>
                  </div>
                  <div className='resultChatBox'>
                    <div>◀</div> <div> 평소의 나는 {mbtiUsually}</div> <div>{time()}</div>
                  </div>
                  <div className='resultChatBox'>
                    <div>◀</div> <div> 내 지갑이 열리는 순간은 {mbtiOpenWallet}</div> <div>{time()}</div>
                  </div>
                  <div className='resultChatBox'>
                    <div>◀</div> <div> 내 지갑을 지키기 위해서는 {mbtiProtectWallet}</div> <div>{time()}</div>
                  </div>
                  <div className='resultChatBox'>
                    <div>◀</div> <div> 나의 환상의 궁합은 {mbtiContents.best}. 환장의 궁합은 {mbtiContents.worst}</div> <div>{time()}</div>
                  </div>
                  <div className='resultChatBox flex justify-items-start items-start'>
                    <div>◀</div>
                    <div className="flex items-center">
                      <RecommandCard mbti={mbtiResult} />

                    </div>
                    <div className='flex justify-start space-x-4 ml-10'> {/* 버튼을 ReccomandCard에서 10px 옆에 붙임 */}
                      <button className="text-black border border-gray-700 px-3 py-1 rounded-md transition duration-200 ease-in-out hover:border-yellow-400 hover:bg-yellow-400"
                        onClick={() => { window.open() }}>
                        카드신청
                      </button>
                      <button className="text-black border border-gray-700 px-3 py-1 rounded-md transition duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-400"
                        onClick={() => window.location.reload()}>
                        다시하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </div >
  );
};

export default MbtiTest