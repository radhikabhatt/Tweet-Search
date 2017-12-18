var express = require("express");
var app = express();
var port = 2000;
var bodyParser = require('body-parser');
var fs = require('fs');
const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
	host: '127.0.0.1:9200',
	log: 'error'
});


app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
	extended: true
}));

//Search method searches through the ElasticSearch indexes. The results are passed back to the client as a collection of hits.
app.post('/search', function(request, res){
    var word = request.body.tweet_string;

    esClient.search({  
		index: 'tweet',
		size: 500,
		body: {
	    query: {
	    	match: { "text": word }
	    },
	  }
	},function (error, response,status) {
	    if (error){
			console.log("search error: "+error);
			res.send("Oops there has been an error. Please check back again.");
	    }
	    else {
			console.log("--- Response ---");
			console.log(response);
			console.log("--- Hits ---");
			res.send(response.hits.hits);
	    }
	});
});

app.use("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});					

app.listen(port, () => {
	console.log("Server listening on port " + port);
});