import React from 'react';

function SendFeedback() {
  return <div className="send-feedback-container d-flex  flex-column">
    <p>
        می توانید نظر خود را برای ما ارسال کنید
    </p>
    <textarea className="form-control" placeholder="نظر خود را بنویسید"> </textarea>
    <button className="my-2 py-2 rounded success-gradient align-self-end w-300">ارسال</button>
  </div>;
}

export default SendFeedback;
