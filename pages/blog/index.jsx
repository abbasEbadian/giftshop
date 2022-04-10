import React from "react";
import background from "../../img/other/BLOG-01.png";
import BlogPost from "../../components/BlogPost";
import BlogNav from "../../components/BlogNav";
import * as e from '../../redux/endpoints'
import Head from 'next/head'
import Image from 'next/image'
import { Box } from "@mui/system";
import { useRouter } from "next/router";

function Blog({blogs, category_blogs, meta}) {
  const [blogPosts, setBLogPosts] = React.useState(category_blogs);
  const [search, setSearch] = React.useState("")
  const router = useRouter()
  const {word, category} = router.query 
  const _search = (e)=>{
    e.preventDefault()
    e.stopPropagation()
    router.push({pathname: "/blog", query: {word: search}}, undefined, { scroll: false })
  }
  
  React.useEffect(async ()=>{
    const res = await fetch(e.GET_BLOGS + (category? "?category=" + category:"")  + (word? (category? "&word=" : "?word=") + word: ""))
    const data = await res.json()
    setBLogPosts(data.category_blogs)
  }, [word])
  return (
    <>
      <Head>
          <title>{meta.blog_title??(meta.blog_title + " | گیفت استاپ")}</title>
          <meta name="description" content={meta.blog_description??"بلاگ گیفت استاپ " }/>
          <meta name="keywords" content={meta.blog_keywords??"گیفت کارت , گیفت کارت ارزان "}/>
        </Head>
      <section>
          <div className="position-relative h-100 d-flex justify-content-center mt-4">
            <Image src={background} alt="blog image" height={250} width={1000}/>
          </div>
        <div className="bg-blog" >
          <div className="content-head-blog col-10 col-lg-5 col-md-5 m-auto text-dark">
            <h2 className="mb-5">وبلاگ گیفت استاپ</h2>
            
            <div className="w-100">
              <form className="buttonIn" onSubmit={_search}>
                <input
                  type="text"
                  id="enter"
                  className="form-control border px-2 fs-5"
                  placeholder="عنوان یا کلمه مورد نظر را وارد کنید..."
                  value={search}
                  onChange={e=>setSearch(e.target.value)}
                />
                <button id="search" type="submit">جست و جو</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid py-5">
          <div className="row align-items-start">
            <div className="col-md-3">
              <BlogNav  blogs={blogs}/>
            </div>
            <div className="col-md-9 flex-blog order-1 justify-content-start">
              {blogPosts.length? blogPosts.map((item, idx) => {
                return (
                  <div className="col-md-6 col-lg-4 col-6 p-2 blog-cards" key={idx}>
                    <BlogPost data={item} />
                  </div>
                );
              }): <div className="alert alert-info w-50 ">موردی یافت نشد</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps({query}) {
  try{
    const {category, word}= query
    const res = await fetch(e.GET_BLOGS + (category? "?category=" + category:"")  + (word? (category? "&word=" : "?word=") + word: ""))
    const data = await res.json()
    return { props: { blogs:  data.blogs , category_blogs: data.category_blogs, meta: data.meta || {}},  }
  }catch(e){
    return { props: { blogs:[], name: String(e)} } 
  }
}

export default Blog;