import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './NewProduct.css';

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceError: false,
      titleError: false,
      productItem: null,
      title: '',
      price: '',
      url: '',
      redirect: false,
    }
  }

  updateState = (e) => {
    let terr = this.state.titleError;
    let perr = this.state.priceError;
    if (this.state.price === '') {
      perr = true;
    } else {
      perr = false;
    }
    if (this.state.title.length < 4) {
      terr = true;
    } else {
      terr = false;
    }
    this.setState({
      [e.target.name]: e.target.value,
      titleError: terr,
      priceError: perr,
    });
  }


  newItem = (e) => {
    e.preventDefault();
    let newObj = {
      title: this.state.title,
      price: this.state.price,
      url: this.state.url,
    }
    this.props.send({ type: 'newItem', data: newObj });
    this.setState({
      redirect: true,
    })
  }


  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to='/products' /> : null}
        <h3>Create a new Product</h3>
        <form>
          <div className="form-group">
            <label htmlFor="title">Product Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="titleError" name="title" placeholder="My title" onChange={this.updateState} value={this.state.title} />
            {this.state.titleError ? <small id="titleError" className="form-text text-muted">Please enter an actual title.</small> : null}
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" className="form-control" id="price" placeholder="$999.99" name="price" aria-describedby="priceError" onChange={this.updateState} value={this.state.price} />
            {this.state.priceError ? <small id="priceError" className="form-text text-muted">Really??? You think thats a price?</small> : null}
          </div>
          <div className="form-group">
            <label htmlFor="price">Image Url (Optional)</label>
            <input type="text" className="form-control" id="url" name="url" placeholder="http://www.url.com/" onChange={this.updateState} value={this.state.url} />
          </div>
          <button type="submit" className="btn btn-success" onClick={this.newItem}>Create</button>
        </form>
      </div>
    )
  }
}

export default NewProduct;