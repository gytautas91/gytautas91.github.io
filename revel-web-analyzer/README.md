<p align="center">
  <img width="250" src="/public/logo512.png">
</p>
<h1 align="center"> Web Analyzer </h1>

Web analyzer helps you to find unique tags, most commonly used tag, lognest path from root node to the descendent and longest path from root node with most commonly used tag within the path in HTML document.

## Installation

Run ```npm install && npm link``` or ```npm install``` if you are planning to use CLI

## Usage options

Once you have dependencies installed you use one of the options to start: 

1. ```npm start``` will build react application and serve it over local server on ```127.0.0.1:8080/```. 
> If there is a need to be custom about host or port, it's possible to change that in ```.env``` file.

2. CLI command ```analyze``` with url as argument. For exmaple ```analyze --url=https://revelsystems.com/```. This option works independently from server.

3. Start server by running ```npm start:server``` and use ```curl```, ```postman``` to request for results. For example ```curl 127.0.0.1:8080/analyze?url=https://revelsystems.com/```
