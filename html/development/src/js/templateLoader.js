var templateLoader = (function($,host){
//Loads external templates from path and injects in to page DOM
    return{
        loadExtTemplate: function(path,callback){
            var resultAll = '';
            var tplResult = '';
            for (i=0;i<path.length;i++) {
                if ( i != (path.length - 1) ) {
                    $.get(path[i])
                        .success(function(result){
                            resultAll += result;
                        })
                        .error(function(result){
                            alert("Error Loading Template - " + path[i] );
                        });
                } else {
                    $.get(path[i])
                        .success(function(result){
                            resultAll += result;
                            $("body").append(resultAll);
                            if (callback && typeof(callback) === "function") {
                                callback();
                            }
                        })
                        .error(function(result){
                            alert("Error Loading Template - " + path[i] );
                        });
                };
            };
        }
    };
})(jQuery, document);

var tplArr = [
    "tpl/page404.html.tpl" ,
    "tpl/prod-list.html.tpl" ,
    "tpl/motifs.html.tpl" ,
    "tpl/prod-collection.html.tpl" ,
    "tpl/statistics.html.tpl",
    "tpl/production.html.tpl"
];