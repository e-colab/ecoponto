<template>
    <div class="modal-backdrop">
        <div class="modal">
            <slot class="content">oi</slot>
            <button type="button" class="btn-green" @click="close">Close</button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'VueModal',
    methods:{
        close(){
            this.$emit('close');
        }
    }
}
</script>


<style lang="scss" scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 30px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 9999999;
    padding: 20px;
    width: 25%;
    height: 15%;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

</style>