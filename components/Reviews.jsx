import React from 'react';
import Image from 'next/image'
import reviewer from '../img/card/reviewer.png'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import datetime  from  'persian-time-ago'
import  * as e from '../redux/endpoints'
function Reviews({reviews}) {
    const get_time = (date)=>{
        const d = new Date(date).toLocaleDateString("fa", {month: 'long',day: "numeric" ,numberingSystem: "geor"});
        
        return d

    }
  return <div className="reviews-container pb-5 mt-5">
    {reviews.filter(i=>i.accepted).length? <>
    {/* <div className="reviews-title d-flex align-items-center">
        <h5 className="border-bottom-red">نظرات</h5>
        <div className="d-flex align-items-center justify-content-center pe-4 flex-grow-1">
            <button className="btn btn-outline-info mx-md-5 mx-2 text-nowrap">
                جدیدترینها
            </button>
            <button className="btn btn-outline-info mx-md-5 mx-2 text-nowrap">
                محبوب ها
            </button>
        </div>
    </div> */}


    <div className="review-lines  rounded ">
        {  reviews.map((i, idx)=>{
            return i.accepted && <div key={idx} className="review-line d-flex align-items-center my-2 flex-wrap border ">
                {i.user_id && i.user_id.avatar_image? 
                    <img src={e.BASE_URL + i.user_id.avatar_image} alt="Profile Image" />
                    :
                    <Image src={reviewer} alt="Profile Image" />}
                <div className="content1 flex-grow-1 px-2 pt-2">
                    <h6>{i.user_id.first_name? i.user_id.first_name + " " + i.user_id.last_name: "کاربر گیفت شاپ" } | <span className="text-black-50">{get_time(i.created)}</span></h6>
                    <p> {i.text} </p>
                </div>
                <div className="d-flex align-items-end">
                    <ThumbUpOffAltIcon className="cursor-pointer"/>
                    <span className="mx-2"></span>
                    <ThumbDownOffAltIcon />
                </div>
                {i.answer? <p className='border-top rounded p-2 w-100 mt-4'>
                    پاسخ مدیر: <br />
                    {i.answer}
                </p>: i.answer}
            </div>
        })}
    </div>
    {/* <button className="primary-gradient rounded py-2 mt-2 px-2 w-300 text-center d-flex justify-content-center mx-auto">نمایش بیشتر</button> */}
    </>:<div className="">نظری برای این کارت ثبت نشده است</div>}
    
  </div>
}

export default Reviews;
