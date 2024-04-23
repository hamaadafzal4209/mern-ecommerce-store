import "./AddProduct.css";
import uploadArea from "../../assets/upload_area.svg";
import { useState } from "react";

function AddProduct() {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    })

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            // Ensure that setImageFile is called to set the image file
            setImageFile(file);
        }
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = { ...productDetails };

        let formData = new FormData();
        formData.append('product', imageFile);
        console.log("FormData:", formData);

        await fetch('http://localhost:4000/upload', {
            method: "POST",
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => {
            responseData = data;
            if (responseData.success) {
                // Set the image URL received from the backend response
                product.image = responseData.image_url;
                // Update the state of productDetails with the new image URL
                setProductDetails(product);
                console.log(product);
                fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product),
                }).then((resp) => resp.json()).then((data) => {
                    data.success ? alert("Product Added") : alert("Failed")
                });
            }
        });
    }



    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type Here" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img
                        src={image ? image : uploadArea}
                        className="addproduct-thumbnail-img"
                        alt=""
                    />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={() => { Add_Product() }} className="addproduct-btn">ADD</button>
        </div>
    );
}

export default AddProduct;
