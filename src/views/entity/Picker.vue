<template>
    <div>
        <popup title="Relation Item Picker" ref="pickerPopup" class="popup-xl">
            <entities-list ref="entitiesList" :cid="cid" :syncQueryPage="false">
                <div slot="actions" slot-scope="props">
                    <button type="button" class="btn btn-sm btn-cons-sm btn-primary" @click.prevent="onItemSelect(props.entity)">
                        <span class="txt">Select</span>
                    </button>
                </div>
            </entities-list>
        </popup>
    </div>
</template>

<script src="./picker.component.js"></script>
