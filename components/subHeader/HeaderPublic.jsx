import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../img/logo/GS-03.png";
import HomIcon from "../../img/icon/HomeIcon";
import SearchIcon from "../../img/icon/SearchIcon";
import ShoppingIcon from "../../img/icon/ShoppingIcon";
import { Offcanvas } from "react-bootstrap";
function HeaderPublic({basket}) {
  const [menuopen, setMenuopen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [catMegaMenu, setcatMegaMenu] = React.useState({
    cat1: [
      { nameCatMega: "گیفت کارت اپل" },
      { nameCatMega: "گیفت کارت اپل" },
      { nameCatMega: "گیفت کارت اپل" },
      { nameCatMega: "گیفت کارت اپل" },
      { nameCatMega: "گیفت کارت اپل" },
    ],

    cat2: [
      { nameCatMega: "گیفت کارت اپل2" },
      { nameCatMega: "گیفت کارت اپل2" },
      { nameCatMega: "گیفت کارت اپل2" },
      { nameCatMega: "گیفت کارت اپل2" },
      { nameCatMega: "گیفت کارت اپل2" },
    ],

    cat3: [
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
    ],
    cat4: [
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
    ],
    cat5: [
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
      { nameCatMega: "گیفت کارت اپل3" },
    ],
  });
  return (
    <header className="header-public">
      {/* <Link href="/shop">
      <a>

      </a>
    </Link> */}
      {/* <Image src={}alt={} width={"100%"} height={} /> */}
      <Offcanvas
        show={menuopen}
        onHide={(e) => setMenuopen(false)}
        placement={"end"}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>گیفت شاپ</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="menu">
            <li className="menu-item">
              <a href="#">
                {" "}
                <i className="bi bi-house-door-fill"></i>{" "}
              </a>
            </li>
            <li className="menu-item">
              <Link href="/shop">
                <a>فروشگاه</a>
              </Link>
            </li>
            <li className="menu-item">
              <Link href="/contanct-us">
                <a>تماس با ما</a>
              </Link>
            </li>
            <li className="menu-item menu-item-child">
              <Link href="/about-us">
                <a data-toggle="sub-menu">چرا ما؟</a>
              </Link>
            </li>

            <li className="menu-item menu-item-child">
              <Link href="/blog">
                <a data-toggle="sub-menu">بلاگ </a>
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
          <button className="btn primary-gradient rounded d-flex mt-3">
            ورود <span className="mx-1">|</span>عضویت
          </button>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="main-container">
        <Image src={logo} height={"45px"} width={"200px"} />

        <div className="links">
          <Link href="/">
            <a>
              <HomIcon></HomIcon>
            </a>
          </Link>
          <Link href="/shop">
            <div
              className="megamenu-shop"
              onMouseEnter={(e) => setActive(true)}
              onMouseLeave={(e) => setActive(false)}
            >
              <a>فروشگاه</a>
              <div className={"list-show-menu" + (active ? " collapsed " : "")}>
                <ul
                  class="dropdown-menu mega-menu"
                  // style={{ display: "block" }}
                >
                  {Object.keys(catMegaMenu).map((item, idx) => {
                    return (
                      <li class="mega-menu-column" key={idx}>
                        <ul className="d-flex flex-column">
                          {catMegaMenu[item].map((item2, idx) => {
                            return (
                              <li key={idx}>
                                <a href="#">{item2.nameCatMega}</a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Link>
          <Link href={"/about-us"}>
            <a>چرا ما؟
             
            </a>
          </Link>
          <Link href="/contact-us">
            <a>تماس با ما</a>
          </Link>
        </div>

        <div className="controls">
          <input type="text" className="form-control" />
          <SearchIcon />
          <ShoppingIcon />
          <button className="btn primary-gradient rounded d-flex">
            ورود <span className="mx-1">|</span>عضویت
          </button>
        </div>
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
      </div>
    </header>
  );
}

export default HeaderPublic;
