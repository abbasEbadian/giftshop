import React, { useEffect } from "react";
import Reviews from "../../../components/Reviews";
import BlogNav from "../../../components/BlogNav";
import * as e from '../../../redux/endpoints'
import SendFeedback from "../../../components/SendFeedback";

import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
// import ReadMoreBlog from "../pages/ReadMoreBlog";

function BlogPostView({blog, blogs, is_short}) {
  const router = useRouter()

  useEffect(() => {
      if(is_short)
        router.replace(`/blog/posts/${blog.id}-${blog.title.replace(/[\s]+/g, '-')}`)
  }, [blog, is_short])
    console.log(blog)
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
              <BlogNav blogs={blogs}/>
            </div>
            <div className="col-md-9">
            <div className="position-relative h-100 d-flex  my-4 flex-wrap">
              {blog.image&&<img src={e.BASE_URL + blog.image}  alt={blog.image_alt} className="blog-main-image border rounded" />}
              <div className="bg-Sblog " >
                <div className="caption-header-blog  text-black">
                  <h3 className="position-relative">{blog.title}</h3>
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
      const res2 = await fetch(e.GET_BLOGS)
      const blogs = await res2.json()
      return { props: {blog, blogs: blogs.blogs, is_short: short}}
    }catch(e){
      console.log(e)
      return { props: { blog:{}, name: String(e)} } 
    }
  }
export default BlogPostView