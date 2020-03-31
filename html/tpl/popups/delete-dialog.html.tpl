<script id="delete-dialog-tmp" type="text/x-kendo-template">
    <p>
        <span class="lang-replace" data-lang="WARNING_DELETE_PROD_SINGLE">You are about to delete</span>
        <span id="curr-film-name">'prodName'</span>.
        <span class="lang-replace" data-lang="WARNING_DELETE_PROD_SINGLE2">Are you sure?</span>
    </p>
    <div class="dialog-btn-line">
        <button id="delete-film" class="k-button" data-role="button" data-click="applyDeleteFilmFunc">
            <span class="lang-replace" data-lang="yes">Yes</span>
        </button>
        <button class="k-button popup-close" data-role="button">
            <span class="lang-replace" data-lang="no">No</span>
        </button>
    </div>
</script>