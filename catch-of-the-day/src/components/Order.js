import React from 'react';
import { formatPrice } from '../helpers'

class Order extends React.Component {
  renderOrder = (key) => {
    const { fishes, order } = this.props;
    const fish = fishes[key]
    const fishCount = order[key];
    const isAvailable = fish.status === 'available';
    if (!isAvailable) {
      return <li key={ key }>Sorry { fish.name } is no loner available</li>
    }
    return (
      <li key={ key }> 
        { fishCount }
        { fishCount === 1 ? 'lb' : 'lbs' }&nbsp;
        { fish.name }&nbsp;
        <strong>{ formatPrice(fishCount * fish.price) }</strong>
      </li>

    );
  }
  render () {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key]
      const fishCount = order[key];
      const isAvailable = fish | fish.status === 'available';

      if (isAvailable) {
        return prevTotal + (fishCount * fish.price);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          { orderIds.map(this.renderOrder)}
        </ul>
        <div className="total">
          Total: 
          <strong>{ formatPrice(total) }</strong>
        </div>
      </div>
    );
  }
}

export default Order;