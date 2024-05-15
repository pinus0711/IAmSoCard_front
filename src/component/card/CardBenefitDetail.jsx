import { CiGift } from "react-icons/ci";

const CardBenefitDetail = ({ data }) => {
    return (
        <div>
            <ul>{data.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center mb-2 relative">
                    <div className="absolute left-0 top-1/2 w-full"></div>
                    <CiGift size={35} className="mr-1.5 gray text-gray-400" />
                    <div className="font-bold text-lg">{benefit.benefitOn}</div>
                    <div className="ml-2 text-base flex items-center">
                        <div className="mx-1">{benefit.amount}</div>
                        <div>{benefit.unit}</div>
                    </div>
                </div>))}
            </ul>
        </div>
    )
}
export default CardBenefitDetail;