import { format } from 'date-fns';

export default function fetchRent(IDDon, info, NgayBatDau, NgayKetThuc) {
    if (info) {
        var NgayBatDau = new Date(NgayBatDau).getTime();
        var NgayKetThuc = new Date(NgayKetThuc).getTime();

        var search = info.filter((item) => {
            return item.TinhTrang == "Hoàn thành" && item._id != IDDon &&
                item.NgayBatDau <= NgayBatDau && item.NgayBatDau >= NgayKetThuc ||
                NgayBatDau <= item.NgayBatDau && NgayBatDau <= item.NgayKetThuc
        })
        return search;
    }
}