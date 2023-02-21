<template>
 <div class="checkbox-container">
        <label v-for="item in list" :key="item.value" :for="item.id" class="checkbox-item" :class="{selected: selectedItems.find(el => el === item.value)}">
            <input type="checkbox" v-model="selectedItems" :id="item.id" :value="item.value" class="checkbox-input" @change="filterItem"/>
            {{ item.value }}
        </label>
    </div>   
</template>

<script>
export default {
    name: "common-checkbox",
    props:{
        list:{
            type: Array
        }
    },
    data(){
        return{
            selectedItems: []
        }
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
</style>