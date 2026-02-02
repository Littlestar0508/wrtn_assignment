type SmartCalculateProps = {
  consumption: number | string;
  smartMeter: boolean;
  electronic: string;
};

// 직접 입력한 소비량, 전기차 소지 여부, 스마트 미터기 설치 여부로 계산하는 로직
const smartCalculate = ({
  consumption,
  smartMeter,
  electronic,
}: SmartCalculateProps) => {
  // return될 배열
  const payment = [];

  // consumption은 string타입으로 받고 있기 때문에 숫자형 변수로 변환
  consumption = consumption === "" ? 0 : Number(consumption);

  // 만약 전기차를 소지하고 있다면 소비량X2
  if (electronic === "yes") consumption *= 2;

  // 고정 세금
  const govern = 80000;
  const fee = consumption * 0.2;

  // 스마트 미터기 설치 금액
  const install = smartMeter ? 200000 : 0;

  payment.push({ date: "스마트 미터기 설치 가격", cost: install });

  // 고정 요금 -> 가변 요금 순서로 렌더링
  payment.push({ date: "고정 요금", cost: "고정 요금" });

  for (let i = 0; i < 3; i++) {
    const fixed = {
      date: `${i + 1}년`,
      // n년 소비량 = 120*(n*0.2*100% 할인) + 고정비용을 연단위로 계산
      cost: Math.floor(
        (consumption * (1 - (i + 1) * 0.2) * 120 + govern + fee) * (i + 1) * 12,
      ),
    };

    payment.push(fixed);
  }

  payment.push({ date: "가변 요금", cost: "가변 요금" });

  // 순서에 따라 겨울 -> 평상시 -> 여름을 push
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
      // 소비량 * 월별 1KWh 당 요금 + 고정 비용을 월단위로 계산
      cost: Math.floor(consumption * flexCost + govern + fee),
    };

    payment.push(flexed);
  }

  return payment;
};

export default smartCalculate;
