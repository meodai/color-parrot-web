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
import chroma from 'chroma-js';

export default Vue.extend({
  data: function() {
    return {
      colorvalue: "",
      chromaColors: [],
    }
  },
  props: {
  },
  computed: {
    colors: function () {
      const rawlist = this.colorvalue.split(',');
      const chromaColors = [];

      rawlist.forEach(element => {
        try {
          chromaColors.push(chroma(element));
        } catch (err) {
          console.log(err)
        }
      });

      this.chromaColors = chromaColors;

      return chromaColors.join();
    }
  }
});
</script>

<style>

</style>
