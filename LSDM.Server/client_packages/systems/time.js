let gameHour = 0;
let gameMinute = 0;
mp.events.add('client:setTime', (hour, minute) => {
    gameHour = hour;
    gameMinute = minute;
});

function setTime()
{
    mp.game.time.setClockTime(gameHour, gameMinute, 0);
}
setInterval(setTime, 1000);