import React from "react";
import ProfileAside from "../../components/ProfileAside";
import {Form } from "react-bootstrap";
import Link from "next/link";
import profilePic from "../../img/other/public-avatar.png"
import Image from 'next/image'
import Head from "next/head";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as e from '../../redux/endpoints' 
import {profile} from '../../redux/actions'
import axios from 'axios'
import {toast} from 'react-toastify' 
import {useDispatch, useSelector} from 'react-redux'
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send';
import { Badge, Chip, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import withAuth from '../../redux/withAuth'
const Input = styled('Input')({
    display: 'none',
});
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function UserLevel() {
    const user = useSelector(s=>s.auth.user)
    const dispatch = useDispatch()
    
    const [open, setOpen] = React.useState(false);
    const [birth_loading, setBirth_loading] = React.useState(false);
    const [national_loading, setNational_loading] = React.useState(false);
    const [avatar_loading, setAvatar_loading] = React.useState(false);
    const [profile_loading, setProfile_loading] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [firstNameErr, setFirstNameErr] = React.useState("")
    const [firstName, setFirstName] = React.useState("")
    const [lastNameErr, setLastNameErr] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [birthDateErr, setBirthDateErr] = React.useState("")
    const [birthDate, setBirthDate] = React.useState("")
    const [genderErr, setGenderErr] = React.useState("")
    const [gender, setGender] = React.useState(0)
    const [nCodeErr, setNCodeErr] = React.useState("")
    const [nCode, setNCode] = React.useState("")
    const [emailErr, setEmailErr] = React.useState("")
    const [email, setEmail] = React.useState("")

    
    React.useEffect(()=>{
        if(user){
            setFirstName(user.first_name)
            setLastName(user.last_name)
            setGender(user.gender)
            setNCode(user.national_code)
            setBirthDate(user.birth_date)
            setEmail(user.email)
        }
    },[user])

    React.useEffect(()=>{
        dispatch(profile())
    }, [])
    const birth_cart_ref = React.useRef()
    const national_cart_ref = React.useRef()
    const avatar_ref = React.useRef()

    const update_profile = (e1)=>{
        e1.stopPropagation()
        e1.preventDefault()
        if(!firstName) {
            setFirstNameErr("اجباری");return;
        }
        if(!lastName) {
            setLastNameErr("اجباری");return;
        }
        console.log(gender)
        if(!gender || gender === "0" ) {
            setGenderErr("اجباری");return;
        }
        if(!email) {
            setEmailErr("اجباری");return;
        }
        if(!nCode) {
            setNCodeErr("اجباری");return;
        }
        if(!birthDate) {
            setBirthDateErr("اجباری");return;
        }
        const data={
            first_name: firstName,
            last_name: lastName,
            gender,
            national_code: nCode,
            birth_date: birthDate,
            email
        }
        setProfile_loading(true)
        axios.post(e.UPDATE_PROFILE, data)
        .then(response =>{
            const {data} = response
            if(data.error === 0){
                toast.success(data.message)
                dispatch(profile())
                setOpen(false)
            }else{
                toast(data.message, {type: data.type})
            }  
        }).catch(e=>{console.log(e);toast.error("خطا در برقراری ارتباط")})
        .finally(f=>{
            setProfile_loading(false)
        })
    }
   
    const upload_national_image = (e1)=>{
        if(!e1.target.files.length) return
        
        setNational_loading(true)
        const data = new FormData()
        data.append('image', e1.target.files[0])
        axios.post(e.UPLOAD_NATIONAL_CARD_IMAGE, data, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            const {data} = response
            if(data.error === 0){
                toast.success(data.message)
                dispatch(profile())
            }else{
                toast(data.message, {type: data.type})
            }
        }).catch(e=>{console.log(e);toast.error("خطا در برقراری ارتباط")})
        .finally(f=>{
            setNational_loading(false)
        })
    }
    const upload_avatar_image = (e1)=>{
        if(!e1.target.files.length) return
        const data = new FormData()
        data.append('image', e1.target.files[0])
        axios.post(e.UPLOAD_AVATAR_IMAGE, data, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            const {data} = response
            if(data.error === 0){
                toast.success(data.message)
                dispatch(profile())
            }else{
                toast(data.message, {type: data.type})
            }
        }).catch(e=>{console.log(e);toast.error("خطا در برقراری ارتباط")})
        .finally(f=>{
            setAvatar_loading(false)
        })
    }
    const _national_click = (e)=>{
        const d = document.getElementById('contained-button-file2');
        console.log(d)
        d.focus();
        d.click();
    }
    const _avatar_click = (e)=>{
        const d = document.getElementById('contained-button-file1');
        console.log(d)
        d.focus();
    }
    return (
        <section className="container">
            <Head><title>گیفت استاپ | حساب کاربری</title></Head>

            <div className="row">
                <ProfileAside active="profile" />
                <div className=" col-lg-9 col-12 py-5">
                    <h5 class="text-basket pb-3 m-0">
                        سطح <span>کاربری</span>
                    </h5>
                    <div className="d-flex flex-wrap align-items-center userLevel">
                        <div className="col-xl-4 col-lg-6 col-12 text-center">
                            <div className="profile-menu">
                            <label htmlFor="contained-button-file1">

                                <input accept="image/*" id="contained-button-file1" className="d-none" type="file"  onChange={upload_avatar_image}/>

                                <LoadingButton aria-label="cart" onClick={_avatar_click} component="span">
                                    <Badge badgeContent={<EditIcon/>} color="primary" variant="string" overlap="circular" >
                                        {user&&user.avatar_image? 
                                        <img src={e.BASE_URL+user.avatar_image } alt="Profile Image" />
                                        :
                                        <Image src={profilePic} alt="Profile Image" />}
                                    </Badge>
                                </LoadingButton>
                                </label>
                                </div>
                            <div className="profile-menu-name pt-2">

                                <p >{user&&user.first_name? user.first_name+" "+user.last_name : "کاربر گیفت استاپ"}</p>
                                <p>{user&&user.email ? user.email: "بدون ایمیل"}</p>
                                <p>
                                    تاریخ عضویت : 
                                    {user&&user.date_joined ?new Date(user.date_joined).toLocaleDateString("fa-IR"): ""}
                                </p>
                                <p>
                                    وضعیت حساب کاربری : {user&&user.authentication_status==="authorized"? "کاربر سطح دو": "کاربر سطح یک"}
                                </p>

                            </div>
                            <Chip label={"امتیازات کسب شده " + (user&&user.total_points?user&&user.total_points: 0 )}>
                                
                            </Chip>
                            <div className="col-md-12 text-center pb-4 mt-2">
                            {user&&user.authentication_status==="authorized"?
                                <Chip color="success" variant="outlined" label="احراز هویت شده"></Chip>
                            :user&&user.authentication_status==="pending"?
                                <Chip color="warning" variant="outlined" label="در حال بررسی اطلاعات"></Chip>
                            :<Chip color="error" variant="outlined" label="احراز هویت نشده"></Chip>
                            }
                                
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-6 col-12">
                            <div className="d-flex align-items-center justify-content-between ">
                                <h5 className="px-3">اطلاعات فردی شما</h5>
                                <div>
                                    <Button className="text-basket" color='info' variant="outlined" onClick={handleOpen} startIcon={<EditIcon/>}>
                                        
                                    </Button>
                                    
                                </div>
                            </div>
                            <div className="user-info d-flex align-items-start justify-content-between py-5 flex-wrap px-sm-5 px-2">
                                <div>
                                    <p> <span>نام</span> : {firstName}</p>
                                    <p> <span>نام خانوادگی</span> : {lastName}</p>
                                    <p> <span>تاریخ تولد</span> :{birthDate? new Date(birthDate).toLocaleDateString("fa"): ""}</p>
                                    <p className="text-nowrap"> <span>ایمیل</span> : {email}</p>
                                </div>
                                <div>
                                    <p> <span>کد ملی</span> : {nCode}</p>
                                    <p> <span>جنسیت</span> : {gender==="male"?
                                     "آقا":gender==="female"?
                                     "خانم":""}</p>
                                    <p> <span>تلفن همراه</span> : {user?.username}</p>
                                </div>
                                <div className="col-10 px-4 ">
                                    
                                </div>

                            </div>
                            <div className="d-flex justify-content-center flex-wrap">
                               
                                <div className="upload-section col-12 col-sm-10 col-xl-6 m-auto">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                        
                                        <label htmlFor="icon-button-file" className="pb-3 text-success">
                                        {user&&user.has_national_card_image?
                                            "آپلود شده":
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <CloudUploadIcon />
                                            </IconButton>}
                                        </label>
                                        <label htmlFor="contained-button-file1">
                                        <input accept="image/*" className="success-gradient d-none" id="contained-button-file2"  type="file"  onChange={upload_national_image}/>
                                        <Button disabled={national_loading} size="small" variant="contained" color="success" onClick={_national_click}>بارگذاری تصویر کارت ملی + کارت بانکی</Button>
                                            
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        className="edit-profile-modal"
                                    >
                                        <Box sx={style}>
                                            <Form onSubmit={update_profile}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>نام</Form.Label>
                                                    <Form.Control type="text"  value={firstName} onChange={e=>setFirstName(e.target.value)} isInvalid={firstNameErr}/>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label> نام خانوادگی</Form.Label>
                                                    <Form.Control type="text" value={lastName} onChange={e=>setLastName(e.target.value)}  isInvalid={lastNameErr}/>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label> ایمیل</Form.Label>
                                                    <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} isInvalid={emailErr} />
                                                </Form.Group>
                                                <div className="pb-2">
                                                    <Form.Label> تاریخ تولد</Form.Label>
                                                    <LocalizationProvider dateAdapter={AdapterJalali}>
                                                        <DatePicker
                                                            className="w-100"
                                                            mask="____/__/__"
                                                            value={birthDate}
                                                            onChange={(newValue) => setBirthDate(newValue)}
                                                            renderInput={(params) => <TextField {...params} error={birthDateErr}/>}
                                                            fullWidth
                                                            size="small"
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>کد ملی</Form.Label>
                                                    <Form.Control type="text" value={nCode} onChange={e=>setNCode(e.target.value)}  isInvalid={nCodeErr}/>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>جنسیت</Form.Label>
                                                    <Form.Select aria-label="Default select example" value={gender} onChange={e=>setGender(e.target.value)} isInvalid={genderErr}>
                                                        <option value={0}>-- انتخاب کنید--</option>
                                                        <option value="male">آقا</option>
                                                        <option value="female">خانم</option>
                                                    </Form.Select>
                                                </Form.Group>
                                               
                                                <div className="col-md-12 text-center py-4">
                                                    <LoadingButton 
                                                        className="" 
                                                        loading={profile_loading}
                                                        loadingPosition="end"
                                                        variant="contained"
                                                        size="small"
                                                        type='submit'
                                                        >
                                                        ثبت و بروزرسانی پروفایل
                                                    </LoadingButton>
                                                    <Button  variant="outlined" size="small" color="error" onClick={handleClose} className="mx-2">
                                                        لغو
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Box>
                                    </Modal>
        </section >
    );
}
export default withAuth(UserLevel);