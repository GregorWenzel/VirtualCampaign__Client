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


/*
main variables and API functions
 */

var /*HOST_PATH = 'http://' + window.location.host,*/ 
    constFPS = 25, //we need this variable because api give us back video length in frames, so we need to calculate video duration
    /*DEFAULT_THEME = 'metroblack',*/
    DEFAULT_LANG = 'en_loc',
    langArr = [],
    currLang,
    langViewModel,
    cookieTheme = '',
    cookieLang = '',
    alphabetNumeration = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    refreshCallBackFunc,
    MAX_LOAD_IMG_WIDTH = 600,
    MAX_LOAD_IMG_HEIGHT = 600;

var MOTIF_CONTAINER_HEIGHT = 170;

// ------- widget parameters
var kendoWindowParams = {
    minHeight: 50,
    minWidth: 318,
    maxWidth: 600,
    title: false,
    visible: false,
    resizable: false,
    modal: true,
    content:'',
    close: function(e) {
    }
};

var responsivePanelParams = {
    breakpoint:1024,
    orientation: "left"
};

var defProductionParams = {
    id: 0,
    name: 'New production',
    crTime: 0,
    duration: 0,
    durTime: '00:00 min',
    clips: [],
    motifs: []
};

var currentProduction = new kendo.observable({
    prodObj: {
        id: 0,
        name: 'New production',
        crTime: 0,
        duration: 0,
        durTime: '00:00 min',
        clips: [],
        motifs: []
    }
});

var currentProdClipsDataSource,
    currentProdClipsListView;

var userAccount = new kendo.observable({
    loginStatus:0,
    id:0,
    groupId:0,
    firstName:'empty',
    surName:'empty',
    inProductionNum:0,
    inProduction:'',
    lastProdId:0,
    curProduction:''/*currentProduction.get('prodObj.name')*/,
    productsVal:0,
    motifsVal:0,
    indicatives:-1, //intro clip
    abdicatives:-1 //outro clip
});

var motifsContentTypeList = [];

var motifsDataSource,
    motifListView,
    motifSelectListView,
    motifsList = [],
    selectedMotifUid = [],
    selectedMotifId = [],
    uploadMotifObj,
    deleteMotifObj;

var filmsDataSource,
    filmsListView ,
    filmsList = [],
    selectedFilmUid = [],
    selectedFilmId = []/*,
    deleteFilmObj*/;

var clipsDataSource,
    clipsListView,
    ProductList = [],
    dicativeList = [],
    clipsLocArr = [],
    motifsTypeNamArr = [],
    selectedProductUid = [],
    selectedProductId = [];

//production vars
var selectedClipId,
    currClipsIds = [],
    currClipsList = [],
    curMotifsList = [],
    currClipMotifsList = [],
    selectedClipUid,
    selectedClipId,
    selectedClipMotifUid,
    selectedClipMotifId,
    currentProdMotifsDataSource,
    currentProdClipsDataSource;

var winClass = '';

function clearVariables() {
    motifsContentTypeList = [];
    motifsList = [];
    motifsDataSource.read();
    filmsList = [];
    filmsDataSource.read();
    ProductList = [];
    clipsDataSource.read();
    dicativeList = [];
    clipsLocArr = [];
    motifsTypeNamArr = [];
    currClipsIds = [];
    currClipsList = [];
    currentProdClipsDataSource.read();
    curMotifsList = [];
    currClipMotifsList = [];
    currentProdMotifsDataSource.read();
    currentProduction.set('prodObj',defProductionParams);

    userAccount.set('loginStatus',0);
    userAccount.set('id',0);
    userAccount.set('groupId',0);
    userAccount.set('firstName','empty');
    userAccount.set('surName','empty');
    userAccount.set('inProduction','');
    userAccount.set('curProduction','');
    userAccount.set('productsVal',0);
    userAccount.set('motifsVal',0);
    userAccount.set('indicatives',-1);
    userAccount.set('abdicatives',-1);

    ProductionsStatArr = [];
    ProductUsageStatArr = [];
};

//disable-enable buttons
function toggleBtnStatus(btns,status) {
    $(btns.selector).each(function(){
        $(this).data("kendoButton").enable(status);
    });
};

//function to count motifs number of all clips
function countClipMotifs(callback) {
    for (var i=0;i<motifsContentTypeList.length;i++) {
        for (var j=0;j<ProductList.length;j++) {
            if ( motifsContentTypeList[i].productID == ProductList[j].clipId ) {
                ProductList[j].motifsNum++;
                ProductList[j].motifNamesString += motifsContentTypeList[i].name + ' ';
                break;
            };
            ProductList[j].emptyMotifs = ProductList[j].motifsNum;
        };
    };
    clipsDataSource.read();
    if (callback && typeof(callback) === "function") {
        callback();
    };
};

/*
api
*/

// api keygen
var SALTED = 'vcampaign_niDZA704MvAgRyfLvIzr';
function urlGen (method) {
    var shaObj = new jsSHA(method , "TEXT");
    var hash = shaObj.getHash("SHA-1", "HEX");
    shaObj = new jsSHA(hash + SALTED, "TEXT");
    hash = shaObj.getHash("SHA-1", "HEX");
    return "/services/index_dev.php?pass=" + hash + "&call=" + method;
};

/*
we should wrap xml that we receiving from server into some tag (<xmltag>) , because its not clear xml and also consist php error info
 */

// login
/*$('#login-form').submit(function(event){*/
function loginFunc(){
    /*event.preventDefault();*/
    var loginData = $('#login-form').serializeArray();
    $.ajax({
        type: "POST",
        url: urlGen('login') ,
        cache: false,
        data: loginData,
        success: function (data) {
            /*console.log(data);*/
            var loginedUser = $.parseXML('<xmltag>'+data+'</xmltag>');
            $loginedUser = $(loginedUser);
            if ( $loginedUser.find('Result').text() == '0' ) {
                $('#login-form .error-msg').fadeIn(300).delay(5000).fadeOut(700);
                console.log('Wrong username or password');
                router.navigate('/login');
            } else if ( $loginedUser.find('Result').text() == '3' ) {
                console.log('Same user is already logged in');
                router.navigate('/login');
            } else if ( $loginedUser.find('Result').text() == '2' ) {

                userAccount.set("id", $loginedUser.find('ID').text() );
                userAccount.set("groupId", $loginedUser.find('AccountGroupID').text() );
                userAccount.set("firstName", $loginedUser.find('Name1').text() );
                userAccount.set("surName", $loginedUser.find('Name2').text() );
                userAccount.set("indicatives", $loginedUser.find('Indicative').text() );
                userAccount.set("abdicatives", $loginedUser.find('Abdicative').text() );

                defProductionParams.name = currLang["NEW_PRODUCTION"];
                currentProduction.set('name',currLang["NEW_PRODUCTION"]);

                /*console.log(userAccount);*/

                getMotifListByAccount();
                getFilmsByAccount();
                getProductListByAccount(function(){
                    getDicativesByAccount(function(){
                        /*console.log('Merged productList and dicativeList');
                        console.log('products num - ' + ProductList.length + ' ||| dicatives num - ' + dicativeList.length );*/
                        /*console.log(ProductList);*/
                        mergeProductsNDicatives( ProductList , dicativeList , function(){
                            getContentTypeListByAccount(function(){
                                countClipMotifs();
                                initSortingSelects();
                                if ( (userAccount.get('indicatives') != -1) || (userAccount.get('abdicatives') != -1) ) {
                                    productionManageFunc(function(){
                                        currClipMotifsList = [];
                                        populateProdMotifsArr(function(){
                                            checkEmptyMotifs();
                                            currentProdMotifsDataSource.read();
                                            currentProdClipsDataSource.read();
                                            recalcProductionTime();
                                        });
                                    });
                                };
                            });
                        });
                    });
                });

                userAccount.set('loginStatus',1);
                router.navigate('/hub');
                kendo.bind($("#hubPage"), userAccount);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('failed to connect');
            console.log( jqXHR );
            console.log( textStatus );
            console.log( errorThrown );
            $('#login-form .error').prepend('<p class="cur-error">failed to send login request - ' + textStatus + '</p>')
                .find('.cur-error').fadeIn(300).delay(5000).fadeOut(700,function(){
                $('#login-form .cur-error').remove();
            });
            router.navigate('/login');
        }
    });
};
/*$('#login-form input').focus(function(){
    $(this).closest('form').find('.error').fadeOut(300);
});*/


//get motif content type list of clips
function getContentTypeListByAccount(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('getContentTypeListByAccount') ,
        cache: false,
        data: {
            accountGroupID: +userAccount.get('groupId')
        },
        success: function (data) {
            var contentTypeData = $.parseXML('<xmltag>'+data+'</xmltag>');
            $contentTypeData = $(contentTypeData);
            motifsContentTypeList = [];
            $contentTypeData.find('ContentType').each(function(){
                var curContentType = {
                    id: $(this).find('ID').text(),
                    name: $(this).find('Name').text(),
                    aspect: $(this).find('Aspect').text(),
                    position: $(this).find('Position').text(),
                    productID: $(this).find('ProductID').text()
                };
                motifsContentTypeList.push(curContentType);
            });

            if (callback && typeof(callback) === "function") {
                callback();
            }

            /*console.log('--/motifs contentType/--');
            console.log(motifsContentTypeList);*/
            return motifsContentTypeList;
        },
        error: function (data) {
            console.log("can't get contentType list");
        }
    });
};

// get motifs-list and motif actions
function getMotifListByAccount(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('getMotifListByAccount') ,
        cache: false,
        data: {
            accountID: +userAccount.get('id'),
            min_date: 0
        },
        success: function (data) {
            var motifData = $.parseXML('<xmltag>'+data+'</xmltag>');
            $motifData = $(motifData);
            motifsList = [];
            var itemID = 0;
            $motifData.find('Motif').each(function(){
                var curMotif = {
                    id: itemID++,
                    motifId: +$(this).find('ID').text(),
                    accountId: +$(this).find('AccountID').text(),
                    name: $(this).find('Name').text(),
                    frameCount: +$(this).find('FrameCount').text(),
                    crTime: +$(this).find('CreationTime').text(),
                    date: dateFormating( parseInt($(this).find('CreationTime').text()) ),
                    description: $(this).find('Description').text()
                };
                motifsList.push(curMotif);
            });
            userAccount.set("motifsVal", motifsList.length );

            motifsDataSource.read();

            if (callback && typeof(callback) === "function") {
                callback();
            }

            /*console.log('--/motifs/--');
            console.log(motifsList);*/

            return motifsList;
        },
        error: function (data) {
            console.log("can't get motifs list");
        }
    });
};

//-------------------------------------------
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
};

function uploadMotifFunc(loadedMotif,callback) {

    $('#motif-upload-form img').hide().attr('src', '' );
    $('#saveMotifBtn').data("kendoButton").enable(false);
    $('#motif-upload-form .img-wr p').show();

    var motifUploadData = new FormData();
    motifUploadData.append( "accountID", +userAccount.get('id'));
    motifUploadData.append( "extension", loadedMotif.type);
    motifUploadData.append( "name", loadedMotif.name);
    motifUploadData.append( "image_film_flag", 'image');
    motifUploadData.append( "Filedata", loadedMotif);

    if ( $('#newMotifName').val() == '' ) {
        $('#newMotifName').val( loadedMotif.name );
    };

    $('#motif-upload-form .img-wr p').text('image is loading');

    $.ajax({
        type: "POST",
        url: urlGen('uploadMotif') ,
        cache: false,
        processData: false,
        contentType: false,
        data: motifUploadData,
        success: function (data) {
            console.log('--/motif upload/--');
            /*console.log(data);*/
            var uploadData = $.parseXML('<xmltag>'+data+'</xmltag>');
            $uploadData = $(uploadData);
            uploadMotifObj = {
                accountID: userAccount.get('id'),
                media_format_id:3 /*???*/,
                aspect: $uploadData.find('Aspect').text(),
                width: MAX_LOAD_IMG_WIDTH /*???*/,
                fileName: $uploadData.find('Name').text()+'.png',
                description: $('#descriptionValue').val(),
                frameCount: $uploadData.find('nFrames').text(),
                name: $('#newMotifName').val()
            };
            /*console.log(uploadMotifObj);*/
            $('#motif-upload-form img').attr('src', 'http://www.' + window.location.host + '/data/accounts/' + userAccount.get('id') + '/temp/' + uploadMotifObj.fileName ).show();
            $('#saveMotifBtn').data("kendoButton").enable(true);
            $('#motif-upload-form .img-wr p').hide();

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function saveMotifFunc(callback) {
    uploadMotifObj.name = $('#newMotifName').val();
    uploadMotifObj.description = $('#descriptionValue').val();

    $.ajax({
        type: "POST",
        url: urlGen('saveMotif') ,
        cache: false,
        data: uploadMotifObj,
        success: function (data) {
            console.log('--/save motif/--');
            getMotifListByAccount(function(){
                window.scrollTo(0,0);
            });

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function deleteMotifFunc(motifID,callback) {
    deleteMotifObj = {
        ownerID: +userAccount.get('id'),
        motifID: motifID,
        permanent:0
    };
    $.ajax({
        type: "POST",
        url: urlGen('deleteMotif') ,
        cache: false,
        data: deleteMotifObj,
        success: function (data) {
            console.log('--/delete motif/--');
            getMotifListByAccount();

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

//  get production films by account
//  ProductList
function getProductListByAccount(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('getShortProductListByAccount') ,
        cache: false,
        data: {
            accountGroupID: +userAccount.get('groupId')
        },
        success: function (data) {
            /*console.log('--/products/--');*/
            /*console.log(data);*/
            var productData = $.parseXML('<xmltag>'+data+'</xmltag>');
            $productData = $(productData);
            ProductList = [];
            var itemID = 0;
            $productData.find('Product').each(function(){
                var curProduct = {
                    id: itemID++,
                    clipId: $(this).find('ID').text(),
                    idString: to4DigitsSting( $(this).find('ID').text() ),
                    name: $(this).find('Name').text(),
                    location: $(this).find('Location').text(),
                    motifNamesString: '',
                    crTime: $(this).find('CreationTime').text(),
                    date: dateFormating( parseInt($(this).find('CreationTime').text()) ),
                    duration: $(this).find('Frames').text(),
                    durTime: timeFormating( parseInt($(this).find('Frames').text()) ),
                    motifsNum: 0,
                    emptyMotifs: 0, /*$(this).find('ContentFormat').length*/
                    locked: ''
                };
                ProductList.push(curProduct);
            });

            /*console.log(ProductList);*/

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function getDicativesByAccount(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('getDicativesByAccount') ,
        cache: false,
        data: {
            accountGroupID: +userAccount.get('groupId')
        },
        success: function (data) {
            /*console.log('--/dicatives/--');*/
            /*console.log(data);*/
            var dicativeData = $.parseXML('<xmltag>'+data+'</xmltag>');
            $dicativeData = $(dicativeData);
            dicativeList = [];
            var itemID = 0;
            $dicativeData.find('Product').each(function(){
                var curProduct = {
                    id: itemID++,
                    clipId: $(this).find('ID').text(),
                    idString: to4DigitsSting( $(this).find('ID').text() ),
                    name: $(this).find('Name').text(),
                    location: $(this).find('Location').text(),
                    motifNamesString: '',
                    crTime: $(this).find('CreationTime').text(),
                    date: dateFormating( parseInt($(this).find('CreationTime').text()) ),
                    duration: $(this).find('Frames').text(),
                    durTime: timeFormating( parseInt($(this).find('Frames').text()) ),
                    motifsNum: 0,
                    emptyMotifs: 0 /*$(this).find('ContentFormat').length*/
                };
                dicativeList.push(curProduct);
            });

            /*console.log(dicativeList);*/

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function mergeProductsNDicatives( baseArray , extArray , callback ) {
    var overlapFlag = false;
    var newArr = [];
    for (var i=0;i<extArray.length;i++) {
        for (var j=0;j<baseArray.length;j++) {
            if ( extArray[i].clipId == baseArray[j].clipId ) {
                overlapFlag = true;
                break;
            };
        };
        if ( overlapFlag == true ) {
            overlapFlag = false;
            continue;
        } else {
            newArr.push(extArray[i]);
        };
    };
    $.merge( baseArray, newArr )

    /*clipsDataSource.read();*/

    if (callback && typeof(callback) === "function") {
        callback();
    }
};


//  get films list and film actions
function getFilmsByAccount(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('getFilmsByAccount') ,
        cache: false,
        data: {
            accountID: +userAccount.get('id'),
            min_date: 0
        },
        success: function (data) {
            /*console.log('--/films/--');*/
            /*console.log(data);*/
            var filmData = $.parseXML('<xmltag>'+data+'</xmltag>');
            $filmData = $(filmData);
            filmsList = [];
            var itemID = 0;
            $filmData.find('Film').each(function(){
                var curFilm = {
                    id: itemID++,
                    filmId: +$(this).find('ID').text(),
                    accountId: $(this).find('Owner').text(),
                    jobId: $(this).find('jobID').text(),
                    name: $(this).find('Name').text(),
                    crTime: $(this).find('Date').text(),
                    crDate: dateFormating( parseInt($(this).find('Date').text()) ),
                    duration: $(this).find('Duration').text(),
                    durTime: timeFormating( parseInt($(this).find('Duration').text()) ),
                    videoFiles: codecFormatsToArray( $(this).find('codecFormats').text() , $(this).find('size').text() ),
                    /*path: $(this).find('Path').text(),*/
                    products: $(this).find('Products').text(),
                    motifs: $(this).find('Motifs').text()
                };
                filmsList.push(curFilm);
            });
            userAccount.set("productsVal", filmsList.length );

            /*console.log(filmsList);*/

            filmsDataSource.read();

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function deleteFilmFunc(FilmId,callback) {
    $.ajax({
        type: "POST",
        url: urlGen('deleteFilm') ,
        cache: false,
        data: {
            filmID: +FilmId ,
            permanent:0
        },
        success: function (data) {
            console.log('--/delete film/--');
            /*console.log(data);*/

            getFilmsByAccount(function(){});

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

//  api func for creaint new production - save and produce createSingleProduction
function createSingleProductionFunc(prodObj,callback) {
    $.ajax({
        type: "POST",
        url: urlGen('createSingleProduction') ,
        cache: false,
        data: prodObj,
        success: function (data) {
            console.log('--/create new production/--');
            /*console.log(data);*/
            var filmData = $.parseXML('<xmltag>'+data+'</xmltag>');
            $filmData = $(filmData);
            if ( $filmData.find('FilmID').length ) {
                userAccount.set('lastProdId',$filmData.find('FilmID').text());
            } else {
                console.log('production send failed');
            };

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function logOut() {
    $.ajax({
        type: "POST",
        url: urlGen('logout') ,
        cache: false,
        data: {
            accountID: userAccount.get("id")
        },
        success: function(data){
            console.log('--/logout/--');
            /*console.log(data);*/

            clearVariables();

            router.navigate('/logout');
        }
    });

};

function checkProductionStatus(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('checkProductionStatus') ,
        cache: false,
        data: {
            userID: +userAccount.get('id'),
            filmIDs: +userAccount.get('lastProdId')
        },
        success: function (data) {
            var filmData = $.parseXML('<xmltag>'+data+'</xmltag>');
            $filmData = $(filmData);
            if ( $filmData.find('Result').text() != 1 ) {
                setTimeout(checkProductionStatus(), 2000);
            } else {
                var inProdNum = userAccount.get('inProductionNum');
                userAccount.set('inProductionNum',--inProdNum);
                if ( inProdNum > 0 ) {
                    userAccount.set('inProduction', inProdNum + ' ' + currLang["inProduction"]);
                } else {
                    userAccount.set('inProduction','');
                };
                getFilmsByAccount(function(){
                    setTimeout(function(){
                        filmsDataSource.read();
                    },500);
                });
            };

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

//-------------- API END ---------------------


//-------------- DATA CONVERTING FUNCTIONS ----------------

// date convert func
function dateFormating(miliseconds){
    var d = new Date( miliseconds * 1000 );
    return d.toLocaleDateString() + ' - ' + to2DigitsSting(d.getHours()) + ':' + to2DigitsSting(d.getMinutes()) + 'h';
};

// film duradion convert func
function timeFormating( videoFramesNum ){
    if (videoFramesNum == 0)
    {
        return "00:00 min";
    }
    var totalSeconds = Math.floor( videoFramesNum/constFPS );
/*    var hours = Math.floor( totalSeconds/3600 );
    hours = to2DigitsSting(hours);*/
    var minutes = Math.floor( totalSeconds%3600/60 );
    minutes = to2DigitsSting(minutes);
    var seconds = Math.floor( totalSeconds%60 - 1 );
    seconds = to2DigitsSting(seconds);
    return minutes + ':' + seconds + ' min';
};
function timeFormatingFromClipsArr( framesArr ){
    if (framesArr.length == 0) {
        return "00:00 min";
    } else {
        var totalSeconds = 0;
        for (var i=0;i<framesArr.length;i++) {
            framesArr[i] = Math.floor(framesArr[i]/constFPS) - 1;
            totalSeconds += framesArr[i];
        };
    };
    var minutes = Math.floor( totalSeconds%3600/60 );
    minutes = to2DigitsSting(minutes);
    var seconds = Math.floor( totalSeconds%60 );
    seconds = to2DigitsSting(seconds);
    return minutes + ':' + seconds + 'min';
};

function to2DigitsSting(number) {
    number = '0' + number;
    return number.slice(-2);
};

function to4DigitsSting(number) {
    number = '000' + number;
    return number.slice(-4);
};

// video codecs and files size string convert to array func
function codecFormatsToArray(codecString,sizeString) {
    var codecArray = codecString.split('+');
    var sizeArray = sizeString.split('.');
    var itemSize;
    /*console.log(codecArray);*/
    for (var i=0;i<codecArray.length;i++) {
        codecArray[i] = codecArray[i].split(':');
        itemSize = parseInt(sizeArray[i]) / 1000000;
        codecArray[i][2] = itemSize.toFixed(2);
        codecArray[i][0] = codecArray[i][0].toLowerCase();
    };
    return codecArray;
};

function stringToArray(curString) {
    var resultArray = curString.split('.');
    for (var i=0;i<resultArray.length;i++) {
        resultArray[i] = resultArray[i].split(',');
    };
    return resultArray;
};
function prodStringToArray(curString) {
    var resultArray = curString.split(',');
    return resultArray;
};

function motifsArrayToString(curArray) {
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        var tmpStr = '';
        for (var j=0;j<curArray[i].length;j++) {
            if ( curArray[i][j] != '0' ) {
                tmpStr += curArray[i][j] + ',';
            } else {
                tmpStr += '-1,';
            };
        };
        if ( curArray[i].length == 0 ) {
            tmpStr += '-1,';
        };
        tmpStr = tmpStr.substr(0, tmpStr.length-1);
        resultString += tmpStr + '.';
    };
    resultString = resultString.substr(0, resultString.length-1);
    return resultString;
};

function codecFormatsToString(curArray) {
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        resultString += curArray[i] + '+';
    };
    resultString = resultString.substr(0, resultString.length-1);
    return resultString;
};

/* reserved???
 previewFrames (string): comma-separated zeroes for each clip (including indicative/abdicative)
 Example: “0,0,0,0”
*/
function previewFramesStringFunc(curArray){
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        resultString += '0,';
    };
    resultString = resultString.substr(0, resultString.length-1);
    return resultString;
};

//to calc whole production duration in PRODUCTION page
function clipsDurationTotalTime(curArray) {
    var framesSum = 0 ;
    for (var i=0;i<curArray.length;i++) {
        framesSum += curArray[i].duration
    };
    return timeFormating(framesSum);
};

// should calc three amounts of frames, for indicatives , all clips , abdicatives
function clipsDurationToString(curArray) {
    var tpmArr = [],
        indDur = 0,
        resultString = 0,
        abdDur = 0,
        startCount = 0,
        endCount = curArray.length;
    /*console.log('clipsDurrationToString data');*/
    if (userAccount.get('indicatives') != -1) { startCount++ };
    if (userAccount.get('abdicatives') != -1) { endCount-- };

    for (var i=0;i<curArray.length;i++) {
        for (var j=0;j<ProductList.length;j++) {
            if ( curArray[i] == ProductList[j].clipId ) {
                tpmArr[i] = +ProductList[j].duration;
                break;
            };
        };
    };
    for (var i=startCount;i<endCount;i++) {
        resultString += tpmArr[i];
    };
    if (userAccount.get('indicatives') != -1) { indDur = curArray[0]; };
    if (userAccount.get('abdicatives') != -1) { abdDur = curArray[endCount]; };
    resultString = indDur + '.' + resultString + '.' + abdDur;
/*    console.log(curArray);
    console.log('clipsDurrationToStringResult');
    console.log(resultString);*/
    return resultString;
};

function clipsArrayToString(curArray) {
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        resultString += curArray[i] + ',';
    };
    resultString = resultString.substr(0, resultString.length-1);
    /*console.log('clipsArrayToString');
    console.log(curArray);
    console.log(resultString);*/
    return resultString;
};

/* reserved ???
 productTypes (string): comma-separated zeroes for each clip (including indicative/abdicative)
 Example: “0,0,0,0”
 */
function productTypesFunc(curArray){
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        resultString += '0,';
    };
    resultString = resultString.substr(0, resultString.length-1);
    return resultString;
};

function motifFramesFunc(curArray){
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        var tmpStr = '';
        for (var j=0;j<curArray[i].length;j++) {
            for (var z=0;z<motifsList.length;z++) {
                if ( curArray[i][j] == motifsList[z].motifId ) {
                    tmpStr += motifsList[z].frameCount + ',';
                    break;
                };
            };
        };
        if ( curArray[i].length == 0 ) {
            tmpStr += '-1,';
        };
        tmpStr = tmpStr.substr(0, tmpStr.length-1);
        resultString += tmpStr + '.';
    };
    resultString = resultString.substr(0, resultString.length-1);
    return resultString;
};

function getProductionClipIds(){
    var resultArray = [];
    for (var i=0;i<currClipsList.length;i++) {
        resultArray[i] = currClipsList[i].clipId;
    }
    return resultArray;
};

function getProductionMotifIds(){
    /*console.log('getProductionMotifIds');
    console.log(curMotifsList);*/
    var resultArray = [];
    for (var i=0;i<curMotifsList.length;i++) {
        var tmpArr = [];
        for (var j = 0; j < curMotifsList[i].length; j++) {
            tmpArr[j] = curMotifsList[i][j].motifId;
        }
        resultArray[i] = tmpArr;
    }
    /*console.log(resultArray);*/
    return resultArray;
};

//-------------- END OF DATA CONVERTING FUNCTIONS ----------------


function saveProdPopupFunc() {

    $('#production-save-form #newProdNameInput').val( currentProduction.get('prodObj.name') );

/*
    $('#production-save-form').submit(function(e){

    });
*/
};

function applySaveProdFunc(){
    console.log('save PRODUCTION');

    currentProduction.set('prodObj.clips',getProductionClipIds());
    currentProduction.set('prodObj.motifs',getProductionMotifIds());
/*    console.log( currentProduction.get('prodObj.clips') );
    console.log( currentProduction.get('prodObj.motifs') );*/

    var newProdObj = {
        indicatives: +userAccount.get('indicatives'),
        abdicatives: +userAccount.get('abdicatives'),
        motifIDs: motifsArrayToString( currentProduction.get('prodObj.motifs') ),
        durationTime: 0,
        codecFormats: 'none',
        products: clipsArrayToString ( currentProduction.get('prodObj.clips') ) ,
        user: +userAccount.get('id'),
        jobName: $('#production-save-form #newProdNameInput').val(),
        template: 1
    };
    /*console.log(newProdObj);*/

    userAccount.set('curProduction',newProdObj.jobName);
    currentProduction.set('prodObj.name',newProdObj.jobName);

    createSingleProductionFunc(newProdObj,function(){
        getFilmsByAccount(function(){
            filmsDataSource.read();
            /*var renewVariable = filmsDataSource.data()[0].get('id');
             filmsDataSource.data()[0].set('id',renewVariable);*/
        });
    });

    var curPopup = $("[data-role=window]");
    curPopup.kendoWindow("close");
    curPopup.parent().removeClass(winClass);

    /*e.preventDefault();*/
};

var codecFormatsObj = kendo.observable({
    codecFormatsArr: [],
    jobNameField: currentProduction.get('prodObj.name'),
    userEmailField: ''
});

function produceProdPopupFunc() {
    console.log('produce prod popup');

    kendo.bind($("#produce-form"), codecFormatsObj);
    /*setTimeout(function(){
        kendo.bind($("#produce-form"), codecFormatsObj);
    },200);*/
};

function applyProduceProdFunc() {
    console.log('produce PRODUCTION');

    currentProduction.set('prodObj.clips',getProductionClipIds());
    currentProduction.set('prodObj.motifs',getProductionMotifIds());

    var newProdObj = {
        indicatives: +userAccount.get('indicatives'),
        abdicatives: +userAccount.get('abdicatives'),
        companyID: +userAccount.get('groupId'),
        motifFrames: motifFramesFunc( currentProduction.get('prodObj.motifs') ),
        durations: '',
        jobName: codecFormatsObj.get('jobNameField'),
        codecFormats: codecFormatsToString( codecFormatsObj.get('codecFormatsArr') ) ,
        previewFrames: previewFramesStringFunc( currentProduction.get('prodObj.clips') ) ,
        motifIDs: motifsArrayToString( currentProduction.get('prodObj.motifs') ),
        specialIntroMusic:0,
        durationTime: clipsDurationToString( currentProduction.get('prodObj.clips') ),
        status:0,
        template:0,
        user: +userAccount.get('id'),
        audioParam:'stroeer.wav',
        products: clipsArrayToString ( currentProduction.get('prodObj.clips') ) ,
        productTypes: productTypesFunc( currentProduction.get('prodObj.clips') ),
        email: codecFormatsObj.get('userEmailField')
    };

    userAccount.set('curProduction',newProdObj.jobName);
    currentProduction.set('prodObj.name',newProdObj.jobName);

/*    console.log('newProdObj');
    console.log(newProdObj);*/

    createSingleProductionFunc(newProdObj,function(){
        var inProdNum = userAccount.get('inProductionNum');
        userAccount.set('inProductionNum',++inProdNum);
        userAccount.set('inProduction',inProdNum + ' ' + currLang["inProduction"]);
        currentProduction.set('prodObj',newProdObj.jobName);
        checkProductionStatus();

        var curPopup = $("[data-role=window]");
        curPopup.kendoWindow("close");
        curPopup.parent().removeClass(winClass);
        $('#new-prod-dialog-btn').trigger('click');
    });

    /*e.preventDefault();*/
};

function logOutAfterProduce(){
    var curPopup = $("[data-role=window]");
    curPopup.kendoWindow("close");
    curPopup.parent().removeClass(winClass);
    logOut();
};

function goHubAfterProduce(){
    var curPopup = $("[data-role=window]");
    curPopup.kendoWindow("close");
    curPopup.parent().removeClass(winClass);
    router.navigate('/hub');
};


/* ------------------ STATISTIC ---------------------- */

var ProductionsStatArr = [],
    ProductUsageStatArr = [];

var statisticUser = new kendo.observable({
    userName:'',
    statStartDate: 0,
    statEndDate: 0,
    statStartDateString:'',
    statEndDateString:'',
    TimespanFilmCount:0,
    TimespanClipCount:0,
    TotalFilmCount:0,
    TotalClipCount:0
});

function initStatisticTime(callback) {
    var curTime = Math.floor( (new Date().getTime())/1000 );
    var strStartTime = new Date();
    var strEndTime = new Date();
    strStartTime.setTime( strEndTime.getTime() - 3600*24*30*1000 );
    strStartTime.setSeconds(1);
    strStartTime.setMinutes(0);
    strStartTime.setHours(0);
/*    console.log('strStartTime - ' + strStartTime.getTime());
    console.log('strEndTime - ' + strEndTime.getTime());*/

    statisticUser.set('userName', userAccount.get('firstName') + ' ' + userAccount.get('surName'));
    statisticUser.set('statEndDate',curTime);
    /*statisticUser.set('statStartDate', (curTime - 3600*24*30) );*/
    statisticUser.set('statStartDate', Math.floor( (strStartTime.getTime())/1000 ) );

    statisticUser.set('statStartDateString', strStartTime.toLocaleDateString() );
    statisticUser.set('statEndDateString', strEndTime.toLocaleDateString() );

/*    console.log( statisticUser.get('statStartDate') );
    console.log( statisticUser.get('statEndDate') );*/
    if (callback && typeof(callback) === "function") {
        callback();
    }
};

var ProductionsTableData,
    ProductionsTable,
    ProductionsChart,
    ProductionsView,
    ProductUsageTableData,
    ProductUsageTable,
    ProductUsageChart,
    ProductUsageView;

function initCharts() {
    ProductionsTableData = new google.visualization.DataTable();
    ProductionsTableData.addColumn('string', currLang["DROPDOWN_DATE"]);
    ProductionsTableData.addColumn('number', currLang["FCPD_FilmsHeader"]);
    ProductionsTableData.addColumn('number', currLang["FCPD_ClipsHeader"]);
    ProductionsTableData.addRows(ProductionsStatArr);

    ProductionsView = new google.visualization.DataView(ProductionsTableData);
    ProductionsView.setColumns([0, 1, 2]);

    ProductionsTable = new google.visualization.Table(document.getElementById('ProductionsTable'));
    ProductionsTable.draw(ProductionsTableData, {showRowNumber: false});

    var optionsProductionsChart = {
        width: $('#ProductionsChart').width()-16,
        height: 300,
        legend: { position: 'top', maxLines: 10 },
        bar: { groupWidth: '75%' },
        isStacked: true,
        chartArea: {
            width:'80%',
            height:'75%'
        }
    };
    ProductionsChart = new google.visualization.ColumnChart(document.getElementById('ProductionsChart'));
    ProductionsChart.draw(ProductionsTableData, optionsProductionsChart);

    google.visualization.events.addListener(ProductionsTable, 'sort',
        function(event) {
            ProductionsTableData.sort([{column: event.column, desc: !event.ascending}]);
            ProductionsChart.draw(ProductionsView,optionsProductionsChart);
        });

    //--

    ProductUsageTableData = new google.visualization.DataTable();
    ProductUsageTableData.addColumn('string', currLang["DROPDOWN_NAME"] );
    ProductUsageTableData.addColumn('number', currLang["count"] );
    ProductUsageTableData.addRows(ProductUsageStatArr);

    ProductUsageView = new google.visualization.DataView(ProductUsageTableData);
    ProductUsageView.setColumns([0, 1]);

    ProductUsageTable = new google.visualization.Table(document.getElementById('ProductUsageTable'));
    ProductUsageTable.draw(ProductUsageTableData, {showRowNumber: false});

    var optionsProductUsageChart = {
        'width': $('#ProductUsageChart').width(),
        'height':300,
        chartArea: {
            width:'90%',
            height:'90%'
        }
    };
    ProductUsageChart = new google.visualization.PieChart(document.getElementById('ProductUsageChart'));
    ProductUsageChart.draw(ProductUsageTableData, optionsProductUsageChart);

    google.visualization.events.addListener(ProductUsageTable, 'sort', function(event) {
        ProductUsageTableData.sort([{column: event.column, desc: !event.ascending}]);
        ProductUsageChart.draw(ProductUsageView,optionsProductUsageChart);
    });
};

function getStatisticsFunc(callback){
    $.ajax({
        type: "POST",
        url: urlGen('getStatistics') ,
        data: {
            StartDate: +statisticUser.get('statStartDate'),
            EndDate: +statisticUser.get('statEndDate'),
            AccountID: +userAccount.get('id')
        },
        success: function (data) {
            console.log('--/statistic/--');
            var statisticData = $.parseXML('<xmltag>'+data+'</xmltag>');
            /*console.log(statisticData);*/
            $statisticData = $(statisticData);

            var tmpFilmCount = 0,
                tmpClipCount = 0;
            ProductionsStatArr = [];
            ProductUsageStatArr = [];

            $statisticData.find('AssetCount').each(function(){
                var AssetCount = [
                    {v: $(this).find('Timestamp').text() ,f: $(this).find('Date').text()},
                    {v: +$(this).find('FilmCount').text() ,f: $(this).find('FilmCount').text()},
                    {v: +$(this).find('ClipCount').text() ,f: $(this).find('ClipCount').text()}
                ];
                ProductionsStatArr.push(AssetCount);
                tmpFilmCount += parseInt($(this).find('FilmCount').text());
                tmpClipCount += parseInt($(this).find('ClipCount').text());
            });
            $statisticData.find('ProductUsage').each(function(){
                var ProductUsage = [
                    $(this).find('Name').text(),
                    {v:+$(this).find('Count').text() ,f:$(this).find('Count').text()}
                ];
                ProductUsageStatArr.push(ProductUsage);
            });
            statisticUser.set('TotalFilmCount',$statisticData.find('TotalFilmCount').text());
            statisticUser.set('TotalClipCount',$statisticData.find('TotalClipCount').text());
            statisticUser.set('TimespanFilmCount',tmpFilmCount);
            statisticUser.set('TimespanClipCount',tmpClipCount);

            if (callback && typeof(callback) === "function") {
                callback();
            }

/*            console.log(ProductionsStatArr);
            console.log(ProductUsageStatArr);*/
        },
        error: function (data) {
            console.log("can't get statistic");
        }
    });
};

// select date functions
function initDatepickers() {
    var start = $("#startDate").data("kendoDatePicker");
    var end = $("#endDate").data("kendoDatePicker");

    start.max(end.value());
    end.min(start.value());
};

function startDateChange() {
    var start = $("#startDate").data("kendoDatePicker"),
        end = $("#endDate").data("kendoDatePicker"),
        startDate = start.value(),
        endDate = end.value();

    if (startDate) {
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate());
        end.min(startDate);
    } else if (endDate) {
        start.max(new Date(endDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}

function endDateChange() {
    var start = $("#startDate").data("kendoDatePicker"),
        end = $("#endDate").data("kendoDatePicker"),
        startDate = start.value(),
        endDate = end.value();

    if (endDate) {
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate());
        start.max(endDate);
    } else if (startDate) {
        end.min(new Date(startDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}

function setToday(){
    var startDate = new Date();
    var endDate = new Date();
    startDate.setSeconds(1);
    startDate.setMinutes(0);
    startDate.setHours(0);
    var startDatepicker = $("#startDate").data("kendoDatePicker"),
        endDatepicker = $("#endDate").data("kendoDatePicker");
    startDatepicker.max(new Date(2100, 0, 1));
    endDatepicker.min(new Date(1999, 0, 1));
    startDatepicker.value(startDate);
    endDatepicker.value(endDate);
    statisticUser.set('statStartDateString', startDate.toLocaleDateString() );
    statisticUser.set('statEndDateString', endDate.toLocaleDateString() );
};
function setThisMonth(){
    var startDate = new Date();
    var endDate = new Date();
    startDate.setSeconds(1);
    startDate.setMinutes(0);
    startDate.setHours(0);
    startDate.setDate(1);
    var startDatepicker = $("#startDate").data("kendoDatePicker"),
        endDatepicker = $("#endDate").data("kendoDatePicker");
    startDatepicker.max(new Date(2100, 0, 1));
    endDatepicker.min(new Date(1999, 0, 1));
    startDatepicker.value(startDate);
    endDatepicker.value(endDate);
    statisticUser.set('statStartDateString', startDate.toLocaleDateString() );
    statisticUser.set('statEndDateString', endDate.toLocaleDateString() );
};
function setLastMonth(){
    var startDate = new Date();
    var endDate = new Date();
    startDate.setSeconds(1);
    startDate.setMinutes(0);
    startDate.setHours(0);
    startDate.setDate(1);
    startDate.setMonth( endDate.getMonth() - 1 );
    endDate.setSeconds(59);
    endDate.setMinutes(59);
    endDate.setHours(23);
    endDate.setDate(0);
    var startDatepicker = $("#startDate").data("kendoDatePicker"),
        endDatepicker = $("#endDate").data("kendoDatePicker");
    startDatepicker.max(new Date(2100, 0, 1));
    endDatepicker.min(new Date(1999, 0, 1));
    startDatepicker.value(startDate);
    endDatepicker.value(endDate);
    statisticUser.set('statStartDateString', startDate.toLocaleDateString() );
    statisticUser.set('statEndDateString', endDate.toLocaleDateString() );
};
function setThisYear(){
    var startDate = new Date();
    var endDate = new Date();
    startDate.setSeconds(1);
    startDate.setMinutes(0);
    startDate.setHours(0);
    startDate.setDate(1);
    startDate.setMonth(0);
    var startDatepicker = $("#startDate").data("kendoDatePicker"),
        endDatepicker = $("#endDate").data("kendoDatePicker");
    startDatepicker.max(new Date(2100, 0, 1));
    endDatepicker.min(new Date(1999, 0, 1));
    startDatepicker.value(startDate);
    endDatepicker.value(endDate);
    statisticUser.set('statStartDateString', startDate.toLocaleDateString() );
    statisticUser.set('statEndDateString', endDate.toLocaleDateString() );
};
function setLastYear(){
    var startDate = new Date();
    var endDate = new Date();
    startDate.setSeconds(1);
    startDate.setMinutes(0);
    startDate.setHours(0);
    startDate.setDate(1);
    startDate.setMonth(0);
    startDate.setFullYear( endDate.getFullYear() - 1 );
    endDate.setSeconds(59);
    endDate.setMinutes(59);
    endDate.setHours(23);
    endDate.setDate(1);
    endDate.setMonth(0);
    var startDatepicker = $("#startDate").data("kendoDatePicker"),
        endDatepicker = $("#endDate").data("kendoDatePicker");
    startDatepicker.max(new Date(2100, 0, 1));
    endDatepicker.min(new Date(1999, 0, 1));
    startDatepicker.value(startDate);
    endDatepicker.value(endDate);
    statisticUser.set('statStartDateString', startDate.toLocaleDateString() );
    statisticUser.set('statEndDateString', endDate.toLocaleDateString() );
};

function setTimespan() {
    var start = $("#startDate").data("kendoDatePicker"),
        end = $("#endDate").data("kendoDatePicker"),
        startDate = start.value(),
        endDate = end.value();
    if ( startDate && endDate ) {
/*        console.log('startDate - ' + startDate);
        console.log(startDate);
        console.log('endDate - ' + endDate);*/

        startDate = new Date(startDate);
        /*console.log(12123);*/
        statisticUser.set('statStartDateString', startDate.toLocaleDateString() );
        startDate = Math.floor( startDate.getTime()/1000 );
        /*console.log('startDate - ' + startDate);*/
        endDate = new Date(endDate);
        statisticUser.set('statEndDateString', endDate.toLocaleDateString() );
        endDate = Math.floor( endDate.getTime()/1000 ) + 86399;
        /*console.log('endDate - ' + endDate);*/

        statisticUser.set('statStartDate',startDate);
        statisticUser.set('statEndDate',endDate);

        getStatisticsFunc(function(){
            initCharts();
            var curPopup = $("[data-role=window]");
            curPopup.kendoWindow("close");
            curPopup.parent().removeClass(winClass);
        });
    } else {
        alert('Enter both values');
    };
};

// --- export statistics functions
var prodCrTimeArr = [];

function exportStatistics() {
    var csvContent = "";
    var curDate = new Date();
    var startDate = new Date( statisticUser.get('statStartDate') * 1000 );
    var endDate = new Date( statisticUser.get('statEndDate') * 1000 );

    crStatProdictionsIdArr( statisticUser.get('statStartDate') , statisticUser.get('statEndDate') );

    //date
    csvContent += 'Report date:;';
    csvContent += curDate.toLocaleDateString() + ' - ' + curDate.toLocaleTimeString() + ';';
    csvContent += 'Date Range:' + startDate.toLocaleDateString() + ' - ' + startDate.toLocaleTimeString() + ' to ' + endDate.toLocaleDateString() + ' - ' + endDate.toLocaleTimeString() + ';\n\n';
    //total
    csvContent += 'Total Films;Total Clips;\n' + statisticUser.get('TotalFilmCount') + ';' + statisticUser.get('TotalClipCount') + ';\n';
    //timespan total
    csvContent += 'Films in date range;Clips in date range;\n' + statisticUser.get('TimespanFilmCount') + ';' + statisticUser.get('TimespanClipCount') + ';\n';
    //production title
    csvContent += 'Production Date;Production Name;Account Name;Clip Counter;Clip Name;Motif Counter;Motif Type;Motif Name;\n';
    //productions
    for (var i=0;i<prodCrTimeArr.length;i++) {
        var curProdItem = {},
            resultString = '';
        for (var j=0;j<filmsList.length;j++) {
            if (prodCrTimeArr[i] == filmsList[j].crTime) {
                var curProdItem = $.extend(true,{},filmsList[j]);
                resultString = genProductionCsv();
                break;
            };
        };
        csvContent += resultString;
    };
    //product title
    csvContent += '\nProduct;nClipS;\n';
    //product line
    for (var i=0;i<ProductUsageStatArr.length;i++) {
        csvContent += ProductUsageStatArr[i][0] + ';' + ProductUsageStatArr[i][1].v + ';\n';
    };

    var encodedUri = encodeURIComponent(csvContent);
    var $link = $("#dataLink");
    $link.attr("href", 'data:Application/octet-stream,' + encodedUri);
    $link.attr("download", "joblog_" + userAccount.get('id') + ".csv");
    $link[0].click();

    function genProductionCsv() {
        var resultString = '',
            clipsArr = [],
            motifsArr = [];
        clipsArr = prodStringToArray(curProdItem.products).slice();
        motifsArr = stringToArray(curProdItem.motifs).slice();
        /*console.log(clipsArr);
        console.log(motifsArr);*/

        resultString += curProdItem.crDate + ';' + curProdItem.name + ';' + userAccount.get('surName') + ';\n';
        for (var i=0;i<clipsArr.length;i++) {
            resultString += ";;;" + (i+1) + ';'
            for (var j=0;j<ProductList.length;j++) {
                if (clipsArr[i] == ProductList[j].clipId) {
                    resultString += ProductList[j].name + ';\n';
                    break;
                };
                if (j==ProductList.length-1) {
                    resultString += clipsArr[i] + ' was deleted' + ';\n';
                };
            };
            for (var j=0;j<motifsArr[i].length;j++) {
                if ( motifsArr[i][j] == -1 ) {
                    resultString += ';;;;;Indicativ;' + '\n'
                    break;
                };
                resultString += ";;;;;" + (j+1) + ';'
                for(var z=0;z<motifsContentTypeList.length;z++){
                    if ( ( clipsArr[i] == motifsContentTypeList[z].productID ) && ( (j+1) == motifsContentTypeList[z].position ) ) {
                        resultString += motifsContentTypeList[z].name + ';'
                        break;
                    }
                };
                for(var z=0;z<motifsList.length;z++){
                    if( motifsArr[i][j] == motifsList[z].motifId ){
                        resultString += motifsList[z].name + ';\n'
                        break;
                    };
                    if (z==motifsList.length-1) {
                        resultString += motifsArr[i][j] + ' was deleted' + ';\n';
                    };
                };
            };
        };

        return resultString;
    };
};

function crStatProdictionsIdArr(startTime,endTime) {
    prodCrTimeArr = [];
    var startPos = 0,
        endPos = 0;
    for (var j=0;j<filmsList.length;j++) {
        if ( filmsList[j].duration > 0 ) {
            prodCrTimeArr.push(+filmsList[j].crTime);
        };
    };

    prodCrTimeArr.sort();
    for (var j=0;j<prodCrTimeArr.length;j++) {
        if ( startTime > prodCrTimeArr[j] ) { ++startPos; };
        if ( endTime >= prodCrTimeArr[j] ) { ++endPos; };
    };

    prodCrTimeArr.splice(endPos,prodCrTimeArr.length);
    prodCrTimeArr.splice(0,startPos);
};

// selects init
var clipsFilterModel;
var motifFilterModel;
var filmFilterModel;

function initSortingSelects() {
    clipsLocArr = [];
    var locArr = [];
    for (var i=0;i<ProductList.length;i++) {
        locArr.push( ProductList[i].location );
    };

    clipsLocArr.push('All');
    for (var i=0;i<locArr.length;i++) {
        var counter = 0;
        for (var j=0;j<clipsLocArr.length;j++) {
            if ( locArr[i] == clipsLocArr[j] ) {
                break;
            } else {
                counter++;
            };
        };
        if ( counter == clipsLocArr.length ) {
            clipsLocArr.push(locArr[i]);
        };
    };

    motifsTypeNamArr = [];
    var nameArr = [];
    for (var i=0;i<motifsContentTypeList.length;i++) {
        nameArr.push( motifsContentTypeList[i].name );
    };

    motifsTypeNamArr.push('All');
    for (var i=0;i<nameArr.length;i++) {
        var counter = 0;
        for (var j=0;j<motifsTypeNamArr.length;j++) {
            if ( nameArr[i] == motifsTypeNamArr[j] ) {
                break;
            } else {
                counter++;
            };
        };
        if ( counter == motifsTypeNamArr.length ) {
            motifsTypeNamArr.push(nameArr[i]);
        };
    };

    var clipsSortingField = [
        {text:currLang["DROPDOWN_DEFAULT"],value:"id"},
        {text:currLang["DROPDOWN_NAME"],value:"name"}
    ];

    clipsFilterModel = kendo.observable({
        locationArr: clipsLocArr,
        motifNamesArr: motifsTypeNamArr,
        sortSelect: clipsSortingField
    });

    var sortingFields = [
        {text:currLang["DROPDOWN_DATE"],value:"crTime"},
        {text:currLang["DROPDOWN_NAME"],value:"name"}
    ];
    motifFilterModel = kendo.observable({
        selectFields: sortingFields
    });
    filmFilterModel = kendo.observable({
        selectFields: sortingFields
    });
};


/*
{
    "readyState":0,
    "responseText":"",
    "status":0,
    "statusText":"error"
}
*/

var filmsBtnsToDisable = $('#deleteFilm , #downloadFilm , #loadFilm'),
    productionBtnsToDisable = $('#deleteClipButton , #replaceClipButton' , '#deleteClipButton2 , #replaceClipButton2'),
    productionProduceBtn = $('#produceProdBtn , #produceProdBtn2'),
    deleteMotifBtn = $('#delete-motif-btn , #delete-motif-btn2'),
    applyMotifBtn = $('#applyMotifBtn , #applyMotifBtn2'),
    applyClipBtn = $('#applyClipBtn , #applyClipBtn2');

var prevSearchVal = '',
    searchVal = '';

var page404 = new kendo.View("#page404",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
    },
    hide: function(e){}
});

var loginPage = new kendo.View("#login",{
    init: function(e){
        themeSelectInit();
        localSelectInit();
    },
    show: function(e) {
        if ( currLang != undefined ) {
            localizeHtml($('#page'));
        };
    }
});

var hubPage = new kendo.View("#hub",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
    }
});

var logoutPage = new kendo.View("#logout",{
    show: function(e){
        localizeHtml($('#page'));
    }
});

var motifsPage = new kendo.View("#motifs",{
    init: function(e){
        $('.panel-menu').kendoResponsivePanel(responsivePanelParams);
    },
    show: function(e) {
        $('.panel-menu').data("kendoResponsivePanel").close();
        localizeHtml($('#page'));

        var motifListViewObj = $('#motifs-list').data("kendoListView");
        motifListViewObj.clearSelection();
        motifListViewObj.setOptions({selectable: 'multiple'});

        kendo.bind($("#motifs-filter"), motifFilterModel);
        initMotifSearch();
        toggleBtnStatus(deleteMotifBtn,false);
        toggleBtnStatus(applyMotifBtn,false);
    }
});

var motifsSelectPage = new kendo.View("#motifs",{
    init: function(e){
        $('.panel-menu').kendoResponsivePanel(responsivePanelParams);
    },
    show: function(e) {
        $('.panel-menu').data("kendoResponsivePanel").close();
        localizeHtml($('#page'));
        $('.hide-block').addClass('visible');
        $('.show-block').addClass('hidden');

        var motifListViewObj = $('#motifs-list').data("kendoListView");
        motifListViewObj.clearSelection();
        motifListViewObj.setOptions({selectable: 'true'});

        kendo.bind($("#motifs-filter"), motifFilterModel);
        initMotifSearch();
        toggleBtnStatus(deleteMotifBtn,false);
        toggleBtnStatus(applyMotifBtn,false);
    },
    hide: function(e) {
        bindEnterFunc($('#applyMotifBtn'),false);
        $('.hide-block').remove('visible');
        $('.show-block').remove('hidden');
    }
});

var prodListPage = new kendo.View("#prod-list",{
    init: function(e){
        $('.panel-menu').kendoResponsivePanel(responsivePanelParams);
    },
    show: function(e){
        $('.panel-menu').data("kendoResponsivePanel").close();

        localizeHtml($('#page'));
        initFilmsSearch();
        kendo.bind($("#films-filter"), filmFilterModel);
        $(".html5lightbox-link").html5lightbox();
        toggleBtnStatus(filmsBtnsToDisable,false);
        $('#films-list').data("kendoListView").clearSelection();
    },
    hide: function(e){}
});

var prodColPage = new kendo.View("#prod-collection",{
    init: function(e){
        $('.panel-menu').kendoResponsivePanel(responsivePanelParams);
    },
    show: function(e) {
        $('.panel-menu').data("kendoResponsivePanel").close();

        localizeHtml($('#page'));
        $(".html5lightbox-link").html5lightbox();

        $('#clips-list').data("kendoListView").clearSelection();
        kendo.bind($("#clips-filter"), clipsFilterModel);
        initClipsSearch();
        toggleBtnStatus(applyClipBtn,false);
    },
    hide: function(e) {
        bindEnterFunc($('#applyClipBtn'),false);
    }
});

var productionPage = new kendo.View("#production",{
    init: function(e){
        $('.panel-menu').kendoResponsivePanel(responsivePanelParams);
        kendo.bind($("#productionPage"), currentProduction);
    },
    show: function(e) {
        $('.panel-menu').data("kendoResponsivePanel").close();

        localizeHtml($('#page'));
        $(".html5lightbox-link").html5lightbox();
        toggleBtnStatus(productionBtnsToDisable,false);

        initProductionDragNDrop();
    },
    hide: function(e) {
        bindDeleteFunc($('#deleteClipButton'),false);
    }
});

var statisticsPage = new kendo.View("#statistics",{
    init: function(e){
        $('.panel-menu').kendoResponsivePanel(responsivePanelParams);
    },
    show: function(e) {
        $('.panel-menu').data("kendoResponsivePanel").close();

        localizeHtml($('#page'));
        kendo.bind($("#statistic-page"), statisticUser);
        initStatisticTime(function(){
            getStatisticsFunc(function(){
                initCharts();
            });
        });
    },
    hide: function(e){}
});

var layout = new kendo.Layout("<div id='page'></div>");

//---------------------------------------

var motifTemplate = '',
    filmTemplate = '',
    clipTemplate = '',
    motifProdTemplate = '',
    clipProdTemplate = '';

//--------------LOGIN---------------

function loginCheckFunc() {
    if ( ($('#login-form #username').val().length > 0) && ($('#login-form #password').val().length > 0) ) {
        loginFunc();
    } else {
        $('#login-form .error-empty-msg').fadeIn(300).delay(5000).fadeOut(700);
    };
};

//----------------------------MOTIFS----------------

motifsDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(motifsList);
        },
        create: function(e) {
            e.data.id = motifsList.length;
            motifsList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            /*motifsList[getIndexById(e.data.id)] = e.data;*/
            motifsList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            /*motifsList.splice(getIndexById(e.data.id), 1);*/
            motifsList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "crTime", dir: "desc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                motifId: { type: "number" },
                accountId: { type: "number" },
                name: { type: "string" },
                frameCount: { type: "number" },
                crTime: { type: "number" },
                date: { type: "string" },
                description: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load motifs array', e.status);
    }
});

function onSelectFilterMotifs(e) {
    var dataItem = this.dataItem(e.item);
    var sortingDirection = 'asc';
    if ( dataItem.value == 'crTime' ) {
        sortingDirection = 'desc';
    };
    /*console.log(dataItem);crTime*/
    motifsDataSource.query({
        sort: [
            {field: dataItem.value, dir: sortingDirection}
        ]
    });
    bindEnterFunc($('#applyMotifBtn'),false);
    toggleBtnStatus(deleteMotifBtn,false);
    toggleBtnStatus(applyMotifBtn,false);
};

function motifListViewChangeFunc() {
    toggleBtnStatus(deleteMotifBtn,true);
    toggleBtnStatus(applyMotifBtn,true);

    var data = this.dataSource.view();
    selectedMotifUid = $.map(this.select(), function(item) {
        return data[$(item).index()].uid;
    });
    selectedMotifId = $.map(this.select(), function(item) {
        return data[$(item).index()].motifId;
    });

    if ( $('#applyMotifBtn').parent('.visible').length ) {
        if ( this.select().length > 0 ) {
            bindEnterFunc($('#applyMotifBtn'),true);
        };
    };

    /*console.log('selected');
    console.log(selectedMotifUid);
    console.log(selectedMotifId);*/
};


function apllyDeleteMotifFunc() {
    for (var i=0; i < selectedMotifUid.length ; i++) {
        var curDelItem = motifsDataSource.getByUid(selectedMotifUid[i]);
        motifsDataSource.remove(curDelItem);
        deleteMotifFunc(selectedMotifId[i]);
    };

    var curPopup = $("[data-role=window]");
    curPopup.kendoWindow("close");
    curPopup.parent().removeClass(winClass);

    toggleBtnStatus(deleteMotifBtn,false);
    toggleBtnStatus(applyMotifBtn,false);
};

function deleteMotifPopupFunc() {
    if ( $('#curr-motif-name').length ) {
        if ( selectedMotifUid.length == 1 ) {
            $('#curr-motif-name').text( motifsDataSource.getByUid(selectedMotifUid[0]).name + ' ' + currLang['MOTIF_SINGLEsm'] );
        } else if ( selectedMotifUid.length > 1 ) {
            $('#curr-motif-name').text( selectedMotifUid.length + ' ' + currLang['MOTIF_MULTIPLEsm'] );
        };
    };
};

function uploadMotifPopupFunc() {
    console.log('uploadMotifPopupFunc');

    $('#motif-upload-form .img-wr p').show();
    $('#saveMotifBtn').data("kendoButton").enable(false);

    setTimeout(function(){
        $("#upload-input").on('change',function(){
            var loadedMotif = this.files[0];
            uploadMotifFunc(loadedMotif,function(){
                $('#saveMotifBtn').data("kendoButton").enable(true);
            });
        });
    },200);

};

function applySaveMotifFunc() {
    console.log('save motif');
    saveMotifFunc();

    var curPopup = $("[data-role=window]");
    curPopup.kendoWindow("close");
    curPopup.parent().removeClass(winClass);
};

//search motif functions
function searchMotifFunc() {
    searchVal = $('#motif-search-field').val();
    if (( searchVal != '' ) && ( searchVal != prevSearchVal )) {
        motifsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#motif-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        motifsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#motif-search-clear').addClass('hidden');
    };
    toggleBtnStatus(deleteMotifBtn,false);
    toggleBtnStatus(applyMotifBtn,false);
};

function initMotifSearch() {
    searchVal = $('#motif-search-field').val();
    prevSearchVal = searchVal;
    if ( $('#motif-search-field') ) {
        $('#motif-search-field').on("keyup", this, function () {
            searchMotifFunc();
        });
    }
};

function clearMotifsFilter() {
    motifsDataSource.query({
        filter: { field: "name", operator: "contains", value:'' }
    });
    $('#motif-search-clear').addClass('hidden');
    $('#motif-search-field').val('');
    toggleBtnStatus(deleteMotifBtn,false);
    toggleBtnStatus(applyMotifBtn,false);
};

//---------------------------FILMS-----------------

filmsDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(filmsList);
        },
        create: function(e) {
            e.data.id = filmsList.length;
            filmsList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            /*filmsList[getIndexById(e.data.id)] = e.data;*/
            filmsList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            /*motifsList.splice(getIndexById(e.data.id), 1);*/
            filmsList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "crTime", dir: "desc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                filmId: { type: "number" },
                accountId: { type: "number" },
                jobId: { type: "number" },
                name: { type: "string" },
                crTime: { type: "number" },
                crDate: { type: "string" },
                duration: { type: "number" },
                durTime: { type: "string" },
                videoFiles: { type: "default" },
                products: { type: "string" },
                motifs: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load films array', e.status);
    }
});

function filmsListViewChangeFunc() {
    toggleBtnStatus(filmsBtnsToDisable,true);

    var data = this.dataSource.view();
    selectedFilmUid = $.map(this.select(), function(item) {
        return data[$(item).index()].uid;
    });
    selectedFilmId = $.map(this.select(), function(item) {
        return data[$(item).index()].filmId;
    });
    if ( selectedFilmUid!=null && selectedFilmUid.length == 1 ) {
        if ( filmsDataSource.getByUid(selectedFilmUid[0]).videoFiles[0][0] == 'none' ) {
            toggleBtnStatus($('#downloadFilm'),false);
        };
    };
    if ( selectedFilmUid.length > 1 ) {
        toggleBtnStatus($('#loadFilm'),false);
        toggleBtnStatus($('#downloadFilm'),false);
    };

    $(".html5lightbox-link").html5lightbox();
    /*console.log('selected');
    console.log(selectedFilmUid);
    console.log(selectedFilmId);*/
};

function onSelectFilterFilms(e) {
    var dataItem = this.dataItem(e.item);
    var sortingDirection = 'asc';
    if ( dataItem.value == 'crTime' ) {
        sortingDirection = 'desc';
    };
    /*console.log(dataItem);*/

    filmsDataSource.query({
        sort: [
            {field: dataItem.value, dir: sortingDirection}
        ]
    });
    toggleBtnStatus(filmsBtnsToDisable,true);
};


function applyDeleteFilmFunc() {
    for (var i=0; i < selectedFilmUid.length ; i++) {
        var curDelItem = filmsDataSource.getByUid(selectedFilmUid[i]);
        filmsDataSource.remove(curDelItem);
        deleteFilmFunc(selectedFilmId[i]);
    };

    var curPopup = $("[data-role=window]");
    curPopup.kendoWindow("close");
    curPopup.parent().removeClass(winClass);

    toggleBtnStatus(filmsBtnsToDisable,false);
};

function deleteFilmPopupFunc() {
    if ( $('#curr-film-name').length ) {
        if ( selectedFilmUid.length == 1 ) {
            $('#curr-film-name').text( currLang['PRODUCTION_SINGLE'] + ' ' + filmsDataSource.getByUid(selectedFilmUid[0]).name );
        } else if ( selectedFilmUid.length > 1 ) {
            $('#curr-film-name').text( selectedFilmUid.length + ' ' + currLang['PRODUCTION_MULTIPLE'] );
        };
    };
};

function downloadFilmPopupFunc() {
    var downloadList = $('.download-list');
    var listContent = '';
    var curFilm = filmsDataSource.getByUid(selectedFilmUid);
    if ( (downloadList.length) && (curFilm.videoFiles[0][0] != 'none') ) {
        for (var i=0; i < curFilm.videoFiles.length; i++){
            var videoUrl = window.location.origin + '/data/accounts/' + curFilm.accountId + '/productions/' + curFilm.filmId + '/film_' + curFilm.filmId + '_' + curFilm.videoFiles[i][1] + '.' + curFilm.videoFiles[i][0] ;
            listContent += '<li><a href="' + videoUrl + '" download="'  + curFilm.name + '_' + curFilm.videoFiles[i][1] +  '">' + curFilm.name + '_' + curFilm.videoFiles[i][1] + '.' + curFilm.videoFiles[i][0] + ' - ' + curFilm.videoFiles[i][2] + ' MB</a></li>';
        }
        $(downloadList).html(listContent);
    } else {
        $(downloadList).html("<li>This production is not yet sent to produce</li>");
    };
};

function loadProdDialogFunc() {
    var curItem = filmsDataSource.getByUid(selectedFilmUid);
    console.log('----/current film/----');
    /*console.log(curItem);*/
    $('#curr-film-name').text(curItem.name);
};

function loadProdFunc() {

    var curItem = filmsDataSource.getByUid(selectedFilmUid);
    currentProduction.set('prodObj.name',curItem.name);
    currentProduction.set('prodObj.durTime',curItem.durTime);
    currentProduction.set('prodObj.clips',prodStringToArray(curItem.products));
    currentProduction.set('prodObj.motifs',stringToArray(curItem.motifs));

    userAccount.set('curProduction',curItem.name);

    var curPopup = $("[data-role=window]");
    curPopup.kendoWindow("close");
    curPopup.parent().removeClass(winClass);

    router.navigate('/production');
    /*$('#production-films').data("kendoListView").clearSelection();*/
    productionManageFunc(function(){
        currClipMotifsList = [];
        populateProdMotifsArr(function(){
/*
            console.log('currClipsList');
            console.log(currClipsList );
            console.log('curMotifsList');
            console.log(curMotifsList);
*/
            checkEmptyMotifs();
            currentProdMotifsDataSource.read();
            currentProdClipsDataSource.read();
            recalcProductionTime();

            /*currentProdClipsDataSource.read();*/
            $(".html5lightbox-link").html5lightbox();
        });
    });

};

function newProdDialogFunc() {
    console.log('NEW PRODUCTION');

    currentProduction.set('prodObj',defProductionParams);
    userAccount.set('curProduction',defProductionParams.name);

    var curPopup = $("[data-role=window]");
    curPopup.kendoWindow("close");
    curPopup.parent().removeClass(winClass);

    router.navigate('/production');

    toggleBtnStatus(productionBtnsToDisable,false);

    productionManageFunc(function(){
        currClipMotifsList = [];
        populateProdMotifsArr(function(){
            /*console.log('currClipsList');
            console.log(currClipsList );
            console.log('curMotifsList');
            console.log(curMotifsList);*/
            checkEmptyMotifs();
            currentProdMotifsDataSource.read();
            currentProdClipsDataSource.read();
        });
    });
};

//search film function
function searchFilmFunc() {
    searchVal = $('#film-search-field').val();
    if (( searchVal != '' ) && ( searchVal != prevSearchVal )) {
        filmsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#film-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        filmsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#film-search-clear').removeClass('hidden');
    };
    toggleBtnStatus(filmsBtnsToDisable, false);
}

function initFilmsSearch() {
    searchVal = $('#film-search-field').val();
    prevSearchVal = searchVal;
    if ($('#film-search-field')) {
        $('#film-search-field').on("keyup", this, function () {
            searchFilmFunc();
        });
    }
};

function clearFilmsFilter() {
    filmsDataSource.query({
        filter: { field: "name", operator: "contains", value:'' }
    });
    $('#film-search-clear').addClass('hidden');
    $('#film-search-field').val('');
    toggleBtnStatus(filmsBtnsToDisable, false);
};



// -------------------- CLIPS LIST FOR PRODUCTION --------------------
clipsDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(ProductList);
        },
        create: function(e) {
            e.data.id = ProductList.length;
            ProductList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            /*ProductList[getIndexById(e.data.id)] = e.data;*/
            ProductList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            /*ProductList.splice(getIndexById(e.data.id), 1);*/
            ProductList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                clipId: { type: "number" },
                idString: { type: "string" },
                name: { type: "string" },
                location: { type: "string" },
                crTime: { type: "number" },
                date: { type: "string" },
                duration: { type: "number" },
                durTime: { type: "string" },
                motifsNum: { type: "number" },
                emptyMotifs: { type: "number" },
                locked: { type: "string"}
            }
        }
    },
    error: function(e) {
        alert('failed to load clips array', e.status);
    }
});

function clipsListViewChangeFunc() {
    toggleBtnStatus(applyClipBtn,true);

    var data = this.dataSource.view();
    selectedProductUid = $.map(this.select(), function(item) {
        return data[$(item).index()].uid;
    });
    selectedProductId = $.map(this.select(), function(item) {
        return data[$(item).index()].clipId;
    });

    $(".html5lightbox-link").html5lightbox();

    if ( this.select().length > 0 ) {
        bindEnterFunc($('#applyClipBtn'),true);
    };

    /*console.log('selected');
    console.log(selectedProductUid);
    console.log(selectedProductId);*/
};

function onSelectFilterClips1(e) {
    var select1val = e.item.text(),
        select2val = $('#filterClipsSelect2').data("kendoDropDownList").value(),
        select3val = $('#filterClipsSelect3').data("kendoDropDownList").value(),
        select1field , select2field , select3field ,
        searchField = { field: "name", operator: "contains", value: $('#clip-search-field').val() };

    if (select1val!='All') {
        select1field = { field: "location", operator: "contains", value: select1val };
    } else {
        select1field = { field: "location", operator: "neq", value: select1val };
    };

    if (select2val!='All') {
        select2field = { field: "motifNamesString", operator: "contains", value: select2val }
    } else {
        select2field = { field: "motifNamesString", operator: "neq", value: select2val }
    };

    clipsDataSource.query({
        filter: {
            logic: "and",
            filters: [ select1field, select2field, searchField ]
        },
        sort: [ {field: select3val , dir: "asc"} ]
    });

    toggleBtnStatus(applyClipBtn,false);
};

function onSelectFilterClips2(e) {
    var select1val = $('#filterClipsSelect1').data("kendoDropDownList").value(),
        select2val = e.item.text(),
        select3val = $('#filterClipsSelect3').data("kendoDropDownList").value(),
        select1field , select2field , select3field ,
        searchField = { field: "name", operator: "contains", value: $('#clip-search-field').val() };

    if (select1val!='All') {
        select1field = { field: "location", operator: "contains", value: select1val };
    } else {
        select1field = { field: "location", operator: "neq", value: select1val };
    };

    if (select2val!='All') {
        select2field = { field: "motifNamesString", operator: "contains", value: select2val }
    } else {
        select2field = { field: "motifNamesString", operator: "neq", value: select2val }
    };

    clipsDataSource.query({
        filter: {
            logic: "and",
            filters: [ select1field, select2field, searchField ]
        },
        sort: [ {field: select3val , dir: "asc"} ]
    });

    toggleBtnStatus(applyClipBtn,false);
};

function onSelectFilterClips3(e) {
    var select1val = $('#filterClipsSelect1').data("kendoDropDownList").value(),
        select2val = $('#filterClipsSelect2').data("kendoDropDownList").value(),
        dataItem = this.dataItem(e.item),
        select1field , select2field , select3field ,
        searchField = { field: "name", operator: "contains", value: $('#clip-search-field').val() };

    if (select1val!='All') {
        select1field = { field: "location", operator: "contains", value: select1val };
    } else {
        select1field = { field: "location", operator: "neq", value: select1val };
    };

    if (select2val!='All') {
        select2field = { field: "motifNamesString", operator: "contains", value: select2val }
    } else {
        select2field = { field: "motifNamesString", operator: "neq", value: select2val }
    };

    clipsDataSource.query({
        filter: {
            logic: "and",
            filters: [ select1field, select2field, searchField ]
        },
        sort: [
            {field: dataItem.value, dir: "asc"}
        ]
    });
    toggleBtnStatus(applyClipBtn,false);
};

//search clip function
function searchClipFunc() {
    var select1val = $('#filterClipsSelect1').data("kendoDropDownList").value(),
        select2val = $('#filterClipsSelect2').data("kendoDropDownList").value(),
        select3val = $('#filterClipsSelect3').data("kendoDropDownList").value(),
        select1field , select2field , select3field;

    if (select1val!='All') {
        select1field = { field: "location", operator: "contains", value: select1val };
    } else {
        select1field = { field: "location", operator: "neq", value: select1val };
    };

    if (select2val!='All') {
        select2field = { field: "motifNamesString", operator: "contains", value: select2val }
    } else {
        select2field = { field: "motifNamesString", operator: "neq", value: select2val }
    };

    searchVal = $('#clip-search-field').val();
    if (( searchVal != '' ) && ( searchVal != prevSearchVal )) {
        clipsDataSource.query({
            filter: {
                logic: "and",
                filters: [ select1field, select2field, {field: "name", operator: "contains", value: searchVal} ]
            },
            sort: [ {field: select3val , dir: "asc"} ]
        });
        prevSearchVal = searchVal;
        $('#clip-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        clipsDataSource.query({
            filter: {
                logic: "and",
                filters: [ select1field, select2field, {field: "name", operator: "contains", value: searchVal} ]
            },
            sort: [ {field: select3val , dir: "asc"} ]
        });
        prevSearchVal = searchVal;
        $('#clip-search-clear').removeClass('hidden');
    };
    toggleBtnStatus(applyClipBtn, false);
}

function initClipsSearch() {
    searchVal = $('#clip-search-field').val();
    prevSearchVal = searchVal;
    if ($('#clip-search-field')) {
        $('#clip-search-field').on("keyup", this, function () {
            searchClipFunc();
        });
    }
};

function clearClipsFilter() {
    var select1val = $('#filterClipsSelect1').data("kendoDropDownList").value(),
        select2val = $('#filterClipsSelect2').data("kendoDropDownList").value(),
        select3val = $('#filterClipsSelect3').data("kendoDropDownList").value(),
        select1field , select2field , select3field;

    if (select1val!='All') {
        select1field = { field: "location", operator: "contains", value: select1val };
    } else {
        select1field = { field: "location", operator: "neq", value: select1val };
    };

    if (select2val!='All') {
        select2field = { field: "motifNamesString", operator: "contains", value: select2val }
    } else {
        select2field = { field: "motifNamesString", operator: "neq", value: select2val }
    };

    clipsDataSource.query({
        filter: {
            logic: "and",
            filters: [ select1field, select2field, {field: "name", operator: "contains", value: ''} ]
        },
        sort: [ {field: select3val , dir: "asc"} ]
    });
    $('#clip-search-clear').addClass('hidden');
    $('#clip-search-field').val('');
    toggleBtnStatus(applyClipBtn, false);
};



// -------------- PRODUCTION ----------------

function productionManageFunc(callback) {
    currClipsIds = $.extend( true, {}, currentProduction.get('prodObj.clips') );
    curMotifsList = $.extend( true, {}, currentProduction.get('prodObj.motifs') );
    currClipsList = [];
    currClipMotifsList = [];
    currentProdMotifsDataSource.read();

    if ( currClipsIds.length > 0 ) {
        for (var i=0;i<currClipsIds.length;i++) {
            for(var j=0;j<ProductList.length;j++) {
                if ( ProductList[j].clipId == currClipsIds[i] ) {
                    currClipsList[i] = $.extend( true, {}, ProductList[j] );
                    currClipsList[i].emptyMotifs = 0; //???
                    break;
                } else {
                    currClipsList[i] = {
                        id:j,
                        clipId:0,
                        idString:'none',
                        durTime:'',
                        emptyMotifs:0,
                        name:'not available'
                    };
                };
            };
        };
    };

    if ( userAccount.get('indicatives') != -1 ) {
        var clipIndex = 0;
        var currClip;
        curMotifsList.unshift([]);
        for(var i=0;i<ProductList.length;i++) {
            if ( ProductList[i].clipId == userAccount.get('indicatives') ) {
                currClip = $.extend( true, {}, ProductList[i] );
                currClip.locked = 'Intro'
                for (var j=0;j<currClip.motifsNum;j++) {
                    curMotifsList[clipIndex].push(0);
                };
                break;
            };
        };
        currClipsList.unshift(currClip);
    };
    if ( userAccount.get('abdicatives') != -1 ) {
        var clipIndex = currClipsList.length;;
        var currClip;
        curMotifsList.push([]);
        for(var i=0;i<ProductList.length;i++) {
            if ( ProductList[i].clipId == userAccount.get('abdicatives') ) {
                currClip = $.extend( true, {}, ProductList[i] );
                currClip.locked = 'Outro';
                for (var j=0;j<currClip.motifsNum;j++) {
                    curMotifsList[clipIndex].push(0);
                };
                break;
            };
        };
        currClipsList.push(currClip);
    };

    if (callback && typeof(callback) === "function") {
        callback();
    }
};

function populateProdMotifsArr(callback) {
    /*console.log('populateProdMotifsArrs');*/
    for (var i=0;i<curMotifsList.length;i++) {
        var emptyMotifsCount = 0;
        for (var j=0;j<curMotifsList[i].length;j++) {
            if ( curMotifsList[i][j] == -1 ) {
                curMotifsList[i][j] = {
                    id:j,
                    motifId:0,
                    accountId: userAccount.id,
                    numName:alphabetNumeration[j]
                };
                if ( currClipsList[i].location != 'Indikativ' ) {
                    emptyMotifsCount++;
                };
            } else {
                for(var z=0;z<motifsList.length;z++){
                    if( curMotifsList[i][j] == motifsList[z].motifId ){
                        curMotifsList[i][j] = $.extend( true, {},motifsList[z]);
                        curMotifsList[i][j].numName = alphabetNumeration[j];
                        curMotifsList[i][j].id = j;
                        break;
                    };
                };
                if ( typeof curMotifsList[i][j] !== 'object' ) {
                    curMotifsList[i][j] = {
                        id:j,
                        motifId:'0',
                        accountId: userAccount.id,
                        numName: alphabetNumeration[j]
                    };
                    if ( currClipsList[i].location != 'Indikativ' ) {
                        emptyMotifsCount++;
                    };
                };
            };
            for(var z=0;z<motifsContentTypeList.length;z++){
                if (( currClipsList[i].clipId == motifsContentTypeList[z].productID ) && ( (j+1) == motifsContentTypeList[z].position ) ) {
                    curMotifsList[i][j].aspect = parseInt( motifsContentTypeList[z].aspect * MOTIF_CONTAINER_HEIGHT ) ;
                    break;
                }
            };
        };
        if ( emptyMotifsCount > 0 ) {
            /*console.log(emptyMotifsCount);*/
            currClipsList[i].emptyMotifs = emptyMotifsCount;
        };
    };
    if (callback && typeof(callback) === "function") {
        callback();
    }
};

currentProdMotifsDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(currClipMotifsList);
        },
        create: function(e) {
            e.data.id = currClipMotifsList.length;
            currClipMotifsList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            /*motifsList[getIndexById(e.data.id)] = e.data;*/
            currClipMotifsList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            /*motifsList.splice(getIndexById(e.data.id), 1);*/
            currClipMotifsList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true , defaultValue:0 },
                motifId: { type: "number" , defaultValue:0 },
                accountId: { type: "number" , defaultValue:0},
                aspect: { type: "number", defaultValue:0 },
                name: { type: "string" },
                frameCount: { type: "number" },
                crTime: { type: "number" },
                date: { type: "string" },
                description: { type: "string" },
                numName: { type: "string", defaultValue:'null' }
            }
        }
    },
    error: function(e) {
        alert('failed to load motifs array', e.status);
    }
});

function currProdMotifsListViewChangeFunc() {
    selectedClipMotifUid = this.select().data('uid');
    selectedClipMotifId = this.select().index();
    router.navigate('/motifSelect');
    /*goToSelectClipMotif();*/
};

currentProdClipsDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(currClipsList);
        },
        create: function(e) {
            e.data.id = currClipsList.length;
            currClipsList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            /*ProductList[getIndexById(e.data.id)] = e.data;*/
            currClipsList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            /*ProductList.splice(getIndexById(e.data.id), 1);*/
            currClipsList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                clipId: { type: "number" },
                idString: { type: "string" },
                name: { type: "string" },
                location: { type: "string" },
                crTime: { type: "number" },
                date: { type: "string" },
                duration: { type: "number" },
                durTime: { type: "string" },
                motifsNum: { type: "number" },
                emptyMotifs: { type: "number" },
                locked: { type: "string"}
            }
        }
    },
    error: function(e) {
        alert('failed to load clips array', e.status);
    }
});

function currProdClipsListViewChangeFunc() {
    /*console.log('select clip');*/
    selectedClipUid = this.select().data('uid');
    selectedClipId = this.select().index();
    /*console.log(selectedClipId);*/
    if ( currClipsList[selectedClipId].location == 'Indikativ' ) {
        currClipMotifsList = [];
    } else {
        currClipMotifsList = curMotifsList[selectedClipId];
    };
    currentProdMotifsDataSource.read();

    if ( this.select().length > 0 ) {
        bindDeleteFunc($('#deleteClipButton'),true);
    };

    /*console.log(currClipMotifsList);*/
    toggleBtnStatus(productionBtnsToDisable,true);
};

// --- replace motif ---
function ApllySelectedMotif(callback) {
    router.navigate('/production');
    var replacedMotif = currentProdMotifsDataSource.getByUid(selectedClipMotifUid);
    var curMotif = $.extend(true, {} , motifsDataSource.getByUid(selectedMotifUid) );
    curMotif.aspect = replacedMotif.aspect;
    /*console.log('selectedClipMotif');
    console.log(replacedMotif);
    console.log(curMotif);*/

    curMotifsList[selectedClipId][selectedClipMotifId] = $.extend( true, {}, curMotif );
    currClipMotifsList = curMotifsList[selectedClipId];
    currentProdMotifsDataSource.read();

    /*currentProdMotifsDataSource.insert(selectedClipMotifId, curMotif );*/
    if ( replacedMotif.motifId == 0 ) {
        currClipsList[selectedClipId].emptyMotifs -=1;
        currentProdClipsDataSource.read();
    };

    checkEmptyMotifs();

    if (callback && typeof(callback) === "function") {
        callback();
    }
};


// delete clip in production
function prodDeleteClipFunc(){
    /*console.log('----delete clip in production----');*/
    var curDelItem = currentProdClipsDataSource.getByUid(selectedClipUid);
    /*console.log(curDelItem.id);*/

    currClipsList.splice(selectedClipId,1);
    curMotifsList.splice(selectedClipId,1);
    currentProdClipsDataSource.read();
    currClipMotifsList = [];
    currentProdMotifsDataSource.read();

    toggleBtnStatus(productionBtnsToDisable,false);
    recalcProductionTime();

    /*console.log(curMotifsList);*/
};

function prodReplaceClipFunc(callback){
    /*console.log('----replace clip in production----');*/
    router.navigate('/prodCollection');

    $("#clips-list").data("kendoListView").setOptions({selectable: 'true'});

    var currApplyBtn = $('#applyClipBtn , #applyClipBtn2');
    currApplyBtn.each(function(){
        $(this).data("kendoButton").setOptions({
            enable:'false',
            click:function(e){
                ApplySelectedClip();
            }
        });
    });

    if (callback && typeof(callback) === "function") {
        callback();
    }
};

function ApplySelectedClip(callback) {
    router.navigate('/production');

    var curMotifAspect = 0;
    /*var replacingClip = ProductList[ selectedProductId[0] ];*/
    var replacingClip = clipsDataSource.getByUid(selectedProductUid[0]);
    currClipsList[selectedClipId] = $.extend( true, {}, replacingClip );
    currClipsList[selectedClipId].emptyMotifs = currClipsList[selectedClipId].motifsNum;

    curMotifsList[selectedClipId] = [];
    for (var i=0;i<replacingClip.motifsNum;i++) {
        for(var z=0;z<motifsContentTypeList.length;z++){
            if (( replacingClip.clipId == motifsContentTypeList[z].productID ) && ( (i+1) == motifsContentTypeList[z].position ) ) {
                curMotifAspect = parseInt( motifsContentTypeList[z].aspect * MOTIF_CONTAINER_HEIGHT ) ;
                break;
            }
        };
        /*console.log(curMotifAspect);*/

        curMotifsList[selectedClipId][i] = {
            id:i,
            motifId: 0,
            accountId: userAccount.id,
            numName: alphabetNumeration[i],
            aspect: curMotifAspect
        };
    };

    currentProdClipsDataSource.read();
    currentProdMotifsDataSource.read();
    var currentListView = $("#production-films");
    currentListView.data("kendoListView").select( currentListView.children().get(selectedClipId) );

    recalcProductionTime();
    $(".html5lightbox-link").html5lightbox();

    if (callback && typeof(callback) === "function") {
        callback();
    }
};


// insert clip to production
function prodInsertClipFunc(){
    /*console.log('----insert clip in production----');*/
    router.navigate('/prodCollection');

    $("#clips-list").data("kendoListView").setOptions({selectable: 'multiple'});

    var currApplyBtn = $('#applyClipBtn , #applyClipBtn2');
    currApplyBtn.each(function(){
        $(this).data("kendoButton").setOptions({
            enable:'false',
            click:function(e){
                ApplyNewSelectedClip();
            }
        });
    });

};

function ApplyNewSelectedClip(callback) {
    router.navigate('/production');

    /*Greatings, Mechwarrior!*/
    for (var erppc = 0;erppc < selectedProductUid.length ; erppc++) {
        /*console.log('insert clip');*/
        var curMotifAspect = 0;
        var replacingClip = $.extend( true, {}, clipsDataSource.getByUid(selectedProductUid[erppc]) );
        replacingClip.emptyMotifs = replacingClip.motifsNum;

        /*console.log(replacingClip);*/

        var curClipsCnt = currentProdClipsDataSource.data().length;
        /*console.log('curClipsCnt - ' + curClipsCnt);*/
        var tmpMotifs = [];

        replacingClip.emptyMotifs = replacingClip.motifsNum;

        if ((userAccount.get('abdicatives') != -1) && ( curClipsCnt > 0 ) ) {
            var tmpItem = $.extend(true, {} , currClipsList.pop());
            currClipsList.push(replacingClip);
            currClipsList.push(tmpItem);
            curClipsCnt--;
            /*curClipsCnt!=0? curClipsCnt--:curClipsCnt;*/
        } else {
            currClipsList.push(replacingClip);
        };

        curMotifsList.splice(curClipsCnt,0,[]);
        for (var i=0;i<replacingClip.motifsNum;i++) {
            for(var z=0;z<motifsContentTypeList.length;z++){
                if (( replacingClip.clipId == motifsContentTypeList[z].productID ) && ( (i+1) == motifsContentTypeList[z].position ) ) {
                    curMotifAspect = parseInt( motifsContentTypeList[z].aspect * MOTIF_CONTAINER_HEIGHT ) ;
                    break;
                }
            };

            curMotifsList[curClipsCnt][i] = {
                itemId: i,
                motifId:0,
                accountId: userAccount.id,
                numName:alphabetNumeration[i],
                aspect: curMotifAspect
            };
        };

        currentProdClipsDataSource.read();
        currentProdMotifsDataSource.read();
    };

    /*console.log('ApplyNewSelectedClip');
    console.log(currClipsList);
    console.log(curMotifsList);*/

    var currentListView = $("#production-films");
    currentListView.data("kendoListView").select( currentListView.children().get(curClipsCnt) );

    recalcProductionTime();
    $(".html5lightbox-link").html5lightbox();

    if (callback && typeof(callback) === "function") {
        callback();
    }
};

function checkEmptyMotifs(){
    if ( currClipsList.length > 0 ) {
        var unfilledMotifsNum = 0;
        for (var i=0;i<currClipsList.length;i++) {
            if ( currClipsList[i].emptyMotifs > 0 ) {
                unfilledMotifsNum++;
            };
            toggleBtnStatus(productionProduceBtn,false);
        }
        if ( unfilledMotifsNum == 0 ) {
            toggleBtnStatus(productionProduceBtn,true);
        };
    };
};

function recalcProductionTime() {
    var framesArr = [];
    if ( currClipsList.length > 0 ) {
        for (var i=0;i<currClipsList.length;i++) {
            framesArr.push(currClipsList[i].duration);
        }
    };
    currentProduction.set('prodObj.durTime',timeFormatingFromClipsArr(framesArr));
};

function initProductionDragNDrop(){
    $('#production-films').kendoSortable({
        /*axis:'x',*/
        cursorOffset: { top: 0, left: 10 },
        /*filter: ">div:not(.locked)",*/
        disabled:'.locked',
        ignore: '.video-wr , video',
        placeholder: function(element) {
            return element.clone().css("opacity", 0.3);
        },
        hint: function(element) {
            return element.clone().removeClass("k-state-selected");
        },
        change: function(e) {
            var curItem = $.extend( true, {}, currClipsList[e.oldIndex] );
            var curMotifs = [];

            currClipsList.splice(e.oldIndex,1);
            currClipsList.splice(e.newIndex,0,curItem);
            for (var i=0;i<curMotifsList[e.oldIndex].length;i++) {
                curMotifs.push( $.extend( true, {}, curMotifsList[e.oldIndex][i]) );
            };

            curMotifsList.splice(e.oldIndex,1);
            curMotifsList.splice(e.newIndex,0,[]);
            for (var i=0;i<curMotifs.length;i++) {
                curMotifsList[e.newIndex][i] = $.extend( true, {}, curMotifs[i] );
            };

            currentProdClipsDataSource.read();
            var curListView = $('#production-films').data("kendoListView")
            curListView.select( curListView.element.children().get(e.newIndex) );

            $(".html5lightbox-link").html5lightbox();
        }
    });
};


/*
enter end delete binders
 */
function bindEnterFunc( el , status ) {
    if ( status == true ) {
        if ( jQuery._data( document, "events" ).keydown == undefined ) {
            $(document).on('keydown',function(e){
                if(e.which == 13) {
                    $(el).trigger('click');
                };
            });
        };
    };
    if ( status == false ) {
        $(document).off('keydown');
    };
};
function bindDeleteFunc( el , status ) {
    if ( status == true ) {
        if ( jQuery._data( document, "events" ).keydown == undefined ) {
            $(document).on('keydown',function(e){
                if(e.which == 46) {
                    $(el).trigger('click');
                };
            });
        };
    };
    if ( status == false ) {
        $(document).off('keydown');
    };
};

var router = new kendo.Router({
    routeMissing: function(e){
        console.log('404');
        router.navigate("/page404");
    },
    change: function(e){
        console.log(e.url);
    }
});
router.route("/", function() {
    layout.showIn("#page", loginPage );
});

router.route("/login", function() {
    layout.showIn("#page", loginPage);
});

router.route("/hub", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", hubPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/myproductions", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", prodListPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/production", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", productionPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/motifs", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", motifsPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/motifSelect", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", motifsSelectPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/prodCollection", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", prodColPage);
    } else {
        router.navigate("/login");
    };
});
router.route("/statistics", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", statisticsPage);
    } else {
        router.navigate("/login");
    };
});

router.route("/logout", function() {
    layout.showIn("#page", logoutPage);
});

router.route("/page404", function() {
    layout.showIn("#page", page404);
});

$(function(){
    templateLoader.loadExtTemplate(tplArr,function(){
        console.log('----------- all tpls loaded ---------------');

        motifTemplate = kendo.template($("#motifTemplate").html());
        filmTemplate = kendo.template($("#filmTemplate").html());
        clipTemplate = kendo.template($("#clipTemplate").html());
        clipProdTemplate = kendo.template($("#clipProdTemplate").html());
        motifProdTemplate = kendo.template($("#motifProdTemplate").html());

        layout.render($("#application"));
        router.start();

/*
        kendo.bind($('#motifPage'), MotifsViewModel);
        kendo.bind($('#filmsPage'), FilmsViewModel);
*/

        // logout
        $( "#page" ).on( "touchstart click", "#logout-btn", function( event ) {
            logOut();
            event.preventDefault();
        });

        //-------------- Theme select --------------
        if ( $('#theme-select').length ){
            $('#theme-select').kendoDropDownList({
                change: onThemingChange
            });
        };
/*
        if ( $('#theme-select').length ) {
            $('#theme-select').data("kendoDropDownList").select( $('#theme-select option[value='+DEFAULT_THEME+']').index() );
        };
*/

        /*themeSelectInit();*/

        //--- lang select ---

        if ( $('#language-select').length ){
            $('#language-select').kendoDropDownList({
                change: onLangChange
            });
        };
/*
        if ( $('#language-select').length ) {
            $('#language-select').data("kendoDropDownList").select( $('#language-select option[value='+DEFAULT_LANG+']').index() );
        };
*/

    });

//--------------POPUP Functions --------------
    var win = $("#window").kendoWindow(kendoWindowParams);

    $('body').on('touchend click','.popup-close',function(event){
        var curPopup = $(this).closest("[data-role=window]");
        curPopup.kendoWindow("close");
        curPopup.parent().removeClass(winClass);
    });

    $('body').on('touchend click','.k-overlay',function(event){
        var curPopups = $("[data-role=window]");
        curPopups.parent().removeClass(winClass);
        curPopups.kendoWindow("close");
    });
/*

    $('body').on('touchend click','.popup-btn',function(event){
        var $curPopup = $("#window");
        winClass = $(this).data('popup-type');
        var tplName = $(this).data('popup-content');
        refreshCallBackFunc = '';
        refreshCallBackFunc = window[ $(this).data('refresh-func') ];
        //here we get function name that we will use to fill our window with data
        $curPopup.parent().addClass(winClass);
        var win = $curPopup.data("kendoWindow");
        win.setOptions({
            activate: function(){
                kendo.init($curPopup);
                refreshCallBackFunc();
                localizeHtml($curPopup);
            }
        });
        win.bind('refresh',function(){
            */
/*if (typeof refreshCallBackFunc === "function") {
                refreshCallBackFunc();
            };*//*

            win.center();
            win.open();
            */
/*refreshCallBackFunc = '';*//*

        });
        win.refresh('tpl/popups/'+tplName+'.html.tpl');
    });

*/
});

function popupCallFunc(e) {
    if ( e.event.target.tagName == 'BUTTON' ) {
        var el = $(e.event.target);
    } else {
        var el = $(e.event.target).parent();
    };
    var $curPopup = $("#window");
    winClass = $(el).data('popup-type');
    var tplName = $(el).data('popup-content');
    refreshCallBackFunc = '';
    refreshCallBackFunc = window[ $(el).data('refresh-func') ];
    //here we get function name that we will use to fill our window with data
    $curPopup.parent().addClass(winClass);
    var win = $curPopup.data("kendoWindow");
    win.setOptions({
        activate: function(){
            kendo.init($curPopup);
            if (typeof refreshCallBackFunc === "function") {
                refreshCallBackFunc();
            };
            /*refreshCallBackFunc();*/
            localizeHtml($curPopup);
        }
    });
    win.bind('refresh',function(){
        win.center();
        win.open();
    });
    win.refresh('tpl/popups/'+tplName+'.html.tpl');
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

    docCookies.removeItem('virtualcampaign_lang');
    docCookies.setItem('virtualcampaign_lang', value, new Date(2038, 1, 1), '/', window.location.host, null);
};

function initLocalizationData(lang_path,lang_name,callback) {
    $.getJSON( lang_path, function( json ) {
    }).done(function( json ) {
        langArr[lang_name] = json;
        if (callback && typeof(callback) === "function") {
            callback();
        };
    }).fail(function( jqxhr, textStatus, error ) {
        /*console.log(lang_path);
        console.log(jqxhr);*/
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
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

initLocalizationData("loc/en.json","en_loc",function(){
    initLocalizationData("loc/de.json","de_loc",function(){
        initLocalizationData("loc/tr.json","tr_loc",function(){
            localSelectInit();
        });
    });
});

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
        /*console.log(selectVal);*/
        if ( $('#language-select').length ) {
            $('#language-select').data("kendoDropDownList").select($('#language-select option[value=' + selectVal + ']').index());
        };
        currLang = langArr[selectVal];
        localizeHtml($('#page'));
        /*langViewModel.set('lang',currLang);*/
    } else {
        docCookies.setItem('virtualcampaign_lang', DEFAULT_LANG, new Date(2038, 1, 1), '/', window.location.host, null);
        onLangChange();
    };
};