import React from "react";
import ProfileAside from "../../components/ProfileAside";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Link from "next/link";
import profilePic from "../../img/other/11.png"
import Image from 'next/image'
import Head from "next/head";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


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
    const [ProfileMenuName, setProfileMenuName] = React.useState({
        name: "آرش زرندی",
        created: "2029-02-04T22:53:38.542904+03:30",
        email: "Arashzarandi@gmail.com",

        level: "سطح یک"
    })
    const [userInfo, setuserInfo] = React.useState({
        firstName: "آرش",
        lastName: "زرندی",
        dateBorn: "2029-02-04T22:53:38.542904+03:30",
        phoneNumber: "09154241249",
        nationalCode: "1050847852",
        sex: "male",
    })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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
                        <div className="col-lg-4 col-12 text-center">
                            <div className="profile-menu">
                                <Image src={profilePic} alt="Profile Image" />
                            </div>
                            <div className="profile-menu-name pt-2">

                                <p >{ProfileMenuName.name}</p>
                                <p>{ProfileMenuName.email}</p>
                                <p>
                                    {new Date(ProfileMenuName.created).toLocaleDateString("fa-IR")}
                                </p>
                                <p>
                                    وضعیت حساب کاربری : {ProfileMenuName.level}
                                </p>

                            </div>
                            <div className="col-md-12 text-center pb-4">
                                <Link href="">
                                    <a className="btn success-gradient px-5">
                                        احراز اطلاعات فردی
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-8 col-12">
                            <div className="d-flex align-items-center justify-content-between">
                                <h5 className="px-3">اطلاعات فردی شما</h5>
                                <div>
                                    <Button className="text-basket" onClick={handleOpen}>
                                        <span>
                                        ویرایش یا ثبت اطلاعات
                                        </span>
                                    </Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>نام</Form.Label>
                                                    <Form.Control type="text" placeholder="نام " />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label> نام خانوادگی</Form.Label>
                                                    <Form.Control type="text" placeholder="نام خانوادگی خود" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>تاریخ تولد</Form.Label>
                                                    <Form.Control type="date" placeholder="تاریخ تولد" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>کد ملی</Form.Label>
                                                    <Form.Control type="number" placeholder="ملی" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>جنسیت</Form.Label>
                                                    <Form.Select aria-label="Default select example">
                                                        <option>--جنسیت خود را وارد کنید --</option>
                                                        <option value="مرد">مرد</option>
                                                        <option value="زن">زن</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>تلفن همراه</Form.Label>
                                                    <Form.Control type="number" placeholder="تلفن همراه" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>تصویر پروفایل</Form.Label>
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <label htmlFor="contained-button-file">
                                                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                                            <Button variant="contained" component="span">
                                                                بارگزاری تصویر پروفایل
                                                            </Button>
                                                        </label>
                                                        <label htmlFor="icon-button-file">
                                                            <Input accept="image/*" id="icon-button-file" type="file" />
                                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                                <CloudUploadIcon />
                                                            </IconButton>
                                                        </label>
                                                    </Stack>
                                                </Form.Group>
                                                <div className="col-md-12 text-center py-4">
                                                    <Button className="btn success-gradient">
                                                        ثبت و بروزرسانی پروفایل
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Box>
                                    </Modal>
                                </div>
                            </div>
                            <div className="user-info d-flex align-items-center justify-content-around py-5">
                                <div>
                                    <p> <span>نام</span> : {userInfo.firstName}</p>
                                    <p> <span>نام خانوادگی</span> : {userInfo.lastName}</p>
                                    <p> <span>تاریخ تولد</span> :{new Date(userInfo.dateBorn).toLocaleDateString("fa-IR")}</p>
                                </div>
                                <div>
                                    <p> <span>کد ملی</span> : {userInfo.nationalCode}</p>
                                    <p> <span>جنسیت</span> : {userInfo.sex}</p>
                                    <p> <span>تلفن همراه</span> : {userInfo.phoneNumber}</p>
                                </div>

                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="upload-section co-12 col-lg-5 m-auto">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <label htmlFor="contained-button-file">
                                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                            <Button variant="contained" component="span">
                                                بارگزاری تصویر شناسنامه
                                            </Button>
                                        </label>
                                        <label htmlFor="icon-button-file">
                                            <Input accept="image/*" id="icon-button-file" type="file" />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <CloudUploadIcon />
                                            </IconButton>
                                        </label>
                                    </Stack>
                                </div>
                                <div className="upload-section co-12 col-lg-5 m-auto">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <label htmlFor="contained-button-file">
                                            <Input accept="image/*" className="success-gradient" id="contained-button-file" multiple type="file" />
                                            <Button variant="contained" component="span">
                                                بارگزاری تصویر کارت ملی
                                            </Button>
                                        </label>
                                        <label htmlFor="icon-button-file">
                                            <Input accept="image/*" id="icon-button-file" type="file" />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <CloudUploadIcon />
                                            </IconButton>
                                        </label>
                                    </Stack>
                                </div>
                            </div>
                            <div className="col-md-12 text-center py-4">
                                <Button className="btn success-gradient">
                                    ثبت و بروزرسانی پروفایل
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
export default UserLevel;