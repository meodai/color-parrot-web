
<template>
  <main v-bind:class="{'is-ready': isReady}">
    <label>
    <input type="checkbox" v-model="show" />
    <span>show</span>
    </label>
    <label>
    <input type="checkbox" v-model="goodnamesonly" />
    <span>goodnamesonly</span>
    </label>
    <label>
      <select v-model="sort">
        <option value="">Default</option>
        <option value="magic">Magic</option>
      </select>
    <span>Better color-names</span>
    </label>
    <label>
      <select v-model="colorDisplayMode">
        <option value="hex">hex</option>
        <option value="hsl">hsl</option>
        <option value="lab">lab</option>
        <option value="cmyk">cmyk</option>
      </select>
    <span>Color Values</span>
    </label>
    <section class="swatches">
      <colorswatch
        v-for="(c, i) in colorNames"
        v-bind:key="i"
        v-bind:color="sortedColors[i]"
        v-bind:colorValue="colorValue(sortedColors[i])"
        v-bind:name="c.name"
        v-bind:isVisible="show"
      ></colorswatch>
    </section>
  </main>
</template>

<script>
import Vue from "vue";
import colorinput from './components/color-input';
import colorswatch from './components/color-swatch';
import chroma from 'chroma-js';

const sorts = {
  'magic': colors => colors.sort((a, b) => (b.luminance() - a.luminance()) - (b.hcl()[0] - a.hcl()[0])),
};

export default Vue.extend({
  components: {
    colorinput,
    colorswatch
  },
  data() {
    return {
      colors: [
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
      ],
      colorDisplayMode: 'hex',
      show: false,
      goodnamesonly: false,
      colorNames: [],
      isReady: false,
      sort: ''
    }
  },
  computed: {
    colorsHex: function () {
      return this.sortedColors.map(c => c.hex());
    },
    sortedColors: function () {
      if (sorts.hasOwnProperty(this.sort)) {
        return sorts[this.sort]([...this.colors]);
      } else {
        return this.colors;
      }
    },
  },
  watch: {
    sort: function () {
      this.fetchNames();
    },
    goodnamesonly: function () {
      this.fetchNames();
    }
  },
  methods: {
    colorValue: function(color) {
      let colorValue = color[this.colorDisplayMode]();

      if ( this.colorDisplayMode === 'hsl') {
        colorValue.pop();
        colorValue = colorValue.reduce((r,v,i) => `${r} ${i ? Math.floor(v * 100) + '%' : Math.floor(v) + '°'}`,'');
      } else if (this.colorDisplayMode === 'lab') {
        colorValue = colorValue.reduce((r,v,i) => `${r} ${Math.floor(v)}`,'');
      } else if (this.colorDisplayMode === 'cmyk') {
        colorValue = colorValue.reduce((r,v,i) => `${r} ${Math.floor(v * 100)}°`,'');
      }
      return colorValue;
    },
    fetchNames: function() {
      const url = new URL('https://api.color.pizza/v1/');

      const params = {
        values: this.colorsHex.map(c => c.replace('#', '')),
        goodnamesonly: this.goodnamesonly,
        noduplicates: true,
      }

      url.search = new URLSearchParams(params).toString();

      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.isReady = true;
        setTimeout(() => {
          this.show = true;
        }, 200);
        this.colorNames = Object.freeze(data.colors);

      });
    }
  },
  mounted () {
    this.fetchNames();
  },
});
</script>
<style lang="scss">


</style>
