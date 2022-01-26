import React from 'react';
import Image from 'next/image'
import reviewer from '../img/card/reviewer.png'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
function Reviews() {
  return <div className="reviews-container pb-5 mt-5">
    <div className="reviews-title d-flex align-items-center">
        <h5 className="border-bottom-red">نظرات</h5>
        <div className="d-flex align-items-center justify-content-center pe-4 flex-grow-1">
            <button className="btn btn-outline-info mx-md-5 mx-2 text-nowrap">
                جدیدترینها
            </button>
            <button className="btn btn-outline-info mx-md-5 mx-2 text-nowrap">
                محبوب ها
            </button>
        </div>
    </div>
    <div className="review-lines  rounded ">
        {Array.from({length: 5}).map((i, idx)=>{
            return <div key={idx} className="review-line d-flex align-items-center my-5">
                <Image src={reviewer} />
                <div className="content1 flex-grow-1 ps-2 pt-2">
                    <h6>زهرا احمدی | <span className="text-black-50">3 روز پیش</span></h6>
                    <p>این کارت عالی بود. این کارت عالی بود. این کارت عالی بود. این کارت عالی بود. </p>
                </div>
                <div className="d-flex align-items-end">
                    <ThumbUpOffAltIcon className="cursor-pointer"/>
                    <span className="mx-2"></span>
                    <ThumbDownOffAltIcon />
                </div>
            </div>
        })}
    </div>
    <button className="primary-gradient rounded py-2 mt-2 px-2 w-300 text-center d-flex justify-content-center mx-auto">نمایش بیشتر</button>
    
  </div>
}

export default Reviews;
