{
  "targets": [
    {
      # ↓addon.cc内の NODE_API_MODULE(addon, InitAll) と同名にする
      "target_name": "addon",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      # ↓必要な.ccファイルを全て記述する
      "sources": [ "wrapper.cpp"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "defines": [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}