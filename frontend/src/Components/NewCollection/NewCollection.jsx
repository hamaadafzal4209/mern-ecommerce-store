import { useEffect, useState } from 'react'
import "./NewCollection.css"
// import newCollection from "../Assets/new_collections"
import Item from "../Item/Item"

function NewCollection() {

    const [newCollection, setNewCollection] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/newcollection")
            .then((response) => response.json())
            .then((data) => setNewCollection(data))
    }, [])

    return (
        <div className='newcollections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {newCollection.map((item, index) => {
                    return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewCollection
