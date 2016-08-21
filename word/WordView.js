var app=app||{models:{},collections:{},views:{}};(function($){"use strict";$(function(){app.views.WordView=Backbone.View.extend({el:"#main",seharchTimeOut:null,events:{},serchLog:{},currentSearchList:[],initialize:function(){var self=this;this.collection.on("add",this.addOne,this);this.collection.on("reset",this.render,this);var rotateHandle=null;var startRotate=function(){var angle=0;rotateHandle=setInterval(function(){angle+=30;$("#searchIcon").rotate(angle)},50)};var stopRotate=function(){clearInterval(rotateHandle);$("#searchIcon").rotate({animateTo:0})};$(document).on("swipeleft swiperight","[data-role='page']",function(e){if(e.type==="swipeleft"){$("#search-panel").panel("close")}else if(e.type==="swiperight"){$("#search-panel").panel("open");$("#search").focus();$("#search").select()}});$(document).keydown(function(e){if(e.ctrlKey){return}if(e.keyCode!=13){$("#search-panel").panel("open")}$("#search").focus()});$("#search").keydown(function(e){if(e.keyCode==13){var val=$(".searchWord").eq(0).text();var searchVal=$("#search").val().replace(/^\s+/,"");startRotate();if(searchVal!=val&&_.contains(self.currentSearchList,searchVal)){self.selectWord(searchVal,function(){stopRotate()});self.currentSearchList=_.sortBy(self.currentSearchList,function(word){var prefx=val==word?0:1;return prefx+word.tolocalelowercase()});self.addSearchWord(self.currentSearchList)}else{self.selectWord(val,function(){stopRotate()})}$("#search").select();var viewportWidth=$(window).width();if(viewportWidth<865){$("#search-panel").panel("close")}else{}}});var seharchTimeOut;$("#search").bind("keyup",function(e){if(e.keyCode!=13){var val=$("#search").val();clearTimeout(seharchTimeOut);{self.searchWord(val,function(searchWordArray,nowVal){self.currentSearchList=searchWordArray;self.addSearchWord(searchWordArray);var currentSeharch=$("#search").val();if(currentSeharch==nowVal){self.addSearchWord(searchWordArray)}else if(_.has(self.serchLog,currentSeharch)){self.addSearchWord(self.serchLog[self.currentSeharch])}})}}});$("#search-panel").on("panelopen",function(){if(!$("#search").is(":focus")){$("#search").trigger("focus");$("#search").select()}});$("#search-panel").on("click",".searchWord",function(){var $this=$(this);var val=$this.text();startRotate();self.selectWord(val,function(){stopRotate()});var viewportWidth=$(window).width();if(viewportWidth<865){$("#search-panel").panel("close")}});$("#seting").click(function(){if(window.require){require("nw.gui").Window.get().showDevTools()}return false});this.searchWordTemp=$("#searchWordTemp");this.searchWordTemp.remove();this.render()},render:function(){this.collection.each(this.addOne,this);return this},addOne:function(model){var eachModelView=new app.views.WordEachView({model:model});var eachModelEl=eachModelView.render().el;this.$el.prepend(eachModelEl)},searchWord:function(val,cb){var val=val.replace(/^\s+/,"");var self=this;try{if(val){self.collection.searchStartWith_limit(val,15,function(docs,esearch){var searchWordArray=_.pluck(docs,"esearch");if(cb)cb(searchWordArray,esearch)})}else{$("#search-panel").find(".searchWord").remove();if(cb)cb()}}catch(e){console.log(e)}},addSearchWord:function(searchWordArray){$("#search-panel").find(".searchWord").remove();for(var i in searchWordArray){var searchWordStr=searchWordArray[i];var searchWord=this.searchWordTemp.clone();searchWord.find("a").text(searchWordStr);searchWord.css("visibility","visible");$("#search-panel").find("ul").append(searchWord)}},selectWord:function(val,cb){var self=this;if(val){setTimeout(function(obj){mlabApiConn.insert("findwordlog","data",obj)},1e3,{esearch:val,ip:window.udl.ip,data:window.udl.data,type:window.udl.type,date:new Date});var wordDiv=$("#main").find('[data-word="'+val+'"]');if(wordDiv.length>0){$("#main").prepend(wordDiv);if(cb)cb()}else{self.collection.findWord(val,function(docs){if(_.isArray(docs)&&docs.length>0){_.each(docs,function(doc){self.collection.add(doc)})}else{self.collection.add(docs)}if(cb)cb(val,docs)})}}else{if(cb)cb()}},addWord:function(esearch,meaning){var wordDiv=tempWordDiv.clone();wordDiv.attr("data-word",esearch);wordDiv.find("h2").html(esearch);wordDiv.find("h2").append(' <span  style="color: rgb(215, 151, 0); font-size: 12px;"> ['+currentDict+"] </span>");wordDiv.find("div").html(meaning);wordDiv.css("visibility","visible");$("#main").prepend(wordDiv)}})})})(jQuery);