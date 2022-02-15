import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../img/logo/GS-03.png";
import Link from "next/link";
import Image from 'next/image'
import SearchIcon from "../../img/icon/SearchIcon";
import ShoppingIcon from "../../img/icon/ShoppingIcon";


function HeaderUser() {
  const [menuopen, setMenuopen] = React.useState(false);

  return (
    <header className="header">
      <section className="container">
        <div className="wrapper d-flex justify-content-between align-items-center">
          <div className="right-menu">
            <Link href="/" className="brand">
              <a>
                <Image src={logo} />
              </a>
            </Link>
            <button
              type="button"
              className="burger"
              id="burger"
              onClick={(e) => setMenuopen(!menuopen)}
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>
            <span className="overlay" id="overlay"></span>
            <Offcanvas
              show={menuopen}
              onHide={(e) => setMenuopen(false)}
              placement={"end"}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>گیفت استاپ</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ul className="menu">
                  <li className="menu-item">
                    <a href="/" onClick={e => setMenuopen(false)}>
                      {" "}
                      <i className="bi bi-house-door-fill"></i>{" "}
                    </a>
                  </li>

                  <li className="menu-item">
                    <Link href="/shop">
                      <a onClick={e => setMenuopen(false)} >گیفت کارت</a>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/contact-us">
                      <a onClick={e => setMenuopen(false)}>تماس با ما</a>
                    </Link>
                  </li>
                  <li className="menu-item menu-item-child">
                    <Link href="/about-us">
                      <a onClick={e => setMenuopen(false)}>
                        درباره ما
                      </a></Link>
                  </li>
                  <li className="menu-item menu-item-child">
                    <Link href="/blog">
                      <a onClick={e=>setMenuopen(false)}>
                        بلاگ{" "}
                      </a></Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/send-ticket">
                      <a onClick={e=>setMenuopen(false)}>تیکت</a>
                    </Link>
                  </li>
                  <li className="menu-item menu-item-child">
                    <Link href="/auth/signout">
                      <a onClick={e => setMenuopen(false)}>خروج </a>
                    </Link>
                  </li>
                </ul>
                <div className="controls d-flex">
            <input type="text" className="form-control" />
            <span className="mx-2">
              <SearchIcon width={30} />
            </span>
            <ShoppingIcon />
          </div>
        <Link href="/user-level">
        <button className="btn primary-gradient rounded d-flex mt-3">
          حساب کاربری
            </button></Link>
              </Offcanvas.Body>
            </Offcanvas>
            <nav className={"navbar navbar-expand-lg navbar-light w-100"} id="navbar">
              <ul className="menu">
                <li className="menu-item">
                  <a href="#">
                    {" "}
                    <i className="bi bi-house-door-fill"></i>{" "}
                  </a>
                </li>

                <li className="menu-item">
                  <a href="#" >گیفت کارت</a>
                </li>
                <li className="menu-item menu-item-child">
                  <a href="#" onClick={e => setMenuopen(false)}>
                    درباره ما
                    {/* <i className="expand"></i>  */}
                  </a>
                  {/* <ul className="sub-menu">
                        <li className="menu-item"><a href="#">Web Design</a></li>
                        <li className="menu-item"><a href="#">Web Development</a></li>
                        <li className="menu-item"><a href="#">Brand Marketing</a></li>
                        <li className="menu-item"><a href="#">SEO and Optimizing</a></li>
                     </ul>  */}
                </li>
                <li className="menu-item menu-item-child">
                  <a href="#" onClick={e => setMenuopen(false)}>
                    تماس با ما{" "}
                  </a>
                </li>
                <li className="menu-item menu-item-child">
                  <a href="#" onClick={e => setMenuopen(false)}>
                    بلاگ{" "}
                  </a>
                </li>
              </ul>
              <div className="left-mennu-res">
                <div className="search-bar">
                  <form action="#">
                    <input type="text" name="" id="" placeholder=" " />
                    <button>
                      <i className="bi bi-search"></i>
                    </button>
                  </form>
                </div>
                <div className="basket-shop">
                  <a href="#">
                    <i className="bi bi-bag"></i>
                  </a>
                </div>
                <div className="user">
                  <a href="#">
                    <i className="bi bi-person"></i>
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div className="left-mennu">
            <div className="search-bar">
              <form action="#">
                <input type="text" name="" id="" placeholder=" " />
                <button>
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
            <div className="basket-shop">
              <a href="#">
                <i className="bi bi-bag"></i>
              </a>
            </div>
            <div className="user">
              <a href="#">
                <i className="bi bi-person"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default HeaderUser;
