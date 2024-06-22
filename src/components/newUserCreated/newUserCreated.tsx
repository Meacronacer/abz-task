import root from "./newUserCreated.module.scss";
import successImage from "../../assets/success-image.png";

interface props {
  setNewUserCreated: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const NewUserCreated: React.FC<props> = ({ setNewUserCreated }) => {
  return (
    <div className={root.newUserCreated}>
      <h1>User successfully registered</h1>

      <img className={root.image} src={successImage} />

      <button onClick={() => setNewUserCreated(false)} className={root.ok}>
        Ok
      </button>
    </div>
  );
};

export default NewUserCreated;
