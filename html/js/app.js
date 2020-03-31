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


/*
main variables and API functions
 */

var /*HOST_PATH = 'http://' + window.location.host,*/
    constFPS = 25, //we need this variable because api give us back video length in frames, so we need to calculate video duration
    /*DEFAULT_THEME = 'metroblack',*/
    DEFAULT_LANG = 'en_loc',
    langArr = [],
    currLang,//todo:write func for getting translations to code that return arg in no translations
    langViewModel,
    cookieTheme = '',
    cookieLang = '',
    alphabetNumeration = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    refreshCallBackFunc,
    MAX_LOAD_IMG_WIDTH = 600,
    MAX_LOAD_IMG_HEIGHT = 600;

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
    animation: {
        close: {
            duration: 300
        }
    },
    close: function(e) {
    }
};

var responsivePanelParams = {
    breakpoint:1024,
    orientation: "left"
};

var currentInd = new kendo.observable({
    isVisible: false,
    imgSrc:"",
    videoSrc:"",
    clipObj: {
        categoryId:0,
        clipId:0,
        crTime:0,
        date:"",
        description:"",
        durTime:"",
        duration:0,
        emptyMotifs:0,
        id:0,
        idString:"",
        location:"",
        locked:"",
        motifNamesString:"",
        motifsNum:0,
        name:""
    }
});

var currentAbd = new kendo.observable({
    isVisible: false,
    imgSrc:"",
    videoSrc:"",
    clipObj: {
        categoryId:0,
        clipId:0,
        crTime:0,
        date:"",
        description:"",
        durTime:"",
        duration:0,
        emptyMotifs:0,
        id:0,
        idString:"",
        location:"",
        locked:"",
        motifNamesString:"",
        motifsNum:0,
        name:""
    }
});

var codecTypes =  [];
var codecTypesLists = {};
var clipFormats =  [];

var defProductionParams = {
    id: 0,
    name: (currLang == null)?'New production':currLang["NEW_PRODUCTION"],
    crTime: 0,
    duration: 0,
    durTime: '00:00 min',
    clips: [],
    motifs: []
};

var currentProduction = new kendo.observable({
    prodObj: {
        id: 0,
        name: (currLang == null)?'New production':currLang["NEW_PRODUCTION"],
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
    inProduction:[],
    lastProdId:0,
    curProduction:''/*currentProduction.get('prodObj.name')*/,
    productsVal:0,
    motifsVal:0,
    indicatives:-1, //intro clip
    abdicatives:-1 //outro clip
});

userAccount.bind("change",function(e){
    if (e.field == 'inProduction') {
        userAccount.set('inProductionNum',userAccount.get('inProduction').length);
    }
});

var motifsContentTypeList = [];
var fileExtensionsArr = [];
var motifUploadAcceptStr = '';

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
    tmpFilmsList = [],
    selectedFilmUid = [],
    selectedFilmId = []/*,
    deleteFilmObj*/;

var clipsDataSource,
    clipsListView,
    ProductList = [],
    dicativeList = [],
    clipsLocArr = [], //clip locations array
    motifsTypeNamArr = [],
    selectedProductUid = [],
    selectedProductId = [];

//production vars
var selectedClipId,
    currClipsIds = [],
    currClipsList = [],
    curMotifsList = [],
    currMotifTypesList = [],
    currClipMotifsList = [],
    selectedClipUid,
    selectedClipId,
    selectedClipMotifUid,
    selectedClipMotifId,
    currentProdMotifsDataSource,
    currentProdClipsDataSource;

//admin section vars
var accountsArr = [],
    groupArr = [],
    groupUsersArr = [],
    prodGroups = [],
    motifTypesArr = [],
    audioArr = [],
    productionsArr = [],
    openProdsArr = [],
    finishedProdsArr = [];

var winClass = '';

var selectedAccUid,
    selectedAudioUid,
    selectedGroupUid;

function clearVariables() {
    progressVal = 0;
    motifsContentTypeList = [];
    motifsList = [];
    motifsDataSource.read();
    filmsList = [];
    tmpFilmsList = [];
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
    currMotifTypesList = [];
    currClipMotifsList = [];
    currentProdMotifsDataSource.read();
    currentProduction.set('prodObj',defProductionParams);

    accountsArr = [];
    accountsDataSource.read();
    groupArr = [];
    groupUsersArr = [];
    prodGroups = [];
    motifTypesArr = [];
    audioArr = [];
    productionsArr = [];
    openProdsArr = [];
    finishedProdsArr = [];
    finishedProdsDataSource.read();

    userAccount.set('loginStatus',0);
    userAccount.set('id',0);
    userAccount.set('groupId',0);
    userAccount.set('firstName','empty');
    userAccount.set('surName','empty');
    userAccount.set('inProduction',[]);
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
                //we creating string with all content type names, because kendo.data.Model supports
                //only 4 types "string", "number", "boolean", "date"
                break;
            };
            ProductList[j].emptyMotifs = ProductList[j].motifsNum;
        };
    };
    clipsDataSource.read();
    admProductsDataSource.read();
    if (callback && typeof(callback) === "function") {
        callback();
    };
};

/*
api
*/

// api keygen
var SALTED = 'vcampaign_704MvAgRniDZAyfLvIzr';

function urlGen (method) {
    var hostname = window.location.hostname;
    hostname = hostname.split('.');
    hostname = hostname.slice(-2);
    hostname = hostname.join('.');
/*
    hostname = 'api.' + hostname;
    hostname = 'service.' + hostname;
*/
    if ( window.location.hostname.indexOf('www') != -1 ) {
        hostname = 'www.' + hostname;
    }
    var shaObj = new jsSHA(method , "TEXT");
    var hash = shaObj.getHash("SHA-1", "HEX");
    shaObj = new jsSHA(hash + SALTED, "TEXT");
    hash = shaObj.getHash("SHA-1", "HEX");
    return window.location.protocol + "//" + hostname + "/services/index.php?pass=" + hash + "&call=" + method;
};

//loading progress inc function
var progressMaxVal = 10,
    progressVal = 0;
var logStr = '';
function loadingInc(val) {
    if ( $('#loading-progressbar').length ) {
        var loadingProgressBar = $('#loading-progressbar').data("kendoProgressBar");
        var val = parseInt(val / progressMaxVal * 100);
        loadingProgressBar.value(val);
        if ( val >= progressMaxVal ) {
            router.navigate('/hub');
            kendo.bind($("#hubPage"), userAccount);
        }
    }
};

// login
function loginFunc(){
    /*event.preventDefault();*/
    var loginData = $('#login-form').serializeArray();
    $.ajax({
        type: "POST",
        url: urlGen('login') ,
        cache: false,
        data: loginData,
        success: function (data) {
            if ( +data.Result == 0 ) {
                $('#login-form .error-msg').fadeIn(300).delay(5000).fadeOut(700);
                console.log('Wrong username or password');
                router.navigate('/login');
            } else if ( +data.Result == 3 ) {
                $('#login-form .error-same-user').fadeIn(300).delay(5000).fadeOut(700);
                console.log('Same user is already logged in');
                router.navigate('/login');
            } else if ( +data.Result == 2 ) {

                userAccount.set("id", parseInt(data.ID) );
                userAccount.set("groupId", parseInt(data.AccountGroupID ) );
                userAccount.set("firstName", data.Name1  );
                userAccount.set("surName", data.Name2  );
                userAccount.set("indicatives", parseInt(data.Indicative ) );
                userAccount.set("abdicatives", parseInt(data.Abdicative ) );
                userAccount.set("onlinethreesixty", data.onlinethreesixty==1?true:false );

                defProductionParams.name = currLang["NEW_PRODUCTION"];
                currentProduction.set('name',currLang["NEW_PRODUCTION"]);

                $.when(getFileExtensions(),
                    getDicativesByAccount(),
                    getMotifListByAccount(),
                    getFilmsByAccount(),
                    getProductListByAccount()
                    ).then(function(){
                        $.when(getAudioList(),
                            mergeProductsNDicatives( ProductList , dicativeList , function(){
                                if ( userAccount.get("groupId") == 1 ) {
                                    editGroupObj.set('ProductList',ProductList);//populate product selects for admin groups
                                };
                                //logStr = logStr + 'ended mergeProductsNDicatives' + new Date() + '   |   ';
                                loadingInc(++progressVal);
                            }),
                            getContentTypeListByAccount()).then(function(){
                                countClipMotifs();
                                initSortingSelects();
                                if ( (userAccount.get('indicatives') != -1) || (userAccount.get('abdicatives') != -1) ) {
                                    productionManageFunc(true,function(){
                                        //logStr = logStr + 'ended productionManageFunc' + new Date() + '   |   ';
                                        loadingInc(++progressVal);
                                        currClipMotifsList = [];
                                        populateProdMotifsArr(function(){
                                            checkEmptyMotifs();
                                            currentProdMotifsDataSource.read();
                                            currentProdClipsDataSource.read();
                                            recalcProductionTime();
                                            //logStr = logStr + 'ended populateProdMotifsArr' + new Date() + '   |   ';
                                            loadingInc(++progressVal);
                                        });
                                    });
                                };
                        });
                });

                userAccount.set('loginStatus',1);
                router.navigate('/loading');

                if ( userAccount.get("groupId") == 1 ) {
                    progressMaxVal = progressMaxVal + 4;
                    getAccountGroupList(function(){
                        getAccountList(function(){
                            editAccObj.set('groupNamesField',groupArr);
                        });
                    });

                    getProductGroupList(function(){});
                    getContentFormats(function(){});
                };
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('failed to connect');
            console.log( textStatus + ' - ' + errorThrown );
            $('#login-form .error').prepend('<p class="cur-error">failed to send login request - ' + textStatus + '</p>')
                .find('.cur-error').fadeIn(300).delay(5000).fadeOut(700,function(){
                $('#login-form .cur-error').remove();
            });
            router.navigate('/login');
        }
    });
};

function getFileExtensions(callback) {
    var dfd = new $.Deferred();
    $.ajax({
        type: "GET",
        url: urlGen('getFileExtensions') ,
        cache: false,
        //data: ,
        success: function (data) {
            var dataArr = data.MediaFormats.MediaFormat;
            fileExtensionsArr = [];
            for (var i=0;i<dataArr.length;i++) {
                fileExtensionsArr.push({
                    id: parseInt( dataArr[i].ID ),
                    extension: dataArr[i].Extension ,
                    name: dataArr[i].Name ,
                    type: dataArr[i].Type
                });
                if ( dataArr[i].Type == 'motif' || dataArr[i].Type == 'film' ) motifUploadAcceptStr += dataArr[i].Extension + ',' ;
            };
            motifUploadAcceptStr = motifUploadAcceptStr.substr(0, motifUploadAcceptStr.length-1);
            dfd.resolve();
            loadingInc(++progressVal);
            //logStr = logStr + 'ended getFileExtensions' + new Date() + '   |   ';
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
    return dfd.promise();
};

function getFileExtensionStr(fileName) {
    fileName = (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName) : undefined;
    return fileName[0];
};

function checkFileExtension(fileExt) {
    fileExt = '.' +  getFileExtensionStr(fileExt);
    for (var i=0;i<fileExtensionsArr.length;i++) {
        if ( fileExtensionsArr[i].extension == fileExt ) {
            return fileExtensionsArr[i].id;
            break;
        };
    };
};

//get motif content type list of clips
function getContentTypeListByAccount(callback) {
    var dfd = new $.Deferred();

    if ( userAccount.get("groupId") == 1 ) {
        $.ajax({
            type: "GET",
            url: urlGen('getContentTypeListByAccount') ,
            cache: false,
            success: function (data) {
                getContentTypeListByAccountProcess(data.ContentTypes.ContentType);
                dfd.resolve();
                if (callback && typeof(callback) === "function") {
                    callback();
                }
            },
            error: function (data) {
                console.log("can't get contentType list");
                dfd.catch();
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: urlGen('getContentTypeListByAccount') ,
            cache: false,
            data: {
                accountGroupID: +userAccount.get('groupId')
            },
            success: function (data) {
                getContentTypeListByAccountProcess(data.ContentTypes.ContentType);
                dfd.resolve();
                if (callback && typeof(callback) === "function") {
                    callback();
                }
            },
            error: function (data) {
                console.log("can't get contentType list");
                dfd.catch();
            }
        });
    };

    function getContentTypeListByAccountProcess(data) {
        motifsContentTypeList = [];
        for (var i=0;i<data.length;i++){
            motifsContentTypeList.push({
                motifTypeId: parseInt( data[i].ID ),
                name: data[i].Name ,
                aspect: parseFloat( data[i].Aspect ),
                position: parseInt( data[i].Position ),
                positionName: alphabetNumeration[parseInt( data[i].Position )-1],
                productID: parseInt( data[i].ProductID ),
                loaderName: data[i].LoaderName ,
                contentType: data[i].Content ,
                canLoop: parseInt( data[i].CanLoop ),
                acceptsFilm: parseInt( data[i].AcceptsFilm )
            });
        };
        loadingInc(++progressVal);
        //logStr = logStr + 'ended getContentTypeListByAccountProcess' + new Date() + '   |   ';
    };
    return dfd.promise();
};

// get motifs-list and motif actions
function getMotifListByAccount(callback) {
    var dfd = new $.Deferred();

    $.ajax({
        type: "POST",
        url: urlGen('getMotifListByAccount') ,
        cache: false,
        data: {
            accountID: +userAccount.get('id'),
            min_date: 0
        },
        success: function (data) {
            motifsList = [];
            var itemID = 0;
            for (var i = 0;i < data.length; i++) {
                motifsList.push(
                    {
                        id: itemID++,
                        motifId: +data[i].Motif.ID,
                        accountId: +data[i].Motif.AccountID,
                        name: data[i].Motif.Name,
                        frameCount: +data[i].Motif.FrameCount,
                        crTime: +data[i].Motif.CreationTime,
                        date: dateFormating( parseInt(data[i].Motif.CreationTime) ),
                        description: data[i].Motif.Description
                    }
                );
            };
            userAccount.set("motifsVal", motifsList.length );

            motifsDataSource.read();
            dfd.resolve();
            loadingInc(++progressVal);
            //logStr = logStr + 'ended getMotifListByAccount' + new Date() + '   |   ';
            if (callback && typeof(callback) === "function") {
                callback();
            }
        },
        error: function (data) {
            console.log("can't get motifs list JSON");
            dfd.catch();
        }
    });
    return dfd.promise();
};

// upload motif to server
function uploadMotifFunc(loadedMotif,callback) {
    $('#motif-upload-form .table-cell > img').hide().attr('src', '' );
    $('#saveMotifBtn').data("kendoButton").enable(false);
    $('#motif-upload-form .img-wr p').show();
    var motifUploadData = new FormData();
    motifUploadData.append( "accountID", +userAccount.get('id'));
    motifUploadData.append( "extension", getFileExtensionStr(loadedMotif.name));//loadedMotif.type
    motifUploadData.append( "name", loadedMotif.name);
    motifUploadData.append( "Filedata", loadedMotif);
    if ( loadedMotif.type.match(/video.*/) ) {
        motifUploadData.append( "image_film_flag", 'film');
    } else if ( loadedMotif.type.match(/image.*/) || loadedMotif.type.match(/.pdf/) ) {
        motifUploadData.append( "image_film_flag", 'image');
    };
    $('#newMotifName').val( loadedMotif.name.split('.')[0] );

    $('#motif-upload-progressbar').show(100);

    $.ajax({
        type: "POST",
        url: urlGen('uploadMotif') ,
        cache: false,
        processData: false,
        contentType: false,
        data: motifUploadData,
        xhr: function() {
            myXhr = $.ajaxSettings.xhr();
            $('#motif-upload-form .img-wr p > span').hide();
            $('#motif-upload-form .img-wr p .wait-loading').show();
            var motifProgressBar = $('#motif-upload-progressbar').data("kendoProgressBar");
            if(myXhr.upload){ // check if upload property exists
                myXhr.upload.addEventListener('progress',function(e){
                    var pc = parseInt(e.loaded / e.total * 100);
                    motifProgressBar.value(pc);
                }, false);
            }
            return myXhr;
        },
        success: function (data) {
            if ( data == null ) {
                $('#motif-upload-form .img-wr p > span').hide();
                $('#motif-upload-form .img-wr p .error').show();
                $('#motif-upload-progressbar').hide(100);
                return false;
            } else {
                $('#motif-upload-form .img-wr p > span').hide();
                $('#motif-upload-form .img-wr p .default').show();
            };

            var dataObj = data.Result;

            uploadMotifObj = {
                accountID: userAccount.get('id'),
                media_format_id: 0,//checkFileExtension(loadedMotif.name),
                aspect: parseFloat( dataObj.Aspect ),
                width: 0 ,
                fileName: dataObj.Name ,
                fileExtension: dataObj.Extension ,
                description: $('#descriptionValue').val(),
                frameCount: parseInt( dataObj.nFrames ),
                name: $('#newMotifName').val(),
                animated: parseInt( dataObj.Animated )
            };

            uploadMotifObj.media_format_id = checkFileExtension(uploadMotifObj.fileName + uploadMotifObj.fileExtension);

            if ( loadedMotif.type.match(/image.*/) || loadedMotif.type.match(/.pdf/) ) {
                var motifImgWr = $('#motif-upload-form .img-wr'),
                    imgWrAspect = motifImgWr.width()/motifImgWr.height(),
                    oldImg = $('#motif-upload-form .table-cell > img'),
                    tmpImg  = document.createElement('img');

                $('#motif-upload-form .img-wr p').hide();
                setTimeout(function(){
                    checkImageLoad(tmpImg,function(){
                        $('#saveMotifBtn').data("kendoButton").enable(true);
                    });
                },100);

                tmpImg.src = window.location.protocol + '//' + window.location.host.replace('www.','') + '/data/accounts/' + userAccount.get('id') + '/temp/' + uploadMotifObj.fileName + '_thumb.jpg';
                if (uploadMotifObj.aspect > imgWrAspect) {
                    $(tmpImg).css('width',motifImgWr.width());
                } else {
                    $(tmpImg).css('height',motifImgWr.height());
                };
                $(tmpImg).insertAfter(oldImg);
                $(tmpImg).show().css('display','block');
                $(oldImg).remove();
            };
            if ( loadedMotif.type.match(/video.*/) ) {
                uploadMotifObj.width = 0;
                uploadMotifObj.frameCount = -1;
                $('#motif-upload-form .img-wr p > span').hide();
                $('#motif-upload-form .img-wr p .video').show();
                $('#saveMotifBtn').data("kendoButton").enable(true);
            }

            $('#motif-upload-progressbar').hide(100);

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};


function checkImageLoad(imgObj, callback) {
    if(imgObj.complete) {
        if (callback && typeof(callback) === "function") {
            callback();
        };
    } else {
        setTimeout(function(){
            checkImageLoad(imgObj, callback);
        },500);
    };
};


function saveMotifFunc(callback) {
    uploadMotifObj.name = $('#newMotifName').val();
    uploadMotifObj.description = $('#descriptionValue').val();

    /*
    todo:check doubled fields
     <Source>/kunden/homepages/16/d296897465/htdocs/virtualcampaign/data/accounts/78/temp/converted_78_1489328932.jpg</Source>
     <Target>/kunden/homepages/16/d296897465/htdocs/virtualcampaign/data/accounts/78/motifs/10342.jpg</Target>
     <Source>/kunden/homepages/16/d296897465/htdocs/virtualcampaign/data/accounts/78/temp/converted_78_1489328932_thumb.jpg</Source>
     <Target>/kunden/homepages/16/d296897465/htdocs/virtualcampaign/data/accounts/78/motifs/10342_thumb.jpg</Target>
     <ID>10342</ID>
    * */

    $.ajax({
        type: "POST",
        url: urlGen('saveMotif') ,
        cache: false,
        data: {
            accountID: uploadMotifObj.accountID,
            media_format_id: uploadMotifObj.media_format_id,
            aspect: uploadMotifObj.aspect.toString(),
            width: uploadMotifObj.width,
            fileName: uploadMotifObj.fileName + uploadMotifObj.fileExtension,
            description: uploadMotifObj.description,
            frameCount: uploadMotifObj.frameCount,
            name: uploadMotifObj.name
        },
        success: function (data) {
            var loadedMotifID = data.ID;

            getMotifListByAccount().then(function(){
                window.scrollTo(0,0);
                var newMotifEl = document.querySelectorAll("[data-id='"+loadedMotifID+"']");
                if ( uploadMotifObj.animated == 1 ) {
                    $(newMotifEl).find('.img')
                        .css('background-image', 'url(' + window.location.protocol + '//' + window.location.host.replace('www.','') + '/data/accounts/' + userAccount.get('id') + '/motifs/' + loadedMotifID + '_thumb.jpg)' );
                    var tmpImg  = document.createElement('img');
                    $(tmpImg)
                        .on('error',function(){
                            setTimeout(function(){
                                var randomId = new Date().getTime();
                                var srcStr = window.location.protocol + '//' + window.location.host.replace('www.','') + '/data/accounts/' + userAccount.get('id') + '/motifs/' + loadedMotifID + '_thumb.jpg?r='+ randomId;
                                $(tmpImg).attr('src',srcStr);
                            },1000);
                        })
                        .on('load',function(){
                            setTimeout(function(){
                                delete tmpImg;
                                getMotifListByAccount();
                            },2000);
                        })
                        .attr('src',window.location.protocol + '//' + window.location.host.replace('www.','') + '/data/accounts/' + userAccount.get('id') + '/motifs/' + loadedMotifID + '_thumb.jpg');
                } else {
                    setTimeout(function(){
                        $(newMotifEl).find('.img')
                            .css('background-image', window.location.protocol + '//' + window.location.host.replace('www.','') + '/data/accounts/' + userAccount.get('id') + '/temp/' + uploadMotifObj.fileName + '_thumb.jpg)' );
                    },500);
                };
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
            console.log(data);

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

//  get production films by account
//  ProductList
function sepAndSortCodecs(arr) {
    $.each(arr,function(i,item){
        item.tplName = item.name.split(':')[1];
        item.onlinethreesixty = userAccount.get('onlinethreesixty');
    });
    arr.sort(function(a,b){
        return a.sort_order - b.sort_order;
    });
    var resArr = {
        'mp4':[],
        'wmv':[],
        'vr360':[],
        'special':[],
        'other':[]
    };
    $.each(arr,function(i,item){
        switch(item.type_group) {
            case '1':
                resArr.mp4.push(item);
                break;
            case '2':
                resArr.wmv.push(item);
                break;
            case '3':
                resArr.vr360.push(item);
                break;
            case '4':
                resArr.special.push(item);
                break;
            default:
                resArr.other.push(item);
        };
    });
    return resArr;
}

function getProductListByAccount(callback) {
    var dfd = new $.Deferred();
    if ( userAccount.get("groupId") == 1 ) {
        $.ajax({
            type: "GET",
            url: urlGen('getShortProductListByAccount') ,
            cache: false,
            success: function (data) {
                getProductListByAccountProcess(data);
                dfd.resolve();
                if (callback && typeof(callback) === "function") {
                    callback();
                }
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: urlGen('getShortProductListByAccount') ,
            cache: false,
            data: {
                accountGroupID: parseInt(userAccount.get('groupId'))
            },
            success: function (data) {
                getProductListByAccountProcess(data);
                dfd.resolve();
                if (callback && typeof(callback) === "function") {
                    callback();
                }
            }
        });
    };

    function getProductListByAccountProcess(data) {
        codecTypes = $.extend(true,[],data.CodecTypes);
        $.each(codecTypes,function(i,item){
            item.resName = item.name.split(':')[1];
            item.onlinethreesixty = userAccount.get('onlinethreesixty');
        });
        codecTypesLists = sepAndSortCodecs(data.CodecTypes);
        editProductObj.set('codecs',codecTypesLists);
        clipFormats = $.extend(true,[],data.ContentFormats);

        data = data.Products.Product;
        ProductList = [];
        var itemID = 0;
        for (var i=0;i<data.length;i++){
            ProductList.push({
                id: itemID++,
                clipId: parseInt(data[i].ID),
                idString: to4DigitsSting( data[i].ID ),
                categoryId: parseInt(data[i].GroupID),
                name: data[i].Name ,
                location: data[i].Location ,
                motifNamesString: '',
                crTime: data[i].CreationTime,
                date: dateFormating( parseInt(data[i].CreationTime) ),
                duration: data[i].OutFrame - data[i].InFrame + 1, //parseInt(data[i].Frames),
                durTime: timeFormating( parseInt(data[i].Frames) ),
                motifsNum: 0,
                emptyMotifs: 0, /*$(this).find('ContentFormat').length*/
                locked: '' /*field for timeline dragndrop to show intro/outro clips*/,
                previewFrame: parseInt(data[i].PreviewFrame),
                description: data[i].Description,
                productType: data[i].ProductType,
                productTypeName: clipFormats[ +data[i].ProductType - 1 ].name,
                allowedCodecs: data[i].AllowedCodecTypes,
                can_reformat: data[i].can_reformat,
                resolution: data[i].resolution,

                master_ID: data[i].MasterProductId,
                inFrame: data[i].InFrame,
                outFrame: data[i].OutFrame
            });
        };
        loadingInc(++progressVal);
        //logStr = logStr + 'ended getProductListByAccountProcess' + new Date() + '   |   ';
    };
    return dfd.promise();
};

function getDicativesByAccount(callback) {
    var dfd = new $.Deferred();
    //var start_time = new Date().getTime();
    if ( userAccount.get("groupId") == 1 ) {
        $.ajax({
            type: "GET",
            url: urlGen('getDicativesByAccount') ,
            cache: false,
            success: function (data) {
                getDicativesByAccountProcess(data.Products.Product);
                //var request_time = ( new Date().getTime() - start_time ) / 1000;
                //console.log('getDicativesByAccount - ' + request_time);
                dfd.resolve();
                if (callback && typeof(callback) === "function") {
                    callback();
                }
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: urlGen('getDicativesByAccount') ,
            cache: false,
            data: {
                accountGroupID: +userAccount.get('groupId')
            },
            success: function (data) {
                getDicativesByAccountProcess(data.Products.Product);
                //var request_time = ( new Date().getTime() - start_time ) / 1000;
                //console.log('getDicativesByAccount - ' + request_time);
                dfd.resolve();
                if (callback && typeof(callback) === "function") {
                    callback();
                }
            }
        });
    };

    function getDicativesByAccountProcess(data) {
        dicativeList = [];
        var itemID = 0;
        for (var i=0;i<data.length;i++){
            dicativeList.push({
                id: itemID++,
                clipId: parseInt(data[i].ID),
                idString: to4DigitsSting( data[i].ID ),
                categoryId: parseInt(data[i].GroupID),
                name: data[i].Name ,
                location: data[i].Location ,
                motifNamesString: '',
                crTime: data[i].CreationTime,
                date: dateFormating( parseInt(data[i].CreationTime) ),
                duration: parseInt(data[i].Frames),
                durTime: timeFormating( parseInt(data[i].Frames) ),
                motifsNum: 0,
                emptyMotifs: 0, /*$(this).find('ContentFormat').length*/
                locked: '' /*field for timeline dragndrop to show intro/outro clips*/,
                previewFrame: parseInt(data[i].PreviewFrame),
                description: data[i].Description,

                master_ID: data[i].MasterProductId,
                inFrame: data[i].InFrame,
                outFrame: data[i].OutFrame
            });
        };
        loadingInc(++progressVal);
        //logStr = logStr + 'ended getDicativesByAccountProcess' + new Date() + '   |   ';
    };
    return dfd.promise();
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
    $.merge( baseArray, newArr );

    if (callback && typeof(callback) === "function") {
        callback();
    }
};


//  get films list and film actions
function getFilmsByAccount(callback) {
    var dfd = new $.Deferred();

    $.ajax({
        type: "POST",
        url: urlGen('getFilmsByAccount') ,
        cache: false,
        data: {
            accountID: +userAccount.get('id'),
            min_date: 0
        },
        success: function (data) {
            var dataArr = data.Films.Film;
            filmsList = [];
            var itemID = 0;
            for(var i=0; i < dataArr.length ; i++) {
                filmsList.push({
                    id: itemID++,
                    filmId: +dataArr[i].ID,
                    accountId: dataArr[i].Owner,
                    jobId: dataArr[i].jobID,
                    name: dataArr[i].Name ,
                    crTime: dataArr[i].Date ,
                    crDate: dateFormating( +dataArr[i].Date ),
                    duration: dataArr[i].Duration ,
                    durTime: timeFormating( +dataArr[i].Duration ),
                    formats: (dataArr[i].Formats)?dataArr[i].Formats.split(','):[], //.sort()
                    videoFiles: codecFormatsToArray( dataArr[i].codecFormats , dataArr[i].size , dataArr[i].Formats ),
                    videoSizes: (dataArr[i].size)?dataArr[i].size.split('.'):[],
                    products: dataArr[i].Products ,
                    motifs: dataArr[i].Motifs,
                    urlHash: dataArr[i].UrlHash,
                    status: (dataArr[i].Status)?dataArr[i].Status:-1
                });
                if ( dataArr[i].jobID && !dataArr[i].size && userAccount.get('inProduction').indexOf(+dataArr[i].ID) == -1 ) {
                    userAccount.get('inProduction').push(+dataArr[i].ID);
                }
            };
            userAccount.set("productsVal", filmsList.length );
            if ( userAccount.get('inProduction').length != 0 ) {
                checkProductionStatus();
            };

            filmsDataSource.read();
            dfd.resolve();
            loadingInc(++progressVal);
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
    return dfd.promise();
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
            getFilmsByAccount();
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
            userAccount.set('lastProdId',data.FilmID);

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
            clearVariables();
            router.navigate('/logout');
        }
    });
};

function checkProductionStatus(callback) {
    setTimeout(function(){
        $.ajax({
            type: "POST",
            url: urlGen('checkProductionStatusAdv') ,
            cache: false,
            data: {
                userID: +userAccount.get('id'),
                filmIDs: userAccount.get('inProduction').join(',')
            },
            success: function (data) {
                /*
                0 - submited
                <= 7 - in progress
                8 - finished
                * */
                var runFlag = false,
                    renewFlag = false;
                data.Films = data.Films.filter(function(obj){return obj.id != 0});
                for(var i=0;i<data.Films.length;i++) {
                    var filmObj = filmsList.filter(function(obj){
                        return obj.filmId == data.Films[i].id;
                    })[0];
                    filmObj.status = data.Films[i].status;
                    if ( data.Films[i].status == 8 ) {
                        userAccount.set('inProduction',
                            userAccount.get('inProduction').filter(function(el){return el!=data.Films[i].id})
                        );
                        renewFlag = true;
                    }
                }
                filmsDataSource.read();
                if ( userAccount.get('inProduction').length != 0 ) {
                    checkProductionStatus();
                }
                if ( renewFlag ) {
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
    }, 5000);
};


//-------------- USER API END ---------------------


//-------------- DATA CONVERTING FUNCTIONS ----------------
// date convert func
function dateFormating(miliseconds){
    var d = new Date( miliseconds * 1000 );
    return d.toLocaleDateString() + ' - ' + to2DigitsSting(d.getHours()) + ':' + to2DigitsSting(d.getMinutes());// + 'h';
};

// film duration convert func
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
    var seconds = totalSeconds==0?0:Math.floor(totalSeconds%60 - 1);
    seconds = to2DigitsSting(seconds);
    return minutes + ':' + seconds + ' min';
};
function timeFormatingFromClipsArr( framesArr ){
    if (framesArr.length == 0) {
        return "00:00 min";
    } else {
        var totalSeconds = 0;
        for (var i=0;i<framesArr.length;i++) {
            framesArr[i] = Math.floor(framesArr[i]/constFPS);
            framesArr[i] = framesArr[i]==0?0:framesArr[i]-1;
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
function codecFormatsToArray(codecString,sizeString,codecIDs) {
    sizeString = (sizeString == null)?'':sizeString;
    var codecArray = codecString.split('+');
    var sizeArray = sizeString.split('.');
    var IDsArray = codecIDs ? codecIDs.split(',') : [];
    var itemSize;
    for (var i=0;i<codecArray.length;i++) {
        codecArray[i] = codecArray[i].split(':');
        itemSize = parseInt(sizeArray[i]) / 1000000;
        codecArray[i][2] = itemSize.toFixed(2);
        codecArray[i][0] = codecArray[i][0].toLowerCase();
        codecArray[i][3] = IDsArray[i];
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
    //@todo refactor to join()
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
    //@todo refactor to join()
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
    //@todo refactor to join()
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
    if (userAccount.get('indicatives') != -1) {
        for (var j=0;j<ProductList.length;j++) {
            if ( curArray[0] == ProductList[j].clipId ) {
                indDur = +ProductList[j].duration;
                break;
            };
        };
    };
    if (userAccount.get('abdicatives') != -1) {
        for (var j=0;j<ProductList.length;j++) {
            if ( curArray[endCount] == ProductList[j].clipId ) {
                abdDur = +ProductList[j].duration;
                break;
            };
        };
    };
    resultString = indDur + '.' + resultString + '.' + abdDur;
    return resultString;
};

function clipsArrayToString(curArray) {
    //@todo refactor to join()
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        resultString += curArray[i] + ',';
    };
    resultString = resultString.substr(0, resultString.length-1);
    return resultString;
};

function arrayToCommaString(curArray) {
    //@todo refactor to join()
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        resultString += curArray[i] + ',';
    };
    resultString = resultString.substr(0, resultString.length-1);
    return resultString;
};

/* reserved ???
 productTypes (string): comma-separated zeroes for each clip (including indicative/abdicative)
 Example: “0,0,0,0”
 */
function productTypesFunc(curArray){
    //@todo refactor to join()
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        resultString += '0,';
    };
    resultString = resultString.substr(0, resultString.length-1);
    return resultString;
};

function motifFramesFunc(curArray){
    //@todo refactor to join()
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
    if ( currentInd.get('isVisible') == true ) {
        resultArray.push( currentInd.get('clipObj.clipId') );
    };
    for (var i=0;i<currClipsList.length;i++) {
        resultArray.push( currClipsList[i].clipId );
    }
    if ( currentAbd.get('isVisible') == true ) {
        resultArray.push( currentAbd.get('clipObj.clipId') );
    };
    return resultArray;
};

function checkTimelineFor360() {
    for (var i=0;i<currClipsList.length;i++) {
        if (currClipsList[i].categoryId == 128) return true;
    }
    return false;
}

function getProductionMotifIds(){
    var resultArray = [];
    if ( currentInd.get('isVisible') == true ) {
        resultArray.push([]);
    };
    for (var i=0;i<curMotifsList.length;i++) {
        var tmpArr = [];
        for (var j = 0; j < curMotifsList[i].length; j++) {
            tmpArr[j] = curMotifsList[i][j].motifId;
        }
        resultArray.push( tmpArr );
    }
    if ( currentAbd.get('isVisible') == true ) {
        resultArray.push([]);
    };
    return resultArray;
};

function groupCommandsToStr(tasksArr) {
    var tasksStr = '';
    var tasksStrArr = [];
    for (var i=0;i<tasksArr.length;i++) {
        tasksStrArr[i] = tasksArr[i].opObjType + ',' + tasksArr[i].operType + ',' + tasksArr[i].grId + ',' + tasksArr[i].objId;
    };
    tasksStr = tasksStrArr.join(".");
    return tasksStr;
};

function groupAudioCommandsToStr(tasksArr) {
    var tasksStr = '';
    var audiosList = audioGrDataSource.data();
    var tasksStrArr = [];
    if ( tasksArr.length > 0 ) {
        tasksArr = [];
        for (var i=0;i<audiosList.length;i++) {
            tasksStrArr[i] = 'accountGroup2audio,add' + ',' + editGroupObj.get('groupId') + ',' + audiosList[i].audioId;
        };
        if ( groupOperationsList.length > 0 ) {
            tasksStr = '.' + tasksStrArr.join(".");
        } else {
            tasksStr = tasksStrArr.join(".");
        };
    };
    return tasksStr;
};

function prodGroupsCommandsToStr(tasksArr) {
    var tasksStr = '';
    var groupsList = groupProdDataSource.data();
    var tasksStrArr = [];
    if ( (tasksArr.length > 0) || (editProductObj.get('task') == 'addProduct') ) {
        tasksArr = [];
        for (var i=0;i<groupsList.length;i++) {
            tasksStrArr[i] = 'addGroup2Product' + '.' + groupsList[i].groupId + '.' + editProductObj.get('clipId');
        };
        if ( editProductObj.get('contentTypes').length > 0 ) {
            tasksStr = ',' + tasksStrArr.join(",");
        } else {
            tasksStr = tasksStrArr.join(",");
        };
    };
    return tasksStr;
}

function productCommandsToStr(tasksArr) {
    var tasksStr = '';
    var curArr = $.extend({},tasksArr)
    for (var i=0;i<curArr.length;i++) {
        var itemStr = 'addMotif2Product.';
        itemStr += curArr[i].motifTypeId + '.';
        itemStr += editProductObj.get('clipId') + '.';
        itemStr += (curArr[i].canLoop)?'1':'0';
        itemStr += '.';
        itemStr += (curArr[i].acceptsFilm)?'1':'0';
        itemStr += '.';
        itemStr += curArr[i].position + '.';
        itemStr += curArr[i].loaderName + '.';
        itemStr += curArr[i].contentType;
        curArr[i] = itemStr;
    }
    tasksStr = curArr.join(",");
    return tasksStr;
}

//-------------- END OF DATA CONVERTING FUNCTIONS ----------------

function saveProdPopupFunc() {
    $('#production-save-form #newProdNameInput').val( currentProduction.get('prodObj.name') );
    $('#production-save-form').submit(function(e){
        e.preventDefault();
        applySaveProdFunc();
    });
}

function applySaveProdFunc(){
    currentProduction.set('prodObj.clips',getProductionClipIds());
    currentProduction.set('prodObj.motifs',getProductionMotifIds());

    var newProdObj = {
        indicatives: +userAccount.get('indicatives'),
        abdicatives: +userAccount.get('abdicatives'),
        motifIDs: motifsArrayToString( currentProduction.get('prodObj.motifs') ),
        durationTime: 0,
        //codecFormats: 'none',
        formats: [],
        products: clipsArrayToString ( currentProduction.get('prodObj.clips') ) ,
        user: +userAccount.get('id'),
        jobName: $('#production-save-form #newProdNameInput').val(),
        audioParam:1, //always required in db, default 1
        template: 1
    };

    userAccount.set('curProduction',newProdObj.jobName);
    currentProduction.set('prodObj.name',newProdObj.jobName);

    createSingleProductionFunc(newProdObj,function(){
        getFilmsByAccount(function(){
            filmsDataSource.read();
        });
    });

    curPopupCloseFunc();
}

var codecFormatsObj = kendo.observable({
    isEnabled360format:false,
    codecFormatTypes: {},
    codecFormatsArr: [],
    audioSelectArr: audioArr,
    productionAudio: -1,
    jobNameField: currentProduction.get('prodObj.name'),
    userEmailField: '',
    formatsReqFlag: true,
    musicReqFlag: true,
    nameReqFlag: true
});

codecFormatsObj.bind("change", function(e) {
    if ( userAccount.get('onlinethreesixty') == true ) {
        if ( e.field == 'codecFormatsArr' && e.hasOwnProperty('items') && e.action == 'remove' && e.items[0] == '19') {
            $('#ch20').attr('disabled',true);
            $('#ch20:checked').attr('checked',false).trigger('change');
        }
        if ( e.field == 'codecFormatsArr' && e.hasOwnProperty('items') && e.action == 'add' && e.items[0] == '19') {
            $('#ch20').attr('disabled',false);
        }
    }
/*
    if (e.field == 'codecFormatsArr' && e.hasOwnProperty('items') && ( e.items[0] == '19' || e.items[0] == '20' ) ) {
        if (e.action == 'add') {
            if ( e.items[0] == '19' && codecFormatsObj.get('codecFormatsArr').indexOf('20') == -1 ) $('#ch20').attr('checked',true).trigger('change');
            if ( e.items[0] == '20' && codecFormatsObj.get('codecFormatsArr').indexOf('19') == -1 ) $('#ch19').attr('checked',true).trigger('change');
        }
        if (e.action == 'remove') {
            if ( e.items[0] == '19' && codecFormatsObj.get('codecFormatsArr').indexOf('20') != -1 ) $('#ch20').attr('checked',false).trigger('change');
            if ( e.items[0] == '20' && codecFormatsObj.get('codecFormatsArr').indexOf('19') != -1 ) $('#ch19').attr('checked',false).trigger('change');;
        }
    }
*/
    if ( codecFormatsObj.get('codecFormatsArr').length > 0 ) {
        codecFormatsObj.set('formatsReqFlag',false);
    } else {
        codecFormatsObj.set('formatsReqFlag',true);
    }
    if ( codecFormatsObj.get('productionAudio') > 0 ) {
        codecFormatsObj.set('musicReqFlag',false);
    } else {
        codecFormatsObj.set('musicReqFlag',true);
    }
    if ( (codecFormatsObj.get('jobNameField').trim() == currentProduction.get('prodObj.name')) || (codecFormatsObj.get('jobNameField') == '') ) {
        codecFormatsObj.set('nameReqFlag',true);
    } else {
        codecFormatsObj.set('nameReqFlag',false);
    }

    if ( codecFormatsObj.get('formatsReqFlag') || codecFormatsObj.get('musicReqFlag') || codecFormatsObj.get('nameReqFlag') ) {
        toggleBtnStatus( $('#produce-prod-popup-button') ,false);
    } else {
        toggleBtnStatus( $('#produce-prod-popup-button') ,true);
    }
})

function setAllowedCodecs() {
    var allowedList = $.extend([],codecTypes);
    for (var i=0;i<currClipsList.length;i++) {
        if ( currClipsList[i].allowedCodecs ) {
            var allowedArr = currClipsList[i].allowedCodecs.split(',');
            $.each(allowedList,function(idx,item){
                item.enabled = false;
                for (var i = 0; i < allowedArr.length;i++) {
                    if ( item.codec_type_id == allowedArr[i] ) {
                        item.enabled = true;
                        break;
                    };
                }
            });
        } else {
            $.each(allowedList,function(idx,item){
                item.enabled = false;
            });
        }
    }
    $.each(allowedList,function(i,item){
        item.tplName = item.name.split(':')[1] + '(' + item.extension.slice(1) + ')';
    });
    allowedList = sepAndSortCodecs(allowedList);
    return allowedList;
}

function produceProdPopupFunc() {
    codecFormatsObj.set('codecFormatTypes', setAllowedCodecs() );
    codecFormatsObj.set('audioSelectArr',audioArr);
    if (audioArr.length > 0) {
        codecFormatsObj.set('productionAudio',audioArr[0].audioId);
    } else {
        codecFormatsObj.set('productionAudio',1);
        $("#prodAudioSelect").data("kendoDropDownList").enable(false);
    };
    codecFormatsObj.set('codecFormatsArr',[]);
    codecFormatsObj.set('jobNameField',currentProduction.get('prodObj.name'));
    codecFormatsObj.set('userEmailField','');
    codecFormatsObj.set('isEnabled360format',checkTimelineFor360());
    kendo.bind($("#produce-form"), codecFormatsObj);
    $("[data-role=window]").kendoWindow("center");
    $('#produce-form').submit(function(e){
        e.preventDefault();
        toggleBtnStatus( $('#produce-prod-popup-button') ,false);
        applyProduceProdFunc();
    });
}

function initProductionAudio() {
    var audioObj = $.extend( true, {}, audioArr[0] );
    $('#playCurAudio').attr('src','/data/audio/audio_' + audioObj.audioId + audioObj.extension);
}

function onSelectProductionAudio(e) {
    var item = e.item;
    //var selectedVal = parseInt( this.dataItem( e.item[0].value ).audioId );
    var selectedVal = item.text();
    var audioObj = {};
    for (var i=0;i<audioArr.length;i++) {
        if ( audioArr[i].name == selectedVal ) {
            audioObj = $.extend( true, {}, audioArr[i] );
        };
    };
    if ( codecFormatsObj.get('productionAudio') != -1 ) {
        $('#playCurAudio').removeClass('playing').attr('src','/data/audio/audio_' + audioObj.audioId + audioObj.extension);
        toggleBtnStatus( $('#play-audio-edit-button') ,true);
    } else {
        $('#playCurAudio').removeClass('playing').attr('src','');
        toggleBtnStatus( $('#play-audio-edit-button') ,false);
    };
    $('#play-audio-button').each(function(){
        $(this).find('.play').css('opacity',1);
        $(this).find('.stop').css('opacity',0);
    });
};

function applyProduceProdFunc() {
    currentProduction.set('prodObj.clips',getProductionClipIds());
    currentProduction.set('prodObj.motifs',getProductionMotifIds());

    var newProdObj = {
        indicatives: +userAccount.get('indicatives'),
        abdicatives: +userAccount.get('abdicatives'),
        companyID: +userAccount.get('groupId'),
        motifFrames: motifFramesFunc( currentProduction.get('prodObj.motifs') ),
        durations: '',
        jobName: codecFormatsObj.get('jobNameField').trim(),
        //codecFormats: codecFormatsToString( codecFormatsObj.get('codecFormatsArr') ) ,
        formats: codecFormatsObj.get('codecFormatsArr').slice() ,
        previewFrames: previewFramesStringFunc( currentProduction.get('prodObj.clips') ) ,
        motifIDs: motifsArrayToString( currentProduction.get('prodObj.motifs') ),
        specialIntroMusic:0,
        durationTime: clipsDurationToString( currentProduction.get('prodObj.clips') ),
        status:0,
        template:0,
        user: +userAccount.get('id'),
        audioParam: codecFormatsObj.get('productionAudio'),
        products: clipsArrayToString ( currentProduction.get('prodObj.clips') ) ,
        productTypes: productTypesFunc( currentProduction.get('prodObj.clips') ),
        email: codecFormatsObj.get('userEmailField')
    };

    userAccount.set('curProduction',newProdObj.jobName);
    currentProduction.set('prodObj.name',newProdObj.jobName);

    createSingleProductionFunc(newProdObj,function(){
        userAccount.get('inProduction').push(userAccount.get('lastProdId'));
/*
        tmpFilm = {
            accountID: +userAccount.get('id'),
            filmId: +userAccount.get('lastProdId'),
            name: codecFormatsObj.get('jobNameField').trim(),
            duration: 0,
            durTime: '00:00 min',
            crTime: parseInt((new Date()).getTime()/1000),
            crDate: dateFormating( parseInt((new Date()).getTime()/1000) ),
            status: 0
        };
*/
        getFilmsByAccount(function(){
            //tmpFilmsList.push(tmpFilm);
            //filmsList = filmsList.concat(tmpFilmsList);
            userAccount.set("productsVal", filmsList.length );
            checkProductionStatus();
            setTimeout(function(){
                filmsDataSource.read();
            },500);
        });
        curPopupCloseFunc(function(){
            setTimeout(function(){
                shortPopupCallFunct('dialog-popup', 'produce-dialog-tmp');
                toggleBtnStatus( $('#produce-prod-popup-button') ,true);
            },350);
        });
    });
};

function createPreviewProduction() {
    //create preview from admin detail product page
    var newProdObj = {
        is_preview: 1,
        indicatives: -1,
        abdicatives: -1,
        companyID: +userAccount.get('groupId'),
        motifFrames: 1,
        durations: '',
        jobName: editProductObj.get('name'),
        formats: ["7"] ,
        previewFrames: "" ,
        motifIDs: -1,
        specialIntroMusic:0,
        durationTime: '0.' + editProductObj.get('duration') + '.0',
        status:0,
        template:0,
        user: +userAccount.get('id'),
        audioParam: 1,
        products: editProductObj.get('clipId'),
        productTypes: "0"
    };
    createSingleProductionFunc(newProdObj,function(){
        shortPopupCallFunct('dialog-popup', 'preview-created-tmp');
    });
};

function logOutAfterProduce(){
    curPopupCloseFunc();
    logOut();
};

function goHubAfterProduce(){
    curPopupCloseFunc();
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

    statisticUser.set('userName', userAccount.get('firstName') + ' ' + userAccount.get('surName'));
    statisticUser.set('statEndDate',curTime);
    statisticUser.set('statStartDate', Math.floor( (strStartTime.getTime())/1000 ) );

    statisticUser.set('statStartDateString', strStartTime.toLocaleDateString() );
    statisticUser.set('statEndDateString', strEndTime.toLocaleDateString() );

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
            var dataAssetsArr = (data.Statistics.AssetCounts.length==0)?[]:data.Statistics.AssetCounts.AssetCount,
                dataUsagesArr = (data.Statistics.ProductUsages.length==0)?[]:data.Statistics.ProductUsages.ProductUsage,
                tmpFilmCount = 0,
                tmpClipCount = 0;

            ProductionsStatArr = [];
            ProductUsageStatArr = [];

            for (var i=0; i<dataAssetsArr.length; i++) {
                ProductionsStatArr.push([
                    {v: dataAssetsArr[i].Timestamp ,f: dataAssetsArr[i].Date},
                    {v: +dataAssetsArr[i].FilmCount ,f: dataAssetsArr[i].FilmCount},
                    {v: +dataAssetsArr[i].ClipCount ,f: dataAssetsArr[i].ClipCount}
                ]);
                tmpFilmCount += parseInt( dataAssetsArr[i].FilmCount );
                tmpClipCount += parseInt( dataAssetsArr[i].ClipCount );
            };
            for (var i=0; i<dataUsagesArr.length; i++){
                ProductUsageStatArr.push([
                    dataUsagesArr[i].Name,
                    {v:+dataUsagesArr[i].Count ,f:dataUsagesArr[i].Count}
                ]);
            };

            statisticUser.set('TotalFilmCount',data.Statistics.TotalFilmCount);
            statisticUser.set('TotalClipCount',data.Statistics.TotalClipCount);
            statisticUser.set('TimespanFilmCount',tmpFilmCount);
            statisticUser.set('TimespanClipCount',tmpClipCount);

            if (callback && typeof(callback) === "function") {
                callback();
            }
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
    };
};

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
    };
};

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
        startDate = new Date(startDate);
        statisticUser.set('statStartDateString', startDate.toLocaleDateString() );
        startDate = Math.floor( startDate.getTime()/1000 );
        endDate = new Date(endDate);
        statisticUser.set('statEndDateString', endDate.toLocaleDateString() );
        endDate = Math.floor( endDate.getTime()/1000 ) + 86399;
        statisticUser.set('statStartDate',startDate);
        statisticUser.set('statEndDate',endDate);

        getStatisticsFunc(function(){
            initCharts();
            curPopupCloseFunc();
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

    var clipTypesField = [
        {text:currLang["All"],value:"All"}
    ];
    $.each(clipFormats,function(i,item){
        clipTypesField.push({text:item.name,value:item.product_type_id});
    })

    clipsFilterModel = kendo.observable({
        clipTypesArr: clipTypesField,
        locationArr: clipsLocArr,
        motifNamesArr: motifsTypeNamArr,
        sortSelect: clipsSortingField
    });
    kendo.bind($("#clips-filter"), clipsFilterModel);

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


//------admin account API calls
function getAccountList(callback) {
    $.ajax({
        type: "GET",
        url: urlGen('getAccountList') ,
        cache: false,
        success: function (data) {
            var dataArr = data.Accounts.Account;
            accountsArr = [];
            for (var i=0; i<dataArr.length; i++){
                var curObj = {
                    accId: parseInt( dataArr[i].Id ),
                    accountGroupID: parseInt(dataArr[i].AccountGroupID),
                    languageIsoCode: dataArr[i].LanguageIsoCode,
                    loginUsername: dataArr[i].LoginUsername,
                    name: dataArr[i].Name,
                    lastName: dataArr[i].LastName,
                    email: dataArr[i].Email,
                    isActive: parseInt(dataArr[i].IsActive),
                    multilogin: parseInt(dataArr[i].multilogin),
                    quota: parseInt(dataArr[i].Quota),
                    budget: parseInt(dataArr[i].Budget)
                };
                for (var j=0;j<groupArr.length;j++) {
                    if ( curObj.accountGroupID == groupArr[j].groupId ) {
                        curObj.accountGroupName = groupArr[j].name;
                        break;
                    };
                };
                accountsArr.push(curObj);
            };

            accountsDataSource.read();
            loadingInc(++progressVal);
            //logStr = logStr + 'ended getAccountList' + new Date() + '   |   ';
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function getAccountGroupList(callback) {
    $.ajax({
        type: "GET",
        url: urlGen('getAccountGroupList') ,
        cache: false,
        success: function (data) {
            var dataArr = data.AccountGroups.AccountGroup;
            groupArr = [];
            for (var i=0; i<dataArr.length; i++){
                groupArr.push({
                    groupId: dataArr[i].ID,
                    name: dataArr[i].Name,
                    indicative: dataArr[i].Indicative,
                    abdicative: dataArr[i].Abdicative,
                    description: dataArr[i].Description,
                    onlinethreesixty: dataArr[i].onlinethreesixty,
                    groupCustomField: '',
                    groupCustomObligate: 0
                });
            };

            groupsDataSource.read();
            loadingInc(++progressVal);
            //logStr = logStr + 'ended getAccountGroupList' + new Date() + '   |   ';
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function getProductGroupList(callback) {
    $.ajax({
        type: "GET",
        url: urlGen('getProductGroupList') ,
        cache: false,
        success: function (data) {
            /*data = data.replace(/&/g, "&amp;");*/
            var dataArr = data.ProductGroups.ProductGroup;
            prodGroups = [];
            for (var i=0; i<dataArr.length; i++){
                prodGroups.push({
                    categoryId: parseInt(dataArr[i].ID),
                    productGroupParentID: dataArr[i].ProductGroupParentID ,
                    productGroupName: dataArr[i].ProductGroupName
                });
            };
            loadingInc(++progressVal);
            //logStr = logStr + 'ended getProductGroupList' + new Date() + '   |   ';
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function getAudioList(callback) {
    var dfd = new $.Deferred();

    $.ajax({
        type: "GET",
        url: urlGen('getAudioList') ,
        cache: false,
        success: function (data) {
            var dataArr = data.Audios.Audio;

            audioArr = [];
            for ( var i=0; i<dataArr.length; i++ ) {
                var groupIDsArr = [];
                for (var j=0; j<dataArr[i].AccountGroupIDs.length; j++) {
                    groupIDsArr.push( parseInt( dataArr[i].AccountGroupIDs[j] ) );
                };

                if ((userAccount.get('groupId') == 1) ||
                    (
                        (userAccount.get('groupId') != 1)&&
                        ($.inArray(userAccount.get('groupId'), groupIDsArr) > -1)
                    ))
                {
                    var curObj = {
                        audioId: parseInt( dataArr[i].ID ),
                        name: dataArr[i].Name,
                        mediaFormatID: parseInt(dataArr[i].MediaFormatID),
                        creationTime: parseInt(dataArr[i].CreationTime),
                        accountID: (dataArr[i].AccountID == null)?0:parseInt(dataArr[i].AccountID) ,
                        groupIDs: groupIDsArr
                    };
                    curObj.accountName = '';
                    if ( curObj.accountID != 0 ) {
                        for ( var j=0; j<accountsArr.length; j++ ) {
                            if ( curObj.accountID == accountsArr[j].accId ) {
                                curObj.accountName = accountsArr[j].loginUsername;
                                break;
                            };
                        };
                    };
                    for (var j=0;j<fileExtensionsArr.length;j++) {
                        if ( curObj.mediaFormatID == fileExtensionsArr[j].id ) {
                            curObj.mediaFormat = fileExtensionsArr[j].name + '(' + fileExtensionsArr[j].extension + ')';
                            curObj.extension = fileExtensionsArr[j].extension;
                            break;
                        };
                    };
                    audioArr.push(curObj);
                }
            };

            audioDataSource.read();
            dfd.resolve();
            loadingInc(++progressVal);
            //logStr = logStr + 'ended getAudioList' + new Date() + '   |   ';
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
    return dfd.promise();
};

function getContentFormats(callback) {
    $.ajax({
        type: "GET",
        url: urlGen('getContentFormats') ,
        cache: false,
        success: function (data) {
            var dataArr = data.ContentFormats.ContentFormat;
            motifTypesArr = [];
            for(var i=0 , l=dataArr.length; i < l; i++){
                    motifTypesArr.push({
                    motifTypeId: parseInt(dataArr[i].ID),
                    aspect: parseFloat( dataArr[i].Aspect ),
                    iconWidth: checkIconWidth(parseFloat(dataArr[i].Aspect)),
                    name: dataArr[i].Name,
                    width: +dataArr[i].width,
                    height: +dataArr[i].height
                });
            };
            motifTypeDataSource.read();
            loadingInc(++progressVal);
            //logStr = logStr + 'ended getContentFormats' + new Date() + '   |   ';
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function checkIconWidth(aspect) {
    return w = (aspect*18 < 7) ? 7 : aspect*18;
};

function getOpenProductionList(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('getOpenProductionList') ,
        cache: false,
        success: function (data) {
            var dataArr = data.Productions.Production;
            openProdsArr = [];
            for(var i=0; i < dataArr.length; i++){
                openProdsArr.push({
                    prodId: dataArr[i].ID ,
                    name: dataArr[i].Name ,
                    creationTime: new Date( parseInt( dataArr[i].CreationTime )*1000 ),
                    updateTime: new Date( parseInt( dataArr[i].UpdateTime )*1000 ),
                    status: dataArr[i].Status ,
                    userName: dataArr[i].UserName ,
                    priority: dataArr[i].Priority ,
                    clipFrameCount: dataArr[i].ClipFrameCount
                });
            };

            openedProdsDataSource.read();

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function getFinishedProductionList(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('getFinishedProductionList') ,
        cache: false,
        success: function (data) {
            var dataArr = data.Productions.Production;
            finishedProdsArr = [];
            for(var i=0; i < dataArr.length; i++){
                finishedProdsArr.push({
                    prodId: dataArr[i].ID,
                    name: dataArr[i].Name,
                    creationTime: new Date( parseInt( dataArr[i].CreationTime )*1000 ),
                    updateTime: new Date( parseInt( dataArr[i].UpdateTime )*1000 ),
                    userName: dataArr[i].UserName ,
                    priority: dataArr[i].Priority ,
                    clipFrameCount: dataArr[i].ClipFrameCount
                });
            };

            finishedProdsDataSource.read();

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function updateProductionPriority(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('updateProductionPriority') ,
        cache: false,
        data: {
            productionID: openedProdObj.get('prodId'),
            priority: openedProdObj.get('priority')
        },
        success: function (data) {
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

// admin section objects API calls

function workOnAccount(callback) {
    var accountOperation = '';
    if ( editAccObj.get('accId') == -1 ) {
        accountOperation = 'createAccount';
    } else {
        accountOperation = 'updateAccount';
    };

    var accObj = {
        accountGroupId: parseInt(editAccObj.get('groupField')),
        username:editAccObj.get('usernameField'),
        firstName:editAccObj.get('firstnameField'),
        email:editAccObj.get('emailField'),
        task: accountOperation,
        is_active: (editAccObj.get('accActivField'))?1:0,
        multilogin: (editAccObj.get('multilogin'))?1:0,
        language_iso_code:editAccObj.get('languageField'),
        lastName:editAccObj.get('lastnameField'),
        quota:editAccObj.get('quotaField'),
        budget:editAccObj.get('budgetField'),
        accountId:editAccObj.get('accId')
    };

    if ( editAccObj.get('passwordField') != '' ) {
        accObj.password = editAccObj.get('passwordField');
    };

    $.ajax({
        type: "POST",
        url: urlGen('workOnAccount') ,
        cache: false,
        data: accObj,
        success: function (data) {
            var answerData = data + '';
            if ( answerData.search("ERR_USER_UNIQUE") == '-1' ) {
                var curAccId = data.ID;
                editAccObj.set('accId', parseInt(curAccId) );
                getAccountList();
                shortPopupCallFunct('dialog-popup','saved-popup-tmp');
            } else {
                shortPopupCallFunct('dialog-popup','username-popup-tmp');
            };

            editAccObj.set('isVisible',false);
            toggleBtnStatus( $('#delete-account-button , #save-account-button') ,false);

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};


function deleteByAdmin(prm,id,itemType,callback) {
    $.ajax({
        type: "POST",
        url: urlGen('deleteByAdmin') ,
        cache: false,
        data: {
            permanent:prm,
            itemID:id,
            targetItem:itemType
        },
        success: function (data) {
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function saveAudio(callback) {
    var inputFiles = document.getElementById('audio-input-file').files;
    var audioUploadData = new FormData();

    audioUploadData.append( "mediaFormatID", editAudioObj.get('mediaFormatID'));
    audioUploadData.append( "name", editAudioObj.get('name'));
    audioUploadData.append( "task", editAudioObj.get('task'));
    if ( editAudioObj.get('task') == 'updateAudio' ) {
        audioUploadData.append( "audioID", parseInt(editAudioObj.get('audioId')) );
    };
    if ( inputFiles.length > 0 ) {
        audioUploadData.append( "Filedata", inputFiles[0]);
        audioUploadData.append( "Filename", inputFiles[0].name);
    } else {
        audioUploadData.append( "Filename", editAudioObj.get('name'));
    };

    $('#audio-upload-progressbar').show(100);

    $.ajax({
        type: "POST",
        url: urlGen('uploadAudio') ,
        cache: false,
        processData: false,
        contentType: false,
        data: audioUploadData,
        xhr: function() {
            myXhr = $.ajaxSettings.xhr();
            var motifProgressBar = $('#audio-upload-progressbar').data("kendoProgressBar");
            if(myXhr.upload){ // check if upload property exists
                myXhr.upload.addEventListener('progress',function(e){
                    var pc = parseInt(e.loaded / e.total * 100);
                    motifProgressBar.value(pc);
                }, false);
            }
            return myXhr;
        },
        success: function (data) {
            editAudioObj.set('audioId',parseInt(data.Audio));

            router.navigate('/adm-audio');
            getAudioList(function(){
                $('#playCurAudio').removeClass('playing').attr('src','');
            });

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function getProductAssociations(curGroupId,callback) {
    $.ajax({
        type: "POST",
        url: urlGen('getProductAssociations') ,
        cache: false,
        data: {
            accountGroupID: parseInt(curGroupId)
        },
        success: function (data) {
            var dataArr = data.ProductIDs.ProductID;
            currGroupProdIds = [];
            for(var i=0; i < dataArr.length; i++){
                currGroupProdIds.push( parseInt( dataArr[i] ) );
            };
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function getGroupAssociations(curProductId,callback) {
    $.ajax({
        type: "POST",
        url: urlGen('getGroupAssociations') ,
        cache: false,
        data: {
            productID: parseInt(curProductId)
        },
        success: function (data) {
            var dataArr = data.AccountGroupIDs.AccountGroupID;
            currProdGroupIds = [];
            for(var i=0; i < dataArr.length; i++){
                currProdGroupIds.push( parseInt( dataArr[i] ) );
            };
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function workOnAccountGroup(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('workOnAccountGroup') ,
        cache: false,
        data: {
            accountGroupID: editGroupObj.get('groupId'),
            groupName: editGroupObj.get('name'),
            groupIndicative: isNaN(editGroupObj.get('indicative'))?-1:editGroupObj.get('indicative'),
            groupAbdicative: isNaN(editGroupObj.get('abdicative'))?-1:editGroupObj.get('abdicative'),
            groupDescription:editGroupObj.get('description'),
            groupCustom:editGroupObj.get('groupCustomField'),
            associationTasks: groupCommandsToStr(groupOperationsList) + groupAudioCommandsToStr(groupAudioOperationsList),
            task: ( editGroupObj.get('groupId') == -1 ) ? 'createAccountGroup' : 'updateAccountGroup',
            groupCustomObligate: editGroupObj.get('groupCustomObligate'),
            onlinethreesixty: (editGroupObj.get('onlinethreesixty'))?1:0
        },
        success: function (data) {
            if ( editGroupObj.get('groupId') == -1 ) {
                editGroupObj.set('groupId', parseInt( data.ID ) );
            };
            getAccountGroupList(function(){
                getProductGroupList();
                getContentFormats();
                getAccountList();
                getAudioList();
                tempGroupUID = '';
                curPopupCloseFunc();
            });

            editGroupObj.set('isVisible',false);
            toggleBtnStatus( $('#delete-group-button , #save-group-button') ,false);

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function workOnContentFormat(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('workOnContentFormat') ,
        cache: false,
        data: {
            contentFormatID: editMotifTypeObj.get('motifTypeId'),
            contentFormatName: editMotifTypeObj.get('name'),
            contentFormatAspect: editMotifTypeObj.get('aspect'),
            task: ( editMotifTypeObj.get('motifTypeId') == -1 ) ? 'createContentFormat' : 'updateContentFormat',
            width: editMotifTypeObj.get('width'),
            height: editMotifTypeObj.get('height')
        },
        success: function (data) {
            if (( editMotifTypeObj.get('motifTypeId') == -1 ) && (data != null)) {
                editMotifTypeObj.set('motifTypeId', parseInt(data.ContentFormatID) );
            };

            router.navigate('/adm-motif-types');
            getContentFormats();

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
}

function checkProductID(callback) {
    if ( (editProductObj.get('task') == 'updateProduct') && (editProductObj.get('clipId')==editProductObj.get('selectedClipId')) ) {
        workOnProduct(function(){
            getProductListByAccount(function(){
                getDicativesByAccount(function(){
                    getContentTypeListByAccount(function() {
                        countClipMotifs();
                    });
                })
            });
        });
    } else if ( editProductObj.get('task') == 'addProduct' ) {
        checkAndAdd();
    } else if ( editProductObj.get('clipId')!=editProductObj.get('selectedClipId') ) {
        console.log('changed ID for selected product');
        editProductObj.set('task','addProduct');
        checkAndAdd();
    } else {
        console.log('no such task');
    };

    function checkAndAdd() {
        $.ajax({
            type: "POST",
            url: urlGen('checkProductID') ,
            cache: false,
            data: {
                newProductID: editProductObj.get('clipId')
            },
            success: function (data) {
                var existProdIdCnt = parseInt(data.Result.Count);
                if ( existProdIdCnt > 0 ) {
                    shortPopupCallFunct('dialog-popup','product-id-popup-tmp',function(){
                        //window renew function
                        $('#curr-adm-product-id').html( editProductObj.get('clipId') );
                    });
                } else if ( existProdIdCnt == 0 ) {
                    workOnProduct(function(){
                        getProductListByAccount(function(){
                            getDicativesByAccount(function(){
                                getContentTypeListByAccount(function() {
                                    countClipMotifs();
                                });
                            })
                        });
                    });
                };

                if (callback && typeof(callback) === "function") {
                    callback();
                }
            }
        });
    };
};

function workOnProduct(callback) {
    $.ajax({
        type: "POST",
        url: urlGen('workOnProduct') ,
        cache: false,
        data: {
            productID: parseInt(editProductObj.get('clipId')),
            productName: editProductObj.get('name'),
            productFrameCount: parseInt(editProductObj.get('duration')),
            productPreviewFrame: parseInt(editProductObj.get('previewFrame')),
            productCategoryID: editProductObj.get('categoryId'),
            productLocation: editProductObj.get('location'),
            productDescription: editProductObj.get('description'),
            is_dicative: ( (editProductObj.get('categoryId')==5000)||(editProductObj.get('categoryId')==5001) ) ? 1 : 0,
            task: editProductObj.get('task'),
            commands: productCommandsToStr(editProductObj.get('contentTypes')) + prodGroupsCommandsToStr(prodGroupsOperationsList),
            productType: parseInt(editProductObj.get('productType')),
            codecType: editProductObj.get('allowedCodecs').slice(),
            resolution: editProductObj.get('resolution'),
            can_reformat: editProductObj.get('can_reformat')==true ? 1 : 0,

            MasterProductId: editProductObj.get('master_ID'),
            InFrame: editProductObj.get('inFrame'),
            OutFrame: editProductObj.get('outFrame')
        },
        success: function (data) {
            editProductObj.set('isVisible',false);
            toggleBtnStatus( $('#delete-adm-product-button , #save-adm-product-button') ,false);
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};
var filmsBtnsToDisable = $('#deleteFilm , #downloadFilm , #loadFilm'),
    productionBtnsToDisable = $('#deleteClipButton , #replaceClipButton , #deleteClipButton2 , #replaceClipButton2, #deleteClipButton3 , #replaceClipButton3'),
    productionProduceBtn = $('#produceProdBtn , #produceProdBtn2'),
    productionInsertBtns = $('#insertClipBtn,#insertClipBtn2,#insertClipBtn3,#timeline-insert-button'),
    deleteMotifBtn = $('#delete-motif-btn , #delete-motif-btn2'),
    applyMotifBtn = $('#applyMotifBtn , #applyMotifBtn2'),
    applyClipBtn = $('#applyClipBtn , #applyClipBtn2'),
    productionSaveBtn = $('#saveProduction');
    fillBtn = $('#fillAllModeBtn');

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
        //themeSelectInit();
        localSelectInit();
    },
    show: function(e) {
        if ( currLang != undefined ) {
            localizeHtml($('#page'));
        };
    }
});

var loadingPage = new kendo.View("#loading",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
    }
});

var hubPage = new kendo.View("#hub",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
        if ( userAccount.get("groupId") == 1 ) {
            $('#page').addClass('admin-acc');
        } else {
            $('#page').removeClass('admin-acc');
        };
    }
});

var logoutPage = new kendo.View("#logout",{
    init: function(e){
        //themeSelectInit();
        localSelectInit();
    },
    show: function(e){
        if ( currLang != undefined ) {
            localizeHtml($('#page'));
        };
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
        $('.hide-block').removeClass('visible');
        $('.show-block').removeClass('hidden');
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
        $('#films-list').data("kendoListView").clearSelection();
        toggleBtnStatus(filmsBtnsToDisable,false);
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
        kendo.bind($("#currIndikativ"), currentInd);
        kendo.bind($("#currAbdikativ"), currentAbd);
        switchOffFillMotifsMode();
    },
    show: function(e) {
        initImageGrid();
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

function loginCheckFunc(e) {
    e.preventDefault();
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
    toggleBtnStatus( $('#applyMotifPreviewBtn') ,false);
    toggleBtnStatus(deleteMotifBtn,false);
    toggleBtnStatus(applyMotifBtn,false);
};

function motifListViewChangeFunc() {
    toggleBtnStatus(deleteMotifBtn,true);
    toggleBtnStatus(applyMotifBtn,true);
    toggleBtnStatus( $('#applyMotifPreviewBtn') ,true);

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
};


function apllyDeleteMotifFunc() {
    for (var i=0; i < selectedMotifUid.length ; i++) {
        var curDelItem = motifsDataSource.getByUid(selectedMotifUid[i]);
        motifsDataSource.remove(curDelItem);
        if ( i != selectedMotifUid.length-1 ) {
            deleteMotifFunc(selectedMotifId[i]);
        } else {
            deleteMotifFunc(selectedMotifId[i],function(){
                getMotifListByAccount();
            });
        }
    };

    curPopupCloseFunc();

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
    $('#motif-upload-form .img-wr p').show();
    $('#saveMotifBtn').data("kendoButton").enable(false);
    $('#upload-input').attr('accept',motifUploadAcceptStr);

    $('#motif-upload-form').submit(function(e){
        e.preventDefault();
        applySaveMotifFunc();
    });

    setTimeout(function(){
        $("#upload-input").on('change',function(){
            var loadedMotif = this.files[0];
            uploadMotifFunc(loadedMotif,function(){
                $("#newMotifName").trigger('focus');
            });
        });
    },200);
};

function applySaveMotifFunc() {
    saveMotifFunc();
    curPopupCloseFunc();
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
                videoSizes: { type: "default" },
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
        var filmTmp = filmsDataSource.getByUid(selectedFilmUid[0]);
        if ( !(typeof filmTmp.videoFiles !== 'undefined' && filmTmp.videoFiles !== null) ) {
            toggleBtnStatus($('#downloadFilm'),false);
        } else if (filmTmp.videoSizes.length == 0 ) {
            toggleBtnStatus($('#downloadFilm'),false);
        };
    };
    if ( selectedFilmUid.length > 1 ) {
        toggleBtnStatus($('#loadFilm'),false);
        toggleBtnStatus($('#downloadFilm'),false);
    };

    $(".html5lightbox-link").html5lightbox();
};

function onSelectFilterFilms(e) {
    var dataItem = this.dataItem(e.item);
    var sortingDirection = 'asc';
    if ( dataItem.value == 'crTime' ) {
        sortingDirection = 'desc';
    };

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

    curPopupCloseFunc();

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
    var lastname = '';
    if ( (downloadList.length) ) {
        if ( curFilm.crTime < 1497884400 ) { //1497906000
            if (curFilm.videoFiles[0][0] != 'none' && curFilm.urlHash) {
                for (var i=0; i < curFilm.videoFiles.length; i++){
                    var href = '/' + curFilm.urlHash + '/film_' + curFilm.filmId + '_' + curFilm.videoFiles[i][1] + '.' + curFilm.videoFiles[i][0] ;
                    var name = curFilm.name + "_" + curFilm.videoFiles[i][1];
                    var label = curFilm.name + '_' + curFilm.videoFiles[i][1] + '.' + curFilm.videoFiles[i][0] + ' - ' + curFilm.videoFiles[i][2] + ' MB';
                    var videoUrl = window.location.protocol + '//film.' + window.location.host.replace('www.','') + '/download.php?name=' + encodeURIComponent(name)
                        + '&href=' + encodeURIComponent(href) + '&label=' + encodeURIComponent(label);
                    listContent += '<li><iframe src="' + videoUrl + '" frameborder="0"></iframe></li>';

                    if (i == curFilm.videoFiles.length-1) {
                        lastname = label + ' WWWWWWW';
                    }
                }
            } else {
                listContent += "<li>Unfortunately we don't support so old film productions, please produce your films again.</li>"; //@todo translate text
            }
        } else {
            if ( curFilm.formats.length ) {
                for (var i=0; i < curFilm.formats.length; i++){
                    if ( curFilm.formats[i] == '20' ) {
                        var href = window.location.protocol + '//film.' + window.location.host.replace('www.','') + '/krpano/index.php?xml=videopano.xml?p=' + curFilm.urlHash + ':' + curFilm.filmId;
                        var text = currLang['Open360Viewer'];
                        listContent += '<li><a href="' + href + '" target="_blank">' + text + '</a></li>';
                    } else {
                        var curCodec = $.grep(codecTypes,function(item,j){
                            return curFilm.formats[i] == item.codec_type_id;
                        })[0];
                        var href = '/' + curFilm.urlHash + '/film_' + curFilm.filmId + '_' + curCodec.codec_type_id + curCodec.extension ;
                        var name = curFilm.name + "_" + curCodec.resName;
                        var label = curFilm.name + '_' + curCodec.resName + curCodec.extension + ' - ' + (parseInt(curFilm.videoSizes[i]) / 1048576).toFixed(2) + ' MB';
                        var videoUrl = window.location.protocol + '//film.' + window.location.host.replace('www.','') + '/download.php?name=' + encodeURIComponent(name)
                            + '&href=' + encodeURIComponent(href) + '&label=' + encodeURIComponent(label);
                        listContent += '<li><iframe src="' + videoUrl + '" frameborder="0"></iframe></li>';

                        if (i == curFilm.videoFiles.length-1) {
                            lastname = label + ' WWWWWWW';
                        }
                    };
                }
                listContent += '<li style="height:0;margin:0;overflow:hidden;"><a>' + lastname + '</a></li>';
            }
        }
        if ( curFilm.urlHash ) {
            $('#download-page-link').attr('href',window.location.protocol + '//film.' + window.location.host.replace('www.','') + '/index.php?film=' + curFilm.urlHash);
            var remainsDate = new Date(parseInt(curFilm.crTime+'000'));
            remainsDate.setDate(remainsDate.getDate() + 30);
            $('#download-page-term').text( remainsDate.toLocaleDateString() );
        } else {
            $('#download-page-link').parent().hide();
        }
        $(downloadList).html(listContent);

    } else {
        $(downloadList).html("<li>This production is not yet sent to produce</li>"); //@todo translate text
    };
};

function loadProdDialogFunc() {
    var curItem = filmsDataSource.getByUid(selectedFilmUid);
    console.log('----/current film/----');
    /*console.log(curItem);*/
    $('#curr-film-name').text(curItem.name);
};

function loadProdFunc() {

    var curItem = filmsDataSource.getByUid(selectedFilmUid),
        clipIDsArr = prodStringToArray(curItem.products),
        motifIDsArr = stringToArray(curItem.motifs);
    if ( clipIDsArr[0] == userAccount.get('indicatives') ) {
        clipIDsArr = clipIDsArr.slice(1);
        motifIDsArr = motifIDsArr.slice(1);
    }
    if ( clipIDsArr[clipIDsArr.length-1] == userAccount.get('abdicatives') ) {
        clipIDsArr = clipIDsArr.slice(0,-1);
        motifIDsArr = motifIDsArr.slice(0,-1);
    }
    currentProduction.set('prodObj.name',curItem.name);
    currentProduction.set('prodObj.durTime',curItem.durTime);
    currentProduction.set('prodObj.clips',clipIDsArr);
    currentProduction.set('prodObj.motifs',motifIDsArr);

    userAccount.set('curProduction',curItem.name);

    curPopupCloseFunc();

    router.navigate('/production');
    productionManageFunc(false,function(){
        currClipMotifsList = [];
        populateProdMotifsArr(function(){
            //checkEmptyMotifs();
            currentProdMotifsDataSource.read();
            currentProdClipsDataSource.read();
            recalcProductionTime();

            toggleBtnStatus(productionBtnsToDisable,true);
            toggleBtnStatus(fillBtn,true);
            toggleBtnStatus(productionInsertBtns,true);

            $(".html5lightbox-link").html5lightbox();
        });
    });

};

function newProdDialogFunc() {
    console.log('NEW PRODUCTION');

    currentProduction.set('prodObj',defProductionParams);
    userAccount.set('curProduction',defProductionParams.name);

    curPopupCloseFunc();

    router.navigate('/production');

    toggleBtnStatus(productionInsertBtns,true);

    productionManageFunc(true,function(){
        currClipMotifsList = [];
        currMotifTypesList = [];
        if ( $('#fillAllModeBtn').hasClass('active') ) {
            $('#fillAllModeBtn').click();
        }
        populateProdMotifsArr(function(){
            checkEmptyMotifs();
            currentProdMotifsDataSource.read();
            currentProdClipsDataSource.read();

            toggleBtnStatus(productionBtnsToDisable,false);
            toggleBtnStatus(fillBtn,false);
            toggleBtnStatus(productionProduceBtn,false);
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
                productType: { type: "string"},
                allowedCodecs: { type: "string"},
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
};

function exclude360clips() {
    var filter360 = { field: "categoryId", operator: "gt", value: 0 };
    if ( (currClipsList.length > 1) || ((currClipsList.length == 1)&& (currClipsList[0].categoryId != 128)) ) filter360 = { field: "categoryId", operator: "neq", value: 128 };
    return filter360;
};

function stillTypeFilter() {
    var filterStillTypeProduction = { field: "categoryId", operator: "gt", value: 0 };
    if ( currClipsList.length && !location.hash.includes('replace') ) {
        filterStillTypeProduction = { field: 'productType', operator: 'eq', value: '2' };
        if ( currClipsList[0].productType != 2 ) {
            filterStillTypeProduction.operator = 'neq';
        }
    }
    return filterStillTypeProduction;
}

//start of satanic filter funcions todo:filters needs refactoring!!!
function onSelectFilterClips0(e) {
    var select0val = e.sender.dataItem(e.item).value,
        select1val = $('#filterClipsSelect1').data("kendoDropDownList").value(),
        select2val = $('#filterClipsSelect2').data("kendoDropDownList").value(),
        select3val = $('#filterClipsSelect3').data("kendoDropDownList").value(),
        select0field , select1field , select2field ,
        searchField = { field: "name", operator: "contains", value: $('#clip-search-field').val() };

    if (select0val!='All') {
        select0field = { field: "productType", operator: "eq", value: select0val };
    } else {
        select0field = { field: "productType", operator: "neq", value: select0val };
    };

    if (select1val!='All') {
        select1field = { field: "location", operator: "eq", value: select1val };
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
            filters: [ select0field, select1field, select2field, searchField, exclude360clips(), stillTypeFilter() ]
        },
        sort: [ {field: select3val , dir: "asc"} ]
    });

    toggleBtnStatus(applyClipBtn,false);
}

function onSelectFilterClips1(e) {
    var select0val = $('#filterClipsSelect0').data("kendoDropDownList").value(),
        select1val = e.item.text(),
        select2val = $('#filterClipsSelect2').data("kendoDropDownList").value(),
        select3val = $('#filterClipsSelect3').data("kendoDropDownList").value(),
        select0field , select1field , select2field ,
        searchField = { field: "name", operator: "contains", value: $('#clip-search-field').val() };

    if (select0val!='All') {
        select0field = { field: "productType", operator: "eq", value: select0val };
    } else {
        select0field = { field: "productType", operator: "neq", value: select0val };
    };

    if (select1val!='All') {
        select1field = { field: "location", operator: "eq", value: select1val };
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
            filters: [ select0field, select1field, select2field, searchField, exclude360clips(), stillTypeFilter() ]
        },
        sort: [ {field: select3val , dir: "asc"} ]
    });

    toggleBtnStatus(applyClipBtn,false);
};

function onSelectFilterClips2(e) {
    var select0val = $('#filterClipsSelect0').data("kendoDropDownList").value(),
        select1val = $('#filterClipsSelect1').data("kendoDropDownList").value(),
        select2val = e.item.text(),
        select3val = $('#filterClipsSelect3').data("kendoDropDownList").value(),
        select0field , select1field , select2field ,
        searchField = { field: "name", operator: "contains", value: $('#clip-search-field').val() };

    if (select0val!='All') {
        select0field = { field: "productType", operator: "eq", value: select0val };
    } else {
        select0field = { field: "productType", operator: "neq", value: select0val };
    };

    if (select1val!='All') {
        select1field = { field: "location", operator: "eq", value: select1val };
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
            filters: [ select0field, select1field, select2field, searchField, exclude360clips(), stillTypeFilter() ]
        },
        sort: [ {field: select3val , dir: "asc"} ]
    });

    toggleBtnStatus(applyClipBtn,false);
};

function onSelectFilterClips3(e) {
    var select0val = $('#filterClipsSelect0').data("kendoDropDownList").value(),
        select1val = $('#filterClipsSelect1').data("kendoDropDownList").value(),
        select2val = $('#filterClipsSelect2').data("kendoDropDownList").value(),
        dataItem = this.dataItem(e.item),
        select1field , select2field ,
        searchField = { field: "name", operator: "contains", value: $('#clip-search-field').val() };

    if (select0val!='All') {
        select0field = { field: "productType", operator: "eq", value: select0val };
    } else {
        select0field = { field: "productType", operator: "neq", value: select0val };
    };

    if (select1val!='All') {
        select1field = { field: "location", operator: "eq", value: select1val };
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
            filters: [ select0field, select1field, select2field, searchField, exclude360clips(), stillTypeFilter() ]
        },
        sort: [
            {field: dataItem.value, dir: "asc"}
        ]
    });
    toggleBtnStatus(applyClipBtn,false);
};

//search clip function
function searchClipFunc() {
    var select0val = $('#filterClipsSelect0').data("kendoDropDownList").value(),
        select1val = $('#filterClipsSelect1').data("kendoDropDownList").value(),
        select2val = $('#filterClipsSelect2').data("kendoDropDownList").value(),
        select3val = $('#filterClipsSelect3').data("kendoDropDownList").value(),
        select0field , select1field , select2field;

    if (select0val!='All') {
        select0field = { field: "productType", operator: "eq", value: select0val };
    } else {
        select0field = { field: "productType", operator: "neq", value: select0val };
    };

    if (select1val!='All') {
        select1field = { field: "location", operator: "eq", value: select1val };
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
                filters: [ select0field, select1field, select2field, {field: "name", operator: "contains", value: searchVal}, exclude360clips(), stillTypeFilter() ]
            },
            sort: [ {field: select3val , dir: "asc"} ]
        });
        prevSearchVal = searchVal;
        $('#clip-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        clipsDataSource.query({
            filter: {
                logic: "and",
                filters: [ select0field, select1field, select2field, {field: "name", operator: "contains", value: searchVal}, exclude360clips(), stillTypeFilter() ]
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
    var select0val = $('#filterClipsSelect0').data("kendoDropDownList").value(),
        select1val = $('#filterClipsSelect1').data("kendoDropDownList").value(),
        select2val = $('#filterClipsSelect2').data("kendoDropDownList").value(),
        select3val = $('#filterClipsSelect3').data("kendoDropDownList").value(),
        select0field , select1field , select2field , select3field;

    if (select0val!='All') {
        select0field = { field: "productType", operator: "eq", value: select0val };
    } else {
        select0field = { field: "productType", operator: "neq", value: select0val };
    };

    if (select1val!='All') {
        select1field = { field: "location", operator: "eq", value: select1val };
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
            filters: [ select0field, select1field, select2field, {field: "name", operator: "contains", value: ''}, exclude360clips(), stillTypeFilter() ]
        },
        sort: [ {field: select3val , dir: "asc"} ]
    });
    $('#clip-search-clear').addClass('hidden');
    $('#clip-search-field').val('');
    toggleBtnStatus(applyClipBtn, false);
};

function clearClipsAllFilters() {
    $('#clip-search-clear').addClass('hidden');
    $('#clip-search-field').val('');
    $('#filterClipsSelect0').data("kendoDropDownList").select(0);
    $('#filterClipsSelect1').data("kendoDropDownList").select(0);
    $('#filterClipsSelect2').data("kendoDropDownList").select(0);
    var select3 = $('#filterClipsSelect3').data("kendoDropDownList");
    select3.select(0);
    select3.trigger("change");
    select3.trigger("select");
    toggleBtnStatus(applyClipBtn, false);
};

// -------------- PRODUCTION ----------------

function productionManageFunc(newFlag,callback) {
    // if production new, it would be created with defined abdicative/indicative clips if account has such option
    currClipsIds = $.extend( true, {}, currentProduction.get('prodObj.clips') );
    curMotifsList = $.extend( true, {}, currentProduction.get('prodObj.motifs') );
    currClipsList = [];
    currClipMotifsList = [];

    currentProdMotifsDataSource.read();

    if ( (newFlag)&&(userAccount.get('indicatives') != -1) ) {
        currClipsIds.splice(0,1);
        curMotifsList.splice(0,1);

        var currClip;
        for(var i=0;i<ProductList.length;i++) {
            if ( ProductList[i].clipId == userAccount.get('indicatives') ) {
                currClip = $.extend( true, {}, ProductList[i] );
                currClip.locked = 'Intro'

                currentInd.set('clipObj',currClip);
                currentInd.set('isVisible',true);
                currentInd.set('imgSrc','/data/products/'+currClip.idString+'/'+currClip.idString+'_mdpi.jpg');
                currentInd.set('videoSrc','/data/products/'+currClip.idString+'/'+currClip.idString+'_hdpi.mp4');
                break;
            };
        };
    };
    if ( (newFlag)&&(userAccount.get('abdicatives') != -1) ) {
        currClipsIds.splice(-1,1);
        curMotifsList.splice(-1,1);

        var currClip;
        for(var i=0;i<ProductList.length;i++) {
            if ( ProductList[i].clipId == userAccount.get('abdicatives') ) {
                currClip = $.extend( true, {}, ProductList[i] );
                currClip.locked = 'Outro';

                currentAbd.set('clipObj',currClip);
                currentAbd.set('isVisible',true);
                currentAbd.set('imgSrc','/data/products/'+currClip.idString+'/'+currClip.idString+'_mdpi.jpg');
                currentAbd.set('videoSrc','/data/products/'+currClip.idString+'/'+currClip.idString+'_hdpi.mp4');
                break;
            };
        };
    };

    if ( currClipsIds.length > 0 ) {
        for (var i=0;i<currClipsIds.length;i++) {
            for(var j=0;j<ProductList.length;j++) {
                if ( ProductList[j].clipId == currClipsIds[i] ) {
                    currClipsList[i] = $.extend( true, {}, ProductList[j] );
                    currClipsList[i].emptyMotifs = 0; //???
                    break;
                };
            };
            if ( currClipsList[i] === undefined ) {
/*
                currClipsList[i] = {
                    id:j,
                    clipId:0,
                    idString:'none',
                    durTime:'',
                    emptyMotifs:0,
                    name:'not available'
                };
*/
                currClipsIds.splice(i,1);
                curMotifsList.splice(i,1);
                i--;
            }
        };
    };

    if (callback && typeof(callback) === "function") {
        callback();
    }
};

var MOTIF_CONTAINER_HEIGHT = 170;

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
                if ( !(currClipsList[i].clipId == userAccount.get('abdicatives')
                    || currClipsList[i].clipId == userAccount.get('indicatives')
                    || currClipsList[i].productType == 3) ) {
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
                    if ( !(currClipsList[i].clipId == userAccount.get('abdicatives')
                        || currClipsList[i].clipId == userAccount.get('indicatives')
                        || currClipsList[i].productType == 3) ) {
                        emptyMotifsCount++;
                    };
                };
            };
            for(var z=0;z<motifsContentTypeList.length;z++){
                if (( currClipsList[i].clipId == motifsContentTypeList[z].productID ) && ( (j+1) == motifsContentTypeList[z].position ) ) {
                    curMotifsList[i][j].aspectRaw = motifsContentTypeList[z].aspect;
                    curMotifsList[i][j].aspect = parseFloat( motifsContentTypeList[z].aspect * MOTIF_CONTAINER_HEIGHT ) ;
                    curMotifsList[i][j].typeName = motifsContentTypeList[z].name;
                    curMotifsList[i][j].motifTypeId = motifsContentTypeList[z].motifTypeId;
                    break;
                }
            };
        };
        if ( emptyMotifsCount > 0 ) {
            currClipsList[i].emptyMotifs = emptyMotifsCount;
        };
    };
    if (callback && typeof(callback) === "function") {
        callback();
    }
};

function populateMotifTypesList(callback) {
    currMotifTypesList = [];

    for (var i=0;i<curMotifsList.length;i++) {
        for (var j = 0; j < curMotifsList[i].length; j++) {
            //fill motif types list
            if ( i == 0 && j == 0 && currMotifTypesList.length == 0 ) {
                var tmpMotifType = {
                    motifTypeId: curMotifsList[i][j].motifTypeId,
                    typeName: curMotifsList[i][j].typeName,
                    aspect: curMotifsList[i][j].aspect,
                    numName: 'A',
                    motifId:'0'
                };
                currMotifTypesList.push( tmpMotifType );
            } else {
                for(var z=0;z<currMotifTypesList.length;z++){
                    if ( curMotifsList[i][j].motifTypeId == currMotifTypesList[z].motifTypeId ) {
                        break;
                    }
                    if ( z+1 == currMotifTypesList.length ) {
                        var tmpMotifType = {
                            motifTypeId: curMotifsList[i][j].motifTypeId,
                            typeName: curMotifsList[i][j].typeName,
                            aspect: curMotifsList[i][j].aspect,
                            numName: 'A',
                            motifId:'0'
                        };
                        currMotifTypesList.push( tmpMotifType );
                    }
                }
            }
        }
    }
    currentMotifTypesDataSource.read();

    if (callback && typeof(callback) === "function") {
        callback();
    }
};

currentProdMotifsDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(currClipMotifsList);
            initImageGrid();
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
                numName: { type: "string", defaultValue:'null' },
                typeName: { type: "string", defaultValue:'null' }
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

currentMotifTypesDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(currMotifTypesList);
            initImageGrid();
        },
        create: function(e) {
            e.data.id = currMotifTypesList.length;
            currMotifTypesList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            /*motifsList[getIndexById(e.data.id)] = e.data;*/
            currMotifTypesList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            /*motifsList.splice(getIndexById(e.data.id), 1);*/
            currMotifTypesList.splice(e.data.id, 1);
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
                aspect: { type: "number", defaultValue:0 },
                numName: { type: "string", defaultValue:'null' },
                typeName: { type: "string", defaultValue:'null' },
                motifTypeId: { type: "number" , defaultValue:0 }
            }
        }
    },
    error: function(e) {
        alert('failed to load motif types array', e.status);
    }
});

function currMotifTypesListViewChangeFunc() {
    selectedClipMotifUid = this.select().data('uid');
    selectedClipMotifId = this.select().index(); //replacing num
    router.navigate('/motifSelect');
    /*goToSelectClipMotif();*/
};

function initImageGrid() {
    $('#current-film-motifs, #current-motif-types').collagePlus(
        {
            'padding'       : 13,
            'fadeSpeed'     : 500,
            'targetHeight'  : MOTIF_CONTAINER_HEIGHT,
            'allowPartialLastRow' : true
        }
    );
};

// This is just for the case that the browser window is resized
var resizeTimer = null;
$(window).bind('resize', function() {
    $('#current-film-motifs .motif-select-item').css("opacity", 0);
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initImageGrid, 200);
});

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
                productType: { type: "string"},
                allowedCodecs: { type: "string"},
                locked: { type: "string"}
            }
        }
    },
    error: function(e) {
        alert('failed to load clips array', e.status);
    }
});

//listview helper
kendo.ui.Selectable.fn._myTap = kendo.ui.Selectable.fn._tap;
kendo.ui.Selectable.fn._tap =  function(e) {
    if ($(e.target).hasClass("custom-disabled-item")) {
        return;
    }

    this._myTap(e);
}

function currProdClipsListViewChangeFunc() {
    if ( this.select().length > 0 ) {
        selectedClipUid = this.select().data('uid');
        selectedClipId = this.select().index();

        toggleBtnStatus(productionBtnsToDisable,true);
        if ( currClipsList[selectedClipId].location == 'Indikativ' || currClipsList[selectedClipId].productType == 3 ) {
            currClipMotifsList = [];
        } else {
            currClipMotifsList = curMotifsList[selectedClipId];
        };
        currentProdMotifsDataSource.read();

        bindDeleteFunc($('#deleteClipButton'),true);
        switchOffFillMotifsMode();
    };
};

// --- replace motif ---
function ApllySelectedMotif(callback) {
    router.navigate('/production');

    if ( $('#fillAllModeBtn').hasClass('active') ) {
        //replace all this type motifs
        var replacedMotif = currentMotifTypesDataSource.getByUid(selectedClipMotifUid);
        var curMotif = $.extend(true, {} , motifsDataSource.getByUid(selectedMotifUid) );
        curMotif.aspect = replacedMotif.aspect;

        $.extend( true, currMotifTypesList[selectedClipMotifId], curMotif );
        currentMotifTypesDataSource.read();

        for (var i=0;i<curMotifsList.length;i++) {
            for (var j=0;j<curMotifsList[i].length;j++) {
                if ( curMotifsList[i][j].motifTypeId == currMotifTypesList[selectedClipMotifId].motifTypeId ) {
                    if ( curMotifsList[i][j].motifId == 0 ) {
                        currClipsList[i].emptyMotifs -=1;
                    };
                    $.extend( true, curMotifsList[i][j], curMotif );
                }
            }
        }
        currentProdMotifsDataSource.read();
        currentProdClipsDataSource.read();
    }
    else {
        var replacedMotif = currentProdMotifsDataSource.getByUid(selectedClipMotifUid);
        var curMotif = $.extend(true, {} , motifsDataSource.getByUid(selectedMotifUid) );
        curMotif.aspect = replacedMotif.aspect;

        $.extend( true, curMotifsList[selectedClipId][selectedClipMotifId], curMotif );
        currClipMotifsList = curMotifsList[selectedClipId];
        currentProdMotifsDataSource.read();

        if ( replacedMotif.motifId == 0 ) {
            currClipsList[selectedClipId].emptyMotifs -=1;
            currentProdClipsDataSource.read();
        };
    }

    checkEmptyMotifs();

    if (callback && typeof(callback) === "function") {
        callback();
    }
};


// clips in production funtions
function prodDeleteClipFunc(){
    var curDelItem = currentProdClipsDataSource.getByUid(selectedClipUid);

    currClipsList.splice(selectedClipId,1);
    curMotifsList.splice(selectedClipId,1);
    currentProdClipsDataSource.read();
    currClipMotifsList = [];
    currentProdMotifsDataSource.read();

    toggleBtnStatus(productionBtnsToDisable,false);
    if (currClipsList.length == 0) {
        toggleBtnStatus(productionInsertBtns,true);
        toggleBtnStatus(fillBtn,false);
        $('#current-motif-types').hide();
    }
    recalcProductionTime();
};

function prodReplaceClipFunc(callback){
    router.navigate('/prodCollection-replace');

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

    clearClipsAllFilters();

    if (callback && typeof(callback) === "function") {
        callback();
    }
};

function ApplySelectedClip(callback) {
    router.navigate('/production');

    var curMotifAspect = 0,
        curMotifTypeName = '',
        replacingClip = clipsDataSource.getByUid(selectedProductUid[0]);

    currClipsList[selectedClipId] = $.extend( true, {}, replacingClip );
    currClipsList[selectedClipId].emptyMotifs = currClipsList[selectedClipId].motifsNum;

    curMotifsList[selectedClipId] = [];
    for (var i=0;i<replacingClip.motifsNum;i++) {
        for(var z=0;z<motifsContentTypeList.length;z++){
            if (( replacingClip.clipId == motifsContentTypeList[z].productID ) && ( (i+1) == motifsContentTypeList[z].position ) ) {
                curMotifAspectRaw = motifsContentTypeList[z].aspect;
                curMotifAspect = parseInt( motifsContentTypeList[z].aspect * MOTIF_CONTAINER_HEIGHT ) ;
                curMotifTypeName = motifsContentTypeList[z].name;
                curMotifTypeId = motifsContentTypeList[z].motifTypeId;
                break;
            }
        };

        curMotifsList[selectedClipId][i] = {
            id:i,
            motifId: 0,
            accountId: userAccount.id,
            numName: alphabetNumeration[i],
            aspectRaw: curMotifAspectRaw,
            aspect: curMotifAspect,
            typeName: curMotifTypeName,
            motifTypeId: curMotifTypeId
        };
    };

    currentProdClipsDataSource.read();
    currentProdMotifsDataSource.read();

    var currentListView = $("#production-films");
    currentListView.data("kendoListView").select( currentListView.children().get(selectedClipId) );

    recalcProductionTime();
    if (replacingClip.categoryId == 128) {
        toggleBtnStatus($(productionInsertBtns),false);}
    else {
        toggleBtnStatus($(productionInsertBtns),true);
    };
    $(".html5lightbox-link").html5lightbox();

    if (callback && typeof(callback) === "function") {
        callback();
    }
};


// insert clip to production
function prodInsertClipFunc(){
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

    clearClipsAllFilters();
};

function ApplyNewSelectedClip(callback) {
    router.navigate('/production');

    /*Greatings, Mechwarrior!*/
    for (var erppc = 0;erppc < selectedProductUid.length ; erppc++) {
        var curMotifAspect = 0;
        var replacingClip = $.extend( true, {}, clipsDataSource.getByUid(selectedProductUid[erppc]) );
        replacingClip.emptyMotifs = replacingClip.motifsNum;

        var curClipsCnt = currentProdClipsDataSource.data().length;
        var tmpMotifs = [];

        replacingClip.emptyMotifs = replacingClip.motifsNum;

        if ((userAccount.get('abdicatives') != -1) && ( curClipsCnt > 0 ) ) {
            var tmpItem = $.extend(true, {} , currClipsList.pop());
            currClipsList.push(replacingClip);
            currClipsList.push(tmpItem);
            curClipsCnt--;
        } else {
            currClipsList.push(replacingClip);
        };

        curMotifsList.splice(curClipsCnt,0,[]);
        for (var i=0;i<replacingClip.motifsNum;i++) {
            for(var z=0;z<motifsContentTypeList.length;z++){
                if (( replacingClip.clipId == motifsContentTypeList[z].productID ) && ( (i+1) == motifsContentTypeList[z].position ) ) {
                    curMotifAspectRaw = motifsContentTypeList[z].aspect;
                    curMotifAspect = parseInt( motifsContentTypeList[z].aspect * MOTIF_CONTAINER_HEIGHT ) ;
                    curMotifTypeName = motifsContentTypeList[z].name;
                    curMotifTypeId = motifsContentTypeList[z].motifTypeId;
                    break;
                }
            };

            curMotifsList[curClipsCnt][i] = {
                id: i,
                motifId:0,
                accountId: userAccount.id,
                numName:alphabetNumeration[i],
                aspectRaw: curMotifAspectRaw,
                aspect: curMotifAspect,
                typeName: curMotifTypeName,
                motifTypeId: curMotifTypeId
            };
        };

        currentProdClipsDataSource.read();
        currentProdMotifsDataSource.read();
    };

    var currentListView = $("#production-films");
    currentListView.data("kendoListView").select( currentListView.children().get(curClipsCnt) );

    recalcProductionTime();
    if (replacingClip.categoryId == 128) {
        toggleBtnStatus(productionInsertBtns,false);}
    else {
        toggleBtnStatus(productionInsertBtns,true);
    };
    toggleBtnStatus(fillBtn,true);
    $(".html5lightbox-link").html5lightbox();

    if (callback && typeof(callback) === "function") {
        callback();
    }
};

function switchOffFillMotifsMode() {
    var $btn = $('#fillAllModeBtn');
    $btn.removeClass('active');
    $('#production-films').removeClass('active');
    //$btn.data('fillMode','false');
    $('#current-film-motifs').show();
    $('#current-motif-types').hide();
};

function fillMotifsMode(e) {
    var $el = $(e.sender.element[0]);
    if ( $el.hasClass('active') ) {
        $el.removeClass('active');
        $('#production-films').removeClass('active');
        $('#current-film-motifs').show();
        $('#current-motif-types').hide();
        //e.sender.element[0].dataset.fillMode = 'false';
    } else {
        $el.addClass('active');
        $('#production-films').addClass('active');
        $('#current-film-motifs').hide();
        $('#current-motif-types').show();
        //e.sender.element[0].dataset.fillMode = 'true';
    };
};

function checkEmptyMotifs(){
    if ( currClipsList.length > 0 ) {
        var unfilledMotifsNum = 0;
        var trailersNum = 0;
        toggleBtnStatus(productionProduceBtn,false);
        for (var i=0;i<currClipsList.length;i++) {
            if ( currClipsList[i].emptyMotifs > 0 ) {
                unfilledMotifsNum++;
            }
            if ( currClipsList[i].productType == 3 ) {
                trailersNum++;
            }
        }
        if ( unfilledMotifsNum == 0 && trailersNum != currClipsList.length ) {
            toggleBtnStatus(productionProduceBtn,true);
        };
        toggleBtnStatus(productionSaveBtn,true);
    } else {
        toggleBtnStatus(productionSaveBtn,false);
        toggleBtnStatus(productionProduceBtn,false);
    };
/*
    if ( currentProduction.get('prodObj.durTime') == '00:00 min') {
        toggleBtnStatus(productionSaveBtn,false);
    } else {
        toggleBtnStatus(productionSaveBtn,true);
    }
*/
};

function recalcProductionTime() {
    var framesArr = [];
    if ( currentInd.get('isVisible') == true ) {
        framesArr.push( currentInd.get('clipObj.duration') );
    };
    if ( currClipsList.length > 0 ) {
        for (var i=0;i<currClipsList.length;i++) {
            framesArr.push(currClipsList[i].duration);
        }
    };
    if ( currentAbd.get('isVisible') == true ) {
        framesArr.push( currentInd.get('clipObj.duration') );
    };
    currentProduction.set('prodObj.durTime',timeFormatingFromClipsArr(framesArr));
    checkEmptyMotifs();
    populateMotifTypesList();
};

function initProductionDragNDrop(){
    $('#production-films').kendoSortable({
        cursorOffset: { top: 0, left: 10 },
        //filter:':not(.locked)',
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

//---------------admin section pages----------------
var adminHubPage = new kendo.View("#admin-hub",{
    init: function(e){
        getOpenProductionList(function(){});
        getFinishedProductionList(function(){});
    },
    show: function(e){
        localizeHtml($('#page'));
    }
});

var admAccountsPage = new kendo.View("#adm-accounts",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
        initAccSearch();

        clearAccountObject();
        initCurAccObj();
    },
    hide: function(e){}
});

var admGroupsPage = new kendo.View("#adm-groups",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
        initGroupSearch();

        //clearGroupObject();
        initCurGroupObj();
    },
    hide: function(e) {}
});

var admMotifTypePage = new kendo.View("#adm-motif-types",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
        initMotifTypeSearch();
        initCurMotifTypeObj();
    }
});

var admMotifTypeEdit = new kendo.View("#adm-motif-types-edit",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
        initCurMotifTypeObj();
        toggleBtnStatus( $('#save-motif-type-edit-button') ,false);
    }
});

var motifPreviewSelectPage = new kendo.View("#motifs",{
    init: function(e){},
    show: function(e) {
        localizeHtml($('#page'));
        $('.hide-block').addClass('visible');
        $('.show-block').addClass('hidden');
        $('.preview-select-nav').show();
        $('.motif-select-nav').hide();

        var motifListViewObj = $('#motifs-list').data("kendoListView");
        motifListViewObj.clearSelection();
        motifListViewObj.setOptions({selectable: 'true'});

        kendo.bind($("#motifs-filter"), motifFilterModel);
        initMotifSearch();
        toggleBtnStatus(deleteMotifBtn,false);
        toggleBtnStatus($('#applyMotifPreviewBtn'),false);
    },
    hide: function(e) {
        bindEnterFunc($('#applyMotifPreviewBtn'),false);
        $('.hide-block').removeClass('visible');
        $('.show-block').removeClass('hidden');
        $('.preview-select-nav').hide();
        $('.motif-select-nav').show();
    }
});

var admAudioPage = new kendo.View("#adm-audio",{
    init: function(e){
    },
    show: function(e){
        localizeHtml($('#page'));
        initAudioSearch();
        initCurAudioObj();
    }
});

var admAudioEdit = new kendo.View("#adm-audio-edit",{
    init: function(e){},
    show: function(e){
        $('#audio-upload-progressbar').data("kendoProgressBar").value(0);
        localizeHtml($('#page'));
        initCurAudioObj();
        toggleBtnStatus( $('#save-audio-edit-button') ,false);
    }
});

var admProductsPage = new kendo.View("#adm-products",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
        initAdmProductSearch();

        clearAdmProductObject();
        initCurProductObj();
    },
    hide: function(e) {
    }
});

var admOpenProdsPage = new kendo.View("#adm-open-prods",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
    }
});

var admFinishedProdsPage = new kendo.View("#adm-finished-prods",{
    init: function(e){},
    show: function(e){
        localizeHtml($('#page'));
    }
});


// ----- adm section functions ----- //


// ACCOUNT LIST --------------------------------------
var editAccObj = kendo.observable({
    isVisible: false,
    accId: -1,
    accountGroupID: -1,
    accountGroupName: '',
    usernameField: '',
    passwordField: '',
    firstnameField: '',
    lastnameField: '',
    groupNamesField: groupArr,
    groupField: 0,
    emailField: '',
    quotaField: 0,
    budgetField: 0,
    languageField: '',
    accActivField: 0,
    multilogin: 0
});

function initCurAccObj() {
    kendo.bind($("#current-account-form"), editAccObj);
    editAccObj.bind("change", function(e) {
        if ( editAccObj.get('accId') == -1 ) {
            toggleBtnStatus( $('#save-account-button') ,true);
            toggleBtnStatus( $('#delete-account-button') ,false);
        } else {
            toggleBtnStatus( $('#delete-account-button , #save-account-button') ,true);
        };
    });
};

function createNewAccount() {
    $('#account-grid').data("kendoGrid").clearSelection();

    editAccObj.set('isVisible',true);
    editAccObj.set('accId',-1);
    editAccObj.set('accountGroupID',-1);
    editAccObj.set('accountGroupName','New Account');
    editAccObj.set('usernameField','');
    editAccObj.set('passwordField','');
    editAccObj.set('firstnameField','');
    editAccObj.set('lastnameField','');
    editAccObj.set('groupField',-1);
    editAccObj.set('emailField','');
    editAccObj.set('quotaField',0);
    editAccObj.set('budgetField',0);
    editAccObj.set('languageField','en_GB');
    editAccObj.set('accActivField',0);
    editAccObj.set('multilogin',0);

    toggleBtnStatus( $('#delete-account-button , #save-account-button') ,false);
};

accountsDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(accountsArr);
        },
        create: function(e) {
            e.data.id = accountsArr.length;
            accountsArr.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            accountsArr[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            accountsArr.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "accId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                accId: { type: "number" },
                accountGroupID: { type: "number" },
                accountGroupName: { type: "string" },
                languageIsoCode: { type: "string" },
                loginUsername: { type: "string" },
                name: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                //phone: { type: "string" },
                //company: { type: "string" },
                //creationTime: { type: "number" },
                //description: { type: "string" },
                //isOnline: { type: "number" },
                isActive: { type: "number" },
                multilogin: { type: "number" },
                //lastLogin: { type: "number" },
                //mailTextDeleteFilm: { type: "string" },
                //mailTextFilmReady: { type: "string" },
                //daysKeepRenderedFilm: { type: "number" },
                quota: { type: "number" },
                budget: { type: "number" }
            }
        }
    },
/*
    group: {
        field: "accountGroupID", aggregates: [
            { field: "name", aggregate: "count"}
        ]
    },
*/
    error: function(e) {
        alert('failed to load accounts array', e.status);
    }
});

function selectAccountItem() {
    if ( this.select().length > 0 ) {
        selectedAccUid = this.select().data('uid');
        var curItem = $.extend(true, {} , accountsDataSource.getByUid(selectedAccUid) );

        editAccObj.set('isVisible',true);
        editAccObj.set('accId',curItem.accId);
        editAccObj.set('accountGroupID',curItem.accountGroupID);
        editAccObj.set('accountGroupName',curItem.accountGroupName);
        editAccObj.set('usernameField',curItem.loginUsername);
        editAccObj.set('passwordField','');
        editAccObj.set('firstnameField',curItem.name);
        editAccObj.set('lastnameField',curItem.lastName);
        editAccObj.set('groupField',parseInt(curItem.accountGroupID));
        editAccObj.set('emailField',curItem.email);
        editAccObj.set('quotaField',parseInt(curItem.quota));
        editAccObj.set('budgetField',parseInt(curItem.budget));
        editAccObj.set('languageField',curItem.languageIsoCode);
        editAccObj.set('accActivField',parseInt(curItem.isActive));
        editAccObj.set('multilogin',parseInt(curItem.multilogin));
    }

    toggleBtnStatus( $('#save-account-button') ,false);
    toggleBtnStatus( $('#delete-account-button') ,true);
};

function onSelectAccountGroup(e) {
    var item = e.item;
    editAccObj.set('accountGroupName',item.text());
};

function popupSetAccountName() {
    $('#curr-acc-name').text( editAccObj.get('usernameField') );
};

function deleteAccount() {
    deleteByAdmin(0, editAccObj.get('accId') , 'account',function(){
        accountsDataSource.remove( accountsDataSource.getByUid(selectedAccUid) );
        createNewAccount();
        editAccObj.set('isVisible',false);
    });
    curPopupCloseFunc();
};

function clearAccountObject() {
    createNewAccount();
    editAccObj.set('isVisible',false);
}

//search account functions
function searchAccFunc() {
    searchVal = $('#account-search-field').val();
    if (( searchVal != '' ) && ( searchVal != prevSearchVal )) {
        accountsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#account-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        accountsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#account-search-clear').addClass('hidden');
    };
    //toggleBtnStatus(deleteMotifBtn,false);
};

function initAccSearch() {
    searchVal = $('#account-search-field').val();
    prevSearchVal = searchVal;
    if ( $('#account-search-field') ) {
        $('#account-search-field').on("keyup", this, function () {
            searchAccFunc();
        });
    }
};

function clearAccFilter() {
    accountsDataSource.query({
        filter: { field: "name", operator: "contains", value:'' }
    });
    $('#account-search-clear').addClass('hidden');
    $('#account-search-field').val('');
    //toggleBtnStatus(deleteMotifBtn,false);
    //toggleBtnStatus(applyMotifBtn,false);
};


// AUDIO LIST ---------------------------------------------------
var editAudioObj = kendo.observable({
    task:'addAudio',
    audioId: -1,
    name: '',
    mediaFormatID: -1,
    creationTime: '',
    accountID: -1,
    accountName: '',
    mediaFormat: '',
    extension: ''
});

function initCurAudioObj() {
    kendo.bind($("#audio-edit-page"), editAudioObj);
    editAudioObj.bind("change", function(e) {
        if ( (editAudioObj.get('name').length == 0) || (editAudioObj.get('name').length > 255) || (editAudioObj.get('mediaFormatID') == -1) ) {
            toggleBtnStatus( $('#save-audio-edit-button') ,false);
        } else {
            toggleBtnStatus( $('#save-audio-edit-button') ,true);
        };
    });
};

function createNewAudio() {
    $('#audio-grid').data("kendoGrid").clearSelection();

    editAudioObj.set('task','addAudio');
    editAudioObj.set('audioId',-1);
    editAudioObj.set('name','New Audio');
    editAudioObj.set('mediaFormatID',-1);
    editAudioObj.set('creationTime','');
    editAudioObj.set('accountID',-1);
    editAudioObj.set('accountName','');
    editAudioObj.set('mediaFormat','');
    editAudioObj.set('extension','');

    toggleBtnStatus( $('#save-audio-edit-button') ,false);
};

audioDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(audioArr);
        },
        create: function(e) {
            e.data.id = audioArr.length;
            audioArr.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            audioArr[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            audioArr.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "accId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                audioId: { type: "number" },
                name: { type: "string" },
                mediaFormatID: { type: "number" },
                mediaFormat: { type: "string" },
                extension: { type: "string" },
                creationTime: { type: "string" },
                accountID: { type: "number" },
                accountName: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load accounts array', e.status);
    }
});

function selectAudioItem() {
    if ( this.select().length > 0 ) {
        selectedAudioUid = this.select().data('uid');
        var curItem = $.extend(true, {} , audioDataSource.getByUid(selectedAudioUid) );

        editAudioObj.set('audioId', parseInt(curItem.audioId) );
        editAudioObj.set('name',curItem.name);
        editAudioObj.set('mediaFormatID', parseInt(curItem.mediaFormatID) );
        editAudioObj.set('mediaFormat',curItem.mediaFormat);
        editAudioObj.set('creationTime',curItem.creationTime);
        editAudioObj.set('accountID', parseInt(curItem.accountID) );
        editAudioObj.set('accountName',curItem.accountName);
        editAudioObj.set('extension',curItem.extension);
    }

    $('#playCurAudio').removeClass('playing');
    if ( this.select().length > 0 ) {
        $('#playCurAudio').attr('src','/data/audio/audio_' + curItem.audioId + curItem.extension);
    }
    stopAdminPlayAudio();
    toggleBtnStatus( $('#play-audio-button , #delete-audio-button , #edit-audio-button') ,true);
};

function initEditAudioPlayer() {
    stopAdminPlayAudio();
    if ( editAudioObj.get('audioId') != -1 ) {
        $('#playCurAudio').removeClass('playing').attr('src','/data/audio/audio_' + editAudioObj.get('audioId') + editAudioObj.get('extension'));
        toggleBtnStatus( $('#play-audio-edit-button') ,true);
    } else {
        $('#playCurAudio').removeClass('playing').attr('src','');
        toggleBtnStatus( $('#play-audio-edit-button') ,false);
        stopAdminPlayAudio()
    };
};

function popupSetAudioName() {
    $('#curr-audio-name').text( editAudioObj.get('name') );
};

function deleteAudio() {
    deleteByAdmin(0, editAudioObj.get('audioId') , 'audio',function(){
        audioDataSource.remove( audioDataSource.getByUid(selectedAudioUid) );
        createNewAudio();
    });
    curPopupCloseFunc();
};

function playAudio() {
    var playBtn = $('#play-audio-button , #play-audio-edit-button');
    var audio = document.getElementById('playCurAudio');
    if ( $(audio).hasClass('playing') ) {
        $(audio).removeClass('playing');
        audio.pause();
        $(playBtn).find('.play').css('opacity',1);
        $(playBtn).find('.stop').css('opacity',0);
    } else {
        $(audio).addClass('playing');
        audio.play();
        $(playBtn).find('.play').css('opacity',0);
        $(playBtn).find('.stop').css('opacity',1);
    };
    return false;
};

function stopAdminPlayAudio() {
    var audio = document.getElementById('playCurAudio');
    var playBtn = $('#play-audio-button , #play-audio-edit-button');
    $(audio).removeClass('playing');
    audio.pause();
    $(playBtn).find('.play').css('opacity',1);
    $(playBtn).find('.stop').css('opacity',0);
}

function newAudioFunc() {
    createNewAudio();
    router.navigate('/adm-audio-edit');
    initEditAudioPlayer();
};

function editAudioFunc() {
    editAudioObj.set('task','updateAudio');
    router.navigate('/adm-audio-edit');
    initEditAudioPlayer();
};

function selectAudioFile() {
    $("#audio-input-file").on('change',function(){
        editAudioObj.set('name',this.files[0].name);
        editAudioObj.set('mediaFormatID',checkFileExtension(this.files[0].name));
        $('#playCurAudio').removeClass('playing').attr('src','');
        //console.log(this.files[0].name);
    });
    $('#audio-input-file').trigger('click');
};

//search audio functions
function searchAudioFunc() {
    searchVal = $('#audio-search-field').val();
    if (( searchVal != '' ) && ( searchVal != prevSearchVal )) {
        audioDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#audio-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        audioDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#audio-search-clear').addClass('hidden');
    };
    toggleBtnStatus( $('#play-audio-button, #delete-audio-button, #edit-audio-button') ,false);
};

function initAudioSearch() {
    searchVal = $('#audio-search-field').val();
    prevSearchVal = searchVal;
    if ( $('#audio-search-field') ) {
        $('#audio-search-field').on("keyup", this, function () {
            searchAudioFunc();
        });
    }
};

function clearAudioFilter() {
    audioDataSource.query({
        filter: { field: "name", operator: "contains", value:'' }
    });
    $('#audio-search-clear').addClass('hidden');
    $('#audio-search-field').val('');
    toggleBtnStatus( $('#play-audio-button, #delete-audio-button, #edit-audio-button') ,false);
};

//finished products part ----------------------------------------------
finishedProdsDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(finishedProdsArr);
        },
        create: function(e) {
            e.data.id = finishedProdsArr.length;
            finishedProdsArr.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            finishedProdsArr[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            finishedProdsArr.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "prodId", dir: "desc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                prodId: { type: "number" },
                name: { type: "string" },
                creationTime: { type: "date" },
                updateTime: { type: "date" },
                userName: { type: "string" },
                priority:  { type: "number" },
                clipFrameCount:  { type: "number" }
            }
        }
    },
    error: function(e) {
        alert('failed to load finished products array', e.status);
    }/*,
    pageSize: 40*/
});

//search finished productions functions
function searchFinishedFunc() {
    searchVal = $('#finished-search-field').val();
    if (( searchVal != '' ) && ( searchVal != prevSearchVal )) {
        finishedProdsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#finished-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        finishedProdsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#finished-search-clear').addClass('hidden');
    };
};

function initFinishedSearch() {
    searchVal = $('#finished-search-field').val();
    prevSearchVal = searchVal;
    if ( $('#finished-search-field') ) {
        $('#finished-search-field').on("keyup", this, function () {
            searchFinishedFunc();
        });
    }
};

function clearFinishedFilter() {
    finishedProdsDataSource.query({
        filter: { field: "name", operator: "contains", value:'' }
    });
    $('#finished-search-clear').addClass('hidden');
    $('#finished-search-field').val('');
};


//opened products part ---------------------------------------------------------
openedProdsDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(openProdsArr);
        },
        create: function(e) {
            e.data.id = openProdsArr.length;
            openProdsArr.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            openProdsArr[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            openProdsArr.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "prodId", dir: "desc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                prodId: { type: "number" },
                name: { type: "string" },
                creationTime: { type: "date" },
                updateTime: { type: "date" },
                status: { type: "string" },
                userName: { type: "string" },
                priority:  { type: "number" },
                clipFrameCount:  { type: "number" }
            }
        }
    },
    error: function(e) {
        alert('failed to load opened products array', e.status);
    }
});

var openedProdObj = kendo.observable({
    prodId: -1,
    priority: -1
});

function initOpenedProdObj() {
    kendo.bind($("#change-priority-popup"), openedProdObj);
};

function updatePriorityAccept() {
    updateProductionPriority(function(){
        getOpenProductionList();
        toggleBtnStatus( $('#change-priority-button') ,false);
    });
    curPopupCloseFunc();
};

function selectOpenedItem() {
    var curItem = $.extend(true, {} , openedProdsDataSource.getByUid( this.select().data('uid') ) );

    openedProdObj.set('prodId',curItem.prodId);
    openedProdObj.set('priority',curItem.priority);

    toggleBtnStatus( $('#change-priority-button') ,true);
};

//search opened productions functions
function searchOpenedFunc() {
    searchVal = $('#opened-search-field').val();
    if (( searchVal != '' ) && ( searchVal != prevSearchVal )) {
        openedProdsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#opened-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        openedProdsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#opened-search-clear').addClass('hidden');
    };
    toggleBtnStatus( $('#change-priority-button') ,false);
};

function initOpenedSearch() {
    searchVal = $('#opened-search-field').val();
    prevSearchVal = searchVal;
    if ( $('#opened-search-field') ) {
        $('#opened-search-field').on("keyup", this, function () {
            searchOpenedFunc();
        });
    }
};

function clearOpenedFilter() {
    openedProdsDataSource.query({
        filter: { field: "name", operator: "contains", value:'' }
    });
    $('#opened-search-clear').addClass('hidden');
    $('#opened-search-field').val('');
    toggleBtnStatus( $('#change-priority-button') ,false);
};





// GROUPS LIST --------------------------------------
var currGroupProdIds = [],
    accGrList = [],
    prodGrList = [],
    audioGrList = [],
    accGrFullList = [],
    prodGrFullList = [],
    audioGrFullList = [],
    groupOperationsList = [],
    groupAudioOperationsList = [],
    tempGroupUID = '';

var editGroupObj = kendo.observable({
    isVisible: false,
    groupId: -1,
    name: '',
    indicative: -1,
    abdicative: -1,
    description: '',
    groupCustomField: '',
    groupCustomObligate: 0,
    onlinethreesixty: 0,
    dicativesArr: dicativeList
});

function initCurGroupObj() {
    $('#groups-grid').data("kendoGrid").clearSelection();
    editGroupObj.set('dicativesArr',dicativeList);
    kendo.bind($("#current-group-obj"), editGroupObj);
    editGroupObj.bind("change", function(e) {
        if ( editGroupObj.get('groupId') == -1 ) {
            toggleBtnStatus( $('#save-group-button') ,true);
            toggleBtnStatus( $('#delete-group-button') ,false);
        } else {
            toggleBtnStatus( $('#delete-group-button , #save-group-button') ,true);
        };
    });
};

function createNewGroup() {
    if ( tempGroupUID == '' ) {
        var tmpGr = groupsDataSource.add({
            abdicative: -1,
            description: "",
            groupCustomField: "",
            groupCustomObligate: 0,
            onlinethreesixty: 0,
            groupId: -1,
            indicative: -1,
            name: "New Group"
        });
        tempGroupUID = tmpGr.uid;

        toggleBtnStatus( $('#delete-group-button , #save-group-button') ,false);
    };

    $('#groups-grid').data("kendoGrid").select("tr[data-uid='"+tempGroupUID+"']");
};

groupsDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(groupArr);
        },
        create: function(e) {
            e.data.id = groupArr.length;
            groupArr.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            groupArr[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            groupArr.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "groupId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                groupId: { type: "number" },
                name: { type: "string" },
                indicative: { type: "number" },
                abdicative: { type: "number" },
                description: { type: "string" },
                groupCustomField: { type: "string" },
                groupCustomObligate: { type: "number" },
                onlinethreesixty: { type: "number" }
            }
        }
    },
    error: function(e) {
        alert('failed to load groups array', e.status);
    }
});

function selectGroupItem() {
    function clearGroupArrays() {
        groupOperationsList = [];
        groupAudioOperationsList = [];
        accGrList = [];
        accGrFullList = [];
        prodGrList = [];
        prodGrFullList = [];
        audioGrList = [];
        audioGrFullList = [];
    };

    function setGrObj() {
        clearGroupArrays();

        $("#group-tabs").kendoTabStrip().data("kendoTabStrip").select(0);
        kendo.bind($("#current-group-obj"), editGroupObj);//yes this lil' weird but kendoTab somehow broking this binding

        editGroupObj.set('isVisible',true);
        editGroupObj.set('groupId',curItem.groupId);
        editGroupObj.set('name',curItem.name);
        editGroupObj.set('indicative',curItem.indicative);
        editGroupObj.set('abdicative',curItem.abdicative);
        editGroupObj.set('description',curItem.description);
        editGroupObj.set('groupCustomField',curItem.groupCustomField);
        editGroupObj.set('groupCustomObligate',curItem.groupCustomObligate);
        editGroupObj.set('onlinethreesixty',curItem.onlinethreesixty);

        accGrList = $.grep(accountsArr,function(item){
            return curItem.groupId == item.accountGroupID
        });
        accGrFullList = $.grep(accountsArr,function(item){
            return curItem.groupId == item.accountGroupID
        },true);
        accGrDataSource.read();
        accGrFullDataSource.read();

        getProductAssociations(curItem.groupId,function(){
            prodGrList = $.grep(ProductList,function(item){
                return $.inArray(item.clipId, currGroupProdIds) != -1
            });
            prodGrFullList = $.grep(ProductList,function(item){
                return $.inArray(item.clipId, currGroupProdIds) != -1
            },true);
            prodGrDataSource.read();
            prodGrFullDataSource.read();
        });

        audioGrList = $.grep(audioArr,function(item){
            return ( $.inArray( curItem.groupId, item.groupIDs ) > -1 ) ? true : false;
        });
        audioGrFullList = $.grep(audioArr,function(item){
            return ( $.inArray( curItem.groupId, item.groupIDs ) > -1 ) ? true : false;
        },true);
        audioGrDataSource.read();
        audioGrFullDataSource.read();
    };

    if ( this.select().length > 0 ) {
        selectedGroupUid = this.select().data('uid');
        var curItem = $.extend(true, {} , groupsDataSource.getByUid(selectedGroupUid) );

        if ( (tempGroupUID != '') && (curItem.groupId != -1) ) {
            shortPopupCallFunct('dialog-popup', 'save-new-group-tmp');
        } else {
            setGrObj();
        };
    }/* else {
        clearGroupArrays();
        $("#group-tabs").kendoTabStrip().data("kendoTabStrip").select(0);
        accGrFullList = $.extend( true, [], accountsArr);
        accGrDataSource.read();
        accGrFullDataSource.read();

        prodGrFullList = $.extend( true, [], ProductList);
        prodGrDataSource.read();
        prodGrFullDataSource.read();

        audioGrFullList = $.extend( true, [], audioArr);
        audioGrDataSource.read();
        audioGrFullDataSource.read();
    }*/;

    toggleBtnStatus( $('#add-gr-acc-btn , #remove-gr-acc-btn , #add-gr-prod-btn , #remove-gr-prod-btn') , false );
    toggleBtnStatus( $('#save-group-button') ,false);
    toggleBtnStatus( $('#delete-group-button') ,true);
};

function onSelectGroupAbdikativ(e) {
    editGroupObj.set('abdicative',parseInt(this.value()) );
};

function onSelectGroupIndikativ(e) {
    editGroupObj.set('indicative',parseInt(this.value()) );
};

function popupSetGroupName() {
    $('#curr-group-name').text( editGroupObj.get('name') );
};

function deleteGroup() {
    deleteByAdmin(0, editGroupObj.get('groupId') , 'account_group',function(){
        getAccountGroupList();
        //createNewGroup();
        editGroupObj.set('isVisible',false);
    });
    curPopupCloseFunc();
};

function clearGroupObject() {
    groupsDataSource.remove( groupsDataSource.getByUid(tempGroupUID) );
    tempGroupUID = '';

    //initCurGroupObj();
    //editGroupObj.set('isVisible',false);
    $('#groups-grid').data("kendoGrid").select("tr[data-uid='"+selectedGroupUid+"']");
    toggleBtnStatus( $('#delete-group-button , #save-group-button') ,false);

    curPopupCloseFunc();
}

accGrDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(accGrList);
        },
        create: function(e) {
            e.data.id = accGrList.length;
            accGrList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            accGrList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            accGrList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "loginUsername", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                accId: { type: "number" },
                loginUsername: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load array', e.status);
    }
});

accGrFullDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(accGrFullList);
        },
        create: function(e) {
            e.data.id = accGrFullList.length;
            accGrFullList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            accGrFullList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            accGrFullList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "loginUsername", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                accId: { type: "number" },
                loginUsername: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load array', e.status);
    }
});

prodGrDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(prodGrList);
        },
        create: function(e) {
            e.data.id = prodGrList.length;
            prodGrList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            prodGrList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            prodGrList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "clipId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                clipId: { type: "number" },
                categoryId: { type: "number" },
                loginUsername: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load array', e.status);
    }
});

prodGrFullDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(prodGrFullList);
        },
        create: function(e) {
            e.data.id = prodGrFullList.length;
            prodGrFullList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            prodGrFullList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            prodGrFullList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "clipId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                clipId: { type: "number" },
                categoryId: { type: "number" },
                loginUsername: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load array', e.status);
    }
});

audioGrDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(audioGrList);
        },
        create: function(e) {
            e.data.id = audioGrList.length;
            audioGrList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            audioGrList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            audioGrList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "audioId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                audioId: { type: "number" },
                name: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load array', e.status);
    }
});

audioGrFullDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(audioGrFullList);
        },
        create: function(e) {
            e.data.id = audioGrFullList.length;
            audioGrFullList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            audioGrFullList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            audioGrFullList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "audioId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                audioId: { type: "number" },
                name: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load array', e.status);
    }
});

function addTabListsFunc(e) {
    var tabName = $(e.event.target).attr('name'),
        elArr = $('#'+ tabName + '-full-grid').data("kendoGrid").select(),
        elUidArr = [],
        dataSourceEl;
    for (var i=0;i<elArr.length;i++) {
        elUidArr.push( $(elArr[i]).data('uid') );
    };
    switch(tabName) {
        case 'acc-gr':
            for (var i=0;i<elUidArr.length;i++) {
                dataSourceEl = accGrFullDataSource.getByUid(elUidArr[i]);
                accGrFullDataSource.remove(dataSourceEl);
                accGrDataSource.add(dataSourceEl);
                checkOperationsList(groupOperationsList,'accountGroup2account','add',editGroupObj.get('groupId'),dataSourceEl.accId,function(){
                    toggleBtnStatus( $('#save-group-button') ,true);
                });
            };
            break;
        case 'prod-gr':
            for (var i=0;i<elUidArr.length;i++) {
                dataSourceEl = prodGrFullDataSource.getByUid(elUidArr[i]);
                prodGrFullDataSource.remove(dataSourceEl);
                prodGrDataSource.add(dataSourceEl);
                checkOperationsList(groupOperationsList,'accountGroup2product','add',editGroupObj.get('groupId'),dataSourceEl.clipId,function(){
                    toggleBtnStatus( $('#save-group-button') ,true);
                });
            };
            break;
        case 'audio-gr':
            for (var i=0;i<elUidArr.length;i++) {
                dataSourceEl = audioGrFullDataSource.getByUid(elUidArr[i]);
                audioGrFullDataSource.remove(dataSourceEl);
                audioGrDataSource.add(dataSourceEl);
                checkOperationsList(groupAudioOperationsList,'accountGroup2audio','add',editGroupObj.get('groupId'),dataSourceEl.audioId,function(){
                    toggleBtnStatus( $('#save-group-button') ,true);
                });
            };
            break;
        case 'prod-groups':
            for (var i=0;i<elUidArr.length;i++) {
                dataSourceEl = groupProdFullDataSource.getByUid(elUidArr[i]);
                groupProdFullDataSource.remove(dataSourceEl);
                groupProdDataSource.add(dataSourceEl);
                checkOperationsList(prodGroupsOperationsList,'Group2Product','add',editProductObj.get('clipId'),dataSourceEl.groupId,function(){
                    toggleBtnStatus( $('#save-adm-product-button') ,true);
                });
            };
            break;
    };
    toggleBtnStatus( $('#add-'+ tabName +'-btn') ,false);
}

function removeTabListsFunc(e) {
    var tabName = $(e.event.target).attr('name'),
        elArr = $('#'+ tabName + '-grid').data("kendoGrid").select(),
        elUidArr = [],
        dataSourceEl;
    for (var i=0;i<elArr.length;i++) {
        elUidArr.push( $(elArr[i]).data('uid') );
    };

    switch(tabName) {
        case 'acc-gr':
            for (var i=0;i<elUidArr.length;i++) {
                dataSourceEl = accGrDataSource.getByUid(elUidArr[i]);
                accGrDataSource.remove(dataSourceEl);
                accGrFullDataSource.add(dataSourceEl);
                checkOperationsList(groupOperationsList,'accountGroup2account','remove',editGroupObj.get('groupId'),dataSourceEl.accId,function(){
                    toggleBtnStatus( $('#save-group-button') ,true);
                });
            };
            break;
        case 'prod-gr':
            for (var i=0;i<elUidArr.length;i++) {
                dataSourceEl = prodGrDataSource.getByUid(elUidArr[i]);
                prodGrDataSource.remove(dataSourceEl);
                prodGrFullDataSource.add(dataSourceEl);
                checkOperationsList(groupOperationsList,'accountGroup2product','remove',editGroupObj.get('groupId'),dataSourceEl.clipId,function(){
                    toggleBtnStatus( $('#save-group-button') ,true);
                });
            };
            break;
        case 'audio-gr':
            for (var i=0;i<elUidArr.length;i++) {
                dataSourceEl = audioGrDataSource.getByUid(elUidArr[i]);
                audioGrDataSource.remove(dataSourceEl);
                audioGrFullDataSource.add(dataSourceEl);
                checkOperationsList(groupAudioOperationsList,'accountGroup2audio','remove',editGroupObj.get('groupId'),dataSourceEl.audioId,function(){
                    toggleBtnStatus( $('#save-group-button') ,true);
                });
            };
            break;
        case 'prod-groups':
            for (var i=0;i<elUidArr.length;i++) {
                dataSourceEl = groupProdDataSource.getByUid(elUidArr[i]);
                groupProdDataSource.remove(dataSourceEl);
                groupProdFullDataSource.add(dataSourceEl);
                checkOperationsList(prodGroupsOperationsList,'Group2Product','remove',editProductObj.get('clipId'),dataSourceEl.groupId,function(){
                    toggleBtnStatus( $('#save-adm-product-button') ,true);
                });
            };
            break;
    };
    toggleBtnStatus( $('#remove-'+ tabName +'-btn') ,false);
};

/*change group listviews function for enabling cur listview operation btn , btn name we getting from data-enable-btn
attribute, so enabling remove btn for current list and remove btn for full list*/
function enableListOperationBtn(e) {
    var btnId = $(e.sender.element[0]).data('enable-btn');
    toggleBtnStatus( $('#'+btnId) , true);
};

/*check if inverted operation with this object already done , if done new operation and inverted must be wiped from operations array*/
function checkOperationsList(operationsArr,objectType,operType,groupId,objectId,callback) {
    var invertedOperationIdx = -1;
        curOperation = {
            opObjType:objectType,
            operType:operType,
            grId:groupId,
            objId:objectId
        };
    var invertedOpObj = $.extend({},curOperation);
    invertedOpObj.operType = (curOperation.operType == 'add') ? 'remove' : 'add';

    $.grep(operationsArr,function(item,index){
        if ( JSON.stringify(invertedOpObj) === JSON.stringify(item) ) {
            invertedOperationIdx = index;
            return true;
        };
    });
    if ( invertedOperationIdx == -1 ) {
        operationsArr.push(curOperation);
    } else {
        operationsArr.splice(invertedOperationIdx,1);
    };
    if (operationsArr.length > 0) {
        if (callback && typeof(callback) === "function") {
            callback();
        };
    };
};

//search group functions
function searchGroupFunc() {
    searchVal = $('#group-search-field').val();
    if (( searchVal != '' ) && ( searchVal != prevSearchVal )) {
        groupsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#group-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        groupsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#group-search-clear').addClass('hidden');
    };
    toggleBtnStatus( $('#delete-group-button , #save-group-button') ,false);
};

function initGroupSearch() {
    searchVal = $('#group-search-field').val();
    prevSearchVal = searchVal;
    if ( $('#group-search-field') ) {
        $('#group-search-field').on("keyup", this, function () {
            searchGroupFunc();
        });
    }
};

function clearGroupFilter() {
    groupsDataSource.query({
        filter: { field: "name", operator: "contains", value:'' }
    });
    $('#group-search-clear').addClass('hidden');
    $('#group-search-field').val('');
    toggleBtnStatus( $('#delete-group-button , #save-group-button') ,false);
};


//MOTIF TYPES -----------------------
var editMotifTypeObj = kendo.observable({
    task:'createContentFormat',
    motifTypeId: -1,
    name: '',
    aspect: 0,
    width: 0,
    height:0,
    calculatedWidth: function() {
            var w = (this.get("aspect") != 0) ? this.get("aspect") * 115 : 1.5 * 115;
            w = ( w < 70 ) ? 70 : w;
            return w + 'px'
        },
    calculatedHeight: function() {
            var w,
                h = 115;
            if (this.get("aspect") != 0) {
                w = h * this.get("aspect");
                h = ( w < 70 ) ? 70/this.get("aspect") : 115;
            } else {
                h = 115;
            };
            return h + 'px'
        }
});

function initCurMotifTypeObj() {
    kendo.bind($("#motif-types-edit-page"), editMotifTypeObj);
    editMotifTypeObj.bind("change", function(e) {
        if ( editMotifTypeObj.get('width') != 0 || editMotifTypeObj.get('height') != 0 ) {
            editMotifTypeObj.set('aspect', (editMotifTypeObj.get('width') / editMotifTypeObj.get('height')).toFixed(2) );
        };
        if ( (editMotifTypeObj.get('name').length == 0) ||
            (editMotifTypeObj.get('name').length > 255) || (editMotifTypeObj.get('width') == 0) || (editMotifTypeObj.get('height') == 0) ) {
            toggleBtnStatus( $('#save-motif-types-edit-button') ,false);
        } else {
            toggleBtnStatus( $('#save-motif-types-edit-button') ,true);
        };
    });
};

function createNewMotifType() {
    editMotifTypeObj.set('task','createContentFormat');
    editMotifTypeObj.set('motifTypeId',-1);
    editMotifTypeObj.set('name','New Motif Type');
    editMotifTypeObj.set('width',0);
    editMotifTypeObj.set('height',0);
    editMotifTypeObj.set('aspect',0);

    $('#motif-type-preview').css('background-image','').text('A');
    toggleBtnStatus( $('#save-motif-type-edit-button') ,false);
};

motifTypeDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(motifTypesArr);
        },
        create: function(e) {
            e.data.id = motifTypesArr.length;
            motifTypesArr.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            motifTypesArr[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            motifTypesArr.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "motifTypeId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                motifTypeId: { type: "number" },
                name: { type: "string" },
                width: { type: "width" },
                height: { type: "height" },
                aspect: { type: "number" },
                iconWidth: { type: "number" }
            }
        }
    },
    error: function(e) {
        alert('failed to load array', e.status);
    }
});

var selectedMotifTypeUid;

function selectMotifTypeItem() {
    if ( this.select().length > 0 ) {
        selectedMotifTypeUid = this.select().data('uid');
        var curItem = $.extend(true, {} , motifTypeDataSource.getByUid(selectedMotifTypeUid) );

        editMotifTypeObj.set('motifTypeId', parseInt(curItem.motifTypeId) );
        editMotifTypeObj.set('name',curItem.name);
        editMotifTypeObj.set('width', parseFloat(curItem.width) );
        editMotifTypeObj.set('height', parseFloat(curItem.height) );
        editMotifTypeObj.set('aspect', parseFloat(curItem.aspect) );

        $('#motif-type-preview').css('background-image','').text('A');
    }

    toggleBtnStatus( $('#delete-motif-type-button , #edit-motif-type-button') ,true);
};

function popupSetMotifTypeName() {
    $('#curr-motif-type-name').text( editMotifTypeObj.get('name') );
};

function deleteMotifType() {
    deleteByAdmin(0, editMotifTypeObj.get('motifTypeId') , 'content_format',function(){
        motifTypeDataSource.remove( motifTypeDataSource.getByUid(selectedMotifTypeUid) );
        getContentFormats();
        createNewMotifType();
    });
    curPopupCloseFunc();
};

function newMotifTypeFunc() {
    $('#motif-type-grid').data("kendoGrid").clearSelection();
    router.navigate('/adm-motif-types-edit');
    createNewMotifType();
};

function editMotifTypeFunc() {
    router.navigate('/adm-motif-types-edit');
    editMotifTypeObj.set('task','updateContentFormat');
};

function ApllySelectedPreview() {
    var curItem = motifsDataSource.getByUid(selectedMotifUid);
    var previewSrc = 'url(/data/accounts/' + curItem.accountId + '/motifs/' + curItem.motifId + '_thumb.jpg';
    router.navigate('/adm-motif-types-edit');
    $('#motif-type-preview').css('background-image',previewSrc).text('');
};

//search audio functions
function searchMotifTypeFunc() {
    searchVal = $('#motif-type-search-field').val();
    if (( searchVal != '' ) && ( searchVal != prevSearchVal )) {
        motifTypeDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#motif-type-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        motifTypeDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#motif-type-search-clear').addClass('hidden');
    };
    toggleBtnStatus( $('#delete-motif-type-button, #edit-motif-type-button') ,false);
};

function initMotifTypeSearch() {
    searchVal = $('#motif-type-search-field').val();
    prevSearchVal = searchVal;
    if ( $('#motif-type-search-field') ) {
        $('#motif-type-search-field').on("keyup", this, function () {
            searchMotifTypeFunc();
        });
    }
};

function clearMotifTypeFilter() {
    motifTypeDataSource.query({
        filter: { field: "name", operator: "contains", value:'' }
    });
    $('#motif-type-search-clear').addClass('hidden');
    $('#momtif-type-search-field').val('');
    toggleBtnStatus( $('#delete-motif-type-button, #edit-motif-type-button') ,false);
};


//admin section PRODUCTS page --------------------------------
var selectedAdmProductUid,
    prodGroupsOperationsList = [],
    currProdGroupIds = [],
    groupProdList = [],
    groupProdFullList = [];

var editProductObj = kendo.observable({
    isVisible: false,
    selectedClipId: -1,
    clipId: -1,
    idString: '0000',
    name: '',
    location: '',
    categoriesArr: prodGroups,
    clipFormats: clipFormats,
    codecTypes: codecTypes,
    categoryId: 0,
    duration: 0,
    previewFrame: 0,
    description: '',
    task: 'addProduct',
    contentTypes: [],
    productType: 1,
    allowedCodecs: [],
    codecs: {},
    can_reformat: false,
    resolution: '',
    width: 0,
    height: 0,
    master_ID: -1,
    master_ID_unchanged: -1, //unused
    masterIdEnabled: false,
    inFrame: 0,
    outFrame: 0
});

function initCurProductObj() {
    editProductObj.set('categoriesArr',prodGroups);
    editProductObj.set('codecTypes',codecTypes);
    editProductObj.set('clipFormats',clipFormats);
    editProductObj.set('codecs',codecTypesLists);

    kendo.bind($("#current-product-obj"), editProductObj);
    editProductObj.bind("change", function(e) {
        if ( (editProductObj.get('clipId') == -1) || (parseInt(editProductObj.get('duration')) == 0)
                || (editProductObj.get('name').length == 0)
                || (editProductObj.get('categoryId') == 0)
                || (editProductObj.get('categoryId') == -1)
                || (( editProductObj.get('productType') != 3 )
                    && (editProductObj.get('contentTypes').length == 0)) ) {
            toggleBtnStatus( $('#delete-adm-product-button , #save-adm-product-button') ,false);
        } else if ( editProductObj.get('isVisible') == true ) {
            toggleBtnStatus( $('#save-adm-product-button') ,true); //#delete-group-button ,
        };
        if ( editProductObj.get('inFrame')  > 0 || editProductObj.get('outFrame') > 0 ) {
            editProductObj.set('duration', editProductObj.get('outFrame') - editProductObj.get('inFrame') + 1 );
        };

        editProductObj.set('masterIdEnabled', editProductObj.get('productType')=='4'?true:false );
    });
};

function createNewProduct() {
    $('#adm-products-grid').data("kendoGrid").clearSelection();

    editProductObj.set('isVisible',true);
    editProductObj.set('clipId',-1);
    editProductObj.set('selectedClipId',-1);
    editProductObj.set('idString', '0000');
    editProductObj.set('name','New Product');
    editProductObj.set('location','');
    editProductObj.set('categoryId',-1);
    editProductObj.set('duration',0);
    editProductObj.set('previewFrame',0);
    editProductObj.set('description','');
    editProductObj.set('task','addProduct');
    editProductObj.set('contentTypes', []);
    editProductObj.set('productType', 1);
    editProductObj.set('allowedCodecs', []);
    editProductObj.set('resolution', '');
    editProductObj.set('can_reformat', false);
    editProductObj.set('width', 0);
    editProductObj.set('height', 0);
    editProductObj.set('master_ID', -1);
    editProductObj.set('master_ID_unchanged', -1);
    editProductObj.set('masterIdEnabled', false);
    editProductObj.set('inFrame', 0);
    editProductObj.set('outFrame', 0);

    $('#edit-prod-video').attr('src','');

    toggleBtnStatus( $('#delete-adm-product-button , #save-adm-product-button') ,false);

    groupProdList = [];
    groupProdFullList = groupArr;
    groupProdDataSource.read();
    groupProdFullDataSource.read();
};

admProductsDataSource = new kendo.data.DataSource({
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
            ProductList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            ProductList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "clipId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                clipId: { type: "number" },
                idString: { type: "string" },
                name: { type: "string" },
                location: { type: "string" },
                categoryId: { type: "number" },
                duration: { type: "number" },
                previewFrame: { type: "number" },
                description: { type: "string" },
                motifsNum: { type: "number" },
                productType: { type: "number"},
                productTypeName: { type: "string"},
                allowedCodecs: { type: "string"},
                resolution: { type: "string" },
                can_reformat: { type: "string" },
                master_ID: { type: "number"},
                inFrame: { type: "number"},
                outFrame: { type: "number"}
            }
        }
    },
    error: function(e) {
        alert('failed to load array', e.status);
    }
});

function selectAdmProductItem() {
    if ( this.select().length > 0 ) {
        selectedAdmProductUid = this.select().data('uid');
        var curItem = $.extend(true, {} , admProductsDataSource.getByUid(selectedAdmProductUid) );
        curItem.codec = $.grep(codecTypes,function(item,i){
            return curItem.resolution == item.codec_type_id;
        })[0];

        setObj();
    };

    function setObj() {
        groupProdList = [];
        groupProdFullList = [];

        editProductObj.set('task','updateProduct');

        editProductObj.set('isVisible',true);
        editProductObj.set('clipId',curItem.clipId);
        editProductObj.set('selectedClipId',curItem.clipId);
        editProductObj.set('idString',curItem.idString);
        editProductObj.set('name',curItem.name);
        editProductObj.set('location',curItem.location);
        editProductObj.set('categoryId',curItem.categoryId);
        editProductObj.set('previewFrame',curItem.previewFrame);
        editProductObj.set('description',curItem.description);
        editProductObj.set('contentTypes', getCurProductContentTypes(curItem.clipId) );
        editProductObj.set('productType', curItem.productType);
        editProductObj.set('allowedCodecs', curItem.allowedCodecs.split(','));
        editProductObj.set('resolution', curItem.resolution);
        editProductObj.set('can_reformat', curItem.can_reformat=='1'?true:false);
        editProductObj.set('width', curItem.codec.width);
        editProductObj.set('height', curItem.codec.height);
        editProductObj.set('master_ID', curItem.master_ID);
        editProductObj.set('master_ID_unchanged', curItem.master_ID);
        editProductObj.set('inFrame', curItem.inFrame);
        editProductObj.set('outFrame', curItem.outFrame);
        editProductObj.set('duration',curItem.duration);

        $('#edit-prod-video').attr('src', window.location.protocol + "//" + window.location.hostname + '/data/products/'+curItem.idString+'/'+curItem.idString+'_ldpi.mp4');

        getGroupAssociations(curItem.clipId,function(){
            groupProdList = $.grep(groupArr,function(item){
                return $.inArray(item.groupId, currProdGroupIds) != -1
            });
            groupProdFullList = $.grep(groupArr,function(item){
                return $.inArray(item.groupId, currProdGroupIds) != -1
            },true);
            groupProdDataSource.read();
            groupProdFullDataSource.read();
        });
    };

    toggleBtnStatus( $('#save-adm-product-button') ,false);
    toggleBtnStatus( $('#delete-adm-product-button') ,true);
};

function getCurProductContentTypes(clipId) {
    var contentTypesArray = [];
    contentTypesArray = $.grep(motifsContentTypeList,function(item){
        return (clipId == item.productID)?true:false;
    });
    for (var i = 0; i < contentTypesArray.length; ++i) {
        contentTypesArray[i].contentTypesArr = motifTypesArr;
    }
    return contentTypesArray;
};

function addContentType2Product() {
    var contentTypesArray = editProductObj.get('contentTypes');
    var newItemIdx = contentTypesArray.length;
    var newContentTypeItem = {
        position: newItemIdx + 1,
        positionName: alphabetNumeration[newItemIdx],
        motifTypeId: -1,
        canLoop: 0,
        acceptsFilm: 0,
        loaderName: 'Loader' + alphabetNumeration[newItemIdx],
        contentType: 'visual',
        contentTypesArr: motifTypesArr
    };
    contentTypesArray.push(newContentTypeItem);
    editProductObj.set('contentTypes',contentTypesArray);
};

function recalcContentNames(e) {
    var contentTypesArray = editProductObj.get('contentTypes');
    contentTypesArray.splice(e.model.position-1,1)
    for (var i=0;i<contentTypesArray.length;i++) {
        contentTypesArray[i].position = i+1;
        contentTypesArray[i].positionName = alphabetNumeration[i];
        contentTypesArray[i].loaderName = 'Loader' + alphabetNumeration[i];
    };
    editProductObj.set('contentTypes',contentTypesArray);
    $('#cur-content-type-list').data('kendoListView').refresh();
};

function onSelectProductCategory(e) {
//    editProductObj.set('category',parseInt(this.value()) );
};

function onSelectProductType(e) {
    if ( editProductObj.get('productType') == 4  &&  editProductObj.get('master_ID') == -1 ) {
        editProductObj.set('master_ID',0);
    }
    if ( editProductObj.get('productType') != 4  &&  editProductObj.get('master_ID') != -1 ) {
        editProductObj.set('master_ID', -1);
    }
  //  editProductObj.set('productType', parseInt(e.sender.dataItem(e.item).product_type_id) );
};

function onSelectResolution(e) {
    var codec = codecTypes[e.sender.selectedIndex];
    editProductObj.set('width', codec.width);
    editProductObj.set('height', codec.height);
};

function popupSetProductName() {
    $('#curr-adm-product-name').text( editProductObj.get('name') );
};

function deleteAdmProduct() {
    console.log('delete' + editProductObj.get('selectedClipId') + 'ID product');
    deleteByAdmin(0, editProductObj.get('selectedClipId') , 'product',function(){
        admProductsDataSource.remove( admProductsDataSource.getByUid(selectedAdmProductUid) );
        createNewProduct();
        editProductObj.set('isVisible',false);

        getProductListByAccount(function(){
            getDicativesByAccount(function(){
                getContentTypeListByAccount(function() {
                    countClipMotifs();
                });
            });
        });
    });
    curPopupCloseFunc();
};

function clearAdmProductObject() {
    createNewProduct();
    editProductObj.set('isVisible',false);
};

groupProdDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(groupProdList);
        },
        create: function(e) {
            e.data.id = groupProdList.length;
            groupProdList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            groupProdList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            groupProdList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "groupId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                groupId: { type: "number" },
                name: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load array', e.status);
    }
});

groupProdFullDataSource = new kendo.data.DataSource({
    transport: {
        read: function(e) {
            e.success(groupProdFullList);
        },
        create: function(e) {
            e.data.id = groupProdFullList.length;
            groupProdFullList.push(e.data);
            e.success(e.data)
        },
        update: function(e) {
            groupProdFullList[e.data.id] = e.data;
            e.success();
        },
        destroy: function(e) {
            groupProdFullList.splice(e.data.id, 1);
            e.success();
        }
    },
    batch: false,
    sort: [
        {field: "groupId", dir: "asc"}
    ],
    schema: {
        model: {
            id: "id",
            fields: {
                id: { editable: false, nullable: true },
                groupId: { type: "number" },
                name: { type: "string" }
            }
        }
    },
    error: function(e) {
        alert('failed to load array', e.status);
    }
});

//search product functions
function searchAdmProductFunc() {
    searchVal = $('#adm-product-search-field').val();
    if (( searchVal != '' ) && ( searchVal != prevSearchVal )) {
        admProductsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#adm-product-search-clear').removeClass('hidden');
    } else if (( searchVal == '' ) && ( searchVal != prevSearchVal )) {
        admProductsDataSource.query({
            filter: {field: "name", operator: "contains", value: searchVal}
        });
        prevSearchVal = searchVal;
        $('#adm-product-search-clear').addClass('hidden');
    };
    toggleBtnStatus( $('#delete-adm-product-button , #save-adm-product-button') ,false);
};

function initAdmProductSearch() {
    searchVal = $('#group-search-field').val();
    prevSearchVal = searchVal;
    if ( $('#adm-product-search-field') ) {
        $('#adm-product-search-field').on("keyup", this, function () {
            searchAdmProductFunc();
        });
    }
};

function clearAdmProductFilter() {
    admProductsDataSource.query({
        filter: { field: "name", operator: "contains", value:'' }
    });
    $('#adm-product-search-clear').addClass('hidden');
    $('#adm-product-search-field').val('');
    toggleBtnStatus( $('#delete-adm-product-button , #save-adm-product-button') ,false);
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

router.route("/loading", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        layout.showIn("#page", loadingPage);
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

router.route("/prodCollection-replace", function() {
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

//--admin section routes--
router.route("/admin-hub", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", adminHubPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-accounts", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admAccountsPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-groups", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admGroupsPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-motif-types", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admMotifTypePage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-motif-types-edit", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admMotifTypeEdit);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/motifSelect-for-preview", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", motifPreviewSelectPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-audio", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admAudioPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-audio-edit", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admAudioEdit);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-products", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admProductsPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-open-prods", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admOpenProdsPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});

router.route("/adm-finished-prods", function() {
    if ( userAccount.get('loginStatus') != 0 ) {
        if ( userAccount.get("groupId") == 1 ) {
            layout.showIn("#page", admFinishedProdsPage);
        } else {
            layout.showIn("#page", hubPage);
        };
    } else {
        router.navigate("/login");
    };
});




var langPathArr = [
    {lang_path:'loc/en.json',lang_name:'en_loc'},
    {lang_path:'loc/de.json',lang_name:'de_loc'},
    {lang_path:'loc/tr.json',lang_name:'tr_loc'},
    {lang_path:'loc/ru.json',lang_name:'ru_loc'},
    {lang_path:'loc/pl.json',lang_name:'pl_loc'}
];

$(function(){
    templateLoader.loadExtTemplate(tplArr,function(){
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

    var resizeTimer;
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            $("#window").data("kendoWindow").center();
        }, 100);
    });
});

function curPopupCloseFunc(callback) {
    var curPopup = $("#window");
    //var curPopup = $("[data-role=window]");
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

    win.content($( '#'+tplName).html() );
    localizeHtml($curPopup);
    kendo.init($curPopup);
    if (typeof refreshCallBackFunc === "function") {
        refreshCallBackFunc();
    };
    win.open().center();

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

    win.content($( '#'+tplName).html() );
    localizeHtml($curPopup);
    kendo.init($curPopup);
    if (typeof refreshCallBackFunc === "function") {
        refreshCallBackFunc();
    };
    win.open().center();
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

    $.getJSON( langPathArr[3].lang_path, function( json ) {
    }).done(function( json ) {
        langArr[ langPathArr[3].lang_name ] = json;
        if ( Object.keys(langArr).length == langPathArr.length ) {
            if (callback && typeof(callback) === "function") {
                callback();
            };
        };
    }).fail(function( jqxhr, textStatus, error ) {
        console.log( "Request Failed: " + textStatus + ", " + error );
    });

    $.getJSON( langPathArr[4].lang_path, function( json ) {
    }).done(function( json ) {
        langArr[ langPathArr[4].lang_name ] = json;
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