import React from "react";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import SimilarCards from "../../components/SimilarCards";
import SendFeedback from "../../components/SendFeedback";
import Reviews from "../../components/Reviews";
import LoaderButton from "../../components/LoaderButton";
import Image from "next/image";
import logos from "../../img/card/logos.png";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { ADD_TO_CART, GET_CARD } from "../../redux/endpoints";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import { get_cart, update_login_modal } from "../../redux/actions";
import Head from "next/head";
import Link from "next/link";
import Button from "@mui/material/Button";
import * as e from "../../redux/endpoints"
import { Breadcrumb } from "react-bootstrap";
import { Breadcrumbs } from "@mui/material";
import { Home, NavigateBefore, NavigateNext } from "@mui/icons-material";
const locale = (yeGeimat) => {
  return !isNaN(Number(yeGeimat)) ? Number(yeGeimat).toLocaleString('fa') : yeGeimat
}

function Product({ data }) {
  const router = useRouter();
  const pid = router.query.slug;
  const [product, setProduct] = React.useState(undefined);
  const [count, setCount] = React.useState(1);
  const [loading, setLoading] = React.useState(true)
  const [loading1, setLoading1] = React.useState(false)
  const [similar, setSimilar] = React.useState(true)
  const config = useSelector(s => s.main.configs)



  React.useEffect(() => {
    if (!pid) return
    const pids = pid.split('-')[0]
    axios.get(GET_CARD + pids).then(res => {

      const { data } = res
      setProduct(data.card)
      setSimilar(data.similar)
    }).catch(err => {
      console.log(err)
    })
      .finally(f => {
        setTimeout(() => { setLoading(false) }, 1000)
      })

  }, [pid])
  const dispatch = useDispatch()
  const _addToCart = () => {
    setLoading1(true)

    axios.post(ADD_TO_CART, {
      template_id: product.id,
      count: count
    }).then(res => {
      const { data } = res
      if (data.error === 0)
        dispatch(get_cart())
      else if (data.error === 1 && data.message.indexOf('وارد') > -1) {
        dispatch(update_login_modal(true))
      }
      toast(data.message, { type: data.type })
    })
      .catch(e => {
        console.log(e)
      })
      .finally(e => {
        setLoading1(false)
      })
  }
  const [open, setOpen] = React.useState(false)
  return (
    <div className="container single-product ">
      <Head>
        <title>{data.meta_title ?? (product && product.full_name)}</title>
        <meta name="description" content={data.meta_description ?? (product && product.full_name)} />
        <meta name="keywords" content={data.meta_keywords ?? (product && product.full_name)} />
        {data.meta_canonical ? <link rel="canonical" href={data.meta_canonical} /> : null}
      </Head>

      <div role="presentation" className="shadow-sm rounded mt-4 p-3 px-1 px-md-3" >
        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateBefore fontSize="small" />} className={"breadcrumbs"}>
          <Link href="/"><a underline="hover">
            <Home sx={{ mr: 0.5 }} />
          </a>
          </Link>
          <Link
            href={`/shop/${product?.brand_id?.name}`}
          ><a underline="hover">
              گیفت کارت {" "} {product?.brand_id?.persian_name}
            </a>

          </Link>
          <span>
            {product?.full_name}
          </span>
        </Breadcrumbs>
      </div>

      <h1 className="text-center my-4 fs-3">
        <span className="text-secondary">{product?.full_name || ""}</span>
      </h1>
      {product && product.brand_id && product.brand_id.url ?
        <a className="mx-md-5 py-4" href={product.brand_id.url} target="_blank">
          <Button variant="contained" color="info"> لینک آموزش استفاده</Button>
        </a>
        : null}
      <div className="d-flex flex-wrap  mt-2 product-list-gift">

        {product ? <>
          <div className="col-12 col-lg-4  pt-5 pt-md-0 px-2">
            <Card data={product} favoriteAndRate />
          </div>
          <div className="col-12 col-lg-8 p-3">
            <div className="row mb-5">
              <div className="col-6 col-md-3 mb-2">
                <span className="text-primary   d-block">قیمت</span>
                <br className="d-done d-lg-block" />
                <span className="pt-lg-3 mt-lg-3">
                  {(product?.no_sell || product?.ask_me) ? "-" :
                    <>
                      {locale(product.price)}
                      {" تومان"}
                    </>}

                </span>
              </div>
              <div className="col-6 col-md-3 mb-2">
                <span className="text-primary  d-block">کشور</span>
                <br className="d-done d-lg-block" />
                <span className="pt-lg-3 mt-lg-3">{product.country_id?.name}</span>
              </div>
              <div className="col-6 col-md-3 mb-2  mt-4 mt-md-0">
                <span className="text-primary   d-block">دسته بندی</span>
                <br className="d-done d-lg-block" />
                <span className="pt-lg-3 mt-lg-3">{product.brand_id?.persian_name} ({product.brand_id?.name})</span>
              </div>
              <div className="col-6 col-md-3 mb-2  mt-4 mt-md-0">
                <span className="text-primary   d-block">امتیاز مشتریان</span>
                <br className="d-done d-lg-block" />
                <span className="pt-lg-3 mt-lg-3">
                  {product.rate} {"(" + product.reviews_count + ")"}
                </span>
              </div>
            </div>

            <div className="add-to-card-container product d-flex justify-content-between align-items-center   me-auto ms-0">
              {product?.no_sell ? <Button color='error' variant="outlined" className="exclude" fullWidth>ناموجود</Button> :
                product?.ask_me ? <Link href={config?.contactus?.whatsapp_link || "#"}><a className="text-primary w-100"><Button color='info' variant="outlined" className="exclude" fullWidth>استعلام موجودی</Button></a></Link> :
                  <>
                    <div dir="ltr" className="counter">
                      <span onClick={(e) => setCount((c) => (c += 1))}>+</span>
                      <span className="border-bottom mx-2 ">{count}</span>
                      <span onClick={(e) => setCount((c) => Math.max(1, c - 1))}>-</span>
                    </div>
                    <span className="border rounded p-2">
                      {locale(product.price)} {" تومان "}{" "}
                    </span>
                    <LoaderButton text="افزودن به سبد خرید" className=" px-3" loading={loading1} onClick={_addToCart} />
                  </>}
            </div>
          </div>
        </>

          : loading ? <section className="w-75 py-5 my-5 d-flex justify-content-center mx-auto"><Bars /></section> :
            <section className="w-75 alert alert-info my-5 mx-auto">محصول یافت نشد</section>
        }</div>
      <div className="desc product-list-gift  my-4 p-3 blog-desc overflow-hidden position-relative pb-5" style={{ height: (open ? "unset" : (product?.description.length > 1200 ? "300px" : "max-content")) }}>
        <p className="mt-3  h-100">توضیحات:  <span dangerouslySetInnerHTML={{
          __html: product?.description
        }}></span></p>
        {product?.description.length > 1200 && <Button sx={{ width: '100%', height: '38px', backgroundColor: '#efe', color: "#4c4c4c" }} onClick={e => { setOpen(!open) }} className="position-absolute bottom-0 start-0 end-0">
          {open ?
            "مشاهده کمتر "
            : "مشاهده بیشتر"}
        </Button>}
      </div>


      <SimilarCards
        _products={similar}
        title={
          <span>
            {"کارت های"} <span className="text-secondary">مشابه</span>
          </span>
        }
      />
      <div className="my-5">
        <Image src={logos} className="d-none d-md-flex" />
      </div>

      <div className="card my-4 p-4">
        <div className="col-12 col-lg-8 co-xl-6 mx-auto">
          <SendFeedback product={product} />
          <Reviews reviews={product && product.review_set || []} />
        </div>
      </div>

    </div>
  );
}
export async function getServerSideProps({ query }) {
  try {
    const pid = query.slug.split("-")[0]
    const res = await fetch(e.GET_PRODUCT_TITLE(pid))
    const data = await res.json()

    return { props: { data } }
  } catch (e) {
    return { props: { data: {} } }
  }
}
export default Product;
