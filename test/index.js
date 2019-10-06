/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
process.env.NAME = 'Test';
process.env.JWT_SECRET = 'SIMPLE_JWT_SECRET';


const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

const { getServer } = require('../dist');

describe('Mikrop Test', () => {
  it('it must create new server', (done) => {
    const server = getServer({
      apiDir: `${__dirname}/api`,
    });

    server.get.should.be.a('function');
    server.post.should.be.a('function');
    server.put.should.be.a('function');
    server.del.should.be.a('function');
    server.name.should.equal('Test');
    server.onceNext.should.equal(true);
    server.strictNext.should.equal(true);
    done();
  });
});
