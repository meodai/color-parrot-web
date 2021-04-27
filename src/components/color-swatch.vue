<template>
  <article class="colorswatch" :class="{'colorswatch--visible': isVisible}" v-bind:style="{'--c-swatch': color.hex()}" >
    <div class="colorswatch__swatch">
      <div class="colorswatch__shade" v-bind:style="{backgroundColor: shade0}"></div>
      <div class="colorswatch__shade" v-bind:style="{backgroundColor: shade1}"></div>
      <div class="colorswatch__shade" v-bind:style="{backgroundColor: color.hex()}"></div>
    </div>
    <header class="colorswatch__label">
      <h1 class="colorswatch__row1">
        <span>{{colorValue}}</span>
      </h1>
      <h2 class="colorswatch__row2">
        <span>{{name}}</span>
      </h2>
    </header>
  </article>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      name: String,
      color: Object,
      colorValue: String,
      isVisible: Boolean,
    },
    computed: {
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
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__swatch {
    position: relative;
    padding-top: 100%;
    z-index: 1;
  }

  &__shade {
    position: absolute;
    top: 0; right: 0; bottom: -1px; left: 0;
    transform-origin: 50% 100%;
  }

  &__label {
    position: relative;
    z-index: 2;
    flex-grow: 1;
    background: #fff;
    padding: 0 .5rem;
    color: #212121;
    transform-origin: 50% 0;
    box-shadow: 0 0 0 1px rgba(#000,.05);

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
    font-size: 1.1em;
    height: 1.2em;
    margin-top: 0.45rem;
  }

  &__row2 {
    font-size: .8em;
    font-weight: 300;
    height: calc(.8em * 1.6);
  }
}

// animation


.colorswatch {

  --anim-appear-duration: 1100ms;

  &__label {
    height: 0;
    transition: calc(var(--anim-appear-duration) * 0.2) height cubic-bezier(.7,.3,0,1);
    transition-delay: calc(var(--anim-appear-duration) * 0.3);
    overflow: hidden;
    box-sizing: border-box;
  }
  &__row1,
  &__row2 {
    //opacity: 0;
    transform: translateY(200%);
    transition: calc(var(--anim-appear-duration) * 0.1) opacity linear, calc(var(--anim-appear-duration) * 0.2) height cubic-bezier(.7,.3,0,1), calc(var(--anim-appear-duration) * 0.2) transform cubic-bezier(.7,.3,0,1);
  }
  &__swatch {
    transform: translateY(150%);
    transition: calc(var(--anim-appear-duration) * 0.666) transform cubic-bezier(.8,.3,.25,1.75);
    will-change: transform;
    transform-origin: 50% 0;
  }
  &__shade {
    transform: scaleY(0);

    &:nth-child(1) {
      transition-delay: calc(var(--anim-appear-duration) * 0.2);
    }
    &:nth-child(2) {
      transition-delay: calc(var(--anim-appear-duration) * 0.1);
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
    &__label {
      height: 3.25rem;
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
      transition-delay: calc(var(--anim-appear-delay, 0ms) + var(--anim-appear-duration) * .05),
                        calc(var(--anim-appear-delay, 0ms) + var(--anim-appear-duration) * .05);
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
