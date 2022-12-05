import React, { useEffect } from "react";

import dynamic from 'next/dynamic'
const ShopFilters = dynamic(() => import("../../components/ShopFilters"))
const ShopCards = dynamic(() => import("../../components/ShopCards"))
const ShopBrandDescription = dynamic(() => import("../../components/ShopBrandDescription"))
const PaginationControlled = dynamic(() => import("../../components/Pagination"))


import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import * as e from '../../redux/endpoints'

import { Breadcrumbs } from "@mui/material";
import { Home, NavigateBefore } from "@mui/icons-material";
import { useMemo } from "react";


function Shop({ data, cards: initialCards = [], size: initialSize, brand, sub_brand, brands}) {
	const router = useRouter();
	const [loading, setLoading] = React.useState(false)
	const { page = 1 } = React.useMemo(() => {
		return router.query
	}, [router.query])
	const [filteredCards, cardsCount] = useMemo(() => {
		return [initialCards, initialSize]
	}, [initialCards])
	
	const addJsonLd = ({ brand, review_count, review_rating, size, max_price, min_price }) => {
		if (!brand) return { __html: {} }
		return {
			__html: `{
				"@context": "https://schema.org",
				"@type": "Product",
				"name": "${brand?.name}  Giftcard",
				"description": "${brand?.meta_description}",
				"alternateName": "${brand?.persian_name}",
				"image": [
					"https://giftstop.org/card/${brand?.name}.png"
				],
				"url": "https://giftstop.org/shop/${brand?.name}",
				"aggregateRating": {
					"@type": "AggregateRating",
					"bestRating": 5,
					"ratingValue": ${review_rating},
					"worstRating": 1,
					"ratingCount":${review_count}
				},
				"brand": {
					"@type": "Organization",
					"name":  "${brand?.persian_name}",
					"alternateName": "${brand?.name} Giftcard"

				},
				"itemCondition": "https://schema.org/NewCondition",
				"mpn": ${brand?.id},
				"offers": {
					"@type": "AggregateOffer",
					"url": "https://giftstop.org/shop/${brand?.name}",
					"availability": "https://schema.org/InStock",
					"priceCurrency": "IRR",
					"highPrice": ${max_price},
					"lowPrice": ${min_price},
					"offerCount": ${size}
				},
				"productID": ${brand?.id},
				"sku": ${brand?.id}
			}`
		}
	}
	const brand_title = sub_brand? (sub_brand.persian_name) : (brand ? (brand.persian_name) : (""))
	return (
		<div className="shop-main">
			<Head>
				<title>{data.meta_title ?? (brand?.name + " | گیفت استاپ")}</title>
				<meta name="description" content={data.meta_description ?? "فروشگاه گیفت استاپ " + brand?.persian_name} />
				<meta name="keywords" content={data.meta_keywords ?? "گیفت کارت , گیفت کارت ارزان " + brand?.persian_name} />
				{data.meta_canonical ? <link rel="canonical" href={data.meta_canonical} /> : null}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={addJsonLd(data)}
					key="item-jsonld"
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html:
							`{
						  "@context": "https://schema.org",
						  "@type": "BreadcrumbList",
						  "name": "Giftsop ${brand?.name}", 
						  "itemListElement": [{
							"@type": "ListItem",
							"position": 1,
							"name": "صفحه اصلی",
							"item": "https://giftstop.org"
						  },{
							"@type": "ListItem",
							"position": 2,
							"name": "گیفت کارت ${brand_title}"
						  }]
						}`
					}}
					key="bc-jsonld"
				/>
			</Head>
			<div role="presentation" className=" rounded mt-3 mb-4 py-3 px-1 " >
				<Breadcrumbs aria-label="breadcrumb" separator={<NavigateBefore fontSize="small" />} className={"breadcrumbs"} >
					<Link href="/"><a underline="hover">
						<Home sx={{ mr: 0.5 }} />
					</a>
					</Link>
					<span>
						گیفت کارت {" "} {brand_title}
					</span>

				</Breadcrumbs>
			</div>
			<div className="row ">
				<div className="col-12 col-lg-3 col-xxl-2 h-100">
					<ShopFilters
						brand_name={brand?.name}
						brand={brand}
						subbrand={sub_brand}
					/>
				</div>

				<div className="col-12 col-lg-9 col-xxl-10">
					<div>
						<h1 className="text-center line-height-64 mb-3">
							<span>
								{"گیفت کارت  "} <span className="text-danger">{brand_title}</span>
							</span>
						</h1>
						<ShopCards cards={filteredCards} loading={loading} key={Math.random()} />
						<div className="my-4">
							{cardsCount > 20 ? <PaginationControlled
								size={cardsCount}
								page={+page}
								source_url={router.asPath}
								extra_query={router.query}
							/>
								: null}
						</div>
						<ShopBrandDescription brand={{...data, brand: (sub_brand && sub_brand.name &&  sub_brand ) || brand}} />
					</div>
				</div>

			</div>
		</div>
	);
}



export async function getServerSideProps({ query }) {
	try {
		const [brand_name, region] = query.slug
		const {accountType, minPrice, maxPrice, minRate, maxRate, page} = query
		let url = new URL(e.GET_BRAND_TITLE(brand_name) + (region ??  ""))
		
		for(let entry of Object.entries({accountType, minPrice, maxPrice, minRate, maxRate, page})){
			if (entry[1]) url.searchParams.set(entry[0], entry[1])
		}
		const res = await fetch(url.toString())
		const d = await res.json()
		const { cards, size, brand, sub_brand={}, ...data} = d
		return { props: { data, cards, size, brand, sub_brand } }
	} catch (DotsSlugGetServerSideProps) {
		console.log(DotsSlugGetServerSideProps)
		return { props: { data: {} } }
	}
}
export default Shop;
