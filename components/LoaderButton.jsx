import { Button } from '@mui/material'
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

function LoaderButton({
    text,
    loading,
    onClick,
    className

}) {
  return (
    <Button  onClick={onClick} sx={{minWidth:"100px", "minHeight" : "32px"}}
    classes={{
        root: 'd-flex align-items-center justify-content-center success-gradient ' + className+ " "
    }}
    disabled={loading}>
        {loading? 
            <ThreeDots width={30} height={10}/>
        :<span>{text}</span>
        }
    </Button>
  )
}

export default LoaderButton