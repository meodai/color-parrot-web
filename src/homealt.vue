
<template>
  <div v-bind:class="{'is-home-ready': isReady}">
    <color-carousel v-bind:color="color"></color-carousel>
    <div class="intro-anim" >
      <div class="intro-anim__inner">
      </div>
    </div>
    <div class="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 180 180"
      >
        <defs>
          <path vector-effect="non-scaling-stroke" id="crest-feather" d="M70 70H20a30 30 0 0 0 30 30h20a10 10 0 0 1 9.22 6.13A40 40 0 0 1 110 110a40 40 0 0 0-40-40z"/>
        </defs>
        <path vector-effect="non-scaling-stroke" class="top-beak" fill="#19F" d="M70 140a40 40 0 0 1 80 0z"/>
        <use class="crest crest__gold" xlink:href="#crest-feather" fill="#ED0"/>
        <use class="crest crest__green" xlink:href="#crest-feather" fill="#6C6" transform="rotate(30 110 110)"/>
        <use class="crest crest__blue" xlink:href="#crest-feather" fill="#19F" transform="rotate(60 110 110)"/>
        <use class="crest crest__pink" xlink:href="#crest-feather" fill="#F69" transform="rotate(90 110 110)"/>
        <path vector-effect="non-scaling-stroke" class="head" fill="#F69" d="M30 170h80v-60a39.8 39.8 0 0 0-5.25-19.81A80 80 0 0 0 30 170z"/>
        <circle class="eye" fill="#FFF" cx="87.5" cy="127.25" r="7.5"/>
        <path vector-effect="non-scaling-stroke" class="top-beak" fill="#ED0" d="M120 140a10 10 0 0 1-10-10v40a30 30 0 0 0 30-30z"/>
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
    <blabla></blabla>
  </div>
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

    path {
      stroke: #fff;
      stroke-width: 2px;
    }

    .crest {
      mix-blend-mode:multiply;
      transform-origin: 110px 110px;
      transform: rotate(0deg);
      animation: 1000ms standup forwards cubic-bezier(.3,.7,0,1);
      animation-play-state: paused;
      animation-delay: 1200ms;
    }

    .crest__gold {
      --angle: 0deg;
      transform: rotate(-50deg);
    }
    .crest__green {
      --angle: 30deg;
      transform: rotate(-50deg);
    }
    .crest__blue {
      --angle: 60deg;
      transform: rotate(-30deg);
    }
    .crest__pink {
      --angle: 90deg;
      transform: rotate(-10deg);
    }

    .is-home-ready & {
      .crest {
        animation-play-state: running;
        &:hover {
          transition: 400ms transform ease-in-out;
          animation: none;
        }
      }
    }
  }

  .turnerlogo {
    pointer-events: none;
    user-select: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    font-weight: 200;
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

  @keyframes standup {
    100% {
      transform: rotate(var(--angle));
    }
  }
</style>
