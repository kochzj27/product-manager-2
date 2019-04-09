// Express Framework
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require('cors');
// Body Parser Library for Post Data
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

// Static Route to Serve the React App
app.use(express.static("../../build/"));

//server listening
const server = app.listen(1337);
const io = require('socket.io')(server);

io.on('connection', function (socket) { //2
  console.log("CONNECTED TO CLIENT SOCKET")
  socket.emit('greeting', { msg: 'New Connection' }); //3
  socket.on('thankyou', function (data) { //7
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });

  socket.on('newItem', function (data) { //7
    console.log("POST - ITEM")
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
    axios.post('http://5c953cd2498269001487f228.mockapi.io/products', data.msg)
      .then((res) => {
        socket.emit('success', { msg: { status: 'success', action: 'added' } })
        returnAll();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('getItem', function (data) {
    console.log("GET - ITEM")
    returnAll();
  });

  socket.on('deleteItem', function (data) {
    console.log("DELETE - ITEM")
    //axios delete call
    axios.delete(`http://5c953cd2498269001487f228.mockapi.io/products/${data.msg}`)
      .then((res) => {
        socket.emit('success', { msg: { status: 'success', action: 'deleted' } })
        returnAll();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('updateItem', function (data) {
    console.log("DELETE - ITEM")
    //axios delete call
    axios.put(`http://5c953cd2498269001487f228.mockapi.io/products/${data.msg.id}`, data.msg)
      .then((res) => {
        socket.emit('success', { msg: { status: 'success', action: 'deleted' } })
        returnAll();
      })
      .catch((err) => {
        console.log(err);
      });
  });


  function returnAll() {
    axios.get('http://5c953cd2498269001487f228.mockapi.io/products')
      .then((res) => {
        io.emit('newdata', { payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

});

// RESTFUL ROUTES:

// GET ALL
// app.get("/api/v1/products", (request, response) => {
//   // axios.get('http://5c953cd2498269001487f228.mockapi.io/products')
//   //   .then((res) => {
//   //     console.log(res);
//   //     this.socket.emit('test12345', { data: res.data });
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
//   response.json({
//     data: 'test',
//     status: true,
//   })
// })


// // CREATE 1
// app.post("/transactions", (request, response) => {
//   let title = request.body.title;
//   let amount = request.body.amount;
//   let value = request.body.value;
//   let coinValue = request.body.coinValue;
//   let ownedCoins = request.body.ownedCoins;
//   let mktCoins = request.body.mktCoins;
//   axios.post('http://5c953cd2498269001487f228.mockapi.io/nmcoin', { title: title, amount: amount, value: value })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   axios.post('http://5c953cd2498269001487f228.mockapi.io/nmCoinValues', { coinValue: coinValue, ownedCoins: ownedCoins, mktCoins: mktCoins })
//   response.json({
//     status: true,
//   })
// })

// // DELETE 1
// app.delete("/tasks/:id", (request, response) => {
//   for (var i = 0; i < tasks.length; i++) {
//     if (tasks[i].id == request.params.id) {
//       tasks.splice(i, 1);
//       break;
//     }
//   }
//   response.json({
//     status: true,
//     tasks: tasks
//   })
// })

// // UPDATE 1
// app.put("/tasks/:id", (request, response) => {
//   console.log(request.body);
//   console.log(request.params.id);
//   for (var i = 0; i < tasks.length; i++) {
//     if (tasks[i].id == request.params.id) {
//       tasks[i] = Object.assign({}, tasks[i], request.body);
//     }
//   }
//   response.json({
//     status: true,
//     tasks: tasks
//   })
// })


// SERVER LISTENING

