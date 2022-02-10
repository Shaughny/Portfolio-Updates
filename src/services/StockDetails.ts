import { type } from "os";
import dotenv from "dotenv";
const { getAllStocks, localUpdateStock } = require('../controllers/StockController')
const axios = require('axios').default;
dotenv.config();


interface Stock {
    symbol: string;
    company: string;
    previousPrice: number;
    currentPrice: number;
}
const options = {
    headers: {
        'accept': 'application / json',
        'x-api-key': process.env.YAHOO_KEY
    }
};

const updateAllQuotes = async () => {
    const stockList: Stock[] = await getAllStocks();
    const updatedStockList: Stock[] = [];

    for (const stock of stockList) {
        try {
            const resp = await axios.get(`https://yfapi.net/v6/finance/quote?region=${'ca'}&lang=en&symbols=${stock.symbol}`, options);
            const data = resp.data.quoteResponse.result[0];
            updatedStockList.push({ symbol: stock.symbol, company: data.shortName, previousPrice: stock.currentPrice, currentPrice: data.bid });
        } catch (err) {
            console.log(err);
        }
    }

    await localUpdateStock(updatedStockList);
}





module.exports = {

    updateAllQuotes
}