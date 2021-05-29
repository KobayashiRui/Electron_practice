#include <iostream>
#include <thread>
#include <Hoge.h>

Hoge::Hoge(const uint32_t interval)
    :_interval{interval}{}

Hoge::~Hoge() = default;

void Hoge::start_thread(){
    _worker = std::thread([&](){
        while(true){
            std::cout << "inside hogehoge : " << _count << std::endl;
            std::this_thread::sleep_for(std::chrono::seconds(_interval));
            _count++;
        }
    });
}