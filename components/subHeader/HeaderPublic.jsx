import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic'
const HomIcon = dynamic(() => import("../../img/icon/HomeIcon"))
const SearchIcon = dynamic(() => import("../../img/icon/SearchIcon"))
const ShoppingIcon = dynamic(() => import("../../img/icon/ShoppingIcon"))
const UserIcon = dynamic(() => import("./UserIcon"))

const Search = dynamic(() => import("./Search"))
const FullScreenDialog = dynamic(() => import("./FullScreenSearch"))


// const KeyboardArrowDownIcon = dynamic(() => import("./UserIcon"))

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Offcanvas } from "react-bootstrap";
import Logo from "../../img/logo.png";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Badge, Button, Chip } from "@mui/material";



function HeaderPublic({ authenticated }) {

  const [menuopen, setMenuopen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const brands = React.useRef([
    {
        "id": 22,
        "name": "apple",
        "persian_name": "اپل"
    },
    {
        "id": 24,
        "name": "googleplay",
        "persian_name": "گوگل پلی"
    },
    {
        "id": 25,
        "name": "playstation",
        "persian_name": "پلی استیشن"
    },
    {
        "id": 26,
        "name": "steam",
        "persian_name": "استیم"
    },
    {
        "id": 27,
        "name": "xbox",
        "persian_name": "ایکس باکس"
    },
    {
        "id": 28,
        "name": "amazon",
        "persian_name": "امازون"
    },
    {
        "id": 29,
        "name": "spotify",
        "persian_name": "اسپاتیفای"
    },
    {
        "id": 30,
        "name": "netflix",
        "persian_name": "نتفلیکس"
    },
    {
        "id": 31,
        "name": "applemusic",
        "persian_name": "اپل موزیک"
    },
    {
        "id": 32,
        "name": "skype",
        "persian_name": "اسکایپ"
    },
    {
        "id": 33,
        "name": "nintendo",
        "persian_name": "نینتندو"
    },
    {
        "id": 34,
        "name": "roblex",
        "persian_name": "روبلاکس"
    },
    {
        "id": 35,
        "name": "leagueoflegends",
        "persian_name": "لیگ اف لجندز"
    },
    {
        "id": 36,
        "name": "blizard",
        "persian_name": "بلیزارد"
    },
    {
        "id": 37,
        "name": "warcraft",
        "persian_name": "وارکرفت"
    },
    {
        "id": 38,
        "name": "visacard",
        "persian_name": "ویزا کارت"
    },
    {
        "id": 39,
        "name": "mastercard",
        "persian_name": "مستر کارت"
    },
    {
        "id": 40,
        "name": "razergold",
        "persian_name": "ریزر گلد"
    },
    {
        "id": 42,
        "name": "apex",
        "persian_name": "اپکس"
    },
    {
        "id": 43,
        "name": "pubg",
        "persian_name": "پابجی"
    }
])
  const basket = useSelector((state) => state.order.basket);
  const auth = useSelector(s => s.auth.authenticated)
  const user = useSelector(s => s.auth.user)
  const [full, setFull] = React.useState(false)

  const unseen_tickets_count = React.useMemo(() => {
    const x = user?.ticket_set?.filter(i => !i.seen_by_user)
    return x?.length || 0
  }, [user])

  return (
    <header className="header-public shadow-sm">

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
              <Link href="/"><a onClick={e => setMenuopen(false)}>{" "}
                <i className="bi bi-house-door-fill"></i>{" "}
              </a></Link>
            </li>
            <li className="menu-item">
              <Link href="/shop">
                <a onClick={e => setMenuopen(false)}>گیفت کارت   </a>
              </Link>
            </li>
            <li className="menu-item">
              <Link href="/contact-us">
                <a onClick={e => setMenuopen(false)}>تماس با ما</a>
              </Link>
            </li>
            <li className="menu-item menu-item-child">
              <Link href="/about-us">
                <a onClick={e => setMenuopen(false)} data-toggle="sub-menu">درباره ما</a>
              </Link>
            </li>

            <li className="menu-item menu-item-child">
              <Link href="/blog">
                <a onClick={e => setMenuopen(false)} data-toggle="sub-menu">
                  آموزش - مقالات
                </a>
              </Link>
            </li>

            {auth ? <><li className="menu-item menu-item-child d-flex">
              <Link href="/panel/ticket-list">
                <a onClick={e => setMenuopen(false)}>تیکت ها </a>
              </Link>

              <Chip label={unseen_tickets_count} className={"me-auto"} />

            </li>
              <li className="menu-item menu-item-child">
                <Link href="/auth/logout"><a className="" >
                  خروج
                </a>
                </Link>
              </li></>
              : null}
            <hr />
          </ul>
          {!auth ? <Link href="/auth">
            <a className="btn primary-gradient rounded d-flex mt-3 w-50 mx-5 justify-content-center" onClick={e => setMenuopen(false)}>
              ورود <span className="mx-1">|</span>عضویت
            </a>
          </Link> : <div className="d-flex align-items-center px-5 mt-3"><Link href="/panel/profile">
            <a className="btn primary-gradient rounded w-50  text-center" onClick={e => setMenuopen(false)}>
              حساب کاربری
            </a>
          </Link>

          </div>}
        </Offcanvas.Body>
      </Offcanvas>
      <div className="main-container">
        <Link href="/">
          <a className="header-image">
              <Image src={Logo} layout='fill' alt='گیفت استاپ ، مرجع خرید انواع گیفت کارت' />
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
                  {brands.current.map((item, idx) => {
                    return (
                      <li className="megamenu-item" key={idx}>
                        <ArrowBackIosIcon />
                        <Link href={"/shop/" + item.name}>
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
          {auth ? <Badge color="secondary" badgeContent={unseen_tickets_count} showZero>
            <Link href="/panel/ticket-list">
              <a onClick={e => setMenuopen(false)}>تیکت ها</a>
            </Link>
          </Badge> : null}
          <Link href="/blog">
            <a onClick={e => setMenuopen(false)} data-toggle="sub-menu">
              آموزش - مقالات
            </a>
          </Link>

        </div>

        <div className="controls">
          <div className="search-btn">
            <Search />
          </div>

          <Button onClick={e => setFull(true)} className="full-search-button">
            <SearchIcon  width={17} height={17} />
          </Button>
          <Link href="/basket">
            <a className="badge-container">
              <span className="basket-badge bg-danger text-white rounded-circle p2">{basket && basket.orderline_set ? basket.orderline_set.length : 0}</span>
              <ShoppingIcon width="20" />
            </a>
          </Link>
          {
            !authenticated ?
              <Link href="/auth"><a className="btn primary-gradient rounded d-flex">
                ورود <span className="mx-1">|</span>عضویت
              </a>
              </Link> :
              <UserIcon />
          }

        </div>
        <button
          type="button"
          className="burger"
          id="burger"
          onClick={(e) => setMenuopen(!menuopen)}
          aria-label="open menu"
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
      </div>
      <FullScreenDialog open={full} setOpen={setFull} />
    </header>
  );
}

export default HeaderPublic;
