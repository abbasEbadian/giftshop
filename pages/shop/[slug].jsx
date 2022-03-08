import React, { useEffect } from "react";
import ShopFilters from "../../components/ShopFilters";
import ShopCards from "../../components/ShopCards";
import {useSelector} from 'react-redux'
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import {GET_TEMPLATES } from '../../redux/endpoints'
import PaginationControlled from "../../components/Pagination";

function Shop() {
  const router = useRouter();

  const [filteredCards, setFilteredCards] = React.useState([]);
  const brand_name = router.query.slug;
  const [loading, setLoading] = React.useState(false)
  const [filters, setFilters] = React.useState({brand_name})
  const [cardsCount, setCardsCount] = React.useState({brand_name})
  const brands = useSelector(state=>state.main.brands)
  const [brandName, setBrandName] = React.useState()
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const {real_price, country} = router.query

  React.useEffect(() => {
    if(brand_name){
      let params = {}
      Object.keys(filters).map(item=>{
        if(item) params[item] = filters[item]
      })
      
      params["brand_name"] = brand_name
      params["page"] = page
      setLoading(true)
      axios.get(GET_TEMPLATES, {params})
      .then(res=>{
        const {data} = res
        
        setFilteredCards( data.data || [])
        setCardsCount(data.size)
      })
      .catch(err=>console.log(err))
      .finally(f=>{
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      })
    }

  }, [filters, page, brand_name])

  React.useEffect(()=>{
    let f = {}
    if(brand_name){
      f["real_price"] =real_price
      f["country"] =country
    }
    setFilters(f)
}, [ real_price, country])

  React.useEffect(()=>{
    if(brand_name && brands){
      const b = brands.filter(i=>i.name === brand_name)
      if( b && b.length>0 ) setBrandName(b[0].persian_name)
    }
}, [ brand_name, brands])

  return (
    <div className="shop-main">
       <Head>
          <title>{brand_name} | گیفت شاپ </title>
        </Head>
      <div className="row ">
        <div className="col-12 col-md-3">
          <ShopFilters
            setFilters={setFilters}
            brand_name={brand_name}
          />
        </div>

        <div className="col-12 col-md-9">
          <h1 className="text-center line-height-64">
            {brand_name? <span>
              {"گیفت کارت  "} <span className="text-danger">{brandName}</span></span>
            :<>
            محصولات <span className="text-danger">فروشگاه</span>
            </>
            }
          </h1>
          <ShopCards cards={filteredCards} loading={loading}/>
          <div className="my-4">
            {cardsCount> 20 ?<PaginationControlled handleChange={handleChange} size={cardsCount} page={page}/>:null}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Shop;
