#pragma once

#include <napi.h>
#include "Hoge.h"

class ObjectWrapDemo : public Napi::ObjectWrap<ObjectWrapDemo> {
 public:
  ObjectWrapDemo(const Napi::CallbackInfo&);
  Napi::Value Greet(const Napi::CallbackInfo&);
  Napi::Value StartThread(const Napi::CallbackInfo&);

  static Napi::Function GetClass(Napi::Env);

 private:
  std::string _greeterName;
  Hoge _hoge;

};