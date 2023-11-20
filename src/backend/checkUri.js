export default function checkUri(type) {

    const uri = getUri(type)

    switch (uri) {
        case undefined:
            console.log("Bạn thiếu file .env hoặc file .env không hợp lệ để truyền dữ liệu");
            return [false, null]
        case null:
            console.log("Đường dẫn này không tồn tại");
            return [false, null]
        default:
            return [true, uri]
    }
}

function getUri(type) {
    switch (type) {
        case 'Contact':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_CONTACT];
        case 'Main':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_MAIN];
        case 'Info':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_INFO];
        case 'CarAdd':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_CAR_ADD];
        case 'CarEdit':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_CAR_EDIT];
        case 'CarDelete':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_CAR_DELETE];
        case 'CarMain':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_CAR_MAIN];
        case 'CarDetail':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_CAR_DETAIL];

        //Khách hàng
        case 'CustomerAdd':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_CUSTOMER_ADD];
        case 'CustomerEdit':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_CUSTOMER_EDIT];
        case 'CustomerMain':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_CUSTOMER_MAIN];

        //Sổ xe
        case 'RentMain':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_RENT_MAIN];
        case 'RentAdd':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_RENT_ADD];
        case 'RentEdit':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_RENT_EDIT];
        case 'RentCheckout':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_RENT_CHECKOUT];

        case 'RentDetail':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_RENT_DETAIL];

        //Sổ đặt xe
        case 'BookAdd':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_BOOK_ADD];
        case 'BookEdit':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_BOOK_EDIT];
        case 'BookCancel':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_BOOK_CANCEL];
        case 'BookCreateRent':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_BOOK_CREATE_RENT];
        case 'BookDetail':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_BOOK_DETAIL];
        
        //Cài đặt
        case 'SettingMain':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_SETTING_MAIN];

        //Lịch sử
        case 'HistoryMain':
            return [import.meta.env.VITE_API_LINK] + [import.meta.env.VITE_API_HISTORY_MAIN];
            
        default:
            return null;
    }
}