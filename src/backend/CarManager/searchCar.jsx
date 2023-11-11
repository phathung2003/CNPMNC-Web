export default function Search(carList, search) {
    var search = carList.filter((item) => {

        if (search === "") return item;

        return item.ID.toLowerCase().includes(search) ||
            item.TenXe.toLowerCase().includes(search) ||
            item.BienSo.toLowerCase().includes(search) ||
            item.SoCho.toLowerCase().includes(search) ||
            item.NhienLieu.toLowerCase().includes(search) ||
            item.TruyenDong.toLowerCase().includes(search) ||
            item.SoTien.toLowerCase().includes(search) ||
            item.TinhTrang.toLowerCase().includes(search);
    })

    return search;
}