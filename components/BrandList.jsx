import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import Image from "next/future/image";
import { Box, Button } from "@mui/material";

function SimilarCards({  children, title }) {
  const brands = React.useRef([
    {
      "id": 22,
      "name": "apple",
      "persian_name": "اپل"
    },
    {
      "id": 24,
      "name": "googleplay",
      "persian_name": "گوگل پلی"
    },
    {
      "id": 25,
      "name": "playstation",
      "persian_name": "پلی استیشن"
    },
    {
      "id": 26,
      "name": "steam",
      "persian_name": "استیم"
    },
    {
      "id": 27,
      "name": "xbox",
      "persian_name": "ایکس باکس"
    },
    {
      "id": 28,
      "name": "amazon",
      "persian_name": "امازون"
    },
    {
      "id": 29,
      "name": "spotify",
      "persian_name": "اسپاتیفای"
    },
    {
      "id": 30,
      "name": "netflix",
      "persian_name": "نتفلیکس"
    },
    {
      "id": 31,
      "name": "applemusic",
      "persian_name": "اپل موزیک"
    },
    {
      "id": 32,
      "name": "skype",
      "persian_name": "اسکایپ"
    },
    {
      "id": 33,
      "name": "nintendo",
      "persian_name": "نینتندو"
    },
    {
      "id": 34,
      "name": "roblex",
      "persian_name": "روبلاکس"
    },
    {
      "id": 35,
      "name": "leagueoflegends",
      "persian_name": "لیگ اف لجندز"
    },
    {
      "id": 36,
      "name": "blizard",
      "persian_name": "بلیزارد"
    },
    {
      "id": 37,
      "name": "warcraft",
      "persian_name": "وارکرفت"
    },
    {
      "id": 38,
      "name": "visacard",
      "persian_name": "ویزا کارت"
    },
    {
      "id": 39,
      "name": "mastercard",
      "persian_name": "مستر کارت"
    },
    {
      "id": 40,
      "name": "razergold",
      "persian_name": "ریزر گلد"
    },
    {
      "id": 42,
      "name": "apex",
      "persian_name": "اپکس"
    },
    {
      "id": 43,
      "name": "pubg",
      "persian_name": "پابجی"
    }
  ])
    const [showAll, setShowAll]= React.useState(false)
    const [count, setCount]= React.useState(4)
    React.useEffect(()=>{
      if(typeof window !== 'undefined') 
        if(window.width > 1440){
          setCount(6)
        }
    },[])
  return (
    <div className="w-100">
      <h2 className="text-center mt-5 mb-4">{title}</h2>
      {children}
      <div className="brands-container row  justify-content-between">
          
            {brands?brands.current.map((item, idx)=>{
                return (!showAll && idx < count || showAll) && <div className="col-6  col-md-4 col-lg-3 " key={idx}>
                    <Card hidePrice data={{
                    brand_id: item
                }}/>
                </div>
            }): null}
        
      </div>
      <div className="d-flex justify-content-center my-5">
           
          <Box sx={{ position: 'relative', height: 72}} className="bgimage   position-relative mx-2">
          </Box>
          <Button  className="btn success-gradient mr-2 " onClick={e=>setShowAll(s=>!s)}>
            {showAll?"نمایش کمتر":"نمایش همه محصولات" }
          </Button>
        </div>
    </div>
  );
}

export default SimilarCards;