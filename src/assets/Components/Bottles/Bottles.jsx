import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCard, removeFromLS } from "../../../utilitis/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {

    const [bottles, setBottles] = useState ([]);
    const[cart, setCart] = useState([]);

    useEffect(() =>{
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    }, [])

    // l-s load cart
    useEffect(() =>{
        console.log('call the useEffect', bottles.length);
        
        if(bottles.length){
            const storedCart = getStoredCard();
            console.log(storedCart, bottles);
            const savedCart = [];

            for(const id of storedCart){
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle){
                    savedCart.push(bottle)
                }
            }
            console.log('save card', savedCart);
            setCart(savedCart);
        }
    }, [bottles])

    const handleAddToCard = bottle =>{
        console.log(bottle);
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLS(bottle.id);
    }

    const handleRemoveFromCart = id => {
        // cart remove
        const remainingCart = cart.filter(bottle=> bottle.id !== id);
        setCart(remainingCart)
        // remove LS 
        removeFromLS(id);
    }


    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>

            <div className="bottle-container">
                {
                    
                    bottles.map(bottle => <Bottle
                    key={bottle.id}
                    bottle={bottle}
                    handleAddToCard ={handleAddToCard}
                    ></Bottle>)
                    
                }
            </div>
        </div>
    );
};

export default Bottles;