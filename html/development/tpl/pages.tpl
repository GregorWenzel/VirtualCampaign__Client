<script id="motifs" type="text/x-kendo-template">
    <div id="motifPage">
        <div class="top-panel">
            <h1 class="lang-replace" data-lang="titleMotifLabel">Motifs</h1>
            <div class="show-block">
                <a href="#/hub" class="k-button"><span class="k-icon k-i-arrowhead-w"></span></a>
            </div>
            <div class="hide-block">
                <a href="#/production" class="k-button"><span class="k-icon k-i-arrowhead-w"></span></a>
            </div>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="delete-motif-btn" class="popup-btn"
                                data-role="button"
                                data-enable="false"
                                data-refresh-func="deleteMotifPopupFunc"
                                data-popup-type="dialog-popup"
                                data-popup-content="delete-dialog3">
                            <span class="k-icon k-i-close"></span>
                            <span class="lang-replace" data-lang="deleteMotifButton" data-tooltip="deleteMotifButtonTooltip">Delete</span>
                        </button>
                        <button class="popup-btn"
                                data-role="button"
                                data-popup-type=""
                                data-popup-content="upload"
                                data-refresh-func="uploadMotifPopupFunc" >
                            <span class="k-icon k-si-plus"></span>
                            <span class="lang-replace" data-lang="addMotifButton" data-tooltip="addMotifButtonTooltip">Add</span>
                        </button>
                        <div class="hide-block inline-block">
                            <button id="applyMotifBtn" data-role="button" data-enable="false" data-click="ApllySelectedMotif"><span class="k-icon k-i-tick"></span>
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
                <button id="delete-motif-btn2" class="popup-btn"
                        data-role="button"
                        data-enable="false"
                        data-refresh-func="deleteMotifPopupFunc"
                        data-popup-type="dialog-popup"
                        data-popup-content="delete-dialog3">
                    <span class="k-icon k-i-close"></span>
                </button>
                <button class="popup-btn"
                        data-role="button"
                        data-popup-type=""
                        data-popup-content="upload"
                        data-refresh-func="uploadMotifPopupFunc" >
                    <span class="k-icon k-si-plus"></span>
                </button>
                <div class="hide-block inline-block">
                    <button id="applyMotifBtn2"
                            data-role="button"
                            data-enable="false"
                            data-click="ApllySelectedMotif">
                        <span class="k-icon k-i-tick"></span>
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
                <div class="img" style="background: url(#:HOST_PATH#/data/accounts/#:accountId#/motifs/#:motifId#_thumb.jpg);"></div>
                <div class="active-icon">
                    <svg x="0px" y="0px" viewBox="0 0 15 15" style="enable-background:new 0 0 15 15;" xml:space="preserve">
                        <polygon id="select_x5F_checker" class="st0" points="14.8,2.1 12.6,0.6 6.6,9.6 2.1,5 0.2,6.9 6.8,13.6 "/>
                    </svg>
                </div>
            </div>
            <div class="item-info">
                <div class="val-wr">
                    <p class="item-name">#:name#</p>
                    <p class="item-type">
                        # if (frameCount>1) {
                            frameCount #
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
        <a href="#/production" class="k-button"><span class="k-icon k-i-arrowhead-w"></span></a>
    </div>

    <div class="bottom-panel k-button-group" >
        <div class="panel-menu">
            <div class="panel-wr">
                <div class="right-side">
                    <!--<a class="k-button" href="#/production"><span class="k-icon k-i-tick"></span> Apply</a>-->
                    <button id="applyClipBtn"
                            data-role="button"
                            data-enable="false">
                        <span class="k-icon k-i-tick"></span>
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
            <button id="applyClipBtn2"
                    data-role="button"
                    data-enable="false">
                <span class="k-icon k-i-tick"></span>
            </button>
        </div>
    </div>

    <div class="page-content">
        <div class="sort-panel clearfix" id="clips-filter">
            <div class="sort-item">
                <label for="filterClipsSelect1" class="lang-replace" data-lang="locationLabel">Location:</label>
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
                <svg x="0px" y="0px" viewBox="0 0 15 15" style="enable-background:new 0 0 15 15;" xml:space="preserve">
                    <polygon id="select_x5F_checker" class="st0" points="14.8,2.1 12.6,0.6 6.6,9.6 2.1,5 0.2,6.9 6.8,13.6 "/>
                </svg>
            </div>
            <p class="item-name">#:name#</p>
            <div class="clip-img">
                <img src="#:HOST_PATH#/data/products/#:idString#/#:idString#_mdpi.jpg">
            </div>
            <div class="item-info">
                <div class="fll">
                    <!--<p>#:locked#</p>-->
                    <p class="item-dur">
                        <a href="#:HOST_PATH#/data/products/#:idString#/#:idString#_hdpi.mp4" class="html5lightbox-link" data-width="640" data-height="360" title="#:name#">
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
            <a href="#/hub" class="k-button"><span class="k-icon k-i-arrow-w"></span></a>
        </div>

        <div class="bottom-panel k-button-group">
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="downloadFilm" class="popup-btn"
                                data-role="button"
                                data-popup-type=""
                                data-popup-content="download"
                                data-refresh-func="downloadFilmPopupFunc"
                                data-enable="false">
                            <span class="k-icon k-i-folder-up"></span>
                            <span class="lang-replace" data-lang="downloadFilmButton" data-tooltip="downloadFilmButtonTooltip">Download</span>
                        </button>
                        <button id="deleteFilm" class="popup-btn"
                                data-role="button"
                                data-popup-type="dialog-popup"
                                data-popup-content="delete-dialog"
                                data-refresh-func="deleteFilmPopupFunc"
                                data-enable="false">
                            <span class="k-icon k-i-close"></span>
                            <span class="lang-replace" data-lang="deleteFilmButton" data-tooltip="deleteFilmButtonTooltip">Delete</span>
                        </button>
                        <div class="sep"></div>
                        <button id="loadFilm" class="popup-btn"
                                data-role="button"
                                data-enable="false"
                                data-popup-type="dialog-popup"
                                data-popup-content="load-dialog"
                                data-refresh-func="loadProdDialogFunc">
                            <span class="k-icon k-i-folder-up"></span>
                            <span class="lang-replace" data-lang="importFilmButton" data-tooltip="importFilmButtonTooltip">Load</span>
                        </button>
                        <button id="newProduction" class="popup-btn"
                                data-role="button"
                                data-popup-type="dialog-popup"
                                data-popup-content="new-dialog">
                            <span class="k-icon k-i-plus"></span>
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
                #if( duration != '0' ){#
                    <img src="#:HOST_PATH#/data/accounts/#:accountId#/productions/#:filmId#/film_#:filmId#_preview_mdpi.jpg">
                #}else{#
                    <span class="no-video" title=""></span>
                #}#
            </div>
            <div class="active-icon">
                <svg x="0px" y="0px" viewBox="0 0 15 15" style="enable-background:new 0 0 15 15;" xml:space="preserve">
                    <polygon id="select_x5F_checker" class="st0" points="14.8,2.1 12.6,0.6 6.6,9.6 2.1,5 0.2,6.9 6.8,13.6 "/>
                </svg>
            </div>
            <div class="item-info">
                <p class="fll">
                    <a href="#:HOST_PATH#/data/accounts/#:accountId#/productions/#:filmId#/film_#:filmId#_hdpi.mp4" class="html5lightbox-link" data-width="640" data-height="360" title="#:name#">
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
            <a href="#/hub" class="k-button"><span class="k-icon k-i-arrowhead-w"></span></a>
        </div>

        <div class="bottom-panel k-button-group" >
            <div class="panel-menu">
                <div class="panel-wr">
                    <div class="right-side">
                        <button id="newProduction" class="popup-btn"
                                data-role="button"
                                data-popup-type="dialog-popup"
                                data-popup-content="new-dialog">
                            <span class="k-icon k-i-plus"></span>
                            <span class="lang-replace" data-lang="newProductionButton" data-tooltip="newProductionButtonTooltip">New</span>
                        </button>
                        <button class="popup-btn"
                                data-role="button"
                                data-popup-content="production-save"
                                data-refresh-func="saveProdPopupFunc">
                            <span class="k-icon k-i-save"></span>
                            <span class="lang-replace" data-lang="bt_saveProduction" data-tooltip="bt_saveProductionTooltip">Save</span>
                        </button>
                        <button id="produceProdBtn" class="popup-btn unselectable"
                                data-role="button"
                                data-enable="false"
                                data-popup-content="produce"
                                data-refresh-func="produceProdPopupFunc">
                            <span class="k-icon k-i-custom"></span>
                            <span class="lang-replace" data-lang="produceButton" data-tooltip="produceButtonTooltip">Produce</span>
                        </button>
                    </div>
                    <div class="left-side">
                        <button id="deleteClipButton" data-role="button" data-enable="false" data-click="prodDeleteClipFunc">
                            <span class="k-icon k-i-close"></span>
                            <span class="lang-replace" data-lang="deleteClipButton" data-tooltip="deleteClipButtonTooltip">Delete Clip</span>
                        </button>
                        <button id="replaceClipButton" data-role="button" data-enable="false" data-click="prodReplaceClipFunc">
                            <span class="k-icon k-i-refresh "></span>
                            <span class="lang-replace" data-lang="replaceClipButton" data-tooltip="replaceClipButtonTooltip">Replace Clip</span>
                        </button>
                        <button id="insertClipBtn" data-role="button" data-click="prodInsertClipFunc">
                            <span class="k-icon k-si-plus"></span>
                            <span class="lang-replace" data-lang="insertClipLabel" data-tooltip="insertClipLabelTooltip">Insert Clip</span>
                        </button>
                    </div>
                </div>
            </div>
            <button class="k-button k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>
            <div class="mobile-view-panel">
                <div class="right-side">
                    <button id="produceProdBtn2" class="popup-btn unselectable"
                            data-role="button"
                            data-enable="false"
                            data-click="popupCallFunc"
                            data-popup-content="produce"
                            data-refresh-func="produceProdPopupFunc">
                        <span class="k-icon k-i-custom"></span>
                    </button>
                </div>
                <div class="left-side">
                    <button id="deleteClipButton2" data-role="button" data-enable="false" data-click="prodDeleteClipFunc">
                        <span class="k-icon k-i-close"></span>
                    </button>
                    <button id="replaceClipButton2" data-role="button" data-enable="false" data-click="prodReplaceClipFunc">
                        <span class="k-icon k-i-refresh "></span>
                    </button>
                    <button id="insertClipBtn2" data-role="button" data-click="prodInsertClipFunc">
                        <span class="k-icon k-si-plus"></span>
                    </button>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="clearfix">
                <button id="" class="timeline-add-clip" data-role="button" data-click="prodInsertClipFunc">+</button>
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
            </div>


            <div id="current-film-motifs" class="clip-motifs-list items-list clearfix"
                 data-role="listview"
                 data-source="currentProdMotifsDataSource"
                 data-selectable="true"
                 data-template="motifProdTemplate"
                 data-change="currProdMotifsListViewChangeFunc">
            </div>

        </div>
    </div>
</script>


<script id="clipProdTemplate" type="text/x-kendo-template">
    <div class="list-item clip-item #if(locked!=''){#locked#}#"
         data-id="#:clipId#">
        <div class="item-wr">
            <div class="active-icon">
                <svg x="0px" y="0px" viewBox="0 0 15 15" style="enable-background:new 0 0 15 15;" xml:space="preserve">
                    <polygon id="select_x5F_checker" class="st0" points="14.8,2.1 12.6,0.6 6.6,9.6 2.1,5 0.2,6.9 6.8,13.6 "/>
                </svg>
            </div>
            <p class="item-name">#:name#</p>
            <div class="clip-img">
                <img src="#:HOST_PATH#/data/products/#:idString#/#:idString#_mdpi.jpg">
            </div>
            <div class="item-info">
                <div class="fll">
                    <!--<p>#:locked#</p>-->
                    <p class="item-dur">
                        <a href="#:HOST_PATH#/data/products/#:idString#/#:idString#_hdpi.mp4" class="html5lightbox-link" data-width="640" data-height="360" title="#:name#">
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


<script id="motifProdTemplate" type="text/x-kendo-template">
    <div class="motif-select-item" data-id="#:motifId#" style="width: #:aspect#px">
        #if( motifId == '0' ){#
            <div class="empty-img-name"><div>#:numName#</div></div>
        #}else{#
            <img class="motif-img" src="#:HOST_PATH#/data/accounts/#:accountId#/motifs/#:motifId#_thumb.jpg" alt=""/>
        #}#
    </div>
</script>
<script id="statistics" type="text/x-kendo-template">

    <div class="top-panel">
        <h1 class="lang-replace" data-lang="titleStatisticLabel">Statistic</h1>
        <a href="#/hub" class="k-button"><span class="k-icon k-i-arrowhead-w"></span></a>
    </div>

    <div class="bottom-panel k-button-group" >
        <div class="panel-menu">
            <div class="panel-wr">
                <div class="right-side"></div>
                <div class="left-side">
                    <button class="k-button popup-btn" data-popup-type="" data-popup-content="timespan" data-refresh-func="initDatepickers">
                        <span class="k-icon k-i-calendar"></span>
                        <span class="lang-replace" data-lang="setDateButton" data-tooltip="setDateButtonTooltip">Select data</span>
                    </button>
                    <div class="sep"></div>
                    <button class="k-button" data-role="button" data-click="exportStatistics">
                        <span class="k-icon k-i-excel"></span>
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
            <div class="chart-table-wr">
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
            <div class="chart-table-wr">
                <div id="ProductUsageTable" class="chart-table"></div>
            </div>
            <div class="chart-wr">
                <div id="ProductUsageChart"></div>
            </div>
        </div>
    </div>
</script>