import { format } from 'date-fns';

export default function Search(historyList, search) {
    console.log(search)

    var search = historyList.filter((item) => {
        if (search === "") return item;

        return format(item.Ngay, "dd/MM/yyyy HH:mm:ss").includes(search) ||
            (item.MaDon).includes(search) ||
            (item.MoTa).includes(search);
    })
    return search;
}