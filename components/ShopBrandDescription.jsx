import styled from '@emotion/styled'
import { Rating } from '@mui/material'
import React from 'react'
import  Card from '../components/Card'
const Desc = styled.div`
    .single-card{
        margin-block: 0;
    }
`
function ShopBrandDescription({ brand }) {

  return (
    <Desc className='row brand-description mb-4' >
        <div className="col-12 col-lg-5">
            <Card data={{brand_id: brand.brand, full_name: 't'}} />
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