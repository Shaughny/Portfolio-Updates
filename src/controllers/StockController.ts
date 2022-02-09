import { Request, Response } from 'express';
import { Stock } from '../models/Stock';
import { User } from '../models/User';
import { getConnection } from 'typeorm';




interface stock {
    symbol: string;
    company: string;
    previousPrice: number;
    currentPrice: number;
}



const addStock = async (req: Request, res: Response) => {
    const stockDTO: stock = req.body.stock
    const userDTO = req.body.user
    try {

        const stockExists = await getConnection().manager.findOne(Stock, stockDTO.symbol);
        if (!stockExists) {
            Stock.insert(stockDTO);
        }
        await getConnection().createQueryBuilder()
            .relation(User, "stocks").of(userDTO).add(stockDTO);


        res.status(200).end();
    } catch (err) {
        res.status(404).send(err);
    }

}

const getAllStocks = async () => {

    const stocks = await Stock.find();
    return stocks;
    // return JSON.stringify(stocks);

}

const stocksByUser = async (req: Request, res: Response) => {

    const user = await getConnection().manager.findOne(User, parseInt(req.params.id));
    if (user) {
        user.stocks = await getConnection().createQueryBuilder().relation(User, 'stocks')
            .of(parseInt(req.params.id)).loadMany();
        res.send(user.stocks);
    }
    else {
        res.status(404).send("Invalid User");
    }

}
const updateStock = async (req: Request, res: Response) => {
    const stockDTO: stock[] = req.body.stocks;
    stockDTO.forEach(async stock => {

        await getConnection().createQueryBuilder().update(Stock).set(stock).where("symbol = :id", { id: stock.symbol }).execute();
    })


    res.status(200).end();
}
const localUpdateStock = async (data:stock[]) => {
    const stockDTO: stock[] = data;
    stockDTO.forEach(async stock => {

        await getConnection().createQueryBuilder().update(Stock).set(stock).where("symbol = :id", { id: stock.symbol }).execute();
    })
}
const deleteStock = async (req: Request, res: Response) => {
    const userId = parseInt(req.body.user);
    const stockSymbol = req.body.stock;
    const user = await getConnection().manager.findOne(User, userId);
    if (user) {
        await getConnection().createQueryBuilder()
            .relation(User, "stocks").of(userId).remove(stockSymbol);
        const stocks = await getConnection().createQueryBuilder().relation(Stock, "user").of(stockSymbol).loadMany()
        if (stocks.length === 0) {
            await getConnection().manager.delete(Stock, stockSymbol);
        }
        res.json(stocks).end();
    }
}

module.exports = {
    addStock,
    stocksByUser,
    deleteStock,
    updateStock,
    getAllStocks,
    localUpdateStock
}