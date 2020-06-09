---
title: Linux 下的人脸识别登录
date: 2020-04-11
updated: 2020-04-11
tags: 
- Linux
categories: 
- 技术
toc: true
thumbnail:
urlname: Linux-face
---
Howdy 为 Linux 提供了 Windows Hello™ 风格的身份验证。<!--more-->使用 IR 摄像头，结合面部识别技术来证明你的身份，配合 PAM 可以简单实现 sudo ,system-auth, lockscreen 等无密码验证，下面说一下在 Arch 的简单配置，不使用 Arch 系的建议左转 GitHub https://github.com/boltgolt/howdy 或者加入我们 Arch 邪教 (不是
什么，你说你是 Windows 用户？那 WSL 也要记得装 [Arch](https://github.com/yuk7/ArchWSL/releases) 哦（逃

> 当然，少输密码一时爽，`rm`火葬场，建议先写一个`alias`防止出现意外“故事” (

Howdy 只能实现 2D 人脸识别，无法实现 Windows Hello 的生物识别，所以对于注重安全性的不建议安装

# 安装

网络条件好的话可以直接 yay 一把梭，由于 Sources 是 GitHub 所以无法使用 tuna 镜像源加速

```shell
yay -S howdy
```

网络条件不好的话可以手动下载编译

```shell
 yay -G package_name
```

下面是需要编译的几个应用包

```shell
pam-python                       
python-dlib               
python-face_recognition_models  
python-face_recognition     
howdy
```

打开 PKGBUILD 可以找到下载地址，手动下载完毕后丢进文件夹，用相对位置替换即可，接着

```shell
makepkg    //编译生成安装文件
yay -U package_name   //文件名自行替换
```

安装完毕

# 配置

## Howdy 配置

```shell
sudo howdy config
```

添加 IR 摄像头，修改device_path 为

```shell
device_path = /dev/video0
```

添加人脸

```shell
sudo howdy add
```

## PAM 配置

为了正常调用 Howdy 我们先了解一下 Linux 的身份验证模块

```shell
cd /etc/pam.d/
```

这是 Linux 可插拔式身份验证模块(PAM)的配置文件，sudo ，lockscreen 等身份验证都依赖于此模块

> [PAM](https://wiki.archlinux.org/index.php/PAM)提供了一种开发程序的方法，可以独立于认证方案之外。这些程序需要在运行时附加 "认证模块 "才能工作。哪些认证模块要附加到哪个认证模块取决于本地系统设置，由本地系统管理员自行决定。

为了使 PAM 能成功调用 Howdy 需要加入下面一条更改：

```shell
auth sufficient pam_python.so /lib/security/howdy/pam.py
```

例如实现 sudo 命令时调用 Howdy 

```shell
# PAM-1.0

auth    sufficient pam_python.so /lib/security/howdy/pam.py
auth    include    system-auth
account include    system-auth
session include    system-auth
```

**安全提示：由于默认安装下 PAM 存在配置文件的链接问题，即默认配置下 PAM 文件存在优先级，建议不要额外修改 PAM 配置文件，例如`sshd`，**下面是一个简单的示例



login -> system-local-login -> system-login -> system-auth
sshd -> system-remote-login -> system-login -> system-auth



由于 Linux 桌面环境比较丰富，若想实现在锁屏下登录，可以修改相应的 PAM 配置文件
例如 KDE 的身份验证：`sddm`

其他桌面环境可自行查找或验证
# 参考
 - https://wiki.archlinux.org/index.php/Howdy