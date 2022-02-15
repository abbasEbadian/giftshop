import React from "react";
import background from "../../img/other/unsplash_Q1p7bh3SHj8.png";
import BlogPost from "../../components/BlogPost";
import BlogNav from "../../components/BlogNav";

var bgBlog = {
  backgroundImage: `url(${background})`,
};

function Blog() {
  const [blogPosts, setBLogPosts] = React.useState([
    {
      id: 1,
      name: "مزایای خرید گیفت کارت",
      textBlog:
        "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از   از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
      publisher: "مدیر سایت",
    },
    {
      id: 2,
      name: "مزایای خرید گیفت کارت",
      textBlog:
        "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از   از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
      publisher: "مدیر سایت",
    },
    {
      id: 3,
      name: "مزایای خرید گیفت کارت",
      textBlog:
        "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از   از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
      publisher: "مدیر سایت",
    },
    {
      id: 3,
      name: "مزایای خرید گیفت کارت",
      textBlog:
        "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از   از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
      publisher: "مدیر سایت",
    },
    {
      id: 3,
      name: "مزایای خرید گیفت کارت",
      textBlog:
        "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از   از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
      publisher: "مدیر سایت",
    },
    {
      id: 3,
      name: "مزایای خرید گیفت کارت",
      textBlog:
        "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از   از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
      publisher: "مدیر سایت",
    },
    {
      id: 3,
      name: "مزایای خرید گیفت کارت",
      textBlog:
        "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از   از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
      publisher: "مدیر سایت",
    },
    {
      id: 3,
      name: "مزایای خرید گیفت کارت",
      textBlog:
        "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از   از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
      publisher: "مدیر سایت",
    },

    {
      id: 3,
      name: "مزایای خرید گیفت کارت",
      textBlog:
        "  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از   از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از",
      publisher: "مدیر سایت",
    },
  ]);
  return (
    <>
      <section>
        <div className="bg-blog" style={bgBlog}>
          <div className="content-head-blog col-10 col-lg-5 col-md-5 m-auto">
            <h2>وبلاگ گیفت استاپ</h2>
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که لازم است
            </p>
            <div className="w-100">
              <div className="buttonIn">
                <input
                  type="text"
                  id="enter"
                  className="form-control"
                  placeholder="عنوان یا کلمه مورد نظر را وارد کنید..."
                />
                <button id="search">جست و جو</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container-fluid py-5">
          <div className="row align-items-start">
            <div className="col-md-3">
              <BlogNav />
            </div>
            <div className="col-md-9 flex-blog order-1">
              {blogPosts.map((item, idx) => {
                return (
                  <div className="col-md-6 col-lg-4 col-6 p-2 blog-cards" key={idx}>
                    <BlogPost data={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Blog;