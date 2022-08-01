<template>
  <div class="audio-list">
    <div class="audio-list-container">
      <div class="header">
        <el-input @keydown="handleSearch" />
      </div>
      <div class="container">
        222
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
const handleSearch = (event:any) => {
  if (event.keyCode === 13) {
    console.log(222)
  }
}
</script>

<style scoped lang='scss'>
.audio-list{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40%;
  z-index: 99;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px 0 0;
  &-container{
    padding: 20px;
    box-sizing: border-box;
    .header{
      height: 50px;
      display: flex;
      align-items: center;
      padding:0 60px;
    }
    .container{
      margin-top: 20px;
    }
  }
}
</style>
