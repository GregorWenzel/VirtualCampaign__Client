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