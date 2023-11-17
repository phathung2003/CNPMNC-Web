export default function Search(customerList, search) {
    var search = customerList.filter((item) => {

        return String(item.IDKH).includes(search) ||
            item.TenKH.includes(search) ||
            item.SoDienThoai.includes(search) ||
            item.CMND.includes(search) ||
            item.BangLai.includes(search);
    })
    return search;
}