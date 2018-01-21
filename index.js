const Scheduler = require('./src')

module.exports = function (robot) {
  return robot.scheduler = new Scheduler()
}
