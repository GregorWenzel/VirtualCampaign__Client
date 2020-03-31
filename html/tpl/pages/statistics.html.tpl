<script id="statistics" type="text/x-kendo-template">

    <div class="top-panel">
        <h1 class="lang-replace" data-lang="titleStatisticLabel">Statistic</h1>
        <a href="#/hub" class="k-button icon-button">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </a>
    </div>

    <div class="bottom-panel k-button-group" >
        <div class="panel-menu">
            <div class="panel-wr">
                <div class="right-side"></div>
                <div class="left-side">
                    <button class="k-button icon-button popup-btn"
                            data-role="button"
                            data-click="popupCallFunc"
                            data-popup-type=""
                            data-popup-content="timespan-tmp"
                            data-refresh-func="initDatepickers">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <path id="calender"  d="M58,45.6h1.5v18.6h-2.3V49.7c-0.5,0.5-1.3,1-2.2,1.6c-0.9,0.5-1.7,0.9-2.4,1.2v-2.2
                                c1.3-0.6,2.4-1.3,3.3-2.2C56.9,47.2,57.6,46.4,58,45.6z M42.3,45.6c1,0,1.9,0.2,2.8,0.7c0.9,0.4,1.5,1,2,1.8
                                c0.5,0.8,0.7,1.5,0.7,2.4c0,0.8-0.2,1.5-0.6,2.2c-0.4,0.7-1.1,1.2-1.9,1.6c1.1,0.3,1.9,0.8,2.6,1.6c0.6,0.8,0.9,1.8,0.9,3
                                c0,1.6-0.6,3-1.8,4.1c-1.2,1.1-2.7,1.7-4.5,1.7c-1.6,0-3-0.5-4.1-1.5c-1.1-1-1.7-2.2-1.8-3.8l2.3-0.3c0.3,1.3,0.7,2.2,1.3,2.8
                                c0.6,0.6,1.4,0.9,2.3,0.9c1.1,0,2-0.4,2.7-1.1c0.7-0.7,1.1-1.7,1.1-2.8c0-1-0.3-1.9-1-2.6c-0.7-0.7-1.6-1-2.6-1
                                c-0.4,0-1,0.1-1.6,0.3l0.3-2c0.2,0,0.3,0,0.4,0c1,0,1.8-0.3,2.6-0.8c0.8-0.5,1.2-1.3,1.2-2.3c0-0.8-0.3-1.5-0.8-2.1
                                c-0.6-0.5-1.3-0.8-2.2-0.8c-0.9,0-1.6,0.3-2.2,0.8c-0.6,0.6-1,1.4-1.1,2.5l-2.3-0.4c0.3-1.5,0.9-2.7,1.9-3.5
                                C39.6,46,40.9,45.6,42.3,45.6z M24.7,41.4v28h45.8v-28H24.7z M20.7,29.5h10.9v8.9h9.1v-8.9h15.4v8.9h9.1v-8.9h10v43.6H20.7V29.5z
                                 M58.5,22.9H63v13.2h-4.5V22.9z M33.9,22.9h4.5v13.2h-4.5V22.9z"/>
                        </svg>
                        <span class="lang-replace" data-lang="setDateButton" data-tooltip="setDateButtonTooltip">Select data</span>
                    </button>
                    <div class="sep"></div>
                    <button class="k-button icon-button" data-role="button" data-click="exportStatistics">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <path id="csvexport"  d="M68.6,47.4c0.3,0,0.6,0.2,1,0.4l2.6,2.1c1.2,1,3.3,2.7,4.5,3.8l2.6,2.1c1.2,1,1.2,2.7,0,3.7
                                l-2.6,2.1c-1.3,1-3.3,2.7-4.6,3.7l-2.6,2.1c-1.3,1-2.3,0.2-2.3-1.9l0-4H52.1c-1.1,0-1.9-0.9-1.9-1.9v-4.2c0-1.1,0.9-1.9,1.9-1.9
                                h15.2l0-4C67.3,48.3,67.8,47.4,68.6,47.4z M26.5,34.6h7.3c1.5,0,2.3,0.7,2.3,2.2c0,1.5-0.8,2.2-2.3,2.2h-7.4c-1.4,0-2.2,0.8-2.2,2.3
                                v5.8c0,1.5,0.8,2.3,2.3,2.3l7.4,0c1.4,0,2.2,0.7,2.2,2.3c0,1.5-0.7,2.2-2.2,2.2h-7.4c-4.4,0-6.6-2.3-6.6-6.9v-5.8
                                C19.8,36.9,22.1,34.6,26.5,34.6z M44.4,34.6l5.9,0c1.5,0,2.2,0.7,2.2,2.2c0,1.5-0.7,2.2-2.2,2.3h-5.9c-1.5,0-2.3,0.5-2.3,1.5
                                c0,1,0.8,1.4,2.3,1.4h1.4c4.4,0.1,6.6,2.1,6.6,6c0,1.1-0.2,2.1-0.6,2.9c-1.9,0.1-3.4,1.2-4.1,2.9c-0.6,0.1-1.2,0.2-1.9,0.2l-6,0
                                c-1.4,0-2.1-0.7-2.2-2.1c0-1.6,0.7-2.3,2.1-2.3h6c1.5,0,2.2-0.5,2.2-1.5c0-1-0.7-1.5-2.2-1.5h-1.4c-4.5,0-6.7-2-6.7-6
                                C37.8,36.6,40,34.6,44.4,34.6z M56,34.6c0.9,0,1.5,0.3,1.8,0.8c0.3,0.5,1.6,4.5,4.1,12c2.5-7.5,3.8-11.4,4.2-11.9
                                c0.3-0.5,0.9-0.8,1.8-0.8c1.4,0,2.2,0.8,2.2,2.3l-3.1,8.2c-1.3,0.7-2.4,2.2-2.4,4.6l0,1.2h-5.4l-5.3-14.1
                                C53.8,35.3,54.5,34.6,56,34.6z"/>
                        </svg>
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
            <div class="chart-table-wr custom-table-style">
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
            <div class="chart-table-wr custom-table-style">
                <div id="ProductUsageTable" class="chart-table"></div>
            </div>
            <div class="chart-wr">
                <div id="ProductUsageChart"></div>
            </div>
        </div>
    </div>
</script>