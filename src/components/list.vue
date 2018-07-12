<style lang="less" scoped>
	.table-content {
		display: block;
		margin: 0 auto;
		width: 98%;
		margin-left: auto;
		margin-right: 0;
		text-align: center;
		.el-table .warning-row {
			background: oldlace;
		}
		.el-table .success-row {
			background: #f0f9eb;
		}
	}
</style>
<template>
	<div class="table-content">
			<el-table
				:data="list"
				style="width: 100%;"
				border
			>
				<el-table-column
					prop="id"
					label="id"
					width="50"
				></el-table-column>
				<el-table-column
					prop="task"
					label="task"
				></el-table-column>
				<el-table-column label="状态">
					<el-table-column
						prop="createTime"
						label="createTime"
						width="300"
					></el-table-column>
						<el-table-column
						prop="finishedTime"
						label="finishedTime"
						width="150"
					></el-table-column>
					<el-table-column
						prop="isFinished"
						label="isFinished"
						width="100"
					></el-table-column>
					<el-table-column
						prop=""
						label="编辑"
						width="100"
					></el-table-column>
				</el-table-column>
			</el-table>
	</div>
</template>
<script>
	export default {
		name: 'insert',
		data() {
			return {
				// info: [],
				// tableData: [
				// 	{
				// 		id: null,
				// 		task: '',
				// 		create_time: '',
				// 		modify_time: '',
				// 		isFinished: false,
				// 		isFiltered: false
				// 	}
				// ],

			};
		},
		props: ['list'],
		methods: {
			// format: function() {
			// 	if(this.list.length) {
			// 		this.info = this.list.map( (item) => {
			// 			item.createTime = new Date(item.create_time);
			// 			if(item.finish_time && typeof item.finish_time === 'number') {
			// 				ite.finishedTime = new Date(item.finish_time)
			// 			}
			// 			return item
			// 		})
			// 	}
			// }
		},
	}
</script>
