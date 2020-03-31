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
