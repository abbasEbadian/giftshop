import React from "react";
import Link from "next/link";
import Image from "next/future/image";import  {BASE_URL} from "../redux/endpoints"
import { Chip, Typography } from "@mui/material";
function BlogPost({ data }) {
  return (
    <div className="info-blog-post">
      <div className="up-section-info-post">
        <Link href={`/blog/posts/${data.id}-${data.title.replace(/[\s]+/g, '-')}`}>
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
        <div className="text-left readMore d-flex justify-content-between align-items-center mb-2">
          <Chip size="small" label={data.category_id?.name} variant="outlined" color="primary" aria-hidden="true"/>

          <Link href={`/blog/posts/${data.id}-${data.title.replace(/[\s]+/g, '-')}`}>
            <a ><p className="mb-0">ادامه مطلب...</p></a>
          </Link>
        </div>
      </div>

      <div className="down-section-info-post flex-wrap pt-2">
      <Typography fontSize={10} component='small' className="w-100 text-black-50">زمان تقریبی مطالعه : { Number(data?.read_time).toLocaleString('fa')} دقیقه</Typography>

        <div className="publisher">
          <p className="m-0">
            <i className="bi bi-person "></i>
            <Typography fontSize={12} component={'small'} className="text-black-50 mx-2">{data.author.nickname || "گیفت استاپ"}</Typography>
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
