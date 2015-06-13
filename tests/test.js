var pos_tokenize= require('../index.js');

//initialize with english stopwords 
var tokenize=new pos_tokenize({stop_language:'en'})

var texts=[
		'He paid $5000 to get a bayes algorithm done for him.',
		"POS Tagging can greatly improve the results of Naive Bayes classifiers. I wrote this as proof of concept!"
	]

texts.forEach(function(text){

	var tokens=pos_tokenize.tokenize(text);
	console.log("\n")
	console.log(JSON.stringify(tokens,0,4));

})
