import React from "react";
import postImage from "../img/card/visacard.png";
import Link from "next/link";
import Image from "next/image";
function BlogPost({ data }) {
  return (
    <div className="info-blog-post">
      <div className="up-section-info-post">
        <Link href={"/blog/posts/" + data.id}>
          <a>
          <Image src={postImage} alt="post-pic" download />
          </a>
        </Link>
        <h6>{data.name}</h6>
        <p>{data.textBlog}</p>
        <div className="text-left readMore">
          <Link href={"/blog/posts/" + data.id}>
            <a><p>ادامه مطلب...</p></a>
          </Link>
        </div>
      </div>
      <div className="down-section-info-post">
        <div className="publisher">
          <p>
            <i className="bi bi-person"></i>
            {data.publisher}
          </p>
        </div>
        <div className="date-publish">
          {new Date().toLocaleDateString("fa-IR")}
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
