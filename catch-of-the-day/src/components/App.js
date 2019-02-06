import React from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Fish from './Fish';
import Order from './Order';
import sampleFishes from '../sample-fishes';

import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    const { params } = this.props.match;

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this, 
      state: 'fishes'
    });
    // reinstate local storage
    const localStorageReference = localStorage.getItem(params.storeId);
    if (localStorageReference) {
      this.setState({ order: JSON.parse(localStorageReference) });
    }
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order)); 
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // Take copy of existing state
    const fishes = { ...this.state.fishes };
    // Add to fish 
    fishes[`fish${Date.now()}`] = fish;
    // Add to state
    this.setState({ fishes: fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  }

  updateFish = (key, updatedFish) => {
    //1. take copy of current state
    const fishes = { ...this.state.fishes };
    //2. update state
    fishes[key] = updatedFish;
    //3. set to state
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    //1. take copy of state
    const fishes = { ...this.state.fishes };
    //2. update the state (aka remove in this case)
    fishes[key] = null;
    //3. update the state
    this.setState({ fishes });
  }

  addToOrder = (key) => {
    // Take copy of state
    const order = { ...this.state.order };
    // Add to order or update number in order
    order[key] = order[key] + 1 || 1;
    // Call set State
    this.setState( { order } );
  }

  removeFromOrder = (key) => {
     // Take copy of state
     const order = { ...this.state.order };
     // Add to remove fromorder
     delete order[key];
     // Call set State
     this.setState( { order } );
  }
  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Freshest Seafood Market"/>
          <ul className="fishes">
            { Object.keys(this.state.fishes).map(key => 
            <Fish 
              key={ key }
              index={ key } 
              addToOrder={ this.addToOrder }
              details={ this.state.fishes[key] }
            />) }
          </ul>
        </div>
        <Order
          fishes={ this.state.fishes }
          order={ this.state.order }
          deleteFromOrder={ this.removeFromOrder }
        />
        <Inventory 
          addFish={ this.addFish } 
          updateFish={ this.updateFish }
          deleteFish={ this.deleteFish }
          loadSampleFishes={ this.loadSampleFishes }
          fish={ this.state.fishes }
        />
      </div>
    );
  }
}

export default App;