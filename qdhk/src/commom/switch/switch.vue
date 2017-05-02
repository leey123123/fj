<template>
  <label class="mint-switch">
    <input class="mint-switch-input" @change="$emit('change', currentValue)" type="checkbox" v-model="currentValue">
    <span class="mint-switch-core"></span>
    <div class="mint-switch-label"><slot></slot></div>
  </label>
</template>

<script>
/**
 * mt-switch
 * @module components/switch
 * @desc 切换按钮
 * @param {boolean} [value] - 绑定值，支持双向绑定
 * @param {slot} - 显示内容
 *
 * @example
 * <mt-switch v-model="value"></mt-switch>
 */
export default {
  name: 'mswitch',

  props: {
    value: Boolean
  },
  computed: {
    currentValue: {
      get:function() {
        return this.value;
      },
      set:function(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style>
.mint-switch {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    position: relative;
}
.mint-switch * {
    pointer-events: none;
    vertical-align: middle;
}
.mint-switch-label {
    vertical-align: middle;
    margin-left: .2rem;
    display: inline-block;
}
.mint-switch-label:empty {
    margin-left: 0;
}
.mint-switch-core {
    display: inline-block;
    position: relative;
    width: 1.1rem;
    height: .5rem;
    border: 1px solid #d9d9d9;
    border-radius: 1rem;
    box-sizing: border-box;
    background: #d9d9d9;
}
.mint-switch-core::after, .mint-switch-core::before {
    content: " ";
    top: 0;
    left: 0;
    position: absolute;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
    border-radius: 1rem;
}
.mint-switch-core::after {
    width: .7rem;
    height: .48rem;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
}
.mint-switch-core::before {
    width: 1.08rem;
    height: .48rem;
    background-color: #ccc;
}
.mint-switch-input {
    display: none;
}
.mint-switch-input:checked + .mint-switch-core {
    border-color: #ff8000;
    background-color: #ff8000;
}
.mint-switch-input:checked + .mint-switch-core::before {
    -webkit-transform: scale(0);
            transform: scale(0);
}
.mint-switch-input:checked + .mint-switch-core::after {
    -webkit-transform: translateX(.4rem);
            transform: translateX(.4rem);
}
</style>
