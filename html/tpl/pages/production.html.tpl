<script id="production" type="text/x-kendo-template">
    <div id="productionPage">
        <div class="top-panel">
            <p class="production-time h1" data-bind="text: prodObj.durTime"></p>
            <h1 data-bind="text: prodObj.name"></h1>
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
                    <div class="right-side">
                        <button id="newProduction" class="icon-button popup-btn"
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
                        <button id="saveProduction"
                                class="popup-btn icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-popup-content="production-save-tmp"
                                data-refresh-func="saveProdPopupFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Save"  d="M34.8,59v4.1h26.3V59H34.8z M38.5,27.8h5.1v10.3h-5.1V27.8z M28,27.7h6.7v12.4h26.5V27.7H68v40.5
                                    H28V27.7z"/>
                            </svg>
                            <span class="lang-replace" data-lang="bt_saveProduction" data-tooltip="bt_saveProductionTooltip">Save</span>
                        </button>
                        <button id="produceProdBtn" class="icon-button popup-btn unselectable"
                                data-role="button"
                                data-enable="false"
                                data-click="popupCallFunc"
                                data-popup-content="produce-tmp"
                                data-refresh-func="produceProdPopupFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="produce"  d="M67.6,38.7l-2.3,4.2h4.8l2.3-4.2H67.6z M55.3,38.7L53,42.9h4.8l2.3-4.2H55.3z M43.1,38.7
                                    l-2.3,4.2h4.8l2.3-4.2H43.1z M30.8,38.7l-2.3,4.2h4.8l2.3-4.2H30.8z M26.8,34.1c-0.1,0-0.2,0-0.3,0c-0.6,0.2-0.9,0.7-0.7,1.3v0
                                    c0.1,0.6,0.7,0.9,1.3,0.7c0.6-0.2,0.9-0.7,0.7-1.3v0C27.7,34.4,27.3,34.1,26.8,34.1z M33.1,31.2l-4.6,1.3l3.7,3.8l4.6-1.3L33.1,31.2
                                    z M44.9,27.9l-4.6,1.3L44,33l4.6-1.3L44.9,27.9z M56.8,24.6l-4.6,1.3l3.7,3.8l4.6-1.3L56.8,24.6z M68.6,21.4L64,22.7l3.7,3.8
                                    l4.6-1.3L68.6,21.4z M71.5,20.3l1.4,5L28.3,37.6v0.8H73v5.2h-0.2v27.9H23.3V43.6H23v-5.2H23v-4c0-0.3,0.1-0.5,0.3-0.7l0,0l0-0.1
                                    l0.1,0l0,0c0.2-0.2,0.4-0.2,0.7-0.2h0.2L71.5,20.3z"/>
                            </svg>
                            <span class="lang-replace" data-lang="produceButton" data-tooltip="produceButtonTooltip">Produce</span>
                        </button>
                    </div>
                    <div class="left-side">
                        <button id="deleteClipButton" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="prodDeleteClipFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Garbage"  d="M52.7,44.5v24.3h5.9V44.5H52.7z M37.4,44.5v24.3h5.9V44.5H37.4z M28.8,40.3h38.5v33.3H28.8
                                    V40.3z M38.3,22.4h19.4v6.2h12.8v6.6H25.5v-6.6h12.8V22.4z"/>
                            </svg>
                            <span class="lang-replace" data-lang="deleteClipButton" data-tooltip="deleteClipButtonTooltip">Delete Clip</span>
                        </button>
                        <button id="replaceClipButton" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="prodReplaceClipFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="replaceClip"  d="M71.9,40l0,17.1l-4.7,0l0-9.1L42.2,73.1l-3.3-3.3l25-25h-9l0-4.7L71.9,40L71.9,40L71.9,40z
                                     M41,54.9l0-4.7h-9l25-25l-3.3-3.3L28.7,46.9l0-9.1l-4.7,0l0,17.1h0l0,0L41,54.9z"/>
                            </svg>
                            <span class="lang-replace" data-lang="replaceClipButton" data-tooltip="replaceClipButtonTooltip">Replace Clip</span>
                        </button>
                        <button id="insertClipBtn" class="icon-button"
                                data-role="button"
                                data-click="prodInsertClipFunc">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                 <path id="add"  d="M43,68V53.1H28V42.9h15V28h10v14.9h15v10.3H53V68H43z"/>
                            </svg>
                            <span class="lang-replace" data-lang="insertClipLabel" data-tooltip="insertClipLabelTooltip">Insert Clip</span>
                        </button>
                    </div>
                </div>
            </div>
            <button class="k-button k-rpanel-toggle"><span class="k-icon k-i-hbars"></span></button>
            <div class="mobile-view-panel">
                <div class="right-side">
                    <button id="produceProdBtn2" class="icon-button popup-btn unselectable"
                            data-role="button"
                            data-enable="false"
                            data-click="popupCallFunc"
                            data-popup-content="produce-tmp"
                            data-refresh-func="produceProdPopupFunc">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <path id="produce"  d="M67.6,38.7l-2.3,4.2h4.8l2.3-4.2H67.6z M55.3,38.7L53,42.9h4.8l2.3-4.2H55.3z M43.1,38.7
                                l-2.3,4.2h4.8l2.3-4.2H43.1z M30.8,38.7l-2.3,4.2h4.8l2.3-4.2H30.8z M26.8,34.1c-0.1,0-0.2,0-0.3,0c-0.6,0.2-0.9,0.7-0.7,1.3v0
                                c0.1,0.6,0.7,0.9,1.3,0.7c0.6-0.2,0.9-0.7,0.7-1.3v0C27.7,34.4,27.3,34.1,26.8,34.1z M33.1,31.2l-4.6,1.3l3.7,3.8l4.6-1.3L33.1,31.2
                                z M44.9,27.9l-4.6,1.3L44,33l4.6-1.3L44.9,27.9z M56.8,24.6l-4.6,1.3l3.7,3.8l4.6-1.3L56.8,24.6z M68.6,21.4L64,22.7l3.7,3.8
                                l4.6-1.3L68.6,21.4z M71.5,20.3l1.4,5L28.3,37.6v0.8H73v5.2h-0.2v27.9H23.3V43.6H23v-5.2H23v-4c0-0.3,0.1-0.5,0.3-0.7l0,0l0-0.1
                                l0.1,0l0,0c0.2-0.2,0.4-0.2,0.7-0.2h0.2L71.5,20.3z"/>
                        </svg>
                    </button>
                </div>
                <div class="left-side">
                    <button id="deleteClipButton2" class="icon-button"
                            data-role="button"
                            data-enable="false"
                            data-click="prodDeleteClipFunc">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <path id="Garbage"  d="M52.7,44.5v24.3h5.9V44.5H52.7z M37.4,44.5v24.3h5.9V44.5H37.4z M28.8,40.3h38.5v33.3H28.8
                                V40.3z M38.3,22.4h19.4v6.2h12.8v6.6H25.5v-6.6h12.8V22.4z"/>
                        </svg>
                    </button>
                    <button id="replaceClipButton2" class="icon-button"
                            data-role="button"
                            data-enable="false"
                            data-click="prodReplaceClipFunc">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                            <path id="replaceClip"  d="M71.9,40l0,17.1l-4.7,0l0-9.1L42.2,73.1l-3.3-3.3l25-25h-9l0-4.7L71.9,40L71.9,40L71.9,40z
                                 M41,54.9l0-4.7h-9l25-25l-3.3-3.3L28.7,46.9l0-9.1l-4.7,0l0,17.1h0l0,0L41,54.9z"/>
                        </svg>
                    </button>
                    <button id="insertClipBtn2" class="icon-button"
                            data-role="button"
                            data-click="prodInsertClipFunc">
                        <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                             <path id="add"  d="M43,68V53.1H28V42.9h15V28h10v14.9h15v10.3H53V68H43z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="page-content">
            <div class="timeline-btn-panel">
                <button id="insertClipBtn3" class="icon-button lang-replace"
                        data-tooltip="insertClipLabelTooltip"
                        data-role="button"
                        data-click="prodInsertClipFunc">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                         viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                 <path id="add"  d="M43,68V53.1H28V42.9h15V28h10v14.9h15v10.3H53V68H43z"/>
                            </svg>
                </button>
                <button id="replaceClipButton3" class="icon-button lang-replace"
                        data-tooltip="replaceClipButtonTooltip"
                        data-role="button"
                        data-enable="false"
                        data-click="prodReplaceClipFunc">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="replaceClip"  d="M71.9,40l0,17.1l-4.7,0l0-9.1L42.2,73.1l-3.3-3.3l25-25h-9l0-4.7L71.9,40L71.9,40L71.9,40z
                                     M41,54.9l0-4.7h-9l25-25l-3.3-3.3L28.7,46.9l0-9.1l-4.7,0l0,17.1h0l0,0L41,54.9z"/>
                            </svg>
                </button>
                <button id="deleteClipButton3" class="icon-button lang-replace"
                        data-tooltip="deleteClipButtonTooltip"
                        data-role="button"
                        data-enable="false"
                        data-click="prodDeleteClipFunc">
                    <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <path id="Garbage"  d="M52.7,44.5v24.3h5.9V44.5H52.7z M37.4,44.5v24.3h5.9V44.5H37.4z M28.8,40.3h38.5v33.3H28.8
                                    V40.3z M38.3,22.4h19.4v6.2h12.8v6.6H25.5v-6.6h12.8V22.4z"/>
                            </svg>
                </button>
                <button id="fillAllModeBtn" class="icon-button lang-replace"
                        data-tooltip="TimelineFillTooltip"
                        data-role="button"
                        data-enable="false"
                        data-click="fillMotifsMode">
                    <svg class="svg-icon" xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48">
                        <g>
                            <path id="fillMotifs" transform="rotate(0,24,24) translate(34,14.9682603837058) scale(-0.622879,0.622878594227186)"
                                  d="M23.344748,18.243927L20.884888,20.78299 25.944919,25.797149 28.347769,23.382197 28.259992,23.134045z M20.638999,15.55201L18.13299,18.056039 19.46385,19.374835 21.927118,16.833544z M20.636985,13.181037C20.928,13.181037,21.202993,13.294013,21.409994,13.498054L30.008983,22.107006 30.073985,22.263012 32.108986,28.02101 31.796974,28.533034C31.589974,28.825027,31.252969,28.999038,30.894967,28.999038L30.638987,28.969008 24.880967,27.536024 24.735979,27.415052 15.785001,18.54603 15.756986,18.055002C15.757993,17.761056,15.87399,17.484017,16.083981,17.277047L20.152977,13.210028z M2,2L2,22 4,22 4,4 24,4 24,2z M0,0L26,0 26,4 31,4 31,17 29,17 29,5.9999995 6,5.9999995 6,27 21,27 21,29 4,29 4,24 0,24z"/>
                        </g>
                    </svg>
                </button>
            </div>
            <!--<button id="timeline-insert-button" class="timeline-add-clip" data-role="button" data-click="prodInsertClipFunc">+</button>-->

            <div class="timeline-wrapper clearfix">
                <div id="currAbdikativ" class="dikativ-item pull-right" data-bind="visible: isVisible">
                    <div class="list-item clip-item">
                        <div class="item-wr">
                            <p class="item-name" data-bind="text: clipObj.name"></p>
                            <div class="clip-img">
                                <img src="" data-bind="attr: { src: imgSrc }">
                            </div>
                            <div class="item-info">
                                <div class="fll">
                                    <p class="item-dur">
                                        <a href="" class="html5lightbox-link" data-width="640" data-height="360" title=""
                                           data-bind="attr: { href: videoSrc, title: clipObj.name }">
                                            <span class="video-popup-btn"></span>
                                        </a>
                                        <span data-bind="text: clipObj.durTime"></span>
                                    </p>
                                </div>
                                <div class="val-wr">
                                    <p class="item-motifs"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="currIndikativ" class="dikativ-item pull-left" data-bind="visible: isVisible">
                    <div class="list-item clip-item">
                        <div class="item-wr">
                            <p class="item-name" data-bind="text: clipObj.name"></p>
                            <div class="clip-img">
                                <img src="" data-bind="attr: { src: imgSrc }">
                            </div>
                            <div class="item-info">
                                <div class="fll">
                                    <p class="item-dur">
                                        <a href="" class="html5lightbox-link" data-width="640" data-height="360" title=""
                                           data-bind="attr: { href: videoSrc, title: clipObj.name }">
                                            <span class="video-popup-btn"></span>
                                        </a>
                                        <span data-bind="text: clipObj.durTime"></span>
                                    </p>
                                </div>
                                <div class="val-wr">
                                    <p class="item-motifs"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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

                <div class="timeline-helper lang-replace" data-lang="fillMotifs"></div>

            </div>

            <div id="current-film-motifs" class="clip-motifs-list items-list clearfix"
                 data-role="listview"
                 data-source="currentProdMotifsDataSource"
                 data-selectable="true"
                 data-template="motifProdTemplate"
                 data-change="currProdMotifsListViewChangeFunc">
            </div>

            <div id="current-motif-types" style="display: none;" class="clip-motifs-list items-list clearfix"
                 data-role="listview"
                 data-source="currentMotifTypesDataSource"
                 data-selectable="true"
                 data-template="motifProdTemplate"
                 data-change="currMotifTypesListViewChangeFunc">
            </div>

        </div>
    </div>
</script>


<script id="clipProdTemplate" type="text/x-kendo-template">
    <div class="list-item clip-item"
         data-id="#:clipId#">
        <div class="item-wr">
            <div class="active-icon">
                <div class="checked-svg-icon"></div>
            </div>
            <p class="item-name">#:name#</p>
            <div class="clip-img">
                <img src="/data/products/#:idString#/#:idString#_mdpi.jpg">
            </div>
            <div class="item-info">
                <div class="fll">
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

<!--should be no spacing between image grid elements-->
<script id="motifProdTemplate" type="text/x-kendo-template">
    <div class="motif-select-item" data-id="#:motifId#" title="#:typeName#">
        #if( motifId == '0' ){#
            <div class="empty-img-name">#:numName#</div>
            <div class="motif-type-name">#:typeName#</div>
            <img class="motif-img" src="" width="#:aspect#" height="170" alt=""/>
        #}else{#
            <img class="motif-img" src="/data/accounts/#:accountId#/motifs/#:motifId#_thumb.jpg" width="#:aspect#" height="170" alt=""/>
        #}#
    </div>
</script>