(function(context,undefined){if(typeof module!=="undefined"){_=require("underscore");Backbone=require("backbone");async=require("async");WordModel=require("./WordModel.js")}else{}var WordCollection=Backbone.Collection.extend({model:WordModel,serviceMethod:{},logWordObj:new logWords,initialize:function(cb){},setServiceMethod:function(serviceMethod){this.serviceMethod=serviceMethod},count:function(cb){this.serviceMethod.count(function(num){cb(num)})},initDB:function(cb){var self=this;var data=localStorage.getItem("debugLog");if(!data){$.ajax({url:"https://raw.githubusercontent.com/webstatic/static/master/log/debug62.log",type:"GET"}).done(function(data){localStorage.setItem("debugLog",data);self.logWordObj.insertWordsRow(data,function(data){if(cb)cb()})})}else{self.logWordObj.insertWordsRow(data,function(){if(cb)cb()})}},searchStartWith:function(text,cb){var query={esearch:new RegExp("^"+text)}},searchStartWith_limit:function(text,limit,cb){this.ssw(text,limit,cb)},searchContain:function(text,cb){var query={esearch:new RegExp(text)}},searchContain_limit:function(text,limit,cb){var query={esearch:new RegExp(text)}},searchWhere:function(whereFn,cb){var query={$where:whereFn}},findWord:function(text,cb){this.serviceMethod.findWord(text,cb)},ssw:function(text,limit,cb){this.logWordObj.findWord(text,function(data){cb(data.docs,data.esearch)})}});if(typeof module!=="undefined"&&module.exports){module.exports=WordCollection}else{context.WordCollection=WordCollection}})(this);