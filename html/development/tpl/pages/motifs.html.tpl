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
                                data-click="popupCallFunc"
                                data-refresh-func="deleteMotifPopupFunc"
                                data-popup-type="dialog-popup"
                                data-popup-content="delete-dialog3">
                            <span class="k-icon k-i-close"></span>
                            <span class="lang-replace" data-lang="deleteMotifButton" data-tooltip="deleteMotifButtonTooltip">Delete</span>
                        </button>
                        <button class="popup-btn"
                                data-role="button"
                                data-click="popupCallFunc"
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
                        data-click="popupCallFunc"
                        data-refresh-func="deleteMotifPopupFunc"
                        data-popup-type="dialog-popup"
                        data-popup-content="delete-dialog3">
                    <span class="k-icon k-i-close"></span>
                </button>
                <button class="popup-btn"
                        data-role="button"
                        data-click="popupCallFunc"
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
                <div class="img" style="background: url(/data/accounts/#:accountId#/motifs/#:motifId#_thumb.jpg);"></div>
                <div class="active-icon">
                    <div class="svg-icon"></div>
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
