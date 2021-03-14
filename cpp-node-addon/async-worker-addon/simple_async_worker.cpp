#include "simple_async_worker.h"
#include <chrono>
#include <thread>
#include <iostream>

SimpleAsyncWorker::SimpleAsyncWorker(Function& callback, int runTime)
    : AsyncWorker(callback), runTime(runTime) {};

void SimpleAsyncWorker::Execute() {
    std::cout << "Execute!!" << std::endl;
    std::this_thread::sleep_for(std::chrono::seconds(runTime));
    if (runTime == 4) SetError ("Oops! Failed after 'working' 4 seconds.");
};

void SimpleAsyncWorker::OnOK() {
    std::string msg = "SimpleAsyncWorker returning after 'working' " + std::to_string(runTime) + " seconds.";
    Callback().Call({Env().Null(), String::New(Env(), msg)});
};