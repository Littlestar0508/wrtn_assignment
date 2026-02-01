// 가변 요금제와 고정 요금제를 간단하게 계산하는 함수
// 필요한 내용 : 인원수, 스마트 미터기 구매 여부, 전기차 충전기 소지 여부, 선택한 요금제
type BasicCalculateProps = {
  residents: string;
  purchase: boolean;
  electronicCar: string;
  meter: string;
};

const basicCalculate = ({
  residents,
  purchase,
  electronicCar,
  meter,
}: BasicCalculateProps) => {
  let pay = 0;

  // 인당 월별 75KWh 사용한다는 가정(최대 5명)
  let initE = 75 * Number(residents);
  // 전기차 충전기 소지 시 사용량 2배
  if (electronicCar === "yes") initE *= 2;
  // 정부에 월별 8만원과 0.2 * 사용량 금액 측정
  const govern = 80000;
  const fee = initE * 0.2;

  // 스마트 미터기 설치 요금
  let smartM = purchase ? 200000 : 0;

  // 고정 요금제
  if (meter === "fixed") {
    pay += 120 * initE;

    // 1,2,3년의 전체 금액(년단위)을 계산
    return [
      { date: "스마트 미터기 설치 가격", pay: smartM },
      {
        date: "1년",
        pay: Math.floor((pay * (1 - 1 * 0.2) + govern + fee) * 12),
      },
      {
        date: "2년",
        pay: Math.floor((pay * (1 - 2 * 0.2) + govern + fee) * 24),
      },
      {
        date: "3년",
        pay: Math.floor((pay * (1 - 3 * 0.2) + govern + fee) * 36),
      },
    ];
  }

  // 가변 요금제
  if (meter === "flexed") {
    // 각각 월별 금액을 계산
    return [
      { date: "스마트 미터기 설치 가격", pay: smartM },
      {
        date: "평상시(3,4,5,10)월별",
        pay: Math.floor(120 * initE + govern + fee),
      },
      {
        date: "여름(6,7,8,9)월별",
        pay: Math.floor(160 * initE + govern + fee),
      },
      {
        date: "겨울(11,12,1,2)월별",
        pay: Math.floor(80 * initE + govern + fee),
      },
    ];
  }
};

export default basicCalculate;
