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
