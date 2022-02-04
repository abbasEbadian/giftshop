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

export default function MyApp({ Component, pageProps }) {
  const [value, setValue] = React.useState(0)
  const [basket, setBasket] = React.useState([])

  return (<>
    <Header/>
    
    <Component {...pageProps} setBasket={setBasket}  />
    <Box sx={{ width: "100%" }}>
      <BottomNavigation/>
    </Box>
    <Footer/>
    </>
  )
}