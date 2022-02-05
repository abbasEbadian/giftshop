import React, { useEffect } from "react";
import ShopFilters from "../../components/ShopFilters";
import ShopCards from "../../components/ShopCards";
import {useSelector} from 'react-redux'
import { useRouter } from "next/router";
import Head from "next/head";

function Shop() {
  const router = useRouter();

  const [filteredCards, setFilteredCards] = React.useState([]);
  const [category, setCategory] = React.useState(undefined)
  const brand_name = router.query.slug;

  const cards = useSelector(state=>state.main.cards)
  React.useEffect(() => {
    const p = cards.filter((i) => i.brand_id.slug_name === brand_name);
    setFilteredCards(p || []);
  }, [cards, brand_name]);


  return (
    <div className="shop-main">
       <Head>
          <title>{brand_name} | GiftShop </title>
        </Head>
      <div className="row ">
        <div className="col-12 col-md-3">
          <ShopFilters
            setCards={setFilteredCards}
            brand_name={brand_name}
            min_value={Math.min(
              ...cards.map((i) => {
                return i.price;
              })
            )}
            max_value={Math.max(
              ...cards.map((i) => {
                return i.price;
              })
            )}
          />
        </div>

        <div className="col-12 col-md-9">
          <h1 className="text-center line-height-64">
            {category? <span>
              {"گیفت کارت های "} {category}</span>
            :<>
            محصولات <span className="text-danger">فروشگاه</span>
            </>
            }
          </h1>
          <ShopCards cards={filteredCards} />
        </div>
        
      </div>
    </div>
  );
}

export default Shop;
