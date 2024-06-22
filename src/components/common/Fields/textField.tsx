import { formantPhoneNumber } from "../../users/item/item";
import root from "./textField.module.scss";

export interface Fieldprops {
  register: any;
  name: string;
  placeholder: string;
  errors: any;
  isPhone?: boolean;
  setValue?: any;
  validate: {
    required: string | boolean;
    pattern?:
      | {
          value: string | RegExp;
          message: string;
        }
      | string;
    maxLength?:
      | {
          value: number;
          message: string;
        }
      | number;
    minLength?:
      | {
          value: number;
          message: string;
        }
      | number;
  };
}

const TextField: React.FC<Fieldprops> = ({
  placeholder,
  validate,
  register,
  name,
  errors,
  setValue,
  isPhone,
}) => {
  return (
    <div>
      <div className={root.materialTextfield}>
        {
          //@ts-ignore
          <input
            type="text"
            {...register(name, { ...validate })}
            placeholder={placeholder}
            onChange={
              isPhone
                ? (e) => setValue(name, formantPhoneNumber(e.target.value))
                : null
            }
            style={errors[name] && { border: "2px solid #cb3d40" }}
          />
        }
        {
          //@ts-ignore
          <label type="ti">{placeholder}</label>
        }
      </div>
      {errors[name] && <span className="error">{errors[name].message}</span>}
    </div>
  );
};

export default TextField;
