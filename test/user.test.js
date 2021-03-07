var server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

describe("USER REGISTRATION API", function() {

  describe("USER REGISTRATION API ", function() {

  
    chai.request(server).get('/shops/find-all-for-user').end((err,res)=>{
        // res.should.have.status(200)
    })

  

    chai.request(server).post('/shops/create').send({cc:1}).end((err,res)=>{
        // res.should.have.status(200)
    })

  });

});