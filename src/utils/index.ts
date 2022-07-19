

export function parseTime(time: Date | string | number, pattern?: string) {
  if (arguments.length === 0 || !time) return null

  const format = pattern || 'yyyy-MM-DD HH:mm:ss'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string' && !(/\dT\d/.test(time))) {
      time = time.replace(new RegExp(/-/gm), '/')
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }

  const formatObj: any = {
    yyyy: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
    a: date.getDay()
  }

  const time_str = format.replace(/(yyyy|MM|DD|HH|mm|ss|a)+/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })

  return time_str
}

export function formatYoutubeUrl(url: string): string {
  if(!url) return ''
  const urlArr = url.split(/\/{1}/)
  const param = urlArr[urlArr.length - 1]
  return param ? ('https://www.youtube.com/embed/' + param) : url
}