import { useModalStateStore } from "@/store/useModalStateStore";
import { useUserSettingStore } from "@/store/useUserSettingStore";
import smartCalculate from "@/utils/SmartCalculate";
import basicCalculate from "@/utils/BasicCalculate";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Modal() {
  const router = useRouter();
  const { setModalClose } = useModalStateStore();

  const moveToResult = () => {
    router.push("/result");
  };

  const chkKnowDetail = () => {
    if (
      consumption === "0" ||
      consumption === 0 ||
      knowDetail === "" ||
      knowDetail === "no"
    )
      return false;

    return true;
  };

  const totalElectric = () => {
    if (chkKnowDetail()) {
      if (evCharger === "yes") return Number(consumption) * 2 * year * 12;
      else return Number(consumption) * year * 12;
    } else {
      if (evCharger === "yes") return Number(residents) * 75 * 2 * year * 12;
      else return Number(residents) * 75 * year * 12;
    }
  };

  const totalPrice = () => {
    if (meterRate === "fixed") {
      if (chkKnowDetail()) {
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
      if (knowDetail) {
        return (
          Number(
            smartCalculate({
              consumption,
              smartMeter: purchase,
              electronic: evCharger,
            })[year + 6].cost,
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

  const {
    residents,
    smartMeter,
    meterRate,
    evCharger,
    purchase,
    knowDetail,
    year,
    consumption,
  } = useUserSettingStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    overlayRef.current?.focus();
  }, []);
  return (
    <>
      <div
        className="bg-black/50 fixed inset-0 flex items-center justify-center"
        ref={overlayRef}
        role="button"
        tabIndex={0}
        aria-label="모달 닫기"
        onClick={setModalClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") setModalClose();
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-modal rounded-2xl p-6 border-2 border-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <p className="text-lg font-bold">
            {year + "년 " + (meterRate === "flexed" ? "가변" : "고정")} 요금제
          </p>
          <div className="flex flex-col gap-1">
            <p>
              총 예상 소비량 : {totalElectric().toLocaleString()}
              KWh
            </p>
            <p>
              단순 계산 금액(연간) : {(totalElectric() * 120).toLocaleString()}
              원
            </p>
            <p>
              할인 및 세금이 계산된 최종 금액(월간) :{" "}
              {((totalPrice() ?? 0) / (12 * year)).toLocaleString()}원
            </p>
            <p>세금 : {(totalElectric() * 0.2).toLocaleString()}원</p>
            <p>관리비 : {(80000 * year * 12).toLocaleString()}원</p>
            <p>연간 총액 : {totalPrice()?.toLocaleString()}원</p>
            <p>
              스마트 미터기 설치 시 :{" "}
              {((totalPrice() ?? 0) + 200000)?.toLocaleString()}원
            </p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={setModalClose}
              className="bg-red-200 p-2 rounded-md"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={moveToResult}
              className="bg-primary p-2 rounded-md"
            >
              결제
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
