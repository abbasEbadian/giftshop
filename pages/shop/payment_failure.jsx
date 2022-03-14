import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button' 
import Stack from '@mui/material/Stack' 


function PaymentStatus(props) {
    const router = useRouter()
    React.useEffect(()=>{
        console.log(router)
    }, [])
    return (<>
        <Head><title>پرداخت ناموفق</title></Head>
        <Stack mt={5} pt={4}sx={{minHeight: "400px"}} direction="column" alignItems="center" justifyContent="flex-start">
            <ErrorIcon color="error" sx={{fontSize: "6rem"}}></ErrorIcon>
            <h2 className='my-4'>پرداخت با خطا مواجه شد.</h2>
            <p className="text-danger">
                در صورت کسر مبلغ ، طی 72 ساعت آینده به حساب شما عودت داده خواهد شد.
            </p>
            <div className="d-flex">
            <Link href="/panel/purchase-report">
                <a className="border-danger bg-transparent">
                    <Button variant="outlined" color="error">
                    پنل کاربری    
                    </Button>
                </a>
            </Link><Link href="/basket">
                <a className="border-danger bg-transparent mx-4">
                    <Button variant="outlined" color="info">
                    سبد خرید   
                    </Button>
                </a>
            </Link>
            </div>
        </Stack>
        </>
    )
}

export default PaymentStatus