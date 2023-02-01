// import module second
// 1...................
// const simple = require('./modulesecond')
// simple()

// 2................mjs
// this is not run - show error,,, ise shi se run krn k liye we will use type modue in package.json
// import {simple} from './modulesecond.mjs'
// simple()

// if we don't use {} than use export default
// import simple from './modulesecond.mjs'
import {simple, simple2 as  hero} from './modulesecond.mjs'
simple()
hero()
import * as a2 from './modulesecond.mjs'
console.log(a2.simple());