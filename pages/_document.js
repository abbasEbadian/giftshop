import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        // locale is in ctx.locale

        return { ...initialProps, locale: ctx?.locale || 'fa' }
    }
   
    render = () => (
        <Html dir={this.props.locale === 'fa' ? 'rtl': 'ltr'} lang={this.props.locale}>
            <Head>

                <script async src="https://www.googletagmanager.com/gtag/js?id=G-L1YN23M14P"></script>
                <script
                dangerouslySetInnerHTML={{
                    __html:`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-KTMRP9Z');`,
                }}
                />
                

            </Head>
            <body>
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KTMRP9Z"
                height="0" width="0" style={{display:"none", visibility:"hidden"}}></iframe></noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default MyDocument