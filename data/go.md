
### go get 使用代理
```bash
    export http_proxy=http://127.0.0.1:51967
    export https_proxy=http://127.0.0.1:51967
    go get ...
```

### go build
```bash
    go build -o bin/test.exe src/main.go
    # win
    go build -ldflags "-s -w -H=windowsgui" -o bin/test.exe src/main.go
```
