<template>
  <ol class="color-list">
    <li
      class="color-list__item"
      v-for="color in colors"
      v-bind:key="color.hex"
      v-bind:style="{'--color': color.hex}"
      v-bind:class="{'color-list__item--dark': isDark(color.rgb)}">
      <strong class="color-list__title">{{color.name}}</strong>
      <span class="color-list__value">{{color.hex}}</span>
    </li>
  </ol>
</template>

<script>
  import Vue from 'vue';

  const isDark = rgb => (
    Math.round(
      ((
        (parseInt(rgb.r) * 299) +
        (parseInt(rgb.g) * 587) +
        (parseInt(rgb.b) * 114)) / 1000)
      ) < 125
  );

  export default Vue.extend({
    props: ['colors'],
    methods: {
      isDark: isDark,
    }
  });
</script>
