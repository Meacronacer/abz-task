import root from "./radio.module.scss";

interface props {
  value?: string;
  index: number;
  checked: boolean;
  setPosition: (value: number | ((prevVar: number) => number)) => void;
}

const Radio: React.FC<props> = ({ value, checked, setPosition, index }) => {
  return (
    <div className={root.radio}>
      <input
        onChange={() => setPosition(index)}
        type="radio"
        id={value}
        name="radio"
        value={value}
        checked={checked}
      />
      <label className={root.label} htmlFor={value}>
        {value}
      </label>
    </div>
  );
};

export default Radio;
