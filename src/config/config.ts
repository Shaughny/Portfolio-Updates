import dotenv from "dotenv";

dotenv.config();

const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 8001;

const SERVER = {
    hostname: SERVER_HOST,
    port: SERVER_PORT
}


export default SERVER;