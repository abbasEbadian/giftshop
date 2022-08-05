import React from 'react';
import Image from 'next/image'

import timer from '../../img/icon/Timer.png'
import diamond from '../../img/icon/Diamond.png'
import alarm from '../../img/icon/Alarm.png'
import present from '../../img/icon/Present.png'
import shield from '../../img/icon/Group3451.png'
function HomeUtilities() {
  const items = [
    {image: timer, text1: "سرعت", text2: "بالا", alt:' خرید گیفت کارت با سرعت بالا'},
    {image: shield, text1: "امنیت", text2: "بالا", alt:' خرید گیفت کارت با امنیت بالا'},
    {image: diamond, text1: "محبوبیت", text2: "بالا", alt:'وبسایت خرید گیفت کارت با محبوبیت بالا'},
    {image: alarm, text1: "پشتیبانی", text2: "24/7", alt:'خرید گیفت کارت با پشتیبانی 24 ساعته'},
    {image: present, text1: "هدیه", text2: "مناسب", alt:' خرید گیفت کارت به همراه هدایای مناسب'}
  ]
  return<article className='home-utilities' id="utilities">
    <div className="row justify-content-center w-100">
      {items.map((item, idx)=>{
        return <div className="col-md-2 col-sm-4 col-4 item" key={idx}>
          <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="image-container"><Image src={item.image} width={60} height={60} alt={item.alt}/></div>
          <span className='mt-auto text-center'>
            <span className="text-secondary">{item.text1}</span><br />
            <span className="">{item.text2}</span>
          </span>
          </div>
        </div>
      })}
    </div>
  </article>
}

export default HomeUtilities;
