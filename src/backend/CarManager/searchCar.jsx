export default function Search(carList, search) {
    var search = carList.filter((item) => {

        if (search === "") return item;

        return String(item.IDXe).includes(search) ||
            item.TenXe.toLowerCase().includes(search) ||
            item.BienSo.toLowerCase().includes(search) ||
            String(item.SoCho).includes(search) ||
            item.NhienLieu.toLowerCase().includes(search) ||
            item.TruyenDong.toLowerCase().includes(search) ||
            String(item.SoTien).includes(search) ||
            item.TinhTrang.toLowerCase().includes(search);
    })

    return search;
}