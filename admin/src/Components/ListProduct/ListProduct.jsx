import { useEffect, useState } from "react"
import "./ListProduct.css"
import cross_icon from "../../assets/cross_icon.png"

function ListProduct() {

  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data); // Update state with fetched products data
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>All Products List </h1>
      <div className="listproduct-format-main listproduct-format">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts ">
        <hr />
        {allproducts.map((product, index) => (
          <div key={index} className="listproduct-format-main">
            <img className="listproduct-product-icon" src={product.image} alt="" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => remove_product(product.id)} className="listproduct-remove-icon" src={cross_icon} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListProduct
