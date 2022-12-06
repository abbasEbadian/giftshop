import React from "react";
import Image from 'next/future/image'
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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Offcanvas } from "react-bootstrap";
import Logo from "../../img/logo.png";
import { useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Badge, Button, Chip, Collapse, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import CallIcon from '@mui/icons-material/Call';
import InfoIcon from '@mui/icons-material/Info';
import NewspaperIcon from '@mui/icons-material/Newspaper';
// import {BRANDS} from '../../data'
import { GET_BRANDS_MINIFIED } from "../../redux/endpoints";
const HeaderPublic = React.memo(({ authenticated, brands: BRANDS=[] }) =>{

  const [menuopen, setMenuopen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const brands = React.useRef(BRANDS)
  const basket = useSelector((state) => state.order.basket);
  const auth = useSelector(s => s.auth.authenticated)
  const user = useSelector(s => s.auth.user)
  const [full, setFull] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const handleClick = () => { }
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
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"

          >
            <Link href="/">
              <ListItem button component={'a'} onClick={e => setMenuopen(false)} >
                <HomeIcon />
                <ListItemText primary="صفحه اصلی" className="text-end pe-4" />
              </ListItem>
            </Link>


            <ListItem button onClick={e => setOpen(o => !o)} >
              <CategoryIcon />
              <ListItemText primary="دسته بندی ها" className="text-end pe-4" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href={'/shop/'}>
                  <ListItem component={'a'} sx={{ pr: 4 }} role="button" onClick={e => setMenuopen(false)}>
                    <ListItemText primary={"همه"} className="text-end pe-4" />
                  </ListItem>
                </Link>
                {

                  brands.current.map((brand, idx) => {
                    return <Link key={brand.id} href={'/shop/' + brand.name}>
                      <ListItem component={'a'} sx={{ pr: 4 }} role="button" onClick={e => setMenuopen(false)}>
                        <ListItemText primary={brand.persian_name} className="text-end pe-4" />
                      </ListItem>
                    </Link>
                  })
                }
              </List>
            </Collapse>

            <Link href="/contact-us">
              <ListItem button component={'a'} onClick={e => setMenuopen(false)}>
                <CallIcon />
                <ListItemText primary="تماس با ما" className="text-end pe-4" />
              </ListItem>
            </Link>

            <Link href="/about-us">
              <ListItem button component={'a'} onClick={e => setMenuopen(false)}>
                <InfoIcon />
                <ListItemText primary="درباره ما" className="text-end pe-4" />
              </ListItem>
            </Link>

            <Link href="/blog">
              <ListItem button component={'a'} onClick={e => setMenuopen(false)}>
                <NewspaperIcon />
                <ListItemText primary="آموزش - مقالات" className="text-end pe-4" />
              </ListItem>
            </Link>


          </List>

          {!auth ? <Link href="/auth">
            <a className="btn primary-gradient rounded d-flex mt-3 w-50 mx-3 justify-content-center" onClick={e => setMenuopen(false)}>
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
            <Image style={{ maxWidth: "100%", height: 'auto' }} src={Logo} alt='گیفت استاپ ، مرجع خرید انواع گیفت کارت' loading="eager" />
          </a>
        </Link>
        <div className="links">
          <Link href="/">
            <a aria-label="Home page">
              <HomIcon></HomIcon>
            </a>
          </Link>
          <div>
            <div
              className="megamenu-shop"
            // onMouseEnter={(e) => setActive(true)}
            // onMouseLeave={(e) => setActive(false)}
            >
              <Link href="/shop"><a className="giftcard-icon">گیفت کارت   <KeyboardArrowDownIcon />  </a></Link>
              <div className={"list-show-menu w-100 bg-white "}>
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
          </div>
          <Link href={"/about-us"}>
            <a onClick={e => setMenuopen(false)}>درباره ما</a>
          </Link>
          <Link href="/contact-us">
            <a onClick={e => setMenuopen(false)}>تماس با ما</a>
          </Link>
          {auth ? <Badge color="secondary" badgeContent={unseen_tickets_count} showZero className="ticket-badge">
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
            <Search setFull={setFull} setOpen={setMenuopen}/>
          </div>

          <Button onClick={e => setFull(true)} className="full-search-button">
            <SearchIcon width={17} height={17} />
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
})


export async function getServerSideProps({  }) {
  try {
    
    const res = await fetch(GET_BRANDS_MINIFIED)
    const brands = await res.json() || []
    return { props: { brands } }
  } catch (HeaderServerSideProps) {
    console.log({HeaderServerSideProps})
    return { props: { brands: {} } }
  }
}

export default HeaderPublic;
