import CarInfo from "../../CarManager/Get/carMain"
import RentInfo from "../../BookManager/Get/rentDetail"
import CustomerInfo from "../../RentManager/Get/getCustomerMain"

export default async function fetchCar(setCar, setRent, setCustomer) {
    const car = await CarInfo();
    const rent = await RentInfo();
    const customer = await CustomerInfo();
    if (car, rent, customer) {
        setCar(car)
        setRent(rent)
        setCustomer(customer)
    }
};