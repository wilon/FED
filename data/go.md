
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
