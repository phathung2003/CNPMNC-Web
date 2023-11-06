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
            return [import.meta.env.VITE_API_CONTACT];
        case 'Main':
            return [import.meta.env.VITE_API_MAIN];
        case 'Info':
            return [import.meta.env.VITE_API_INFO];
        case 'CarAdd':
            return [import.meta.env.VITE_API_CAR_ADD];
        case 'CarDelete':
            return [import.meta.env.VITE_API_CAR_DELETE];
        case 'CarMain':
            return [import.meta.env.VITE_API_CAR_MAIN];
        default:
            return null;
    }
}