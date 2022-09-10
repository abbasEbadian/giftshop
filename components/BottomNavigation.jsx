import React from 'react';
import Link from 'next/link'
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import ShoppingIcon from '@mui/icons-material/Shopping';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {useSelector} from 'react-redux'
import FullScreenSearch from './subHeader/FullScreenSearch'
function BottomNavigation() {
    const [openFull, setOpenFull] = React.useState(false)
    const size = "28px" 
    const basket = useSelector(s=>s.order.basket)
  return <div className='d-lg-none d-block bottom-navigation'>
    <div className="d-flex align-items-center justify-content-evenly  searcher-box">
        <Link href="/">
            <a aria-label='home page'><OtherHousesOutlinedIcon sx={{width: size, height: size}} color={"primary"} /></a>
        </Link>
        <Link aria-label='profile page' href="/panel/profile">
            <a><AccountBoxOutlinedIcon sx={{width: size, height: size}} color={"primary"}/></a>
        </Link>
        <Link href="#" >
            <a onClick={_=>setOpenFull(!openFull)} className='  searcher rounded-circle primary-gradient p-2 ' aria-label='search'>
                {openFull?
                 <CloseIcon sx={{width: "45px", height: "45px"}} color={"white"}/>
                 :
                 <SearchOutlinedIcon sx={{width: "45px", height: "45px"}} color={"white"}/>
                }
            </a>
        </Link>
        <Link href="/panel/ticket-list">
            <a aria-label='tickets page'><ChatBubbleOutlineOutlinedIcon sx={{width: size, height: size}} color={"primary"}/></a>
        </Link>
        <Link   href="/basket">
            <a className="badge-container " aria-label='basket page'>
            <span className="basket-badge bg-danger text-white rounded-circle p2 mt-1">{basket&&basket.orderline_set?basket.orderline_set.length: 0}</span>
            <LocalGroceryStoreOutlinedIcon  sx={{width: size, height: size}} color={"primary"}/>
            </a>
        </Link>
       
    </div>
    <FullScreenSearch open={openFull} setOpen={setOpenFull} />
  </div>;
}

export default BottomNavigation;
