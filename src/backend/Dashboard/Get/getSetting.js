import axios from "axios";

import checkUri from "../../checkUri";

const [result, api] = checkUri("SettingMain");

export default async function infoProcess() {
    var data;
    if (result) {
        await axios.get(api)
            .then(info => data = info.data)
            .catch(err => console.log(err.data))
    }
    return data;
}