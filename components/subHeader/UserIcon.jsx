import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link'
 function UserIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='px-0'
      >
        <PersonIcon sx={{width: "2rem"}}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem >
            <Link href="/user-panel">
                <a>
                حساب کاربری 
                </a>
            </Link>
        </MenuItem>
        <MenuItem >
            <Link href='/basket'>
            <a>سفارش های من    </a>
            </Link>
        </MenuItem>
        <MenuItem >
            <Link href="/auth/logout">
                <a>
                خروج
                </a>
            </Link>
        </MenuItem>
      </Menu>
    </div>
  )}
  export default UserIcon;
