<template>
    <div class="">
      <el-dialog title="提示" :visible.sync="isShow">
        <div>
          <slot name="content"></slot>
        </div>
        <div slot="footer">
          <slot name="btnGroup"></slot>
        </div>
      </el-dialog>
    </div>
</template>
<script>
    export default {
      name:'Dialog',
      props:["isShow"]
    }
</script>
<style>

</style>
