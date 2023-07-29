<script setup lang="ts">
import { ref } from "vue";
import VueForm from "@lljj/vue3-form-element";
import { GenerateData } from '../types/GenerateData'

const emit = defineEmits<{
  generate: [generateData: GenerateData]
}>();

const schema = {
  schema: {
    type: "object",
    required: ["user_content"],
    properties: {
      user_content: {
        title: "你想要创建什么样的表单",
        type: "string",
        description: "描述你的表单的内容",
        "ui:options": {
          placeholder: "请描述你的表单需求",
          clearable: true,
          showWordLimit: true,
          type: "textarea",
          autosize: true,
        },
      },
    },
    "ui:order": ["user_content"],
  },
  formFooter: {
    show: true,
    cancelBtn: "清空", // 取消按钮文字
    okBtn: "生成", // 确认按钮文字
  },
  formProps: {
    labelWidth: "100px",
    labelSuffix: "：",
  },
};

const formData = ref<{
  user_content: string;
}>({
  user_content:
    "我需要给报名本次活动的客户准备一个表单。我需要收集客户的姓名、性别，性别只能在男、女、保密三个选项中选择一个。同时我要收集客户喜欢的吃的菜系，客户可以从鲁菜、川菜、粤菜和淮扬菜中选择。我还需要知道客户最想去旅游的地方，客户可以从世界前二十的旅行胜地中选择五个。最后还要有个备注栏，客户可以填一些额外的信息。除了备注外，其余表单项都是必填的。备注最多100字。如果表单有选项，那么选项标签为汉字，对应值为英文。",
});

async function onSubmit() {
  if (formData.value.user_content.length > 0) {
    const HOST =
      import.meta.env.MODE === "development" ? "http://localhost:3610" : "";
    const content = formData.value.user_content;
    const response = await fetch(`${HOST}/generate_form_schema`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content
      })
    });
    emit('generate', {
      request: content,
      response: await response.json()
    });
  }
}

function onClear() {
  formData.value.user_content = "";
}
</script>

<template>
  <vue-form
    v-model="formData"
    :schema="schema.schema"
    :form-footer="schema.formFooter"
    :form-props="schema.formProps"
    @submit="onSubmit"
    @cancel="onClear"
  >
  </vue-form>
</template>
