import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Products from '../Products/Products';
import EditProduct from '../EditProduct/EditProduct';
import NewProduct from '../NewProduct/NewProduct';
import './MainContainer.css';

const MainContainer = (props) => {
  return (
    <div className='main-cont'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/home' component={Home} />
        <Route exact path='/products' component={Products} />
        <Route path='/products/new' render={() => (<NewProduct send={props.send} />)} />
        <Route path='/products/edit' render={(props) => (<EditProduct {...props} send={props.send} />)} />
        <Route path='/products/delete' render={(props) => (<EditProduct {...props} send={props.send} type='delete' />)} />
      </Switch>
    </div>
  )
}

export default MainContainer;