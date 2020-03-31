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
                    <button class="k-button popup-btn"
                            data-role="button"
                            data-click="popupCallFunc"
                            data-popup-type=""
                            data-popup-content="timespan"
                            data-refresh-func="initDatepickers">
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