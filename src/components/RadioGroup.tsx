// 컴포넌트 사용을 위한 필요한 매개변수의 타입 지정
type Option = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  name: string;
  legend: string;
  options: Option[];
  ariaLabel: string;
  onChange?: (e: string) => void;
  value?: string;
  children?: React.ReactNode;
};

export default function RadioGroup({
  name,
  legend,
  options,
  ariaLabel,
  onChange,
  value,
  children,
}: RadioGroupProps) {
  // 만약 input에서 변화가 일어난다면 Zustand로 상태 관리(onChange는 props로 전달받기)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const nextSetting = value;

    onChange?.(nextSetting);
  };

  return (
    <fieldset>
      <legend className="mb-1">{legend}</legend>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className="flex flex-wrap gap-2 pb-1"
      >
        {/* 전달받은 옵션으로 리스트렌더링 */}
        {options.map((elem) => (
          <label key={elem.value} className="inline-flex">
            <input
              type="radio"
              name={name}
              value={elem.value}
              className="sr-only peer"
              checked={value === elem.value}
              onChange={handleChange}
            />
            {/* radio의 기본 스타일링을 없애고 label 영역으로 대체 */}
            <span className="border-2 border-secondary peer-checked:bg-primary p-4">
              {elem.label}
            </span>
          </label>
        ))}
      </div>
      {children}
    </fieldset>
  );
}
