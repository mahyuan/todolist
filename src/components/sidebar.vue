<style lang="less" scoped>
	.sidebar {
		display: block;
		width: 20%;
		height: auto;
		background: #353f55;
		color: #eee;
		.side-subheder {
			display: inline-block;
			text-align: left;
		}
	}
</style>
<template>
	<section class="sidebar">
			<h3 class="side-subheder">筛选</h3>
			<ul class="side-filtercontent">
				<li class="filterbar"><i class="iconfont">&#xe60f;</i>全部</li>
				<li class="filterbar"><i class="iconfont">&#xe604;</i>未完成</li>
				<li class="filterbar"><i class="iconfont">&#xe66e;</i>已完成</li>
			</ul>
		</section>
</template>
<script>
	export default {
		name: 'sidebar',
		data: function() {
			return {

			}
		},
		methods: {

		}
	}
</script>
