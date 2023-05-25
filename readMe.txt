//** Moment examples here..

let startDate = moment().startOf('week');
let endDate = moment().endOf('week');
// console.log('startDate', startDate.format('DD/MM/YYYY'));
// console.log('endDate', endDate.format('DD/MM/YYYY'))
// var today = moment(new Date());
// var sunday = today.day("saturday");
// console.log('sunday',sunday.format("YYYY-MM-DD"));
var today = moment();
console.log('today', today.format('DD/MM/YYYY'))
// var nextSunday = today.clone().endOf('week');
var comingSunday = today.weekday(7);
console.log('comingSunday', comingSunday.format('DD/MM/YYYY'))