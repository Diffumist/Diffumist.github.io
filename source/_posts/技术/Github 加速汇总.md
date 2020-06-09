---
title: Github 加速汇总
date: 2020-01-23
updated: 2020-01-23
tags: 
- Github
- Cloudflare
categories: 
- 技术
toc: true
thumbnail:
urlname: posts/Github-fast
---
{% raw %}
<style type="text/css">
.heimu { color: #000; background-color: #000; }
.heimu:hover { color: #fff; }
</style>
{% endraw %}

> 一些让 Github 变快，{% raw %}<span class="heimu">想催人跑的技巧</span>{% endraw %}


<!--more-->
# 使用 Cloudflare Workers 加速
> 虽然经常被黑减速 CDN (指国内，对于国外 VPS 是福音，不得不说，cf 真好用.jpg

利用 Cloudflare Workers 对 github release、archive 以及项目文件进行加速，并且支持 clone，部署无需服务器且自带 cdn

[传送门](https://github.com/hunshcn/gh-proxy)
[个人 Demo](https://github.diffumist.workers.dev/)
[![Now on Cloudflare Workers](https://img.shields.io/badge/Now%20on-Cloudflare%20Workers-f38020?logo=cloudflare&logoColor=f38020)](https://github.diffumist.workers.dev/)
> SSH 无法使用此法加速，请转至下文
# Jsdelivr 直接加速 repo 内文件
 jsdelivr 可以直接访问 GitHub 仓库内文件
举个例子，例如 oh-my-zsh 
```shell
# 原脚本
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# 加速下载
sh -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ohmyzsh/ohmyzsh@master/tools/install.sh)"
```
即格式为
https://cdn.jsdelivr.net/gh/用户名/仓库名@分支/文件及路径
参考
 - https://github.com/jsdelivr/jsdelivr/blob/master/README.md

# 使用代理加速
## HTTPS 代理
git 命令并不会直接走全局代理，需要通过 git config 配置
```git
#  socks5 协议，1080 端口修改成自己的本地代理端口
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
git config --global https.https://github.com.proxy socks5://127.0.0.1:1080
```
其他命令：
```git
# 查看所有配置
git config -l
# 重置代理设置
git config --global --unset http.proxy
git config --global --unset https.proxy
```
也可手动修改`.gitconfig`文件
## 针对 SSH 协议设置代理
修改 `~/.ssh/config` 文件，根据相应端口添加以下内容
```git
Host github.com *.github.com
    ProxyCommand connect -H 127.0.0.1:7890 %h %p
    HostName %h
    Port 22
    User git
    IdentityFile  ~/.ssh/id_rsa
    IdentitiesOnly yes
```
> 有效性取决于代理速度
# 修改 hosts 
> 属于 ~~49 入国军~~治标不治本行为

由于 DNS 地址存在时间有效性，修改 hosts 前请自行查询 GitHub hosts 
以下为完整参考列表（仅供参考，可能已过时）

```hosts
# GitHub Start
13.250.177.223 github.com
59.24.3.173 gist.github.com
185.199.109.153 assets-cdn.github.com
151.101.228.133 raw.githubusercontent.com
151.101.228.133 gist.githubusercontent.com
151.101.228.133 cloud.githubusercontent.com
151.101.228.133 camo.githubusercontent.com
151.101.228.133 avatars0.githubusercontent.com
151.101.228.133 avatars1.githubusercontent.com
151.101.228.133 avatars2.githubusercontent.com
151.101.228.133 avatars3.githubusercontent.com
151.101.228.133 avatars4.githubusercontent.com
151.101.228.133 avatars5.githubusercontent.com
151.101.228.133 avatars6.githubusercontent.com
151.101.228.133 avatars7.githubusercontent.com
151.101.228.133 avatars8.githubusercontent.com
185.199.110.154 github.githubassets.com
174.36.196.242 github.global.ssl.fastly.net
# GitHub End
```
修改后刷新 DNS 缓存