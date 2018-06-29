<template>
	<div class="container-inert">
		<label for="task">task</label>
		<input name="task" type="text"/>
	</div>
</template>
<script>
export default {
	name: 'insert',
	data() {
		return {
			info: {
				task: '',
				create_time: new Date().getTime(),
				modify_time: null,
				finish_time: null,
				isFinished: false,
				isFiltered: false
			},


		}
	},
	methods: {
		insert: function() {
			this.$emit(insert, this.info)
		}
	}
}
</script>
<style lang="less" scoped>
.container-inert{
	width: 100%;
	height: 2rem;
	font-size: .25rem;
}
</style>

