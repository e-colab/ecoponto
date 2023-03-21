<template>
 <div class="checkbox-container">
        <label v-for="item in list" :key="item.value" :for="item.id" class="checkbox-item" :class="{selected: selectedItems.find(el => el === item.value), disabled: getShouldDisableCheckbox}">
            <input type="checkbox" v-model="selectedItems" :id="item.id" :value="item.value" class="checkbox-input" @change="filterItem" :disabled="getShouldDisableCheckbox"/>
            {{ item.value }}
        </label>
    </div>   
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "common-checkbox",
    props:{
        list:{
            type: Array
        },
    },
    data(){
        return{
            selectedItems: []
        }
    },
    computed: {
    ...mapGetters([
      'getShouldDisableCheckbox'
    ]),
  }, 
    methods:{
        filterItem(){
            this.$emit('filtered', this.selectedItems)
        }
    }

}
</script>


<style lang="scss" scoped>
.checkbox{

    &-container{
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }
    
    &-item{
        border: 1px solid #064801;
        padding: 3px 8px;
        border-radius: 30px;
        text-align: center;
        margin-right: 5px;
        margin-bottom: 7px;
        color: #595959;

            &:hover{
                cursor: pointer;
                transition: 0.5s;
                opacity: 70%;
            }
    }

    &-input{
        visibility: hidden;
        position: absolute;
        right: 0;
    }
}

.selected{
    background-color:#064801;
    color: white;
}

.disabled{
    cursor: not-allowed !important;
    background-color: #E5E4E2;
    border-color: #E5E4E2;
    color: #818589;
}
</style>