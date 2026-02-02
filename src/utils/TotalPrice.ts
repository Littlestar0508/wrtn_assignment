import smartCalculate from "@/utils/SmartCalculate";
import basicCalculate from "@/utils/BasicCalculate";

type TotalPriceType = {
  meterRate: string;
  chk: boolean;
  consumption: string | number;
  purchase: boolean;
  evCharger: string;
  year: number;
  residents: string;
  knowDetail: string;
};

// 총 금액 계산하는 함수(스마트 미터기 설치 비용 제외)
const totalPrice = ({
  meterRate,
  chk,
  consumption,
  purchase,
  evCharger,
  year,
  residents,
}: TotalPriceType) => {
  // 고정 요금제라면
  if (meterRate === "fixed") {
    // 사용량을 알고 있다면
    if (chk) {
      return Number(
        smartCalculate({
          consumption,
          smartMeter: purchase,
          electronic: evCharger,
        })[year + 1].cost,
      );
    } else {
      return Number(
        basicCalculate({
          residents,
          purchase,
          electronicCar: evCharger,
          meter: meterRate,
        })?.[year]?.pay ?? 0,
      );
    }
  } else {
    // 가변인지? 사용량을 알고 있는지?
    if (chk) {
      return (
        Number(
          smartCalculate({
            consumption,
            smartMeter: purchase,
            electronic: evCharger,
          })[year + 5].cost,
        ) *
        12 *
        year
      );
    } else {
      return (
        Number(
          basicCalculate({
            residents,
            purchase,
            electronicCar: evCharger,
            meter: meterRate,
          })?.[year]?.pay,
        ) *
        12 *
        year
      );
    }
  }
};

export default totalPrice;
