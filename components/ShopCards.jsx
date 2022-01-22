import React from 'react';
import Card from './Card'
function ShopCards({cards}) {
    
    return <div className="mt-5">
        <div className="row">
        {cards.length? cards.map((i, idx)=>{
            return <div key={idx} className="col-xxl-3 col-xl-4 col-sm-2 col-12">
                <Card data={i} addToCard showRate/>
            </div>
        }):undefined}
        </div>
    </div>;
}

export default ShopCards;
