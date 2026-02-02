import { useUserSettingStore } from "@/store/useUserSettingStore";
import basicCalculate from "@/utils/BasicCalculate";
import smartCalculate from "@/utils/SmartCalculate";
import OpenModalButton from "./OpenModal";

// 가변 요금제 리스트 렌더링
export default function Flexed() {
  const { residents, purchase, evCharger, meterRate, consumption, knowDetail } =
    useUserSettingStore();

  // 가변 요금제의 경우 평균이 120원이므로 그렇게 계산
  // basic의 경우 index 1,2,3에 저장되어있는것을 활용
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

  // index 6,7,8에 데이터가 저장되어있는 것을 활용
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
      {/* 사용량을 알고 있는지 체크 */}
      {consumption === 0 ||
      consumption === "0" ||
      knowDetail === "" ||
      knowDetail === "no" ? (
        // 만약 모른다면 basic계산기 이용
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
                <OpenModalButton year={idx} />
              </div>
            );
          })}
        </div>
      ) : (
        // 만약 사용량을 알고 있다면 smart 계산기 사용
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
                    : Number(consumption)}{" "}
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
                <OpenModalButton year={idx - 5} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
