import React from 'react';
import Link from 'next/link'
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
function BottomNavigation() {
const size = "28px" 
  return <div className='d-md-none d-block bottom-navigation'>
    <div className="d-flex align-items-center justify-content-evenly">
        <Link href="/">
            <a><OtherHousesOutlinedIcon sx={{width: size, height: size}} color={"primary"}/></a>
        </Link>
        <Link href="/profile">
            <a><AccountBoxOutlinedIcon sx={{width: size, height: size}} color={"primary"}/></a>
        </Link>
        <Link href="/">
            <a className=' searcher rounded-circle primary-gradient p-2 '><SearchOutlinedIcon sx={{width: "45px", height: "45px"}} color={"white"}/></a>
        </Link>
        <Link href="/messages">
            <a><ChatBubbleOutlineOutlinedIcon sx={{width: size, height: size}} color={"primary"}/></a>
        </Link>
        <Link href="/shop">
            <a><LocalGroceryStoreOutlinedIcon sx={{width: size, height: size}} color={"primary"}/></a>
        </Link>
    </div>
  </div>;
}

export default BottomNavigation;
