<style lang="less">
	@import "../assets/common.less";
	#app {
		position: relative;
		width: 1200px;
		margin: 0 auto;
		color: #2c3e50;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	h1,
	h2 {
		font-weight: normal;
		margin: 0;
		padding: 0;
	}

	.msg {
		/* font-size: .26rem; */
		font-size: 20px;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	li {
		display: inline-block;
	}

	a {
		color: #42b983;
	}

	button {
		height: 30px;
		font-size: 25px;
		line-height: 30px;
		outline: none;
		border: none;
	}

	.clearfix::after {
		position: absolute;
		content: '';
		display: block;
		overflow: hidden;
		clear: both;
		zoom: 1;
	}

	@import url("//unpkg.com/element-ui@2.4.2/lib/theme-chalk/index.css");
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.content {
		position: relative;
		display: flex;
		width: 100%;
		margin-top: 100px;
	}

	.main {
		position: relative;
		display: block;
		width: 80%;
	} 
	// .icon-secrch {
	// 	border: 1px solid #eee;
	// }
	.msg {
		margin-left: 2%;
		border-bottom: 1px solid #ccc;
	}

</style>
<template>
	<div id="app">
		<topbar></topbar>
		<div class="content">
			<Sidebar></Sidebar>
			<section class="main">
				<el-row :span="24" class="msg">
					<el-col :span="12">
						<div class="msg">{{ msg }}</div>
					</el-col>
				</el-row>
				<List :list="list"></List>
			</section>
		</div>
		<Insert @addNewTask="addEvt" :showInsertModal="showInsertModal"></Insert>
	</div>
</template>
<script>
	import topbar from 'components/topbar'
	import Sidebar from 'components/sidebar'
	import Insert from 'components/insert';
	import List from 'components/list';

	export default {
		name: 'app',
		data() {
			return {
				input: '',
				msg: 'App start',
				info: [],
				DB: '',
				indexedDB: window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB,
				dbName: 'testDB',
				version: 1,
				tableName: 'table1',
				showInsertModal: false,
				list: []
			};
		},
		components: {
			topbar,
			Sidebar,
			Insert,
			List
		},
		methods: {
			addEvt: function (item) {
				this.showInsertModal = false;
				this.insert(item);
			},
			init: function () {
				if (!this.indexedDB) {
					window.alert("your browser doesn't support IndexedDB");
				} else {
					let DBOpenRequest = this.indexedDB.open(this.dbName, this.version);

					DBOpenRequest.onsuccess = function (evt) {
						this.DB = evt.target.result;
						this.msg = 'open indexedDB successful';
					}.bind(this);

					DBOpenRequest.onerror = function (evt) {
						this.msg = 'open indexedDB failed';
						throw error(evt);
					};

					DBOpenRequest.onupgradeneeded = function (evt) {
						let db = evt.target.result;

						let objectStore = db.createObjectStore(this.dbName, {
							keyPath: 'id',
							autoIncrement: true,
						});

						objectStore.createIndex("id", "id", {
							unique: true
						});
						objectStore.createIndex("task", "task", {
							unique: true
						});
						objectStore.createIndex("create_time", "create_time");
						objectStore.createIndex("modify_time", "modify_time");
						objectStore.createIndex("finish_time", "finish_time");
						objectStore.createIndex("isFinished", "isFinished");
						objectStore.createIndex("isFiltered", "isFiltered");
					}.bind(this);


				}
			},
			insert: function (item) {
				let transaction = this.DB.transaction(this.dbName, "readwrite");
				let objectStore = transaction.objectStore(this.dbName);

				// 判断item类型，是一条记录还是一组
				objectStore.add(item);

			},
			edit: function (id, item) {
				let transaction = this.DB.transaction(this.dbName, "readwrite");
				let objectStore = transaction.objectStore(this.dbName);
				let objectStoreRequest = objectStore.get(id);

				objectStoreRequest.onsucess = function (evt) {
					this.msg = 'get objectStoreRequest successed';
					let record = evt.target.result;

					record.modify_time = new Date().getTime();
					record.isFinished = true;
					objectStore.put(record);
				}.bind(this);

				objectStore.onerror = function (evt) {
					this.msg = 'get objectStoreRequest failed';
				}.bind(this);
			},
			searchAll: function () {
				let transaction = this.DB.transaction([this.dbName], "readwrite");
				let objectStore = transaction.objectStore(this.dbName);

				// let boundKeyRange = this.IDBKeyRange.only(curName); // 表示范围的Range对象
				// if (!all) {
				objectStore.openCursor().onsuccess = function (evt) {
					this.msg = `openCursor event successed!`;
					let cursor = evt.target.result;

					if (cursor) {
						let item = cursor.value
						let index = this.list.findIndex(it => it.id === item.id);

						if (index < 0) {
							item.createTime = this.timeFormate(item.create_time);
							if (item.finish_time && typeof item.finish_time === 'number') {
								item.finishedTime = this.timeFormate(item.finish_time)
							}
							this.list.push(item);
						}

						this.msg = `searching, get item of ${cursor.value}`;
						cursor.continue();
					} else {
						this.msg = `search data finished`;
						console.log('list', this.list);
					}

				}.bind(this);
				// }
			},
			deleterecord: function (id) {
				let transaction = this.DB.transaction(this.dbName, "readwrite");
				let objectStore = transaction.objectStore(this.dbName);
				let removeKey = parseInt(id);

				let getRequest = objectStore.get(removeKey);

				getRequest.onsuccess = function (evt) {
					let record = evt.target.result;
					this.msg = 'get recoded successful';
				}.bind(this);

				let deleteRequest = objectStore.delete(removeKey);

				deleteRequest.onsuccess = function (evt) {
					this.msg = `delete record of \" ${result}}\" successfull!`;
				}.bind(this);

				deleteRequest.onerror = function (evt) {
					this.msg = `delete record of \" ${result}}\" failed!`;
				}.bind(this);

			},
			deleteDatabase: function (dbName) {
				let deleteRequest = this.DB.deleteDatabase(dbName);

				deleteRequest.onsuccess = function (evt) {
					this.msg = `delete databases of \"${dbName}\" successful`
				}.bind(this);
			},
			fontSize: function () {
				let w = document.documentElement.clientWidth;
				if (w > 1200) document.getElementsByTagName('html')[0].style.fontSize = 417 + '%';
				else document.getElementsByTagName('html')[0].style.fontSize = 625 * w / 750 + '%';
				console.log(w);
			},
			timeFormate: function (t) {
				if (typeof t === 'number') {
					let time = new Date(parseInt(t));
					let y, m, d, h, min, s;

					function f(it) {
						return it < 0 ? '0' + it : it;
					}

					y = time.getFullYear();
					m = time.getMonth() + 1;
					d = time.getDate();
					h = time.getHours();
					min = time.getMinutes();
					s = time.getSeconds();

					return `${y}/${m}/${d}/ ${f(h)}:${f(min)}:${f(s)}`;
				}
			}
		},
		beforeMount() {},
		mounted() {
			this.init();
			setTimeout(() => {
				this.searchAll();
			}, 1000);
			// this.insert();
		}
	};

</script>
