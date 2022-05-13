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
import AcceptRuleModal from '../components/AcceptRuleModal'
import Head from 'next/head'
import LoginModal from '../components/LoginModal';
import Whatsapp from '../components/Whatsapp'
import Script from 'next/script'

Router.onRouteChangeStart = () => {
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

  React.useEffect(()=>{
    store.dispatch(get_initial_data())
    
  }, [])

  const [open, setRuleOpen] = React.useState( false)

  const handleRouteChange = (url) => {
    if (typeof window.gtag !== 'undefined' || typeof gtag !== 'undefined')
    window.gtag('config', '[Tracking ID]', {
      page_path: url,
    });
    else
    console.log("TEST")
  };
  React.useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (<>
    
    <Provider store={store}>
      <Head>
          <link rel="icon" href="/fav.png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="وبسایت مرجع خرید انواع گیفت کارت"/>
        </Head>
      <Header/>
      <Component {...pageProps} setRuleOpen={setRuleOpen} />
      {router.pathname.indexOf("auth")>-1?null:<>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation/>
      </Box>
      <Footer/>
      <Whatsapp/>
     
      </>}
      <ToastContainer
        position={"bottom-left"}
        autoClose={3000}
        rtl
      />
      <AcceptRuleModal open={open} setOpen={setRuleOpen}/>
      <LoginModal/>

      </Provider>
  </>)
};
export default MyApp;
