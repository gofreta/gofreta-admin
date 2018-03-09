<template>
    <div>
        <div class="upload-container" :id="'dropzone_' + formKey" ref="uploadContainer">
            <div class="content upload-loader" :class="{'hidden': !uploading}">
                <span class="icon loader-icon" :class="{'active': !uploading}">
                    <i class="di di-loading"></i>
                </span>

                <p>Uploading...</p>
            </div>

            <div class="content" :class="{'hidden': uploading}">
                <span class="icon"><i class="di di-cloud-upload"></i></span>

                <p>Click or drop file(s) to upload</p>
                <p><small>jpeg, png, gif, pdf, doc, xls, zip...</small></p>
            </div>
        </div>
    </div>
</template>

<script src="./upload-form.component.js"></script>
