<template>
	<div id="app">
		<h3>{{msg}}</h3>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data() {
			return {
				msg: 'App start',
				info: [],
				DB: '',
				indexedDB: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
				dbName: 'testDB',
				version: 1,
				tableName: 'table1',

			}
		},
		methods: {
			init: function() {
				if(!this.indexedDb) {
					window.alert("your browser doesn't support IndexedDB")
				} else {
					let DBOpenRequest = this.indexedDB.open(this.dbName, this.version);
					DBOpenRequest.onsuccess = function(evt) {
						this.DB = evt.target.result;
						this.msg = 'open indexedDB successful'
					}
				}
			}
		},
		mounted() {
			this.$nextTick(function() {
				console.log(this);
				this.init()
			})
		}

	}

</script>

<style scoped>

</style>