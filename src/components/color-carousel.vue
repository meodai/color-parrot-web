
<template>
  <div class="color-carousel">

    <div class="color-carousel__inner">
      <router-link
          class="color-carousel__card"
          v-for="(color, i) in colors"
          v-bind:key="i"
          v-bind:to="'/color/' + color.requestedHex.replace('#', '')"
          >
        <colorswatchsimple
          v-bind:hex="color.requestedHex"
          v-bind:name="color.name"
        ></color-card>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import colorswatchsimple from './color-swatch-simple.vue';
  import chroma from 'chroma-js';

  export default Vue.extend({
    components: {
      colorswatchsimple,
    },
    props: ['color'],
    data: () => {
      return {
        total: 21,
        colors: []
      }
    },
    methods: {
      getNewColors () {
        // this.$store.getters.namedColors(this.$store.getters.colorHarmony(20), true, true);
        const rainbow = (new Array(this.total)).fill('').map((d,i) => (
          chroma.hsl(i/this.total * 360, 1,.53).hex()
        ));

        this.fetchColors(rainbow);
      },
      fetchColors (colors) {
        const apiURL = new URL('https://api.color.pizza/v1/');

        const params = {
          values: colors.map(c => c.replace('#', '')),
          goodnamesonly: true,
          noduplicates: true,
        }

        apiURL.search = new URLSearchParams(params).toString();

        fetch(apiURL)
          .then(response => response.json())
          .then(data => {
            this.colors = data.colors;
          }).catch(error => {
            throw new Error(`API ${error}`);
          });
      }
    },
    watch: {
      /*
      color: function(e) {
        if (e.hex === '#ffffff') return;
        let colorScale = (new Array(this.total).fill(e.hex));

        colorScale = chroma.scale([
          e.hex,
          chroma(e.hex).set('hsl.h', '+180').hex(),
          e.hex
        ]).mode('lch').colors(this.total);

        this.fetchColors(colorScale);

      }*/
    },
    mounted: function () {
      this.getNewColors();
    }
  });
</script>

<style lang="scss">

.color-carousel {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background: #212121;
  height: 100vh;

  &__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    animation: rotate 160s infinite linear;
    width: 1px; height: 1px;
  }

  &__card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 50% 50%;
    will-change: transform;
    transition: 1s transform cubic-bezier(0.3,0.7,0,1) 1.3s;
    //box-shadow: 0 0 0 0px var(--c-card), 0 0 8rem var(--color);
    box-shadow: 0 0 0 0px var(--c-card);
    text-decoration: none;

    .is-home-ready & {
      @for $i from 1 through 21 {
        &:nth-child(#{$i}) {
          transform: translate(-50%, -50%) rotate(#{($i/21 * 360)}deg) translateY(-25rem) scale(.75);
        }
      }
    }

    @for $i from 1 through 21 {
      &:nth-child(#{$i}) {
        transform: translate(-50%, -50%) rotate(#{($i/21 * 360)}deg) translateY(-5rem) scale(.2);
      }
    }

    > * {
      transform: scale(0.95);
      border: 4px solid #fff;
      transition: 200ms transform;
    }
    &:hover {
      > * {
        transform: scale(1.1);
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(.8);
  }
  100% {
    transform: rotate(360deg) scale(.8);
  }
}
</style>
