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
        $('.hide-block').addClass('visible');
        $('.show-block').addClass('hidden');

        var motifListViewObj = $('#motifs-list').data("kendoListView");
        motifListViewObj.clearSelection();
        motifListViewObj.setOptions({selectable: 'true'});

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
        initStatisticTime();
        getStatisticsFunc(function(){
            initCharts();
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

    console.log('selected');
    console.log(selectedMotifUid);
    console.log(selectedMotifId);
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

    $("#upload-input").on('change',function(){
        console.log('upload');
        alert('upload event');
        var loadedMotif = this.files[0];
        uploadMotifFunc(loadedMotif,function(){
            $('#saveMotifBtn').data("kendoButton").enable(true);
        });
    });

    $('#motif-upload-form .img-wr p').show();
    $('#saveMotifBtn').data("kendoButton").enable(false);
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
    console.log('selected');
    console.log(selectedFilmUid);
    console.log(selectedFilmId);
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
    console.log(curItem);
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
            console.log('currClipsList');
            console.log(currClipsList );
            console.log('curMotifsList');
            console.log(curMotifsList);
            checkEmptyMotifs();
            currentProdMotifsDataSource.read();
            currentProdClipsDataSource.read();
            recalcProductionTime();
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
            console.log('currClipsList');
            console.log(currClipsList );
            console.log('curMotifsList');
            console.log(curMotifsList);
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

    console.log('selected');
    console.log(selectedProductUid);
    console.log(selectedProductId);
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

    currentProdClipsDataSource.read();

    if (callback && typeof(callback) === "function") {
        callback();
    }
};

function populateProdMotifsArr(callback) {
    console.log('populateProdMotifsArrs');
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
    console.log('select clip');
    selectedClipUid = this.select().data('uid');
    selectedClipId = this.select().index();
    console.log(selectedClipId);
    if ( currClipsList[selectedClipId].location == 'Indikativ' ) {
        currClipMotifsList = [];
    } else {
        currClipMotifsList = curMotifsList[selectedClipId];
    };
    currentProdMotifsDataSource.read();

    if ( this.select().length > 0 ) {
        bindDeleteFunc($('#deleteClipButton'),true);
    };

    console.log(currClipMotifsList);
    toggleBtnStatus(productionBtnsToDisable,true);
};

// --- replace motif ---
function ApllySelectedMotif(callback) {
    router.navigate('/production');
    var replacedMotif = currentProdMotifsDataSource.getByUid(selectedClipMotifUid);
    var curMotif = $.extend(true, {} , motifsDataSource.getByUid(selectedMotifUid) );
    curMotif.aspect = replacedMotif.aspect;
    console.log('selectedClipMotif');
    /*console.log(selectedClipMotifId);*/
    console.log(replacedMotif);
    console.log(curMotif);

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
    console.log('----delete clip in production----');
    var curDelItem = currentProdClipsDataSource.getByUid(selectedClipUid);
    console.log(curDelItem.id);

    currClipsList.splice(selectedClipId,1);
    curMotifsList.splice(selectedClipId,1);
    currentProdClipsDataSource.read();
    currClipMotifsList = [];
    currentProdMotifsDataSource.read();

    toggleBtnStatus(productionBtnsToDisable,false);
    recalcProductionTime();

    console.log(curMotifsList);
};

function prodReplaceClipFunc(callback){
    console.log('----replace clip in production----');
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
        console.log(curMotifAspect);

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
    console.log('----insert clip in production----');
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
        console.log('insert clip');
        var curMotifAspect = 0;
        var replacingClip = $.extend( true, {}, clipsDataSource.getByUid(selectedProductUid[erppc]) );
        replacingClip.emptyMotifs = replacingClip.motifsNum;

        console.log(replacingClip);

        var curClipsCnt = currentProdClipsDataSource.data().length;
        console.log('curClipsCnt - ' + curClipsCnt);
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

    console.log('ApplyNewSelectedClip');
    console.log(currClipsList);
    console.log(curMotifsList);

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
