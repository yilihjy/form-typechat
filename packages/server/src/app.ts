import path from "path";
import dotenv from "dotenv";
import express, { Express, Request, Response, Router } from "express";
import formTypeChat from "form-typechat";

dotenv.config({ path: path.join(__dirname, "../../../.env") });

// 路由配置接口
interface RouterConf {
  path: string;
  router: Router;
}

// 路由配置
const routerConf: Array<RouterConf> = [];

function routes(app: Express) {
  // 处理表单请求
  app.all("/generate_form_schema", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
  app.post("/generate_form_schema", async (req: Request, res: Response) => {
    const content = req.body["content"];
    const response = await formTypeChat(content);
    res.status(200).json(response);
  });

  routerConf.forEach((conf) => app.use(conf.path, conf.router));
}

const app = express();

app.use(express.json());
app.use(express.static("public"));





const PORT = 3610;

// 启动
app.listen(PORT, async () => {
  console.log(`App is running at http://localhost:${PORT}`);
  routes(app);
});
