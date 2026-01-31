"use client";

import Link from "next/link";
import RadioGroup from "@/components/RadioGroup";
import { useUserSettingStore } from "@/store/useUserSettingStore";
import { useRouter } from "next/navigation";

export default function Calculate() {
  const router = useRouter();
  const {
    setHomeType,
    setResidents,
    setMeterRate,
    setEvCharger,
    homeType,
    residents,
    meterRate,
    evCharger,
  } = useUserSettingStore();

  const moveToStep5 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      homeType === "" ||
      residents === "" ||
      meterRate === "" ||
      evCharger === ""
    ) {
      alert("모든 항목을 선택해주시기 바랍니다.");
      return;
    }

    router.push("/payment");
  };

  return (
    <>
      <form className="flex flex-col items-start gap-8" onSubmit={moveToStep5}>
        {/* 거주 유형 */}
        <RadioGroup
          name="homeType"
          legend="거주 유형을 선택해주세요"
          options={[
            { value: "apartment", label: "아파트" },
            { value: "villa", label: "연립주택" },
            { value: "house", label: "단독주택" },
          ]}
          ariaLabel="거주 유형"
          onChange={setHomeType}
          value={homeType}
        />

        {/* 거주자 수 */}
        <RadioGroup
          name="residents"
          legend="거주자 수를 선택해주세요."
          options={[
            { value: "1", label: "1명" },
            { value: "2", label: "2명" },
            { value: "3", label: "3명" },
            { value: "4", label: "4명" },
            { value: "5", label: "5명 이상" },
          ]}
          ariaLabel="거주자 수"
          onChange={setResidents}
          value={residents}
        />

        {/* 스마트 미터기 사용 여부 */}

        {/* 요금제 선택 */}
        <RadioGroup
          name="meterRate"
          legend="원하시는 요금제를 선택해주시기 바랍니다."
          options={[
            { value: "fixed", label: "고정 요금제" },
            { value: "flexed", label: "가변 요금제" },
          ]}
          ariaLabel="스마트 미터기 설치 여부"
          children={
            <>
              <div
                className={`${meterRate === "flexed" ? "visible" : "invisible"}`}
              >
                <p className="font-bold">
                  가변 요금제의 경우 스마트 미터기가 설치되어 있어야 합니다.
                </p>
                <label className="flex gap-2 py-2">
                  <input type="checkbox" />
                  <span>
                    이곳을 체크하여 스마트 미터기를 구매해주세요.(가격
                    200,000원)
                  </span>
                </label>
              </div>
              <Link href="/smart-calculate" className="underline">
                시간당 소비량을 아시는 경우 이 링크를 통해 더욱 자세한 금액을
                확인하실 수 있습니다.
              </Link>
            </>
          }
          onChange={setMeterRate}
          value={meterRate}
        />

        {/* 전기차 충전기 */}
        <RadioGroup
          name="evCharger"
          legend="기타 사항 - 전기차 충전기 존재 여부"
          options={[
            { value: "yes", label: "소지 중" },
            { value: "no", label: "미소지 중" },
          ]}
          ariaLabel="전기차 충전기 유무"
          onChange={setEvCharger}
          value={evCharger}
        />
        <button
          type="submit"
          className="border-2 border-primary rounded-2xl p-4 active:bg-secondary"
        >
          다음
        </button>
      </form>
    </>
  );
}
