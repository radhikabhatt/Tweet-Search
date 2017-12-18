var lineReader = require('line-reader');
const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

var count_line = 1;
var id_counter = 0;
var line_json;
var lines;
let bulkBody = [];

//Linereader takes in one line at a time from the text file, parses the line and indexes into elasticsearch.
lineReader.eachLine("./assignment_tweet(1).txt", function(line, last) {
  if(count_line > 2){
  	id_counter = id_counter + 1;
  	var singify_line = line.replace(/ +(?= )/g,'')
  	var arr = singify_line.split(' ');
  	var tweet_line = arr[2];
  	for(var i = 3; i<arr.length-2; i++){
  		tweet_line = tweet_line + ' ' + arr[i];
  	}
  	esClient.index({  
	  index: 'tweet',
	  id: id_counter,
	  type: 'tweet_text',
	  body: {
	    "created_at" : arr[0] + arr[1],
    	"text" : tweet_line,
    	"user_id": arr[arr.length - 1],
	  }
	},function(err,resp,status) {
	    console.log(resp);
    });
  }
  count_line = count_line + 1;
  if(last){
  }
});