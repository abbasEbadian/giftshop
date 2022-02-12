import React from 'react'
function InputBox({error, help, parentClass, iconClass, ...props}) {
  const [type, setType] = React.useState("password")
  const handleEye = (e)=>{
    setType(s=>s==="text"?"password": "text")
  }
  return (
    <div className={"input-box " + parentClass + (error?" with-error": "") + (help? " with-help": "")}>
      {iconClass ? <i className={iconClass}></i>:null}
      {!props.eye? 
        <input  {...props}/> : 
        <input  {...props} type={type}/>
      }
      {props.eye? <span onClick={handleEye}className={"eye " + (type==="password"? "bi-eye":"bi-eye-slash")}></span>:null}
      {help?? <small className="help-text">{help}</small>}
      {error?? <small className="error-text">{error}</small>}
    </div>
  )
}

export default InputBox