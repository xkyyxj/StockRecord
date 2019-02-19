
{
  "targets": [
    {
      "target_name": "hello",
      "sources": [ "./src/cpp/hello.cpp" ],
      'link_settings': {
        'libraries': [
          '-lProject2'
        ],
        'library_dirs': [
          './src/cpp',
        ]
      }
    }
  ]
}