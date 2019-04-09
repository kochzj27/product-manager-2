import React, { Component } from 'react';
import MainContainer from './components/MainContainer/MainContainer';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { addState } from './redux';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.socket = io('http://localhost:1337/');
    this.sendResponse = this.sendResponse.bind(this);
  }

  componentDidMount = () => {
    this.socket.on('greeting', (data) => { //4

      this.sendResponse({ type: 'getItem' });
    });
  }

  sendResponse(event) {
    this.socket.emit(event.type, { msg: event.data });
    this.socket.on('success', (data) => {
      // this.updateResponse(data.msg);
      console.log('successful response from server')
    });

    this.socket.on('newdata', (data) => {
      // this.setState({
      //   info: data.payload,
      // });
      this.props.addState(data.payload)
      // console.log(data.payload);
    });
  }

  render() {
    return (
      <div className="App container">
        <h1>PPM - Project Product Management</h1>

        <nav className="navbar navbar-expand-lg navbar-light bg-light navi">
          <Link className="navbar-brand" to="/"><img className='logoimg' src='data:image/png;base64,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' /></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products/new">Product Creation</Link>
              </li>

            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        ' {/* <div className="alert alert-danger" role="alert">
          WARNING: There is a dark-mode version of our website that is selling counterfeit items, avoid using them at all costs. Yes, their deals are too good to be true. It is a scam and they will steal your credit card information. The mystery box will just give you stickers. Everything else is just faked. Don't buy into it.
</div>' */}
        <MainContainer send={this.sendResponse} />
        <br />
        ©2019 PPM
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  addState: (value) => dispatch(addState(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// export default App;
