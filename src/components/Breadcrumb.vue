<template>
  <div id="breadcrumb">
    <slot />
  </div>
</template>

<style lang="less" scoped>
  #breadcrumb {
    display: inline-block;
    height: 18px;

    & > * {
      display: inline-block;
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 12px;
      font-heigth: 18px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.6);

      &:last-child {
        font-weight: bold;
        color: rgba(0, 0, 0, 7.5);
      }
    }

    & > * + * {
      &::before {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-left: 8px;
        margin-right: 8px;
        content: '';
        background-image: url("@/assets/images/ico-right.svg");
        background-size: 8px 8px;
      }
    }
  }
</style>
