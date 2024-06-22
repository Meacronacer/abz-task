import root from "./header.module.scss";
import logo from "../../assets/Logo.svg";

const Header = () => {
  return (
    <div className={root.header}>
      <div className={root.inner}>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className={root.navigation}>
          <button className={root.first}>Users</button>
          <button>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
