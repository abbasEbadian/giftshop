import React from "react";
import Reviews from "../../../components/Reviews";
import BlogNav from "../../../components/BlogNav";
import * as e from '../../../redux/endpoints'

import Image from "next/image";
import Head from "next/head";
// import ReadMoreBlog from "../pages/ReadMoreBlog";

function BlogPostView({blog, blogs}) {
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
              <img src={e.BASE_URL + blog.image} alt="post-pic" width="425" height="264"/>
              <div className="bg-Sblog " >
                <div className="caption-header-blog  text-black">
                  <h3 className="position-relative">{blog.title}</h3>
                  <p className="w-100" dangerouslySetInnerHTML={{
                    __html: blog.summary
                  }}></p>
                </div>
              </div>
             </div>
            
              <div className="text-single-blog p-4" dangerouslySetInnerHTML={{
                __html: blog.content.replace("/media", e.BASE_URL + "/media")
                }}>

              </div>

              <div className="review-section">
                {/* <Reviews reviews={[]}/> */}
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
      const res = await fetch(e.GET_BLOG(post_id))
      const blog = await res.json()
      const res2 = await fetch(e.GET_BLOGS)
      const blogs = await res2.json()
      return { props: {blog, blogs: blogs.blogs}}
    }catch(e){
      return { props: { blog:{}, name: String(e)} } 
    }
  }
export default BlogPostView