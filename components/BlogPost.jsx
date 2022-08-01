import React from "react";
import Link from "next/link";
import Image from "next/image";
import  {BASE_URL} from "../redux/endpoints"
import { Typography } from "@mui/material";
function BlogPost({ data }) {
  return (
    <div className="info-blog-post">
      <div className="up-section-info-post">
        <Link href={"/blog/posts/" + data.id}>
          <a className="position-relative">
          {data.image && <img src={BASE_URL + data.image} alt={data.image_alt} width="100%" />}
          </a>
        </Link>
        <h2 className="blog-title">{data.title}</h2>
        <p style={{height: "40px"}}dangerouslySetInnerHTML={{
          __html:data.summary
        }}></p>
        {/* {data.summary&&<Typography component="p" >
          
        </Typography>} */}
        <div className="text-left readMore">
          <Link href={`/blog/posts/${data.id}-${data.title.replace(/[\s]+/g, '-')}`}>
            <a><p>ادامه مطلب...</p></a>
          </Link>
        </div>
      </div>
      <div className="down-section-info-post">
        <div className="publisher">
          <p className="m-0">
            <i className="bi bi-person "></i>
            <span className="text-black-50 mx-2">{data.author.first_name} {" "} {data.author.last_name}</span>
          </p>
        </div>
        <div className="date-publish">
          {new Date(data.created).toLocaleDateString("fa-IR")}
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
