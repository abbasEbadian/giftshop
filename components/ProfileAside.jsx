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




export default function ProfileAside({active}) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const  classes={selected: "active", root: "sidebar-item"}
  
  return (
    <div className="col-md-3 py-5">
            <h4 className='font-weight-bold text-dark text-center pb-3 m-0'>
            پنل کاربری
                </h4>
      <List
       classes={{root: "profile-aside"}}
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
          
            </ListSubheader>
        }
      >
        <ListItemButton component="a" href="/panel/purchase-report" selected={active==="profile"} classes={classes}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="مشخصات" />
        </ListItemButton>
        <ListItemButton component="a" href="/panel/favorites" selected={active==="favorites"} classes={classes}>
          <ListItemIcon>
            <BookmarkBorderIcon />
          </ListItemIcon>
          <ListItemText primary="مورد علاقه ها" />
        </ListItemButton>
        <ListItemButton component="a" href="/panel/purchase-report" selected={active==="purchase_report"} classes={classes}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="گزارش خریدها" />
        </ListItemButton>
        <ListItemButton component="a" href="/panel/points" selected={active==="points"} classes={classes}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="امتیازات" />
        </ListItemButton>
        <ListItemButton component="a" href="/panel/wallet" selected={active==="wallet"} classes={classes}>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="کیف پول" />
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
            <ListItemButton sx={{ pl: 4 }} component="a" selected={active==="new_ticket"} href="/panel/send-ticket" >
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="ایجاد تیکت جدید" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component="a" selected={active==="tickets"} href="/panel/tickets" >
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="مشاهده تیکت ها" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
}