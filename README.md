# Token-ICO
A sample project to creating tokens on Etherum network by using truffle &amp; openzeppelin

## Steps to setup codebase

- npm install
- Start your test net by testrpc -m "drill gate hawk police orbit fatal various ozone swift physical still boat"
- Compile & run solidity code by truffle migrate
- Start node server by node app.js or npm start

### API to get totalSupply
- Method: GET
- URL: http://localhost:8080/totalSupply

### API to getBalances
- Method: GET
- URL: http://localhost:8080/getBalances?address=:address

### API to transfer tokens
- Method: PUT
- URL: http://localhost:8080/transfer
- Body: {
  "to": "0xc4339dF2e557EebA50EF6d717bB6c8a333667fB6",
	"amount": 10
  }
