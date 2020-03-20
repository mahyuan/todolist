<template>
  <el-dialog
    title="insert title"
    :visible.sync="show"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="info">
      <el-form-item label="task" :label-width="'100px'">
        <el-input v-model="task" auto-complete="off" />
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="show=false">取消</el-button>
      <el-button @click="confim">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'Insert',
  props: {
    'show': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      info: {
        task: '',
        create_time: null,
        update_time: null,
        finish_time: null,
        status: 0,
        isFiltered: false
      },
      showInsertModal: false,
      task: ''
    }
  },
  watch: {
    show(value, oldValue) {
      this.showInsertModal = this.show
    }
  },
  mounted() {
    this.showInsertModal = this.show
  },
  methods: {
    handleClose() {

    },
    confim() {
      this.show = false
      const detail = Object.assign({}, this.info, {
        task: this.task,
        create_time: new Date().getTime()
      })

      this.$emit('addNewTask', detail)
      this.task = ''
    }
  }
}
</script>
<style lang="less">
  .container-insert {
    width: 100%;
    height: 2rem;
    font-size: .25rem;
    .dialog-footer {
      color: #333;
    }

  }

</style>
