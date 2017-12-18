var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Routes', function() {
	it('should return 200 ok on visiting root', function(done) {
  		chai.request('http://localhost:2000')
	    .get('/')
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.html;
	      done();
	    });
	});

	it('should give search results on /search POST', function(done) {
	  chai.request('http://localhost:2000')
	    .post('/search')
	    .send({'tweet_string': 'day'})
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body[0].should.have.property('_source');
	      res.body[0].should.have.property('_score');
	      res.body[0].should.have.property('_index');
	      res.body[0].should.have.property('_id');
	      res.body[0].should.have.property('_type');
	      res.body[0]._source.text.toLowerCase().indexOf("day").should.not.equal(-1);
	      done();
	    });
	});
});