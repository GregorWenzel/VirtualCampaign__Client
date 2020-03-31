<script id="adm-audio-edit" type="text/x-kendo-template">
    <div id="audio-edit-page">
        <div class="top-panel">
            <h1 data-bind="text: name"></h1>
            <a href="#/adm-audio" class="k-button icon-button">
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
                        <button id="play-audio-edit-button" class="icon-button"
                                data-role="button"
                                data-enable="true"
                                data-click="playAudio">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <g id="playaudio">
                                    <g transform="translate(2634,70)" display="inline">
                                        <g transform="translate(14.4749450683594,11)">
                                            <path id="Semiquaver" d="M-2600.9-55.2h2.4c0,0,3.5,3.5,9.1,8.8s7.3,13.5,0.9,20.6c-2.9,3.2,1.2-4.4,1.2-6.8
                                                c0-2.4-4.7-13-10.3-13c0,0,0,20.6,0,24.2c0,3.5-3.5,7.4-9.1,7.4c-5.6,0-9.1-4.1-7.4-10c1.3-4.3,10-5.6,13.3-1.5L-2600.9-55.2z"
                                                />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span class="text-wr">
                                <span class="play lang-replace" data-lang="Play">Play</span>
                                <span class="stop lang-replace" data-lang="Stop">Stop</span>
                            </span>
                        </button>
                        <div class="sep"></div>
                        <button id="select-audio-edit-button" class="icon-button"
                                data-role="button"
                                data-click="selectAudioFile">
                            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                                <polygon id="new"  points="48,31.7 56.4,22 57.6,34.8 70.1,31.9 63.5,43 75.3,48 63.5,53 70.1,64.1 57.6,61.2
                                    56.4,74 48,64.3 39.6,74 38.4,61.2 25.9,64.1 32.5,53 20.7,48 32.5,43 25.9,31.9 38.4,34.8 39.6,22 "/>
                            </svg>
                            <span class="lang-replace" data-lang="SelectFile">Select file</span>
                        </button>
                        <button id="save-audio-edit-button" class="icon-button"
                                data-role="button"
                                data-enable="false"
                                data-click="saveAudio">
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
            <div class="hide-block">
                <audio id="playCurAudio" src="" class="" controls></audio>
            </div>
            <form id="audio-edit-form" class="item-edit-form" action="" onkeypress="return event.keyCode != 13;">
                <div class="line">
                    <label class="lang-replace" data-lang="SelectedFile" for="">Selected File:</label>
                </div>
                <div class="line">
                    <label for=""><span class="lang-replace" data-lang="DROPDOWN_NAME">Name</span>:</label>
                    <input class="k-input" type="text" data-bind="value: name" value=""/>
                </div>
                <div class="line hide-block">
                    <input id="audio-input-file" type="file" accept="audio/*"/>
                </div>
                <div id="audio-upload-progressbar" data-role="progressbar"
                     data-min="0"
                     data-max="100"
                     data-show-status="false"></div>
            </form>
        </div>
    </div>
</script>