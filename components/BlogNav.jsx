import React from "react";
import Link from "next/link";
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import { BASE_URL } from "../redux/endpoints";

const  BlogNav = React.memo(({ blogs, top_new, top_pop, cats }) => {
  const [cats1] = React.useState(top_new);
  const [cats2] = React.useState(top_pop);
  const [cats3] = React.useState(cats);
  
  return (
    <div className="sidebar">
      <div className="headered-box-blog ">
        <div className="head-box-blog">
          <p className="text-center">آخرین مطالب ارسالی</p>
        </div>
        <div className="d-flex flex-column content-box-blog">
          {cats1 && cats1.slice(0, 10).map((item, idx) => {
            return (
              <Link href={`/blog/posts/${item.id}-${item.title.replace(/\s/g, '-')}`} >
                <a className="py-2">
                  <i className="bi bi-chevron-left"></i>
                  {item.title}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="headered-box-blog ">
        <div className="head-box-blog">
          <p className="text-center">پربازدیدترین مطالب</p>
        </div>
        <div className="d-flex flex-column content-box-blog">
          {cats2 && cats2.slice(0, 10).map((item, idx) => {
            return (
              <div className="favoite-blog-cat" key={idx}>
                <div className="img-favorite-blog">
                  {item.image && <img src={BASE_URL + item.image} alt={item.image_alt} width={"100%"} />}
                </div>
                <div className="content-fav-blog">
                  <div>
                    <Link href={`/blog/posts/${item.id}-${item.title.replace(/\s/g, '-')}`} >
                      <a className="py-2">{item.title}</a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="headered-box-blog">
        <div className="head-box-blog">
          <p className="text-center">دسته بندی مطالب</p>
        </div>
        <div className="d-flex flex-column content-box-blog">
          <ul className="list-unstyled">
            {cats3.map((item, idx) => {
              return (
                <li key={idx}>
                  <Link href={"/blog?category=" + String(item.key)} >
                    <a className="py-2">
                      <i className="bi bi-chevron-left"></i>
                      {item.key} &nbsp;<span>({String(item.value)})</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
})

export default BlogNav;
