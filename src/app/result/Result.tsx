"use client";

import { useUserSettingStore } from "@/store/useUserSettingStore";
import totalElectric from "@/utils/TotalElectric";
import totalPrice from "@/utils/TotalPrice";

export default function ResultComponent() {
  // 사용량을 직접 입력했는지 체크
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

  const {
    residents,
    meterRate,
    evCharger,
    purchase,
    knowDetail,
    year,
    consumption,
  } = useUserSettingStore();

  return (
    <>
      <div className="flex w-2/3">
        <div className="flex-2 flex flex-col gap-4">
          <p>예상 소비량</p>
          <p>
            {/* 1달 총 사용량 계산 */}
            {totalElectric({
              chk: chkKnowDetail(),
              consumption,
              evCharger,
              residents,
              year,
            }) /
              (12 * year)}
            KWh
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {/* n년간 내야 할 전체 금액 안내 */}
          {/* 가변 요금제의 경우 모든 달을 동일하게 사용한다는 가정 하에 계산 */}
          <p>{year}년간</p>
          <p>
            {(
              totalElectric({
                chk: chkKnowDetail(),
                consumption,
                evCharger,
                residents,
                year,
              }) * 120
            ).toLocaleString()}
            원
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {/* n년간을 1달 단위로 할부 하는 형식의 계산 */}
          <p>월간</p>
          <p>
            {(
              (totalElectric({
                chk: chkKnowDetail(),
                consumption,
                evCharger,
                residents,
                year,
              }) /
                (12 * year)) *
              120
            ).toLocaleString()}
            원
          </p>
        </div>
      </div>
      {/* 총 비용 계산 , 스마트 미터기 설치 가격 측정 */}
      <div className="flex w-2/3 pt-4 font-bold text-red-500">
        <p className="flex-2">총 비용(스마트 미터기 설치 비용 포함)</p>
        <p className="flex-1">
          {(
            totalPrice({
              chk: chkKnowDetail(),
              consumption,
              evCharger,
              knowDetail,
              meterRate,
              purchase,
              residents,
              year,
            }) + (purchase ? 200000 : 0)
          )?.toLocaleString()}
          원
        </p>
        <p className="flex-1">
          {(
            totalPrice({
              chk: chkKnowDetail(),
              consumption,
              evCharger,
              knowDetail,
              meterRate,
              purchase,
              residents,
              year,
            }) /
            (12 * year)
          )?.toLocaleString()}
          원
        </p>
      </div>
      <hr className="m-4 w-2/3" />
      <div className="flex flex-col gap-4 w-2/3">
        <p className="">부가 비용 및 세금</p>
        {/* 세금 계산 */}
        <div className="flex">
          <p className="flex-2">배달 및 전력망 관리비</p>
          <p className="flex-1">{(80000 * 12 * year).toLocaleString()}원</p>
          <p className="flex-1">{(80000).toLocaleString()}원</p>
        </div>
        {/* 에너지세 계산 총 사용량 * 0.2 */}
        <div className="flex">
          <p className="flex-2">에너지세</p>
          <p className="flex-1">
            {Math.floor(
              totalElectric({
                chk: chkKnowDetail(),
                consumption,
                evCharger,
                residents,
                year,
              }) * 0.2,
            ).toLocaleString()}
            원
          </p>
          <p className="flex-1">
            {Math.floor(
              (totalElectric({
                chk: chkKnowDetail(),
                consumption,
                evCharger,
                residents,
                year,
              }) *
                0.2) /
                (year * 12),
            ).toLocaleString()}
            원
          </p>
        </div>
        {/* 주거 할인의 경우 고정 금액일때만 할인 적용 */}
        <div className="flex">
          <p className="flex-2">주거 할인</p>
          <p className="flex-1">
            {meterRate === "fixed"
              ? "-" +
                Math.floor(
                  totalPrice({
                    chk: chkKnowDetail(),
                    consumption,
                    evCharger,
                    knowDetail,
                    meterRate,
                    purchase,
                    residents,
                    year,
                  }) * 0.2,
                ).toLocaleString()
              : 0}
            원
          </p>
          <p className="flex-1">
            {meterRate === "fixed"
              ? "-" +
                Math.floor(
                  (totalPrice({
                    chk: chkKnowDetail(),
                    consumption,
                    evCharger,
                    knowDetail,
                    meterRate,
                    purchase,
                    residents,
                    year,
                  }) *
                    0.2) /
                    (12 * year),
                ).toLocaleString()
              : 0}
            원
          </p>
        </div>
      </div>
    </>
  );
}
