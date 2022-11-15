const scheduler = require('node-schedule')
const { RecurrenceRule, Range } = scheduler
const { isPlainObject } = require('lodash')
const Holidays = require('date-holidays')

const Task = require('./task')

module.exports = class Scheduler {
  constructor () {
    this.tasks = []
  }
  register (schedule) {
    const task = this.createTask(schedule)
    const rule = this.createRule(schedule)

    scheduler.scheduleJob(rule, () => {
      if (this.nowIsHoliday() && !task.isHolidayWork()) return
      task.emit('time', task.envelope, task.data, rule)
    })

    return task
  }
  createTask (schedule) {
    return new Task(schedule)
  }
  createRule ({ time }) {
    // return for node-schedule
    // ex, cron format
    if (!isPlainObject(time)) {
      return time
    }

    const rule = new RecurrenceRule()
    Object.keys(time).forEach((key) => {
      // ignore unsupported keys by node-schedule
      // https://github.com/node-schedule/node-schedule#recurrencerule-properties
      if (!/^second|minute|hour|date|month|year|dayOfWeek$/.test(key)) return

      const value = time[key]
      if (isPlainObject(value) && (value.min && value.max)) {
        rule[key] = new Range(value.min, value.max)
      } else {
        rule[key] = value
      }
    })

    return rule
  }
  nowIsHoliday () {
    const holidays = new Holidays(process.env.HUBOT_SCHEDULER_LOCALE).isHoliday(new Date())
    if (!holidays) {
      return false
    }

    // public, bank, school, optional or observance
    const ignores = !!process.env.HUBOT_SCHEDULER_IGNORE_HOLIDAY_TYPES ? process.env.HUBOT_SCHEDULER_IGNORE_HOLIDAY_TYPES.split(',') : []
    return holidays.every(holiday => !ignores.includes(holiday.type))
  }
}
