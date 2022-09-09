import styled from '@emotion/styled'
import { Box, Rating } from '@mui/material'
import Image from 'next/future/image';
import React from 'react'
import  Card from '../components/Card'
import { BASE_URL } from '../redux/endpoints'
 
const Desc = styled.div`
    .single-card{
        margin-block: 0;
    }
`
const check = (a,b) => {
    return  a.brand.description_image === b.brand.description_image &&
      a.review_rating === b.review_rating &&
      a.brand.description === b.brand.description

}
const  ShopBrandDescription = React.memo(({ brand } ) => {
  return (
    
    <Desc className='row brand-description mb-4' >
        <hr className='mt-5 bg-black bg-opacity-25' />
        <div className="col-12 col-lg-5" >
            <Box sx={{ position: 'relative', height: 250}} >
            {brand?.brand?.description_image &&
                <Image style={{maxWidth: "100%", height: "100%", objectFit: "contain"}}  fill className='rounded' src={BASE_URL +  brand.brand.description_image} alt={ brand.brand.description_image_alt?? brand.brand.name }  />}
                
            </Box>
        </div>
        <div className="col-12 col-lg-7 py-3">
            <Rating name="read-only" value={brand.review_rating} readOnly />
            <br />
            <small className='text-black-50'> {brand.review_rating} {" از "}  {brand.review_count} {" دیدگاه"}</small>
            <br />
            <br />
            <div dangerouslySetInnerHTML={{
            __html: brand?.brand?.description
            }}></div>
        </div>
    </Desc>  
  )
}, check)

export default ShopBrandDescription