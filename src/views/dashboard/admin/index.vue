<template>
  <div class="dashboard">
    <div class="dashboard__header">
      <el-row :gutter="12">
        <el-col :span="6" v-for="item in dashboardPannel" :key="item.title">
          <el-card
            shadow="always"
            class="dashboard__header__item"
            :body-style="{ display: 'flex', 'align-items': 'center' }"
          >
            <img :src="item.img" class="dashboard__header__item__icon" />
            <div class="dashboard__header__item__content">
              <div class="dashboard__header__item__content__title">{{ item.title }}</div>
              <div class="dashboard__header__item__content__vlaue">{{ item.value }}</div>
            </div>
            <div class="dashboard__header__item__percentage" :style="{ color: 'red' }">{{ item.percentage }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue"
let dashboardPannel = reactive([
  {
    title: "BOM成本（含损耗）",
    value: "34",
    percentage: "+25%",
    img: "/src/assets/layout/dashboard-icon-blue.svg"
  },
  {
    title: "制造成本",
    value: "34",
    percentage: "+25%",
    img: "/src/assets/layout/dashboard-icon-red.svg"
  },
  {
    title: "物流成本",
    value: "34",
    percentage: "+25%",
    img: "/src/assets/layout/dashboard-icon-green.svg"
  },
  {
    title: "质量成本",
    value: "34",
    percentage: "+25%",
    img: "/src/assets/layout/dashboard-icon-yellow.svg"
  }
])
</script>
<style lang="scss" scoped>
.dashboard {
  &__header {
    margin: 20px 0;
    &__item {
      &__content {
        margin-left: 15px;
        &__title {
          font-size: 14px;
          color: grey;
          margin-bottom: 5px;
        }
        &__vlaue {
          font-weight: bold;
        }
      }
      &__percentage {
        margin-left: 20px;
        font-size: 14px;
      }
      &__icon {
        width: 48px;
      }
    }
  }
}
</style>
