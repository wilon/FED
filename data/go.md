
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
    go build -ldflags "-s -w -X main.Version=${VERSION} -H=windowsgui" -o bin/test.exe src/main.go
    go build -ldflags '-s -w -extldflags "-static"' -a -v -o bin/test.exe test.go
    # -ldflags：-w：去掉调试信息，可压缩体积
    # -ldflags：-s：为去掉符号表，可压缩体积
    # -ldflags：-extldflags "-static"：打包静态资源，如 .dll
    # -ldflags：-H=windowsgui：win 隐藏图形界面
    # -ldflags：-X：设置包中的变量值
    # -a：完全编译，不理会-i产生的.a文件，可压缩体积
    # -v：打印详情
    # -o：指定二进制文件名
    # -x：同时打印输出执行的命令名（-n）（少用）
    # -i：安装那些编译目标依赖的且还未被安装的代码包。这里的安装意味着产生与代码包对应的归档文件，并将其放置到当前工作区目录的pkg子目录的相应子目录中。在默认情况下，这些代码包是不会被安装的。
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
