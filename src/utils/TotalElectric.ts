type TotalElectricType = {
  chk: boolean;
  evCharger: string;
  consumption: number | string;
  residents: string;
  year: number;
};

// 총 사용량 계산하는 함수
const totalElectric = ({
  chk,
  evCharger,
  consumption,
  residents,
  year,
}: TotalElectricType) => {
  // 사용량을 직접 알고있는지 체크 후 전기차 소지 여부에 따라 변동
  if (chk) {
    if (evCharger === "yes") return Number(consumption) * 2 * year * 12;
    else return Number(consumption) * year * 12;
  } else {
    if (evCharger === "yes") return Number(residents) * 75 * 2 * year * 12;
    else return Number(residents) * 75 * year * 12;
  }
};

export default totalElectric;
