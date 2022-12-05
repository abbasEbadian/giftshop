import React from 'react'
import dynamic from 'next/dynamic'

import '../static/css/global.css'
import '../static/scss/master.scss'
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App, { AppContext, AppInitialProps, AppProps } from "next/app";

import Box from '@mui/material/Box'
const Footer = dynamic(() => import('../components/Footer'))
const Header = dynamic(() => import('../components/Header'))
const BottomNavigation = dynamic(() => import('../components/BottomNavigation'))
const AcceptRuleModal = dynamic(() => import('../components/AcceptRuleModal'))
const LoginModal = dynamic(() => import('../components/LoginModal'))
const Whatsapp = dynamic(() => import('../components/Whatsapp'))
import { useStore } from '../redux/store';
import { get_initial_data } from '../redux/actions'
import { configure } from '../redux/axiosConfig'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify'
import NProgress from 'nprogress'
import Router from 'next/router'

import Head from 'next/head'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Script from 'next/script';
import { Context, initialRender } from "../context/sse.context";

Router.onRouteChangeStart = () => {
	NProgress.start();
};

Router.onRouteChangeComplete = () => {
	NProgress.done();
};

Router.onRouteChangeError = () => {
	NProgress.done();
};


const MyApp = ({ Component, pageProps, ...extra }) => {
	configure()
	const store = useStore(pageProps?.initialReduxState || {})
	const router = useRouter();
	console.log(extra.brands)
	React.useEffect(() => {
		store.dispatch(get_initial_data())

	}, [])

	const [open, setRuleOpen] = React.useState(false)

	const handleRouteChange = (url) => {
		if (typeof window.gtag !== 'undefined' || typeof gtag !== 'undefined')
			window.gtag('config', '[Tracking ID]', {
				page_path: url,
			});
	};

	const theme = createTheme({
		components: {
			MuiUseMediaQuery: {
				defaultProps: {
					noSsr: true,
				},
			},
		},
	});

	React.useEffect(() => {
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);
	return (<>

		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Head>
					<link rel="icon" href="/fav.png" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<meta name="description" content="وبسایت مرجع خرید انواع گیفت کارت" />
					<script
						async
						dangerouslySetInnerHTML={{
							__html: `
						!function (t, e, n) { t.yektanetAnalyticsObject = n, t[n] = t[n] || function () { t[n].q.push(arguments) }, t[n].q = t[n].q || []; var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(), c = e.getElementsByTagName("script")[0], s = e.createElement("script"); s.id = "ua-script-hcMB8fLc"; s.dataset.analyticsobject = n; s.async = 1; s.type = "text/javascript"; s.src = "https://cdn.yektanet.com/rg_woebegone/scripts_v3/hcMB8fLc/rg.complete.js?v=" + r, c.parentNode.insertBefore(s, c) }(window, document, "yektanet");
							`,
						}}
					></script>
				
			
				</Head>
				<Header brands={extra?.brands || []} /> 
				<Component {...pageProps} setRuleOpen={setRuleOpen} />
				{router.pathname.indexOf("auth") > -1 ? null : <>
					<Box sx={{ width: "100%" }}>
						<BottomNavigation />
					</Box>
					<Footer />
					<Whatsapp />

				</>}
				<ToastContainer
					position={"bottom-left"}
					autoClose={3000}
					rtl
				/>
				<AcceptRuleModal open={open} setOpen={setRuleOpen} />
				<LoginModal />
			</ThemeProvider>
		</Provider>
	</>)
};

MyApp.getInitialProps = async (appContext) => {
	const data = await App.getInitialProps(appContext);
  
	const sse = await initialRender(appContext, data);
	console.log("TESTTTTTTTT", {...sse})
	const pageProps = {
	  ...data.pageProps,
	  ...sse,
	  brands: sse.data.brands
	};
  
	return {brands: sse.data.brands};
  };

export default MyApp;
