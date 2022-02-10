import { Stock } from "../models/Stock";
import { User } from "../models/User";
const { localStocksByUser } = require('../controllers/StockController')
const { localGetAllUsers } = require('../controllers/UserController');
const {updateAllQuotes} = require('../services/StockDetails');
const {sendEmails} = require('../services/EmailService');


const updatePortfolios = async () => {
    await updateAllQuotes();



    const userList: User[] = await localGetAllUsers();

    for (const user of userList) {
        let htmlString = ``;
        try {
            const userStocks:Stock[] = await localStocksByUser(user);

            for(const stock of userStocks){
                const stockName = stock.company;
                const percentageChange = Math.round((1.00 - (stock.previousPrice/stock.currentPrice))* 100)
                const operator = (stock.currentPrice - stock.previousPrice > 0) ? '+' : '';
                const colorStyle = (stock.currentPrice - stock.previousPrice > 0) ? '\"color: #4CBB17;\"' : '\"color: #FF3131;\"';
                htmlString += `<h3 style="color: #FFA500; "><em>${stockName} : &emsp;</em></h3><p>Market Close:&emsp;</p><p style=${colorStyle}>${stock.currentPrice}</p>\n<p>24h Change: &emsp;</p>    <p style=${colorStyle}>${operator}${percentageChange}%</p> `

            }
            await sendEmails(user.name,htmlString,user.email);

        } catch (err) {
            console.log(err);
        }

    }


}


module.exports = {
    updatePortfolios
}