import CarInfo from "../../CarManager/Get/carMain"
import RentInfo from "../../BookManager/Get/rentDetail"
import CustomerInfo from "../../RentManager/Get/getCustomerMain"
import HistoryInffo from "../Get/getHistory"

export default async function fetchCar(setCar, setRent, setCustomer, setHistory) {
    const car = await CarInfo();
    const rent = await RentInfo();
    const customer = await CustomerInfo();
    const history = await HistoryInffo();
    if (car && rent && customer && history) {
        setCar(car)
        setRent(rent)
        setCustomer(customer)
        setHistory(history)
    }
};