import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import "dotenv/config"
import { prometheus } from '@hono/prometheus'
import { bookRouter } from './books/book.router';


const app = new Hono();
const {printMetrics, registerMetrics} = prometheus()

//3rd party middleware
app.use('*', registerMetrics)
app.use('*', cors())
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173','https://red-sea-0ebf43a0f.5.azurestaticapps.net'],
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)
//default routes
app.get('/', (c) => {
  return c.text('The server is running on PORT 8000 🚀🚀 ' )
})
app.notFound((c) => {
  return c.text('Route Not Found', 404)
})
app.get('/metrics', printMetrics)


//custom routes
app.route("/",bookRouter)

console.log("Server is running on port " + process.env.PORT || 3000)

serve({
  fetch: app.fetch,
  port:Number(process.env.PORT || 3000)
})
