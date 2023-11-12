import { useParams } from "react-router-dom"
import RentInfo from "../../backend/RentManager/getInfo"
//---------------------------------------------//
export default function testing() {
    const params = useParams();
    const IDParams = params.id;
    console.log("Đầu vào: " + IDParams)
    const a1 = RentInfo(IDParams)
    return (
        <p>Hi</p>
    )
}