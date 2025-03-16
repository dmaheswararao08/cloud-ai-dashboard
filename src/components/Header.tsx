/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from "../assets/logo.png";
import {
  StyledHeader
} from "../styles/Header.styled";

interface HeaderProps {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

const Header = ({ setIsAuth }: HeaderProps) => {

  return (
    <StyledHeader className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          <img src={Logo} alt="" width={50} />
        </a>
        <div className="mx-auto">
          <h3>Ai Cloud Manager</h3>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
