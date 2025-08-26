import axios from 'axios'
import React, { createContext, useState, useEffect, useCallback } from 'react'


export const CartContext = createContext()

export function CartProvider({ children }) {

    const [cartcount, setCartcount] = useState(0)
    const userId = localStorage.getItem('id')



    const updateCartCount = useCallback(() => {
        if (userId) {
            axios.get(`http://localhost:3001/users/${userId}`)
                .then((res) => {
                    const userData = res.data
                    setCartcount(userData.cart ? userData.cart.length : 0)
                })
                .catch((err) => console.error(err))
        }
    }, [userId])

    useEffect(() => {
        updateCartCount()
    }, [updateCartCount])

    return (
        <div>
            <CartContext.Provider value={{ cartcount, updateCartCount }}>
                {children}
            </CartContext.Provider>

        </div>
    )
}

export default CartProvider