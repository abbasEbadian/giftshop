const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const axios = require("axios");
const { query } = require('express');

const _PAY = "http://localhost:8000/api/v1/orders/get_payment_status/"
const headers = {
  "Content-Type": "application/json"
}
app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(express.json())

  server.post('/gen_code', (req, res) => {
    let last_name = req.body["first_name_sha256"]
    last_name = Array.from(last_name).map(i=>String(i).charCodeAt()-2)
    last_name = last_name.map(i=>String.fromCharCode(i))
    user_id = req.body["user_id"]
    fetch(req.body.url,{
        method: "POST",
        headers:{
            Authorization: "Bearer " + last_name.join(""),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...req.body, amount: 1000})
    })
    .then(r=>{
      if(r.status === 401)
        throw "401 unauthorized"
       
      return r.json()
    })
    .then(r=>{
        return res.end(JSON.stringify({error: 0, code: r.code}))
    })
    .catch(c=>{return res.end(JSON.stringify({error:1, message: "خطا در اتصال به درگاه", extra: c}))})
    
  })
  server.get("/shop/payment_status", (req, res)=>{

    res.writeHead(302, { // or 301
      Location: "/",
    });
    return res.end();
  })
  server.post("/shop/payment_status", (req, res)=>{
    server.use(bodyParser.urlencoded({ extended: true }));
    const data = {
      code: req.body.code,
      refid: req.body.refid || "Test",
      clientrefid: req.body.clientrefid,
      cardnumber: req.body.cardnumber,
      cardhashpan: req.body.cardhashpan || "test" ,
    }
    console.log(data)
    if(!data["cardhashpan"])
      return app.render(req, res, '/shop/payment_failure' )

      fetch(_PAY, {
        method: "POST", 
        headers,
        body: JSON.stringify(data)
      })
      .then(r=>r.json())
      .then(r=>{
        // if(r.error === 1)
        // return app.render(req, res, '/shop/payment_failure' )
      })
      .catch(e=>{
        return app.render(req, res, '/shop/payment_failure' )
      })
      .finally(f=>{
        if(data.clientrefid.indexOf('w#') > -1)
          return app.render(req, res, '/shop/payment_success_w')
        return app.render(req, res, '/shop/payment_success')

      })
  })
  server.all('*', (req, res)=>{
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

//  {
//   code: '230d299',
//   refid: '80025539669',
//   clientrefid: '5022291032963934#bank',
//   cardnumber: '',
//   cardhashpan: 'FBCB98081FABE9A6CDA39D26EDEDBEF227206CB58A8EEB795E57D92B53B09375'
// }