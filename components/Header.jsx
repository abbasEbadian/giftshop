import React from "react";
import { useSelector } from "react-redux";
import HeaderPublic from "./subHeader/HeaderPublic";

function Header({basket, brands}) {
  const [menuopen, setMenuopen] = React.useState(false);
  const isLogged = useSelector(s=>s.auth.authenticated);
  return <HeaderPublic  brands={brands} authenticated={isLogged}/>;
}


export default Header;
