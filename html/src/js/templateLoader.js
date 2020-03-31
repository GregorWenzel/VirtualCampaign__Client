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
                            alert("Error Loading Template" );
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
                            alert("Error Loading Template" );
                        });
                };
            };
        }
    };
})(jQuery, document);

var tplArr = [
    "tpl/pages.html.tpl"
/*
    "tpl/pages/page404.html.tpl" ,
    "tpl/pages/prod-list.html.tpl" ,
    "tpl/pages/motifs.html.tpl" ,
    "tpl/pages/prod-collection.html.tpl" ,
    "tpl/pages/statistics.html.tpl",
    "tpl/pages/production.html.tpl"
*/
];

