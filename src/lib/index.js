export const timeFormate = (t) => {
  if (typeof t === 'number') {
    const time = new Date(parseInt(t))

    const formate = (it) => {
      return (it + '').padStart(2, '0')
    }

    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    const h = time.getHours()
    const min = time.getMinutes()
    const s = time.getSeconds()

    return `${y}/${m}/${d}/ ${formate(h)}:${formate(min)}:${formate(s)}`
  }
}

export const getDate = t => {
  if (typeof t === 'number') {
    const time = new Date(parseInt(t))

    // const formate = (it) => {
    //   return (it + '').padStart(2, '0')
    // }

    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()

    return `${y}/${m}/${d}`
  }
}
