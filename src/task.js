const { EventEmitter } = require('events')

module.exports = class Task extends EventEmitter {
  constructor (schedule) {
    super()

    this.time     = schedule.time
    this.holiday  = schedule.holiday
    this.data     = schedule.data
    this.envelope = schedule.envelope

    // for customize
    Object.keys(schedule).forEach((key) => {
      if (this[key] != null) return
      this[key] = schedule[key]
    })
  }
  isHolidayWork () {
    return !!this.holiday
  }
  onTime (listener) {
    this.on('time', listener)
  }
}
