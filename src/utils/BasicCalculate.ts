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

  let initE = 75 * Number(residents);
  if (electronicCar === "yes") initE *= 2;
  const govern = 80000;
  const fee = initE * 0.2;

  if (meter === "fixed") {
    pay += 120 * initE;

    return [
      { date: "1년", pay: (pay * (1 - 1 * 0.2) + govern + fee) * 12 },
      { date: "2년", pay: (pay * (1 - 2 * 0.2) + govern + fee) * 24 },
      { date: "3년", pay: (pay * (1 - 3 * 0.2) + govern + fee) * 36 },
    ];
  }

  if (meter === "flexed") {
    if (purchase) pay += 200000;

    return [
      { date: "스마트 미터기 설치 가격", pay: pay },
      { date: "평상시(3,4,5,10)월별", pay: 120 * initE + govern + fee },
      { date: "여름(6,7,8,9)월별", pay: 160 * initE + govern + fee },
      { date: "겨울(11,12,1,2)월별", pay: 80 * initE + govern + fee },
    ];
  }
};

export default basicCalculate;
