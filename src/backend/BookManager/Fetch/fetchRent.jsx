import { format } from 'date-fns';

export default function fetchRent(info, NgayBatDau, NgayKetThuc) {
    if (info) {
        var search = info.filter((item) => {
            return item.TinhTrang != "Hoàn thành" &&
                (`${format(item.NgayBatDau, "yyyy-MM-dd")}` >= NgayBatDau && `${format(item.NgayBatDau, "yyyy-MM-dd")}` <= NgayKetThuc) ||
                (`${format(item.NgayBatDau, "yyyy-MM-dd")}` >= NgayKetThuc && `${format(item.NgayBatDau, "yyyy-MM-dd")}` <= NgayBatDau)

        })
        return search;
    }
}