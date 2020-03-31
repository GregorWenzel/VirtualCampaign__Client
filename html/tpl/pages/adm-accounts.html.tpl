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