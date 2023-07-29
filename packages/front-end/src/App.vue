<template>
  <UserInputForm @generate="pushGenerateData"></UserInputForm>
  <el-card class="card" v-for="(item, index) in generateDataList" :key="index">
    <el-card class="card">
      <el-text tag="p">{{ item.request }}</el-text>
    </el-card>
    <template v-if="item.response.success">
      <el-card class="card">
        <el-text v-for="(txt, i) in findUnknowData(item.response.data)" :key="i" tag="p" type="warning">未能理解的内容: {{ txt }}</el-text>
        <vue-form :schema="transferSchema(item.response.data)"> </vue-form
      ></el-card>
    </template>
    <template v-else>
      <el-card class="card">
        <el-text tag="p" type="warning">生成失败</el-text>
        <el-text tag="p">失败原因：</el-text>
        <el-text tag="p">{{ item.response.message }}</el-text></el-card
      >
    </template>
  </el-card>
</template>

<script setup lang="ts">
import VueForm from "@lljj/vue3-form-element";
import { reactive } from "vue";
import UserInputForm from "./components/UserInputForm.vue";
import { GenerateData } from "./types/GenerateData";
import transferSchema, { findUnknowData } from "./utils/transferSchema";

const generateDataList = reactive<Array<GenerateData>>([]);

function pushGenerateData(data: GenerateData) {
  generateDataList.unshift(data);
}
</script>

<style>
.card {
  margin-bottom: 10px;
}
</style>
