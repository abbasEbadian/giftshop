import React from 'react'
import Link from 'next/link'
// import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ChatIcon from '@mui/icons-material/Chat';
import CreditCardIcon from '@mui/icons-material/CreditCard';



export default function ProfileAside({active}) {
  const [open, setOpen] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const  classes={selected: "active", root: "sidebar-item"}

  return (
    <div className="col-md-12 col-lg-3 col-12 py-5">
            <h4 className='font-weight-bold text-dark text-center pb-3 m-0'>
            پنل کاربری
                </h4>
      <List
       classes={{root: "profile-aside" + (navOpen?" collapsed": "")}}
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">

            </ListSubheader>
        }
      >
        <ListItemButton component="div"  classes={{root : "mobile-menu-title"}} onClick={e=>setNavOpen(!navOpen)}>
          <ListItemIcon>
            {navOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary={
            active==="profile"?"مشخصات":
            active==="favorites"?"مورد علاقه هآ":
            active==="purchase_report"?"گزارش خریدها":
            active==="wallet"?"کیف پول":
            active==="new_ticket"?"ایجاد تیکت جدید":
            active==="tickets"?"مشاهده تیکت ها":
            active==="credit_cards"?"کارت های اعتباری":
            "پنل کاربری"
          } />
        </ListItemButton>
        <ListItemButton component="div"  selected={active==="profile"} classes={classes}>
          <Link href="/panel/profile">
            <a >
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="مشخصات" />
            </a>
          </Link>
        </ListItemButton>
        <ListItemButton component="div" selected={active==="favorites"} classes={classes}>
          <Link href="/panel/favorites" >
            <a>
              <ListItemIcon>
                <BookmarkBorderIcon />
              </ListItemIcon>
              <ListItemText primary="مورد علاقه ها" />
            </a>
          </Link>
        </ListItemButton>
        <ListItemButton component="div" selected={active==="credit_cards"} classes={classes}>
          <Link href="/panel/credit-cards" >
            <a>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <ListItemText primary="کارت های اعتباری" />
            </a>
          </Link>
        </ListItemButton>
        <ListItemButton component="div"  selected={active==="purchase_report"} classes={classes}>
          <Link href="/panel/purchase-report">
            <a>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="گزارش خریدها" />
            </a>
          </Link>
        </ListItemButton>
       
        <ListItemButton component="div" selected={active==="wallet"} classes={classes}>
          <Link href="/panel/wallet" >
            <a>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="کیف پول" />
            </a>
          </Link>
        </ListItemButton>

        <ListItemButton onClick={handleClick} >
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="تیکت ها" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ padding: "6px 24px" }} component="div" selected={active==="new_ticket"}  >
              <Link href="/panel/send-ticket">
                <a>
                {/* <ListItemIcon>
                </ListItemIcon> */}
                <ListItemText primary="ایجاد تیکت جدید" />
                </a>
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ padding: "6px 24px" }} component="div" selected={active==="tickets"} >
              <Link href="/panel/ticket-list" >
                <a>
                {/* <ListItemIcon>
                </ListItemIcon> */}
                <ListItemText primary="مشاهده تیکت ها" />
                </a>
              </Link>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
}