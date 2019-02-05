import React from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Fish from './Fish';
import Order from './Order';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
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

  addToOrder = (key) => {
    // Take copy of state
    const order = { ...this.state.order };
    // Add to order or update number in order
    order[key] = order[key] + 1 || 1;
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
        />
        <Inventory 
          addFish={ this.addFish } 
          loadSampleFishes={ this.loadSampleFishes }
        />
      </div>
    );
  }
}

export default App;