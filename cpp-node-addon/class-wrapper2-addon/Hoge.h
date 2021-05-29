#pragma once

#include <iostream>
#include <thread>

class Hoge{
    private:
        const uint32_t _interval;
        uint32_t _count = 0;
    
    public:
        Hoge(const uint32_t interval);
        ~Hoge();
        std::thread _worker;
        void start_thread();
        
};