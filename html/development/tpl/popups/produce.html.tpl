<div class="popup-title-wr">
    <span class="popup-close close-btn k-button"><span class="k-icon k-i-arrowhead-w "></span></span>
    <h3 class="popup-title lang-replace" data-lang="produceLabel">Produce</h3>
</div>
<form id="produce-form" action="" class="produce-form">
    <div class="form-box">
        <h4 class="lang-replace" data-lang="formatsLabel">Formats</h4>
        <div class="line col2">
            <div class="col">
                <div class="check-wr">
                    <input type="checkbox" class="k-checkbox" id="ch11" name="codecChk" value="MP4:720P" data-bind="checked: codecFormatsArr">
                    <label for="ch11" class="k-checkbox-label">HD (mp4)</label>
                </div>
                <div class="check-wr">
                    <input type="checkbox" class="k-checkbox" id="ch12" name="codecChk" value="MP4:640P" data-bind="checked: codecFormatsArr">
                    <label for="ch12" class="k-checkbox-label">SD (mp4)</label>
                </div>
                <div class="check-wr">
                    <input type="checkbox" class="k-checkbox" id="ch13" name="codecChk" value="MP4:EMAIL" data-bind="checked: codecFormatsArr">
                    <label for="ch13" class="k-checkbox-label">EMAIL (mp4)</label>
                </div>
            </div>
            <div class="col">
                <div class="check-wr">
                    <input type="checkbox" class="k-checkbox" id="ch14" name="codecChk" value="WMV:720P" data-bind="checked: codecFormatsArr">
                    <label for="ch14" class="k-checkbox-label">HD (wmv)</label>
                </div>
                <div class="check-wr">
                    <input type="checkbox" class="k-checkbox" id="ch15" name="codecChk" value="WMV:640P" data-bind="checked: codecFormatsArr">
                    <label for="ch15" class="k-checkbox-label">SD (wmv)</label>
                </div>
                <div class="check-wr">
                    <input type="checkbox" class="k-checkbox" id="ch16" name="codecChk" value="WMV:EMAIL" data-bind="checked: codecFormatsArr">
                    <label for="ch16" class="k-checkbox-label">EMAIL (wmv)</label>
                </div>
            </div>
        </div>
        <div class="line">
            <div class="check-wr">
                <input type="checkbox" class="k-checkbox" id="ch21" disabled>
                <label for="ch21" class="k-checkbox-label">
                    <span class="lang-replace" data-lang="cb_specialMusic">Into and outro use their own music</span>
                </label>
            </div>
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
        <h4 class="lang-replace" data-lang="prodNameLabel">Production name</h4>
        <div class="line submit-line">
            <button class="k-button right" type="button" data-role="button" data-click="applyProduceProdFunc">
                <span class="lang-replace" data-lang="submitButton">Submit</span>
            </button>
            <input id="produceProdName" class="k-input lang-replace" type="text" data-placeholder="productionLabel" placeholder="Name production" value="" data-bind="value: jobNameField"/>
        </div>
    </div>
</form>
