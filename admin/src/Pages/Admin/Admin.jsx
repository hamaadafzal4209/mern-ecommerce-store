import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Admin.css'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'

function Admin() {
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path='/addproduct' Component={AddProduct} />
                <Route path='/listproduct' Component={ListProduct} />
            </Routes>
        </div>
    )
}

export default Admin
