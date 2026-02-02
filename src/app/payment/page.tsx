"use client";

import Fixed from "@/components/Fixed";
import Flexed from "@/components/Flexed";
import RadioGroup from "@/components/RadioGroup";
import { useUserSettingStore } from "@/store/useUserSettingStore";

export default function Payment() {
  const { meterRate, knowDetail, consumption, setMeterRate } =
    useUserSettingStore();

  return (
    <>
      <RadioGroup
        name="meterRate"
        legend="원하시는 요금제를 선택해주시기 바랍니다."
        options={[
          { value: "fixed", label: "고정 요금제" },
          { value: "flexed", label: "가변 요금제" },
        ]}
        ariaLabel="요금제 선택"
        children={
          <>
            <p
              className={`font-bold ${meterRate === "flexed" ? "visible" : "invisible"}`}
            >
              가변 요금제의 경우 스마트 미터기가 설치되어 있어야 합니다.
            </p>
          </>
        }
        onChange={setMeterRate}
        value={meterRate}
      />
      {meterRate === "" ? (
        <p className="font-bold py-4">요금제를 선택해주시기 바랍니다.</p>
      ) : meterRate === "fixed" ? (
        <Fixed />
      ) : (
        <Flexed />
      )}
      <div>모달영역</div>
    </>
  );
}
