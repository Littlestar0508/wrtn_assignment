type DropDownProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  list: string[];
};

export default function DropDown({ list, ...selectProps }: DropDownProps) {
  return (
    <>
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
        {list
          .sort((a, b) => a.localeCompare(b))
          .map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
      </select>
    </>
  );
}
