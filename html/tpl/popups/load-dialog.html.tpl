<script id="load-dialog-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_IMPORT">You are about to import</span>
        <span id="curr-film-name">'prodName'</span>.
        <span class="lang-replace" data-lang="WARNING_IMPORT2">The Current production will be overwritten. <br> Do you want to do this?</span>
    </p>
    <div class="dialog-btn-line">
        <button id="acceptLoadProduction" class="k-button" data-role="button" data-click="loadProdFunc">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>