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