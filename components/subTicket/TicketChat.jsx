import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import SendIcon from '@mui/icons-material/Send';
import {ADD_TICKET, SEEN_TICKET} from '../../redux/endpoints'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import axios from 'axios'
import {profile} from '../../redux/actions'
import * as e from '../../redux/endpoints'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TicketChat({order, setOpen, open, color, ticket}) {
  const dispatch = useDispatch()
  const user =  useSelector(s=>s.auth.user)
  const [messages, setMessages ] = React.useState([]);
  const [message, setMessage ] = React.useState("");
    React.useEffect(()=>{
        if(ticket && user)
        setMessages(user?.ticket_set.filter(i=>i.id===ticket.id)[0].ticketmessage_set)
    }, [ticket, user])
 

  const handleClose = () => {
    setOpen(false);
  };
  const _send = (e)=>{
      e.preventDefault()
      e.stopPropagation()
      if(!message ) {
            return
        }
      if((ticket && ticket.status === "closed")){
          toast.error("تیکت بسته شده است")
          return
      }
    axios.post(ADD_TICKET, {
      ticket_id: ticket.id ,
      message,
    })
    .then(response =>{
      const {data} =response
      if(data.error === 0){
        dispatch(profile())
        toast.success(data.message)
        setMessage("")
      }else{
        toast.error(data.message)
      }
    })
    .catch(err=>{
      toast.error("خطا در برقراری با  سرور ")
      console.log(err)
    })
  }
  React.useEffect(()=>{
    if(ticket)
    axios.get(SEEN_TICKET+ticket.id+"/")
    .then(r=>{
      dispatch(profile())
    })
    .catch(e=>{console.log(e)})
  }, [ticket])
  return (
    <div>
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} color={color}>
          <Toolbar className='d-flex align-items-center justify-content-between'>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{"paddingInline": "16px", "flexGrow": 1, "textAlign": "center"}} variant={"h6"} >{ticket?.title}</Typography>
            <div>
              {ticket?.status === "answered"? "پاسخ داده شده": ticket?.status==="closed"? "بسته شده.": "در حال پیگیری"}
            </div>
          </Toolbar>
        </AppBar>
        <form action="#" method="post" onSubmit={_send}> 
                   <div className="inbox_msg">
                        <div className="mesgs">
                            <div className="msg_history">
                                
                                {messages&&messages.map(item=>{
                                    return (
                                        item.user_id.is_superuser || item.user_id.is_staff?
                                            <div className="outgoing_msg">
                                                <div className="sent_msg">
                                                    <p>
                                                      <div>
                                                        {item.user_id.avatar_image?<img className="ticket-message-image" src={e.BASE_URL + item.user_id.avatar_img} alt="avatar" />:null}
                                                        <h6>{ item.user_id?.first_name + " " + item.user_id?.last_name + " : "}</h6>
                                                      </div>
                                                      <hr />
                                                    {item.message}
                                                    </p>
                                                    <span className="time_date"> {new Date(item.created).toLocaleDateString("fa")} {" "} {new Date(item.created).toLocaleTimeString("fa", {hour: "numeric", minute: "numeric"})}</span> </div>
                                            </div>
                                        :<div className="incoming_msg">
                                            {/* <div className="incoming_msg_Image"> <Image src={profilePic} alt="sunil" /> </div> */}
                                            <div className="received_msg">
                                                <div className="received_withd_msg">
                                                    <p>
                                                    <div>
                                                    {item.user_id.avatar_image?<img className="ticket-message-image" src={e.BASE_URL + item.user_id.avatar_image} alt="avatar" />:null}
                                                        <h6>{ item.user_id?.first_name + " " + item.user_id?.last_name + " : "}</h6>
                                                      </div>
                                                    <hr />
                                                    {item.message}</p>
                                                    <span className="time_date"> {new Date(item.created).toLocaleDateString("fa")} {" "} {new Date(item.created).toLocaleTimeString("fa", {hour: "numeric", minute: "numeric"})}</span> </div>
                                              </div>
                                        </div>
                                    )
                                })}
                                
                                
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write d-flex">
                                    <input type="text" className="write_msg" placeholder="متن پیام را وارد کنید" value={message} onChange={e=>setMessage(e.target.value)}/>
                                    {/* <textarea name="" className="form-control" id="" cols="30" rows="10"></textarea> */}
                                    <IconButton  type="submit" > <SendIcon/></IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                   </form>
      </Dialog>
    </div>
  );
}
