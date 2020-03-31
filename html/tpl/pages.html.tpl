<script id="adm-accounts" type="text/x-kendo-template">
    <div>
        <div class="top-panel">
            <h1 class="lang-replace" data-lang="Accounts">Accounts</h1>
            <a href="#/admin-hub" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="delete-account-button" class="popup-btn icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-refresh-func="popupSetAccountName"
                                data-popup-type="dialog-popup"
                                data-popup-content="delete-account-tmp">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="remove"  d="M30.3,58.6l10.5-10.5L30.2,37.5l7.3-7.3l10.6,10.6l10.5-10.5l7.1,7.1L55.1,47.9l10.6,10.6
                                    l-7.3,7.3L47.9,55.1L37.4,65.7L30.3,58.6z"/>
                            </svg>
                            <span class="lang-replace" data-lang="DeleteAccount">Delete Account</span>
                        </button>
                        <button id="new-account-button" class="icon-button"
                                data-role="button"
                                data-click="createNewAccount">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <polygon id="new"  points="48,31.7 56.4,22 57.6,34.8 70.1,31.9 63.5,43 75.3,48 63.5,53 70.1,64.1 57.6,61.2
                                    56.4,74 48,64.3 39.6,74 38.4,61.2 25.9,64.1 32.5,53 20.7,48 32.5,43 25.9,31.9 38.4,34.8 39.6,22 "/>
                            </svg>
                            <span class="lang-replace" data-lang="newProductionButton">New</span>
                        </button>
                        <div class="sep"></div>
                        <button id="save-account-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="workOnAccount">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Save"  d="M34.8,59v4.1h26.3V59H34.8z M38.5,27.8h5.1v10.3h-5.1V27.8z M28,27.7h6.7v12.4h26.5V27.7H68v40.5
                                    H28V27.7z"/>
                            </svg>
                            <span class="lang-replace" data-lang="bt_saveProduction">Save</span>
                        </button>
                    </div>
                    <div class="left-side">
                        <form class="search-form" action="">
                            <input id="account-search-field" class="search-input k-input lang-replace" type="text" placeholder="Enter your search" data-placeholder="search" autocapitalize="off"/>
                            <span id="account-search-clear" class="filter-btn clear-btn hidden"
                                  data-role="button"
                                  data-click="clearAccFilter">&times;</span>
                            <span class="filter-btn search-btn"><span class="k-icon k-i-search"></span></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="two-columns clr">
                <div class="left-column grid-wr">
                    <div id="account-grid" class="grid-custom-style" data-role="grid"
                         data-columns="[
                                 { 'field': 'accId', 'title': 'ID' , 'width': 50 },
                                 { 'field': 'loginUsername' , 'title': currLang['lbl_01'] },
                                 { 'field': 'accountGroupName' , 'title': currLang['accountGroup'] , 'width': 130 }
                              ]"
                         data-source="accountsDataSource"
                         data-selectable="row"
                         data-sortable="true"
                         data-groupable="true"
                         data-change="selectAccountItem">
                    </div>
                </div>
                <div class="right-column">
                    <form class="adm-edit-form" data-bind="visible: isVisible" id="current-account-form" onkeypress="return event.keyCode != 13;">
                        <h3 class="lang-replace" data-lang="Details">Details</h3>
                        <div class="line">
                            <div class="input-wr">
                                <label class="lang-replace" data-lang="Username" for="">Username</label>
                                <input class="k-input" type="text" value="" data-bind="value: usernameField"/>
                            </div>
                            <div class="input-wr">
                                <label class="lang-replace" data-lang="Firstname" for="">Firstname</label>
                                <input class="k-input" type="text" value="" data-bind="value: firstnameField"/>
                            </div>
                        </div>
                        <div class="line">
                            <div class="input-wr">
                                <label class="lang-replace" data-lang="NewPassword" for="">New Password</label>
                                <input class="k-input" type="text" value="" data-bind="value: passwordField"/>
                            </div>
                            <div class="input-wr">
                                <label class="lang-replace" data-lang="Lastname" for="">Lastname</label>
                                <input class="k-input" type="text" value="" data-bind="value: lastnameField"/>
                            </div>
                        </div>
                        <div class="line">
                            <div class="input-wr">
                                <label class="lang-replace" data-lang="Group" for="accGroupSelect">Group</label>
                                <select id="accGroupSelect" name=""
                                        data-role="dropdownlist"
                                        data-select="onSelectAccountGroup"
                                        data-value-field="groupId"
                                        data-text-field="name"
                                        data-bind="source:groupNamesField , value:groupField">
                                </select>
                            </div>
                            <div class="input-wr">
                                <label class="lang-replace" data-lang="email" for="">email</label>
                                <input class="k-input" type="text" value="" data-bind="value: emailField"/>
                            </div>
                        </div>
                        <div class="line">
                            <label class="num-label lang-replace" data-lang="Quota" for="">Quota:</label>
                            <input data-role="numerictextbox"
                                   data-min="0"
                                   data-max="100"
                                   data-format="n0"
                                   data-bind="value: quotaField">
                        </div>
                        <div class="line">
                            <label class="num-label lang-replace" data-lang="Budget" for="">Budget:</label>
                            <input data-role="numerictextbox"
                                   data-min="0"
                                   data-max="100"
                                   data-format="n0"
                                   data-bind="value: budgetField">
                        </div>
                        <div class="line">
                            <div class="input-wr">
                                <label class="lang-replace" data-lang="" for="acc-language">Language:</label>
                                <select id="acc-language" name="acc-language" data-role="dropdownlist"
                                        data-bind="value: languageField">
                                    <option value="en_GB">English</option>
                                    <option value="de_DE">Deutsch</option>
                                    <option value="tr_TR">Türkçe</option>
                                </select>
                            </div>
                        </div>
                        <div class="line">
                            <input class="k-checkbox" type="checkbox" data-role="switch" id="accAct" name="accAct" data-bind="checked: accActivField">
                            <label for="accAct" class="k-checkbox-label lang-replace" data-lang="AccountActiv">Account activ</label>
                        </div>
                        <div class="line">
                            <input class="k-checkbox" type="checkbox" data-role="switch" id="multilogin" name="multilogin" data-bind="checked: multilogin">
                            <label for="multilogin" class="k-checkbox-label lang-replace" data-lang="allow_multilogin">Allow multiple logins</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</script>
<script id="adm-audio-edit" type="text/x-kendo-template">
    <div id="audio-edit-page">
        <div class="top-panel">
            <h1 data-bind="text: name"></h1>
            <a href="#/adm-audio" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="play-audio-edit-button" class="icon-button"
                                data-role="button"
                                data-enable="true"
                                data-click="playAudio">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <g id="playaudio">
                                    <g transform="translate(2634,70)" display="inline">
                                        <g transform="translate(14.4749450683594,11)">
                                            <path id="Semiquaver" d="M-2600.9-55.2h2.4c0,0,3.5,3.5,9.1,8.8s7.3,13.5,0.9,20.6c-2.9,3.2,1.2-4.4,1.2-6.8
                                                c0-2.4-4.7-13-10.3-13c0,0,0,20.6,0,24.2c0,3.5-3.5,7.4-9.1,7.4c-5.6,0-9.1-4.1-7.4-10c1.3-4.3,10-5.6,13.3-1.5L-2600.9-55.2z"
                                                />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span class="text-wr">
                                <span class="play lang-replace" data-lang="Play">Play</span>
                                <span class="stop lang-replace" data-lang="Stop">Stop</span>
                            </span>
                        </button>
                        <div class="sep"></div>
                        <button id="select-audio-edit-button" class="icon-button"
                                data-role="button"
                                data-click="selectAudioFile">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <polygon id="new"  points="48,31.7 56.4,22 57.6,34.8 70.1,31.9 63.5,43 75.3,48 63.5,53 70.1,64.1 57.6,61.2
                                    56.4,74 48,64.3 39.6,74 38.4,61.2 25.9,64.1 32.5,53 20.7,48 32.5,43 25.9,31.9 38.4,34.8 39.6,22 "/>
                            </svg>
                            <span class="lang-replace" data-lang="SelectFile">Select file</span>
                        </button>
                        <button id="save-audio-edit-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="saveAudio">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Save"  d="M34.8,59v4.1h26.3V59H34.8z M38.5,27.8h5.1v10.3h-5.1V27.8z M28,27.7h6.7v12.4h26.5V27.7H68v40.5
                                    H28V27.7z"/>
                            </svg>
                            <span class="lang-replace" data-lang="bt_saveProduction">Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="hide-block">
                <audio id="playCurAudio" src="" class="" controls></audio>
            </div>
            <form id="audio-edit-form" class="item-edit-form" action="" onkeypress="return event.keyCode != 13;">
                <div class="line">
                    <label class="lang-replace" data-lang="SelectedFile" for="">Selected File:</label>
                </div>
                <div class="line">
                    <label for=""><span class="lang-replace" data-lang="DROPDOWN_NAME">Name</span>:</label>
                    <input class="k-input" type="text" data-bind="value: name" value=""/>
                </div>
                <div class="line hide-block">
                    <input id="audio-input-file" type="file" accept="audio/*"/>
                </div>
                <div id="audio-upload-progressbar" data-role="progressbar"
                     data-min="0"
                     data-max="100"
                     data-show-status="false"></div>
            </form>
        </div>
    </div>
</script>
    <script id="adm-audio" type="text/x-kendo-template">
    <div>
        <div class="top-panel">
            <h1 class="lang-replace" data-lang="AudioFiles">Audio Files</h1>
            <a href="#/admin-hub" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="play-audio-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="playAudio">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <g id="playaudio">
                                    <g transform="translate(2634,70)" display="inline">
                                        <g transform="translate(14.4749450683594,11)">
                                            <path id="Semiquaver" d="M-2600.9-55.2h2.4c0,0,3.5,3.5,9.1,8.8s7.3,13.5,0.9,20.6c-2.9,3.2,1.2-4.4,1.2-6.8
                                                c0-2.4-4.7-13-10.3-13c0,0,0,20.6,0,24.2c0,3.5-3.5,7.4-9.1,7.4c-5.6,0-9.1-4.1-7.4-10c1.3-4.3,10-5.6,13.3-1.5L-2600.9-55.2z"
                                                />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span class="text-wr">
                                <span class="play lang-replace" data-lang="Play">Play</span>
                                <span class="stop lang-replace" data-lang="Stop">Stop</span>
                            </span>
                        </button>
                        <button id="delete-audio-button" class="popup-btn icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-refresh-func="popupSetAudioName"
                                data-popup-type="dialog-popup"
                                data-popup-content="delete-audio-tmp">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="remove"  d="M30.3,58.6l10.5-10.5L30.2,37.5l7.3-7.3l10.6,10.6l10.5-10.5l7.1,7.1L55.1,47.9l10.6,10.6
                                    l-7.3,7.3L47.9,55.1L37.4,65.7L30.3,58.6z"/>
                            </svg>
                            <span class="lang-replace" data-lang="Delete">Delete</span>
                        </button>
                        <button id="new-audio-button" class="icon-button"
                                data-role="button"
                                data-click="newAudioFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <polygon id="new"  points="48,31.7 56.4,22 57.6,34.8 70.1,31.9 63.5,43 75.3,48 63.5,53 70.1,64.1 57.6,61.2
                                    56.4,74 48,64.3 39.6,74 38.4,61.2 25.9,64.1 32.5,53 20.7,48 32.5,43 25.9,31.9 38.4,34.8 39.6,22 "/>
                            </svg>
                            <span class="lang-replace" data-lang="newProductionButton">New</span>
                        </button>
                        <div class="sep"></div>
                        <button id="edit-audio-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="editAudioFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="edit"  d="M29.2,59.6l15.1,8.6l-13.6,6.3L29.2,59.6z M44.4,32.2l16.3,9.4L48.2,63.4l-0.9-2.8l-4.8-0.5
                                    l-0.8-3L37,56.9l-1.3-3.3L31.9,54L44.4,32.2z M52.2,21.9c0.5,0,0.9,0.1,1.3,0.3l11.6,6.6c1.4,0.8,1.7,2.9,0.7,4.7l-1.4,2.4
                                    l-16.6-9.6l1.4-2.4C49.9,22.7,51.1,21.9,52.2,21.9z"/>
                            </svg>
                            <span class="lang-replace" data-lang="Edit">Edit</span>
                        </button>
                    </div>
                    <div class="left-side">
                        <form class="search-form" action="">
                            <input id="audio-search-field" class="search-input k-input lang-replace" type="text" placeholder="Enter your search" data-placeholder="search" autocapitalize="off"/>
                            <span id="audio-search-clear" class="filter-btn clear-btn hidden"
                                  data-role="button"
                                  data-click="clearAudioFilter">&times;</span>
                            <span class="filter-btn search-btn"><span class="k-icon k-i-search"></span></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="hide-block">
                <audio id="playCurAudio" src="" class="" controls></audio>
            </div>
            <div class="two-columns clr">
                <div class="one-column grid-wr">
                    <div id="audio-grid" class="grid-custom-style" data-role="grid"
                         data-columns="[
                                 { 'field': 'audioId', 'title': 'ID' , 'width': 50 },
                                 { 'field': 'name' , 'title': currLang['Name_TEXT'] , 'width': 360 },
                                 { 'field': 'mediaFormat' , 'title': currLang['Format'] , 'width': 110 },
                                 { 'field': 'accountName' , 'title': currLang['lbl_01'] , 'width': 210 }
                              ]"
                         data-source="audioDataSource"
                         data-selectable="row"
                         data-sortable="true"
                         data-change="selectAudioItem">
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>
<script id="adm-finished-prods" type="text/x-kendo-template">
    <div>
        <div class="top-panel">
            <h1 class="lang-replace" data-lang="productionsLabel">Productions</h1>
            <a href="#/admin-hub" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button class="icon-button"
                                data-role="button"
                                data-click="getFinishedProductionList">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="refresh" d="M25.8,47.9l12.7,5.2l-5.5,3c2.9,5.4,8.6,9.2,15.1,9.2c7,0,12.9-4.1,15.7-10.1h5c-3,8.6-11.1,14.8-20.7,14.8
                                    c-8.3,0-15.6-4.7-19.3-11.6l-5.8,3.1L25.8,47.9z M48.2,26.1c8.3,0,15.4,4.6,19.1,11.4l5.5-3.1l-2.3,13.6l-12.9-4.9l5.6-3.2
                                    c-2.9-5.4-8.5-9-15.1-9c-7,0-12.9,4.1-15.7,10.1h-5C30.5,32.3,38.6,26.1,48.2,26.1z"/>
                            </svg>
                            <span class="lang-replace" data-lang="Refresh">Refresh</span>
                        </button>
                    </div>
                    <div class="left-side">
                        <form class="search-form" action="">
                            <input id="finished-search-field" class="search-input k-input lang-replace" type="text" placeholder="Enter your search" data-placeholder="search" autocapitalize="off"/>
                            <span id="finished-search-clear" class="filter-btn clear-btn hidden"
                                  data-role="button"
                                  data-click="clearFinishedFilter">&times;</span>
                            <span class="filter-btn search-btn"><span class="k-icon k-i-search"></span></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="two-columns clr">
                <div class="one-column grid-wr">
                    <div id="finished-grid" class="grid-custom-style" data-role="grid"
                         data-columns="[
                                 { 'field': 'userName', 'title': currLang['lbl_01'] , 'width': 150 },
                                 { 'field': 'prodId', 'title': 'ID' , 'width': 65 },
                                 { 'field': 'name' , 'title': currLang['Name_TEXT'] },
                                 { 'field': 'priority' , 'title': currLang['Priority'] , 'width': 75 },
                                 { 'field': 'creationTime' , 'title': currLang['Submitted'] , 'width': 140 , 'format': '{0: dd.MM.yyyy - HH:mm}' },
                                 { 'field': 'updateTime' , 'title': currLang['Finished'] , 'width': 140 , 'format': '{0: dd.MM.yyyy - HH:mm}' },
                                 { 'field': 'clipFrameCount' , 'title': currLang['Frames'] , 'width': 75 }
                              ]"
                         data-source="finishedProdsDataSource"
                         data-selectable="false"
                         data-sortable="true">
                    </div>
                    <!--data-pageable="{buttonCount: 5}"-->
                </div>
            </div>
        </div>
    </div>
</script>
<script id="adm-groups" type="text/x-kendo-template">
    <div>
        <div class="top-panel">
            <h1 class="lang-replace" data-lang="Groups">Groups</h1>
            <a href="#/admin-hub" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="delete-group-button" class="popup-btn icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-refresh-func="popupSetGroupName"
                                data-popup-type="dialog-popup"
                                data-popup-content="delete-group-tmp">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="remove"  d="M30.3,58.6l10.5-10.5L30.2,37.5l7.3-7.3l10.6,10.6l10.5-10.5l7.1,7.1L55.1,47.9l10.6,10.6
                                    l-7.3,7.3L47.9,55.1L37.4,65.7L30.3,58.6z"/>
                            </svg>
                            <span class="lang-replace" data-lang="DeleteGroup">Delete Group</span>
                        </button>
                        <button id="new-group-button" class="icon-button"
                                data-role="button"
                                data-click="createNewGroup">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <polygon id="new"  points="48,31.7 56.4,22 57.6,34.8 70.1,31.9 63.5,43 75.3,48 63.5,53 70.1,64.1 57.6,61.2
                                    56.4,74 48,64.3 39.6,74 38.4,61.2 25.9,64.1 32.5,53 20.7,48 32.5,43 25.9,31.9 38.4,34.8 39.6,22 "/>
                            </svg>
                            <span class="lang-replace" data-lang="newProductionButton">New</span>
                        </button>
                        <div class="sep"></div>
                        <button id="save-group-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-popup-type="dialog-popup"
                                data-popup-content="save-group-tmp">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Save"  d="M34.8,59v4.1h26.3V59H34.8z M38.5,27.8h5.1v10.3h-5.1V27.8z M28,27.7h6.7v12.4h26.5V27.7H68v40.5
                                    H28V27.7z"/>
                            </svg>
                            <span class="lang-replace" data-lang="bt_saveProduction">Save</span>
                        </button>
                    </div>
                    <div class="left-side">
                        <form class="search-form" action="">
                            <input id="group-search-field" class="search-input k-input lang-replace" type="text" placeholder="Enter your search" data-placeholder="search" autocapitalize="off"/>
                            <span id="group-search-clear" class="filter-btn clear-btn hidden"
                                  data-role="button"
                                  data-click="clearGroupFilter">&times;</span>
                            <span class="filter-btn search-btn"><span class="k-icon k-i-search"></span></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content">

            <div class="two-columns clr shorter-left-column">
                <div class="left-column grid-wr">
                    <div id="groups-grid" class="grid-custom-style" data-role="grid"
                         data-columns="[
                                 { 'field': 'groupId', 'title': 'ID' , 'width': 50 },
                                 { 'field': 'name' , 'title': currLang['GroupName'] }
                              ]"
                         data-source="groupsDataSource"
                         data-selectable="row"
                         data-sortable="true"
                         data-change="selectGroupItem">
                    </div>
                </div>
                <div class="right-column custom-table-style" id="current-group-obj" data-bind="visible: isVisible">
                    <form class="adm-edit-form inline-inputs" onkeypress="return event.keyCode != 13;">
                        <div class="columns-btm-panel edit-object-tabs" id="group-tabs" data-role="tabstrip">
                            <ul>
                                <li class="k-state-active"><span class="k-link">General</span></li>
                                <li><span class="k-link lang-replace" data-lang="Accounts">Accounts</span></li>
                                <li><span class="k-link lang-replace" data-lang="Products">Products</span></li>
                                <li><span class="k-link lang-replace" data-lang="Audio">Audio</span></li>
                            </ul>
                            <!--TAB1-->
                            <div class="lists-wr">
                                <h3 class="lang-replace" data-lang="Details">Details</h3>
                                <div class="line ">
                                    <label for=""><span class="lang-replace" data-lang="Groupname">Group Name</span>:</label>
                                    <input class="k-input" type="text" value="" data-bind="value: name"/>
                                </div>
                                <div class="line ">
                                    <label for="groupIndikativSelect"><span class="lang-replace" data-lang="Indikativ">Indikativ</span>:</label>
                                    <select id="groupIndikativSelect" name="indicativ"
                                            data-role="dropdownlist"
                                            data-change="onSelectGroupIndikativ"
                                            data-value-field="clipId"
                                            data-text-field="name"
                                            data-bind="source:dicativesArr , value:indicative"
                                            data-option-label="{clipId:'-1',name:'No clip'}">
                                    </select>
                                </div>
                                <div class="line">
                                    <label for="groupAbdikativSelect"><span class="lang-replace" data-lang="Abdikativ">Abdikativ</span>:</label>
                                    <select id="groupAbdikativSelect" name="abdicativ"
                                            data-role="dropdownlist"
                                            data-change="onSelectGroupAbdikativ"
                                            data-value-field="clipId"
                                            data-text-field="name"
                                            data-bind="source:dicativesArr , value:abdicative"
                                            data-option-label="{clipId:'-1',name:'No clip'}">
                                    </select>
                                </div>
                                <div class="line">
                                    <label for=""><span class="lang-replace" data-lang="descriptionLabel">Description</span>:</label>
                                    <input class="k-input" type="text" value="" data-bind="value: description"/>
                                </div>
                                <div class="line">
                                    <label for=""><span class="lang-replace" data-lang="CustomField">Custom Field</span>:</label>
                                    <input class="k-input" type="text" value="" data-bind="value: groupCustomField"/>
                                </div>
                                <div class="line checkbox-line">
                                    <input class="k-checkbox" type="checkbox" data-role="switch" id="groupObl" name="groupObl" data-bind="checked: groupCustomObligate">
                                    <label for="groupObl" class="k-checkbox-label pull-right"><span class="lang-replace" data-lang="mandatory">mandatory</span>:</label>
                                </div>
                                <div class="line checkbox-line">
                                    <input class="k-checkbox" type="checkbox" data-role="switch" id="onlinethreesixty" name="onlinethreesixty" data-bind="checked: onlinethreesixty">
                                    <label for="onlinethreesixty" class="k-checkbox-label pull-right"><span class="lang-replace" data-lang="onlinethreesixty">360° Online Viewer</span>:</label>
                                </div>
                            </div>
                            <!--TAB2-->
                            <div class="lists-wr">
                                <div class="lists-btns-wr">
                                    <span id="add-acc-gr-btn" class="k-button" name="acc-gr"
                                          data-role="button"
                                          data-click="addTabListsFunc"
                                          data-enable="false">&laquo;</span>
                                    <span id="remove-acc-gr-btn" class="k-button" name="acc-gr"
                                          data-role="button"
                                          data-click="removeTabListsFunc"
                                          data-enable="false">&raquo;</span>
                                </div>
                                <div class="left-list">
                                    <div id="acc-gr-grid" class="grid-custom-style" data-role="grid"
                                         data-enable-btn="remove-acc-gr-btn"
                                         data-columns="[
                                                 { 'field': 'accId', 'title': 'ID' , 'width': 50 },
                                                 { 'field': 'loginUsername' , 'title': currLang['Name_TEXT'] }
                                              ]"
                                         data-source="accGrDataSource"
                                         data-selectable="multiple,row"
                                         data-sortable="true"
                                         data-change="enableListOperationBtn">
                                    </div>
                                </div>
                                <div class="right-list">
                                    <div id="acc-gr-full-grid" class="grid-custom-style" data-role="grid"
                                         data-enable-btn="add-acc-gr-btn"
                                         data-columns="[
                                                 { 'field': 'accId', 'title': 'ID' , 'width': 50 },
                                                 { 'field': 'loginUsername' , 'title': currLang['Name_TEXT'] }
                                              ]"
                                         data-source="accGrFullDataSource"
                                         data-selectable="multiple,row"
                                         data-sortable="true"
                                         data-change="enableListOperationBtn">
                                    </div>
                                </div>
                            </div>
                            <!--TAB3-->
                            <div class="lists-wr">
                                <div class="lists-btns-wr">
                                    <span id="add-prod-gr-btn" class="k-button" name="prod-gr"
                                          data-role="button"
                                          data-click="addTabListsFunc"
                                          data-enable="false">&laquo;</span>
                                    <span id="remove-prod-gr-btn" class="k-button" name="prod-gr"
                                          data-role="button"
                                          data-click="removeTabListsFunc"
                                          data-enable="false">&raquo;</span>
                                </div>
                                <div class="left-list">
                                    <div id="prod-gr-grid" class="grid-custom-style" data-role="grid"
                                         data-enable-btn="remove-prod-gr-btn"
                                         data-columns="[
                                                 { 'field': 'clipId', 'title': 'ID' , 'width': 55 },
                                                 { 'field': 'categoryId', 'title': currLang['Type'] , 'width': 65 , 'template': kendo.template($('#prodGrDikativeFlagTemplate').html()) },
                                                 { 'field': 'name' , 'title': currLang['Name_TEXT'] }
                                              ]"
                                         data-source="prodGrDataSource"
                                         data-selectable="multiple,row"
                                         data-sortable="true"
                                         data-change="enableListOperationBtn">
                                    </div>
                                </div>
                                <div class="right-list">
                                    <div id="prod-gr-full-grid" class="grid-custom-style" data-role="grid"
                                         data-enable-btn="add-prod-gr-btn"
                                         data-columns="[
                                                 { 'field': 'clipId', 'title': 'ID' , 'width': 55 },
                                                 { 'field': 'categoryId', 'title': currLang['Type'] , 'width': 65 , 'template': kendo.template($('#prodGrDikativeFlagTemplate').html()) },
                                                 { 'field': 'name' , 'title': currLang['Name_TEXT'] }
                                              ]"
                                         data-source="prodGrFullDataSource"
                                         data-selectable="multiple,row"
                                         data-sortable="true"
                                         data-change="enableListOperationBtn">
                                    </div>
                                </div>
                            </div>
                            <!--TAB4-->
                            <div class="lists-wr">
                                <div class="lists-btns-wr">
                                    <span id="add-audio-gr-btn" class="k-button" name="audio-gr"
                                          data-role="button"
                                          data-click="addTabListsFunc"
                                          data-enable="false">&laquo;</span>
                                    <span id="remove-audio-gr-btn" class="k-button" name="audio-gr"
                                          data-role="button"
                                          data-click="removeTabListsFunc"
                                          data-enable="false">&raquo;</span>
                                </div>
                                <div class="left-list">
                                    <div id="audio-gr-grid" class="grid-custom-style" data-role="grid"
                                         data-enable-btn="remove-audio-gr-btn"
                                         data-columns="[
                                                 { 'field': 'audioId', 'title': 'ID' , 'width': 50 },
                                                 { 'field': 'name' , 'title': currLang['Name_TEXT'] }
                                              ]"
                                         data-source="audioGrDataSource"
                                         data-selectable="multiple,row"
                                         data-sortable="true"
                                         data-change="enableListOperationBtn">
                                    </div>
                                </div>
                                <div class="right-list">
                                    <div id="audio-gr-full-grid" class="grid-custom-style" data-role="grid"
                                         data-enable-btn="add-audio-gr-btn"
                                         data-columns="[
                                                 { 'field': 'audioId', 'title': 'ID' , 'width': 50 },
                                                 { 'field': 'name' , 'title': currLang['Name_TEXT'] }
                                              ]"
                                         data-source="audioGrFullDataSource"
                                         data-selectable="multiple,row"
                                         data-sortable="true"
                                         data-change="enableListOperationBtn">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--TABS END-->
                    </form>
                </div>
            </div>

        </div>
    </div>
</script>

<script id="prodGrDikativeFlagTemplate" type="text/x-kendo-template">
    # if (categoryId == 5000) {#
        Indikativ
    # } else if (categoryId == 5001) { #
        Abdikativ
    # } else { #
        Clip
    # } #
</script>
<script id="adm-motif-types-edit" type="text/x-kendo-template">
    <div id="motif-types-edit-page">
        <div class="top-panel">
            <h1 data-bind="text: name"></h1>
            <a href="#/adm-motif-types" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="save-motif-types-edit-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="workOnContentFormat">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Save"  d="M34.8,59v4.1h26.3V59H34.8z M38.5,27.8h5.1v10.3h-5.1V27.8z M28,27.7h6.7v12.4h26.5V27.7H68v40.5
                                    H28V27.7z"/>
                            </svg>
                            <span class="lang-replace" data-lang="bt_saveProduction">Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content">
            <form class="item-edit-form" action="" onkeypress="return event.keyCode != 13;">
                <h3 class="lang-replace" data-lang="Details">Details</h3>
                <div class="line">
                    <label for=""><span class="lang-replace" data-lang="DROPDOWN_NAME">Name</span>:</label>
                    <input class="k-input" type="text" data-bind="value: name" value=""/>
                </div>
                <div class="line">
                    <label for=""><span class="lang-replace" data-lang="width">Width</span>:</label>
                    <input class="k-input" type="text" data-bind="value: width" value=""/>
                </div>
                <div class="line">
                    <label for=""><span class="lang-replace" data-lang="height">Height</span>:</label>
                    <input class="k-input" type="text" data-bind="value: height" value=""/>
                </div>
                <div class="line">
                    <label for=""><span class="lang-replace" data-lang="AspectLABEL">Aspect (Width/Height)</span>:</label>
                    <input class="k-input" type="text" data-bind="value: aspect" value="" readonly/>
                </div>
                <div class="line">
                    <a href="#/motifSelect-for-preview" id="motif-type-preview" class="motif-type-preview"
                       data-bind="style: {width:calculatedWidth,height:calculatedHeight,lineHeight:calculatedHeight}">A</a>
                </div>
            </form>
        </div>
    </div>
</script>
<script id="adm-motif-types" type="text/x-kendo-template">
    <div>
        <div class="top-panel">
            <h1 class="lang-replace" data-lang="MotifTypes">Motifs Types</h1>
            <a href="#/admin-hub" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="delete-motif-type-button" class="popup-btn icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-refresh-func="popupSetMotifTypeName"
                                data-popup-type="dialog-popup"
                                data-popup-content="delete-motif-type-tmp">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="remove"  d="M30.3,58.6l10.5-10.5L30.2,37.5l7.3-7.3l10.6,10.6l10.5-10.5l7.1,7.1L55.1,47.9l10.6,10.6
                                    l-7.3,7.3L47.9,55.1L37.4,65.7L30.3,58.6z"/>
                            </svg>
                            <span class="lang-replace" data-lang="Delete">Delete</span>
                        </button>
                        <button id="new-motif-type-button" class="icon-button"
                                data-role="button"
                                data-click="newMotifTypeFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <polygon id="new"  points="48,31.7 56.4,22 57.6,34.8 70.1,31.9 63.5,43 75.3,48 63.5,53 70.1,64.1 57.6,61.2
                                    56.4,74 48,64.3 39.6,74 38.4,61.2 25.9,64.1 32.5,53 20.7,48 32.5,43 25.9,31.9 38.4,34.8 39.6,22 "/>
                            </svg>
                            <span class="lang-replace" data-lang="newProductionButton">New</span>
                        </button>
                        <div class="sep"></div>
                        <button id="edit-motif-type-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="editMotifTypeFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="edit"  d="M29.2,59.6l15.1,8.6l-13.6,6.3L29.2,59.6z M44.4,32.2l16.3,9.4L48.2,63.4l-0.9-2.8l-4.8-0.5
                                    l-0.8-3L37,56.9l-1.3-3.3L31.9,54L44.4,32.2z M52.2,21.9c0.5,0,0.9,0.1,1.3,0.3l11.6,6.6c1.4,0.8,1.7,2.9,0.7,4.7l-1.4,2.4
                                    l-16.6-9.6l1.4-2.4C49.9,22.7,51.1,21.9,52.2,21.9z"/>
                            </svg>
                            <span class="lang-replace" data-lang="Edit">Edit</span>
                        </button>
                    </div>
                    <div class="left-side">
                        <form class="search-form" action="">
                            <input id="motif-type-search-field" class="search-input k-input lang-replace" type="text" placeholder="Enter your search" data-placeholder="search" autocapitalize="off"/>
                            <span id="motif-type-search-clear" class="filter-btn clear-btn hidden"
                                  data-role="button"
                                  data-click="clearMotifTypeFilter">&times;</span>
                            <span class="filter-btn search-btn"><span class="k-icon k-i-search"></span></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="two-columns clr">
                <div class="one-column grid-wr">
                    <div id="motif-type-grid" class="grid-custom-style" data-role="grid"
                         data-columns="[
                                 { 'field': 'motifTypeId', 'title': 'ID' , 'width': 50 },
                                 { 'field': 'name' , 'title': currLang['Name_TEXT'] },
                                 { 'field': 'width' , 'title': currLang['width'] , 'width': 60 },
                                 { 'field': 'height' , 'title': currLang['height'] , 'width': 60 },
                                 { 'field': 'aspect' , 'title': currLang['aspectRatio'] , 'width': 110 },
                                 { 'field': 'aspect' , 'title': currLang['Preview'] , 'width': 400 , 'template': kendo.template($('#motifTypeIconPreviewTemplate').html()) , 'sortable': 'false' }
                              ]"
                         data-source="motifTypeDataSource"
                         data-selectable="row"
                         data-sortable="true"
                         data-groupable="true"
                         data-change="selectMotifTypeItem">
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>

<script id="motifTypeIconPreviewTemplate" type="text/x-kendo-template">
    <i class="icon-motif-ratio" style="width:#:iconWidth#px;height:18px">A</i>
</script>
<script id="adm-open-prods" type="text/x-kendo-template">
    <div>
        <div class="top-panel">
            <h1 class="lang-replace" data-lang="productionsLabel">Productions</h1>
            <a href="#/admin-hub" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-menu">
                    <div class="right-side">
                        <button id="change-priority-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-refresh-func="initOpenedProdObj"
                                data-popup-type=""
                                data-popup-content="change-priority-tmp">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="edit"  d="M29.2,59.6l15.1,8.6l-13.6,6.3L29.2,59.6z M44.4,32.2l16.3,9.4L48.2,63.4l-0.9-2.8l-4.8-0.5
                                    l-0.8-3L37,56.9l-1.3-3.3L31.9,54L44.4,32.2z M52.2,21.9c0.5,0,0.9,0.1,1.3,0.3l11.6,6.6c1.4,0.8,1.7,2.9,0.7,4.7l-1.4,2.4
                                    l-16.6-9.6l1.4-2.4C49.9,22.7,51.1,21.9,52.2,21.9z"/>
                            </svg>
                            <span class="lang-replace" data-lang="ChangePriority">Change Priority</span>
                        </button>
                        <button class="icon-button"
                                data-role="button"
                                data-click="getOpenProductionList">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="refresh" d="M25.8,47.9l12.7,5.2l-5.5,3c2.9,5.4,8.6,9.2,15.1,9.2c7,0,12.9-4.1,15.7-10.1h5c-3,8.6-11.1,14.8-20.7,14.8
                                    c-8.3,0-15.6-4.7-19.3-11.6l-5.8,3.1L25.8,47.9z M48.2,26.1c8.3,0,15.4,4.6,19.1,11.4l5.5-3.1l-2.3,13.6l-12.9-4.9l5.6-3.2
                                    c-2.9-5.4-8.5-9-15.1-9c-7,0-12.9,4.1-15.7,10.1h-5C30.5,32.3,38.6,26.1,48.2,26.1z"/>
                            </svg>
                            <span class="lang-replace" data-lang="Refresh">Refresh</span>
                        </button>
                    </div>
                    <div class="left-side">
                        <form class="search-form" action="">
                            <input id="opened-search-field" class="search-input k-input lang-replace" type="text" placeholder="Enter your search" data-placeholder="search" autocapitalize="off"/>
                            <span id="opened-search-clear" class="filter-btn clear-btn hidden"
                                  data-role="button"
                                  data-click="clearOpenedFilter">&times;</span>
                            <span class="filter-btn search-btn"><span class="k-icon k-i-search"></span></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="two-columns clr">
                <div class="one-column grid-wr">

                    <div id="opened-grid" class="grid-custom-style" data-role="grid"
                         data-columns="[
                                 { 'field': 'userName', 'title': currLang['lbl_01'] , 'width': 150 },
                                 { 'field': 'prodId', 'title': 'ID' , 'width': 65 },
                                 { 'field': 'name' , 'title': currLang['Name_TEXT'] },
                                 { 'field': 'priority' , 'title': currLang['Priority'] , 'width': 75 },
                                 { 'field': 'creationTime' , 'title': currLang['Submitted'] , 'width': 140 , 'format': '{0: dd.MM.yyyy - HH:mm}' },
                                 { 'field': 'updateTime' , 'title': currLang['Finished'] , 'width': 140 , 'format': '{0: dd.MM.yyyy - HH:mm}' },
                                 { 'field': 'status' , 'title': currLang['ProductionStatus'] , 'width': 140 },
                                 { 'field': 'clipFrameCount' , 'title': currLang['Frames'] , 'width': 75 }
                              ]"
                         data-source="openedProdsDataSource"
                         data-selectable="row"
                         data-sortable="true"
                         data-change="selectOpenedItem">
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>
<script id="adm-products" type="text/x-kendo-template">
    <div>
        <div class="top-panel">
            <h1 class="lang-replace" data-lang="Products">Products</h1>
            <a href="#/admin-hub" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="delete-adm-product-button" class="popup-btn icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-refresh-func="popupSetProductName"
                                data-popup-type="dialog-popup"
                                data-popup-content="delete-adm-product-tmp">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="remove"  d="M30.3,58.6l10.5-10.5L30.2,37.5l7.3-7.3l10.6,10.6l10.5-10.5l7.1,7.1L55.1,47.9l10.6,10.6
                                    l-7.3,7.3L47.9,55.1L37.4,65.7L30.3,58.6z"/>
                            </svg>
                            <span class="lang-replace" data-lang="Delete"></span>
                        </button>
                        <button id="new-adm-product-button" class="icon-button"
                                data-role="button"
                                data-click="createNewProduct">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <polygon id="new"  points="48,31.7 56.4,22 57.6,34.8 70.1,31.9 63.5,43 75.3,48 63.5,53 70.1,64.1 57.6,61.2
                                    56.4,74 48,64.3 39.6,74 38.4,61.2 25.9,64.1 32.5,53 20.7,48 32.5,43 25.9,31.9 38.4,34.8 39.6,22 "/>
                            </svg>
                            <span class="lang-replace" data-lang="newProductionButton">New</span>
                        </button>
                        <div class="sep"></div>
                        <button id="save-adm-product-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="checkProductID">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Save"  d="M34.8,59v4.1h26.3V59H34.8z M38.5,27.8h5.1v10.3h-5.1V27.8z M28,27.7h6.7v12.4h26.5V27.7H68v40.5
                                    H28V27.7z"/>
                            </svg>
                            <span class="lang-replace" data-lang="bt_saveProduction">Save</span>
                        </button>
                    </div>
                    <div class="left-side">
                        <form class="search-form" action="">
                            <input id="adm-product-search-field" class="search-input k-input lang-replace" type="text" placeholder="Enter your search" data-placeholder="search" autocapitalize="off"/>
                            <span id="adm-product-search-clear" class="filter-btn clear-btn hidden"
                                  data-role="button"
                                  data-click="clearAdmProductFilter">&times;</span>
                            <span class="filter-btn search-btn"><span class="k-icon k-i-search"></span></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="two-columns clr">
                <div class="left-column grid-wr">
                    <div id="adm-products-grid" class="grid-custom-style" data-role="grid"
                         data-columns="[
                                 { 'field': 'clipId', 'title': 'ID' , 'width': 50 },
                                 { 'field': 'master_ID', 'title': 'MasterID' , 'width': 75 },
                                 { 'field': 'productTypeName' , 'title': currLang['Type'] , 'width': 50 },
                                 { 'field': 'name' , 'title': currLang['DROPDOWN_NAME'] }
                              ]"
                         data-source="admProductsDataSource"
                         data-row-template="admProductsRowTemplate"
                         data-selectable="row"
                         data-sortable="true"
                         data-groupable="true"
                         data-change="selectAdmProductItem">
                    </div>
                </div>

                <div class="right-column custom-table-style" id="current-product-obj" data-bind="visible: isVisible">
                    <form class="adm-edit-form inline-inputs" onkeypress="return event.keyCode != 13;">

                        <div class="columns-btm-panel edit-object-tabs" id="product-tabs" data-role="tabstrip">
                            <ul>
                                <li class="k-state-active"><span class="k-link">General</span></li>
                                <li><span class="k-link lang-replace" data-lang="MOTIF_MULTIPLE">Motifs</span></li>
                                <li><span class="k-link lang-replace" data-lang="Groups">Groups</span></li>
                            </ul>
                            <!--TAB1-->
                            <div class="lists-wr">
                                <h3 class="lang-replace" data-lang="Details">Details</h3>
                                <div class="form-video-wr">
                                    <div class="line type-col">
                                        <label for="">ID:</label>
                                        <input class="k-input short" type="text" value="" data-bind="value: clipId"/>
                                        <label for="">Type:</label>
                                        <select id="prodAudioSelect" name=""
                                                data-role="dropdownlist"
                                                data-value-primitive="true"
                                                data-change="onSelectProductType"
                                                data-value-field="product_type_id"
                                                data-text-field="name"
                                                data-bind="source:clipFormats , value:productType">
                                        </select>
                                    </div>
                                    <div class="line type-col">
                                        <label for="">Master_ID:</label>
                                        <input class="k-input short" type="text" value=""
                                               data-bind="value: master_ID, enabled: masterIdEnabled"/>
                                        <label for="">IN:</label>
                                        <input style="width:39px;padding:2px 4px 3px;" class="k-input short" type="text" value="" data-bind="value: inFrame"/>
                                        <label style="width:36px;margin-right:6px;" for="">OUT:</label>
                                        <input style="width:39px;padding:2px 4px 3px;" class="k-input short" type="text" value="" data-bind="value: outFrame"/>
                                    </div>
                                    <div class="line">
                                        <label for=""><span class="lang-replace" data-lang="">Name</span>:</label>
                                        <input class="k-input" type="text" value="" data-bind="value: name"/>
                                    </div>
                                    <div class="line">
                                        <label for="productCategorySelect"><span class="lang-replace" data-lang="Category">Category</span>:</label>
                                        <select id="productCategorySelect" name=""
                                                data-role="dropdownlist"
                                                data-value-field="categoryId"
                                                data-text-field="productGroupName"
                                                data-bind="source:categoriesArr , value:categoryId">
                                        </select>
                                    </div>
                                    <div class="line">
                                        <label for=""><span class="lang-replace" data-lang="">Description</span>:</label>
                                        <input class="k-input" type="text" value="" data-bind="value: description"/>
                                    </div>
                                    <div class="line">
                                        <label for=""><span class="lang-replace" data-lang="locationLabel">Location</span>:</label>
                                        <input class="k-input" type="text" value="" data-bind="value: location"/>
                                    </div>
                                    <div class="line duration-line">
                                        <label for=""><span class="lang-replace" data-lang="">#Frames</span>:</label>
                                        <input class="k-input short" type="text" readonly value="" data-bind="value: duration"/>
                                        <label class="second-label" for=""><span class="lang-replace" data-lang="PreviewFrame">Preview frame</span>:</label>
                                        <input class="k-input short" type="text" value="" data-bind="value: previewFrame"/>
                                    </div>

                                    <div class="line video-line">
                                        <label for="">Preview:</label>
                                        <div class="pull-left">
                                            <div class="video-wr">
                                                <video id="edit-prod-video" width="180" height="100" src="" autoplay></video>
                                            </div>
                                            <p class="text-right" style="color:#888"><span data-bind="text: width"></span> x <span data-bind="text: height"></span></p>
                                        </div>
                                    </div>

                                    <div class="line type-col">
                                        <label for=""><span class="lang-replace" data-lang="Resolution">Resolution</span>:</label>
                                        <select id="productResolutionSelect" name=""
                                                data-role="dropdownlist"
                                                data-change="onSelectResolution"
                                                data-value-field="codec_type_id"
                                                data-text-field="name"
                                                data-bind="source:codecTypes , value:resolution">
                                        </select>
                                        <span style="padding:2px 2px 1px;" class="k-button pull-right" data-role="button" data-click="createPreviewProduction">create Preview</span>
                                    </div>
                                    <div class="line">
                                        <div class="check-wr right-sided">
                                            <input type="checkbox" class="k-checkbox"
                                                   id="reformat_ch" name="reformat_ch"
                                                   data-bind="checked: can_reformat">
                                            <label for="reformat_ch" class="k-checkbox-label"><span class="lang-replace" data-lang="Can reformat">Can reformat</span>:</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="codec-types pull-left">
                                    <p>Available encoding formats:</p>
                                    <div class="col">
                                        <h6>MP4</h6>
                                        <div id="mp4-list" class="no-style-widget"
                                             data-role="listview"
                                             data-selectable="false"
                                             data-bind="source: codecs.mp4"
                                             data-template="codec-adm-tmp">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <h6>WMV</h6>
                                        <div id="wmv-list" class="no-style-widget"
                                             data-role="listview"
                                             data-selectable="false"
                                             data-bind="source: codecs.wmv"
                                             data-template="codec-adm-tmp">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <h6>VR 360&deg;</h6>
                                        <div id="vr360-list" class="no-style-widget"
                                             data-role="listview"
                                             data-selectable="false"
                                             data-bind="source: codecs.vr360"
                                             data-template="codec-adm-tmp">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <h6>SPECIAL</h6>
                                        <div id="special-list" class="no-style-widget"
                                             data-role="listview"
                                             data-selectable="false"
                                             data-bind="source: codecs.special"
                                             data-template="codec-adm-tmp">
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <!--TAB2-->
                            <div class="lists-wr">
                                <span id="add-new-product-motif" class="lang-replace" data-role="button" data-click="addContentType2Product" data-lang="addMotifButton">Add</span>
                                <div id="cur-content-type-list" class="no-style-widget"
                                     data-role="listview"
                                     data-selectable="false"
                                     data-bind="source: contentTypes"
                                     data-template="motifRowTemplate"
                                     data-remove="recalcContentNames">
                                </div>
                            </div>
                            <!--TAB3-->
                            <div class="lists-wr">
                                <div class="lists-btns-wr">
                                    <span id="add-prod-groups-btn" class="k-button" name="prod-groups"
                                          data-role="button"
                                          data-click="addTabListsFunc"
                                          data-enable="false">&laquo;</span>
                                    <span id="remove-prod-groups-btn" class="k-button" name="prod-groups"
                                          data-role="button"
                                          data-click="removeTabListsFunc"
                                          data-enable="false">&raquo;</span>
                                </div>
                                <div class="left-list">
                                    <div id="prod-groups-grid" class="grid-custom-style" data-role="grid"
                                         data-enable-btn="remove-prod-groups-btn"
                                         data-columns="[
                                                 { 'field': 'groupId', 'title': 'ID' , 'width': 50 },
                                                 { 'field': 'name' , 'title': currLang['Name_TEXT'] }
                                              ]"
                                         data-source="groupProdDataSource"
                                         data-selectable="multiple,row"
                                         data-sortable="true"
                                         data-change="enableListOperationBtn">
                                    </div>
                                </div>
                                <div class="right-list">
                                    <div id="prod-groups-full-grid" class="grid-custom-style" data-role="grid"
                                         data-enable-btn="add-prod-groups-btn"
                                         data-columns="[
                                                 { 'field': 'groupId', 'title': 'ID' , 'width': 50 },
                                                 { 'field': 'name' , 'title': currLang['Name_TEXT'] }
                                              ]"
                                         data-source="groupProdFullDataSource"
                                         data-selectable="multiple,row"
                                         data-sortable="true"
                                         data-change="enableListOperationBtn">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--TABS END-->
                    </form>
                </div>

            </div>
        </div>
    </div>
</script>

<script id="admProductsRowTemplate" type="text/x-kendo-tmpl">
    <tr data-uid="#:uid #">
        <td>#:clipId#</td>
        <td>#:master_ID#</td>
        <td>#:productTypeName#</td>
        <td>
            #:name#
            # if (motifsNum == 0){ #*# } #
        </td>
   </tr>
</script>

<script id="motifRowTemplate" type="text/x-kendo-template">
    <div class="content-type-row">
        <div class="loader-num k-button" data-bind="text:positionName"></div>
        <select class="motif-type"
                data-role="dropdownlist"
                data-value-field="motifTypeId"
                data-text-field="name"
                data-bind="source:contentTypesArr , value:motifTypeId">
        </select>
        <input class="k-checkbox" type="checkbox" data-bind="checked: canLoop, attr:{id:positionName}">
        <label class="k-checkbox-label" data-bind="attr:{for:positionName}" title="Can loop"></label>
        <input class="k-checkbox" type="checkbox" data-bind="checked: acceptsFilm, attr:{id:loaderName}">
        <label class="k-checkbox-label" data-bind="attr:{for:loaderName}" title="Can have video"></label>
        <input class="k-input" type="text" value="" data-bind="value: loaderName"/>
        <select class="info-type" name="" id=""
                data-role="dropdownlist"
                data-bind="value:contentType">
            <option value="visual">visual</option>
            <option value="text">text</option>
        </select>
        <span class="k-button k-delete-button">&times;</span>
    </div>
</script>

<script id="codec-adm-tmp" type="text/x-kendo-template">
    <div class="check-wr right-sided">
        <input type="checkbox" class="k-checkbox"
               id="cha#=codec_type_id#" name="cha#=codec_type_id#"
               value="#=codec_type_id#" data-bind="checked: allowedCodecs">
        <label for="cha#=codec_type_id#" class="k-checkbox-label">#:tplName#</label>
    </div>
</script>
<script id="admin-hub" type="text/x-kendo-template">
    <div id="hubPage">
        <div class="lang-wr">
            <div class="top-panel">
                <a href="#/hub" class="k-button icon-button">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                        <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                    </svg>
                </a>
                <h1><span class="lang-replace" data-lang="HUBAdminLabel">Administration</span></h1>
            </div>
            <div class="centered-wrapper hub-wr">
                <div class="centered-wr ">
                    <div class="centered-container">
                        <div class="inner-content">
                            <ul class="hub-menu">
                                <li>
                                    <a href="#/adm-accounts">
                                        <span class="txt lang-replace" data-lang="Accounts">Accounts</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/adm-groups">
                                        <span class="txt lang-replace" data-lang="Groups">Groups</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/adm-motif-types">
                                        <span class="txt lang-replace" data-lang="MotifTypes">Motif Types</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/adm-audio">
                                        <span class="txt lang-replace" data-lang="Audio">Audio</span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#/adm-products">
                                        <span class="txt lang-replace" data-lang="Products">Products</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/adm-open-prods">
                                        <span class="txt lang-replace" data-lang="OpenProductions">Open Productions</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#/adm-finished-prods">
                                        <span class="txt lang-replace" data-lang="FinishedProductions">Finished Productions</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>
<script id="motifs" type="text/x-kendo-template">
    <div id="motifPage">
        <div class="top-panel">
            <h1 class="lang-replace" data-lang="titleMotifLabel">Motifs</h1>
            <div class="show-block">
                <a href="#/hub" class="k-button icon-button">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                        <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                    </svg>
                </a>
            </div>
            <div class="hide-block">
                <a href="#/production" class="k-button icon-button motif-select-nav">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                        <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                    </svg>
                </a>
                <a href="#/adm-motif-types-edit" class="k-button icon-button preview-select-nav">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                        <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                    </svg>
                </a>
            </div>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu" data-role="responsivepanel" data-breakpoint="1024" data-orientation="left">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="delete-motif-btn" class="popup-btn icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-refresh-func="deleteMotifPopupFunc"
                                data-popup-type="dialog-popup"
                                data-popup-content="delete-dialog3-tmp">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="remove"  d="M30.3,58.6l10.5-10.5L30.2,37.5l7.3-7.3l10.6,10.6l10.5-10.5l7.1,7.1L55.1,47.9l10.6,10.6
                                    l-7.3,7.3L47.9,55.1L37.4,65.7L30.3,58.6z"/>
                            </svg>
                            <span class="lang-replace" data-lang="deleteMotifButton" data-tooltip="deleteMotifButtonTooltip">Delete</span>
                        </button>
                        <button class="popup-btn icon-button"
                                data-role="button"
                                data-click="popupCallFunc"
                                data-popup-type=""
                                data-popup-content="upload-tmp"
                                data-refresh-func="uploadMotifPopupFunc" >
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="add"  d="M43,68V53.1H28V42.9h15V28h10v14.9h15v10.3H53V68H43z"/>
                            </svg>
                            <span class="lang-replace" data-lang="addMotifButton" data-tooltip="addMotifButtonTooltip">Add</span>
                        </button>
                        <div class="hide-block inline-block">
                            <button id="applyMotifBtn" class="motif-select-nav icon-button" data-role="button" data-enable="false" data-click="ApllySelectedMotif">
                                <svg class="svg-icon" viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                    <polygon id="apply" points="69.4,26.3 73.3,30.1 42.2,69.7 27.6,53 31.4,45.3 42.9,56.8 	"/>
                                </svg>
                                <span class="lang-replace" data-lang="applyMotifButton" data-tooltip="applyMotifButtonTooltip">Apply</span>
                            </button>
                            <button id="applyMotifPreviewBtn" class="preview-select-nav icon-button" data-role="button" data-enable="false" data-click="ApllySelectedPreview">
                                <svg class="svg-icon" viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                    <polygon id="apply" points="69.4,26.3 73.3,30.1 42.2,69.7 27.6,53 31.4,45.3 42.9,56.8 	"/>
                                </svg>
                                <span class="lang-replace" data-lang="applyMotifButton" data-tooltip="applyMotifButtonTooltip">Apply</span>
                            </button>
                        </div>
                    </div>
                    <div class="left-side">
                        <form class="search-form" action="">
                            <input id="motif-search-field" class="search-input k-input lang-replace" type="text" placeholder="Enter your search" data-placeholder="search" autocapitalize="off"/>
                            <span id="motif-search-clear" class="filter-btn clear-btn hidden"
                                  data-role="button"
                                  data-click="clearMotifsFilter">&times;</span>
                            <span class="filter-btn search-btn"><span class="k-icon k-i-search"></span></span>
                        </form>
                    </div>
                </div>
            </div>
            <button class="k-button k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>
            <div class="mobile-view-panel">
                <button id="delete-motif-btn2" class="popup-btn icon-button"
                        data-role="button"
                        data-enable="false"
                        data-click="popupCallFunc"
                        data-refresh-func="deleteMotifPopupFunc"
                        data-popup-type="dialog-popup"
                        data-popup-content="delete-dialog3-tmp">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                        <path id="remove"  d="M30.3,58.6l10.5-10.5L30.2,37.5l7.3-7.3l10.6,10.6l10.5-10.5l7.1,7.1L55.1,47.9l10.6,10.6
                            l-7.3,7.3L47.9,55.1L37.4,65.7L30.3,58.6z"/>
                    </svg>
                </button>
                <button class="popup-btn icon-button"
                        data-role="button"
                        data-click="popupCallFunc"
                        data-popup-type=""
                        data-popup-content="upload-tmp"
                        data-refresh-func="uploadMotifPopupFunc" >
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                        <path id="add"  d="M43,68V53.1H28V42.9h15V28h10v14.9h15v10.3H53V68H43z"/>
                    </svg>
                </button>
                <div class="hide-block inline-block">
                    <button id="applyMotifBtn2" class="icon-button"
                            data-role="button"
                            data-enable="false"
                            data-click="ApllySelectedMotif">
                        <svg class="svg-icon" viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <polygon id="apply" points="69.4,26.3 73.3,30.1 42.2,69.7 27.6,53 31.4,45.3 42.9,56.8 	"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="sort-panel clearfix" id="motifs-filter">
                <div class="sort-item">
                    <label for="filterMotifSelect1" class="lang-replace" data-lang="sortLabel">Sort by:</label>
                    <select id="filterMotifSelect1" name=""
                            data-role="dropdownlist"
                            data-select="onSelectFilterMotifs"
                            data-bind="source:selectFields"
                            data-text-field="text"
                            data-value-field="value">
                    </select>
                </div>
            </div>
            <div id="motifs-list" class="items-list clearfix"
                 data-role="listview"
                 data-source="motifsDataSource"
                 data-selectable="multiple"
                 data-template="motifTemplate"
                 data-change="motifListViewChangeFunc">
            </div>
        </div>
    </div>
</script>

<script id="motifTemplate" type="text/x-kendo-template">
    <div class="list-item motif-item" data-id="#:motifId#">
        <div class="item-wr">
            <div class="img-wr">
                <div class="img" style="background: url(/data/accounts/#:accountId#/motifs/#:motifId#_thumb.jpg);"></div>
                <div class="active-icon">
                    <div class="checked-svg-icon"></div>
                </div>
            </div>
            <div class="item-info">
                <div class="val-wr">
                    <p class="item-name">#:name#</p>
                    <p class="item-type">
                        # if (frameCount>1) {#
                            #:frameCount#
                            <span>Frames</span>
                        # } else { #
                            <span>Standbild</span>
                        # } #
                    </p>
                    <p class="item-time">#:date#</p>
                </div>
            </div>
        </div>
    </div>
</script>

<script id="page404" type="text/x-kendo-template">
    <div class="centered-wr">
        <div class="centered-container">
            <div class="inner-content">
                <h1>404</h1>
                <p class="lang-replace" data-lang="404text1">The page cannot be found</p>
                <p><a id="showHome" href="#" class="lang-replace" data-lang="404text2">Home Page</a></p>
            </div>
        </div>
    </div>
</script>
<script id="prod-collection" type="text/x-kendo-template">
    <div class="top-panel">
        <h1 class="lang-replace" data-lang="collectionLabel">Product collection</h1>
        <a href="#/production" class="k-button icon-button">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </a>
    </div>

    <div class="bottom-panel k-button-group" >
        <div class="panel-menu">
            <div class="panel-wr">
                <div class="right-side">
                    <button id="applyClipBtn" class="icon-button"
                            data-role="button"
                            data-enable="false">
                        <svg class="svg-icon" viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <polygon id="apply" points="69.4,26.3 73.3,30.1 42.2,69.7 27.6,53 31.4,45.3 42.9,56.8 	"/>
                        </svg>
                        <span class="lang-replace" data-lang="applyButton" data-tooltip="applyButtonTooltip">Apply</span>
                    </button>
                </div>
                <div class="left-side">
                    <form class="search-form" action="">
                        <input id="clip-search-field" class="search-input k-input lang-replace" type="text" data-placeholder="search" placeholder="Enter your search" autocapitalize="off"/>
                        <span id="clip-search-clear" class="filter-btn clear-btn hidden"
                              data-role="button"
                              data-click="clearClipsFilter">&times;</span>
                        <span class="k-icon k-i-search"></span>
                    </form>
                </div>
            </div>
        </div>
        <button class="k-button k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>
        <div class="mobile-view-panel">
            <button id="applyClipBtn2" class="icon-button"
                    data-role="button"
                    data-enable="false">
                <!--TEMP ICON-->
                <svg class="svg-icon" viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <polygon id="apply" points="69.4,26.3 73.3,30.1 42.2,69.7 27.6,53 31.4,45.3 42.9,56.8 	"/>
                </svg>
            </button>
        </div>
    </div>

    <div class="page-content">
        <div class="sort-panel clearfix" id="clips-filter">
            <div class="sort-item">
                <label for="filterClipsSelect0" class="lang-replace" data-lang="clipTypeLabel">Clip Type:</label>
                <select id="filterClipsSelect0" name=""
                        data-role="dropdownlist"
                        data-select="onSelectFilterClips0"
                        data-bind="source:clipTypesArr"
                        data-text-field="text"
                        data-value-field="value">
                </select>
            </div>
            <div class="sort-item">
                <label for="filterClipsSelect1"><span class="lang-replace" data-lang="locationLabel">Location</span>:</label>
                <select id="filterClipsSelect1" name=""
                        data-role="dropdownlist"
                        data-select="onSelectFilterClips1"
                        data-bind="source:locationArr">
                </select>
            </div>
            <div class="sort-item">
                <label for="filterClipsSelect2" class="lang-replace" data-lang="categoryLabel">Motif type:</label>
                <select id="filterClipsSelect2" name=""
                        data-role="dropdownlist"
                        data-select="onSelectFilterClips2"
                        data-bind="source:motifNamesArr">
                </select>
            </div>
            <div class="sort-item">
                <label for="filterClipsSelect3" class="lang-replace" data-lang="sortLabel">Sort by:</label>
                <select id="filterClipsSelect3" name=""
                        data-role="dropdownlist"
                        data-select="onSelectFilterClips3"
                        data-bind="source:sortSelect"
                        data-text-field="text"
                        data-value-field="value">
                </select>
            </div>
        </div>

        <div id="clips-list" class="items-list clearfix"
             data-role="listview"
             data-source="clipsDataSource"
             data-selectable="single"
             data-template="clipTemplate"
             data-change="clipsListViewChangeFunc">
        </div>

    </div>
</script>

<script id="clipTemplate" type="text/x-kendo-template">
    <div class="list-item clip-item" data-id="#:id#">
        <div class="item-wr">
            <div class="active-icon">
                <div class="checked-svg-icon"></div>
            </div>
            <p class="item-name">#:name#</p>
            <div class="clip-img">
                <img src="/data/products/#:idString#/#:idString#_mdpi.jpg">
            </div>
            <div class="item-info">
                <div class="fll">
                    <p class="item-dur">
                        <a href="/data/products/#:idString#/#:idString#_hdpi.mp4" class="html5lightbox-link" data-width="640" data-height="360" title="#:name#">
                            <span class="video-popup-btn"></span>
                        </a>
                        #:durTime#
                    </p>
                </div>
                <div class="val-wr">
                    <p class="item-motifs">
                        #if(motifsNum == 1){#
                            #:motifsNum#
                            <span>motif</span>
                        #}#
                        #if(motifsNum > 1){#
                            #:motifsNum#
                            <span>motifs</span>
                        #}#
                    </p>
                </div>
            </div>
        </div>
    </div>
</script>
<script id="prod-list" type="text/x-kendo-template">
    <div id="filmsPage">
        <div class="top-panel">
            <h1 class="lang-replace" data-lang="titleFilmLabel">Film Collection</h1>
            <a href="#/hub" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="downloadFilm" class="popup-btn icon-button"
                                data-role="button"
                                data-click="popupCallFunc"
                                data-popup-type=""
                                data-popup-content="download-tmp"
                                data-refresh-func="downloadFilmPopupFunc"
                                data-enable="false">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="download"  d="M26.1,56.4h43.6h6.2h0v6.2H20.1v-6.2h0H26.1z M43.9,25.4h7.8v13.6h10.6L55,45.3l-7.2,6.2
                                    l-7.2-6.2l-7.2-6.2h10.6V25.4z"/>
                            </svg>
                            <span class="lang-replace" data-lang="downloadFilmButton" data-tooltip="downloadFilmButtonTooltip">Download</span>
                        </button>
                        <button id="deleteFilm" class="popup-btn icon-button"
                                data-role="button"
                                data-click="popupCallFunc"
                                data-popup-type="dialog-popup"
                                data-popup-content="delete-dialog-tmp"
                                data-refresh-func="deleteFilmPopupFunc"
                                data-enable="false">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="remove"  d="M30.3,58.6l10.5-10.5L30.2,37.5l7.3-7.3l10.6,10.6l10.5-10.5l7.1,7.1L55.1,47.9l10.6,10.6
                                    l-7.3,7.3L47.9,55.1L37.4,65.7L30.3,58.6z"/>
                            </svg>
                            <span class="lang-replace" data-lang="deleteFilmButton" data-tooltip="deleteFilmButtonTooltip">Delete</span>
                        </button>
                        <div class="sep"></div>
                        <button id="loadFilm" class="popup-btn icon-button"
                                data-role="button"
                                data-click="popupCallFunc"
                                data-enable="false"
                                data-popup-type="dialog-popup"
                                data-popup-content="load-dialog-tmp"
                                data-refresh-func="loadProdDialogFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <g id="LoadProduction">
                                    <path d="M67.8,34.2v2.4h-5.5v-2.4h-3.1v4.2H36.7v-4.2h-2.7v2.4h-5.5v-2.4h-3.1v30.3h3V62h5.5v2.4h2.8v-3.8h22.5v3.8h3.1V62h5.5
                                            v2.4h2.7V34.2H67.8z M34.1,58h-5.5v-3.4h5.5V58z M34.1,50.9h-5.5v-3.4h5.5V50.9z M34.1,43.9h-5.5v-3.4h5.5V43.9z M59.3,57.5H36.7
                                            V41.4h22.5V57.5z M67.8,58h-5.5v-3.4h5.5V58z M67.8,50.9h-5.5v-3.4h5.5V50.9z M67.8,43.9h-5.5v-3.4h5.5V43.9z"/>
                                    <path d="M41,53c1,0,1.5-0.7,1.5-1.6c0-1-0.6-1.6-1.5-1.6c-0.9,0-1.5,0.7-1.5,1.6C39.5,52.3,40.1,53,41,53z"/>
                                    <path d="M46.4,53c1,0,1.5-0.7,1.5-1.6c0-1-0.6-1.6-1.5-1.6c-0.9,0-1.5,0.7-1.5,1.6C44.8,52.3,45.5,53,46.4,53z"/>
                                    <path d="M51.7,53c1,0,1.5-0.7,1.5-1.6c0-1-0.6-1.6-1.5-1.6c-0.9,0-1.5,0.7-1.5,1.6C50.2,52.3,50.8,53,51.7,53z"/>
                                </g>
                            </svg>
                            <span class="lang-replace" data-lang="importFilmButton" data-tooltip="importFilmButtonTooltip">Load</span>
                        </button>
                        <button id="newProduction" class="popup-btn icon-button"
                                data-role="button"
                                data-click="popupCallFunc"
                                data-popup-type="dialog-popup"
                                data-popup-content="new-dialog-tmp">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <polygon id="new"  points="48,31.7 56.4,22 57.6,34.8 70.1,31.9 63.5,43 75.3,48 63.5,53 70.1,64.1 57.6,61.2
                                    56.4,74 48,64.3 39.6,74 38.4,61.2 25.9,64.1 32.5,53 20.7,48 32.5,43 25.9,31.9 38.4,34.8 39.6,22 "/>
                            </svg>
                            <span class="lang-replace" data-lang="newProductionButton" data-tooltip="newProductionButtonTooltip">New</span>
                        </button>
                    </div>

                    <div class="left-side">
                        <form class="search-form" action="">
                            <input id="film-search-field" class="search-input k-input lang-replace" type="text" data-placeholder="search" placeholder="Enter your search" autocapitalize="off"/>
                            <span id="film-search-clear" class="filter-btn clear-btn hidden"
                                  data-role="button"
                                  data-click="clearFilmsFilter">&times;</span>
                            <span class="k-icon k-i-search"></span>
                        </form>
                    </div>

                </div>
            </div>
            <button class="k-button k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>
        </div>

        <div class="page-content">
            <div class="sort-panel clearfix" id="films-filter">
                <div class="sort-item">
                    <label for="filterFilmsSelect1" class="lang-replace" data-lang="sortLabel">Sort by:</label>
                    <select id="filterFilmsSelect1" name=""
                            data-role="dropdownlist"
                            data-select="onSelectFilterFilms"
                            data-bind="source:selectFields"
                            data-text-field="text"
                            data-value-field="value">
                    </select>
                </div>
            </div>

            <div id="films-list" class="items-list clearfix"
                 data-role="listview"
                 data-source="filmsDataSource"
                 data-selectable="single"
                 data-template="filmTemplate"
                 data-change="filmsListViewChangeFunc">
            </div>
        </div>
    </div>
</script>

<script id="filmTemplate" type="text/x-kendo-template">
    <div class="list-item clip-item" data-id="#:filmId#">
        <div class="item-wr">
            <p class="item-name">#:name#</p>
            <div class="clip-img">
                #if( videoSizes.length != 0 ){#
                    <img src="/data/accounts/#:accountId#/productions/#:filmId#/film_#:filmId#_preview_mdpi.jpg">
                #}else{#
                    <span class="no-video">
                        #if( (jobId) && (status == 0) ){#
                            <span class="lang-replace" data-lang="submitted">submitted</span>
                        #}#
                        #if( 0 < status && status <= 7 ){#
                            <span class="lang-replace" data-lang="inProgress">in progress</span>
                        #}#
                    </span>
                #}#
            </div>
            <div class="active-icon">
                <div class="checked-svg-icon"></div>
            </div>
            <div class="item-info">
                <p class="fll">
                    <a href="/data/accounts/#:accountId#/productions/#:filmId#/film_#:filmId#_hdpi.mp4" class="html5lightbox-link" data-width="640" data-height="360" title="#:name#">
                        <span class="video-popup-btn"></span>
                    </a>
                    #:durTime#
                </p>

                <div class="val-wr">
                    <p class="item-dur">#:crDate#</p>
                </div>
            </div>
        </div>
    </div>
</script>

<script id="production" type="text/x-kendo-template">
    <div id="productionPage">
        <div class="top-panel">
            <p class="production-time h1" data-bind="text: prodObj.durTime"></p>
            <h1 data-bind="text: prodObj.name"></h1>
            <a href="#/hub" class="k-button icon-button">
                <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                    <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
                </svg>
            </a>
        </div>

        <div class="bottom-panel k-button-group" >
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="newProduction" class="icon-button popup-btn"
                                data-role="button"
                                data-click="popupCallFunc"
                                data-popup-type="dialog-popup"
                                data-popup-content="new-dialog-tmp">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <polygon id="new"  points="48,31.7 56.4,22 57.6,34.8 70.1,31.9 63.5,43 75.3,48 63.5,53 70.1,64.1 57.6,61.2
                                    56.4,74 48,64.3 39.6,74 38.4,61.2 25.9,64.1 32.5,53 20.7,48 32.5,43 25.9,31.9 38.4,34.8 39.6,22 "/>
                            </svg>
                            <span class="lang-replace" data-lang="newProductionButton" data-tooltip="newProductionButtonTooltip">New</span>
                        </button>
                        <button id="saveProduction"
                                class="popup-btn icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-popup-content="production-save-tmp"
                                data-refresh-func="saveProdPopupFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Save"  d="M34.8,59v4.1h26.3V59H34.8z M38.5,27.8h5.1v10.3h-5.1V27.8z M28,27.7h6.7v12.4h26.5V27.7H68v40.5
                                    H28V27.7z"/>
                            </svg>
                            <span class="lang-replace" data-lang="bt_saveProduction" data-tooltip="bt_saveProductionTooltip">Save</span>
                        </button>
                        <button id="produceProdBtn" class="icon-button popup-btn unselectable"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-popup-content="produce-tmp"
                                data-refresh-func="produceProdPopupFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="produce"  d="M67.6,38.7l-2.3,4.2h4.8l2.3-4.2H67.6z M55.3,38.7L53,42.9h4.8l2.3-4.2H55.3z M43.1,38.7
                                    l-2.3,4.2h4.8l2.3-4.2H43.1z M30.8,38.7l-2.3,4.2h4.8l2.3-4.2H30.8z M26.8,34.1c-0.1,0-0.2,0-0.3,0c-0.6,0.2-0.9,0.7-0.7,1.3v0
                                    c0.1,0.6,0.7,0.9,1.3,0.7c0.6-0.2,0.9-0.7,0.7-1.3v0C27.7,34.4,27.3,34.1,26.8,34.1z M33.1,31.2l-4.6,1.3l3.7,3.8l4.6-1.3L33.1,31.2
                                    z M44.9,27.9l-4.6,1.3L44,33l4.6-1.3L44.9,27.9z M56.8,24.6l-4.6,1.3l3.7,3.8l4.6-1.3L56.8,24.6z M68.6,21.4L64,22.7l3.7,3.8
                                    l4.6-1.3L68.6,21.4z M71.5,20.3l1.4,5L28.3,37.6v0.8H73v5.2h-0.2v27.9H23.3V43.6H23v-5.2H23v-4c0-0.3,0.1-0.5,0.3-0.7l0,0l0-0.1
                                    l0.1,0l0,0c0.2-0.2,0.4-0.2,0.7-0.2h0.2L71.5,20.3z"/>
                            </svg>
                            <span class="lang-replace" data-lang="produceButton" data-tooltip="produceButtonTooltip">Produce</span>
                        </button>
                    </div>
                    <div class="left-side">
                        <button id="deleteClipButton" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="prodDeleteClipFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Garbage"  d="M52.7,44.5v24.3h5.9V44.5H52.7z M37.4,44.5v24.3h5.9V44.5H37.4z M28.8,40.3h38.5v33.3H28.8
                                    V40.3z M38.3,22.4h19.4v6.2h12.8v6.6H25.5v-6.6h12.8V22.4z"/>
                            </svg>
                            <span class="lang-replace" data-lang="deleteClipButton" data-tooltip="deleteClipButtonTooltip">Delete Clip</span>
                        </button>
                        <button id="replaceClipButton" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="prodReplaceClipFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="replaceClip"  d="M71.9,40l0,17.1l-4.7,0l0-9.1L42.2,73.1l-3.3-3.3l25-25h-9l0-4.7L71.9,40L71.9,40L71.9,40z
                                     M41,54.9l0-4.7h-9l25-25l-3.3-3.3L28.7,46.9l0-9.1l-4.7,0l0,17.1h0l0,0L41,54.9z"/>
                            </svg>
                            <span class="lang-replace" data-lang="replaceClipButton" data-tooltip="replaceClipButtonTooltip">Replace Clip</span>
                        </button>
                        <button id="insertClipBtn" class="icon-button"
                                data-role="button"
                                data-click="prodInsertClipFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                 <path id="add"  d="M43,68V53.1H28V42.9h15V28h10v14.9h15v10.3H53V68H43z"/>
                            </svg>
                            <span class="lang-replace" data-lang="insertClipLabel" data-tooltip="insertClipLabelTooltip">Insert Clip</span>
                        </button>
                    </div>
                </div>
            </div>
            <button class="k-button k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>
            <div class="mobile-view-panel">
                <div class="right-side">
                    <button id="produceProdBtn2" class="icon-button popup-btn unselectable"
                            data-role="button"
                            data-enable="false"
                            data-click="popupCallFunc"
                            data-popup-content="produce-tmp"
                            data-refresh-func="produceProdPopupFunc">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <path id="produce"  d="M67.6,38.7l-2.3,4.2h4.8l2.3-4.2H67.6z M55.3,38.7L53,42.9h4.8l2.3-4.2H55.3z M43.1,38.7
                                l-2.3,4.2h4.8l2.3-4.2H43.1z M30.8,38.7l-2.3,4.2h4.8l2.3-4.2H30.8z M26.8,34.1c-0.1,0-0.2,0-0.3,0c-0.6,0.2-0.9,0.7-0.7,1.3v0
                                c0.1,0.6,0.7,0.9,1.3,0.7c0.6-0.2,0.9-0.7,0.7-1.3v0C27.7,34.4,27.3,34.1,26.8,34.1z M33.1,31.2l-4.6,1.3l3.7,3.8l4.6-1.3L33.1,31.2
                                z M44.9,27.9l-4.6,1.3L44,33l4.6-1.3L44.9,27.9z M56.8,24.6l-4.6,1.3l3.7,3.8l4.6-1.3L56.8,24.6z M68.6,21.4L64,22.7l3.7,3.8
                                l4.6-1.3L68.6,21.4z M71.5,20.3l1.4,5L28.3,37.6v0.8H73v5.2h-0.2v27.9H23.3V43.6H23v-5.2H23v-4c0-0.3,0.1-0.5,0.3-0.7l0,0l0-0.1
                                l0.1,0l0,0c0.2-0.2,0.4-0.2,0.7-0.2h0.2L71.5,20.3z"/>
                        </svg>
                    </button>
                </div>
                <div class="left-side">
                    <button id="deleteClipButton2" class="icon-button"
                            data-role="button"
                            data-enable="false"
                            data-click="prodDeleteClipFunc">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <path id="Garbage"  d="M52.7,44.5v24.3h5.9V44.5H52.7z M37.4,44.5v24.3h5.9V44.5H37.4z M28.8,40.3h38.5v33.3H28.8
                                V40.3z M38.3,22.4h19.4v6.2h12.8v6.6H25.5v-6.6h12.8V22.4z"/>
                        </svg>
                    </button>
                    <button id="replaceClipButton2" class="icon-button"
                            data-role="button"
                            data-enable="false"
                            data-click="prodReplaceClipFunc">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <path id="replaceClip"  d="M71.9,40l0,17.1l-4.7,0l0-9.1L42.2,73.1l-3.3-3.3l25-25h-9l0-4.7L71.9,40L71.9,40L71.9,40z
                                 M41,54.9l0-4.7h-9l25-25l-3.3-3.3L28.7,46.9l0-9.1l-4.7,0l0,17.1h0l0,0L41,54.9z"/>
                        </svg>
                    </button>
                    <button id="insertClipBtn2" class="icon-button"
                            data-role="button"
                            data-click="prodInsertClipFunc">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                             <path id="add"  d="M43,68V53.1H28V42.9h15V28h10v14.9h15v10.3H53V68H43z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="timeline-btn-panel">
                <button id="insertClipBtn3" class="icon-button lang-replace"
                        data-tooltip="insertClipLabelTooltip"
                        data-role="button"
                        data-click="prodInsertClipFunc">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                 <path id="add"  d="M43,68V53.1H28V42.9h15V28h10v14.9h15v10.3H53V68H43z"/>
                            </svg>
                </button>
                <button id="replaceClipButton3" class="icon-button lang-replace"
                        data-tooltip="replaceClipButtonTooltip"
                        data-role="button"
                        data-enable="false"
                        data-click="prodReplaceClipFunc">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="replaceClip"  d="M71.9,40l0,17.1l-4.7,0l0-9.1L42.2,73.1l-3.3-3.3l25-25h-9l0-4.7L71.9,40L71.9,40L71.9,40z
                                     M41,54.9l0-4.7h-9l25-25l-3.3-3.3L28.7,46.9l0-9.1l-4.7,0l0,17.1h0l0,0L41,54.9z"/>
                            </svg>
                </button>
                <button id="deleteClipButton3" class="icon-button lang-replace"
                        data-tooltip="deleteClipButtonTooltip"
                        data-role="button"
                        data-enable="false"
                        data-click="prodDeleteClipFunc">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Garbage"  d="M52.7,44.5v24.3h5.9V44.5H52.7z M37.4,44.5v24.3h5.9V44.5H37.4z M28.8,40.3h38.5v33.3H28.8
                                    V40.3z M38.3,22.4h19.4v6.2h12.8v6.6H25.5v-6.6h12.8V22.4z"/>
                            </svg>
                </button>
                <button id="fillAllModeBtn" class="icon-button lang-replace"
                        data-tooltip="TimelineFillTooltip"
                        data-role="button"
                        data-enable="false"
                        data-click="fillMotifsMode">
                    <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48">
                        <g>
                            <path id="fillMotifs" transform="rotate(0,24,24) translate(34,14.9682603837058) scale(-0.622879,0.622878594227186)"
                                  d="M23.344748,18.243927L20.884888,20.78299 25.944919,25.797149 28.347769,23.382197 28.259992,23.134045z M20.638999,15.55201L18.13299,18.056039 19.46385,19.374835 21.927118,16.833544z M20.636985,13.181037C20.928,13.181037,21.202993,13.294013,21.409994,13.498054L30.008983,22.107006 30.073985,22.263012 32.108986,28.02101 31.796974,28.533034C31.589974,28.825027,31.252969,28.999038,30.894967,28.999038L30.638987,28.969008 24.880967,27.536024 24.735979,27.415052 15.785001,18.54603 15.756986,18.055002C15.757993,17.761056,15.87399,17.484017,16.083981,17.277047L20.152977,13.210028z M2,2L2,22 4,22 4,4 24,4 24,2z M0,0L26,0 26,4 31,4 31,17 29,17 29,5.9999995 6,5.9999995 6,27 21,27 21,29 4,29 4,24 0,24z"/>
                        </g>
                    </svg>
                </button>
            </div>
            <!--<button id="timeline-insert-button" class="timeline-add-clip" data-role="button" data-click="prodInsertClipFunc">+</button>-->

            <div class="timeline-wrapper clearfix">
                <div id="currAbdikativ" class="dikativ-item pull-right" data-bind="visible: isVisible">
                    <div class="list-item clip-item">
                        <div class="item-wr">
                            <p class="item-name" data-bind="text: clipObj.name"></p>
                            <div class="clip-img">
                                <img src="" data-bind="attr: { src: imgSrc }">
                            </div>
                            <div class="item-info">
                                <div class="fll">
                                    <p class="item-dur">
                                        <a href="" class="html5lightbox-link" data-width="640" data-height="360" title=""
                                           data-bind="attr: { href: videoSrc, title: clipObj.name }">
                                            <span class="video-popup-btn"></span>
                                        </a>
                                        <span data-bind="text: clipObj.durTime"></span>
                                    </p>
                                </div>
                                <div class="val-wr">
                                    <p class="item-motifs"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="currIndikativ" class="dikativ-item pull-left" data-bind="visible: isVisible">
                    <div class="list-item clip-item">
                        <div class="item-wr">
                            <p class="item-name" data-bind="text: clipObj.name"></p>
                            <div class="clip-img">
                                <img src="" data-bind="attr: { src: imgSrc }">
                            </div>
                            <div class="item-info">
                                <div class="fll">
                                    <p class="item-dur">
                                        <a href="" class="html5lightbox-link" data-width="640" data-height="360" title=""
                                           data-bind="attr: { href: videoSrc, title: clipObj.name }">
                                            <span class="video-popup-btn"></span>
                                        </a>
                                        <span data-bind="text: clipObj.durTime"></span>
                                    </p>
                                </div>
                                <div class="val-wr">
                                    <p class="item-motifs"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clips-timeline">
                    <div class="wr">
                        <div id="production-films" class="production-films items-list clearfix"
                             data-role="listview"
                             data-source="currentProdClipsDataSource"
                             data-selectable="true"
                             data-template="clipProdTemplate"
                             data-change="currProdClipsListViewChangeFunc">
                        </div>
                    </div>
                </div>

                <div class="timeline-helper lang-replace" data-lang="fillMotifs"></div>

            </div>

            <div id="current-film-motifs" class="clip-motifs-list items-list clearfix"
                 data-role="listview"
                 data-source="currentProdMotifsDataSource"
                 data-selectable="true"
                 data-template="motifProdTemplate"
                 data-change="currProdMotifsListViewChangeFunc">
            </div>

            <div id="current-motif-types" style="display: none;" class="clip-motifs-list items-list clearfix"
                 data-role="listview"
                 data-source="currentMotifTypesDataSource"
                 data-selectable="true"
                 data-template="motifProdTemplate"
                 data-change="currMotifTypesListViewChangeFunc">
            </div>

        </div>
    </div>
</script>


<script id="clipProdTemplate" type="text/x-kendo-template">
    <div class="list-item clip-item"
         data-id="#:clipId#">
        <div class="item-wr">
            <div class="active-icon">
                <div class="checked-svg-icon"></div>
            </div>
            <p class="item-name">#:name#</p>
            <div class="clip-img">
                <img src="/data/products/#:idString#/#:idString#_mdpi.jpg">
            </div>
            <div class="item-info">
                <div class="fll">
                    <p class="item-dur">
                        <a href="/data/products/#:idString#/#:idString#_hdpi.mp4" class="html5lightbox-link" data-width="640" data-height="360" title="#:name#">
                            <span class="video-popup-btn"></span>
                        </a>
                        #:durTime#
                    </p>
                </div>
                <div class="val-wr">
                    <p class="item-motifs">
                        #if(emptyMotifs == 1){#
                            #:emptyMotifs#
                            <span>Motif left</span>
                        #}#
                        #if(emptyMotifs > 1){#
                            #:emptyMotifs#
                            <span>Motifs left</span>
                        #}#
                    </p>
                </div>
            </div>
        </div>
    </div>
</script>

<!--should be no spacing between image grid elements-->
<script id="motifProdTemplate" type="text/x-kendo-template">
    <div class="motif-select-item" data-id="#:motifId#" title="#:typeName#">
        #if( motifId == '0' ){#
            <div class="empty-img-name">#:numName#</div>
            <div class="motif-type-name">#:typeName#</div>
            <img class="motif-img" src="" width="#:aspect#" height="170" alt=""/>
        #}else{#
            <img class="motif-img" src="/data/accounts/#:accountId#/motifs/#:motifId#_thumb.jpg" width="#:aspect#" height="170" alt=""/>
        #}#
    </div>
</script>
<script id="statistics" type="text/x-kendo-template">

    <div class="top-panel">
        <h1 class="lang-replace" data-lang="titleStatisticLabel">Statistic</h1>
        <a href="#/hub" class="k-button icon-button">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </a>
    </div>

    <div class="bottom-panel k-button-group" >
        <div class="panel-menu">
            <div class="panel-wr">
                <div class="right-side"></div>
                <div class="left-side">
                    <button class="k-button icon-button popup-btn"
                            data-role="button"
                            data-click="popupCallFunc"
                            data-popup-type=""
                            data-popup-content="timespan-tmp"
                            data-refresh-func="initDatepickers">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <path id="calender"  d="M58,45.6h1.5v18.6h-2.3V49.7c-0.5,0.5-1.3,1-2.2,1.6c-0.9,0.5-1.7,0.9-2.4,1.2v-2.2
                                c1.3-0.6,2.4-1.3,3.3-2.2C56.9,47.2,57.6,46.4,58,45.6z M42.3,45.6c1,0,1.9,0.2,2.8,0.7c0.9,0.4,1.5,1,2,1.8
                                c0.5,0.8,0.7,1.5,0.7,2.4c0,0.8-0.2,1.5-0.6,2.2c-0.4,0.7-1.1,1.2-1.9,1.6c1.1,0.3,1.9,0.8,2.6,1.6c0.6,0.8,0.9,1.8,0.9,3
                                c0,1.6-0.6,3-1.8,4.1c-1.2,1.1-2.7,1.7-4.5,1.7c-1.6,0-3-0.5-4.1-1.5c-1.1-1-1.7-2.2-1.8-3.8l2.3-0.3c0.3,1.3,0.7,2.2,1.3,2.8
                                c0.6,0.6,1.4,0.9,2.3,0.9c1.1,0,2-0.4,2.7-1.1c0.7-0.7,1.1-1.7,1.1-2.8c0-1-0.3-1.9-1-2.6c-0.7-0.7-1.6-1-2.6-1
                                c-0.4,0-1,0.1-1.6,0.3l0.3-2c0.2,0,0.3,0,0.4,0c1,0,1.8-0.3,2.6-0.8c0.8-0.5,1.2-1.3,1.2-2.3c0-0.8-0.3-1.5-0.8-2.1
                                c-0.6-0.5-1.3-0.8-2.2-0.8c-0.9,0-1.6,0.3-2.2,0.8c-0.6,0.6-1,1.4-1.1,2.5l-2.3-0.4c0.3-1.5,0.9-2.7,1.9-3.5
                                C39.6,46,40.9,45.6,42.3,45.6z M24.7,41.4v28h45.8v-28H24.7z M20.7,29.5h10.9v8.9h9.1v-8.9h15.4v8.9h9.1v-8.9h10v43.6H20.7V29.5z
                                 M58.5,22.9H63v13.2h-4.5V22.9z M33.9,22.9h4.5v13.2h-4.5V22.9z"/>
                        </svg>
                        <span class="lang-replace" data-lang="setDateButton" data-tooltip="setDateButtonTooltip">Select data</span>
                    </button>
                    <div class="sep"></div>
                    <button class="k-button icon-button" data-role="button" data-click="exportStatistics">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <path id="csvexport"  d="M68.6,47.4c0.3,0,0.6,0.2,1,0.4l2.6,2.1c1.2,1,3.3,2.7,4.5,3.8l2.6,2.1c1.2,1,1.2,2.7,0,3.7
                                l-2.6,2.1c-1.3,1-3.3,2.7-4.6,3.7l-2.6,2.1c-1.3,1-2.3,0.2-2.3-1.9l0-4H52.1c-1.1,0-1.9-0.9-1.9-1.9v-4.2c0-1.1,0.9-1.9,1.9-1.9
                                h15.2l0-4C67.3,48.3,67.8,47.4,68.6,47.4z M26.5,34.6h7.3c1.5,0,2.3,0.7,2.3,2.2c0,1.5-0.8,2.2-2.3,2.2h-7.4c-1.4,0-2.2,0.8-2.2,2.3
                                v5.8c0,1.5,0.8,2.3,2.3,2.3l7.4,0c1.4,0,2.2,0.7,2.2,2.3c0,1.5-0.7,2.2-2.2,2.2h-7.4c-4.4,0-6.6-2.3-6.6-6.9v-5.8
                                C19.8,36.9,22.1,34.6,26.5,34.6z M44.4,34.6l5.9,0c1.5,0,2.2,0.7,2.2,2.2c0,1.5-0.7,2.2-2.2,2.3h-5.9c-1.5,0-2.3,0.5-2.3,1.5
                                c0,1,0.8,1.4,2.3,1.4h1.4c4.4,0.1,6.6,2.1,6.6,6c0,1.1-0.2,2.1-0.6,2.9c-1.9,0.1-3.4,1.2-4.1,2.9c-0.6,0.1-1.2,0.2-1.9,0.2l-6,0
                                c-1.4,0-2.1-0.7-2.2-2.1c0-1.6,0.7-2.3,2.1-2.3h6c1.5,0,2.2-0.5,2.2-1.5c0-1-0.7-1.5-2.2-1.5h-1.4c-4.5,0-6.7-2-6.7-6
                                C37.8,36.6,40,34.6,44.4,34.6z M56,34.6c0.9,0,1.5,0.3,1.8,0.8c0.3,0.5,1.6,4.5,4.1,12c2.5-7.5,3.8-11.4,4.2-11.9
                                c0.3-0.5,0.9-0.8,1.8-0.8c1.4,0,2.2,0.8,2.2,2.3l-3.1,8.2c-1.3,0.7-2.4,2.2-2.4,4.6l0,1.2h-5.4l-5.3-14.1
                                C53.8,35.3,54.5,34.6,56,34.6z"/>
                        </svg>
                        <span class="lang-replace" data-lang="exportButton" data-tooltip="exportButtonTooltip">Export</span>
                    </button>
                    <a id="dataLink" class="hidden" href=""></a>
                </div>
            </div>
        </div>
        <button class="k-button k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>
    </div>

    <div id="statistic-page" class="page-content">
        <div class="chart-line clearfix">
            <div class="chart-table-wr">
                <h5 class="lang-replace" data-lang="productionsLabel">Productions</h5>
            </div>
            <div class="chart-wr">
                <h5 data-bind="text: userName"></h5>
                <p class="date-range" style="float:left;margin-right:20px;"><span data-bind="text: statStartDateString"></span> - <span data-bind="text: statEndDateString"></span></p>
                <p style="text-align:right;">
                    <span class="lang-replace" data-lang="FCPD_FilmsHeader">Films</span> - <span data-bind="text: TimespanFilmCount"></span> |
                    <span class="lang-replace" data-lang="FCPD_ClipsHeader">Clips</span> - <span data-bind="text: TimespanClipCount"></span>
                </p>
            </div>
        </div>
        <div class="chart-line clearfix">
            <div class="chart-table-wr custom-table-style">
                <div id="ProductionsTable" class="chart-table"></div>
            </div>
            <div class="chart-wr">
                <div id="ProductionsChart"></div>
                <p class="totals" style="text-align:right;">
                    <span class="lang-replace" data-lang="totalsLabel">Total:</span>
                    <span class="lang-replace" data-lang="FCPD_FilmsHeader">Films</span> - <span data-bind="text: TotalFilmCount"></span> |
                    <span class="lang-replace" data-lang="FCPD_ClipsHeader">Clips</span> - <span data-bind="text: TotalClipCount"></span>
                </p>
            </div>
        </div>
        <div class="chart-line clearfix">
            <div class="chart-table-wr">
                <h5 class="lang-replace" data-lang="usageLabel">Product usage:</h5>
            </div>
        </div>
        <div class="chart-line clearfix">
            <div class="chart-table-wr custom-table-style">
                <div id="ProductUsageTable" class="chart-table"></div>
            </div>
            <div class="chart-wr">
                <div id="ProductUsageChart"></div>
            </div>
        </div>
    </div>
</script>
<script id="change-priority-tmp" type="text/x-kendo-template">
    <div id="change-priority-popup">
        <div class="centered-text">
            <p class="lang-replace" data-lang="ChangeProdPriority">Change Production Priority</p>
            <span class="lang-replace" data-lang="NewPriority">New Priority</span>:
            <input data-role="numerictextbox"
                   data-min="0"
                   data-max="100"
                   data-format="n0"
                   data-bind="value: priority">
        </div>

        <div class="btn-line">
            <span class="popup-close k-button"><span class="lang-replace" data-lang="cancelButton">Cancel</span></span>
            <button class="k-button" type="button"
                    data-role="button"
                    data-click="updatePriorityAccept">Ok</button>
        </div>
    </div>
</script>
<script id="delete-account-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_DELETE_ACCOUNT">You are about to delete account</span>
        <span id="curr-acc-name">'numberDeleteProductions'</span>
        <span class="lang-replace" data-lang="WARNING_DELETE_MOTIF_SINGLE2"> <br> Are you sure?</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button" data-role="button" data-click="deleteAccount">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>
<script id="delete-adm-product-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_DELETE_PRODUCT">You are about to delete content format</span>
        <span id="curr-adm-product-name">'product name'</span>
        <span class="lang-replace" data-lang="WARNING_DELETE_MOTIF_SINGLE2"> <br> Are you sure?</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button" data-role="button" data-click="deleteAdmProduct">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>
<script id="delete-audio-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_DELETE_AUDIO">You are about to delete audio file</span>
        <span id="curr-audio-name"></span>
        <span class="lang-replace" data-lang="WARNING_DELETE_MOTIF_SINGLE2"> <br> Are you sure?</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button" data-role="button" data-click="deleteAudio">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>
<script id="delete-dialog-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_DELETE_PROD_SINGLE">You are about to delete</span>
        <span id="curr-film-name">'prodName'</span>.
        <span class="lang-replace" data-lang="WARNING_DELETE_PROD_SINGLE2">Are you sure?</span>
    </p>
    <div class="dialog-btn-line">
        <button id="delete-film" class="k-button" data-role="button" data-click="applyDeleteFilmFunc">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>
<script id="delete-dialog3-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_DELETE_MOTIF_SINGLE">You are about to delete</span>
        <span id="curr-motif-name">'numberDeleteProductions'</span>
        <span class="lang-replace" data-lang="WARNING_DELETE_MOTIF_SINGLE2"> <br> Are you sure?</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button" data-role="button" data-click="apllyDeleteMotifFunc">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>
<script id="delete-group-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_DELETE_GROUP">You are about to delete account</span>
        <span id="curr-group-name">'numberDeleteGroup'</span>
        <span class="lang-replace" data-lang="WARNING_DELETE_MOTIF_SINGLE2"> <br> Are you sure?</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button" data-role="button" data-click="deleteGroup">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>
<script id="delete-motif-type-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_DELETE_CONTENT_FORMAT">You are about to delete content format</span>
        <span id="curr-motif-type-name">'motif type name'</span>
        <span class="lang-replace" data-lang="WARNING_DELETE_MOTIF_SINGLE2"> <br> Are you sure?</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button" data-role="button" data-click="deleteMotifType">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>
<script id="download-tmp" type="text/x-kendo-template">
    <div class="popup-title-wr">
        <span class="k-button icon-button popup-close close-btn">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </span>

        <h3 class="popup-title lang-replace" data-lang="download">Download</h3>
    </div>
    <ul class="download-list">
    </ul>
    <p>
        <a id="download-page-link" class="lang-replace" target="_blank" href="" data-lang="download-page-text">Also you can download videos on this page.</a>
        <br/>
        <span class="lang-replace" data-lang="link-remains">These link remain active for 30 days till</span> -
        <span id="download-page-term"></span>.
    </p>
</script>
<script id="load-dialog-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_IMPORT">You are about to import</span>
        <span id="curr-film-name">'prodName'</span>.
        <span class="lang-replace" data-lang="WARNING_IMPORT2">The Current production will be overwritten. <br> Do you want to do this?</span>
    </p>
    <div class="dialog-btn-line">
        <button id="acceptLoadProduction" class="k-button" data-role="button" data-click="loadProdFunc">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>
<script id="new-dialog-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_NEW_PRODUCTION">You are about to start a new production. The Current production will be lost. <br> Do you want to do this?</span>
    </p>
    <div class="dialog-btn-line">
        <button id="acceptNewProduction" class="k-button" data-role="button" data-click="newProdDialogFunc">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>
<script id="preview-created-tmp" type="text/x-kendo-template">
    <p>
        Product preview sent to render.
    </p>
</script>
<script id="produce-dialog-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="produceSentText">The production is submitted and the film will be in your film collection when its done. What do you want to do next?</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button" data-role="button" data-click="logOutAfterProduce">
            <span class="lang-replace" data-lang="logout">Logout</span>
        </button>
        <button class="k-button" data-role="button" data-click="goHubAfterProduce">
            <span class="lang-replace" data-lang="startscreen">Startscreen</span>
        </button>
        <button class="k-button" data-role="button" data-click="newProdDialogFunc">
            <span class="lang-replace" data-lang="NEW_PRODUCTION">New Production</span>
        </button>
    </div>
</script>
<script id="produce-tmp" type="text/x-kendo-template">
    <div class="popup-title-wr">
        <span class="k-button icon-button popup-close close-btn">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </span>
        <h3 class="popup-title lang-replace" data-lang="produceLabel">Produce</h3>
    </div>
    <form id="produce-form" action="" class="produce-form">
        <div class="form-box">
            <h4>
                <span class="lang-replace" data-lang="selectFormatsLabel">
                    Select the desired formats
                </span>:<sup class="text-danger" data-bind="visible: formatsReqFlag">✱</sup>
            </h4>

            <div class="line col4">
                <div class="col">
                    <h6>MP4</h6>
                    <div id="mp4-list" class="no-style-widget"
                         data-role="listview"
                         data-selectable="false"
                         data-bind="source: codecFormatTypes.mp4"
                         data-template="codec-item-tmp">
                    </div>
                </div>
                <div class="col">
                    <h6>WMV</h6>
                    <div id="wmv-list" class="no-style-widget"
                         data-role="listview"
                         data-selectable="false"
                         data-bind="source: codecFormatTypes.wmv"
                         data-template="codec-item-tmp">
                    </div>
                </div>
                <div class="col">
                    <h6>VR 360&deg;</h6>
                    <div id="vr360-list" class="no-style-widget"
                         data-role="listview"
                         data-selectable="false"
                         data-bind="source: codecFormatTypes.vr360"
                         data-template="codec-item-tmp">
                    </div>
                </div>
                <div class="col">
                    <h6>SPECIAL</h6>
                    <div id="special-list" class="no-style-widget"
                         data-role="listview"
                         data-selectable="false"
                         data-bind="source: codecFormatTypes.special"
                         data-template="codec-item-tmp">
                    </div>
                </div>
            </div>

            <h4>
                <span class="lang-replace" data-lang="selectMusicLabel">
                    Choose your music
                </span>:<sup class="text-danger" data-bind="visible: musicReqFlag">✱</sup>
            </h4>

            <div class="line audio-line">
                <select id="prodAudioSelect" name=""
                        data-role="dropdownlist"
                        data-select="onSelectProductionAudio"
                        data-bound="initProductionAudio"
                        data-value-field="audioId"
                        data-text-field="name"
                        data-bind="source:audioSelectArr , value:productionAudio">
                </select>
                <div class="production-audio-wr">
                    <audio id="playCurAudio" src="" class="" controls></audio>
                    <span id="play-audio-button" class="play-btn"
                            data-role="button"
                            data-enable="true"
                            data-click="playAudio">
                            <span class="text-wr">
                                <span class="play lang-replace" data-lang="Play">Play</span>
                                <span class="stop lang-replace" data-lang="Stop">Stop</span>
                            </span>
                    </span>
                </div>
            </div>

            <div class="line">
                <div class="check-wr">
                    <input type="checkbox" class="k-checkbox" id="ch21" disabled>
                    <label for="ch21" class="k-checkbox-label">
                        <span class="lang-replace" data-lang="cb_specialMusic">Into and outro use their own music</span>
                    </label>
                </div>
            </div>

            <h4>
                <span class="lang-replace" data-lang="notification">Notification</span>:
            </h4>
            <div class="line">
                <div class="check-wr email-line">
                    <input type="checkbox" class="k-checkbox" id="ch22">
                    <label for="ch22" class="k-checkbox-label">
                        <span class="lang-replace" data-lang="cb_notifyEmail">Send email message upon completion</span>
                    </label>
                    <div class="input-wr">
                        <input class="k-input email-input" type="email" value="" data-bind="value: userEmailField"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-box">
            <h4>
                <span class="lang-replace" data-lang="prodNameLabel">
                    Notification
                </span>:<sup class="text-danger" data-bind="visible: nameReqFlag">✱</sup>
            </h4>
            <div class="line submit-line">
                <button id="produce-prod-popup-button" class="k-button right" type="submit"
                        data-role="button"
                        data-enable="false">
                    <span class="lang-replace" data-lang="submitButton">Submit</span>
                </button>
                <input id="produceProdName" class="k-input lang-replace" pattern="[A-Za-z0-9][A-Za-z0-9 _-]{1,32}" type="text"
                       data-value-update="keyup change"
                       data-placeholder="productionLabel" placeholder="Name production" value="" data-bind="value: jobNameField"/>
            </div>
        </div>
    </form>
</script>

<script id="codec-item-tmp" type="text/x-kendo-template">
    <div class="check-wr">
        <input type="checkbox" class="k-checkbox"
               id="ch#=data.codec_type_id#" name="ch#=data.codec_type_id#" value="#=data.codec_type_id#"
               data-bind="checked: codecFormatsArr"
        #if ( !enabled ) {# disabled #}#
        #if ( data.codec_type_id == '20' ) {# disabled #}#>
        <label for="ch#=data.codec_type_id#" class="k-checkbox-label">#=data.tplName# </label>
    </div>
</script>
<script id="product-id-popup-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="productWithId">Product with ID</span>
        <span id="curr-adm-product-id">'product ID'</span>
        <span class="lang-replace" data-lang="AlreadyExist"> already exist</span>.
    </p>
    <div class="dialog-btn-line">
        <button class="k-button popup-close" data-role="button">
            <span>Ok</span>
        </button>
    </div>
</script>
<script id="production-save-tmp" type="text/x-kendo-template">
    <div class="popup-title-wr">
        <span class="k-button icon-button popup-close close-btn">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </span>
        <h3 class="popup-title lang-replace" data-lang="saveProdText">Save production</h3>
    </div>
    <form id="production-save-form" action="" class="production-save-form">
        <div class="line">
            <input id="newProdNameInput" class="k-input lang-replace" type="text" value="" pattern="^[A-Za-z0-9][A-Za-z0-9_-]{1,32}$" data-placeholder="productionLabel" placeholder="Name production" required="required"/>
            <button class="k-button right" type="button" data-role="button" data-click="applySaveProdFunc">
                <span class="lang-replace" data-lang="save">Save</span>
            </button>
        </div>
    </form>
</script>
<script id="save-group-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="SAVE_GROUP_WARNING">You are about to make changes. Do you want to save them?</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button" data-role="button" data-click="workOnAccountGroup">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>
<script id="save-new-group-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_TEMP_GROUP">Do you want to continue without saving "New Group"?</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button" data-role="button" data-click="workOnAccountGroup">
            <span class="lang-replace" data-lang="bt_saveProduction">Save</span>
        </button>
        <button class="k-button" data-role="button" data-click="clearGroupObject">
            <span class="lang-replace" data-lang="Continue">Continue</span>
        </button>
    </div>
</script>
<script id="saved-popup-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="changesSaved">Changes saved</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button popup-close" data-role="button">
            <span>Ok</span>
        </button>
    </div>
</script>
<script id="timespan-tmp" type="text/x-kendo-template">
    <div class="popup-title-wr">
        <span class="k-button icon-button popup-close close-btn">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </span>
        <h3 class="popup-title lang-replace" data-lang="timespanTitle">Select timespan</h3>
    </div>
    <form action="" class="timespan-form">
        <div class="form-box">
            <h5 class="lang-replace" data-lang="customIntervalLabel">Custom interval</h5>
            <div class="line">
                <label for="startDate" class="lang-replace" data-lang="fromLabel">from:</label>
                <div class="date-wr">
                    <input id="startDate" type="text" data-role="datepicker" data-type="date" data-change="startDateChange"/>
                </div>
            </div>
            <div class="line">
                <label for="endDate" class="lang-replace" data-lang="untilLabel">until:</label>
                <div class="date-wr">
                    <input id="endDate" type="text" data-type="date" data-role="datepicker" data-change="endDateChange"/>
                </div>
            </div>
        </div>
        <div class="form-box">
            <h5 class="lang-replace" data-lang="presetIntervalsLabel">Preset intervals</h5>
            <div class="line presets-line">
                <button class="k-button" type="button" data-role="button" data-click="setToday">
                    <span class="lang-replace" data-lang="presetButton1">Today</span>
                </button>
                <button class="k-button" type="button" data-role="button" data-click="setThisMonth">
                    <span class="lang-replace" data-lang="presetButton2">this month</span>
                </button>
                <button class="k-button" type="button" data-role="button" data-click="setLastMonth">
                    <span class="lang-replace" data-lang="presetButton3">last month</span>
                </button>
                <button class="k-button" type="button" data-role="button" data-click="setThisYear">
                    <span class="lang-replace" data-lang="presetButton4">this year</span>
                </button>
                <button class="k-button" type="button" data-role="button" data-click="setLastYear">
                    <span class="lang-replace" data-lang="presetButton5">last year</span>
                </button>
            </div>
        </div>
        <div class="dialog-btn-line">
            <span class="k-button" data-role="button" data-click="setTimespan">
                <span class="lang-replace" data-lang="apply">Apply</span>
            </span>
        </div>
    </form>
</script>
<script id="upload-tmp" type="text/x-kendo-template">
    <div class="popup-title-wr">
        <span class="k-button icon-button popup-close close-btn">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </span>
        <h3 class="popup-title lang-replace" data-lang="titleUploadLabel">Upload new motif</h3>
    </div>
    <form id="motif-upload-form" action="" class="motif-upload-form">
        <div class="img-wr">
            <div class="table-wr">
                <div class="table-cell">
                    <p class="">
                        <span class="lang-replace default" data-lang="newMotifLabel">
                            Please choose a JPG file<br> in RGB format or<br> a movie clip
                        </span>
                        <span style="display: none;" class="lang-replace error" data-lang="newMotifLabelInvalid">
                            This file is broken. <br>Please, choose another <br>JPG file or a movie clip.
                        </span>
                        <span style="display: none;" class="lang-replace video" data-lang="clipLoadedLabel">
                            NO PREVIEW AVAILABLE
                        </span>
                        <span style="display: none" class="wait-loading">
                            <img style="display: inline-block" src="img/loader_32.gif" width="32" height="32" alt=""/><br>
                            <span class="lang-replace" data-lang="upload_wait">please wait...</span>
                        </span>
                    </p>
                    <img src="" alt=""/>
                    <div id="motif-upload-progressbar" data-role="progressbar"
                         data-min="0"
                         data-max="100"
                         data-show-status="false"
                         data-animation="false"></div>
                </div>
            </div>
        </div>
        <div class="line">
            <label for="newMotifName" class="lang-replace" data-lang="motifNameLabel">Motif name:</label>
            <div class="input-wr">
                <input id="newMotifName" class="k-input" pattern="^[A-Za-z0-9][A-Za-z0-9\s_-]{1,32}$" type="text"/>
            </div>
            <div class="upload-wr">
                <span class="k-button">
                    <input id="upload-input" type="file" accept="image/*,video/*,.pdf">
                    <span class="lang-replace" data-lang="browseButton">Browse</span>
                </span>
            </div>
        </div>
        <div class="line">
            <label for="descriptionValue"><span class="lang-replace" data-lang="descriptionLabel">Description</span>:</label>
            <div class="input-wr">
                <textarea id="descriptionValue" class="k-input"></textarea>
            </div>
        </div>
        <div class="dialog-btn-line">
            <button id="saveMotifBtn" class="k-button" type="submit" data-role="button" data-enable="false">
                <span class="lang-replace" data-lang="save">Save</span>
            </button>
        </div>
    </form>
</script>
<script id="username-popup-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="setUserNameError">Such username is already exist, choice another</span>
    </p>
    <div class="dialog-btn-line">
        <button class="k-button popup-close" data-role="button">
            <span>Ok</span>
        </button>
    </div>
</script>