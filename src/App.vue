<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
		<button @click="insert"></button>
		<button @click="edit"></button>
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
			if(!this.indexedDB) {
				window.alert("your browser doesn't support IndexedDB")
			} else {
				let DBOpenRequest = this.indexedDB.open(this.dbName, this.version);

				DBOpenRequest.onsuccess = function(evt) {
					this.DB = evt.target.result;
					this.msg = 'open indexedDB successful'
				}.bind(this);

				DBOpenRequest.onerror = function(evt) {
					this.msg = 'open indexedDB failed';
					throw error(evt)
				};

				DBOpenRequest.onupgradeneeded = function(evt) {
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
		insert: function(item) {
			let transaction = this.DB.transaction(this.dbName, "readwrite");
			let objectStore = transaction.objectStore(this.dbName);

			// 判断item类型，是一条记录还是一组
			objectStore.add(item);

		},
		edit: function(id, item) {
			let transaction = this.DB.transaction(this.dbName, "readwrite");
			let objectStore = transaction.objectStore(this.dbName);
			let objectStoreRequest = objectStore.get(id);

			objectStoreRequest.onsucess = function(evt) {
				this.msg = 'get objectStoreRequest successed';
				let record = evt.target.result;

				record.modify_time = new Date().getTime();
				record.isFinished = true;
				objectStore.put(record);
			}.bind(this);

			objectStore.onerror = function(evt) {
				this.msg = 'get objectStoreRequest failed';
			}.bind(this);
		},
		search: function() {
			let transaction = this.DB.transaction(this.dbName, "readwrite");
			let objectStore = transaction.objectStore(this.dbName);
			let boundKeyRange = this.IDBKeyRange.only(curName); //  生成一个表示范围的Range对象

			objectStore.openCursor(boundKeyRange).onsuccess = function(evt) {
				this.msg = `openCursor event successed!`;
				let cursor = evt.target.result;

				if(cursor) {
					let index = this.result.findIndex(it => it.id === cursor.value.id);
					//console.log(index)
					if(index < 0) {
						this.result.push(cursor.value);
					}

					this.msg = `searching, get item of ${cursor.value}`;
					cursor.continue()
				} else {
					this.msg = `search data finished`;
				}
			}.bind(this);
		},
		deleterecord: function(id) {
			let transaction = this.DB.transaction(this.dbName, "readwrite");
			let objectStore = transaction.objectStore(this.dbName);
			let removeKey = parseInt(id);

			let getRequest = objectStore.get(removeKey);

			getRequest.onsuccess = function(evt) {
				let record = evt.target.result;
				this.msg = 'get recoded successful'
			}.bind(this);

			let deleteRequest = objectStore.delete(removeKey);

			deleteRequest.onsuccess = function(evt) {
				this.msg = `delete record of \" ${result}}\" successfull!`;
			}.bind(this);

			deleteRequest.onerror = function(evt) {
				this.msg = `delete record of \" ${result}}\" failed!`;
			}.bind(this);

		},
		deleteDatabase: function(dbName) {
			let deleteRequest = this.DB.deleteDatabase(dbName);

			deleteRequest.onsuccess = function(evt) {
				this.msg = `delete databases of \"${dbName}\" successful`
			}.bind(this);
		}



	},
	mounted() {
		this.$nextTick(() => {
			//console.log(this);
			this.init();
		})
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
