<script id="timespan-tmp" type="text/x-kendo-template">
    <div class="popup-title-wr">
        <span class="k-button icon-button popup-close close-btn">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </span>
        <h3 class="popup-title lang-replace" data-lang="timespanTitle">Select timespan</h3>
    </div>
    <form action="" class="timespan-form">
        <div class="form-box">
            <h5 class="lang-replace" data-lang="customIntervalLabel">Custom interval</h5>
            <div class="line">
                <label for="startDate" class="lang-replace" data-lang="fromLabel">from:</label>
                <div class="date-wr">
                    <input id="startDate" type="text" data-role="datepicker" data-type="date" data-change="startDateChange"/>
                </div>
            </div>
            <div class="line">
                <label for="endDate" class="lang-replace" data-lang="untilLabel">until:</label>
                <div class="date-wr">
                    <input id="endDate" type="text" data-type="date" data-role="datepicker" data-change="endDateChange"/>
                </div>
            </div>
        </div>
        <div class="form-box">
            <h5 class="lang-replace" data-lang="presetIntervalsLabel">Preset intervals</h5>
            <div class="line presets-line">
                <button class="k-button" type="button" data-role="button" data-click="setToday">
                    <span class="lang-replace" data-lang="presetButton1">Today</span>
                </button>
                <button class="k-button" type="button" data-role="button" data-click="setThisMonth">
                    <span class="lang-replace" data-lang="presetButton2">this month</span>
                </button>
                <button class="k-button" type="button" data-role="button" data-click="setLastMonth">
                    <span class="lang-replace" data-lang="presetButton3">last month</span>
                </button>
                <button class="k-button" type="button" data-role="button" data-click="setThisYear">
                    <span class="lang-replace" data-lang="presetButton4">this year</span>
                </button>
                <button class="k-button" type="button" data-role="button" data-click="setLastYear">
                    <span class="lang-replace" data-lang="presetButton5">last year</span>
                </button>
            </div>
        </div>
        <div class="dialog-btn-line">
            <span class="k-button" data-role="button" data-click="setTimespan">
                <span class="lang-replace" data-lang="apply">Apply</span>
            </span>
        </div>
    </form>
</script>