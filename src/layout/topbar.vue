<template>
  <div class="top-bar">
    <div class="content">
      <h1 class="head">TodoList</h1>
      <ul class="navs-content">
        <li class="nav-item">
          <el-input
            v-model="value"
            size="mini"
            prefix-icon="el-icon-search"
            clearable
            placeholder="请输入内容"
          />
        </li>
        <li class="nav-item">
          <el-button type="text" @click="showInsertModal=true">新建</el-button>
        </li>
        <li class="nav-item">filter</li>
        <li class="nav-item">theme</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Topbar',
  props: [],
  data: function() {
    return {
      value: ''
    }
  },
  methods: {

  }
}

</script>
<style lang="less" scoped>
  .top-bar {
    position: relative;
    display: block;
    height: 80px;
    color: #000;
    overflow: hidden;
    box-sizing: border-box;

    .content {
      position: relative;
      display: flex;

      line-height: 80px;
      color: #333;
      padding: 0 30px;
      background: rgba(238, 238, 238, 0.858);

      .head {
        display: inline-block;
        width: 200px;
      }

      .navs-content {
        display: flex;
        .nav-item {
          display: inline-block;
          width: 200px;
          height: 100%;
          box-sizing: border-box;
        }

      }
    }
  }

</style>
