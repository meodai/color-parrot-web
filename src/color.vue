<template>
  <div class="color-detail" v-bind:class="{'color-detail--visible': isReady && show}">
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
    <form
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
    </form>
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
  watch: {},
  methods: {
    urlToColors: function () {

    },
  },
  created () {
    this.$store.dispatch('GET_COLOR', {
      values: [this.$route.params.color_id],
      goodnamesonly: false,
    });
  },
  mounted () {
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
    overflow: auto;
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
}

.color-detail--visible .color-detail__swatch {
  left: 30%;
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
  background: #fff;
  color: #001;

  right: 0;
  top: 0;
  bottom: 0;
  width: 40%;
  transform: translateX(110%);
  transition: 600ms transform cubic-bezier(.3,.7,0,1);
  transition-delay: 800ms;

  @media (orientation: portrait) {
    position: relative;
    width: 100%;
    top: 62vh;
    transform: translateY(110%);
  }
}
.color-detail--visible .color-detail__story {
  transform: translateX(0%);
}

.color-story__article {
  > *:not(img) {
    opacity: 0;
    transform: translateX(50%);
    transition: 600ms transform cubic-bezier(.3,.7,0,1),
                200ms opacity linear;
    transition-delay: 870ms, 970ms;
  }
}

.color-detail--visible .color-story__article {
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
