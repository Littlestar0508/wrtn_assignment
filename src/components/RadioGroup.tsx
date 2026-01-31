type Option = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  name: string;
  legend: string;
  options: Option[];
  ariaLabel: string;
  defaultValue?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function RadioGroup({
  name,
  legend,
  options,
  ariaLabel,
  defaultValue,
  className,
  children,
}: RadioGroupProps) {
  return (
    <fieldset>
      <legend className="mb-3">{legend}</legend>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className="flex flex-wrap gap-3"
      >
        {options.map((elem) => (
          <label key={elem.value} className="inline-flex">
            <input
              type="radio"
              name={name}
              value={elem.value}
              className="sr-only peer"
              defaultChecked={defaultValue === elem.value}
            />
            <span className="border-2 border-secondary peer-checked:bg-primary p-4">
              {elem.label}
            </span>
          </label>
        ))}
      </div>
      {children ? <div className="py-3">{children}</div> : null}
    </fieldset>
  );
}
