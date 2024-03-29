import React from 'react';
import {SEND_REVIEW} from '../redux/endpoints'
import axios from 'axios'
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import LoaderButton from './LoaderButton';

function SendFeedback({product={}, blog={}}) {
  const [text, setText] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [newRating, setNewRating] = React.useState(3)
  const send = ()=>{
    setLoading(true)
    axios.post(SEND_REVIEW, {
      template_id: product.id,
      blog_id: blog.id,
      content: text,
      rate: newRating
    })
    .then(res=>{
      const {data} = res
      toast(data.message, {
        type: data.type
      })
      if(data.error === 0)  
        setText('')
    })
    .catch(e=>{
      console.log(e)
    })
    .finally(f=>{
      setLoading(false)
    })
  }
  return <div className="send-feedback-container d-flex  flex-column">
    <p>
        می توانید نظر خود را برای ما ارسال کنید
    </p>
    <textarea className="form-control" placeholder="نظر خود را بنویسید" value={text} onChange={e=>setText(e.target.value)}> </textarea>
    <div className="d-flex justify-content-between align-items-center py-2">
          <div
            className="d-flex align-items-center justify-content-evenly mt-3 flex-wrap"
          >
            <span className="cursor-pointer">امتیاز دهید</span>
            <Rating
              dir="ltr"
              className="star-color"
              name="simple-controlled"
              value={newRating}
              onChange={(event, newValue) => {
                setNewRating(newValue);
              }}
            />
            
          </div>
        <LoaderButton className="my-2 py-2  align-self-end w-300 " onClick={send} text="ارسال" loading={loading}/>
    </div>
  </div>;
}

export default SendFeedback;
