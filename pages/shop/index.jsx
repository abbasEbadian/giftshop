import React from "react";
import ShopFilters from "../../components/ShopFilters";
import ShopCards from "../../components/ShopCards";
import Head from "next/head";
import PaginationControlled from "../../components/Pagination";
import { useRouter } from 'next/router'
import * as e from '../../redux/endpoints'


function Shop({ data, cards: initialCards = [], size: initialSize }) {

	const router = useRouter()

	const { page = 1 } = React.useMemo(() => {
		return router.query
	}, [router.query])

	const [filteredCards, cardsCount] = React.useMemo(() => {
		return [initialCards, initialSize]
	}, [initialCards])

	return (
		<div className="shop-main">
			<Head>
				<title>{data.shop_title ?? "فروشگاه | گیفت استاپ"}</title>
				<meta name="description" content={data.shop_description ?? "فروشگاه گیفت استاپ"} />
				<meta name="keywords" content={data.shop_keywords ?? "گیفت کارت , گیفت کارت ارزان"} />
				<meta rel="canonical" content={"https://giftstop.org/shop"} />
			</Head>

			<div className="row ">
				<div className="col-12 col-lg-3 col-xxl-2 h-100">
					<ShopFilters />
				</div>

				<div className="col-12 col-lg-9 col-xxl-10">
					<h1 className="text-center line-height-64 mb-3">

						محصولات <span className="text-danger">فروشگاه</span>

					</h1>
					<ShopCards cards={filteredCards} />
					<div className="my-4">
						{cardsCount > 20 ? <PaginationControlled
							size={cardsCount}
							page={+page}
							source_url={router.asPath}
							extra_query={router.query} /> : null}
					</div>

				</div>

			</div>
		</div>
	);
}
export async function getServerSideProps({ query }) {
	const { accountType, minPrice, maxPrice, minRate, maxRate, page } = query

	let url = new URL(e.GET_TITLE)
	for (let entry of Object.entries({ accountType, minPrice, maxPrice, minRate, maxRate, page })) {
		if (entry[1]) url.searchParams.set(entry[0], entry[1])
	}
	
	try {
		const res = await fetch(url.toString())
		const d = await res.json()
		const { cards, size, ...data} = d
		console.log({size})
		return { props: { data, cards, size } }
	} catch (ShopIndexServerSide) {
		console.log({ShopIndexServerSide})
		return { props: { data: {} } }
	}
}
export default Shop;
