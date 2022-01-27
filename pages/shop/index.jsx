import React from "react";
import ShopFilters from "../../components/ShopFilters";
import ShopCards from "../../components/ShopCards";
import { cards } from "../../data";

function Shop() {
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    setFilteredCards(cards);
  }, [cards]);

  return (
    <div className="shop-main">
      <div className="row ">
        <div className="col-12 col-md-3">
          <button
            onMouseEnter={(e) => setActive(true)}
            onMouseLeave={(e) => setActive(false)}
          >
            hover
          </button>
          <span className={"ye-class-sabet" + (active ? "text-danger" : "")}>
            test
          </span>
          <ShopFilters
            mainCards={cards}
            setCards={setFilteredCards}
            min_value={Math.min(
              ...cards.map((i) => {
                return i.realPrice;
              })
            )}
            max_value={Math.max(
              ...cards.map((i) => {
                return i.realPrice;
              })
            )}
          />
        </div>

        <div className="col-12 col-md-9">
          <h1 className="text-center line-height-64">
            محصولات <span className="text-danger">فروشگاه</span>
          </h1>
          <ShopCards cards={filteredCards} />
        </div>
      </div>
    </div>
  );
}

export default Shop;
