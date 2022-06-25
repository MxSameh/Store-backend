import bodyParser from 'body-parser';
import express,{Request,Response} from 'express';
import { order_routes } from './handlers/order';
import { product_routes } from './handlers/product';
import { user_routes } from './handlers/user';

const app = express();
const port = 3000;

app.use(bodyParser.json())

app.get('/',(req:Request,res:Response)=>{
  res.send('WELCOME TO THE STORE')
})

user_routes(app);
order_routes(app);
product_routes(app);

app.listen(port,()=>{
  console.log(`Server started: http://localhost:${port}`);
})