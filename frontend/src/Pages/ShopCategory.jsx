import React, { useContext } from 'react'
import "./CSS/ShopCategory.css"
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from "../Components/Assets/dropdown_icon.png"
import Item from '../Components/Item/Item';

function ShopCategory(props) {
  const { all_product } = useContext(ShopContext);
  return (
    <div className='shop-cateory'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <div>
          <span>Showing 1-12</span> out of 36 products
        </div>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shop-category-products">
        {all_product.map((item) => {
          if (props.category === item.category) {
            return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
