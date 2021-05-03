
<template>
  <div class="color-detail" v-bind:class="{'color-detail--visible': isReady && show}">
    <div class="color-detail__swatch">
      <colorswatch
        v-bind:color="color"
        v-bind:colorValue="currentColor.requestedHex"
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
}

.color-detail--visible .color-detail__swatch {
  left: 30%;
  transition: 1000ms left cubic-bezier(.3,.7,0,1);
  transition-delay: 900ms;
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

</style>
