import React from 'react';
import ProductItem from './ProductItem/ProductItem';
import { connect } from 'react-redux';
import "./Products.css";

const Products = (props) => {
  let display;
  if (props.products && props.products.length > 0) {
    display = props.products.map((item, idx) => {
      return (
        <ProductItem key={idx} title={item.title} price={item.price} img={item.url} id={item.id} quantity={item.quantity} />
      )
    })
  }


  return (
    <div className='product-list'>
      {display ? display :
        (
          <p>Products currently unavailable.</p>
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);

// export default Products;