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
import {useStore } from '../redux/store';
import {get_initial_data} from '../redux/actions'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router';
// static async getInitialProps({Component, ctx}){
//   const appProps = Component.getInitialProps?   await Component.getInitialProps(ctx): {};
//   console.log(appProps)
//   return {appProps: appProps};
// }
const MyApp = ({Component, pageProps}) => 
{
  const store = useStore(pageProps.initialReduxState)
  const router = useRouter();
  const excludeUrls = [
    "/login",
    "/signup",
  ] 
  React.useEffect(()=>{
    store.dispatch(get_initial_data())
    
  }, [])

  return (<>
    <Provider store={store}>
      <Header/>
      <Component {...pageProps} />
      {excludeUrls.includes(router.pathname)?null:<>
      <Box sx={{ width: "100%" }}>
        <BottomNavigation/>
      </Box>
      <Footer/></>}
      </Provider>
  </>)
};
export default MyApp;
