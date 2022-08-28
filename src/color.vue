<template>
  <div class="color-detail" v-bind:class="{'color-detail--visible': isReady && show}" v-bind:style="{'--color': color}">
    <div class="color-detail__swatch">
      <colorswatch
        v-bind:color="color"
        v-bind:name="currentColor.name"
        v-bind:isVisible="isReady && show"
      ></colorswatch>
    </div>
    <div class="color-detail__story">
      <colorstory
        v-bind:name="currentColor.name"
        v-bind:isVisible="isReady && show"
        v-bind:color="color"
      ></colorstory>
    </div>

    <router-link class="color-detail__close" to="/" aria-label="close">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <title>close</title>
        <line x1="10" y1="10" x2="90" y2="90" />
        <line x1="10" y1="90" x2="90" y2="10" />
      </svg>
    </router-link>
    <!--form
      action="#"
      class="color-detail__mode"
    >
      <select v-model="$store.state.colorMode">
        <option
          v-for="(sort, mode) in $store.state.colorModes"
          v-bind:key="mode"
          v-bind:value="mode"
        >{{sort.label}}</option>
      </select>
    </form-->
  </div>
</template>

<script>
import Vue from "vue";
import colorswatch from './components/color-swatch';
import colorstory from './components/color-story';
import chroma from 'chroma-js';

export default Vue.extend({
  components: {
    colorswatch,
    colorstory,
  },
  metaInfo() {
    return {
      title: this.$store.state.currentColor.name + ': ' + this.$store.state.currentColor.requestedHex,
      meta: [
        { property: 'og:type', content: 'website'},
        { property: 'og:title', content: this.$store.state.currentColor.name + ': ' + this.$store.state.currentColor.requestedHex},
        { property: 'og:description', content: 'All you ever wanted to know about the color ' + this.$store.state.currentColor.name + ' (' + this.$store.state.currentColor.requestedHex + ')'},
        { property: 'og:url', content: `https://parrot.color.pizza/color/${this.$store.state.currentColor.requestedHex.replace('#','')}`},
        { property: 'og:image', content: `https://dummyimage.com/1200x627/${this.$store.state.currentColor.requestedHex.replace('#','')}/fff.png&text=${encodeURI(this.$store.state.currentColor.name)}`},

        { property: 'twitter:card', content: 'summary_large_image'},
        { property: 'twitter:title', content: this.$store.state.currentColor.name + ': ' + this.$store.state.currentColor.requestedHex},
        { property: 'twitter:description', content: 'All you ever wanted to know about the color ' + this.$store.state.currentColor.name + ' (' + this.$store.state.currentColor.requestedHex + ')'},
        { property: 'twitter:url', content: `https://parrot.color.pizza/color/${this.$store.state.currentColor.requestedHex.replace('#','')}`},        { property: 'og:image', content: `https://www.colorbook.io/imagecreator.php?hex=${this.$store.state.currentColor.requestedHex.replace('#','')}&width=1200&height=627`},
        { property: 'twitter:image', content: `https://dummyimage.com/1200x627/${this.$store.state.currentColor.requestedHex.replace('#','')}/fff.png&text=${encodeURI(this.$store.state.currentColor.name)}`},
      ],
    }
  },
  data: function () {
    return {
      show: false,
      timer: null,
    }
  },
  computed: {
    color () {
      return chroma(this.currentColor.requestedHex);
    },
    currentColor () {
      return this.$store.state.currentColor;
    },
    isReady () {
      return this.$store.state.isReady;
    },
  },
  created () {
    console.log(this.$route.params.bestof)
    this.$store.dispatch('GET_COLOR', {
      values: [this.$route.params.color_id],
      goodnamesonly: !!this.$route.params.bestof,
    });
  },
  mounted () {
    window.scrollTo(0, 0);
    this.timer = setTimeout(() => {
      this.show = true;
    }, 100);
  },
  beforeDestroy () {
    this.show = false;
    clearTimeout(this.timer);
  }
});
</script>
<style lang="scss">
.color-detail {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  @media (orientation: portrait) {
    overflow: visible;
  }

  &__close {
    position: absolute;
    color: var(--c-color);
    padding: var(--s-gutter, 2rem);
    top: 0;
    right: 0;

    svg {
      display: block;
      width: 1.8rem;
      height: 1.8rem;
      line {
        stroke: var(--c-color);
        stroke-width: 0px;
        stroke-linecap: round;
        transition: 333ms stroke-width ease-in 1000ms;
      }
    }
  }
}

.color-detail--visible .color-detail__close {
  svg line {
    stroke-width: 8px;
  }
}

.color-detail__swatch,
.color-detail__story {
  position: absolute;
}

.color-detail__swatch {
  z-index: 2;
  opacity: 1;
  width: 20%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (orientation: portrait) {
    top: 50vh;
    width: 40%;
  }


  @media (prefers-color-scheme: light) {
    &::before {
      opacity: 0;
      position: absolute;
      content: '';
      inset: 0;
      box-shadow: 0 1rem 8rem var(--color);
      transition: 1000ms opacity cubic-bezier(.3,.7,0,1);
      transition-delay: 900ms;
      transform: scale(.8);
      .color-detail--visible & {
        opacity: 1;
      }
    }
  }
}

.color-detail--visible .color-detail__swatch {
  left: 70%;
  transition: 1000ms left cubic-bezier(.3,.7,0,1);
  transition-delay: 900ms;

  @media (orientation: portrait) {
    left: 50%;
    top: 30vh;
    transition: 1000ms top cubic-bezier(.3,.7,0,1);
    transition-delay: 900ms;
  }
}

.color-detail__story {
  z-index: 1;

  //--s-label-height: calc((.6rem + 5vmin) * 1.45);
  //height: calc(var(--s-label-height) + 45vw);
  overflow-y: scroll;
  background: var(--c-color);
  color: var(--c-bg);

  left: 0;
  top: 0;
  bottom: 0;
  width: 40%;
  transform: translateX(-110%);
  transition: 600ms transform cubic-bezier(.3,.7,0,1);
  transition-delay: 800ms;

  @media (orientation: portrait) {
    position: relative;
    width: 100%;
    top: 62vh;
    transform: translateY(110%);
    overflow-y: visible;
  }
}
.color-detail--visible .color-detail__story {
  transform: translateX(0%);
}

.color-story__article,
.color-story__properties,
.color-story__header {
  > *:not(img) {
    opacity: 0;
    transform: translateX(50%);
    transition: 600ms transform cubic-bezier(.3,.7,0,1),
                200ms opacity linear;
    transition-delay: 870ms, 970ms;
  }
}

.color-detail--visible .color-story__article,
.color-detail--visible .color-story__properties,
.color-detail--visible .color-story__header {
  > *:not(img) {
    transform: translateX(0%);
    opacity: 1;
  }
}

.color-detail__mode {
  opacity: 0;
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  transform: translateY(6rem);
  transition: 600ms transform cubic-bezier(.3,.7,0,1),
              200ms opacity linear;
  transition-delay: 2000ms, 2000ms;
}

.color-detail--visible .color-detail__mode {
  opacity: 1;
  transform: translateY(0rem);
}

.color-detail__logo {
  display: none;
  position: absolute;
  bottom: 2rem;
  right: calc(40% + 2rem);
  width: 1rem;
  height: 1rem;
}

</style>
