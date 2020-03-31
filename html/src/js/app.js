var langPathArr = [
    {lang_path:'loc/en.json',lang_name:'en_loc'},
    {lang_path:'loc/de.json',lang_name:'de_loc'},
    {lang_path:'loc/tr.json',lang_name:'tr_loc'}
];

$(function(){
    templateLoader.loadExtTemplate(tplArr,function(){
        console.log('----------- all tpls loaded ---------------');

        motifTemplate = kendo.template($("#motifTemplate").html());
        filmTemplate = kendo.template($("#filmTemplate").html());
        clipTemplate = kendo.template($("#clipTemplate").html());
        clipProdTemplate = kendo.template($("#clipProdTemplate").html());
        motifProdTemplate = kendo.template($("#motifProdTemplate").html());


        initLocalizationData(function(){
            layout.render($("#application"));
            router.start();
            localSelectInit();
            if ( $('#theme-select').length ){
                $('#theme-select').kendoDropDownList({
                    change: onThemingChange
                });
            };
            if ( $('#language-select').length ){
                $('#language-select').kendoDropDownList({
                    change: onLangChange
                });
            };
            $( "#page" ).on( "touchstart click", "#logout-btn", function( event ) {
                logOut();
                event.preventDefault();
            });
        });



        // logout

        //-------------- Theme select --------------

/*
        if ( $('#theme-select').length ) {
            $('#theme-select').data("kendoDropDownList").select( $('#theme-select option[value='+DEFAULT_THEME+']').index() );
        };
*/

        /*themeSelectInit();*/

        //--- lang select ---


/*
        if ( $('#language-select').length ) {
            $('#language-select').data("kendoDropDownList").select( $('#language-select option[value='+DEFAULT_LANG+']').index() );
        };
*/

    });

//--------------POPUP Functions --------------
    var win = $("#window").kendoWindow(kendoWindowParams);

    $('body').on('touchend click','.popup-close , .k-overlay',function(event){
        curPopupCloseFunc();
    });

});

function curPopupCloseFunc(callback) {
    var curPopup = $("[data-role=window]");
    curPopup.parent().removeClass(winClass);
    curPopup.kendoWindow("close");
    if (callback && typeof(callback) === "function") {
        callback();
    }
};

function popupCallFunc(e,callback) {
    if ( e.event.target.tagName == 'BUTTON' ) {
        var el = $(e.event.target);
    } else {
        var el = $(e.event.target).closest('button');
    };
    var $curPopup = $("#window");
    winClass = el[0].dataset.popupType;
    var tplName = el[0].dataset.popupContent;
    refreshCallBackFunc = '';
    refreshCallBackFunc = window[ el[0].dataset.refreshFunc ];
    //here we get function name that we will use to fill our window with data
    $curPopup.parent().addClass(winClass);
    var win = $curPopup.data("kendoWindow");
    win.setOptions({
        activate: function(){
            kendo.init($curPopup);
            if (typeof refreshCallBackFunc === "function") {
                refreshCallBackFunc();
            };
            localizeHtml($curPopup);
        }
    });
    win.bind('refresh',function(){
        win.center();
        win.open();
    });
    win.refresh({template: $('#'+tplName).html()});
    if (callback && typeof(callback) === "function") {
        callback();
    }
};

function shortPopupCallFunct(curWinClass,tplName,refreshFunc) {
    var $curPopup = $("#window");
    winClass = curWinClass;
    refreshCallBackFunc = refreshFunc;
    $curPopup.parent().addClass(winClass);
    var win = $curPopup.data("kendoWindow");
    win.setOptions({
        activate: function(){
            kendo.init($curPopup);
            if (typeof refreshCallBackFunc === "function") {
                refreshCallBackFunc();
            };
            localizeHtml($curPopup);
        }
    });
    win.bind('refresh',function(){
        win.center();
        win.open();
    });
    win.refresh({template: $('#'+tplName).html()});
};

/*\
 |*|
 |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 |*|  * docCookies.getItem(name)
 |*|  * docCookies.removeItem(name[, path[, domain]])
 |*|  * docCookies.hasItem(name)
 |*|  * docCookies.keys()
 |*|
 \*/

var docCookies = {
    getItem: function (sKey) {
        if (!sKey) { return null; }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
        if (!this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function (sKey) {
        if (!sKey) { return false; }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }
};

function onThemingChange() {
    var value;
    if ( $("#theme-select").length ) {
        value = $("#theme-select").val();
    } else {
        value = DEFAULT_THEME;
    };

    newThemeLink = 'css/kendo.'+value+'.min.css';
    $('#theme-link').attr('href',newThemeLink);
    $('body').attr('class','k-content theme-'+value);

    docCookies.removeItem('virtualcampaign_theming');
    docCookies.setItem('virtualcampaign_theming', value, new Date(2038, 1, 1), '/', window.location.host, null);
    /*console.log(value);*/
};

function onLangChange() {
    var value;
    if ( $("#language-select").length ) {
        value = $("#language-select").val();
    } else {
        value = DEFAULT_LANG;
    };
    /*console.log(value);*/
    currLang = langArr[value];
    localizeHtml($('#page'));

    defProductionParams.name = currLang["NEW_PRODUCTION"];
    currentProduction.set('prodObj',defProductionParams);

    docCookies.removeItem('virtualcampaign_lang');
    docCookies.setItem('virtualcampaign_lang', value, new Date(2038, 1, 1), '/', window.location.host, null);
};

function initLocalizationData(callback) {
    //lang_path,lang_name
    $.getJSON( langPathArr[0].lang_path, function( json ) {
    }).done(function( json ) {
        langArr[ langPathArr[0].lang_name ] = json;
        if ( Object.keys(langArr).length == langPathArr.length ) {
            if (callback && typeof(callback) === "function") {
                callback();
            };
        };
    }).fail(function( jqxhr, textStatus, error ) {
        console.log( "Request Failed: " + textStatus + ", " + error );
    });
    $.getJSON( langPathArr[1].lang_path, function( json ) {
    }).done(function( json ) {
        langArr[ langPathArr[1].lang_name ] = json;
        if ( Object.keys(langArr).length == langPathArr.length ) {
            if (callback && typeof(callback) === "function") {
                callback();
            };
        };
    }).fail(function( jqxhr, textStatus, error ) {
        console.log( "Request Failed: " + textStatus + ", " + error );
    });
    $.getJSON( langPathArr[2].lang_path, function( json ) {
    }).done(function( json ) {
        langArr[ langPathArr[2].lang_name ] = json;
        if ( Object.keys(langArr).length == langPathArr.length ) {
            if (callback && typeof(callback) === "function") {
                callback();
            };
        };
    }).fail(function( jqxhr, textStatus, error ) {
        console.log( "Request Failed: " + textStatus + ", " + error );
    });
/*
    for (var i=0;i<langPathArr.length;i++) {
        if ( i != (langPathArr.length - 1) ) {
            $.getJSON( langPathArr[i].lang_path, function( json ) {
            }).done(function( json ) {
                langArr[ langPathArr[i].lang_name ] = json;
            }).fail(function( jqxhr, textStatus, error ) {
                console.log( "Request Failed: " + textStatus + ", " + error );
            });
        } else {
            $.getJSON( langPathArr[i].lang_path, function( json ) {
            }).done(function( json ) {
                langArr[ langPathArr[i].lang_name ] = json;
                if (callback && typeof(callback) === "function") {
                    callback();
                };
            }).fail(function( jqxhr, textStatus, error ) {
                console.log( "Request Failed: " + textStatus + ", " + error );
            });
        };
    };
*/
};

function localizationFunc(callback) {
    langViewModel = new kendo.observable({
        lang: currLang
    });
    kendo.bind($('#loginPage'), langViewModel);

    currLang = langArr[DEFAULT_LANG];
    langViewModel.set('lang',currLang);

    if (callback && typeof(callback) === "function") {
        callback();
    };
};

function localizeHtml(parentTag){
    $(parentTag).find('.lang-replace').each(function(){
        if ( ($(this).data("lang") != '') && ($(this).data("lang") != undefined) ) {
            var langLabel = $(this).data('lang');
            $(this).html(currLang[langLabel]);
        };
        if ( ($(this).data("tooltip") != '') && ($(this).data("tooltip") != undefined) ) {
            var tooltipLabel = $(this).data('tooltip');
            $(this).attr('title',currLang[tooltipLabel]);
        };
        if ( ($(this).data("placeholder") != '') && ($(this).data("placeholder") != undefined) ) {
            var placeholderLabel = $(this).data('placeholder');
            $(this).attr('placeholder',currLang[placeholderLabel]);
        };
    });
};

function themeSelectInit() {
    if ( docCookies.hasItem('virtualcampaign_theming') ) {
        var selectVal = docCookies.getItem('virtualcampaign_theming');
        /*console.log(selectVal);*/
        if ( $('#theme-select').length ) {
            $('#theme-select').data("kendoDropDownList").select($('#theme-select option[value=' + selectVal + ']').index());
        };
        newThemeLink = 'css/kendo.'+selectVal+'.min.css';
        $('#theme-link').attr('href',newThemeLink);
        $('body').attr('class','k-content theme-'+selectVal);
    } else {
        docCookies.setItem('virtualcampaign_theming', DEFAULT_THEME, new Date(2038, 1, 1), '/', window.location.host, null);
        onThemingChange();
    };
};

function localSelectInit() {
    if ( docCookies.hasItem('virtualcampaign_lang') ) {
        var selectVal = docCookies.getItem('virtualcampaign_lang');
        if ( $('#language-select').length ) {
            $('#language-select').data("kendoDropDownList").select($('#language-select option[value=' + selectVal + ']').index());
        };
        currLang = langArr[selectVal];
        //localizeHtml($('#page'));
        /*langViewModel.set('lang',currLang);*/
    } else {
        docCookies.setItem('virtualcampaign_lang', DEFAULT_LANG, new Date(2038, 1, 1), '/', window.location.host, null);
        onLangChange();
    };
};

//administration chapter grids resize on viewport resize
$(window).resize(function(){
    $('.k-grid').each(function(){
        $(this).data('kendoGrid').resize()
    });
});