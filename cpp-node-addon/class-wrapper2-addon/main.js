const addon = require('./build/Release/addon');

var addon_obj = new addon.ObjectWrapDemo("Hogehoge", 5);


addon_obj.greet("Fuga")

console.log("start thread")
addon_obj.start_thread()