const CardDetailInfo = ({ data }) => {
    return (
        <div className="text-2xl flex-grow divide-y divide-gray-200">
            <hr />
            <ul>{data.benefits.map((benefit) => (
                <li className="py-2 flex justify-between align-baseline">{benefit.benefitOn}: {benefit.amount}{benefit.unit}</li>))}
            </ul>
            <hr />
        </div>
    )
}
export default CardDetailInfo