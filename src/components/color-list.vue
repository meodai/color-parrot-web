<template>
  <ol class="color-list">
    <li
      class="color-list__item"
      v-for="(color,i) in colors"
      v-bind:key="color.hex"
      v-bind:style="{'--color': color.requestedHex}"
    >
      <strong class="color-list__title">{{color.name}}</strong>
      <span class="color-list__value">{{cvalues[i]}}</span>
    </li>
  </ol>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    props: ['colors', 'cvalues'],
    methods: {}
  });
</script>

<style lang="scss">
  .color-list {
    position: relative;
    z-index: 4;
    padding: var(--s-gutter) var(--s-gutter) calc(var(--s-gutter) * 3);
    background: #212121;
  }

  .color-list__item {
    color: var(--color);
    & + & {
      margin-top: 2.2em;
    }
  }
  .color-list__title {
    display: block;
    font-weight: 800;
    font-size: 3rem;
    line-height: 1;
  }
  .color-list__value {
    font-weight: 100;
  }
</style>
