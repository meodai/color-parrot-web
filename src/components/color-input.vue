<template>
  <form method="post" action="#">
    <label for="#colorlist">
      <strong>Enter a list of colors</strong>
      <input v-model="colorvalue" type="text" />
    </label>
    <span v-html="colors"></span>
  </form>
</template>

<script>
import Vue from 'vue';
import { parse, formatHex } from '../color-utils';

export default Vue.extend({
  data: function() {
    return {
      colorvalue: "",
      parsedColors: [],
    }
  },
  props: {
  },
  computed: {
    colors: function () {
      const rawlist = this.colorvalue.split(',');
      const parsedColors = [];

      rawlist.forEach(element => {
        const parsed = parse(element.trim());
        if (parsed) {
          parsedColors.push(formatHex(parsed));
        }
      });

      this.parsedColors = parsedColors;

      return parsedColors.join();
    }
  }
});
</script>

<style>

</style>
