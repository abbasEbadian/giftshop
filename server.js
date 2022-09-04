const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { query } = require('express');
const https = require('https');

const _PAY = dev? "http://localhost:8000/api/v1/orders/get_payment_status/": "https://arsimodir.ir/api/v1/orders/get_payment_status/"
const headers = {
  "Content-Type": "application/json"
}

app.prepare().then(() => {
  const server = express()

  const ZARINPAL_MERCHANT_ID = String(process.env.ZARINPAL_MERCHANT_ID).trim()
  const IRANDARGAH_MERCHANT_ID = String(process.env.IRANDARGAH_MERCHANT_ID).trim()

  const ZARINPAL_REQUEST_URL = String(process.env.ZARINPAL_REQUEST_URL).trim()
  const IRANDARGAH_REQUEST_URL = String(process.env.IRANDARGAH_REQUEST_URL).trim()
  
  const ZARINPAL_PAYMENT_URL = String(process.env.ZARINPAL_PAYMENT_URL).trim()
  const IRANDARGAH_PAYMENT_URL = String(process.env.IRANDARGAH_PAYMENT_URL).trim()

  const ZARINPAL_VERIFY_URL = String(process.env.ZARINPAL_VERIFY_URL).trim()
  const IRANDARGAH_VERIFY_URL = String(process.env.IRANDARGAH_VERIFY_URL).trim()

  const PAYMENT_CALLBACK_URL = String(process.env.PAYMENT_CALLBACK_URL).trim()


  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(express.json())

  const generate_payload = (data) => {
    const amount = data['amount'] * 10
    if (data.dargah === 'zarinpal')
      return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: ZARINPAL_MERCHANT_ID,
          amount: amount,
          description: data.description,
          Email: data.metadata?.email || "test@yahoo.com",
          Mobile: data.metadata?.mobile || "",
          callback_url: `${PAYMENT_CALLBACK_URL}`,
        })
      }

    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchantID: IRANDARGAH_MERCHANT_ID,
        amount: amount,
        callbackURL: `${PAYMENT_CALLBACK_URL}`,
        orderId: data.orderId,
        description: data.description
      }),
      agent: new https.Agent({
        rejectUnauthorized: false,
      })

    }
  }

  server.post('/gen_code', (req, res) => {
    const URL = req.body.dargah === 'zarinpal' ? ZARINPAL_REQUEST_URL : IRANDARGAH_REQUEST_URL
    const PAYURL = req.body.dargah === 'zarinpal' ? ZARINPAL_PAYMENT_URL : IRANDARGAH_PAYMENT_URL
    fetch(URL, generate_payload(req.body))
      .then(r => {
        if (r.status === 401)
          throw "401 unauthorized"

        return r.json()
      })
      .then(r => {
        let authority = undefined
        if(  req.body.dargah === 'zarinpal')
          authority = r.data?.authority
        else
          authority = r.authority
        console.log(r, authority)

        if(!authority) 
          return res.end(JSON.stringify({ error: 1, message:  "خطا در اتصال به درگاه"}))
        return res.end(JSON.stringify({ error: 0, url: PAYURL+authority}))
        
      })
      .catch(c => {
        console.log(c)
        return res.end(JSON.stringify({ error: 1, message: "خطا در اتصال به درگاه", extra: c }))
      })

  })

  // Zarinpal calls callback with GET
  server.get("/shop/payment_status", (req, res) => {
    const { Authority:authority, Status } = req.query
       
    if (Status === "OK") {
      const data = {
        authority,
        verify_url: ZARINPAL_VERIFY_URL,
        token: ZARINPAL_MERCHANT_ID,
        dargah: 'zarinpal',
        
      }
      console.log(data, _PAY)   
      fetch(_PAY, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      })
        .then(r => r.json())
        .then(r => {
          console.log(r)
          if (r.error === 1) {
            console.log(r)
            return app.render(req, res, '/shop/payment_failure', { "message": r.message })
          }
          if (r.type === "wallet")
            return app.render(req, res, '/shop/payment_success_w')
          return app.render(req, res, '/shop/payment_success')
        })
        .catch(e => {
          return app.render(req, res, '/shop/payment_failure')
        })


    }
    else
      return app.render(req, res, '/shop/payment_failure')

  })
  // Iran Dargah calls callback with POST
  server.post("/shop/payment_status", (req, res) => {
    const { authority, code:status,  } = req.body
      
    if (status == 100) {
    const data = {
        authority,
        verify_url: IRANDARGAH_VERIFY_URL,
        token: IRANDARGAH_MERCHANT_ID,
        dargah: 'irandargah'
      }
      fetch(_PAY, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      })
        .then(r => r.json())
        .then(r => {
          if (r.error === 1) {
            console.log(r)
            return app.render(req, res, '/shop/payment_failure', { "message": r.message })
          }
          if (r.type === "wallet")
            return app.render(req, res, '/shop/payment_success_w')
          return app.render(req, res, '/shop/payment_success')
        })
        .catch(e => {
          return app.render(req, res, '/shop/payment_failure')
        })


    }
    else
      return app.render(req, res, '/shop/payment_failure')

  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
