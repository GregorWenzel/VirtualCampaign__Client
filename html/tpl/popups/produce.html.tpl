<script id="produce-tmp" type="text/x-kendo-template">
    <div class="popup-title-wr">
        <span class="k-button icon-button popup-close close-btn">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </span>
        <h3 class="popup-title lang-replace" data-lang="produceLabel">Produce</h3>
    </div>
    <form id="produce-form" action="" class="produce-form">
        <div class="form-box">
            <h4>
                <span class="lang-replace" data-lang="selectFormatsLabel">
                    Select the desired formats
                </span>:<sup class="text-danger" data-bind="visible: formatsReqFlag">✱</sup>
            </h4>

            <div class="line col4">
                <div class="col">
                    <h6>MP4</h6>
                    <div id="mp4-list" class="no-style-widget"
                         data-role="listview"
                         data-selectable="false"
                         data-bind="source: codecFormatTypes.mp4"
                         data-template="codec-item-tmp">
                    </div>
                </div>
                <div class="col">
                    <h6>WMV</h6>
                    <div id="wmv-list" class="no-style-widget"
                         data-role="listview"
                         data-selectable="false"
                         data-bind="source: codecFormatTypes.wmv"
                         data-template="codec-item-tmp">
                    </div>
                </div>
                <div class="col">
                    <h6>VR 360&deg;</h6>
                    <div id="vr360-list" class="no-style-widget"
                         data-role="listview"
                         data-selectable="false"
                         data-bind="source: codecFormatTypes.vr360"
                         data-template="codec-item-tmp">
                    </div>
                </div>
                <div class="col">
                    <h6>SPECIAL</h6>
                    <div id="special-list" class="no-style-widget"
                         data-role="listview"
                         data-selectable="false"
                         data-bind="source: codecFormatTypes.special"
                         data-template="codec-item-tmp">
                    </div>
                </div>
            </div>

            <h4>
                <span class="lang-replace" data-lang="selectMusicLabel">
                    Choose your music
                </span>:<sup class="text-danger" data-bind="visible: musicReqFlag">✱</sup>
            </h4>

            <div class="line audio-line">
                <select id="prodAudioSelect" name=""
                        data-role="dropdownlist"
                        data-select="onSelectProductionAudio"
                        data-bound="initProductionAudio"
                        data-value-field="audioId"
                        data-text-field="name"
                        data-bind="source:audioSelectArr , value:productionAudio">
                </select>
                <div class="production-audio-wr">
                    <audio id="playCurAudio" src="" class="" controls></audio>
                    <span id="play-audio-button" class="play-btn"
                            data-role="button"
                            data-enable="true"
                            data-click="playAudio">
                            <span class="text-wr">
                                <span class="play lang-replace" data-lang="Play">Play</span>
                                <span class="stop lang-replace" data-lang="Stop">Stop</span>
                            </span>
                    </span>
                </div>
            </div>

            <div class="line">
                <div class="check-wr">
                    <input type="checkbox" class="k-checkbox" id="ch21" disabled>
                    <label for="ch21" class="k-checkbox-label">
                        <span class="lang-replace" data-lang="cb_specialMusic">Into and outro use their own music</span>
                    </label>
                </div>
            </div>

            <h4>
                <span class="lang-replace" data-lang="notification">Notification</span>:
            </h4>
            <div class="line">
                <div class="check-wr email-line">
                    <input type="checkbox" class="k-checkbox" id="ch22">
                    <label for="ch22" class="k-checkbox-label">
                        <span class="lang-replace" data-lang="cb_notifyEmail">Send email message upon completion</span>
                    </label>
                    <div class="input-wr">
                        <input class="k-input email-input" type="email" value="" data-bind="value: userEmailField"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-box">
            <h4>
                <span class="lang-replace" data-lang="prodNameLabel">
                    Notification
                </span>:<sup class="text-danger" data-bind="visible: nameReqFlag">✱</sup>
            </h4>
            <div class="line submit-line">
                <button id="produce-prod-popup-button" class="k-button right" type="submit"
                        data-role="button"
                        data-enable="false">
                    <span class="lang-replace" data-lang="submitButton">Submit</span>
                </button>
                <input id="produceProdName" class="k-input lang-replace" pattern="[A-Za-z0-9][A-Za-z0-9 _-]{1,32}" type="text"
                       data-value-update="keyup change"
                       data-placeholder="productionLabel" placeholder="Name production" value="" data-bind="value: jobNameField"/>
            </div>
        </div>
    </form>
</script>

<script id="codec-item-tmp" type="text/x-kendo-template">
    <div class="check-wr">
        <input type="checkbox" class="k-checkbox"
               id="ch#=data.codec_type_id#" name="ch#=data.codec_type_id#" value="#=data.codec_type_id#"
               data-bind="checked: codecFormatsArr"
        #if ( !enabled ) {# disabled #}#
        #if ( data.codec_type_id == '20' ) {# disabled #}#>
        <label for="ch#=data.codec_type_id#" class="k-checkbox-label">#=data.tplName# </label>
    </div>
</script>