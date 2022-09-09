import React, { useEffect } from "react";
import dynamic from 'next/dynamic'
const ShopFilters = dynamic(() => import("../../components/ShopFilters"))
const ShopCards = dynamic(() => import("../../components/ShopCards"))
const ShopBrandDescription = dynamic(() => import("../../components/ShopBrandDescription"))
const PaginationControlled = dynamic(() => import("../../components/Pagination"))

import { useSelector } from 'react-redux'

import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import * as e from '../../redux/endpoints'
import useMediaQuery from '@mui/material/useMediaQuery';
import { Breadcrumbs } from "@mui/material";
import { Home, NavigateBefore } from "@mui/icons-material";
import Link from "next/link";

function Shop({ data, cards: initialCards = [], size: initialSize }) {
	const isMobile = useMediaQuery('(max-width:768px)');

	const router = useRouter();

	const [filteredCards, setFilteredCards] = React.useState(initialCards);
	const brand_name = router.query.slug;
	const [loading, setLoading] = React.useState(false)
	const [filters, setFilters] = React.useState({ real_price: undefined, country: undefined })
	const [cardsCount, setCardsCount] = React.useState(initialSize)
	const brands = useSelector(state => state.main.brands)
	const [brandName, setBrandName] = React.useState()


	const { page = 1 } = React.useMemo(() => {
		return router.query
	}, [router.query])

	React.useEffect(() => {
		if (brand_name) {
			let params = {}
			Object.keys(filters).map(item => {
				if (item) params[item] = filters[item]
			})
			params["brand_name"] = brand_name
			params["page"] = page
			setLoading(true)
			axios.get(e.GET_TEMPLATES, { params })
				.then(res => {
					const { data } = res

					setFilteredCards(data.data || [])
					setCardsCount(data.size)
				})
				.catch(err => console.log(err))
				.finally(f => {
					setTimeout(() => {
						setLoading(false)
					}, 2000);
				})
		}

	}, [filters.brand_name, filters.country, filters.real_price, page, brand_name, filters.accountType])

	React.useEffect(() => {
		let f = {}
		if (brand_name) {
			f["real_price"] = filters.real_price
			f["country"] = filters.country
		}
		setFilters(f)
	}, [filters.real_price, filters.country])

	React.useEffect(() => {
		if (brand_name && brands) {
			const b = brands.filter(i => i.name === brand_name)
			if (b && b.length > 0) setBrandName(b[0].persian_name)
		}
	}, [brand_name, brands])

	React.useEffect(() => {
		if (isMobile && typeof window !== "undefined") {
			window.scrollTo({
				top: 1500,
				behavior: "smooth"
			})
		}
	}, [])

	const addJsonLd = ({ brand, review_count, review_rating, size, max_price, min_price }) => {
		if (!brand) return { __html: {} }
		return {
			__html: `{
				"@context": "https://schema.org",
				"@type": "Product",
				"name": "${brand.name}  Giftcard",
				"description": "${brand.meta_description}",
				"alternateName": "${brand.persian_name}",
				"image": [
					{
						"@type": "ImageObject",
						"url": "/card/${brand.name}.png"
					},
					{
						"@type": "ImageObject",
						"url": "https://arsimodir.ir/${brand.description_image}"
					}
				],
				"url": "/shop/${brand.name}",
				"aggregateRating": {
					"@type": "AggregateRating",
					"bestRating": 5,
					"ratingValue": ${review_rating},
					"worstRating": 1,
					"ratingCount":${review_count}
				},
				"brand": {
					"@type": "Organization",
					"name":  "${brand.persian_name}",
					"alternateName": "${brand.name} Giftcard"

				},
				"itemCondition": "https://schema.org/NewCondition",
				"mpn": ${brand.id},
				"offers": {
					"@type": "AggregateOffer",
					"url": "/shop/${brand.name}",
					"availability": "https://schema.org/InStock",
					"priceCurrency": "IRR",
					"highPrice": ${max_price},
					"lowPrice": ${min_price},
					"offerCount": ${size}
				},
				"productID": ${brand.id},
				"sku": ${brand.id}
			}`
		}
	}
	return (
		<div className="shop-main">
			<Head>
				<title>{data.meta_title ?? (brand_name + " | گیفت استاپ")}</title>
				<meta name="description" content={data.meta_description ?? "فروشگاه گیفت استاپ " + brand_name} />
				<meta name="keywords" content={data.meta_keywords ?? "گیفت کارت , گیفت کارت ارزان " + brand_name} />
				{data.meta_canonical ? <link rel="canonical" href={data.meta_canonical} /> : null}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={addJsonLd(data)}
					key="item-jsonld"
				/>
			</Head>
			<div role="presentation" className="shadow-sm rounded mt-3 mb-4 p-3 px-1 px-md-3" >
				<Breadcrumbs aria-label="breadcrumb" separator={<NavigateBefore fontSize="small" />} className={"breadcrumbs"}>
					<Link href="/"><a underline="hover">
						<Home sx={{ mr: 0.5 }} />
					</a>
					</Link>
					<span>
						گیفت کارت {" "} {brandName}
					</span>

				</Breadcrumbs>
			</div>
			<div className="row ">
				<div className="col-12 col-md-3">
					<ShopFilters
						setFilters={setFilters}
						brand_name={brand_name}
					/>
				</div>

				<div className="col-12 col-md-9">
					<h1 className="text-center line-height-64 mb-3">
						{brand_name ? <span>
							{"گیفت کارت  "} <span className="text-danger">{brandName}</span></span>
							: <>
								محصولات <span className="text-danger">فروشگاه</span>
							</>
						}
					</h1>
					<ShopCards cards={filteredCards} loading={loading} />
					<div className="my-4">
						{cardsCount > 20 ? <PaginationControlled
							size={cardsCount}
							page={+page}
							source_url={"/shop/" + data.brand?.name}
							extra_query={router.query}
						/>
							: null}
					</div>
					<ShopBrandDescription brand={data} />
				</div>

			</div>
		</div>
	);
}



export async function getServerSideProps({ query }) {
	try {
		const brand_name = query.slug
		const res = await fetch(e.GET_BRAND_TITLE(brand_name))
		const data = await res.json()
		const { cards, size } = data
		return { props: { data, cards, size } }
	} catch (e) {
		return { props: { data: {} } }
	}
}
export default Shop;
