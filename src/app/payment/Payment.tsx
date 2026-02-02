"use client";

import Fixed from "@/components/Fixed";
import Flexed from "@/components/Flexed";
import Modal from "@/components/Modal";
import RadioGroup from "@/components/RadioGroup";
import { useModalStateStore } from "@/store/useModalStateStore";
import { useUserSettingStore } from "@/store/useUserSettingStore";

export default function PaymentComponent() {
  const { meterRate, knowDetail, consumption, setMeterRate } =
    useUserSettingStore();
  const { isModalOpen } = useModalStateStore();

  return (
    <>
      {/* 최종 선택 전 고정 요금제와 가변 요금제 선택 가능 */}
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
      {/* 만약 step4에서 바로 넘어와서 고정과 가변 요금제 선택이 되지 않았다면 선택하도록 유도 */}
      {meterRate === "" ? (
        <p className="font-bold py-4">요금제를 선택해주시기 바랍니다.</p>
      ) : meterRate === "fixed" ? (
        // 고정 요금제 리스트
        <Fixed />
      ) : (
        // 가변 요금제 리스트
        <Flexed />
      )}
      {/* 모달 영역 */}
      {isModalOpen ? <Modal /> : null}
    </>
  );
}
