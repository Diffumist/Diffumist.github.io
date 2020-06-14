---
title: WSL2 踩坑简单记录
date: 2020-05-15
updated: 2020-05-15
tags: 
- Linux
- WSL
categories: 
- 开发
toc: true
thumbnail:
urlname: WSL2-config-easy
---
> A WSL 


<!--more-->


M$ 在 WSL2 采用了 Hyper-V ，原先的 rootfs 变成了 vhdx ，Docker 支持，文件 I/O 也提高了，和普通虚拟机相比还拥有飞快的启动速度，配合 Windows Terminal 和 Vscode remote 可以说是神器，不过由于 Hyper-V 等原因还是有一些坑需要解决

## 检查 WSL 版本（WSL 1 和 2 支持互相转换

  ```powershell
  wsl --list --verbose
  ```
  ![](/img/old/6530d2ff73cee.png)

## 关于 systemd 支持

- WSL 无论是 1 还是 2 本身不支持 systemd，但有 WSL2 的第三方实现 Genie ，从而使用守护进程等操作

  https://github.com/arkane-systems/genie


## WSL2 的代理设置

 - WSL2 是使用 Hyper-V 虚拟机实现的，不能跟 Windows 共享同一个 localhost ，且重启 ip 都会变化

 - 自行安装 proxychain-ng 后，向 shell 的配置文件（如 `.bashrc，.zshrc，.fishrc `等）添加以下命令（端口自行修改）

 ```shell
export WIN_IP=`cat /etc/resolv.conf | grep nameserver | awk '{print $2}'`
cp -f /etc/proxychains.conf ~/.proxychains.conf
sed -i '/\[ProxyList\]/,$d' ~/.proxychains.conf
sed -i '/\[http]/,$d' ~/.gitconfig
echo -e '[http]\nproxy=socks5://'${WIN_IP}':7891\n[https]\nproxy=socks5://'${WIN_IP}':7891' >> ~/.gitconfig
sed -i '/socks5.*/d' ~/.curlrc
echo 'socks5='${WIN_IP}':7891' >> ~/.curlrc
echo -e '[ProxyList]\nsocks5 '${WIN_IP}' 7891' >> ~/.proxychains.conf
alias pc='proxychains4 -q -f ~/.proxychains.conf'
  ```

   > 基于 https://www.cnblogs.com/zsmumu/p/12416159.html 修改


## 其他

 - 虽然 WSL2 本身 I/O 得到提升但跨系统 I/O 变差，可以在跨系统 I/O 时切换到 WSL1
 - 从资源管理器访问 WSL 文件，地址栏输入 `\\wsl$\` ，在 Windows 19603 及以后版本已经集成在资源管理器中
 - [VirtualBox](https://www.virtualbox.org/wiki/Changelog-6.0) 和 [VMware](https://blogs.vmware.com/workstation/2020/01/vmware-workstation-tech-preview-20h1.html) 都发布了支持 Hyper-V 和 WSL2 的版本 
 - LxRunOffline 不支持操作 WSL2 需要先转换为 WSL1
 - 进行系统全量备份时切换为 WSL 1 ，因原先的 rootfs 变成了 vhdx ，加之 LxRunOffline 还不支持备份还原 WSL2 容易丢失 WSL（

## 后记
 - M$ 在 Build 2020 全球开发者大会上，发布了 Windows Terminal 1.0 正式版，包管理器 winget 的预览版，WSL2 也将很快支持 GPU 和 Linux GUI，Windows 10：可能是对新手最友好的 Linux 发行版？
 - Windows 的开发环境在不断改善了，scoop 包管理环境变量 + WSL + Terminal 确实有些舒适
 - 当然 WSL 替代不了双系统，某些时候 WSL 的问题可能更多
