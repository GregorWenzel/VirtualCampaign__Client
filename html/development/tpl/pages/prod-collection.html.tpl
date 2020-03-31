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
                <div class="svg-icon"></div>
            </div>
            <p class="item-name">#:name#</p>
            <div class="clip-img">
                <img src="/data/products/#:idString#/#:idString#_mdpi.jpg">
            </div>
            <div class="item-info">
                <div class="fll">
                    <!--<p>#:locked#</p>-->
                    <p class="item-dur">
                        <a href="/data/products/#:idString#/#:idString#_hdpi.mp4" class="html5lightbox-link" data-width="640" data-height="360" title="#:name#">
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