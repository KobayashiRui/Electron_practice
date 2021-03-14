#include "simple_async_worker.h"
#include <chrono>
#include <thread>
#include <iostream>

void inside_worker1(int runTime){
    while(true){
        std::cout << "inside worker1  execute : " << runTime << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(runTime));
    }
};

void inside_worker2(int runTime){
    while(true){
        std::cout << "inside worker2 execute : " << runTime << std::endl;
        std::this_thread::sleep_for(std::chrono::seconds(runTime));
    }
};

SimpleAsyncWorker::SimpleAsyncWorker(Function& callback, int runTime)
    : AsyncWorker(callback), runTime(runTime) {};

void SimpleAsyncWorker::Execute() {
    //if (runTime == 4) SetError ("Oops! Failed after 'working' 4 seconds.");
    std::thread th(inside_worker1, runTime);
    std::thread th2(inside_worker2, runTime+2);

    th.join();
    th2.join();
};

void SimpleAsyncWorker::OnOK() {
    std::string msg = "SimpleAsyncWorker returning after 'working' " + std::to_string(runTime) + " seconds.";
    Callback().Call({Env().Null(), String::New(Env(), msg)});
};