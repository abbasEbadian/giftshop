import styled from '@emotion/styled'
import { Box, Rating } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import  Card from '../components/Card'
import { BASE_URL } from '../redux/endpoints'
 
const Desc = styled.div`
    .single-card{
        margin-block: 0;
    }
`
function ShopBrandDescription({ brand }) {
    console.log(brand);
  return (
    
    <Desc className='row brand-description mb-4' >
        <hr className='mt-5 bg-black bg-opacity-25' />
        <div className="col-12 col-lg-5" >
            <Box sx={{paddingTop: '60%', position: 'relative'}} >
            {brand?.brand?.description_image &&
                <Image className='rounded' src={BASE_URL +  brand.brand.description_image} loader={()=>BASE_URL +  brand.brand.description_image} alt={ brand.brand.description_image_alt?? brand.brand.name }  layout='fill' />}
                
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
}

export default ShopBrandDescription