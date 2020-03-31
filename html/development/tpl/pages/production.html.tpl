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
                        <button id="new-prod-dialog-btn" class="hidden popup-btn" data-role="button" data-click="popupCallFunc" data-popup-content="produce-dialog"></button>
                        <button id="newProduction" class="popup-btn"
                                data-role="button"
                                data-click="popupCallFunc"
                                data-popup-type="dialog-popup"
                                data-popup-content="new-dialog">
                            <span class="k-icon k-i-plus"></span>
                            <span class="lang-replace" data-lang="newProductionButton" data-tooltip="newProductionButtonTooltip">New</span>
                        </button>
                        <button class="popup-btn"
                                data-role="button"
                                data-click="popupCallFunc"
                                data-popup-content="production-save"
                                data-refresh-func="saveProdPopupFunc">
                            <span class="k-icon k-i-save"></span>
                            <span class="lang-replace" data-lang="bt_saveProduction" data-tooltip="bt_saveProductionTooltip">Save</span>
                        </button>
                        <button id="produceProdBtn" class="popup-btn unselectable"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
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
            <img class="motif-img" src="/data/accounts/#:accountId#/motifs/#:motifId#_thumb.jpg" alt=""/>
        #}#
    </div>
</script>

<!--
                 <svg x="0px" y="0px" viewBox="0 0 15 15" style="enable-background:new 0 0 15 15;" xml:space="preserve">
                    <polygon id="select_x5F_checker" class="st0" points="14.8,2.1 12.6,0.6 6.6,9.6 2.1,5 0.2,6.9 6.8,13.6 "/>
                </svg>
-->