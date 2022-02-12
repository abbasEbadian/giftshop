import { Box } from '@mui/material'
import { Router } from 'next/router'
import React, { useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import {useDispatch} from 'react-redux'
import { logout } from '../../redux/actions'
import withAuth from '../../redux/withAuth'

withAuth
function Logout() {
    const s = useDispatch()
    useEffect(()=>{
        s(logout())
    }, [])
    return (
        <Box sx={{height: "80vh"}}>

        <h2 className='d-flex align-items-center justify-content-center w-100 h-100 d-grid place-items-center' >
            <span className="mx-4">در حال خروج از حساب کاربری</span>
            <ThreeDots />
        </h2>
        </Box>
    )
}

export default withAuth(Logout)