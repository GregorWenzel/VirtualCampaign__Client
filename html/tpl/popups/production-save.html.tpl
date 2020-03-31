<script id="production-save-tmp" type="text/x-kendo-template">
    <div class="popup-title-wr">
        <span class="k-button icon-button popup-close close-btn">
            <svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve">
                <path id="arrow_1_"  d="M39.2,52.9l14.7,14.7H41.6L22,48l19.6-19.6h12.3L39.2,43.1h34.3v9.8H39.2z"/>
            </svg>
        </span>
        <h3 class="popup-title lang-replace" data-lang="saveProdText">Save production</h3>
    </div>
    <form id="production-save-form" action="" class="production-save-form">
        <div class="line">
            <input id="newProdNameInput" class="k-input lang-replace" type="text" value="" pattern="^[A-Za-z0-9][A-Za-z0-9_-]{1,32}$" data-placeholder="productionLabel" placeholder="Name production" required="required"/>
            <button class="k-button right" type="button" data-role="button" data-click="applySaveProdFunc">
                <span class="lang-replace" data-lang="save">Save</span>
            </button>
        </div>
    </form>
</script>