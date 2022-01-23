import '../static/global.css'
import '../static/shop.css'
import '../static/product.css'
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from '../components/Footer'
import Header from '../components/Header'
export default function MyApp({ Component, pageProps }) {
  return (<>
    <Header />
    <Component {...pageProps} />
    <Footer/>
    </>
  )
}