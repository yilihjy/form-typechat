import {
  createLanguageModel,
  createJsonTranslator,
} from "typechat";
import { FormResponse } from './FormSchema';
import { formSchemaString } from './FormSchemaString';
export * from './FormSchema';

interface Options {
    /**
     * 环境变量
     */
    env: Record<string, string | undefined>
}

export default async function formTypeChat(request: string, options?: Options) {
    const env: Record<string, string | undefined> = options?.env ?? process.env;
    if (!env['OPENAI_API_KEY'] && !env['AZURE_OPENAI_API_KEY']) {
        throw new Error(`缺少OPENAI_API_KEY或AZURE_OPENAI_API_KEY`)
    }
    const model = createLanguageModel(env);
    const translator = createJsonTranslator<FormResponse>(model, formSchemaString, "FormResponse");
    const response = await translator.translate(request);
    return response;
}