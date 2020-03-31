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
                                data-click="popupCallFunc"
                                data-popup-type=""
                                data-popup-content="download"
                                data-refresh-func="downloadFilmPopupFunc"
                                data-enable="false">
                            <span class="k-icon k-i-folder-up"></span>
                            <span class="lang-replace" data-lang="downloadFilmButton" data-tooltip="downloadFilmButtonTooltip">Download</span>
                        </button>
                        <button id="deleteFilm" class="popup-btn"
                                data-role="button"
                                data-click="popupCallFunc"
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
                                data-click="popupCallFunc"
                                data-enable="false"
                                data-popup-type="dialog-popup"
                                data-popup-content="load-dialog"
                                data-refresh-func="loadProdDialogFunc">
                            <span class="k-icon k-i-folder-up"></span>
                            <span class="lang-replace" data-lang="importFilmButton" data-tooltip="importFilmButtonTooltip">Load</span>
                        </button>
                        <button id="newProduction" class="popup-btn"
                                data-role="button"
                                data-click="popupCallFunc"
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
                    <img src="/data/accounts/#:accountId#/productions/#:filmId#/film_#:filmId#_preview_mdpi.jpg">
                #}else{#
                    <span class="no-video" title=""></span>
                #}#
            </div>
            <div class="active-icon">
                <div class="svg-icon"></div>
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
