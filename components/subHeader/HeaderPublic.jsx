import React from "react";
import Image from "next/image";
import Link from "next/link";
import HomIcon from "../../img/icon/HomeIcon";
import SearchIcon from "../../img/icon/SearchIcon";
import ShoppingIcon from "../../img/icon/ShoppingIcon";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UserIcon from "./UserIcon";
import { Button } from "@mui/material";
import Search from './Search'
import FullScreenDialog from './FullScreenSearch'
function HeaderPublic({ authenticated }) {

  const [menuopen, setMenuopen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const brands = useSelector((state) => state.main.brands);
  const basket = useSelector((state) => state.order.basket);
  const auth = useSelector(s=>s.auth.authenticated)
const [full, setFull] = React.useState(false)
  return (
    <header className="header-public shadow-sm">
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
          <Offcanvas.Title> گیفت استاپ </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="menu">
            <li className="menu-item">
              <Link href="/"><a onClick={e=>setMenuopen(false)}>                {" "}
                <i className="bi bi-house-door-fill"></i>{" "}
              </a></Link>
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
                <a  onClick={e=>setMenuopen(false)} data-toggle="sub-menu">
                آموزش - مقالات
                </a>
            </Link>
            </li>
            
            {auth?<><li className="menu-item menu-item-child">
              <Link href="/panel/send-ticket">
                <a onClick={e=>setMenuopen(false)}>تیکت </a>
              </Link>
            </li> 
            <li className="menu-item menu-item-child">
            <Link href="/auth/logout"><a  className="" >
                خروج
              </a>
            </Link>
            </li></>
            :null}
            <hr/>
          </ul>
          {!auth? <Link href="/auth">
            <a className="btn primary-gradient rounded d-flex mt-3 w-50 mx-5 justify-content-center"  onClick={e=>setMenuopen(false)}>
              ورود <span className="mx-1">|</span>عضویت
            </a>
          </Link>: <div className="d-flex align-items-center px-5 mt-3"><Link href="/panel/profile">
            <a className="btn primary-gradient rounded w-50  text-center"  onClick={e=>setMenuopen(false)}>
              حساب کاربری 
            </a>
          </Link>
          
          </div>}
        </Offcanvas.Body>
      </Offcanvas>
      <div className="main-container">
        <Link href="/">
          <a>
            <Image src={'/logo.png'} height={"45px"} width={"200px"} alt='گیفت استاپ ، مرجع خرید انواع گیفت کارت'/>
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
              <div className={"list-show-menu w-100 bg-white " + (active ? " collapsed " : "")}>
                <ul
                  className="dropdown-menu mega-menu d-flex flex-wrap container-fluid mx-auto  pe-4"
                >
                  {brands.map((item, idx) => {
                    return (
                      <li className="megamenu-item" key={idx}>
                        <ArrowBackIosIcon />
                        <Link href={"/shop/" + item.slug_name}>
                          <a className="megamenu-link">گیفت کارت  {item.persian_name}</a>
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
          {auth?<Link href="/panel/send-ticket">
            <a>تیکت</a>
          </Link>:null}
          <Link href="/blog">
              <a  onClick={e=>setMenuopen(false)} data-toggle="sub-menu">
              آموزش - مقالات
              </a>
          </Link>

        </div>

        <div className="controls">
          <div className="search-btn">
          <Search />
          </div>

          <Button onClick={e=>setFull(true)} className="full-search-button">
            <SearchIcon width={17} height={17}/>
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
      <FullScreenDialog open={full} setOpen={setFull}/>
    </header>
  );
}

export default HeaderPublic;
