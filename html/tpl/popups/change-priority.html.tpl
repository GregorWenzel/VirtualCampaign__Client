<script id="change-priority-tmp" type="text/x-kendo-template">
    <div id="change-priority-popup">
        <div class="centered-text">
            <p class="lang-replace" data-lang="ChangeProdPriority">Change Production Priority</p>
            <span class="lang-replace" data-lang="NewPriority">New Priority</span>:
            <input data-role="numerictextbox"
                   data-min="0"
                   data-max="100"
                   data-format="n0"
                   data-bind="value: priority">
        </div>

        <div class="btn-line">
            <span class="popup-close k-button"><span class="lang-replace" data-lang="cancelButton">Cancel</span></span>
            <button class="k-button" type="button"
                    data-role="button"
                    data-click="updatePriorityAccept">Ok</button>
        </div>
    </div>
</script>