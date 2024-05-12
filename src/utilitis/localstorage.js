const getStoredCard = () => {
    const storedCartString = localStorage.getItem('cart')
    if(storedCartString){
        return JSON.parse(storedCartString)
    }
    return [];
}

const saveCartToLS = cart =>{
    const cartStringify = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringify)
}

const addToLS = id =>{
    const cart = getStoredCard();
    cart.push(id);
    saveCartToLS(cart);
}

const removeFromLS = id =>{
    const cart = getStoredCard();
    // id remove
    const remainig = cart.filter(idx => idx !== id);
    saveCartToLS(remainig);
}

export {addToLS, getStoredCard, removeFromLS}