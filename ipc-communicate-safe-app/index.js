document.getElementById("send-message-hello").addEventListener("click", async () => {
    const result = await window.api.send_await("hello");
    console.log(result);
    document.getElementById("hello-result").textContent = result;
})
document.getElementById("send-message-sum").addEventListener("click", () => {
    let data0 = parseFloat(document.getElementById("sum-data0").value);
    let data1 = parseFloat(document.getElementById("sum-data1").value);
    window.api.send('send-message-sum', data0, data1);
})

window.api.on("sum_result", (sum_result)=> {
    console.log("sum result:", sum_result);
    document.getElementById("sum-result").textContent = sum_result;
})