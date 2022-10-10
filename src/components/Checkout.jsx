import React, { useEffect } from 'react';
import { useState } from 'react';

function Checkout(props) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalShipping, setTotalShipping] = useState(0);

    const shippingCost = (weight) => {
        return Number(weight/1000 * 39).toFixed(0);
    }

    function applyFees() {
        let tempShipping = 0;
        let tempTotalPrice = 0;

        props.cartItems.forEach(item => {
            tempShipping += Number(totalShipping) + Number(shippingCost(item.weight));
            tempTotalPrice += Number(totalPrice) + Number(item.price);

            console.log("Applying shipping fee: ", shippingCost(item.weight));
        });

        setTotalShipping(tempShipping);
        setTotalPrice(tempTotalPrice);
    }

    useEffect(() => {
        if(totalPrice == 0)
            applyFees();
        
    }, []);

    return (
        <div>
            {props.cartItems.map(item => <p key={item.id}>{item.title} | Pris: {item.price} kr | Vikt: {item.weight} gram | Frakt:  {shippingCost(item.weight)} kr</p> )}
            <div>
                Fraktavgifter: {totalShipping} <br />
                Totalkostnad: {totalPrice}
            </div>
        </div>
     );
}

export default Checkout;