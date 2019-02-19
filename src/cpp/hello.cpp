#include <node.h>
#include <v8.h>
#include <string>
#include <iostream>
#include <fstream>

#define DLL_OUT __declspec(dllimport)

extern DLL_OUT std::string value1();

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  std::string file_name(R"(E:\123213)");
  std::ofstream output_file(file_name);
  std::string real_value = value1();
  output_file << file_name;
  output_file << real_value;
  Local<Value> value1 = args[0];
  Value* p_value1 = *value1;
  Local<String> str_val1 = p_value1->ToString();
  String* str1 = *str_val1;
  char* real_val = new char[str1->Utf8Length() + 3];
  str1->WriteUtf8(real_val);
  std::string from_js(real_val);
  output_file << from_js;
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}  // namespace demo