import Link from "next/link";

export default function Calculate() {
  return (
    <>
      <form>
        {/* 1) 거주 유형 */}
        <fieldset>
          <legend>거주 유형을 선택해주세요.</legend>
          <div role="radiogroup" aria-label="거주 유형">
            <label>
              <input type="radio" name="homeType" value="apartment" />
              <span>아파트</span>
            </label>

            <label>
              <input type="radio" name="homeType" value="villa" />
              <span>연립주택</span>
            </label>

            <label>
              <input type="radio" name="homeType" value="house" />
              <span>단독주택</span>
            </label>
          </div>
        </fieldset>

        {/* 2) 거주자 수 */}
        <fieldset>
          <legend>거주자 수를 선택해주세요.</legend>
          <div role="radiogroup" aria-label="거주자 수">
            <label>
              <input type="radio" name="residents" value="1" />
              <span>1명</span>
            </label>
            <label>
              <input type="radio" name="residents" value="2" />
              <span>2명</span>
            </label>
            <label>
              <input type="radio" name="residents" value="3" />
              <span>3명</span>
            </label>
            <label>
              <input type="radio" name="residents" value="4" />
              <span>4명</span>
            </label>
            <label>
              <input type="radio" name="residents" value="5plus" />
              <span>5명 이상</span>
            </label>
          </div>
        </fieldset>

        {/* 3) 스마트 미터기 */}
        <fieldset>
          <legend>스마트 미터기 설치 여부를 선택해주세요.</legend>
          <div role="radiogroup" aria-label="스마트 미터기 설치 여부">
            <label>
              <input type="radio" name="smartMeter" value="installed" />
              <span>설치</span>
            </label>
            <label>
              <input type="radio" name="smartMeter" value="notInstalled" />
              <span>미설치</span>
            </label>
          </div>
          <p>
            <Link href="/smart-calculate">
              소비량을 직접 입력하여 더욱 자세히 확인하기.
            </Link>
          </p>
        </fieldset>

        {/* 4) 전기차 충전기 */}
        <fieldset>
          <legend>기타사항</legend>
          <p>전기차 충전기 존재 여부</p>
          <div role="radiogroup" aria-label="전기차 충전기">
            <label>
              <input type="radio" name="evCharger" value="yes" />
              <span>소지 중</span>
            </label>
            <label>
              <input type="radio" name="evCharger" value="no" />
              <span>미소지 중</span>
            </label>
          </div>
        </fieldset>
      </form>
    </>
  );
}
