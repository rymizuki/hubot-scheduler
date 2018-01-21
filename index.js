const Scheduler = require('./src/scheduler')

module.exports = function (robot) {
  return robot.scheduler = new Scheduler()
}
