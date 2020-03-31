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
    inProduction:'',
    lastProdId:0,
    curProduction:''/*currentProduction.get('prodObj.name')*/,
    productsVal:0,
    motifsVal:0,
    indicatives:-1, //intro clip
    abdicatives:-1 //outro clip
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
var SALTED = 'vcampaign_704MvAgRniDZAyfLvIzr'; /*vcampaign_niDZA704MvAgRyfLvIzr*/
function urlGen (method) {
    var shaObj = new jsSHA(method , "TEXT");
    var hash = shaObj.getHash("SHA-1", "HEX");
    shaObj = new jsSHA(hash + SALTED, "TEXT");
    hash = shaObj.getHash("SHA-1", "HEX");
    return "/services/index.php?pass=" + hash + "&call=" + method;
};

function urlGenJSON (method) {
    var shaObj = new jsSHA(method , "TEXT");
    var hash = shaObj.getHash("SHA-1", "HEX");
    shaObj = new jsSHA(hash + SALTED, "TEXT");
    hash = shaObj.getHash("SHA-1", "HEX");
    return "/services/index_json.php?pass=" + hash + "&call=" + method;
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
        url: urlGenJSON('login') ,
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
                                        logStr = logStr + 'ended mergeProductsNDicatives' + new Date() + '   |   ';
                                        loadingInc(++progressVal);
                                    }),
                                    getContentTypeListByAccount()).then(function(){
                                        countClipMotifs();
                                        initSortingSelects();
                                        if ( (userAccount.get('indicatives') != -1) || (userAccount.get('abdicatives') != -1) ) {
                                            productionManageFunc(true,function(){
                                                logStr = logStr + 'ended productionManageFunc' + new Date() + '   |   ';
                                                loadingInc(++progressVal);
                                                currClipMotifsList = [];
                                                populateProdMotifsArr(function(){
                                                    checkEmptyMotifs();
                                                    currentProdMotifsDataSource.read();
                                                    currentProdClipsDataSource.read();
                                                    recalcProductionTime();
                                                    logStr = logStr + 'ended populateProdMotifsArr' + new Date() + '   |   ';
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
        url: urlGenJSON('getFileExtensions') ,
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
            logStr = logStr + 'ended getFileExtensions' + new Date() + '   |   ';
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
            url: urlGenJSON('getContentTypeListByAccount') ,
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
            url: urlGenJSON('getContentTypeListByAccount') ,
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
        logStr = logStr + 'ended getContentTypeListByAccountProcess' + new Date() + '   |   ';
    };
    return dfd.promise();
};

// get motifs-list and motif actions
function getMotifListByAccount(callback) {
    var dfd = new $.Deferred();

    $.ajax({
        type: "POST",
        url: urlGenJSON('getMotifListByAccount') ,
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
            logStr = logStr + 'ended getMotifListByAccount' + new Date() + '   |   ';
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
        url: urlGenJSON('uploadMotif') ,
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

                tmpImg.src = 'http://www.' + window.location.host + '/data/accounts/' + userAccount.get('id') + '/temp/' + uploadMotifObj.fileName + '_thumb.jpg';
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
        url: urlGenJSON('saveMotif') ,
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
            console.log(data);
            var loadedMotifID = data.ID;

            getMotifListByAccount().then(function(){
                window.scrollTo(0,0);
                var newMotifEl = document.querySelectorAll("[data-id='"+loadedMotifID+"']");
                if ( uploadMotifObj.animated == 1 ) {
                    $(newMotifEl).find('.img')
                        .css('background-image', 'url(http://www.' + window.location.host + '/data/accounts/' + userAccount.get('id') + '/motifs/' + loadedMotifID + '_thumb.jpg)' );
                    var tmpImg  = document.createElement('img');
                    $(tmpImg)
                        .on('error',function(){
                            setTimeout(function(){
                                var randomId = new Date().getTime();
                                var srcStr = 'http://www.' + window.location.host + '/data/accounts/' + userAccount.get('id') + '/motifs/' + loadedMotifID + '_thumb.jpg?r='+ randomId;
                                $(tmpImg).attr('src',srcStr);
                            },1000);
                        })
                        .on('load',function(){
                            setTimeout(function(){
                                delete tmpImg;
                                getMotifListByAccount();
                            },2000);
                        })
                        .attr('src','http://www.' + window.location.host + '/data/accounts/' + userAccount.get('id') + '/motifs/' + loadedMotifID + '_thumb.jpg');
                } else {
                    setTimeout(function(){
                        $(newMotifEl).find('.img')
                            .css('background-image', 'url(http://www.' + window.location.host + '/data/accounts/' + userAccount.get('id') + '/temp/' + uploadMotifObj.fileName + '_thumb.jpg)' );
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
        url: urlGenJSON('deleteMotif') ,
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
            url: urlGenJSON('getShortProductListByAccount') ,
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
            url: urlGenJSON('getShortProductListByAccount') ,
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
                duration: parseInt(data[i].Frames),
                durTime: timeFormating( parseInt(data[i].Frames) ),
                motifsNum: 0,
                emptyMotifs: 0, /*$(this).find('ContentFormat').length*/
                locked: '' /*field for timeline dragndrop to show intro/outro clips*/,
                previewFrame: parseInt(data[i].PreviewFrame),
                description: data[i].Description,
                productType: data[i].ProductType,
                allowedCodecs: data[i].AllowedCodecTypes,
                can_reformat: data[i].can_reformat,
                resolution: data[i].resolution
            });
        };
        loadingInc(++progressVal);
        logStr = logStr + 'ended getProductListByAccountProcess' + new Date() + '   |   ';
    };
    return dfd.promise();
};

function getDicativesByAccount(callback) {
    var dfd = new $.Deferred();
    //var start_time = new Date().getTime();
    if ( userAccount.get("groupId") == 1 ) {
        $.ajax({
            type: "GET",
            url: urlGenJSON('getDicativesByAccount') ,
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
            url: urlGenJSON('getDicativesByAccount') ,
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
                description: data[i].Description
            });
        };
        loadingInc(++progressVal);
        logStr = logStr + 'ended getDicativesByAccountProcess' + new Date() + '   |   ';
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
        url: urlGenJSON('getFilmsByAccount') ,
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
                    crDate: dateFormating( parseInt(dataArr[i].Date ) ),
                    duration: dataArr[i].Duration ,
                    durTime: timeFormating( parseInt(dataArr[i].Duration ) ),
                    videoFiles: codecFormatsToArray( dataArr[i].codecFormats , dataArr[i].size ),
                    products: dataArr[i].Products ,
                    motifs: dataArr[i].Motifs,
                    urlHash: dataArr[i].UrlHash
                });
            };
            userAccount.set("productsVal", filmsList.length );

            filmsDataSource.read();
            dfd.resolve();
            loadingInc(++progressVal);
            logStr = logStr + 'ended getFilmsByAccount' + new Date() + '   |   ';
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
        url: urlGenJSON('deleteFilm') ,
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
        url: urlGenJSON('createSingleProduction') ,
        cache: false,
        data: prodObj,
        success: function (data) {
            userAccount.set('lastProdId',data.FilmID);

            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
    /*<ProductionID>2909</ProductionID>
     <FilmID>5385</FilmID>*/
};

function logOut() {
    $.ajax({
        type: "POST",
        url: urlGenJSON('logout') ,
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
            url: urlGenJSON('checkProductionStatus') ,
            cache: false,
            data: {
                userID: +userAccount.get('id'),
                filmIDs: +userAccount.get('lastProdId')
            },
            success: function (data) {
                if ( data.Result != 1 ) {
                    checkProductionStatus();
                } else {
                    var inProdNum = userAccount.get('inProductionNum');
                    inProdNum--;
                    userAccount.set('inProductionNum',inProdNum);
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
    }, 10000);
};

function checkProductionStatusAdv(callback) {
    setTimeout(function(){
        $.ajax({
            type: "POST",
            url: urlGenJSON('checkProductionStatusAdv') ,
            cache: false,
            data: {
                userID: +userAccount.get('id'),
                filmIDs: +userAccount.get('lastProdId')
            },
            success: function (data) {
                if ( data.Result != 1 ) {
                    checkProductionStatus();
                } else {
                    var inProdNum = userAccount.get('inProductionNum');
                    inProdNum--;
                    userAccount.set('inProductionNum',inProdNum);
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

                /*
                 "Films": [
                         {
                             "id": 21,
                             "status": 0
                         },
                         {
                             "id": 22,
                             "status": 7
                         }
                     ]
                 */

                if (callback && typeof(callback) === "function") {
                    callback();
                }
            }
        });
    }, 10000);
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
    sizeString = (sizeString == null)?'':sizeString;
    var codecArray = codecString.split('+');
    var sizeArray = sizeString.split('.');
    var itemSize;
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
    var resultString = '';
    for (var i=0;i<curArray.length;i++) {
        resultString += curArray[i] + ',';
    };
    resultString = resultString.substr(0, resultString.length-1);
    return resultString;
};

function arrayToCommaString(curArray) {
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
    if ( (codecFormatsObj.get('codecFormatsArr').length <= 0) || (codecFormatsObj.get('jobNameField').length <= 0) ) {
        toggleBtnStatus( $('#produce-prod-popup-button') ,false);
    } else {
        toggleBtnStatus( $('#produce-prod-popup-button') ,true);
    }

    if ( codecFormatsObj.get('codecFormatsArr').length > 0 ) {
        codecFormatsObj.set('formatsReqFlag',false);
    } else {
        codecFormatsObj.set('formatsReqFlag',true);
    }
    if ( codecFormatsObj.get('productionAudio') > 1 ) {
        codecFormatsObj.set('musicReqFlag',false);
    } else {
        codecFormatsObj.set('musicReqFlag',true);
    }
    if ( (codecFormatsObj.get('jobNameField') == currentProduction.get('prodObj.name')) || (codecFormatsObj.get('jobNameField') == '') ) {
        codecFormatsObj.set('nameReqFlag',true);
    } else {
        codecFormatsObj.set('nameReqFlag',false);
    }
})

function setAllowedCodecs() {
    var allowedList = $.extend([],codecTypes);
    for (var i=0;i<currClipsList.length;i++) {
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
        jobName: codecFormatsObj.get('jobNameField'),
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
        var inProdNum = userAccount.get('inProductionNum');
        userAccount.set('inProductionNum',++inProdNum);
        userAccount.set('inProduction',inProdNum + ' ' + currLang["inProduction"]);
        //currentProduction.set('prodObj',newProdObj.jobName);
        checkProductionStatus();

        curPopupCloseFunc(function(){
            setTimeout(function(){
                shortPopupCallFunct('dialog-popup', 'produce-dialog-tmp');
                toggleBtnStatus( $('#produce-prod-popup-button') ,true);
            },350);
        });
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
        url: urlGenJSON('getStatistics') ,
        data: {
            StartDate: +statisticUser.get('statStartDate'),
            EndDate: +statisticUser.get('statEndDate'),
            AccountID: +userAccount.get('id')
        },
        success: function (data) {
            var dataAssetsArr = (data.Statistics.AssetCounts.length==0)?[]:data.Statistics.AssetCounts.AssetCount,
                dataUsagesArr = (data.Statistics.ProductUsages.length==0)?[]:data.Statistics.ProductUsages.ProductUsage;

            var tmpFilmCount = 0,
                tmpClipCount = 0;
            ProductionsStatArr = [];
            ProductUsageStatArr = [];

            for (var i=0; i<dataAssetsArr.length; i++) {
                ProductionsStatArr.push([
                    {v: dataAssetsArr[i].Timestamp ,f: dataAssetsArr[i].Date},
                    {v: +dataAssetsArr[i].FilmCount ,f: dataAssetsArr[i].FilmCount},
                    {v: +dataAssetsArr[i].ClipCount ,f: dataAssetsArr[i].ClipCount}
                ]);
                tmpFilmCount += parseInt($(this).find('FilmCount').text());
                tmpClipCount += parseInt($(this).find('ClipCount').text());
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
        url: urlGenJSON('getAccountList') ,
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
                    //phone: $(this).find('Phone').text(),
                    //company: $(this).find('Comany').text(),
                    //creationTime: $(this).find('CreationTime').text(),
                    //description: $(this).find('Description').text(),
                    //isOnline: $(this).find('IsOnline').text(),
                    isActive: parseInt(dataArr[i].IsActive),
                    //lastLogin: $(this).find('LastLogin').text(),
                    //currentIPPart: $(this).find('CurrentIPPart').text(),
                    //mailTextDeleteFilm: $(this).find('MailTextDeleteFilm').text(),
                    //mailTextFilmReady: $(this).find('MailTextFilmReady').text(),
                    //daysKeepRenderedFilm: $(this).find('DaysKeepRenderedFilm').text(),
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
            logStr = logStr + 'ended getAccountList' + new Date() + '   |   ';
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function getAccountGroupList(callback) {
    $.ajax({
        type: "GET",
        url: urlGenJSON('getAccountGroupList') ,
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
                    groupCustomField: '',
                    groupCustomObligate: 0
                });
            };

            groupsDataSource.read();
            loadingInc(++progressVal);
            logStr = logStr + 'ended getAccountGroupList' + new Date() + '   |   ';
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};

function getProductGroupList(callback) {
    $.ajax({
        type: "GET",
        url: urlGenJSON('getProductGroupList') ,
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
            logStr = logStr + 'ended getProductGroupList' + new Date() + '   |   ';
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
        url: urlGenJSON('getAudioList') ,
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
            logStr = logStr + 'ended getAudioList' + new Date() + '   |   ';
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
        url: urlGenJSON('getContentFormats') ,
        cache: false,
        success: function (data) {
            var dataArr = data.ContentFormats.ContentFormat;
            motifTypesArr = [];
            for(var i=0; i < dataArr.length; i++){
                motifTypesArr.push({
                    motifTypeId: parseInt(dataArr[i].ID),
                    aspect: parseFloat( dataArr[i].Aspect ),
                    iconWidth: checkIconWidth(parseFloat(dataArr[i].Aspect)),
                    name: dataArr[i].Name
                });
            };
            motifTypeDataSource.read();
            loadingInc(++progressVal);
            logStr = logStr + 'ended getContentFormats' + new Date() + '   |   ';
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
        url: urlGenJSON('getOpenProductionList') ,
        cache: false,
        success: function (data) {
            var dataArr = data.Productions.Production;
            openProdsArr = [];
            for(var i=0; i < dataArr.length; i++){
                openProdsArr.push({
                    prodId: dataArr[i].ID ,
                    name: dataArr[i].Name ,
                    //jobCount: $(this).find('JobCount').text(),
                    creationTime: new Date( parseInt( dataArr[i].CreationTime )*1000 ),
                    updateTime: new Date( parseInt( dataArr[i].UpdateTime )*1000 ),
                    status: dataArr[i].Status ,
                    //errorCode: $(this).find('ErrorCode').text(),
                    //accountID: $(this).find('AccountID').text(),
                    //indicativeID: $(this).find('IndicativeID').text(),
                    //abdicativeID: $(this).find('AbdicativeID').text(),
                    //audioID: $(this).find('AudioID').text(),
                    //specialIntroMusic: $(this).find('SpecialIntroMusic').text(),
                    //filmID: $(this).find('FilmID').text(),
                    //filmCodes: $(this).find('FilmCodes').text(),
                    userName: dataArr[i].UserName ,
                    priority: dataArr[i].Priority ,
                    //email: $(this).find('Email').text(),
                    //indicativeFrameCount: $(this).find('IndicativeFrameCount').text(),
                    //abdicativeFrameCount: $(this).find('AbdicativeFrameCount').text(),
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
        url: urlGenJSON('getFinishedProductionList') ,
        cache: false,
        success: function (data) {
            var dataArr = data.Productions.Production;
            finishedProdsArr = [];
            for(var i=0; i < dataArr.length; i++){
                finishedProdsArr.push({
                    prodId: dataArr[i].ID,
                    name: dataArr[i].Name,
                    //jobCount: $(this).find('JobCount').text(),
                    creationTime: new Date( parseInt( dataArr[i].CreationTime )*1000 ),
                    updateTime: new Date( parseInt( dataArr[i].UpdateTime )*1000 ),
                    //status: $(this).find('Status').text(),
                    //errorCode: $(this).find('ErrorCode').text(),
                    //accountID: $(this).find('AccountID').text(),
                    //indicativeID: $(this).find('IndicativeID').text(),
                    //abdicativeID: $(this).find('AbdicativeID').text(),
                    //audioID: $(this).find('AudioID').text(),
                    //specialIntroMusic: $(this).find('SpecialIntroMusic').text(),
                    //filmID: $(this).find('FilmID').text(),
                    //filmCodes: $(this).find('FilmCodes').text(),
                    userName: dataArr[i].UserName ,
                    priority: dataArr[i].Priority ,
                    //email: $(this).find('Email').text(),
                    //indicativeFrameCount: $(this).find('IndicativeFrameCount').text(),
                    //abdicativeFrameCount: $(this).find('AbdicativeFrameCount').text(),
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
        url: urlGenJSON('updateProductionPriority') ,
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
        url: urlGenJSON('workOnAccount') ,
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
        url: urlGenJSON('deleteByAdmin') ,
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
        url: urlGenJSON('uploadAudio') ,
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
        url: urlGenJSON('getProductAssociations') ,
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
        url: urlGenJSON('getGroupAssociations') ,
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
        url: urlGenJSON('workOnAccountGroup') ,
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
            groupCustomObligate:editGroupObj.get('groupCustomObligate')
        },
        success: function (data) {
            if ( editGroupObj.get('groupId') == -1 ) {
                editGroupObj.set('groupId', parseInt( data.ID ) );
            };
            getAccountGroupList(function(){
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
        url: urlGenJSON('workOnContentFormat') ,
        cache: false,
        data: {
            contentFormatID: editMotifTypeObj.get('motifTypeId'),
            contentFormatName: editMotifTypeObj.get('name'),
            contentFormatAspect: editMotifTypeObj.get('aspect'),
            task: ( editMotifTypeObj.get('motifTypeId') == -1 ) ? 'createContentFormat' : 'updateContentFormat'
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
                var answerData = $.parseXML('<xmltag>'+data+'</xmltag>');
                $answerData = $(answerData);

                var existProdIdCnt = parseInt($answerData.find('Result').text());
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
        url: urlGenJSON('workOnProduct') ,
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
            can_reformat: editProductObj.get('can_reformat')==true ? 1 : 0
        },
        success: function (data) {
            editProductObj.set('isVisible',false);
            if (callback && typeof(callback) === "function") {
                callback();
            }
        }
    });
};