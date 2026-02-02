import { useUserSettingStore } from "@/store/useUserSettingStore";
import basicCalculate from "@/utils/BasicCalculate";
import smartCalculate from "@/utils/SmartCalculate";

export default function Fixed() {
  const { residents, purchase, evCharger, meterRate, consumption, knowDetail } =
    useUserSettingStore();
  return (
    <>
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
                <p>{elem.date} 요금제</p>
                <p>
                  월간 사용료 :{" "}
                  {evCharger === "yes"
                    ? Number(residents) * 75 * 2
                    : Number(residents) * 75}{" "}
                  KWh
                </p>
                <p>
                  총 예상 금액 :{" "}
                  {(elem.pay + (purchase ? 200000 : 0)).toLocaleString()}원
                </p>
                <button
                  type="button"
                  className="bg-primary p-2 rounded-xl mt-4 border border-secondary active:bg-emphasize"
                >
                  선택
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center gap-10">
          {smartCalculate({
            consumption,
            smartMeter: purchase,
            electronic: evCharger,
          }).map((elem, idx) => {
            if (idx !== 2 && idx !== 3 && idx !== 4) return null;
            return (
              <div
                key={elem.cost + elem.date}
                className="border-2 border-primary rounded-2xl p-4"
              >
                <p>{elem.date} 요금제</p>
                <p>
                  월간 사용료 :{" "}
                  {evCharger === "yes"
                    ? Number(consumption) * 2
                    : Number(consumption)}{" "}
                  KWh
                </p>
                <p>
                  총 예상 금액 :{" "}
                  {(
                    Number(elem.cost) + (purchase ? 200000 : 0)
                  ).toLocaleString()}
                  원
                </p>
                <button
                  type="button"
                  className="bg-primary p-2 rounded-xl mt-4 border border-secondary active:bg-emphasize"
                >
                  선택
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
