<template>
  <div class="layout">
    <Sidebar v-if="!isMobile" class="sidebar-container" />
    <section class="main">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </section>
  </div>

</template>
<script>
import Sidebar from './sidebar'

export default {
  name: 'Layout',
  components: {
    Sidebar
  },
  data() {
    return {
      isMobile: false
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.getDevice)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getDevice)
  },
  mounted() {
    this.isMobile = this.getDevice()
  },
  methods: {
    getDevice() {
      const WIDTH = 990
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    }
  }
}
</script>
<style lang="less" scoped>
@sideBarWidth: 210px;

.layout {
  display: flex;
  justify-content: flex-start;
  overflow-x: hidden !important;

  .sidebar-container {
    width: @sideBarWidth !important;
  }
  .main {
    display: flex;
    flex: 1;
    width: calc(100vw - 200px) !important;
    padding: 20px 15px;
  }
}
</style>
