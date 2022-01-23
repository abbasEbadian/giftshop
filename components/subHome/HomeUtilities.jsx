import React from 'react';
import Image from 'next/image'

import timer from '../../img/icon/Timer.png'
import diamond from '../../img/icon/Diamond.png'
import alarm from '../../img/icon/Alarm.png'
import present from '../../img/icon/Present.png'
import shield from '../../img/icon/Group 3451.png'
function HomeUtilities() {
  return<article className='home-utilities py-5'>
  <div className="row justify-content-center w-100">
    <div className="col-md-2 col-sm-4 col-6 item">
      <div className="d-flex flex-column align-items-center justify-content-center">
      <Image src={timer} />
      <span className='mt-auto text-center'>
        <span className="text-secondary">سرعت</span><br />
        <span className="">بالا</span>
      </span>
      </div>
    </div>
    <div className="col-md-2 col-sm-4 col-6 item">
      <div className="d-flex flex-column align-items-center justify-content-center">
      <Image src={shield} width={80} height={90}/>
      <span className='mt-auto text-center'>
        <span className="text-secondary">امنیت</span><br />
        <span className="">بالا</span>
      </span>
      </div>
    </div>
    <div className="col-md-2 col-sm-4 col-6 item">
      <div className="d-flex flex-column align-items-center justify-content-center">
      <Image src={diamond} />
      <span className='mt-auto text-center'>
        <span className="text-secondary">محبوبیت</span><br />
        <span className="">بالا</span>
      </span>
      </div>
    </div>
    <div className="col-md-2 col-sm-4 col-6 item">
      <div className="d-flex flex-column align-items-center justify-content-center">
      <Image src={alarm} />
      <span className='mt-auto text-center'>
        <span className="text-secondary">پشتیبانی</span><br />
        <span className="">24/7</span>
      </span>
      </div>
    </div>
    <div className="col-md-2 col-sm-4 col-6 item">
      <div className="d-flex flex-column align-items-center justify-content-center">
      <Image src={present} />
      <span className='mt-auto text-center'>
        <span className="text-secondary">هدیه</span><br />
        <span className="">مناسب</span>
      </span>
      </div>
    </div>
  </div>
</article>
}

export default HomeUtilities;
