const {workerData} = require('worker_threads')

async function sleep(t) {
  return await new Promise(r => {
    setTimeout(() => {
      r();
    }, t);
  });
}


async function main() {
  while (true) {
    console.log("sleep... : ", workerData.worker_name);
    await sleep(workerData.worker_sleeptime);
  }
}
main();