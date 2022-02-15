import React from "react";
import ProfileAside from "../../components/ProfileAside";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Link from "next/link";
import profilePic from "../../img/other/11.png"
import Image from 'next/image'
import Head from "next/head";

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
    return (
        <section className="container">
            <Head><title>گیفت استاپ | حساب کاربری</title></Head>

            <div className="row">
                <ProfileAside active="profile" />
                <div className=" col-lg-9 col-12 py-5">
                    <h5 class="text-basket pb-3 m-0">
                        سطح <span>کاربری</span>
                    </h5>
                    <div className="d-flex align-items-center userLevel">
                        <div className="col-lg-4 col-12">
                            <div className="profile-menu">
                                <Image src={profilePic} alt="favorite blog" />
                            </div>
                            <div className="profile-menu-name">

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
                            <p>اطلاعات فردی شما</p>
                            <div className="user-info d-flex align-items-center justify-content-around">
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default UserLevel;