---
title: 净化 Google
date: 2020-04-20
updated: 2020-04-20
tags: 
- Chrome
categories:  
- 杂谈
toc: true
thumbnail:
urlname: clean-google
---
> 最近内容农场有些猖狂，点名批评 [链接](https://www.v2ex.com/t/663593)


<!--more-->


# 内容农场是什么

> 参见[Wiki](https://zh.wikipedia.org/wiki/%E5%85%A7%E5%AE%B9%E8%BE%B2%E5%A0%B4)


内容农场是为赚取广告收益而不择手段的网站，他们会雇用写手或编写程序四处抄袭、剪贴、拼凑出大量品质不稳定的网络文章。他们用标题吸引阅读，同时以人工和机器堆砌热门关键词欺骗搜索引擎，久之搜索结果前部分塞满了他们的垃圾，真正有质量的相关资讯则被埋没

内容农场对创作者有害，因为他们盗文、盗译、盗图，且不附出处，使真正投注心力的原创者得不到应有报酬

内容农场对阅读者有害，因为它们发布的内容粗制滥造、缺乏求证，甚至自行脑补、无中生有，内容错误也不负责，是谣言的温床

抵制内容农场的唯一做法是不阅读、不点链接、不点赞、不分享，不要让他们赚到广告收益、网站流量及搜寻引擎排名。然而内容农场往往不易辨识，有时难免点错，网页打开才发现中计

> 内容农场是比百度营销号相似但更过分的网站，通过干扰搜索引擎 SEO 牟利，其中 Google 受影响最大（瘦死的骆驼比马大，换 Baidu 是不可能的

# 屏蔽手段

## 浏览器拓展

**封锁内容农场**   [Chrome](https://chrome.google.com/webstore/detail/content-farm-terminator/lcghoajegeldpfkfaejegfobkapnemjl?hl=zh-CN)  [Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/content-farm-terminator/)

这个拓展可以对所有页面链接进行匹配，并对内容农场链接标红并警告

如果想要**在搜索结果中直接屏蔽某网站**可以使用

**uBlacklist** [Chrome ](https://chrome.google.com/webstore/detail/ublacklist/pncfbmialoiaghdehhbnbhkkgmjanfhe) [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ublacklist/)  

可以使用[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

这是我的屏蔽列表，仅供参考（

```txt
/yq\.aliyun\.com/
/cloud\.tencent\.com\/developer/
/.+\.mz6\.net/
/.+\.lanzhuyangshengwang\.com/
/.+\.zhuanzhi\.ai\/document/
*://*.voidcc.com/*
*://*.kknews.cc/*
*://*.codeday.me/*
*://*.voidcn.com/*
*://*.codenong.com/*
*://*.helplib.com/*
*://*.jishuwen.com/*
```

可以配合订阅源使用 https://github.com/YeSilin/uBlacklist 
https://github.com/cobaltdisco/Google-Chinese-Results-Blocklist/

## 其他方式

当然不用浏览器拓展和脚本的话

也可以使用其他搜索引擎比如 Duckduckgo
