import { useState } from "react";
import ProductContext from "./ProductContext";
import { useNavigate } from "react-router-dom";


const ProductState = (props) => {
  const host = "http://localhost:5000"

  const [products,setProducts]=useState([])
  let navigate = useNavigate()

  // Product

  // Fetch all the Product

  const getproduct = async () => {
    const response = await fetch(`${host}/product/fetchproduct`, {
      method: "GET",
      headers: {
        'Content-type': "application/json",
      }
    })
    const json = await response.json()
    if (json.status) {
      setProducts(json.data)
      return json.data
    }
  }

  // Add a Product

  const addproduct = async (imageUrl,brand,title,size,price,description,quantity,category) => {
    const response = await fetch(`${host}/product/addproduct`, {
      method: "POST",
      headers: {
        'Content-type': "application/json",
      },
      body: JSON.stringify({imageUrl,brand,title,size,price,description,quantity,category})
    })

    const json = await response.json()
    // console.log(json)
    if (json.status) {
      setProducts(products.concat(json.data))
      alert('added')
      navigate('/admin/product')
    }
    else {
      alert('not added')
    }
  }


  // Edit a Product

  const editproduct = async (id, imageUrl,brand,title,size,price,quantity,description,category) => {
    const response = await fetch(`${host}/product/updateproduct/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': "application/json",
      },
      body: JSON.stringify({id, imageUrl,brand,title,size,price,quantity,description,category})
    })
    const json = await response.json()

    let newProduct = JSON.parse(JSON.stringify(products))
    for (let index = 0; index < newProduct.length; index++) {
      const element = newProduct[index];
      if (element._id === id) {
        element.imageUrl=imageUrl
        element.brand=brand
        element.title=title
        element.size=size
        element.price=price
        element.quantity = quantity
        element.description=description
        element.category=category
        break
      }
    }
    console.log(json)
    if (json.status) {
      setProducts(newProduct)
      alert('Product Updated successfully')
    }
    else {
      alert('error in update')
    }
  }

  // Delete a Product

  const deleteproduct = async (id) => {
    const response = await fetch(`${host}/product/deleteproduct/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': "application/json",
      }
    })
    const json = response.json()
    console.log(json)
    const newProduct = products.filter((product) => { return product._id !== id })
    setProducts(newProduct)
  }


  return (
    <ProductContext.Provider value={{getproduct,addproduct,deleteproduct,editproduct}}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState