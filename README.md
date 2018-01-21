# hubot-scheduler
Extension of hubot to execute scheduled task.

suppuorted
* [node-schedule](https://www.npmjs.com/package/node-schedule)
* [date-holidays](https://www.npmjs.com/package/date-holidays)

thanks!

## Install 
```
npm i -S @mizuki_r/hubot-scheduler
```

```
yarn add @mizuki_r/hubot-scheduler
```

## Example

in your hubot's script file.

```coffee
module.exports = (robot) ->
  # setup
  require('hubot-scheduler')(robot)

  robot.schedule
    .register({
        time: { hour: 7, minute: 30, dayOfWeek: {min: 1, max: 5} },
        holiday: false,
        envelope: { room: '#some-room' },
        data: {
            message: 'Good morning! Today is work!'
        }
    })
    .onTime((envelope, data) =>
        robot.send(envelope, data.message)
    )
```

## LICENSE

MIT