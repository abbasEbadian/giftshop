import React, { useEffect } from "react";
import ShopFilters from "../../components/ShopFilters";
import ShopCards from "../../components/ShopCards";
import {useSelector} from 'react-redux'

function Shop() {
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [active, setActive] = React.useState(false);
  const [category, setCategory] = React.useState(undefined)
  
  const cards = useSelector(state=>state.main.cards)

  useEffect(()=>{
    setFilteredCards(cards)
  },[cards])
  return (
    <div className="shop-main">
      <div className="row ">
        <div className="col-12 col-md-3">
          <ShopFilters
            setCards={setFilteredCards}
            setCategory={setCategory}
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
