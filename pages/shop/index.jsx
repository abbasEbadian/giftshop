import React, { useEffect } from "react";
import ShopFilters from "../../components/ShopFilters";
import ShopCards from "../../components/ShopCards";
import Head from "next/head";
import axios from "axios";
import {GET_TEMPLATES } from '../../redux/endpoints'
import PaginationControlled from "../../components/Pagination";
import { useRouter } from 'next/router'

function Shop() {
  
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const [filters, setFilters] = React.useState({})
  const [cardsCount, setCardsCount] = React.useState({})
  const router = useRouter()
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const {brand_name, real_price, country} = router.query
  React.useEffect(() => {
    let params = {}

    Object.keys(filters).map(item=>{
      if(item) params[item] = filters[item]
    })
    
    params["page"] = page
    setLoading(true)
    axios.get(GET_TEMPLATES, {params})
    .then(res=>{
      const {data} = res
      setFilteredCards(data.data || [])
      setCardsCount(data.size)
    })
    .catch(err=>console.log(err))
    .finally(f=>{
      setTimeout(()=>{
        setLoading(false)
      }, 2000)
    })
  }, [filters, page])
  React.useEffect(()=>{
    let f = {}
    if(brand_name){
      f["brand_name"] =brand_name
      f["real_price"] =real_price
      f["country"] =country
    }
    setFilters(f)
}, [brand_name, real_price, country])
  return (
    <div className="shop-main">
        <Head><title>فروشگاه | گیفت شاپ</title></Head>

      <div className="row ">
        <div className="col-12 col-md-3">
          <ShopFilters
            setFilters={setFilters}
          />
        </div>

        <div className="col-12 col-md-9">
          <h1 className="text-center line-height-64">
            
            محصولات <span className="text-danger">فروشگاه</span>
            
          </h1>
          <ShopCards cards={filteredCards} loading={loading}/>
          {cardsCount> 20 ?<PaginationControlled handleChange={handleChange} size={cardsCount} page={page}/>:null}

        </div>
        
      </div>
    </div>
  );
}

export default Shop;
