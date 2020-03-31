/*
main variables and API functions
 */

var HOST_PATH = window.location.origin,
    constFPS = 25, //we need this variable because api give us back video length in frames, so we need to calculate video duration
    /*DEFAULT_THEME = 'metro',*/
    DEFAULT_LANG = 'en_loc',
    langArr = [],
    currLang,
    langViewModel,
    cookieTheme = '',
    cookieLang = '',
    alphabetNumeration = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    refreshCallBackFunc;

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
    return "http://www.virtualcampaign.de/services/index_dev.php?pass=" + hash + "&call=" + method;
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
            console.log(data);
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

                console.log(userAccount);

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
        error: function (data) {
            console.log('failed to connect');
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
            console.log('--/motifs contentType/--');
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

            console.log(motifsContentTypeList);
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
            console.log('--/motifs/--');
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

            console.log(motifsList);
            return motifsList;
        },
        error: function (data) {
            console.log("can't get motifs list");
        }
    });
};

function uploadMotifFunc(loadedMotif,callback) {

    var motifUploadData = new FormData();
    motifUploadData.append( "accountID", +userAccount.get('id'));
    motifUploadData.append( "extension", loadedMotif.type);
    motifUploadData.append( "name", loadedMotif.name);
    motifUploadData.append( "image_film_flag", 'image');
    motifUploadData.append( "Filedata", loadedMotif);

    console.log(motifUploadData);

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
            console.log(data);
            var uploadData = $.parseXML('<xmltag>'+data+'</xmltag>');
            $uploadData = $(uploadData);
            uploadMotifObj = {
                accountID: userAccount.get('id'),
                media_format_id:3 /*???*/,
                aspect: $uploadData.find('Aspect').text(),
                width: 600 /*???*/,
                fileName: $uploadData.find('Name').text()+'.png',
                description: $('#descriptionValue').val(),
                frameCount: $uploadData.find('nFrames').text(),
                name: $('#newMotifName').val()
            };
            console.log(uploadMotifObj);
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
            console.log('--/products/--');
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
            console.log(ProductList);

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
            console.log('--/dicatives/--');
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
            console.log(dicativeList);

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
            console.log('--/films/--');
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
            console.log(filmsList);

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
            console.log(data);

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
            console.log(data);
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
            console.log(data);

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
    console.log('clipsDurrationToString data');
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
    console.log(curArray);
    console.log('clipsDurrationToStringResult');
    console.log(resultString);
    return resultString;
};

function clipsArrayToString(curArray) {
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        resultString += curArray[i] + ',';
    };
    resultString = resultString.substr(0, resultString.length-1);
    console.log('clipsArrayToString');
    console.log(curArray);
    console.log(resultString);
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
    console.log('getProductionMotifIds');
    console.log(curMotifsList);
    var resultArray = [];
    for (var i=0;i<curMotifsList.length;i++) {
        var tmpArr = [];
        for (var j = 0; j < curMotifsList[i].length; j++) {
            tmpArr[j] = curMotifsList[i][j].motifId;
        }
        resultArray[i] = tmpArr;
    }
    console.log(resultArray);
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
    console.log( currentProduction.get('prodObj.clips') );
    console.log( currentProduction.get('prodObj.motifs') );

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
    console.log(newProdObj);

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

var codecFormatsObj = new kendo.observable({
    codecFormatsArr: [],
    jobNameField: currentProduction.get('prodObj.name'),
    userEmailField: ''
});

function produceProdPopupFunc() {
    console.log('produce prod popup');

    kendo.bind($("#produce-form"), codecFormatsObj);

/*
    $('#produce-form').submit(function(e){

    });
*/
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

    console.log('newProdObj');
    console.log(newProdObj);

    createSingleProductionFunc(newProdObj,function(){
        var inProdNum = userAccount.get('inProductionNum');
        userAccount.set('inProductionNum',++inProdNum);
        userAccount.set('inProduction',inProdNum + ' ' + currLang["inProduction"]);
        checkProductionStatus();
        $('#new-prod-dialog-btn').trigger('click');
    });

    var curPopup = $("[data-role=window]");
    curPopup.kendoWindow("close");
    curPopup.parent().removeClass(winClass);

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

function initStatisticTime() {
    var curTime = Math.floor((new Date().getTime())/1000 );
    var strStartTime = new Date();
    var strEndTime = new Date();
    strStartTime.setTime( strEndTime.getTime() - 3600*24*30*1000 );
    strStartTime.setSeconds(1);
    strStartTime.setMinutes(0);
    strStartTime.setHours(0);
    console.log('strStartTime - ' + strStartTime.getTime());
    console.log('strEndTime - ' + strEndTime.getTime());
    statisticUser.set('userName', userAccount.get('firstName') + ' ' + userAccount.get('surName'));
    statisticUser.set('statEndDate',curTime);
    /*statisticUser.set('statStartDate', (curTime - 3600*24*30) );*/
    statisticUser.set('statStartDate', Math.floor(strStartTime.getTime()/1000 ) );

    statisticUser.set('statStartDateString', strStartTime.toLocaleDateString() );
    statisticUser.set('statEndDateString', strEndTime.toLocaleDateString() );
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
            StartDate: statisticUser.get('statStartDate'),
            EndDate: statisticUser.get('statEndDate'),
            AccountID: +userAccount.get('id')
        },
        success: function (data) {
            console.log('--/statistic/--');
            var statisticData = $.parseXML('<xmltag>'+data+'</xmltag>');
            console.log(statisticData);
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

            console.log(ProductionsStatArr);
            console.log(ProductUsageStatArr);
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
        endDate = end.value(),
        startDate = start.value();

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
    $("#startDate").data("kendoDatePicker").value(startDate);
    $("#endDate").data("kendoDatePicker").value(endDate);
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
    $("#startDate").data("kendoDatePicker").value(startDate);
    $("#endDate").data("kendoDatePicker").value(endDate);
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
    $("#startDate").data("kendoDatePicker").value(startDate);
    $("#endDate").data("kendoDatePicker").value(endDate);
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
    $("#startDate").data("kendoDatePicker").value(startDate);
    $("#endDate").data("kendoDatePicker").value(endDate);
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
    $("#startDate").data("kendoDatePicker").value(startDate);
    $("#endDate").data("kendoDatePicker").value(endDate);
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
        console.log('endDate - ' + endDate);*/
        startDate = new Date(startDate);
        startDate = Math.floor( startDate.getTime()/1000 );
        /*console.log('startDate - ' + startDate);*/
        endDate = new Date(endDate);
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
        console.log(clipsArr);
        console.log(motifsArr);

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
}

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