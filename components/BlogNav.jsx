import React from "react";
import Link from "next/link";
import imgFav from "../img/other/unsplash_ZEy7KSeKIIk.png";
import Image from 'next/image'
function BlogNav() {
  const [cats1, setCats1] = React.useState([
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
  ]);
  const [cats2, setCats2] = React.useState([
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
    "مزایای خرید گیفت کارت مزایای خرید گیفت کارت ",
  ]);
  const [cats3, setCats3] = React.useState([
  {
    key: "گیفت کارت اپل",
    value: 132
  },
  {
    key: "گیفت کارت اپل",
    value: 13
  },
  {
    key: "گیفت کارت اپل",
    value: 13
  },
  {
    key: "گیفت کارت اپل",
    value: 13
  },
  {
    key: "گیفت کارت اپل",
    value: 13
  },
  ]);
  return (
    <div className="sidebar">
      <div className="headered-box-blog ">
        <div className="head-box-blog">
          <p className="text-center">آخرین مطالب ارسالی</p>
        </div>
        <div className="d-flex flex-column content-box-blog">
          {cats1.map((item, idx) => {
            return (
              <Link href="Blog/Post" className="py-2" key={idx}>
                <a>
                <i className="bi bi-chevron-left"></i>
                {item}
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
                  <Image src={imgFav} alt="favorite blog" />
                </div>
                <div className="content-fav-blog">
               <div>
                    <Link href="Blog/Post"  >
                        <a className="py-2">{item}</a>
                    </Link>
               </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="headered-box-blog ">
        <div className="head-box-blog">
          <p className="text-center">دسته بندی مطالب</p>
        </div>
        <div className="d-flex flex-column content-box-blog">
            <ul>
                {cats3.map((item, idx) => {
                    return (
                    <li key={idx}>
                        <Link href="/blog/post" >
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
