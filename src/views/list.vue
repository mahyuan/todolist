<template>
  <div class="content">
    <div class="form">
      <el-form ref="form" inline :model="params">
        <!-- <el-form-item label="Task" prop="task">
          <el-input v-model="params.task" clearable />
        </el-form-item>
        <el-form-item label="截止时间" prop="deadline">
          <el-date-picker
            v-model="params.deadline"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          />
        </el-form-item> -->
        <!-- <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >搜索</el-button> -->
        <!-- <el-button
            plain
            icon="el-icon-refresh"
            @click="hanlleReset"
          >重置</el-button> -->
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="handleCreate"
        >新增</el-button>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table
        style="width: 100%;"
        :data="list"
        border
      >
        <el-table-column
          prop="id"
          label="id"
          width="50"
          fixed
          align="center"
        />
        <el-table-column
          prop="task"
          label="task"
          width="200"
          align="center"
        />
        <el-table-column
          prop="desc"
          label="desc"
          align="center"
        />
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
          width="120"
        >
          <template slot-scope="props">
            <span>{{ props.row.create_time | formate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="更新时间"
          align="center"
          width="120"
        >
          <template slot-scope="props">
            <span>{{ props.row.update_time | formate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="finish_time"
          label="完成时间"
          align="center"
          width="120"
        >
          <template slot-scope="props">
            <span>{{ props.row.finish_time | formate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="已完成"
          width="100"
        >
          <template slot-scope="props">
            <el-switch
              :value="props.row.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleSwitch(props.row)"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100" fixed="right">
          <template slot-scope="props">
            <el-button size="mini" type="text" @click="handleUpdate(props.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :visible.sync="modelShow"
      width="600px"
      :before-close="handleClose"
    >
      <el-form ref="model" label-width="120" :model="form" class="dialog-form">
        <el-form-item label="task" prop="task">
          <el-input v-model="form.task" clearable />
        </el-form-item>
        <el-form-item label="desc" prop="desc">
          <el-input v-model="form.desc" type="textarea" clearable />
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleItemUpload">确定</el-button>
        <el-button plain @click="modelShow=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import IndexDB from '@/lib/indexDB'
import {
  // timeFormate,
  getDate
} from '@/lib/index'

export default {
  name: 'List',
  components: {

  },
  filters: {
    formate: (prop) => {
      // return prop && typeof prop === 'number' ? timeFormate(prop) : ''
      return prop && typeof prop === 'number' ? getDate(prop) : ''
    }
  },
  data() {
    return {
      params: {
        task: '',
        deadline: ''
      },
      modelShow: false,
      db: null,
      list: [],
      form: {
        task: '',
        desc: ''
      }
    }
  },
  beforeMount() {
    this.db = new IndexDB({
      dbName: 'resumeDb',
      tableName: 'resultTable',
      version: 1,
      callback: (db) => {
        this.handleSearch()
      }
    })
  },
  methods: {
    handleSearch() {
      const parasm = this.params
      this.list = []
      this.loading = true

      this.db.searchAll(parasm, result => {
        console.log('handleSearch', result)
        this.list.push(result)
      })
    },

    handleUpdate(row) {
      this.form = {
        ...row
      }
      this.modelShow = true
    },
    handleItemUpload() {
      const params = {
        ...this.form
      }
      if (Object.prototype.hasOwnProperty.call(params, 'id') && params.id) {
        params.update_time = new Date().getTime()
        this.db.update(params, res => {
          console.log('update res', res)
          this.handleSearch()
        })
      } else {
        this.db.insert(params, res => {
          console.log('insert res', res)
          this.handleSearch()
        })
      }

      this.handleClose()
    },
    handleDelete(row) {
      this.db.delete(row.id, result => {
        console.log('delete handle', result)
        if (result.code === 200) {
          const index = this.list.indexOf(row)
          console.log('index', index)
          this.list.splice(index, 1)
        }
      })
    },
    handleSwitch(row) {
      const params = {
        ...row,
        // update_time: new Date().getTime(),
        finish_time: new Date().getTime(),
        status: row.status === 0 ? 1 : 0
      }
      this.db.update(params, res => {
        console.log('switch res', res)
        if (res.code === 200) {
          this.$set(row, 'status', params.status)
          this.$set(row, 'update_time', params.update_time)
          this.$set(row, 'finish_time', params.finish_time)
        }
      })
    },
    hanlleReset() {
      this.$refs.form.resetFields()
    },
    handleClose() {
      this.modelShow = false
      this.form = {}
      this.$refs.model.resetFields()
    },
    handleCreate() {
      this.modelShow = true
    }
  }
}

</script>
<style lang="less" scoped>
  .el-input,
  .el-select {
    width: 200px;
  }

  .dialog-form {
    .el-input,
    .el-textarea,
    .el-select {
      width: 400px;
    }
  }

  .content {
    display: flex;
    width: 100%;
    padding: 0 20px;
    flex-direction: column;
  }

  .form {
    display: flex;
  }

  .table-wrap {
    display: block;
    width: 100%;

    .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
    text-align: right;
  }

</style>
