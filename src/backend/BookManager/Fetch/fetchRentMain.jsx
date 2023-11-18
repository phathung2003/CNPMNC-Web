import { format } from 'date-fns';
import RentInfo from "../Get/rentDetail";

export default async function fetchRent(setRentList) {
    const rentData = await RentInfo()
    if (rentData) {
        var search = rentData.filter((item) => {
            return item.TinhTrang == "Đặt trước"
        })
        console.log(search.sort(function (a, b) { return a.NgayBatDau - b.NgayBatDau }))
        setRentList(search)
    }
}