import * as React from "react";
import ProfileAside from '../../components/ProfileAside'
import Card from '../../components/Card'
import withAuth from "../../redux/withAuth";
import Head from "next/head";
import {useSelector, useDispatch} from 'react-redux'
import { Grid, Item } from "@mui/material";
import {profile} from '../../redux/actions'


 function StickyHeadTable() {
  const user = useSelector(s=>s.auth.user)
  const dispatch = useDispatch()
  React.useEffect(()=>{
    dispatch(profile())
  }, [])
  return (
    <section className="container">
      <Head><title>گیفت استاپ | امتیازات</title></Head>
      <div className="row">
        <ProfileAside active="favorites" />
        <div className=" col-lg-9 col-12 py-5">
          <h5 class="text-basket pb-3 m-0">کارت های <span>محبوب</span></h5>
          <Grid container spacing={2}>
            {user&&user.favorite_set.length?user.favorite_set.map(i=>{
              return <Grid item xs={12} md={6} lg={4}>
                <Card data={i.template_id} addToCard />
              </Grid>
            }): <Grid item xs={12}><div className="alert alert-info mt-5">مورد علاقه ای ثبت نشده است</div></Grid>}
          </Grid>
        </div>
      </div>
    </section>
  );
}
export default withAuth(StickyHeadTable)