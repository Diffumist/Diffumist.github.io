---
title: 尝试在 Win 下使用 KDE connect
date: 2020-04-01
updated: 2020-04-01
tags: 
- KDE
- Linux
categories: 
- 开发
toc: true
thumbnail:
urlname: KDE-connect-win
---
# 关于KDE Connect

> 先不负责任的复制粘贴（（（

KDE Connect 是一个使您的所有设备能够相互通信的项目。以下是KDE Connect可以执行的一些操作：

- 在台式计算机上接收电话通知并回复邮件
- 通过手机控制桌面上播放的音乐
- 将手机用作桌面的遥控器
- 从连接的设备在 PC 上运行预定义的命令
- 从桌面检查手机电池电量
- 拨打电话以帮助找到它
- 在设备之间共享文件和链接
- 从桌面浏览手机
- 通过手机控制桌面的音量

KDE Connect 是一个跨平台项目，兼容 Linux Android macOS Windows ，在 Linux 下可以做到开箱即用，在 Windows 下需要一些操作才能使其正常运行，下面简单记录一下
<!-- more -->
# 下载 KDE Connect for Windows

下载地址 ：https://binary-factory.kde.org/job/kdeconnect-kde_Release_win64/

# 问题复现

先手动进入 KDE Connect 的安装目录

目前 KDE Connect 的 win 版本构建存在一些问题，手动运行 `kdeconnect-indicator.exe·`并不能正常使用，需要先运行`kdeconnectd.exe`，才能正常运行`kdeconnect-indicator.exe`，然而`kdeconnectd.exe`是一个控制台程序，尝试简单写了一个`VBScript` 后发现仍然会出现概率性连接失效问题，需要手动停止进程重新打开才能正常运行

# 问题修复

使用编辑器打开安装目录下 `\bin\data\dbus-1\services\org.kde.kdeconnect.service`将`Exec =`一行改为`Exec =kdeconnectd`后，保存重启 KDE Connect 即可

> 原讨论地址： https://bugs.kde.org/show_bug.cgi?id=412665

# 其他问题

- 浏览设备文件时出现"需要新应用打开sftp链接"——安装 [WinScp](https://winscp.net/eng/download.php)

- 浏览设备文件时出现无法连接问题——尝试在Android重新设置`插件设置`—`开放文件系统`—`添加存储位置`，并重新检查文件读写授权

- 剪切板：移动端 -> PC端 不正常，即只能单方向——这个锅甩给 Android 10 和屑流氓应用厂商(有[疑似解决方案](https://github.com/Kr328/Riru-ClipboardWhitelist-Magisk)，需要 `Magisk` )

