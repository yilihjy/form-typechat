import path from "path";
import dotenv from "dotenv";
import {
  processRequests,
} from "typechat";
import formTypeChat from './index';

dotenv.config({ path: path.join(__dirname, "../../../.env") });

processRequests("你想要什么表单?> ", process.argv[2], async (request) => {
    const response = await formTypeChat(request);
    if (!response.success) {
        console.log(response.message);
        return;
    }
    console.log(`表单结构：\n ${JSON.stringify(response.data.formItems, undefined, 4)}`);
});
