import cancelForm from "../Post/cancelForm";

export default async function handleSubmit(e, IDDon, navigate) {
    e.preventDefault();
    if (confirmSave()) {
        if (await cancelForm("BookCancel", IDDon)) {
            navigate("/Book")
        }
    }
}

function confirmSave() {
    if (window.confirm("Bạn có muốn huỷ đơn đặt trước này không ?")) return true;
    return false;
}