import { useForm } from "react-hook-form";
import { Dispatch, useState } from "react";
import LoadFile from "../common/loadFile/loadFile";
import Radio from "../common/radio/radio";
import TextField from "../common/Fields/textField";
import root from "./form.module.scss";
import {
  useCreateNewUserMutation,
  useGetPositionsQuery,
} from "../../redux/api/userSlice";
import { ClipLoader } from "react-spinners";
import { setPage } from "../../redux/slices/pageSlice";

const fields = [
  {
    placeholder: "Your name",
    name: "name",
    validate: {
      required: "name is required",
      minLength: {
        value: 2,
        message: "name must have at least 2 characters",
      },
      maxLaxLength: 60,
    },
  },
  {
    placeholder: "Email",
    name: "email",
    validate: {
      required: "email is required",
      minLength: {
        value: 2,
        message: "email must have at least 2 characters",
      },
      maxLaxLength: 100,
      pattern: {
        value:
          /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
        message: "User email, must be a valid email according to RFC2822",
      },
    },
  },
  {
    placeholder: "Phone",
    name: "phone",
    validate: {
      required: "phone is required",
      minLength: {
        value: 10,
        message: "not valid phone number",
      },
      numberStartWith: (number: string) =>
        number.startsWith("+38 (0)") ||
        "User phone number. Number should start with code of Ukraine +380",
    },
  },
];

export type Inputs = {
  name: string;
  email: string;
  phone: string;
  photo?: File;
};

export interface iCreated {
  setNewUserCreated: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  page: number;
  refetch: () => void;
  dispatch: Dispatch<{ type: string; payload: number }>;
}
const Form: React.FC<iCreated> = ({
  setNewUserCreated,
  refetch,
  page,
  dispatch,
}) => {
  const [createNewUser] = useCreateNewUserMutation();
  const { data: positionsData = {}, isLoading } = useGetPositionsQuery({});
  const [position_id, setPosition_id] = useState<number>(0);
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "+38 (0)",
      photo: undefined,
    },
  });

  const onSubmit = async (data: Inputs) => {
    const res = await fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/token",
    );
    const response = await res.json();
    const formData = new FormData();

    formData.append("name", data?.name as string);
    formData.append("email", data?.email as string);
    formData.append("phone", data?.phone?.replace(/[- )(]/g, ""));
    {/* 
    // @ts-ignore */}
    formData.append("position_id", position_id + 1);
    {/* 
    // @ts-ignore */}
    formData.append("photo", data?.photo?.[0]);

    createNewUser({ token: response.token, formData })
      .unwrap()
      .then(() => {
        if (page === 1) {
          refetch();
        } else {
          dispatch(setPage(1));
        }
      });
    setNewUserCreated(true);
  };

  const radioItems = positionsData?.positions?.map(
    (item: { [key: string]: string }, index: number) => {
      return (
        <Radio
          key={item.id}
          value={item.name}
          setPosition={setPosition_id}
          checked={index === position_id}
          index={index}
        />
      );
    },
  );

  const registerFields = fields.map((item, index) => {
    return (
      <TextField
        key={index}
        register={register}
        name={item.name}
        placeholder={item.placeholder}
        validate={item.validate}
        errors={errors}
        setValue={setValue}
        isPhone={item.name === "phone"}
      />
    );
  });

  return (
    <div className={root.userForm}>
      <h1 className={root.title}>Working with POST request</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={root.form}>
        <div className={root.textFilds}>
          {registerFields}
          {!errors.phone && (
            <span className={root.phone}>+38 (XXX) XXX - XX - XX</span>
          )}
        </div>

        <div className={root.selectYourPosition}>
          <h5 className={root.select}>Select your position</h5>

          <div className={root.radions}>
            {isLoading ? (
              <div className="spinner">
                <ClipLoader color="#36d7b7" size={100} />
              </div>
            ) : (
              radioItems
            )}
          </div>
        </div>

        <LoadFile trigger={trigger} errors={errors} register={register} />

        <button
          disabled={!!Object.keys(errors)?.length}
          type="submit"
          className={root.signUp}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Form;
