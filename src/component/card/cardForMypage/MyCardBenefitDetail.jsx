const CardBenefitDetail = ({ data }) => {
  return (
    <div className="min-h-20">
      <ul>
        {data.benefits.map((benefit, index) => (
          <div key={index}>
            <div className="flex">
              <div>{benefit.benefitOn}</div>
              <div className="ml-2">{benefit.amount}</div>
              <div>{benefit.unit}</div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};
export default CardBenefitDetail;
