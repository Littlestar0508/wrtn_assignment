import Link from "next/link";
import RadioGroup from "@/components/RadioGroup";

export default function Calculate() {
  return (
    <>
      <form>
        {/* 1) 거주 유형 */}
        <RadioGroup
          name="homeType"
          legend="거주 유형을 선택해주세요"
          options={[
            { value: "apartment", label: "아파트" },
            { value: "villa", label: "연립주택" },
            { value: "house", label: "단독주택" },
          ]}
          ariaLabel="거주 유형"
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
        />

        {/* 3) 스마트 미터기 */}
        <RadioGroup
          name="smartMeter"
          legend="스마트 미터기 설치 여부를 선택해주세요."
          options={[
            { value: "installed", label: "설치" },
            { value: "notInstalled", label: "미설치" },
          ]}
          ariaLabel="스마트 미터기 설치 여부"
          children={
            <Link href="/smart-calculate">
              소비량을 직접 입력하여 더욱 자세히 확인하기.
            </Link>
          }
        />

        {/* 4) 전기차 충전기 */}
        <RadioGroup
          name="evCharger"
          legend="기타 사항 - 전기차 충전기 존재 여부"
          options={[
            { value: "yes", label: "소지 중" },
            { value: "no", label: "미소지 중" },
          ]}
          ariaLabel="전기차 충전기 유무"
        />
        <button type="submit" className="py-3">
          다음
        </button>
      </form>
    </>
  );
}
