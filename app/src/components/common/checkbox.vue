<template>
 <div class="checkbox-container">
        <label v-for="reason in reasons" :key="reason.value" :for="reason.id" class="checkbox-item" :class="{selected: selectedReasons.find(el => el === reason.value)}">
            <input type="checkbox" v-model="selectedReasons" :id="reason.id" :value="reason.value" class="checkbox-input" @change="filterItem"/>
            {{ reason.value }}
        </label>
    </div>   
</template>

<script>
export default {
    name: "common-checkbox",
    props:{
        reasons:{
            type: Array
        }
    },
    data(){
        return{
            selectedReasons: []
        }
    },
    methods:{
        filterItem(){
            this.$emit('filtered', this.selectedReasons)
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