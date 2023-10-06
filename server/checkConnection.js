//Khai báo để chạy biến môi trường
require('dotenv').config()

const HOSTS_REGEX = /^(?<protocol>[^/]+):\/\/(?:(?<username>[^:@]*)(?::(?<password>[^@]*))?@)?(?<hosts>(?!:)[^/?@]*)(?<rest>.*)/;

const database = process.env.DATABASE_TEST;
const port = process.env.PORT;


const result = function(){
    if(database === undefined || port === undefined){
        console.log("Bạn thiếu file .env hoặc file .env không hợp lệ để khởi động chương trình")
        return false
    }
    if(!database.match(HOSTS_REGEX) || !(database.startsWith('mongodb://') || database.startsWith('mongodb+srv://'))){   
    console.log("Không thể kết nối tới database !")
        return false
    }
    else{
        return true
    }
}

module.exports = result