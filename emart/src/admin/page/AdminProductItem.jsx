import React from 'react'
import { FileEdit, Trash2 } from 'lucide-react'

export const AdminProductItem = ({ index, product, updateproduct, deleteproduct }) => {
    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>
                    <div className="media align-items-center">
                        <img src={product.imageUrl} alt={product.title} width="100" className='rounded-circle'/>
                    </div>
                </td>
                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                    <div className="d-flex gap-2">
                        <span onClick={() => updateproduct(product)}><FileEdit absoluteStrokeWidth /></span>
                        <span onClick={() => deleteproduct(product)}><Trash2 absoluteStrokeWidth color='red' /></span>
                    </div>
                </td>
            </tr>
        </>
    )
}
