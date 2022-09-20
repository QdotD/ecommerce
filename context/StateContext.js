import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    // useStateSnippet
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState();
    const [qty, setQty] = useState(1);

    // state functions
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        // update our states
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        // run if item already exists in the cart
        if (checkProductInCart) {
            // update # of items in cart
            const updatedCartItems = cartItems.map((cartProuct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            }); 

            setCartItems(updatedCartItems);
            // else run this if item doesn't already exist in cart
        } else {
            product.quantity = quantity;
            
            setCartItems([...cartItems, { ...product }]);
        }
        // success toast message
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    // return global state and functions
    return (
        // not rendering anything, simply wraping everything in the context provider
        <Context.Provider
            // object of values to pass across the entire application
            value={{
                // allows us to access these values from any component in our app after we wrap our <Layout /> and <Component /> (_app.js) with the StateContext
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
            }}
        >
            {children}
        </Context.Provider>
    )
}

// export global state and functions also allows us to use our state like a hook
export const useStateContext = () => useContext(Context);