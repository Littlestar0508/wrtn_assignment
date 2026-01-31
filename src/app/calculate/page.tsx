"use client";

import Link from "next/link";
import RadioGroup from "@/components/RadioGroup";
import { useUserSettingStore } from "@/store/useUserSettingStore";
import { useRouter } from "next/navigation";
import basicCalculate from "@/utils/BasicCalculate";

export default function Calculate() {
  const router = useRouter();
  const {
    setHomeType,
    setResidents,
    setSmartMeter,
    setMeterRate,
    setEvCharger,
    setPurchase,
    homeType,
    residents,
    smartMeter,
    meterRate,
    evCharger,
    purchase,
  } = useUserSettingStore();

  const chkAllSetting = () => {
    if (
      homeType === "" ||
      residents === "" ||
      meterRate === "" ||
      evCharger === "" ||
      smartMeter === ""
    )
      return false;

    return true;
  };

  const moveToStep5 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!chkAllSetting()) {
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
        <RadioGroup
          name="smartMeter"
          legend="현재 스마트 미터기가 설치되어 있는지 체크해주시기 바랍니다."
          options={[
            { value: "uninstalled", label: "설치 미완료" },
            { value: "installed", label: "설치 완료" },
          ]}
          ariaLabel="스마트 미터기 설치 여부"
          onChange={setSmartMeter}
          value={smartMeter}
          children={
            <label className="flex gap-2 py-2">
              <input
                type="checkbox"
                name="purchase"
                value="purchase"
                checked={purchase}
                onChange={(e) => setPurchase(e.currentTarget.checked)}
              />
              <span>
                이곳을 체크하여 스마트 미터기를 구매해주세요.(가격 200,000원)
              </span>
            </label>
          }
        />

        {/* 요금제 선택 */}
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

        <Link href="/smart-calculate" className="underline">
          시간당 소비량을 아시는 경우 이 링크를 통해 더욱 자세한 금액을 확인하실
          수 있습니다.
        </Link>
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
        {chkAllSetting() ? (
          <p>
            총 금액 :
            <br />
            {basicCalculate({
              residents,
              electronicCar: evCharger,
              meter: meterRate,
              purchase,
            })?.map((e, idx) => (
              <p key={e.pay + idx}>
                {e.date} 요금제 : {e.pay.toLocaleString()}원
              </p>
            ))}
          </p>
        ) : (
          <p className="font-bold">모든 설정을 체크해주시기 바랍니다.</p>
        )}
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
