import React, { useEffect } from "react";
import ShopFilters from "../../components/ShopFilters";
import ShopCards from "../../components/ShopCards";
// import ShopSortBy from "../../components/ShopSortBy";
import Head from "next/head";
import axios from "axios";
import { GET_TEMPLATES } from '../../redux/endpoints'
import PaginationControlled from "../../components/Pagination";
import { useRouter } from 'next/router'
import * as e from '../../redux/endpoints'
import useMediaQuery from '@mui/material/useMediaQuery';


function Shop({ data }) {
	const isMobile = useMediaQuery('(max-width:768px)');

	const [filteredCards, setFilteredCards] = React.useState(data.cards);
	const [loading, setLoading] = React.useState(false)
	const [filters, setFilters] = React.useState({})
	const [cardsCount, setCardsCount] = React.useState(data.size)
	const [sortBy, setSortBy] = React.useState("-created")
	const router = useRouter()
	
	const { page = 1 } = React.useMemo(() => {
		return router.query
	}, [router.query])


	const { brand_name, real_price, country } = router.query
	React.useEffect(() => {
		let params = {}

		Object.keys(filters).map(item => {
			if (item) params[item] = filters[item]
		})

		params["page"] = page
		setLoading(true)
		axios.get(GET_TEMPLATES, { params })
			.then(res => {
				const { data } = res
				setFilteredCards(data.data || [])
				setCardsCount(data.size)
			})
			.catch(err => console.log(err))
			.finally(f => {
				setTimeout(() => {
					setLoading(false)
				}, 2000)
			})
	}, [filters, page])
	React.useEffect(() => {
		let f = {}
		if (brand_name) {
			f["brand_name"] = brand_name
			f["real_price"] = real_price
			f["country"] = country
		}
		setFilters(f)
	}, [brand_name, real_price, country])
	React.useEffect(()=>{
		if(isMobile && typeof window !== "undefined"){
			window.scrollTo({
				top: 1500,
				behavior: "smooth"
			})
		}
	}, [])
	
	return (
		<div className="shop-main">
			<Head>
				<title>{data.shop_title ?? "فروشگاه | گیفت استاپ"}</title>
				<meta name="description" content={data.shop_description ?? "فروشگاه گیفت استاپ"} />
				<meta name="keywords" content={data.shop_keywords ?? "گیفت کارت , گیفت کارت ارزان"} />
				<meta rel="canonical" content={"https://giftstop.org/shop"} />
			</Head>

			<div className="row ">
				<div className="col-12 col-lg-3 h-100">
					<ShopFilters
						setFilters={setFilters}
					/>
				</div>

				<div className="col-12 col-lg-9">
					<h1 className="text-center line-height-64 mb-3">

						محصولات <span className="text-danger">فروشگاه</span>

					</h1>
					{/* <div className="col-12 col-md-6 col-xl-4"><ShopSortBy value={sortBy} setValue={setSortBy}/></div> */}
					<ShopCards cards={filteredCards} loading={loading} />
					<div className="my-4">
						{cardsCount > 20 ? <PaginationControlled  size={cardsCount} page={page} source_url={router.pathname} extra_query={router.query} /> : null}
					</div>

				</div>

			</div>
		</div>
	);
}
export async function getServerSideProps({ query }) {
	try {
		const res = await fetch(e.GET_TITLE)
		const data = await res.json()
		return { props: { data } }
	} catch (e) {
		return { props: { data: {} } }
	}
}
export default Shop;
