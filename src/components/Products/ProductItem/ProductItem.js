import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSelectedItem } from '../../../redux';
import './ProductItem.css';

const ProductItem = (props) => {
  return (
    <div className='card'>
      <img className='card-image' src={props.img} alt={props.title} />
      <div className='card-body'>
        <h2>{props.title}</h2>
        <h2>${props.price}</h2>
        <h2>{props.quantity || 0} available</h2>
        <Link to={`/products/edit`} className='btn-link'><button className='btn btn-warning' onClick={() => props.updateSelectedItem(props.id)}>Edit</button></Link>
        <Link to={`/products/delete`} className='btn-link'><button className='btn btn-danger' onClick={() => props.updateSelectedItem(props.id)}>Delete</button></Link>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  // products: state.products
})

const mapDispatchToProps = (dispatch) => ({
  updateSelectedItem: (value) => dispatch(updateSelectedItem(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem);

// export default ProductItem;