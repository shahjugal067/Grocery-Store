import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
// utilities funtions 

function calcPrices(orderItems){
    const itemsPrice = orderItems.reduce((acc,item)=> acc + item.price * item.qty,0)
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxRate = 0.15 
    const taxPrice = (itemsPrice * taxRate).toFixed(2)

    const totalPrice = 
        itemsPrice + shippingPrice + parseFloat(taxPrice).toFixed(2)
    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice,
    };
};


export const createOrder = async(req,res)=>{
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body;

        if(orderItems && orderItems.length === 0 ){
            res.status(400).json({ message: "No Order any items"})
        }
        const itemsFromDB = await Product.find({
            _id:{$in: orderItems.map((x)=> x._id)}
        })

        const dbOrderItems = orderItems.map((itemFromClient)=>{
            const matchingItemFromDB = itemsFromDB.find((itemsFromDB)=> itemsFromDB._id.toString() === itemFromClient._id.toString())

            if(!matchingItemFromDB){
                res.status(404).json({ message: "Product not found"})
            }
            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined,
            };
        });

        const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrices(dbOrderItems)
        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    } catch (error) {
        console.log(error)
    }
}