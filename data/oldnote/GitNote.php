
git笔记

id_rsa公钥
id_rsa.pub私钥


## 克隆一个项目
git clone https://github.com/Wilon/mynote.git

# 回退所有内容到上一个版本
git reset --hard HEAD~1
git pull
git reset --hard HEAD~1

# git分支
$ git branch <branchname>

#重复的格式
<<<<<<< HEAD
        // if ($primaltpl) {
        //     $file = $_G['mobiletpl'][IN_MOBILE].'/'.$primaltpl;
        // }
=======
        if ($primaltpl) {
            $file = $_G['mobiletpl'][IN_MOBILE].'/'.$primaltpl;
        }
>>>>>>> 8178509b01536d6cc46362c5a159b97ee16a187e


SVN
# 提交代码
svn status    #查看状态
svn add    #添加文件
svn update    #向下更新，解决冲突
svn commit -m '说明'    #向上提交
# 查看一些信息
svn log    #查看提交日志
svn log -r 95    # 查看某次提交日志
svn log -l 2    # 查看最近2次提交日志
# 恢复本地修改
svn　revert　[--recursive]　文件名
# 回滚到版本号
svn merge -r 28:25 something
