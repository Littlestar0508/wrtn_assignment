"use client";

import { useRouter } from "next/navigation";
import DropDown from "@/components/DropDown";
import { useEffect } from "react";
import { useUserSettingStore } from "@/store/useUserSettingStore";

const REGION = [
  "강원특별자치도",
  "경기도",
  "경상남도",
  "경상북도",
  "광주광역시",
  "대구광역시",
  "대전광역시",
  "부산광역시",
  "서울특별시",
  "세종특별자치시",
  "울산광역시",
  "인천광역시",
  "전라남도",
  "전라북도특별자치도",
  "제주특별자치도",
  "충청남도",
  "충청북도",
];

export default function LandingComponent() {
  const router = useRouter();
  const { resetSetting } = useUserSettingStore();

  // 서울특별시 혹은 경기도를 체크한 것인지 확인
  // 만약 서울 혹은 경기권이 아니라면 false를 반환하여 경고만 하도록 유도
  const chkPlace = (formData: FormData) => {
    const place = formData.get("place");

    if (typeof place !== "string") return false;

    if (place !== "서울특별시" && place !== "경기도") {
      alert("서울/경기를 제외한 타 지역은 추후 개시될 예정입니다.");
      return false;
    }

    return true;
  };

  // submit 행동 시 실행되는 함수
  // chkPlace 함수를 통해 서울/경기권인지 확인 후 만약 맞다면 다음 페이지로 넘어갈지 결정하는 confirm 표시
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ok = chkPlace(new FormData(e.currentTarget));

    if (!ok) return;

    if (ok) {
      if (confirm("서비스 개시 지역입니다. 계산 화면으로 넘어가시겠습니까?")) {
        router.push("/calculate");
      }
    }
  };

  useEffect(() => {
    resetSetting();
  }, []);

  return (
    <>
      {/* select를 통해 드랍다운 구현*/}
      <form onSubmit={onSubmit} className="w-3/5 flex gap-20 mx-auto mt-20">
        <label htmlFor="placeDropdown" className="sr-only">
          라벨
        </label>
        <DropDown list={REGION} />
        <button type="submit" className="bg-primary flex-1">
          다음
        </button>
      </form>
    </>
  );
}
