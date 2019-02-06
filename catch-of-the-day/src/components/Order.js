import React from 'react';
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from "react-transition-group";


class Order extends React.Component {
  renderOrder = (key) => {
    const { fishes, order } = this.props;
    const fish = fishes[key]
    const fishCount = order[key];
    const isAvailable = fish && fish.status === 'available';
    if (!fish) {
      return null;
    }
    if (!isAvailable) {
      return (
        <CSSTransition classNames="order" key={ key } timeout={{ enter: 250, exit: 250}}>
          <li key={ key }>Sorry { fish.name } is no loner available</li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition classNames="order" key={ key } timeout={{ enter: 5000, exit: 5000}}>
      <li key={ key }> 
        { fishCount }
        { fishCount === 1 ? 'lb' : 'lbs' }&nbsp;
        { fish.name }&nbsp;
        <strong>{ formatPrice(fishCount * fish.price) }</strong>
        <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
      </li>
      </CSSTransition>
    );
  }
  render () {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key]
      const fishCount = order[key];
      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) {
        return prevTotal + (fishCount * fish.price);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          { orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total: 
          <strong>{ formatPrice(total) }</strong>
        </div>
      </div>
    );
  }
}

export default Order;