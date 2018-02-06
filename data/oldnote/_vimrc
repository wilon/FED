" ===================
"  默认设置
" ===================
set nocompatible
source $VIMRUNTIME/vimrc_example.vim
source $VIMRUNTIME/mswin.vim
behave mswin

set diffexpr=MyDiff()
function MyDiff()
  let opt = '-a --binary '
  if &diffopt =~ 'icase' | let opt = opt . '-i ' | endif
  if &diffopt =~ 'iwhite' | let opt = opt . '-b ' | endif
  let arg1 = v:fname_in
  if arg1 =~ ' ' | let arg1 = '"' . arg1 . '"' | endif
  let arg2 = v:fname_new
  if arg2 =~ ' ' | let arg2 = '"' . arg2 . '"' | endif
  let arg3 = v:fname_out
  if arg3 =~ ' ' | let arg3 = '"' . arg3 . '"' | endif
  let eq = ''
  if $VIMRUNTIME =~ ' '
    if &sh =~ '\<cmd'
      let cmd = '""' . $VIMRUNTIME . '\diff"'
      let eq = '"'
    else
      let cmd = substitute($VIMRUNTIME, ' ', '" ', '') . '\diff"'
    endif
  else
    let cmd = $VIMRUNTIME . '\diff'
  endif
  silent execute '!' . cmd . ' ' . opt . arg1 . ' ' . arg2 . ' > ' . arg3 . eq
endfunction

" ===================
"  字符设置
" ===================
syn on                      "语法支持
set ai                      "自动缩进
set laststatus=2            "总是显示状态行
set expandtab               "以下三个配置配合使用，设置tab和缩进空格数
set shiftwidth=4
set tabstop=4
set cursorline              "为光标所在行加下划线
set nu                      "显示行号
set autoread                "文件在Vim之外修改过，自动重新读入
set ignorecase              "检索时忽略大小写
set hls                     "检索时高亮显示匹配项
set helplang=cn             "帮助系统设置为中文
set fdm=manual       "代码折叠模式：自定义

" UTF-8乱码解决
set encoding=utf-8
set fileencodings=utf-8,chinese,latin-1
set fileencoding=chinese

"解决菜单乱码
source $VIMRUNTIME/delmenu.vim
source $VIMRUNTIME/menu.vim

"解决consle输出乱码
language messages zh_CN.utf-8

" ===================
"  GUI设置
" ===================
set shortmess=all
set showtabline=2        " 默认显示标签
set guioptions-=e        " 默认标签样式
"colorscheme monokai      " 配色
set guifont=DejaVu_Sans_Mono:h14:cANSI    "字体
autocmd GUIEnter * simalt ~x              " 全屏
set cmdheight=1

" 隐藏菜单栏、工具栏
set guioptions-=m        " 隐藏菜单栏
set guioptions-=T        " 隐藏工具栏
set guioptions+=c        " 使用字符提示框
set guioptions-=L        " 隐藏左侧滚动条
set guioptions-=b        " 隐藏底部滚动条
set cursorline           " 突出显示当前行

" 状态栏设置
set statusline=%f%m%r%h%w%=%{&ff}%Y\ \|\ Line:%3l,Str:%c%V\ \|\ ASSIC:%b\ \|\ %P\ \|\ TotleLine:%L\ \.