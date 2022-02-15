import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../img/logo/GS-03.png";
import HomIcon from "../../img/icon/HomeIcon";
import SearchIcon from "../../img/icon/SearchIcon";
import ShoppingIcon from "../../img/icon/ShoppingIcon";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UserIcon from "./UserIcon";
import { Button } from "@mui/material";

function HeaderPublic({ authenticated }) {

  const [menuopen, setMenuopen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const brands = useSelector((state) => state.main.brands);
  const basket = useSelector((state) => state.order.basket);
  
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
          <Offcanvas.Title>گیفت استاپ</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="menu">
            <li className="menu-item">
              <a href="/" onClick={e=>setMenuopen(false)}>                {" "}
                <i className="bi bi-house-door-fill"></i>{" "}
              </a>
            </li>
            <li className="menu-item">
              <Link href="/shop">
                <a onClick={e=>setMenuopen(false)}>گیفت کارت   </a>
              </Link>
            </li>
            <li className="menu-item">
              <Link href="/contact-us">
                <a onClick={e=>setMenuopen(false)}>تماس با ما</a>
              </Link>
            </li>
            <li className="menu-item menu-item-child">
              <Link  href="/about-us">
                <a onClick={e=>setMenuopen(false)} data-toggle="sub-menu">درباره ما</a>
              </Link>
            </li>

            <li className="menu-item menu-item-child">
              <Link href="/blog">
                <a onClick={e=>setMenuopen(false)} data-toggle="sub-menu">بلاگ </a>
              </Link>
            </li>
            <li className="menu-item menu-item-child">
              <Link href="/send-ticket">
                <a onClick={e=>setMenuopen(false)}>تیکت </a>
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
          <Link href="/auth">
            <a className="btn primary-gradient rounded d-flex mt-3">
              ورود <span className="mx-1">|</span>عضویت
            </a>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="main-container">
        <Link href="/">
          <a>
            <Image src={logo} height={"45px"} width={"200px"} />
          </a>
        </Link>
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
              <a className="giftcard-icon">گیفت کارت   <KeyboardArrowDownIcon />  </a>
              <div className={"list-show-menu" + (active ? " collapsed " : "")}>
                <ul
                  class="dropdown-menu mega-menu d-flex flex-wrap"
                >
                  {brands.map((item, idx) => {
                    return (
                      <li className="megamenu-item">
                        <ArrowBackIosIcon />
                        <Link href={"/shop/" + item.slug_name}>
                          <a className="megamenu-link">{item.persian_name}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Link>
          <Link href={"/about-us"}>
            <a>درباره ما</a>
          </Link>
          <Link href="/contact-us">
            <a>تماس با ما</a>
          </Link>
          <Link href="/send-ticket">
            <a>تیکت</a>
          </Link>
        </div>

        <div className="controls">
          <input type="text" className="form-control" placeholder="جستجو کنید..." />
          <Button
              className='px-0'
            >
            <Link  href="#search">
              <a>
                <SearchIcon  width="20"/>
              </a>
            </Link>
          </Button>
         
          <Link  href="/basket">
            <a className="badge-container">
              <span className="basket-badge bg-danger text-white rounded-circle p2">{basket&&basket.orderline_set?basket.orderline_set.length: 0}</span>
              <ShoppingIcon  width="20"/>
            </a>
          </Link>
          {
            !authenticated?
            <Link href="/auth"><a className="btn primary-gradient rounded d-flex">
              ورود <span className="mx-1">|</span>عضویت
            </a>
            </Link>:
            <UserIcon />
          }
          
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
