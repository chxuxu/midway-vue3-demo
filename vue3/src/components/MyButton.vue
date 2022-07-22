<template>
  <button :disabled="disabled">
    <span><slot>按钮</slot></span>
    </button>
</template>
<script lang="ts">
interface IButtonProps{
  disabled?:boolean
}
export default {
  props:{
    disabled:{
      type: Boolean,
      required: false
    }
  },
  setup(props:IButtonProps) {
    
  }
}
</script>
<style lang="less">

</style>