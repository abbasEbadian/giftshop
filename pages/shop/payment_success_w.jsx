import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button' 
import Stack from '@mui/material/Stack' 

function PaymentStatus(props) {
    return (<>
        <Head><title>شارژ کیف پول موفق</title></Head>

        <Stack mt={5} pt={4}sx={{minHeight: "400px"}} direction="column" alignItems="center" justifyContent="flex-start">
            <CheckCircleIcon color="success" sx={{fontSize: "6rem"}}></CheckCircleIcon>
            <h2 className='my-4'>پرداخت با موفقیت انجام شد.</h2>
            <h5 className="mb-3">کیف پول با موفقیت شارژ شد.</h5>
            <Link href="/panel/wallet">
                <a className="border-success bg-transparent">
                    <Button variant="outlined" color="success">
                        کیف پول
                    </Button>  
                </a>
            </Link>
        </Stack>
        </>
    )
}

export default PaymentStatus