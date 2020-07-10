
### go get
```bash
	# 使用代理
    export http_proxy=http://127.0.0.1:51967
    export https_proxy=http://127.0.0.1:51967
    go get ...
	# 参数
	go get -u abc    # 下载丢失的包，但不会更新已经存在的包
	go get -t abc    # 同时也下载需要为运行测试所需要的包
	go get -d abc    # 只下载，不安装
	go get -v abc    # 显示操作流程的日志及信息，方便检查错误
```

### go build
```bash
    go build -o bin/test.exe src/main.go
    # win
    go build -ldflags "-s -w -H=windowsgui" -o bin/test.exe src/main.go
```

### go import
```go
import (

	// 可以省略前缀 fmt.Println() => Println()
	. "fmt"

	// 不使用此包，只调用 pprof.init()
	_ "net/http/pprof"

	// export GO111MODULE=on 引入本地包
	// go.mod 设置 local/package
	// 如下则引入了当前目录下 libs 包
	"local/package/libs"
)
```
