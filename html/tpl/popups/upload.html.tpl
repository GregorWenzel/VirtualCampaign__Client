<script id="upload-tmp" type="text/x-kendo-template">
    <div class="popup-title-wr">
        <span class="k-button icon-button popup-close close-btn">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </span>
        <h3 class="popup-title lang-replace" data-lang="titleUploadLabel">Upload new motif</h3>
    </div>
    <form id="motif-upload-form" action="" class="motif-upload-form">
        <div class="img-wr">
            <div class="table-wr">
                <div class="table-cell">
                    <p class="">
                        <span class="lang-replace default" data-lang="newMotifLabel">
                            Please choose a JPG file<br> in RGB format or<br> a movie clip
                        </span>
                        <span style="display: none;" class="lang-replace error" data-lang="newMotifLabelInvalid">
                            This file is broken. <br>Please, choose another <br>JPG file or a movie clip.
                        </span>
                        <span style="display: none;" class="lang-replace video" data-lang="clipLoadedLabel">
                            NO PREVIEW AVAILABLE
                        </span>
                        <span style="display: none" class="wait-loading">
                            <img style="display: inline-block" src="img/loader_32.gif" width="32" height="32" alt=""/><br>
                            <span class="lang-replace" data-lang="upload_wait">please wait...</span>
                        </span>
                    </p>
                    <img src="" alt=""/>
                    <div id="motif-upload-progressbar" data-role="progressbar"
                         data-min="0"
                         data-max="100"
                         data-show-status="false"
                         data-animation="false"></div>
                </div>
            </div>
        </div>
        <div class="line">
            <label for="newMotifName" class="lang-replace" data-lang="motifNameLabel">Motif name:</label>
            <div class="input-wr">
                <input id="newMotifName" class="k-input" pattern="^[A-Za-z0-9][A-Za-z0-9\s_-]{1,32}$" type="text"/>
            </div>
            <div class="upload-wr">
                <span class="k-button">
                    <input id="upload-input" type="file" accept="image/*,video/*,.pdf">
                    <span class="lang-replace" data-lang="browseButton">Browse</span>
                </span>
            </div>
        </div>
        <div class="line">
            <label for="descriptionValue"><span class="lang-replace" data-lang="descriptionLabel">Description</span>:</label>
            <div class="input-wr">
                <textarea id="descriptionValue" class="k-input"></textarea>
            </div>
        </div>
        <div class="dialog-btn-line">
            <button id="saveMotifBtn" class="k-button" type="submit" data-role="button" data-enable="false">
                <span class="lang-replace" data-lang="save">Save</span>
            </button>
        </div>
    </form>
</script>