
<template>
  <div class="color-carousel" v-bind:class="{'has-noAnimation': noanimation}">
    <div class="color-carousel__inner">
      <router-link
          class="color-carousel__card"
          v-for="(color, i) in colors"
          v-bind:key="i"
          v-bind:to="'/color/' + color.requestedHex.replace('#', '') + '/❤'"
          v-bind:style="{'--color': color.requestedHex}"
      >
        <colorswatchsimple
          v-bind:hex="color.requestedHex"
          v-bind:name="color.name"
        />
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
    props: ['color', 'startColor', 'noanimation'],
    data: () => {
      return {
        total: 21,
        colors: [],
        timer: null,
      }
    },
    methods: {
      getNewColors () {
        // this.$store.getters.namedColors(this.$store.getters.colorHarmony(20), true, true);
        const hueShift = (360/this.total) * this.startColor[0];

        const rainbow = (new Array(this.total)).fill('').map((d,i) => (
          chroma.hsl(
            (-hueShift + (i/this.total * 360)) % 360,
            parseFloat(this.startColor[1]),
            parseFloat(this.startColor[2])
          ).hex()
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
      startColor: function () {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.getNewColors();
        }, 150);
      }
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
  z-index: 10;

  min-height: 100vh;
  /* mobile viewport bug fix */
  min-height: -webkit-fill-available;
  pointer-events: none;

  $animationDuration: 160;

  &__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    animation: rotate $animationDuration * 1s infinite linear;
    width: 1px; height: 1px;
  }

  &__card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 50% 50%;
    will-change: transform;
    transition: 1s transform cubic-bezier(0.3,0.7,0,1) 1.3s;
    box-shadow: 0 0 0 0px var(--c-card);
    text-decoration: none;
    --radius: -25rem;
    --radius: -39vw;
    --scale: .75;

    pointer-events: all;

    animation: hide infinite linear;
    animation-duration: $animationDuration * 1s;

    @media (orientation: portrait) {
      --radius: -18rem;
    }

    .is-footer-visible & {
      --radius: -40vmin;
      --scale: .4;
      transition: 300ms transform cubic-bezier(0.3,0.7,0,1);
      //animation: none;
      > * {
        //box-shadow: 0 0rem 4rem var(--color);
      }

      &:hover {
        > * {
          transform: scale(1.9);
        }
      }
    }

    .is-home-ready & {
      @for $i from 1 through 21 {
        &:nth-child(#{$i}) {
          transform: translate(-50%, -50%) rotate(#{($i/21 * 360)}deg) translateY(var(--radius)) scale(var(--scale));
        }
      }
    }

    @for $i from 1 through 21 {
      &:nth-child(#{$i}) {
        transform: translate(-50%, -50%) rotate(#{($i/21 * 360)}deg) translateY(-5rem) scale(.2);
        animation-delay: #{$animationDuration/21 * -$i}s;
      }
    }

    .has-noAnimation & {
      @for $i from 1 through 21 {
        &:nth-child(#{$i}) {
          transform: translate(-50%, -50%) rotate(#{($i/21 * 360)}deg) translateY(var(--radius)) scale(var(--scale));
          animation-delay: 0;
        }
      }
    }

    > * {
      transform: scale(0.95);
      //border: 4px solid #fff;
      transition: 200ms transform, 200ms box-shadow;


      box-shadow: 0 0 2rem var(--c-bg);

      @media (orientation: portrait) {
        transform: scale(0.6);
      }

      @media (prefers-color-scheme: light) {
        box-shadow: 0 1rem 8rem var(--color);
      }
    }

    &:hover {
      z-index: 2;

      > * {
        transform: scale(1.1);
        box-shadow: 0 0rem 5rem var(--color);
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


@keyframes hide {
  0%, 34%, 67.67% {
    opacity: 1;
  }
  37%, 62.67% {
    opacity: 0;
  }

}
</style>
