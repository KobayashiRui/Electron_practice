const { contextBridge, ipcRenderer} = require("electron");
contextBridge.exposeInMainWorld(
    "api", {
        //ipc send only
        send: (channel, ...data) => {
            ipcRenderer.send(channel, ...data);
        },
        //ipc send and await return
        send_await: async (channel, ...data) => {
            const result = ipcRenderer.invoke(channel, ...data);
            return result
        },
        //ipc on and callback func
        on: (channel, func) => {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
);