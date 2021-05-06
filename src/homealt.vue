
<template>
  <main v-bind:class="{'is-home-ready': isReady}">
    <color-carousel v-bind:color="color"></color-carousel>
    <div class="intro-anim" >
      <div class="intro-anim__inner">
      </div>
    </div>
    <div class="logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
        <path d="M30 170h80v-60a39.8 39.8 0 0 0-5.25-19.81A80 80 0 0 0 30 170z" fill="#f69"/>
        <path d="M80.36 81.34L63 71.34c-.73-.42-1.42-.87-2.1-1.34H20a30 30 0 0 0 30 30h20a10.07 10.07 0 0 1 1.15.07 79.54 79.54 0 0 1 13.28-5.87 10 10 0 0 0-4.07-12.86zM120 140a10 10 0 0 1-10-10v40a30 30 0 0 0 30-30z" fill="#ed0"/>
        <path d="M70 70h-9.06c.68.47 1.37.92 2.1 1.34l17.32 10a10 10 0 0 1 4.07 12.86 79.64 79.64 0 0 1 20.32-4A40 40 0 0 0 70 70z" fill="#5a0"/><path d="M120 70V50c0-.84 0-1.67.11-2.49L114.64 38l-15-26a30 30 0 0 0-12.13 38.83l7.85 4.53a39.86 39.86 0 0 1 18.51 23.86A10 10 0 0 0 120 70z" fill="#19f"/><path d="M98.66 70.36L88.66 53c-.42-.73-.8-1.46-1.15-2.21L78 45.36l-26-15A30 30 0 0 0 60.94 70H70a39.86 39.86 0 0 1 28 11.41 10 10 0 0 0 .66-11.05z" fill="#6c6"/>
        <path d="M114 100.2a40 40 0 0 0-18.64-44.84l-7.85-4.53c.35.74.73 1.48 1.15 2.21l10 17.32A10 10 0 0 1 98 81.41 40 40 0 0 1 108.74 100H110q2 0 4 .2z" fill="#176"/>
        <path d="M120.11 47.51l4.53 7.85a40 40 0 0 1-4.25 46 39.74 39.74 0 0 1 9 3.63A40 40 0 0 0 150 70V20a30 30 0 0 0-29.89 27.51z" fill="#f69"/>
        <path d="M129.37 105a39.81 39.81 0 0 1-19.37 5v20a10 10 0 0 0 10 10h30a40 40 0 0 0-20.63-35z" fill="#19f"/>
        <path d="M110 110a39.81 39.81 0 0 0 19.37-5 39.47 39.47 0 0 0-9-3.63 40 40 0 0 0 4.25-46l-4.53-7.85c-.07.82-.11 1.65-.11 2.49V70a10 10 0 0 1-6.13 9.22 40 40 0 0 1 .17 21s-2.51-.2-4.05-.2h-1.27A39.89 39.89 0 0 1 110 110z" fill="#139"/>
        <circle cx="87.5" cy="127.5" r="7.5" fill="#fff"/>
      </svg>
    </div>
    <strong class="turnerlogo">
      <span>
        <i>c</i><i>o</i><i>l</i><i>o</i><i>r</i>
        <i>&nbsp;</i>
        <i>p</i><i>a</i><i>r</i><i>r</i><i>o</i><i>t</i>
        <i>&nbsp;</i>
        <i>e</i><i>x</i><i>t</i><i>r</i><i>a</i><i>o</i><i>r</i><i>d</i><i>i</i><i>n</i><i>a</i><i>r</i><i>y</i>
      </span>
    </strong>
    <strong class="turnerlogo turnerlogo--top">
      <span>
        <i>c</i><i>o</i><i>l</i><i>o</i><i>r</i>
        <i>&nbsp;</i>
        <i>p</i><i>a</i><i>r</i><i>r</i><i>o</i><i>t</i>
        <i>&nbsp;</i>
        <i>e</i><i>x</i><i>t</i><i>r</i><i>a</i><i>o</i><i>r</i><i>d</i><i>i</i><i>n</i><i>a</i><i>r</i><i>y</i>
      </span>
    </strong>
    <blabla>

    </blabla>

  </main>
</template>

<script>
import Vue from "vue";

import colorCarousel from './components/color-carousel.vue';
import blabla from './components/blabla.vue';

export default Vue.extend({
  components: {
    colorCarousel,
    blabla,
  },
  data() {
    return {
      color: '#fff',
      isReady: false,
      startColor: [0,1,1],
    }
  },
  computed: {
  },
  methods: {
    changeColor: function (color) {
      this.color = color;
    }
  },
  mounted () {
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.isReady = true;
    }, 500);
  },
});
</script>
<style lang="scss">
  :root {
    overflow-x: hidden;
  }

  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10vw;
    transform: translate(-50%, -50%);
    //background: #fff;
    border-radius: 50%;
    padding: 1.5rem;
    z-index: 10;
  }

  .turnerlogo {
    pointer-events: none;
    user-select: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    font-weight: 100;
    font-size: 1.5rem;

    &--top {
      color: #212121;
      z-index: 30;
      font-weight: 700;

      .is-home-ready & {
        transition: opacity .1s linear 1.3s;
        opacity: 0;
      }
    }

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);

      animation: rotate 40s infinite linear;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;

      @for $i from 1 to 27 {
       &:nth-child(#{$i}) {
         transform: translate(-50%,-50%) rotate($i/27 * 360deg - 90deg) translateY(-7rem);
       }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .intro-anim {
    pointer-events: none;
    opacity: 1;
    z-index: 20;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 150vmax;
    height: 150vmax;
    overflow: hidden;

    transform: translate(-50%, -50%);
    transition: transform 2.5s cubic-bezier(.8,.3,.25,1.4), opacity .1s linear 1.3s;
    will-change: transform, opacity;

    .is-home-ready & {
      opacity: 0;
      transform: translate(-50%, -50%) scale(.01);
    }

    &__inner {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      border-radius: 50%;

      background:
        radial-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 50%),
        conic-gradient(hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%));

      transform: translate(-50%, -50%);
    }
  }
</style>
