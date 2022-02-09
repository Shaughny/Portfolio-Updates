import { Request, Response} from 'express';
import express from 'express';
import { Stock } from '../models/Stock';
const { addStock,deleteStock,stocksByUser,updateStock} = require('../controllers/StockController')

const router = express.Router();



router.get('/get', (req: Request, res: Response) => {
    Stock.find().then((data) => {

        res.send(data);
    })

});
router.get('/get/:id', stocksByUser);

router.post('/', addStock);

router.delete('/', deleteStock);

router.put('/', updateStock);

module.exports = router;