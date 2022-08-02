import React from "react";
const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  let BASE_URL = "https://www.arsimodir.ir"
  let SITE_URL = "https://giftstop.org"
  
  
  let staticPaths = [
      '',
      'about-us',
      'contact-us',
      'auth',
      'faq',
      'shop',
      'terms',
  ]
    .map((staticPagePath) => {
      return `${SITE_URL}/${staticPagePath}`;
    });

  const d = await fetch(BASE_URL+"/api/v1/get_sitemap_products/") 
  let dynamicPaths= await d.json() || []

  const b = await fetch(BASE_URL+"/api/v1/get_sitemap_blogs/") 
  let blogPaths= await b.json() || []

  let c = await fetch(BASE_URL+"/api/v1/get_sitemap_brands/") 
  c= await c.json() || []

  dynamicPaths =JSON.parse(dynamicPaths).map(item=>{
    return `${SITE_URL}/product/${item}`
  })
  JSON.parse(c).map(item=>{
    dynamicPaths.push(`${SITE_URL}/shop/${item}`)
  })

  JSON.parse(blogPaths).map(item=>{
    dynamicPaths.push(`${SITE_URL}/blog/posts/${item}`)
  })
  const allPaths = [...staticPaths, ...dynamicPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;