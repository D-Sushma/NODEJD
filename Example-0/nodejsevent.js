// import { EventEmitter } from 'events';
const EventEmitternn = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('WaterFull', () => {
  console.log('Please turn off the motor!!');
//   use gentle reminder.....
// setTimeout(()=>{
//     console.log('Please turn off the motor!!');
// }, 3000);
});

// myEmitter.emit('event');