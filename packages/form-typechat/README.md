# form-typechat
基于typechat创建表单schema

参考：https://github.com/yilihjy/form-typechat

## 环境需要
node 18+

## 安装
```bash
pnpm add form-typechat
# npm install form-typechat
# yarn add form-typechat
```

## 代码使用
```TypeScript
import formTypeChat from "form-typechat";
import { FormResponse } from "form-typechat/schema";

const response: FormResponse  = await formTypeChat(content);
```


## 本地开发

参考：https://github.com/yilihjy/form-typechat

### 本地命令行执行
```bash
# 进入当前目录
pnpm install
pnpm start
```
