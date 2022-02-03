import React from "react";
import { useRouter } from "next/router";
import { cards } from "../../data";
import Card from "../../components/Card";
import SimilarCards from "../../components/SimilarCards";
import SendFeedback from "../../components/SendFeedback";
import ProductRow from "../../components/ProductRow";
import Reviews from "../../components/Reviews";
import Image from "next/image";
import logos from "../../img/card/logos.png";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { FavoriteIcon, LocationOnIcon } from "@mui/icons-material";

function Basket({setBasket}) {
  const router = useRouter();
  const pid = router.query.slug;
  const [products, setProducts] = React.useState([]);
  const [count, setCount] = React.useState(1);

  const [active, setActive] = React.useState("main");
  React.useEffect(() => {
    let x = []
    const y = [1]
    y.forEach(element => {
      const p = cards.filter((i) => i.id === +element);
      if (p) x.push(p[0])
    });
    setProducts(x)
  }, [cards, pid]);

  return (
    <div className="container single-product">
      <h1 className="text-center mt-4">
        کارت <span className="text-secondary">انتخابی</span>
      </h1>
      {products.length ?products.map(product=>{return (
        <ProductRow product={product} setBasket={setBasket}/>
      )}): (
        ""
      )}

     
     

      <div className="fixed">
        <div className="col-6 text-center" onClick={(e) => setActive("filter")}>
          فیلتر
        </div>
        <div className="col-6 text-center" onClick={(e) => setActive("main")}>
          مشاهده محسول
        </div>
      </div>
    </div>
  );
}

export default Basket;
