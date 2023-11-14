import pushToDatabase from "../Post/uploadForm";
import updateCustomer from "../updateCustomer";

export default async function handleSubmit(e, formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, inUploadProgress, setInUploadProgress, setCMNDImage, setLicenseImage) {
    e.preventDefault();

    if (!inUploadProgress) {
        setInUploadProgress(true);

        if (await updateCustomer(formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, setCMNDImage, setLicenseImage)) {
            if (await pushToDatabase("RentEdit", formData)) {
                setCMNDProgress(undefined);
                setLicenseProgress(undefined)
            }
        }
    }
    setInUploadProgress(false);
}

