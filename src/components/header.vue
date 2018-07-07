<style scoped>
	.headerWrapper {
		position: fixed;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		overflow: hidden;
		z-index: 9;
	}
	.headerContent {
		position: relative;
		margin: 0 auto;
		position: relative;
		width: 1200px;
		height: 80px;
		margin: 0 auto;
		overflow: hidden;
		line-height: 80px;
		border-bottom: 1px solid #d8bebe;
		color: #333;
		background: rgba(232, 232, 232, 0.961);
		box-sizing: border-box;
	}
	.nav-item {
		display: inline-block;
		width: 200px;
		height: 100%;
		/* border-right: 1px dotted blue; */
		/* border-left: 1px solid red; */
		box-sizing: border-box;
	}
</style>
<template>
		<div class="headerWrapper">
			<el-row class="headerContent">
					<el-col :span="4">
						<h1>TodoList</h1>
					</el-col>
					<el-col :span="20">
						<ul class="navs-content">
							<li class="nav-item">
								<div class="demo-input-suffix">
									<el-input
										v-model="input"
										prefix-icon="el-icon-search"
										clearable
										placeholder="请输入内容"
										class="nav-item icon-secrch">
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
		name: 'header',
		data: function() {
			return {
				input: ''
			}
		},
		methods: {

		}
	}
</script>
