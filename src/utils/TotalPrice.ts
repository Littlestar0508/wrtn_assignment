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

const totalPrice = ({
  meterRate,
  chk,
  consumption,
  purchase,
  evCharger,
  year,
  residents,
  knowDetail,
}: TotalPriceType) => {
  if (meterRate === "fixed") {
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
    if (knowDetail === "yes") {
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
      Number(
        basicCalculate({
          residents,
          purchase,
          electronicCar: evCharger,
          meter: meterRate,
        })?.[year]?.pay,
      ) ?? 0;
    }
  }
};

export default totalPrice;
