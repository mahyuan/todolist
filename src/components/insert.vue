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
<template>
	<div class="container-insert">
		<el-button type="text" @click="show = true">新建</el-button>
		<el-dialog title="insert title" :visible.sync="show" width="30%" :before-close="handleClose">
			<span>enen</span>
			<el-form :model="info">
				<el-form-item label="task" :label-width="'100px'">
					<el-input v-model="task" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer">
				<el-button @click="show=false">取消</el-button>
				<el-button @click="confim">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		name: 'insert',
		data() {
			return {
				info: {
					task: '',
					create_time: null,
					modify_time: null,
					finish_time: null,
					isFinished: false,
					isFiltered: false
				},
				show: false,
				task: '',
			}
		},
		props: ["showInsertModal"],
		methods: {
			handleClose: function () {

			},
			confim: function () {
				this.show = false;
				let detail = Object.assign({}, this.info, {
					task: this.task,
					create_time: new Date().getTime(),
				});

				this.$emit('addNewTask', detail);
				this.task = '';
			}
		},
		mounted() {
			if (this.showInsertModal) this.show = true;
		},
		watch: {
			showInsertModal: function (value, oldValue) {
				if (value && !oldValue) this.show = true;
			}
		},
	}
</script>
