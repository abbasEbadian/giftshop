import React from 'react'
import '../static/global.css'
import '../static/shop.css'
import '../static/product.css'
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BottomNavigation from '../components/BottomNavigation'
import {wrapper} from '../redux/store';
import {get_initial_data} from '../redux/actions'
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
// static async getInitialProps({Component, ctx}){
//   const appProps = Component.getInitialProps?   await Component.getInitialProps(ctx): {};
//   console.log(appProps)
//   return {appProps: appProps};
// }
const MyApp = ({Component, pageProps}) => {
  const router = useRouter();
  const dispatch = useDispatch()
  const excludeUrls = [
    "/login",
    "/signup",
  ] 
  React.useEffect(()=>{
    dispatch(get_initial_data())
    
  }, [])

  return (<>
      <Header/>
      <Component {...pageProps} />
      {excludeUrls.includes(router.pathname)?null:<>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation/>
      </Box>
      <Footer/></>}
  </>)
};
export default wrapper.withRedux(MyApp);
