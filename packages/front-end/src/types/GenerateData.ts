import { FormResponse } from "form-typechat/schema";

export type GenerateData = {
  response: {
    data: FormResponse;
    success: boolean;
    message?: string;
  };
  request: string;
};
