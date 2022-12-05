import React, { useEffect } from "react";
import Reviews from "../../../components/Reviews";
import BlogNav from "../../../components/BlogNav";
import * as e from '../../../redux/endpoints'
import SendFeedback from "../../../components/SendFeedback";

import Image from "next/future/image";import Head from "next/head";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { urlencoded } from "body-parser";
// import ReadMoreBlog from "../pages/ReadMoreBlog";

function BlogPostView({blog, blogs, is_short, top_new, top_pop,cats}) {
  const router = useRouter()


  return (
    <>
      <Head>
          <title>{blog.meta_title??(blog.title + " | گیفت استاپ")}</title>
          <meta name="description" content={blog.meta_description??"فروشگاه گیفت استاپ " }/>
          <meta name="keywords" content={blog.meta_keywords??"گیفت کارت , گیفت کارت ارزان "}/>
          <link rel="canonical" href={blog.meta_canonical??e.BASE_URL + "/blog"} />

        </Head>
      <section>
        <div className="container-fluid py-5">
          <div className="row align-items-start">
            <div className="col-md-3">
              <BlogNav blogs={blogs} top_new={top_new} top_pop={top_pop} cats={cats}/>
            </div>
            <div className="col-md-9 col-12">
            <div className="position-relative h-100 d-flex  my-4 flex-wrap">
              {blog.image&&<img src={e.BASE_URL + blog.image}  alt={blog.image_alt} className="blog-main-image border rounded" />}
              <div className="bg-Sblog " >
                <div className="caption-header-blog  text-black">
                  <h1 className="position-relative fs-3">{blog.title}</h1>
                  <p className="w-100" dangerouslySetInnerHTML={{
                    __html: blog.summary
                  }}></p>
                  <hr />
                  <Typography fontSize={12} component='small' className="w-100 text-black-50">زمان تقریبی مطالعه : { Number(blog?.read_time).toLocaleString('fa')} دقیقه</Typography>

                </div>
              </div>
             </div>
            
              <div className="text-single-blog p-4" dangerouslySetInnerHTML={{
                __html: blog.content?.replace(/\/media/g, e.BASE_URL + "/media")
                }}>

              </div>

              <div className="review-section">
                <SendFeedback blog={blog} />
                <Reviews reviews={blog.reviews}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export async function getServerSideProps({query}) {
    try{
      const {post_id}= query
      const d =  post_id.split('-').filter(Boolean)
      const short = d.length === 1
      const _post_id = d ? d[0] : 0
      
      const res = await fetch(e.GET_BLOG(_post_id))
      const blog = await res.json()
      const uri = `/blog/posts/${blog.id}-` + encodeURIComponent(`${blog.title.replace(/[\s]+/g, '-')}`)

      if( short ){
        return {
          redirect: {
            destination: uri,
            permanent: true,
          }
        }
      }
      const res2 = await fetch(e.GET_BLOGS)
      const blogs = await res2.json()
      return { props: {blog, blogs: blogs.blogs, is_short: short, top_new: blogs.top_new, top_pop: blogs.top_pop, cats: blogs.cats}}
    }catch(e){
      console.log(e)
      return { props: { blog:{}, name: String(e)} } 
    }
  }
export default BlogPostView