import root from "./item.module.scss";
import noImage from "../../../assets/noImage.png";

export interface Iuser {
  id?: number;
  position_id?: number;
  registration_timestamp?: number;
  email: string;
  name: string;
  phone: string;
  photo: string;
  position: string;
}

export const formantPhoneNumber = (number: string) => {
  if (!number) return "+38 (0)";
  const phoneNumber = number.replace(/[^\d]/g, "").slice(3);

  if (phoneNumber.length < 3) return `+38 (0${phoneNumber})`;
  if (phoneNumber.length < 6)
    return `+38 (0${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}`;
  if (phoneNumber.length < 8)
    return `+38 (0${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5, 7)}`;

  return `+38 (0${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5, 7)} ${phoneNumber.slice(7, 9)}`;
};

const Item: React.FC<Iuser> = ({ email, name, phone, photo, position }) => {
  return (
    <div className={root.item}>
      <div className={root.image}>
        <img
          src={!photo.endsWith("placeholder.png") ? photo : noImage}
          alt="user"
        />
      </div>

      <h4 title={name} className={root.name}>
        {name}
      </h4>

      <div className={root.info}>
        <span title={position} className={root.position}>
          {position}
        </span>
        <span title={email} className={root.email}>
          {email}
        </span>
        <span title={phone} className={root.phone}>
          {formantPhoneNumber(phone)}
        </span>
      </div>
    </div>
  );
};

export default Item;
