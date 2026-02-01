type SmartCalculateProps = {
  consumption: number | string;
  smartMeter: boolean;
  electronic: string;
};

const smartCalculate = ({
  consumption,
  smartMeter,
  electronic,
}: SmartCalculateProps) => {
  const payment = [];

  consumption = consumption === "" ? 0 : Number(consumption);

  if (electronic === "yes") consumption *= 2;
  const govern = 80000;
  const fee = consumption * 0.2;
  const install = smartMeter ? 200000 : 0;

  payment.push({ date: "고정 요금", cost: "고정 요금" });

  for (let i = 0; i < 3; i++) {
    const fixed = {
      date: `${i + 1}년`,
      cost:
        Math.floor(
          consumption * 120 * (1 - (i + 1) * 0.2) +
            govern * 12 * (i + 1) +
            fee * 12 * (i + 1),
        ) + install,
    };

    payment.push(fixed);
  }

  payment.push({ date: "가변 요금", cost: "가변 요금" });

  for (let i = 0; i < 3; i++) {
    const str =
      i === 0
        ? "겨울(11,12,1,2)월별"
        : i === 1
          ? "평상시(3,4,5,10)월별"
          : "여름(6,7,8,9)월별";

    const flexCost = i === 0 ? 80 : i === 1 ? 120 : 160;

    const flexed = {
      date: str,
      cost: Math.floor(consumption * flexCost + govern + fee) + install,
    };

    payment.push(flexed);
  }

  return payment;
};

export default smartCalculate;
