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