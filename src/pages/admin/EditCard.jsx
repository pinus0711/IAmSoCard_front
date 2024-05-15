import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../component/ui/button/Button';
import Modal from '../../component/ui/modal/Modal';
import EditCardInfo from './EditCardInfo';

const EditCard = () => {
    const [cardList, setCardList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => { setIsModalOpen(true) }
    const handleClose = () => { setIsModalOpen(false) }

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8080/cards")
            .then(response => {
                setCardList(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    const handleButtonClick = (cardUid) => {
        handleOpen();
    };

    const handleOnDelete = (card) => {
        if (window.confirm(`${card.cardUid} ${card.name} ${card.cardVendor.name}님을 정말 삭제하시겠습니까?`)) {
            axios.delete(`http://localhost:8080/admin/users/delete/${card.cardUid}`, {
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                }
            })
                .then(res => {
                    alert("삭제 완료");
                })
                .catch(error => {
                    alert("삭제 중 오류가 발생했습니다.");
                })
        } else {
            alert("취소");
        }

    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="w-3/5 mx-auto h-80vh overflow-y-auto">
                    <div className="gap-4">
                        {cardList.map(card => (
                            <div key={card.cardUid} className="w-full sm:w-auto flex justify-between items-center p-4 border border-gray-300 rounded-lg">
                                <div className='w-1/3 font-semibold text-lg'>{card.name}</div>
                                <div className='w-1/3 text-lg'>{card.cardVendor.name}</div>

                                <div className='flex gap-2'>
                                    <Button
                                        text="수정"
                                        onClick={() => handleButtonClick(card.cardUid)}
                                    />
                                    <Button text="삭제" onClick={() => handleOnDelete(card)} />
                                </div></div>
                        ))}
                        {
                            isModalOpen && createPortal(<Modal onClose={handleClose}>
                                <EditCardInfo />
                            </Modal>, document.body)
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default EditCard;