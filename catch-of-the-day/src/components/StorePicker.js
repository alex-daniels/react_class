//react, duh
import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  readInput = React.createRef();
  // this handles the binding
  // avoiding this.variable = this.variable.bind(this)
  goToStore = (event) => {
    // don't let the form submit like normal
    event.preventDefault();
    // get text from input
    const storeId = this.readInput.current.value;
    // change page to /store/:storeId
    // change the history via push state inside the props
    this.props.history.push(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={ this.goToStore }>
        <h2>Please Enter a Store</h2>
        <input 
          type="text"
          ref={ this.readInput }
          required 
          placeholder="Store Name" 
          defaultValue={ getFunName() }
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;