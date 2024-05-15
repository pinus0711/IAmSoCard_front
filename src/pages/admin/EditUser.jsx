import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/ui/button/Button';

const EditUser = () => {
    const [userList, setUserList] = useState([]);
    const [copy, setCopy] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    const handleOnDelete = (user) => {
        if (window.confirm(`${user.uid} ${user.firstName} ${user.lastName}님을 정말 삭제하시겠습니까?`)) {
            axios.delete(`http://localhost:8080/admin/users/delete/${user.accountId}`, {
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

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/users/all`, {
            headers: {
                Authorization: localStorage.getItem("accessToken"),
            }
        })
            .then(response => {
                setUserList(response.data);
                setCopy(response.data)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        setUserList(copy.filter((e) =>
            e.lastName.toLowerCase().includes(search.toLowerCase()) ||
            e.firstName.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search]);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="mt-3 w-4/5 mx-auto h-80vh overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="col-span-3">
                            <input
                                placeholder="사용자 검색"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {userList.map(user => (
                            <div key={user.uid} className="border p-4 rounded-md">
                                <div>
                                    <div>{user.uid}</div>
                                    <div>{user.firstName} {user.lastName}</div>
                                    <div>{user.phone}</div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <Button text="수정" onClick={() => navigator(`/admin/customer/${user.uid}`)} />
                                    <Button text="삭제" onClick={() => handleOnDelete(user)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default EditUser