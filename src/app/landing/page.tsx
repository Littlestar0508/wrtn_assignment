"use client";

export default function Landing() {
  const chkPlace = (formData: FormData) => {
    const place = formData.get("place");

    if (place !== "서울특별시" && place !== "경기도") {
      alert("타 지역을 추후 개시될 예정입니다.");
      return;
    }

    return true;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ok = chkPlace(new FormData(e.currentTarget));

    if (!ok) return;
  };

  return (
    <>
      <form onSubmit={onSubmit} className="w-3/5 flex gap-20 mx-auto mt-20">
        <label htmlFor="placeDropdown" className="sr-only">
          라벨
        </label>
        <select
          name="place"
          id="placeDropdown"
          required
          defaultValue=""
          className="flex-1 border"
        >
          <option value="" disabled hidden>
            지역을 선택해주세요.
          </option>
          <option value="강원특별자치도">강원특별자치도</option>
          <option value="경기도">경기도</option>
          <option value="경상남도">경상남도</option>
          <option value="경상북도">경상북도</option>
          <option value="광주광역시">광주광역시</option>
          <option value="대구광역시">대구광역시</option>
          <option value="대전광역시">대전광역시</option>
          <option value="부산광역시">부산광역시</option>
          <option value="서울특별시">서울특별시</option>
          <option value="세종특별자치시">세종특별자치시</option>
          <option value="울산광역시">울산광역시</option>
          <option value="인천광역시">인천광역시</option>
          <option value="전라남도">전라남도</option>
          <option value="전라북도특별자치도">전라북도특별자치도</option>
          <option value="제주특별자치도">제주특별자치도</option>
          <option value="충청남도">충청남도</option>
          <option value="충청북도">충청북도</option>
        </select>
        <button type="submit" className="bg-primary flex-1">
          다음
        </button>
      </form>
    </>
  );
}
