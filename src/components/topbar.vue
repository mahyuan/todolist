<style lang="less">
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 80px;
		color: #000;
		z-index: 9;
		.content {
			position: relative;
			width: 1200px;
			margin: 0 auto;
			line-height: 80px;
			color: #333;
			box-sizing: border-box;
			border-bottom: 1px solid #d8bebe;
			background: rgba(238, 238, 238, 0.858);
			overflow: hidden;
			.nav-item {
				display: inline-block;
				width: 200px;
				height: 100%;
				box-sizing: border-box;
			}
		}
	}
</style>
<template>
	<div class="wrapper">
		<el-row class="content">
			<el-col :span="4">
				<h1>TodoList</h1>
			</el-col>
			<el-col :span="20">
				<ul class="navs-content">
					<li class="nav-item">
						<div class="demo-input-suffix">
							<el-input v-model="input" prefix-icon="el-icon-search" clearable placeholder="请输入内容" class="nav-item icon-secrch">
							</el-input>
						</div>
					</li>
					<li class="nav-item">
						<el-button type="text" @click="showInsertModal=true">新建</el-button>
					</li>
					<li class="nav-item">filter</li>
					<li class="nav-item">theme</li>
				</ul>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		name: 'topbar',
		data: function () {
			return {
				input: '',
			}
		},
		props: [],
		methods: {

		}
	}

</script>
