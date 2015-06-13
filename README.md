# POS-tokenizer

Sometimes you just need to run easy SQL commands. Sometimes you wanna batch them up and be sure execution will be smooth.



##Installation

Using npm:

```bash
$ npm install --save pos-tokenizer
```

In NodeJs/io.js

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
	
	});

This will output:

    {                                                                                                              
	    "text": "He paid 5000 USD to get a bayes algorithm done for him",                                          
	    "words": [                                                                                                 
	        "paid",                                                                                                
	        "5000",                                                                                                
	        "USD",                                                                                                 
	        "bayes",                                                                                               
	        "algorithm"                                                                                            
	    ],                                                                                                         
	    "pos": {                                                                                                   
	        "CO": [                                                                                                
	            "bayes algorithm"                                                                                  
	        ],                                                                                                     
	        "PRP": [                                                                                               
	            "He",                                                                                              
	            "him"                                                                                              
	        ],                                                                                                     
	        "VBN": [                                                                                               
	            "paid",                                                                                            
	            "done"                                                                                             
	        ],                                                                                                     
	        "CD": [                                                                                                
	            "5000"                                                                                             
	        ],                                                                                                     
	        "NN": [                                                                                                
	            "USD",                                                                                             
	            "algorithm"                                                                                        
	        ],                                                                                                     
	        "TO": [                                                                                                
	            "to"                                                                                               
	        ],                                                                                                     
	        "VB": [                                                                                                
	            "get"                                                                                              
	        ],                                                                                                     
	        "DT": [                                                                                                
	            "a"                                                                                                
	        ],                                                                                                     
	        "NNS": [                                                                                               
	            "bayes"                                                                                            
	        ],                                                                                                     
	        "IN": [                                                                                                
	            "for"                                                                                              
	        ]                                                                                                      
	    },                                                                                                         
	    "currency": {                                                                                              
	        "has_currency": true,                                                                                  
	        "amounts": [                                                                                           
	            {                                                                                                  
	                "amount": 5000,                                                                                
	                "currency": "USD"                                                                              
	            }                                                                                                  
	        ]                                                                                                      
	    }                                                                                                          
	}                                                                                                              
	                                                                                                               
	                                                                                                               
	{                                                                                                              
	    "text": "Pos tagging can greatly improve the results of naive bayes classifiers. i wrote this as proof of c
	oncept",                                                                                                       
	    "words": [                                                                                                 
	        "Pos",                                                                                                 
	        "tagging",                                                                                             
	        "greatly",                                                                                             
	        "improve",                                                                                             
	        "results",                                                                                             
	        "naive",                                                                                               
	        "bayes",                                                                                               
	        "classifiers.",                                                                                        
	        "wrote",                                                                                               
	        "proof",                                                                                               
	        "concept"                                                                                              
	    ],                                                                                                         
	    "pos": {                                                                                                   
	        "CO": [                                                                                                
	            "bayes classifiers"                                                                                
	        ],                                                                                                     
	        "NNS": [                                                                                               
	            "Pos",                                                                                             
	            "results",                                                                                         
	            "bayes"                                                                                            
	        ],                                                                                                     
	        "VBG": [                                                                                               
	            "tagging"                                                                                          
	        ],                                                                                                     
	        "MD": [                                                                                                
	            "can"                                                                                              
	        ],                                                                                                     
	        "RB": [                                                                                                
	            "greatly"                                                                                          
	        ],                                                                                                     
	        "VB": [                                                                                                
	            "improve"                                                                                          
	        ],                                                                                                     
	        "DT": [                                                                                                
	            "the",                                                                                             
	            "this"                                                                                             
	        ],                                                                                                     
	        "IN": [                                                                                                
	            "of",                                                                                              
	            "as"                                                                                               
	        ],                                                                                                     
	        "JJ": [                                                                                                
	            "naive"                                                                                            
	        ],                                                                                                     
	        "URL": [                                                                                               
	            "classifiers."                                                                                     
	        ],                                                                                                     
	        "NN": [                                                                                                
	            "i",                                                                                               
	            "proof",                                                                                           
	            "concept"                                                                                          
	        ],                                                                                                     
	        "VBD": [                                                                                               
	            "wrote"                                                                                            
	        ]                                                                                                      
	    },                                                                                                         
	    "currency": {                                                                                              
	        "has_currency": false                                                                                  
	    }                                                                                                          
	}                                                                                                              
                                                                                                               

