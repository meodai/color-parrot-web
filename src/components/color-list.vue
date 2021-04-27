<template>
  <ol class="color-list">
    <li
      class="color-list__item"
      v-for="color in colors"
      v-bind:key="color.hex"
      v-bind:style="{'--color': color.requestedHex}"
    >
      <strong class="color-list__title">{{color.name}}</strong>
      <span class="color-list__value">{{color.requestedHex}}</span>
    </li>
  </ol>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    props: ['colors'],
    methods: {
    }
  });
</script>

<style lang="scss">
  .color-list {
    position: relative;
    z-index: 4;
    padding: var(--s-gutter);
    background: #212121;
  }

  .color-list__item {
    color: var(--color);
  }
  .color-list__title {
    display: block;
    font-weight: 900;
    font-size: 5rem;
    line-height: 1;
  }
  .color-list__value {
    font-weight: 100;
  }
</style>
