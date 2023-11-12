import axios from "axios";

import checkUri from "../checkUri";

const [result, api] = checkUri("RentDetail");

export default function infoProcess(ID) {
    var carInfo = "";
    if (result) {
        axios.get(`${api}/${ID} `)
            .then((info) => {
                console.log(info.data)
                carInfo = info.data
            }
            )
            .catch(err => console.log(err.data))

    }

    // return carInfo;
}