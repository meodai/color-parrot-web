
<template>
  <div v-bind:class="{'is-home-ready': isReady, 'is-footer-visible': footerVisible, 'has-noAnimation': noanimation}">
    <color-carousel v-bind:startColor="startColor" v-bind:color="color" v-bind:noanimation="noanimation"></color-carousel>
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
          <path id="crest-feather" d="M70 70H20a30 30 0 0 0 30 30h20a10 10 0 0 1 9.22 6.13A40 40 0 0 1 110 110a40 40 0 0 0-40-40z"/>
        </defs>
        <path class="top-beak" fill="#19F" d="M70 140a40 40 0 0 1 80 0z"/>
        <use class="crest crest__gold" xlink:href="#crest-feather" fill="#ED0"/>
        <use class="crest crest__green" xlink:href="#crest-feather" fill="#6C6" transform="rotate(30 110 110)"/>
        <use class="crest crest__blue" xlink:href="#crest-feather" fill="#19F" transform="rotate(60 110 110)"/>
        <use class="crest crest__pink" xlink:href="#crest-feather" fill="#F69" transform="rotate(90 110 110)"/>
        <path class="head" fill="#F69" d="M30 170h80v-60a39.8 39.8 0 0 0-5.25-19.81A80 80 0 0 0 30 170z"/>
        <circle class="eye" fill="#FFF" cx="87.5" cy="127.25" r="7.5"/>
        <path class="top-beak" fill="#ED0" d="M120 140a10 10 0 0 1-10-10v40a30 30 0 0 0 30-30z"/>
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
    <div ref="footer" class="footer">
      <div class="footer__logo">
        <div class="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 180 180"
          >
            <defs>
              <path id="crest-feather" d="M70 70H20a30 30 0 0 0 30 30h20a10 10 0 0 1 9.22 6.13A40 40 0 0 1 110 110a40 40 0 0 0-40-40z"/>
            </defs>
            <path class="top-beak" fill="#19F" d="M70 140a40 40 0 0 1 80 0z"/>
            <use class="crest crest__gold" xlink:href="#crest-feather" fill="#ED0"/>
            <use class="crest crest__green" xlink:href="#crest-feather" fill="#6C6" transform="rotate(30 110 110)"/>
            <use class="crest crest__blue" xlink:href="#crest-feather" fill="#19F" transform="rotate(60 110 110)"/>
            <use class="crest crest__pink" xlink:href="#crest-feather" fill="#F69" transform="rotate(90 110 110)"/>
            <path class="head" fill="#F69" d="M30 170h80v-60a39.8 39.8 0 0 0-5.25-19.81A80 80 0 0 0 30 170z"/>
            <circle class="eye" fill="#FFF" cx="87.5" cy="127.25" r="7.5"/>
            <path class="top-beak" fill="#ED0" d="M120 140a10 10 0 0 1-10-10v40a30 30 0 0 0 30-30z"/>
          </svg>
        </div>
      </div>

      <form class="footer__form" action="#">
        <label>
          <span>saturation</span>
          <input type="range" min="0" max="1" step="0.001" v-model="startColor[1]">
        </label>
        <label>
          <span>light</span>
          <input type="range" min="0" max="1" step="0.001" v-model="startColor[2]">
        </label>
        <label>
          <span>hue start</span>
          <input type="range" min="0" max="1" step="0.001" v-model="startColor[0]">
        </label>
      </form>
    </div>
    <!--img class="footerimg" src="../public/parrot_nobr.png" alt="Color Parrot Logo on a Desk" /-->
  </div>
</template>

<script>
import Vue from "vue";

import colorCarousel from './components/color-carousel.vue';
import blabla from './components/blabla.vue';

let lastKnownTop = 0;

export default Vue.extend({
  components: {
    colorCarousel,
    blabla,
  },
  data() {
    return {
      color: '#fff',
      isReady: false,
      startColor: [0, 1, .53],
      footerVisible: false,
      noanimation: false,
    }
  },
  computed: {
  },
  methods: {
    changeColor: function (color) {
      this.color = color;
    },
    handleScroll: function () {
      lastKnownTop = window.scrollY;
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from && from.path !== '/') {
      next(vm => {
        vm.noanimation = true;
      });
    } else {
      next();
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted () {
    if (this.noanimation) {
      this.isReady = true;
      console.log(this.lastKnownTop, 'lastKnownTop');
      window.scrollTo(0, lastKnownTop);
    } else {
      setTimeout(() => {
        window.scrollTo(0, 0);
        this.isReady = true;
      }, 500);
    }

    window.addEventListener('scroll', this.handleScroll);

    let options = {
      rootMargin: '0px',
      threshold: .75
    }

    let observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.footerVisible = true;
        } else {
          this.footerVisible = false;
        }
      });
    }, options);

    observer.observe(this.$refs.footer)
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

    @media (orientation: portrait) {
      width: 10vmax;
    }


    path, use {
      stroke: #fff;
      stroke-width: 5px;
    }

    .crest {
      mix-blend-mode:multiply;
      transform-origin: 110px 110px;
      transform: rotate(0deg);
      animation: 1000ms standup forwards cubic-bezier(.3,.7,0,1);
      animation-play-state: paused;
      animation-delay: 1200ms;

      .has-noAnimation & {
        animation-delay: 200ms;
        animation-play-state: running;
      }
    }


    .crest__gold {
      //fill: #ffdd0f;
      --angle: 0deg;
      transform: rotate(-50deg);
    }
    .crest__green {
      //fill: #ddff0f;
      --angle: 30deg;
      transform: rotate(-50deg);
    }
    .crest__blue {
      //fill: #0f98ff;
      --angle: 60deg;
      transform: rotate(-30deg);
    }
    .crest__pink {
      //fill: #ff0f54;
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
      .has-noAnimation & {
        display: none;
        animation-play-state: paused;
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

  .has-noAnimation .intro-anim {
    display: none;
  }

  @keyframes standup {
    100% {
      transform: rotate(var(--angle));
    }
  }

  .footerimg {
    position: relative;
    z-index: 100;
    width: 100%;
    bottom: -2rem;
    pointer-events: none;
  }

  .footer {
    height: 100vh;
    position: relative;
  }

  .footer__form {
    z-index: 10;
    position: absolute;
    bottom: 3.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: .7rem;
    text-align: center;
    width: 20%;

    @media (orientation: portrait) {
      width: 50%;
    }

    label {
      display: block;
      margin-top: 1em;
    }
  }



  .footer {
    --color-inverted: #fff;
    --c-black: #212121;
    input {
      background-color: transparent;
      width: 100%;
    }
    input[type=range],
    input[type=color] {
      -webkit-appearance: none;
    }

    // range sliders
    input[type=range] {
      margin: 0;
      padding-top: 0.7em;
      margin-top: -0.7em;
    }

    input[type=range]:focus {
      outline: none;

      &::-webkit-slider-thumb {
        //height: .65rem;
        background-color: var(--color-inverted);
        clip-path: polygon(100% 0%, 0% 0%, 50% 100%, 50% 100%);
        //clip-path: polygon(50% 0%, 50% 0%, 0% 100%, 100% 100%);
      }
    }

    @mixin slider-track {
      width: 100%;
      height: 1rem;
      animate: 0.2s;
      background: transparent;
      color: var(--c-black);
      border-radius: 0;
      border: solid var(--color-inverted);
      border-width: 0 0 1px;
    }

    @mixin slider-thumb {
      border: 2px solid transparent;
      height: .75rem;
      width: .5rem;
      border-radius: 0;
      background: var(--color-inverted);
      -webkit-appearance: none;
      margin-top: 0.25rem;
      transition: 150ms background-color, 200ms clip-path, 200ms -webkit-clip-path;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    input[type=range]::-webkit-slider-runnable-track {
      @include slider-track;
    }

    input[type=range]::-webkit-slider-thumb {
      @include slider-thumb;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
      //background: $c-black;
    }

    input[type=range]::-moz-range-track {
      @include slider-track;
    }

    input[type=range]::-moz-range-thumb {
      @include slider-thumb;
    }

    input[type=range]::-ms-track {
      @include slider-track;
    }

    input[type=range]::-ms-fill-lower {
      background: var(--color-inverted);
      border: none;
      border-radius: 100%;
    }

    input[type=range]::-ms-fill-upper {
      background: var(--color-inverted);
      border-radius: 100%;
      box-shadow: none;
    }

    input[type=range]::-ms-thumb {
      @include slider-thumb;
    }

    input[type=range]:focus::-ms-fill-lower {
      //background: $c-black;
    }

    input[type=range]:focus::-ms-fill-upper {
      //background: $c-black;
    }

  }
</style>
