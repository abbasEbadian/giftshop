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
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";



// function ProfileAside({active}) {




//     return (
//         <aside id="profile-aside">
//             <style JSX>{`
//             #profile-aside li.active{
//                 background-color:rgba(147, 202, 245, 1);
//             }
//             #profile-aside li.active i{
//                 color:#fff;
//                 opacity: 1;
//             }`}

//             </style>
//             <h5 className="text-center py-3">پنل کاربری</h5>
//             <div className="card-profile-tab">
//               <ul>
//                 <li className={active==="proflie"? "active": ""}>
//                   <i class="bi bi-person-square"></i>
//                   <Link href="/">
//                     <a >مشخصات</a></Link>
//                 </li>
//                 <li className={active==="favorite"? "active": ""}>
//                   <i class="bi bi-bookmark"></i>
//                   <Link href="/">
//                     <a >مورد علاقه ها</a></Link>
//                 </li>
//                 <li className={active==="purchase_report"? "active": ""}>
//                   <i class="bi bi-journal-text"></i>
//                   <Link href="/purchase-report">
//                     <a >گزارش خرید ها</a></Link>
//                 </li>
//               </ul>
//             </div>
//           </aside>
//     )
// }

// export default ProfileAside



export default function ProfileAside({active}) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const  classes={selected: "active", root: "sidebar-item"}
  
  return (
    <div className="col-md-3">
      <List
       classes={{root: "profile-aside"}}
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        <ListItemButton component="a" href="/" selected={active==="purchase_report"} classes={classes}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </ListItemButton>
        <ListItemButton classes={classes}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
        <ListItemButton onClick={handleClick} classes={classes}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component="a" href="/" >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
}
