import { useEffect, useState } from "react";
import axios from "axios";

import checkUri from "../checkUri"
const [result, api] = checkUri('StaffMain')

export default function infoProcess() {

    const [staffInfo, setInfo] = useState([]);

    if (result) {
        useEffect(() => {
            axios.get(api)
                .then(info => setInfo(info.data))
                .catch(err => console.log(err.data))
        }, [])
        
    }
   
    
    return staffInfo;
}