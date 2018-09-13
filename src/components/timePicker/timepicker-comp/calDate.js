/**
 * 根据传入的currDate来获取当前月份的日期列表数组
 * 当前月份的第一天显示在列表的第一行当中（也就是返回数组的前七个当中）
 * @param {*} currDate 
 */
function getDateArrayForDay(currDate) {
    if(!currDate) {
        currDate = new Date()
    }
    let returnArray = []

    let currYear = currDate.getFullYear()   //当前年份 yyyyy
    let currMonth = currDate.getMonth() + 1 //当前月份

    //当前第一天是周几
    let firstMonthDay = new Date(currYear, currMonth - 1, 0)
    let currSevDay = firstMonthDay.getDay()

    //获取上个月的天数
    if(currSevDay != 6) { //说明改月第一天不是周日
        let lastYear = currYear
        if(currMonth == 1) {
            lastYear--
        }
        let lastMonthNum = currMonth == 1 ? 11 : currMonth - 2
        let lastMonthDate = new Date(currYear,lastMonthNum,0)
        let lastMonthLastDay = lastMonthDate.getDate()

        let startDay = lastMonthLastDay - currSevDay

        for(let i = startDay;i <= lastMonthLastDay;i++) {
            returnArray.push({value: `${lastYear}_${lastMonthNum + 1}_${i}`, display: i})
        }
    }

    //获取当前月份的天数
    //new Date()是月份为下个月（第二个参数），天为0（第三个参数），调用getDate()获取的是上个月的天数
    let nextYear = currMonth == 12 ? currYear + 1 : currYear
    let nextMonth = currMonth == 12 ? 0 : currMonth
    let currMonthDays = new Date(nextYear,nextMonth,0).getDate()
    for(let i = 1;i <= currMonthDays;i++) {
        returnArray.push({value: `${currYear}_${currMonth}_${i}`, display: i})
    }

    if(returnArray.length < 42) {
        let count = 1
        if(currMonth == 12) {
            currYear++
        }
        let thisMonth = ++currMonth > 12 ? currMonth - 12 : currMonth
        for(let i = returnArray.length + 1;i <= 42;i++) {
            returnArray.push({value: `${currYear}_${thisMonth}_${count}`, display: count++})
        }
    }

    return returnArray
}

export { getDateArrayForDay }