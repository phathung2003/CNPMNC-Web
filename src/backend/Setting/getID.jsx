import { number } from "yup";
import SettingInfo from "./Get/getSetting"

export default async function fetchCar(type) {
    const myPromise = new Promise(
        await async function (resolve) {
            const data = await SettingInfo();

            switch (type) {
                case "4":
                    resolve(["XE04" + `${data.Xe4 + 1}`, data.Xe4 + 1]);
                case "8":
                    resolve(["XE08" + `${data.Xe8 + 1}`, data.Xe8 + 1]);
                case "16":
                    resolve(["XE16" + `${data.Xe16 + 1}`, data.Xe16 + 1]);
                case "30":
                    resolve(["XE30" + `${data.Xe30 + 1}`, data.Xe30 + 1]);
                case "45":
                    resolve(["XE45" + `${data.Xe45 + 1}`, data.Xe45 + 1]);

                case "SoXe":
                    resolve(["HĐ" + `${data.SLDon + 1}`, data.SLDon + 1]);
                case "SoDatXe":
                    resolve(["HĐ" + `${data.SLDon + 1}`, data.SLDonDatTruoc + 1]);

                case "KhachHang":
                    resolve(["KH" + `${data.SLKhachHang + 1}`, data.SLKhachHang + 1]);
                case "KeToan":
                    resolve(["KT" + `${data.SLNhanVien + 1}`, data.SLNhanVien + 1]);
                case "Chu":
                    resolve(["GĐ" + `${data.SLNhanVien + 1}`, data.SLNhanVien + 1]);


            }
        });
    return myPromise;
};