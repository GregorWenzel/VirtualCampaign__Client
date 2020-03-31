<div class="popup-title-wr">
    <span class="popup-close close-btn k-button"><span class="k-icon k-i-arrowhead-w "></span></span>
    <h3 class="popup-title lang-replace" data-lang="titleUploadLabel">Upload new motif</h3>
</div>
<form id="motif-upload-form" action="" class="motif-upload-form">
    <div class="img-wr">
        <div class="table-wr">
            <div class="table-cell">
                <p class="lang-replace" data-lang="newMotifLabel">Please choose a JPG file<br> in RGB format or<br> a movie clip</p>
                <img src="" alt=""/>
            </div>
        </div>
    </div>
    <div class="line">
        <label for="newMotifName" class="lang-replace" data-lang="motifNameLabel">Motif name:</label>
        <div class="input-wr">
            <input id="newMotifName" class="k-input" type="text"/>
        </div>
        <div class="upload-wr">
            <span class="k-button">
                <input id="upload-input" type="file" accept="image/*">
                <span class="lang-replace" data-lang="browseButton">Browse</span>
            </span>
        </div>
    </div>
    <div class="line">
        <label for="descriptionValue" class="lang-replace" data-lang="descriptionLabel">Description:</label>
        <div class="input-wr">
            <textarea id="descriptionValue" class="k-input"></textarea>
        </div>
    </div>
    <div class="dialog-btn-line">
        <button id="saveMotifBtn" class="k-button" type="button" data-role="button" data-enable="false" data-click="applySaveMotifFunc">
            <span class="lang-replace" data-lang="save">Save</span>
        </button>
    </div>
</form>
