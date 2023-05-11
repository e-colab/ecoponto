<template>
    <div class="modal-backdrop">
        <div class="modal">
          <div>
            <slot class="content" name="content"></slot>
          </div>

          <div class="buttons">
            <button type="button" class="btn-green" @click="close">Fechar</button>
            <slot name="button"></slot>
          </div> 
        </div>
    </div>
</template>

<script>
export default {
    name: 'VueModal',
    methods:{
        close(){
            this.$emit('close');
        },
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
    border-radius: 2px;
    background-color: #fef4ea;
    box-shadow: 2px 2px 30px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 9999999;
    padding: 20px;
    width: 50%;
    height: auto;
  }
  .btn-green {
    color: #064801;
    background: transparent;
    border: 1px solid #064801;
    border-radius: 10px;
    text-transform: uppercase;
    padding: 5px;
    width: 50%;

    &:hover{
      cursor: pointer;
    }
  }

  .buttons{
    display: flex;
    gap: 7px;
  }

</style>