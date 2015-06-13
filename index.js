var _ = require('lodash');
/*Glossary*/
var glossary = require("glossary");

/*Sring*/
var S=require('string');

/*RETEXT POS*/
var Retext = require('retext');
var visit = require('retext-visit');
var inspect = require('retext-inspect');
var pos = require('retext-pos');

/*Stopwords*/
var stopwords=[]

/*path*/
var path = require('path')

var glossary = require("glossary");


var Words   = require('words.js');
var Types   = require('words.js').Types;
// to have the non-overloaded strings.js
var Strings = require('words.js').Strings;
var posJSON= require('./lib/pos.json')

var penny=require('penny-node');

var safeReadFile = require('safe-readfile')

function pos_tokenize (options){
	pos_tokenize.options=_.extend(
			{
				parse_currency: true,
				compound_bigrams:true,
				stop_language:null

			},options)

	//remove stopwords
	if(pos_tokenize.options.stop_language){
		var stopwords_file=path.join(__dirname,'lib','stopwords',pos_tokenize.options.stop_language+'.json');
		//safe read file, parse to JSON and always return an array (of values) or blank
		var data=safeReadFile.readFileSync(stopwords_file)||null;
		//buffer to string or JSON string '[]' for empty array
		data=(data)?data.toString():'[]';
		stopwords=JSON.parse(data) || [] ;
	}
}

pos_tokenize.tokenize =function(string){

	//start with blank tokens
	var tokens={},
		currency={};

	//format string
	//use the awesome String Module for extra formating...
	string=S(string).decodeHTMLEntities() //deal with html entities
				    .humanize() //decamelize, remove dashes & underscores
				    .collapseWhitespace() //remove any resulting whitespace				    
				    .trim() //trim string
				    .s;

	
	string=string
			.replace(/[^a-z0-9]$/ig, '') //PUNCTS AT THE END OF SENTENCE
			;

	

    //lets begin the hard work by parsing out any currencies in string
	if(this.options.parse_currency===true){		
		//start with false value
		currency.has_currency=false
		//Parse & replace currencies currencies
		var money=penny.parse(string);

		//edit string to replace values
		money.forEach(function(m){
			if(m.currency){
				//replace currency in string
				string=string.replace(m.text,m.number+' '+m.currency)
				//indicate that string has currency
				currency.has_currency=true;
				//initialize if none
				currency.amounts=currency.amounts || [];
				//store in amount array
				currency.amounts.push({
					amount:m.number,
					currency:m.currency
				})
			}		
		});
	}
	

	/*
		We need the ability to extract Compound words and for that purpose we use Glossary Module
	*/
	if(this.options.compound_bigrams===true){
		//extract glossary keywords
		var keywords = glossary.extract(string)

		keywords=_.filter(keywords,function(w){
			return _.indexOf(w,' ')>-1;
		});

		//For compound words, we must also evaluate them as bigrams just as well as we should avaluate them as single units
		keywords.forEach(function(str){
			keywords=_.union(keywords, pos_tokenize.bigrams(str) );
		});

		keywords.forEach(function(w){
			if(w.indexOf(' ')>-1){
				tokens['CO']=_.union(tokens['CO'] || [] ,[w]);
			}		
		});	
	}
	

	/*
		Now lets get the POS values for each word and add to our tokens
	*/
	var retext = new Retext()
	    .use(visit)
	    .use(inspect)
	    .use(pos);

		retext.parse(
		    string,
		    function (err, tree) {
		        tree.visit(tree.WORD_NODE, function (node) {
		            tokens[node.data.partOfSpeech]=
		            	_.union(tokens[node.data.partOfSpeech] || [] ,[node.toString()])
		        });
		    }
		);

	
	// console.log(stopwords);

	/*
		We should always return an array of all the words
	*/
	//parse string & pick words
	var words= new Words(string);

	//but lets filter out words with less than 3 chars
	//also filter out stopwords
	words.xs( function(word, index){

	  if( word.length >2 && (!stopwords.length || _.indexOf(stopwords,word.toLowerCase()) ==-1) ){
	  	return true;
	  }
	    
	});


	// console.log(keywords);
	return _.merge(
			{text:string},
			words,
			{pos:tokens},
			{currency:currency}
		);

}


pos_tokenize.bigrams=function (string){

	var words= new Words(string);

	words.xs( function(word, index){
	  if( word.length >2 )
	    return true;
	});
	

	words=_.reduce(words.words,function(p,b){
		p=_.isArray(p)?p:[p];

		a=_.last(p);
		a=(b.indexOf(' ')==-1)?[a+' '+b]:[];
		b=[b]

		return _.union(p,a,b);
	});


	return words;
}


module.exports=pos_tokenize;