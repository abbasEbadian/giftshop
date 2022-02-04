import React from "react";
import ShopFilters from "../../components/ShopFilters";
import ShopCards from "../../components/ShopCards";
import { cards } from "../../data";
import axios from 'axios' 
function Shop() {
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [active, setActive] = React.useState(false);
  const [category, setCategory] = React.useState(undefined)
  React.useEffect(() => {
    axios.get("http://130.185.78.233:8000/api/cards/all").then((response)=>{
      const {data} = response
      console.log(Array.isArray(data));
      if(data.length >=-1 && typeof window !=="undefined"){

        setCards(data || [])
        setFilteredCards(data)
      }
    }).catch(err=>{console.log(err)})
  }, [axios]);

  return (
    <div className="shop-main">
      <div className="row ">
        <div className="col-12 col-md-3">
          {cards && cards.length > 0?<ShopFilters
            mainCards={cards}
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
          />:null}
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
