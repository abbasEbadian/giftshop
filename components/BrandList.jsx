import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import logos from "../img/card/logos.png";
import { Button } from "@mui/material";

function SimilarCards({  children, title }) {
    const brands = useSelector(s=>s.main.brands)
    const [showAll, setShowAll]= React.useState(false)
  return (
    <div className="w-100">
      <h2 className="text-center mt-5 mb-4">{title}</h2>
      {children}
      <div className="brands-container row">
          
            {brands?brands.map((item, idx)=>{
                return (!showAll && idx < 4 || showAll) && <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <Card hidePrice data={{
                    brand_id: item
                }}/>
                </div>
            }): null}
        
      </div>
      <div className="d-flex justify-content-center my-5">
          <div className="bgimage   position-relative mx-2">
            <Image
              alt="Mountains"
              src={logos}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          <Button  className="btn success-gradient mr-2 " onClick={e=>setShowAll(s=>!s)}>
                {showAll?"نمایش کمتر":"نمایش همه محصولات" }
          </Button>
        </div>
    </div>
  );
}

export default SimilarCards;