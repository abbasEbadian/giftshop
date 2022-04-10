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
          <img src={BASE_URL + data.image} alt="post-pic"width="425" height="264"/>
          </a>
        </Link>
        <h6>{data.title}</h6>
        <Typography component="p" sx={{height: "40px"}} dangerouslySetInnerHTML={{
          __html: data.summary
        }}></Typography>
        <div className="text-left readMore">
          <Link href={"/blog/posts/" + data.id}>
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
