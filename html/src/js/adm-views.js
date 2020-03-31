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
    accActivField: 0
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
                //lastLogin: { type: "number" },
                //mailTextDeleteFilm: { type: "string" },
                //mailTextFilmReady: { type: "string" },
                //daysKeepRenderedFilm: { type: "number" },
                quota: { type: "number" },
                budget: { type: "number" }
            }
        }
    },
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

    initEditAudioPlayer();
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

    $('#playCurAudio').removeClass('playing').attr('src','/data/audio/audio_' + curItem.audioId + curItem.extension);
    $('#play-audio-button').each(function(){
        $(this).find('.play').css('opacity',1);
        $(this).find('.stop').css('opacity',0);
    });
    toggleBtnStatus( $('#play-audio-button , #delete-audio-button , #edit-audio-button') ,true);
};

function initEditAudioPlayer() {
    if ( editAudioObj.get('audioId') != -1 ) {
        $('#playCurAudio').removeClass('playing').attr('src','/data/audio/audio_' + editAudioObj.get('audioId') + editAudioObj.get('extension'));
        toggleBtnStatus( $('#play-audio-edit-button') ,true);
    } else {
        $('#playCurAudio').removeClass('playing').attr('src','');
        toggleBtnStatus( $('#play-audio-edit-button') ,false);
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

function newAudioFunc() {
    router.navigate('/adm-audio-edit');
    createNewAudio();
};

function editAudioFunc() {
    router.navigate('/adm-audio-edit');
    editAudioObj.set('task','updateAudio');
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
                groupCustomObligate: { type: "number" }
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
};

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
        if ( (editMotifTypeObj.get('name').length == 0) ||
            (editMotifTypeObj.get('name').length > 255) || (editMotifTypeObj.get('aspect') == 0) ) {
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
    height: 0
});

function initCurProductObj() {
    editProductObj.set('categoriesArr',prodGroups);
    editProductObj.set('codecTypes',codecTypes);
    editProductObj.set('clipFormats',clipFormats);
    editProductObj.set('codecs',codecTypesLists);

    kendo.bind($("#current-product-obj"), editProductObj);
    editProductObj.bind("change", function(e) {
        if ( (editProductObj.get('clipId') == -1) || (parseInt(editProductObj.get('duration')) == 0)
                || (editProductObj.get('name').length == 0) || (editProductObj.get('categoryId') == 0)
                || (editProductObj.get('location').length == 0)
                || ((editProductObj.get('categoryId') != 5000) && (editProductObj.get('categoryId') != 5001) && (editProductObj.get('contentTypes').length == 0)) ) {
            toggleBtnStatus( $('#delete-adm-product-button , #save-adm-product-button') ,false);
        } else {
            toggleBtnStatus( $('#save-adm-product-button') ,true); //#delete-group-button ,
        };
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
                allowedCodecs: { type: "string"},
                resolution: { type: "string" },
                can_reformat: { type: "string" }
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
        editProductObj.set('duration',curItem.duration);
        editProductObj.set('previewFrame',curItem.previewFrame);
        editProductObj.set('description',curItem.description);
        editProductObj.set('contentTypes', getCurProductContentTypes(curItem.clipId) );
        editProductObj.set('productType', curItem.productType);
        editProductObj.set('allowedCodecs', curItem.allowedCodecs.split(','));
        editProductObj.set('resolution', curItem.resolution);
        editProductObj.set('can_reformat', curItem.can_reformat=='1'?true:false);
        editProductObj.set('width', curItem.codec.width);
        editProductObj.set('height', curItem.codec.height);

        $('#edit-prod-video').attr('src','http://virtualcampaign.de/data/products/'+curItem.idString+'/'+curItem.idString+'_ldpi.mp4');

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