Tweet Search App:


I am using Express.js framework along with ElasticSearch for storing tweet text and searching tweet text. Additionally I am using Mocha, Chai for testing.

Following are the installation steps that I followed:


# Installation of Dependencies:

1) Install Express:

npm install express --save

2) Intsall Bodyparser:

npm install body-parser --save

3) Install Chai:

npm install chai --save

4) Install Chai-http:

npm install chai-http --save

5) Install ElasticSearch:

npm install elasticsearch --save

6) Install LineReader:

npm install line-reader --save

7) Install Mocha:

npm install -g mocha

#Installing ElasticSearch on Mac:

brew install elasticsearch

#Start Elasticsearch from console:

elasticsearch

Elasticsearch extracts details from the assignment_tweet(1).txt file from within the TweetSearch folder.

#Running task to populate indexes in elasticsearch:
node index_task.js

#Run the application:

- nodemon TweetSearch
- visit localhost: http://localhost:2000
Please make sure the index_task.js file is run before you run the application.

#Run mocha tests from terminal:

- mocha
