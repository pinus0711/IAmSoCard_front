import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layouts/DefaultLayout';

const Signup = () => {
    const [checkedInputs, setCheckedInputs] = useState([]);
    const [nextSignupState, setNextSignupState] = useState(false);
    const navigate = useNavigate();

    const allCheckClick = useCallback((checked) => {
        if (checked) {
            setCheckedInputs(['ageCheck', 'usingListCheck', 'personalInfoCheck', 'marketingInfoCheck', 'mydataInfoCheck']);
        } else {
            setCheckedInputs([]);
        }
    }, []);

    const onCheckHandler = useCallback((checked, id) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, id]);
        } else {
            setCheckedInputs(checkedInputs.filter((el) => el !== id));
        }
    });

    const onClickAgree = () => {
        if (
            checkedInputs.includes('ageCheck') &&
            checkedInputs.includes('usingListCheck') &&
            checkedInputs.includes('personalInfoCheck') &&
            checkedInputs.includes('mydataInfoCheck')
        ) {
            setNextSignupState(true);
            navigate('registerform');
        } else {
            alert('[필수]약관을 모두 동의 해주셔야 가입절차가 진행됩니다.');
        }
    };

    return (
        <DefaultLayout>
            <>
                {!nextSignupState ? (
                    <div className="container mx-auto px-4 py-8 flex flex-col">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h1 className="text-3xl font-bold mb-4 text-center">회원가입</h1>
                            <h2 className="text-xl font-semibold mb-8 text-center">환영합니다! ALGONY 서비스 이용약관에 동의 해주세요</h2>
                            <label className="block mb-4">
                                <input
                                    type="checkbox"
                                    id="allCheck"
                                    onChange={(e) => allCheckClick(e.currentTarget.checked)}
                                    checked={checkedInputs.length >= 4 ? true : false}
                                    className="mr-2"
                                />
                                <span className="text-blue-500">모두 동의합니다.</span>
                            </label>
                            <div className="space-y-4">
                                <div>
                                    <label className="block">
                                        <input
                                            type="checkbox"
                                            id="ageCheck"
                                            onChange={(e) => {
                                                onCheckHandler(e.currentTarget.checked, 'ageCheck');
                                            }}
                                            checked={checkedInputs.includes('ageCheck') ? true : false}
                                            className="mr-2"
                                        />
                                        <span className="font-semibold">[필수]</span> 만 14세 이상입니다.
                                    </label>
                                    <div className="mt-3 ml-6 p-2 resize-none border rounded">
                                        <p>1.회원 자격: 아이엠쏘카(이하 '회사')의 서비스를 이용하기 위해서는 만 14세 이상이어야 합니다.</p>
                                        <br></br>
                                        <p>2.정보 제공: 회원은 서비스 가입 시 진실한 정보를 제공하여야 합니다.</p>
                                        <br></br>
                                        <p>3.미성년자: 만 14세 미만의 미성년자는 법정대리인의 동의를 얻어야 서비스를 이용할 수 있습니다.</p>
                                        <br></br>
                                        <p>4.책임의 한계: 만 14세 미만의 미성년자가 서비스를 이용함에 따라 발생하는 문제에 대한 책임은 해당 미성년자의 법정대리인에게 있습니다.</p>
                                        <br></br>
                                        <p> 5.변경 사항: 만 14세 이상 사용 약관은 회사의 정책에 따라 변경될 수 있습니다.</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block">
                                        <input
                                            type="checkbox"
                                            id="usingListCheck"
                                            onChange={(e) => {
                                                onCheckHandler(e.currentTarget.checked, 'usingListCheck');
                                            }}
                                            checked={checkedInputs.includes('usingListCheck') ? true : false}
                                            className="mr-2"
                                        />
                                        <span className="font-semibold">[필수]</span> ALGONY 서비스 이용약관 동의
                                    </label>
                                    <div className="mt-3 ml-6 p-2 resize-none border rounded">
                                        <p>1.마이데이터 조회: 회원은 본 서비스를 통해 제공된 마이데이터를 조회하여 카드 추천 서비스를 이용할 수 있습니다.</p>
                                        <br></br>
                                        <p>2.개인 정보 보호: 회사는 회원의 마이데이터를 안전하게 보호하며, 제3자에게 제공하지 않습니다.</p>
                                        <br></br>
                                        <p>3.추천 결과: 카드 추천 결과는 회원의 신용 정보 및 사용 패턴을 기반으로 하며, 신뢰성 있는 정보를 제공하기 위해 노력합니다.</p>
                                        <br></br>
                                        <p>4.결정의 책임: 회원은 카드 추천 결과를 바탕으로 한 결정에 대한 모든 책임을 부담합니다.</p>
                                        <br></br>
                                        <p> 5.서비스 중단: 회사는 사전 공지 없이 서비스를 중단하거나 변경할 수 있으며, 이에 대한 책임을 지지 않습니다.</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block">
                                        <input
                                            type="checkbox"
                                            id="mydataInfoCheck"
                                            onChange={(e) => {
                                                onCheckHandler(e.currentTarget.checked, 'mydataInfoCheck');
                                            }}
                                            checked={checkedInputs.includes('mydataInfoCheck') ? true : false}
                                            className="mr-2"
                                        />
                                        <span className="font-semibold">[필수]</span> 마이데이터 수집 및 이용 동의
                                    </label>
                                    <div className="mt-3 ml-6 p-2 resize-none border rounded">
                                        <p>1.개인 정보 수집: 회사는 회원가입 시 수집하는 개인정보를 최소화하여 필요한 용도로만 이용합니다.</p>
                                        <br></br>
                                        <p>2.이용 목적: 개인정보는 회원 식별, 서비스 제공, 고객 상담 등의 목적으로 이용됩니다.</p>
                                        <br></br>
                                        <p>3.보관 기간: 회원의 개인정보는 회원 탈퇴 시 또는 서비스 제공 목적이 달성된 후에는 지체 없이 파기됩니다.</p>
                                        <br></br>
                                        <p>4.제3자 제공: 회사는 회원의 개인정보를 제3자에게 제공하거나 외부에 공개하지 않습니다. 다만, 법령의 규정에 따라 제공될 수 있습니다.</p>
                                        <br></br>
                                        <p> 5.개인정보 열람 및 정정: 회원은 자신의 개인정보를 열람하고 정정할 수 있으며, 이에 대한 요청은 서비스를 통해 처리됩니다.</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block">
                                        <input
                                            type="checkbox"
                                            id="personalInfoCheck"
                                            onChange={(e) => {
                                                onCheckHandler(e.currentTarget.checked, 'personalInfoCheck');
                                            }}
                                            checked={checkedInputs.includes('personalInfoCheck') ? true : false}
                                            className="mr-2"
                                        />
                                        <span className="font-semibold">[필수]</span>개인정보 수집 및 이용 동의
                                    </label>
                                    <div className="mt-3 ml-6 p-2 resize-none border rounded">
                                        <p>1.마이데이터 수집 동의: 회원은 본 서비스를 통해 제공된 마이데이터를 회사가 수집하고 이용하는 데 동의합니다.</p>
                                        <br></br>
                                        <p>2.수집 범위: 마이데이터는 개인정보, 거래 내역, 소비 패턴 등의 정보를 포함하며, 이는 서비스 제공 목적에 한정하여 수집됩니다.</p>
                                        <br></br>
                                        <p>3.이용 목적: 회사는 수집된 마이데이터를 회원의 편의를 위한 서비스 제공 및 품질 향상, 마케팅 활동 등의 목적으로 이용할 수 있습니다.</p>
                                        <br></br>
                                        <p>4.정보 보호: 회사는 회원의 개인정보 보호를 위해 최선을 다하며, 정보 유출 및 누출을 방지하기 위한 기술적, 관리적 조치를 강화합니다.</p>
                                        <br></br>
                                        <p> 5.동의의 철회: 회원은 언제든지 마이데이터 수집에 대한 동의를 철회할 수 있으며, 이에 따라 회사는 해당 데이터의 수집 및 이용을 중단합니다.</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block">
                                        <input
                                            type="checkbox"
                                            id="marketingInfoCheck"
                                            onChange={(e) => {
                                                onCheckHandler(e.currentTarget.checked, 'marketingInfoCheck');
                                            }}
                                            checked={checkedInputs.includes('marketingInfoCheck') ? true : false}
                                            className="mr-2"
                                        />
                                        <span className="font-normal text-gray-500">[선택]</span> 마케팅 정보 수신에 대한 동의
                                    </label>
                                    <div className="mt-3 ml-6 p-2 resize-none border rounded">
                                        <p>1.마케팅 정보 수신 동의: 회원은 회사로부터의 마케팅 정보 및 광고성 정보 수신에 동의할 수 있습니다.</p>
                                        <br></br>
                                        <p>2.수신 방법: 마케팅 정보는 이메일, SMS, 푸시 알림 등의 방법을 통해 전송될 수 있습니다.</p>
                                        <br></br>
                                        <p>3.동의의 취소: 회원은 언제든지 마케팅 정보 수신에 대한 동의를 철회할 수 있으며, 이는 서비스 내 설정에서 조정할 수 있습니다.</p>
                                        <br></br>
                                        <p>4.광고성 정보 제한: 회사는 회원의 동의 없이 광고성 정보를 제3자에게 제공하지 않습니다.</p>
                                        <br></br>
                                        <p>5.광고성 정보 선택권: 회원은 특정 카테고리의 마케팅 정보를 원하지 않을 경우, 해당 카테고리의 정보 수신을 거부할 수 있습니다.</p>
                                    </div>
                                </div>
                            </div>
                            <p className=" mt-6 mb-2 text-s text-center"><b>위 개인정보 수집에 대한 동의를 거부할 권리가 있으며, 동의 거부시에는 회원가입이 제한 됩니다. </b></p>
                            <div className="flex justify-center space-x-4">
                                <button onClick={onClickAgree} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                    <span>동의하고 진행하기</span>
                                </button>
                                <button onClick={() => { navigate(-1) }} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                                    <span>취소하기</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-4">회원가입</h1>
                        <h2 className="text-xl font-semibold mb-8">환영합니다! Algony 서비스 이용약관에 동의 해주세요</h2>
                    </form>
                )}
            </>
        </DefaultLayout >
    );
};

export default Signup;