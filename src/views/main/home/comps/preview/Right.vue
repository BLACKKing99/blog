<template>
  <div class="right">
    <MyComp class="my-comps" />
    <Tab
      title="我的技术栈"
      class="about-tab"
    >
      <template #body>
        <div class="about-tab-body flex-c">
          <template
            v-for="item in infoArr"
            :key="item.id"
          >
            <div
              class="about-tab-body-item"
              @click="handleInfoClick(item)"
            >
              <i :class="`iconfont ${item.icon}`" />
              <span class="title">{{ item.info }}</span>
            </div>
          </template>
        </div>
      </template>
    </Tab>
    <Tab
      title="我的技术栈"
      class="skill-tab"
    >
      <template #body>
        <div class="skill-tab-body">
          <template
            v-for="item in skillsArr"
            :key="item.id"
          >
            <div class="skill-tab-body-item flex-r">
              <i
                class="icon"
                :style="randomColor()"
              />
              <span class="skills">{{ item.skill }}</span>
            </div>
          </template>
        </div>
      </template>
    </Tab>
  </div>
</template>

<script lang='ts' setup>
import { randomKey } from '@/util/index'
import { skillsArr, infoArr } from './config'

// 获取随机颜色
const randomColor = () => {
  const r = randomKey(0, 255)
  const g = randomKey(0, 255)
  const b = randomKey(0, 255)
  return {
    backgroundColor: `rgba(${r},${g},${b},1)`
  }
}
// 处理info信息
const handleInfoClick = (value:typeof infoArr[number]) => {
  ElNotification({
    title: value.info,
    type: 'success',
    message: value.content
  })
}

</script>

<style scoped lang='scss'>
.right{
  .my-comps{
    width: 100%;
    height: 130px;
  }
  .about-tab{
    margin-top: 20px;
    &-body{
      padding:0 5px ;
      &-item{
        width: 100%;
        background-color: #f5f5f5;
        margin-bottom: 10px;
        padding: 5px 0 5px 10px;
        transition: 0.5s;
        cursor: pointer;
        &:hover{
          box-shadow: 0 3px 3px #ccc;
        }
        .iconfont{
          margin-right: 10px;
          font-size:14px;
          color: #768791;
        }
        .title{
          font-size: 14px;
          color: #768791;
        }
      }
    }
  }
    .skill-tab{
      margin-top: 20px;
        &-body{
            display: flex;
            flex-wrap: wrap;
            &-item{
                border: solid 1px #f5f5f5;
                transition: 0.5s;
                padding: 5px;
                border-radius: 5px;
                margin-right: 10px;
                margin-bottom: 10px;
                box-sizing: border-box;
                &:hover{
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                }
                .icon{
                    width: 10px;
                    height: 10px;
                    border-radius: 100%;
                    background-color: #000;
                    margin-right: 8px;
                }
                .skills{
                    font-size: $font-mini;
                }
            }
        }
    }
}
</style>
