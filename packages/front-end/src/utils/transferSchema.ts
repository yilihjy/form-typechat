import { FormResponse, UnknownFormItem } from "form-typechat/schema";

type VueFormSchemaType = {
  type: string;
  required: Array<string>;
  properties: {
    [key: string]: {
      type: string;
      title: string;
      [key: string]: any;
    };
  };
};

export default function transferSchema(data: FormResponse) {
  console.log("转换前的数据", data);
  const schema: VueFormSchemaType = {
    type: "object",
    required: [],
    properties: {},
  };
  data.formItems.forEach((item) => {
    if (item.itemType === "input") {
      schema.properties[item.modelKeyName] = {
        type: item.modelValueType,
        title: item.label,
      };
      if (item.required) {
        schema.required.push(item.modelKeyName);
      }
      if (item.maxLength) {
        schema.properties[item.modelKeyName].maxLength = item.maxLength;
      }
    } else if (item.itemType === "checkbox") {
      schema.properties[item.modelKeyName] = {
        type: "array",
        title: item.label,
        items: {
          type: item.modelValueType === "Array<string>" ? "string" : "number",
          enum: item.options.map((item) => item.value),
          enumNames: item.options.map((item) => item.label),
        },
        uniqueItems: true,
        "ui:widget": "CheckboxesWidget",
      };
      if (item.required) {
        schema.required.push(item.modelKeyName);
      }
    } else if (item.itemType === "radio") {
      schema.properties[item.modelKeyName] = {
        type: item.modelValueType,
        title: item.label,
        enum: item.options.map((item) => item.value),
        enumNames: item.options.map((item) => item.label),
        "ui:widget": "RadioWidget",
      };
      if (item.required) {
        schema.required.push(item.modelKeyName);
      }
    } else if (item.itemType === "select") {
      schema.properties[item.modelKeyName] = {
        type: item.multiple ? "array" : "string",
        title: item.label,
        items: {
          type: "string",
          enum: item.options.map((item) => item.value),
          enumNames: item.options.map((item) => item.label),
        },
        "ui:widget": "SelectWidget",
        uniqueItems: true,
      };
      if (item.required) {
        schema.required.push(item.modelKeyName);
      }
    }
  });
  console.log("转换后的数据", schema);
  return schema;
}

export function findUnknowData (data: FormResponse) {
  return data.formItems.filter(item => item.itemType === 'unknown').map(item => {
    return (item as UnknownFormItem).desc;
  });
}