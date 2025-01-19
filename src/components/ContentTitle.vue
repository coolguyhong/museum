<template>
  <div class="title">
    <slot />
  </div>
</template>

<style lang="less" scoped>
  .title {
    display: inline-flex;
    width: 100%;
    height: 30px;
    align-items: stretch;
    justify-content: space-between;
    font-size: 20px;
    font-weight: normal;
    line-height: 24px;
    letter-spacing: normal;
    color: rgba(0, 0, 0, 0.75);
  }
</style>
