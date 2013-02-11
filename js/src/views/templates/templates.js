this["JST"] = this["JST"] || {};

this["JST"]["js/src/views/templates/result.template"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<article>\n\t<a href="#" class="row-fluid" data-bypass="true">\n\t\t<div class="span3 thumbnal">\n\t\t\t<img class="user-picture img-circle" src="'+
( profile_image_url )+
'" alt="@'+
( from_user )+
'" />\n\t\t</div>\n\t\t<header class="span9">\n\t\t\t<h1>@'+
( from_user )+
'</h1>\n\t\t\t<small class="muted">Tweeted <time>'+
( time_ago )+
'</time></small>\n\t\t</header>\n\t</a>\n</article>';
}
return __p;
};

this["JST"]["js/src/views/templates/results.template"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<nav class="well sidebar">\n\t<div class="wrapper">\n\t\t<ul class="nav nav-sidebar js-list">\n\t\t\t<li class="nav-header">Search Results</li>\n\t\t</ul>\n\t</div>\n\t<button class="btn hide js-loadMore" data-action="load-more"><i class="icon-chevron-down"></i>Load More Results</button>\n</nav>';
}
return __p;
};

this["JST"]["js/src/views/templates/search.template"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<form class="form-search">\n\t<fieldset>\n\t\t<input type="search" class="js-input input-large search-query" placeholder="Search for tweets…">\n\t\t<button type="submit" class="js-submit btn btn-primary">Search!</button>\n\t</fieldset>\n</form>';
}
return __p;
};

this["JST"]["js/src/views/templates/searches.template"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a class="btn dropdown-toggle btn-small" data-bypass="true" data-toggle="dropdown" href="#">\n\tView Past Searches\n\t<span class="caret"></span>\n</a>\n<ul class="dropdown-menu js-recentSearches" role="menu">\n</ul>';
}
return __p;
};

this["JST"]["js/src/views/templates/searchItem.template"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
 if (current) { 
;__p+='<li class="active">';
 } else { 
;__p+='<li>';
 } 
;__p+='\n\t<a href="/search/'+
( term )+
'" data-term="'+
( term )+
'" role="menuitem" tabindex="-1">\n\t\t'+
( term )+
'\n\t\t<br />\n\t\t<small class="muted">'+
( time_ago )+
'</small>\n\t</a>\n</li>';
}
return __p;
};

this["JST"]["js/src/views/templates/visualisation.template"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="alert alert-info js-message">\n</div>\n<div class="result-holder well">\n</div>';
}
return __p;
};

this["JST"]["js/src/views/templates/visualisationCounter.template"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
 number = limit - results.length 
;__p+='\n';
 if (number > 0) {
;__p+='\n\tChoose <span class="js-number badge badge-info">\n\t\t'+
( limit-results.length )+
'\n\t</span>\n\n\t';
 if (number === 1) { print('more search result') } else { print('search results') } 
;__p+=' and compare them!\n';
 } else { 
;__p+='\n\tNow your tweets fight to the death! Choose others to replace the fallen heroes!\'\n';
 } 
;__p+='';
}
return __p;
};