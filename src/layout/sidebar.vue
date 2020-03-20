<template>
  <section class="sidebar">
    <ul v-if="!hide" class="side-content">
      <li class="filterbar"><i class="iconfont">&#xe60f;</i>全部</li>
      <li class="filterbar"><i class="iconfont">&#xe604;</i>未完成</li>
      <li class="filterbar"><i class="iconfont">&#xe66e;</i>已完成</li>
    </ul>
    <div class="side-content">
      <div class="text-content">
        TodoList
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Sidebar',
  data: function() {
    return {
      hide: true
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
  .sidebar {
    display: block;
    width: 100%;
    height: 100vh;
    background: #353f55;
    color: #eee;
    padding: 0 10px;
    box-sizing: border-box;
    padding: 40px 40px;

    .side-subheder {
      display: inline-block;
    }

    .side-content {
      text-align: left;
      .filterbar {
        display: inline-block;
        width: 150px;
        height: 35px;
        line-height: 35px;

        i {
          margin-right: 8px;
        }
      }
      .text-content  {
        font-size: 25px;
        line-height: 30px;
        color: #f5e327;
        // &::first-letter{
        //   font-size: 50px;
        //   color: #f5e327;
        //   font-family: 微软雅黑;
        //   line-height: 58px;
        //   float: left;
        // }
      }
    }
  }

</style>
