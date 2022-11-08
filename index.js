import { createOrder, retrieveOrder } from './services/klarna.js'
import { getProducts, getProduct } from './services/api.js'
import express from 'express'
const app = express()
import { config } from 'dotenv'
config()

app.get('/', async (_, res) => {
    const products = await getProducts()

    // Känn dig fri att lägga till vilken styling som helst nedan
    const markup = products
        .map(
            (p) =>
                `<a style="display:block;color:black;border:solid black 2px;margin: 20px; padding:10px;" href="/p/${p._id}">
                    ${p.name} - ${p.price}kr
                </a>`
        )
        .join(' ')

    res.send(markup)
})

app.get('/p/:product_id', async function (req, res) {
    try {
        // tar id:et från params, e.x för url:en '/p/abc' hade id:et varit 'abc'
        const product_id = req.params.product_id
        // hämtar just den produkten från vår databas
        const product = await getProduct(product_id)
        // skapar en order via Klarnas API
        const klarnaJsonResponse = await createOrder(product)
        // Klarna svarar med HTML som vi sen skickar till klienten
        const html_snippet = klarnaJsonResponse.html_snippet

        // skicka HTML koden vi fick från klarna till klienten
        res.send(html_snippet)
    } catch (error) {
        // om något gick fel skickar vi fel meddelandet
        res.send(error.message)
    }
})

app.get('/confirmation', async function (req, res) {
    // tar id:et från query, e.x för url:en '/confirmation?order_id=abc' hade order_id varit 'abc'
    const order_id = req.query.order_id
    const klarnaJsonResponse = await retrieveOrder(order_id)
    // Klarna svarar med HTML som vi sen skickar till klienten
    const html_snippet = klarnaJsonResponse.html_snippet

    // skicka HTML koden vi fick från klarna till klienten
    res.send(html_snippet)
})

app.listen(process.env.PORT)
