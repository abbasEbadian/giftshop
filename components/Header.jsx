import React from "react";
import { useSelector } from "react-redux";
import HeaderPublic from "./subHeader/HeaderPublic";
import HeaderUser from "./subHeader/HeaderUser";

function Header({basket}) {
  const [menuopen, setMenuopen] = React.useState(false);
  const isLogged = useSelector(s=>s.auth.authenticated);
  return <HeaderPublic  authenticated={isLogged}/>;
  // return <>{isLogged ? <HeaderPublic  authenticated={isLogged}/> : <HeaderPublic />}</>;
}


export default Header;
