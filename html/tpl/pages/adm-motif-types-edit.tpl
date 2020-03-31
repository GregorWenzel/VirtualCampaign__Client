<script id="adm-motif-types-edit" type="text/x-kendo-template">
    <div id="motif-types-edit-page">
        <div class="top-panel">
            <h1 data-bind="text: name"></h1>
            <a href="#/adm-motif-types" class="k-button icon-button">
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
                        <button id="save-motif-types-edit-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="workOnContentFormat">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Save"  d="M34.8,59v4.1h26.3V59H34.8z M38.5,27.8h5.1v10.3h-5.1V27.8z M28,27.7h6.7v12.4h26.5V27.7H68v40.5
                                    H28V27.7z"/>
                            </svg>
                            <span class="lang-replace" data-lang="bt_saveProduction">Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content">
            <form class="item-edit-form" action="" onkeypress="return event.keyCode != 13;">
                <h3 class="lang-replace" data-lang="Details">Details</h3>
                <div class="line">
                    <label for=""><span class="lang-replace" data-lang="DROPDOWN_NAME">Name</span>:</label>
                    <input class="k-input" type="text" data-bind="value: name" value=""/>
                </div>
                <div class="line">
                    <label for=""><span class="lang-replace" data-lang="width">Width</span>:</label>
                    <input class="k-input" type="text" data-bind="value: width" value=""/>
                </div>
                <div class="line">
                    <label for=""><span class="lang-replace" data-lang="height">Height</span>:</label>
                    <input class="k-input" type="text" data-bind="value: height" value=""/>
                </div>
                <div class="line">
                    <label for=""><span class="lang-replace" data-lang="AspectLABEL">Aspect (Width/Height)</span>:</label>
                    <input class="k-input" type="text" data-bind="value: aspect" value="" readonly/>
                </div>
                <div class="line">
                    <a href="#/motifSelect-for-preview" id="motif-type-preview" class="motif-type-preview"
                       data-bind="style: {width:calculatedWidth,height:calculatedHeight,lineHeight:calculatedHeight}">A</a>
                </div>
            </form>
        </div>
    </div>
</script>