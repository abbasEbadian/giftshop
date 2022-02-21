import React from 'react'
import '../static/css/global.css'
import '../static/scss/master.scss'
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BottomNavigation from '../components/BottomNavigation'
import {useStore } from '../redux/store';
import {get_initial_data} from '../redux/actions'
import {configure} from '../redux/axiosConfig'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router';
import {ToastContainer} from 'react-toastify'
import NProgress from 'nprogress'
import Router from 'next/router'
NProgress.configure({ showSpinner: publicRuntimeConfig.NProgressShowSpinner });

Router.onRouteChangeStart = () => {
  console.log("CAE")
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};


const MyApp = ({Component, pageProps}) => 
{
  configure()
  const store = useStore(pageProps.initialReduxState)
  const router = useRouter();
  const excludeUrls = [
    "login",
    "signup",
    "logout"
  ] 
  React.useEffect(()=>{
    store.dispatch(get_initial_data())
    
  }, [])

  return (<>
    <Provider store={store}>
      <Header/>
      <Component {...pageProps} />
      {router.pathname.indexOf("auth")>-1?null:<>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation/>
      </Box>
      <Footer/>
     
      </>}
      <ToastContainer
        position={"bottom-left"}
        autoClose={3000}
        rtl
      />
      </Provider>
  </>)
};
export default MyApp;
