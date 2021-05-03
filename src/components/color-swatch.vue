<template>
  <article
    class="colorswatch"
    :class="{
      'colorswatch--visible': isVisible,
    }"
    v-bind:style="{
      '--c-color': color.hex(),
      '--c-shade0': shade0,
      '--c-shade1': shade1,
    }"
  >
    <i aria-hidden class="colorswatch__swatch">
      <i class="colorswatch__shade"></i>
      <i class="colorswatch__shade"></i>
      <i class="colorswatch__shade"></i>
    </i>
    <header class="colorswatch__label">
      <div class="colorswatch__info">
        <h2 class="colorswatch__row1">{{colorValue}}</h2>
        <h1 class="colorswatch__row2">{{name}}</h1>
      </div>
    </header>
  </article>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      name: String,
      color: Object,
      isVisible: Boolean,
    },
    computed: {
      colorValue: function () {
        return this.$store.state.colorModes[this.$store.state.colorMode].fn(this.color);
      },
      lum: function () {
        return this.color.luminance();
      },
      shade0: function () {
        if (this.lum < .5) {
          return this.color.brighten(1.5);
        } else {
          return this.color.darken(1.5);
        }
      },
      shade1: function () {
        if (this.lum < .5) {
          return this.color.brighten(.75);
        } else {
          return this.color.darken(.75);
        }
      },
    },
  });
</script>

<style lang="scss">

.colorswatch {
  --s-label-height: 1.46em;

  font-size: calc(.6rem + 5vmin);
  cursor: pointer;
  overflow: hidden;

  &__swatch {
    display: block;
    position: relative;
    padding-top: calc(100% + 1px);
    z-index: 1;
    overflow: hidden;
  }

  &__shade {
    position: absolute;
    top: 0; right: 0; bottom: -1px; left: 0;
    transform-origin: 50% 100%;

    &:nth-child(1) {
      background-color: var(--c-shade0);
    }
    &:nth-child(2) {
      background-color: var(--c-shade1);
    }
    &:nth-child(3) {
      background-color: var(--c-color);
    }
  }

  &__label {
    position: relative;
    height: var(--s-label-height);
    z-index: 2;
    margin-top: -1px;
    background: #212121;
  }

  &__info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 0 .3em;
    color: #212121;
    transform-origin: 50% 0;

    span  {
      display: block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: .4rem solid #fff;
      pointer-events: none;
    }
  }

  &__row1 {
    font-weight: 700;
    font-size: .55em;
    height: 1.2em;
    line-height: 1.2;
    margin-top: 0.45em;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__row2 {
    margin-top: -0.05em;
    font-size: .27em;
    font-weight: 300;
    line-height: 1.2;
    height: 1.2em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

// animation
.colorswatch {
  --anim-appear-duration: 1100ms;

  &__info {
    height: 0;
    transition: calc(var(--anim-appear-duration) * 0.2) height cubic-bezier(.7,.3,0,1);
    transition-delay: calc(var(--anim-appear-duration) * 0.15);
    overflow: hidden;
    box-sizing: border-box;
    will-change: height;
  }
  &__row1,
  &__row2 {
    opacity: 0;
    transform: translateY(200%);
    transition: calc(var(--anim-appear-duration) * 0.1) opacity linear,
                calc(var(--anim-appear-duration) * 0.2) transform cubic-bezier(.7,.3,0,1);
  }
  &__row1 {
    transition-delay: calc(var(--anim-appear-duration) * 0.05);
  }
  &__swatch {
    transform: translateY(150%);
    transition: calc(var(--anim-appear-duration) * 0.666) transform cubic-bezier(.8,.3,.25,1.75);
    will-change: transform;
  }
  &__shade {
    transform: scaleY(0);
    transition: calc(var(--anim-appear-duration) * 0.2) transform ease-in;

    &:nth-child(1) {
      transition-delay: calc(var(--anim-appear-duration) * 0.06);
    }
    &:nth-child(2) {
      transition-delay: calc(var(--anim-appear-duration) * 0.03);
    }
    &:nth-child(3) {
      transition-delay: calc(var(--anim-appear-duration) * 0);
    }
  }
}



.colorswatch {
  @for $i from 1 through 9 {
    &:nth-child(#{$i}) {
        --anim-appear-delay: #{$i * 75ms};
    }
  }

  .colorswatch--visible & {
    &__info {
      height: var(--s-label-height);
      transition: calc(var(--anim-appear-duration) * .6) height cubic-bezier(.7,.3,0,1);
      transition-delay: var(--anim-appear-delay, 0ms);
    }
    &__row1,
    &__row2 {
      opacity: 1;
      transform: translateY(0%);
      transition: calc(var(--anim-appear-duration) * .05) opacity linear,
                  calc(var(--anim-appear-duration) * .7) height cubic-bezier(.8,.3,.25,1),
                  calc(var(--anim-appear-duration) * .7) transform cubic-bezier(.8,.3,.25,1);

      transition-delay: calc(var(--anim-appear-delay, 0ms) + var(--anim-appear-duration) * 0ms),
                        calc(var(--anim-appear-delay, 0ms) + var(--anim-appear-duration) * 0ms);
      transform-origin: 0 0;

    }
    &__row2 {
      transition-delay: calc(var(--anim-appear-delay, 0ms) + var(--anim-appear-duration) * .15),
                        calc(var(--anim-appear-delay, 0ms) + var(--anim-appear-duration) * .15);
    }
    &__swatch {
      transform: translateY(0);
      transition: calc(var(--anim-appear-duration) * 0.566) transform cubic-bezier(.8,.3,.25,1);
      will-change: transform;
      transform-origin: 50% 0;
      transition-delay: var(--anim-appear-delay, 0ms);
    }
    &__shade {
      transition: calc(var(--anim-appear-duration) * 0.666) transform cubic-bezier(.7,.3,0,1);
      transform: scaleY(1);

      &:nth-child(1) {
        transition-delay: calc(var(--anim-appear-delay, 0ms) + var(--anim-appear-duration) * 0);
      }
      &:nth-child(2) {
        transition-delay: calc(var(--anim-appear-delay, 0ms) + var(--anim-appear-duration) * 0.1);
      }
      &:nth-child(3) {
        transition-delay: calc(var(--anim-appear-delay, 0ms) + var(--anim-appear-duration) * 0.2);
      }
    }
  }
}

</style>
