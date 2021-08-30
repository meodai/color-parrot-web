<template>
  <div class="color-pie">
    <!--p>Because it is close to the color {{meanings.color}}, <strong>{{name}}</strong> could be a associated with {{meanings.adjecives.join(', ')}}.</p>
    <p>{{meanings.color}}:, {{meanings.desc}}</p-->
    <p><strong>{{name}}</strong> can be described as {{adjectives}}.</p>
    <p>If `{{name}}` is used as background, <strong>{{cd.bestContrast}}</strong> text would be the most readable on it.</p>
    <p>An LCD screen needs {{cd.percentageWords('gl')[0]}} red, {{cd.percentageWords('gl')[1]}} green and {{cd.percentageWords('gl')[2]}} blue to produce this color.</p>
  </div>
</template>

<script>
import Vue from 'vue';
import chroma from 'chroma-js';
import ColorDescription from '../colorlore';

export default Vue.extend({
  data: function() {
    return {
      cd: new ColorDescription(this.color),
    }
  },
  props: [
    'color', 'name'
  ],
  watch: {
    color () {
      this.cd = new ColorDescription(this.color);
    }
  },
  computed: {
    temperatureAdjectives () {
    },
    meanings () {
    },
    adjectives () {
      return this.cd.getAdjectivesList()
    },
    rgbGradient () {
      const gl = this.rgb;
      const total = this.rgb.reduce((r,d) => r + d, 0);
      return `radial-gradient(
        circle closest-side,
        transparent 25.74%,
        transparent 66%,
        white 0
      ),conic-gradient(
        rgb(255,0,0) 0,
        rgb(255,0,0) ${gl[0]/total * 100}%,
        rgb(0,255,0) 0,
        rgb(0,255,0) ${((gl[0] + gl[1])/total) * 100}%,
        rgb(0,0,255) 0,
        rgb(0,0,255) ${((gl[0] + gl[1] + gl[2])/total) * 100}%
      )`;
    }
  },
  mounted () {
  }
});
</script>


<style lang="scss">
  .color-pie {
    strong {
      font-weight: 700;
    }
    p + p {
      margin-top: 1em;
    }
    &__pie {
      position: relative;
      display: inline-block;
      width: 1em;
      height: 1em;
      margin-left: 0.25em;
      margin-right: 0.25em;

      > * {
        z-index: -1;
        display: block;
        width: 2em;
        height: 2em;
        position: absolute;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
