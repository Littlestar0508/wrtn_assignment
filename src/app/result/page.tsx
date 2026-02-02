"use client";

import { useUserSettingStore } from "@/store/useUserSettingStore";
import totalElectric from "@/utils/TotalElectric";
import totalPrice from "@/utils/TotalPrice";

export default function Result() {
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
    smartMeter,
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
      <div className="flex w-2/3 pt-4 font-bold text-red-500">
        <p className="flex-2">총 비용</p>
        <p className="flex-1">
          {totalPrice({
            chk: chkKnowDetail(),
            consumption,
            evCharger,
            knowDetail,
            meterRate,
            purchase,
            residents,
            year,
          })?.toLocaleString()}
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
        <div className="flex">
          <p className="flex-2">배달 및 전력망 관리비</p>
          <p className="flex-1">{(80000 * 12 * year).toLocaleString()}원</p>
          <p className="flex-1">{(80000).toLocaleString()}원</p>
        </div>
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
