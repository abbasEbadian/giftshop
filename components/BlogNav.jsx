import React from "react";
import Link from "next/link";
import Image from 'next/image'
import * as _ from 'lodash'
import { BASE_URL } from "../redux/endpoints";

function BlogNav({blogs}) {
  const [cats1, setCats1] = React.useState([]);
  const [cats2, setCats2] = React.useState([]);
  const [cats3, setCats3] = React.useState([]);
  React.useEffect(()=>{
    if(blogs){
      setCats1(_.sortBy(blogs, item=>item.id).reverse())
      setCats2(_.sortBy(blogs, item=>item.reviews).reverse())
      let x = _.groupBy(blogs, c => c.category_id?.name)
      x = Object.keys(x).map(key=>{return {
        key,
        value: x[key].length
      }}) 
      setCats3(x)
    }
  }, [blogs])
  return (
    <div className="sidebar">
      <div className="headered-box-blog ">
        <div className="head-box-blog">
          <p className="text-center">آخرین مطالب ارسالی</p>
        </div>
        <div className="d-flex flex-column content-box-blog">
          {cats1.map((item, idx) => {
            return (
              <Link href={"/blog/posts/" + item.id}  key={idx}>
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
          {cats2.map((item, idx) => {
            return (
              <div className="favoite-blog-cat" key={idx}>
                <div className="img-favorite-blog">
                  <img src={BASE_URL + item.image} alt="favorite blog" width={75} height={47}/>
                </div>
                <div className="content-fav-blog">
               <div>
                    <Link href={"/blog/posts/" + item.id} >
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
                        <Link href={"/blog?category=" + item.key} >
                            <a className="py-2">
                                <i className="bi bi-chevron-left"></i>
                                {item.key} &nbsp;<span>({item.value})</span>
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
}

export default BlogNav;
