'use strict'

export default class IndexDB {
  constructor({ dbName = 'testDB', tableName = 'testTable', version = 1, callback }) {
    if (typeof window !== 'undefined') {
      this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
      this.dbName = dbName
      this.tableName = tableName
      this.version = version
      this.DB = null
      this.log = []

      const openRequest = this.indexedDB.open(this.dbName, this.version)
      openRequest.onerror = (err) => {
        this._createLog(0, err)
        throw Error(err)
      }

      openRequest.onsuccess = (event) => {
        console.log('open event', event)
        this.DB = event.target.result
        this._createLog(1, 'open indexedDB successful')
        callback(event.target.result)
      }

      openRequest.onupgradeneeded = (event) => {
        console.log('onupgradeneeded', event)
        console.log('openRequest', openRequest)
        console.log('this.BD', this.DB)
        const db = event.target.result

        if (db && !db.objectStoreNames.contains(this.tableName)) {
          const objectStore = db.createObjectStore(this.tableName, {
            keyPath: 'id',
            autoIncrement: true
          })

          this._createIndex(objectStore)
        } else {
          console.log('contans !')
        }
      }

      openRequest.blocked = (e) => {
        console.log('blocked')
      }
    } else {
      console.error('constructor faild')
    }
  }

  insert(data, callback) {
    data = Object.assign({}, data, {
      create_time: new Date().getTime(),
      update_time: null,
      finish_time: null,
      stauts: 0
    })
    const objectStore = this.DB
      .transaction([`${this.tableName}`], 'readwrite')
      .objectStore(`${this.tableName}`)

    const objectStoreRequest = objectStore.add(data)
    objectStoreRequest.onsuccess = (event) => {
      this._createLog(1, `add  success`)
      callback({
        code: 200,
        msg: 'add success'
      })
    }
    objectStoreRequest.onerror = (err) => {
      this._createLog(0, `add  failed`)
      callback({
        code: 100001,
        msg: err
      })
    }
  }

  read(id, callback) {
    const objectStoreRequest = this.DB
      .transaction([`${this.tableName}`], 'readwrite')
      .objectStore(`${this.tableName}`)
      .get(id)

    objectStoreRequest.onsuccess = (event) => {
      this._createLog(1, `read  success`)
      callback({
        code: 200,
        data: event.target.result,
        msg: 'read success'
      })
    }
    objectStoreRequest.onerror = err => {
      this._createLog(0, `add  failed: ${err} `)
      callback({
        code: 100001,
        msg: err
      })
    }
  }

  searchAll(params, callback) {
    console.log('this.DB', this.DB)
    const objectStore = this.DB
      .transaction([`${this.tableName}`], 'readwrite')
      .objectStore(`${this.tableName}`)

    const cursorObject = objectStore.openCursor()
    console.log('---------------')
    cursorObject.onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        // console.log('遍历数据', cursor.value)
        callback(cursor.value)
        cursor.continue()
      } else {
        console.log('cursor', cursor)
      }
    }
  }

  update(data = {}, callback) {
    if (typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'id')) {
      const objectStoreRequest = this.DB
        .transaction([`${this.tableName}`], 'readwrite')
        .objectStore(`${this.tableName}`)
        .put({
          ...data,
          update_time: new Date().getTime()
        })

      objectStoreRequest.onsuccess = (event) => {
        this._createLog(1, `update success (id: ${data.id})`)
        callback({
          code: 200,
          msg: 'update success'
        })
      }

      objectStoreRequest.onerror = (err) => {
        this._createLog(0, `update id(${data.id}) failed, ${err}`)
        callback({
          code: 10002,
          data: err,
          msg: 'update failed'
        })
      }
    } else {
      callback({
        code: 10003,
        message: 'params error'
      })
    }
  }

  delete(id, callback) {
    const deleteRequest = this.DB
      .transaction([`${this.tableName}`], 'readwrite')
      .objectStore(`${this.tableName}`)
      .delete(id)

    deleteRequest.onsuccess = (event) => {
      callback({
        code: 200,
        msg: 'delet success'
      })
    }

    deleteRequest.onerror = (err) => {
      callback({
        code: 10004,
        msg: 'delete failed:' + err
      })
    }
  }

  deleteDatabase() {
    const deleteRequest = this.DB.deleteDatabase(`${this.dbName}`)
    deleteRequest.onsuccess = (event) => {
      console.log('delete database success', event.target.result)
    }
  }

  showLog(lastNum = 0) {
    const length = this.log.length
    if (typeof lastNum !== 'number') {
      return { success: false, msg: '参数错误' }
    }

    if (lastNum <= 0 || lastNum > length) {
      return { success: false, msg: '参数超出范围' }
    }

    return this.log.slice(lastNum)
  }

  _createIndex(objectStore) {
    objectStore.createIndex('idIndex', 'id', {
      unique: true
    })

    objectStore.createIndex('taskIndex', 'task', {
      unique: false
    })
    // 新建索引（索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值））
    objectStore.createIndex('createTimeIndex', 'create_time')
    objectStore.createIndex('updateTimeIndex', 'update_time')
    objectStore.createIndex('finishTimeIndex', 'finish_time')
    objectStore.createIndex('statusIndex', 'status')
  }

  _createLog(type = 1, msg) {
    const logItem = { type: !type ? 'success' : 'error', msg, time: new Date() }
    this.log.push(logItem)
  }
}
