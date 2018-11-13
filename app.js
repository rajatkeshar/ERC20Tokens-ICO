var Web3 = require('web3');
var express = require('express');
var contract = require("truffle-contract");
var bodyParser = require('body-parser');
var TutorialToken = require('./build/contracts/TutorialToken');

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
var provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");

var MyContract = contract(TutorialToken);

MyContract.setProvider(provider);

if (typeof MyContract.currentProvider.sendAsync !== "function") {
    MyContract.currentProvider.sendAsync = function() {
        return MyContract.currentProvider.send.apply(
            MyContract.currentProvider, arguments
        );
    };
}

app.get('/', function(req, res) {
    res.json({
      msg: "Application is ready"
    });
});

app.get('/totalSupply', function(req, res) {
  var tutorialTokenInstance;
  MyContract.deployed().then(function(instance) {
    tutorialTokenInstance = instance;

    return tutorialTokenInstance.totalSupply();
  }).then(function(result) {
    res.json({
      msg: "totalSupply",
      transaction:  result.c[0]
    });
  }).catch(function(err) {
    res.json({
      msg:  err.message,
      err:  err
    });
  });
});

app.put('/transfer', function(req, res) {
  var tutorialTokenInstance;
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }

    var account = accounts[0];

    MyContract.deployed().then(function(instance) {
      tutorialTokenInstance = instance;

      return tutorialTokenInstance.transfer(req.body.to, req.body.amount, {from: account, gas: 100000});
    }).then(function(result) {
      res.json({
        msg: "transaction successful",
        transaction:  result
      });
    }).catch(function(err) {
      res.json({
        msg:  err.message,
        err:  err
      });
    });
  });
});

app.get('/getBalances', function(req, res) {
  var tutorialTokenInstance;
  MyContract.deployed().then(function(instance) {
    tutorialTokenInstance = instance;

    return tutorialTokenInstance.balanceOf(req.query.address);
  }).then(function(result) {
    res.json({
      msg: "balanceOf",
      amount:  result.c[0]
    });
  }).catch(function(err) {
    res.json({
      msg:  err.message,
      err:  err
    });
  });
});

app.listen(8080, function(req, res) {
  console.log("server is running at 8080");
});
