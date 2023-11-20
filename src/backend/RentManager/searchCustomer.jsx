export default function Search(customerList, search) {
    search = search.toUpperCase();

    var search = customerList.filter((item) => {
        return item.IDKH.includes(search) ||
            item.TenKH.includes(search) ||
            item.SoDienThoai.includes(search) ||
            item.CMND.includes(search) ||
            item.BangLai.includes(search);
    })
    return search;
}