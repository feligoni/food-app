import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createOrder = (taskText, orderData) => {
    const generatedId = orderData.name; // firebase-specific => "name" contains generated id
    const createdOrder = {
      id: generatedId,
      name: orderData.name,
      address: orderData.address,
      city: orderData.city,
      zip: orderData.zip,
      items: orderData.items,
      totalAmount: totalAmount,
    };
    props.onAddTask(createdOrder);
  };

  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [orderConfirmed, setConfirmedOrder] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const openCheckoutHandler = () => {
    setIsCheckout(true);
  };

  const closeCheckoutHandler = () => {
    setIsCheckout(false);
  };

  const confirmedOrderHandler = (
    orderName,
    orderAddress,
    orderCity,
    orderZip
  ) => {
    const orderData = {
      name: orderName,
      address: orderAddress,
      city: orderCity,
      zip: orderZip,
      items: itemList,
      totalAmount: totalAmount,
    };
    sendTaskRequest(
      {
        url: "https://reacthttp-21417-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          orderData,
        },
      },
      createOrder.bind(null, orderData)
    );
    setConfirmedOrder(true);
  };
  let itemArray = cartCtx.items.map((item) => [item.name, item.amount]);
  let itemList = [];

  for (var i = 0; i < itemArray.length; ++i) {
    let itemName = itemArray[i][0];
    let itemAmount = itemArray[i][1];
    let item = itemName + " x" + itemAmount;
    itemList.push({
      item,
    });
  }
  console.log(itemList);
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={openCheckoutHandler}>
          Order
        </button>
      )}
    </div>
  );
  return (
    <Modal onClose={props.onClose}>
      {orderConfirmed && (
        <div className={classes.actions}>
          <h1>Thank you for your order!</h1>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        </div>
      )}
      {!orderConfirmed && (
        <div>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && (
            <Checkout
              onConfirm={confirmedOrderHandler}
              onCancel={closeCheckoutHandler}
            />
          )}
          {!isCheckout && modalActions}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
