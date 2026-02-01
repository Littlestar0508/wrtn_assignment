"use client";

import RadioGroup from "@/components/RadioGroup";
import { useUserSettingStore } from "@/store/useUserSettingStore";
import smartCalculate from "@/utils/SmartCalculate";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SmartCalculate() {
  const router = useRouter();

  const {
    evCharger,
    smartMeter,
    purchase,
    knowDetail,
    consumption,
    setEvCharger,
    setSmartMeter,
    setPurchase,
    setKnowDetail,
    setConsumption,
  } = useUserSettingStore();

  const setConsumptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.currentTarget.value;

    if (val.startsWith("-")) return;
    val = val.replace(/[^\d]/g, "");
    if (val.length > 1) val = val.replace(/^0+/, "");

    setConsumption(val);
  };

  const chkSmartSettingAll = () => {
    if (
      evCharger === "" ||
      smartMeter === "" ||
      knowDetail === "" ||
      Number(consumption) === 0
    ) {
      return false;
    }

    return true;
  };

  const chkKnowConsumption = () => {
    if (knowDetail === "no") return "no";
    if (Number(consumption) === 0) return "zero";
  };

  const moveToStep5 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const condition = chkKnowConsumption();

    if (condition === "no") {
      alert(
        "만약 소비량을 모른다면 이전 단계로 돌아가기 버튼을 클릭해주시기 바랍니다.",
      );
      return;
    }

    if (condition === "zero") {
      alert("소비량을 작성해주시기 바랍니다.");
      return;
    }

    if (!chkSmartSettingAll()) {
      alert("모든 설정을 선택해주시기 바랍니다.");
      return;
    }

    router.push("/payment");
  };

  return (
    <>
      <p className="font-bold text-xl">
        해당 페이지는 스마트 미터기를 사용하고 있고, 소비량을 알고 있는 사람들을
        대상으로 합니다.
      </p>
      <Link href="/calculate" className="underline block py-2">
        만약 소비량을 모르겠다면 이전 단계로 돌아가기
      </Link>

      <form className="flex flex-col items-start gap-8" onSubmit={moveToStep5}>
        <RadioGroup
          legend="소비량 인지 여부를 체크해주시기 바랍니다."
          ariaLabel="소비량 인지 여부"
          name="knowDetail"
          options={[
            { value: "yes", label: "알고 있다" },
            { value: "no", label: "모른다" },
          ]}
          value={knowDetail}
          onChange={setKnowDetail}
        />
        <label className="flex flex-col">
          소비량을 적어주시기 바랍니다.
          <div>
            <input
              type="number"
              className="border-2 border-secondary rounded-2xl p-2"
              value={consumption}
              onChange={setConsumptionInput}
            />{" "}
            KWh
          </div>
        </label>
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
        {chkSmartSettingAll() ? (
          smartCalculate({
            consumption,
            smartMeter: purchase,
            electronic: evCharger,
          }).map((elem) => (
            <p key={elem.cost + elem.date}>
              {typeof elem.cost === "string"
                ? elem.date
                : `${elem.date} 요금제 : ${elem.cost.toLocaleString()}원`}
            </p>
          ))
        ) : (
          <p>모든 설정을 적어주시기 바랍니다.</p>
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
