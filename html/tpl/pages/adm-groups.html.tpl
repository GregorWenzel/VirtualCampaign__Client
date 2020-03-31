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