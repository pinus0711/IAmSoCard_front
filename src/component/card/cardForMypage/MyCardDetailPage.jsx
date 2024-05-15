import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../../layouts/DefaultLayout.jsx';
import MyCardListDetail from './MyCardListDetail.jsx';

function MyardDetailPage() {

    const [cardInfo, setCardInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const { idx } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/cards/card/${idx}`)
            .then((res) => {
                setCardInfo(res.data);
                console.log(res.data);
                setLoading(false);
            })

    }, []);

    return (
        <>
            <DefaultLayout>
                <div>
                    {loading ? (
                        <h2>loading...</h2>
                    ) : (
                        <MyCardListDetail data={cardInfo} />
                    )}
                </div>
            </DefaultLayout>
        </>
    );
};

export default MyCardDetailPage;