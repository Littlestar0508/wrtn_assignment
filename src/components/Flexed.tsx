import { useUserSettingStore } from "@/store/useUserSettingStore";
import basicCalculate from "@/utils/BasicCalculate";
import smartCalculate from "@/utils/SmartCalculate";
import OpenModalButton from "./OpenModal";

export default function Flexed() {
  const { residents, purchase, evCharger, meterRate, consumption, knowDetail } =
    useUserSettingStore();

  const totalBasicFlexed =
    basicCalculate({
      residents,
      purchase,
      electronicCar: evCharger,
      meter: meterRate,
    })?.reduce((acc, cur, idx) => {
      if (idx !== 0) return (acc += cur.pay * 4);
      return acc;
    }, 0) ?? 0;

  const totalSmartFlexed =
    smartCalculate({
      consumption,
      smartMeter: purchase,
      electronic: evCharger,
    })?.reduce((acc, cur, idx) => {
      if (idx === 6 || idx === 7 || idx === 8)
        return (acc += Number(cur.cost) * 4);
      return acc;
    }, 0) ?? 0;

  return (
    <div>
      {consumption === 0 ||
      consumption === "0" ||
      knowDetail === "" ||
      knowDetail === "no" ? (
        <div className="flex gap-10 items-center justify-center">
          {basicCalculate({
            residents,
            purchase,
            electronicCar: evCharger,
            meter: meterRate,
          })?.map((elem, idx) => {
            if (idx === 0) return null;
            return (
              <div
                key={elem.date + elem.pay}
                className="border-2 border-primary rounded-2xl p-4"
              >
                <p>가변 {idx}년 요금제</p>
                <p>
                  월간 사용료 :{" "}
                  {evCharger === "yes"
                    ? Number(residents) * 75 * 2
                    : Number(residents) * 75}{" "}
                  KWh
                </p>
                <p>
                  총 예상 금액 :{" "}
                  {(
                    totalBasicFlexed * idx +
                    (purchase ? 200000 : 0)
                  ).toLocaleString()}
                  원
                </p>
                <OpenModalButton />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-10 items-center justify-center">
          {smartCalculate({
            consumption,
            smartMeter: purchase,
            electronic: evCharger,
          }).map((elem, idx) => {
            if (idx !== 6 && idx !== 7 && idx !== 8) return null;
            return (
              <div
                key={elem.date + elem.cost}
                className="border-2 border-primary rounded-2xl p-4"
              >
                <p>가변 {idx - 5}년 요금제</p>
                <p>
                  월간 사용료 :{" "}
                  {evCharger === "yes"
                    ? Number(consumption) * 2
                    : Number(consumption) * 75}{" "}
                  KWh
                </p>
                <p>
                  총 예상 금액 :{" "}
                  {(
                    totalSmartFlexed * (idx - 5) +
                    (purchase ? 200000 : 0)
                  ).toLocaleString()}
                  원
                </p>
                <OpenModalButton />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
