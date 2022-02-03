import React from "react";
import HeaderPublic from "./subHeader/HeaderPublic";
import HeaderUser from "./subHeader/HeaderUser";

function Header({basket}) {
  const [menuopen, setMenuopen] = React.useState(false);
  const isLogged = false;
  return <>{isLogged ? <HeaderUser /> : <HeaderPublic />}</>;
}


export default Header;
