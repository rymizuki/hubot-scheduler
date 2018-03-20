const sinon  = require('sinon')
const assert = require('power-assert')

const Scheduler = require('../src/scheduler')

describe('Scheduler', function () {
  describe('nowIsHoliday', function () {
    let scheduler
    let clock
    beforeEach(function () {
      scheduler = new Scheduler()
      process.env.HUBOT_SCHEDULER_LOCALE = 'JP' // https://www.npmjs.com/package/date-holidays
    })
    describe('now is holiday', function () {
      beforeEach(function () {
        clock = sinon.useFakeTimers(new Date('Wed Mar 21 2018 00:00:00 +0900'))
      })
      it('should be true', function () {
        assert.equal(scheduler.nowIsHoliday(), true)
      })
    })
    describe('now isnt holidasy', function () {
      beforeEach(function () {
        clock = sinon.useFakeTimers(new Date('Tue Mar 20 2018 00:00:00 +0900'))
      })
      it('should be false', function () {
        assert.equal(scheduler.nowIsHoliday(), false)
      })
    })
  })
})
