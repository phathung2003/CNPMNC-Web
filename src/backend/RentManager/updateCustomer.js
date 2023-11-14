import pushCustomerToDatabase from "./Post/uploadCustomer";
import updateCustomerPicture from "./updateCustomerPicture";

export default async function handleSubmit(formData, CMNDImage, licenseImage, setCMNDProgress, setLicenseProgress, setCMNDImage, setLicenseImage) {

    const myPromise = new Promise(
        async function (resolve) {
            try{
                await updateCustomerPicture(formData, CMNDImage, setCMNDProgress, setCMNDImage, "CMND")
                await updateCustomerPicture(formData, licenseImage, setLicenseProgress, setLicenseImage, "License")
        
                if (await pushCustomerToDatabase("CustomerEdit", formData)) 
                    resolve(true);
                else 
                    resolve(false);

            }catch{resolve(false);}
        }
    );

    return myPromise;
}
