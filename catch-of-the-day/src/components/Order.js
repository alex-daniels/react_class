import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from "react-transition-group";


class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }

  renderOrder = (key) => {
    const { fishes, order } = this.props;
    const fish = fishes[key]
    const fishCount = order[key];
    const isAvailable = fish && fish.status === 'available';
    const unit = fishCount === 1 ? 'lb' : 'lbs';
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 5000, exit: 5000 }
    }
    if (!fish) {
      return null;
    }
    if (!isAvailable) {
      return (
        <CSSTransition { ...transitionOptions }>
          <li key={ key }>Sorry { fish.name } is no loner available</li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition { ...transitionOptions }>
      <li key={ key }> 
        <span>
          <TransitionGroup component="span" className="count">
            <CSSTransition { ...transitionOptions }>
              <span>{ fishCount }</span>
            </CSSTransition>
          </TransitionGroup>
          { unit } { fish.name }&nbsp;
          <strong>{ formatPrice(fishCount * fish.price) }</strong>
        </span>
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