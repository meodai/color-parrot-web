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
    <div class="colorswatch__upper">
      <i aria-hidden class="colorswatch__swatch">
        <i class="colorswatch__shade"></i>
        <i class="colorswatch__shade"></i>
        <i class="colorswatch__shade"></i>
      </i>
      <aside
        v-bind:aria-label="name + ' represented in color other models'"
        class="colorswatch__formats"
        v-bind:class="{'colorswatch__formats--open': showFormats}"
      >
        <ul>
          <template
            v-for="(sort, mode) in $store.state.colorModes"
          >
            <li
              v-if="mode !== $store.state.colorMode"
              v-bind:key="mode"
              v-on:click="($store.state.colorMode = mode) && toggleFormats()"
            >
              <span>{{sort.label}}</span>
              <strong>{{sort.fn(color)}}</strong>
            </li>
          </template>
        </ul>
      </aside>
    </div>
    <div class="colorswatch__label">
      <header class="colorswatch__info" v-on:click="toggleFormats">
        <h2 class="colorswatch__row1">{{colorValue}}</h2>
        <h1 class="colorswatch__row2">{{name}}</h1>
      </header>
    </div>
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
    data: function () {
      return {
        showFormats: false,
      }
    },
    methods: {
      toggleFormats: function () {
        this.showFormats = !this.showFormats;
      }
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
  position: relative;
  --s-label-height: 1.46em;

  font-size: calc(.6rem + 5vmin);
  font-size: 4.1vw;

  @media (orientation: portrait) {
    font-size: calc(.6rem + 5vmin);
    font-size: 8vw;
  }

  cursor: pointer;
  overflow: hidden;

  .colorswatch__upper {
    position: relative;
    padding-top: 100%;
    overflow: hidden;
  }

  &__swatch {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    overflow: hidden;
  }

  &__shade {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
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

  &__formats {
    --toggle-speed: 400ms;
    position: absolute;
    padding: 0.45em .3em var(--s-label-height);
    background: #fff;
    color: #212121;
    left: 0; bottom: 1px; right: 0;
    top: 103%;
    transition: var(--toggle-speed) top cubic-bezier(.7,.3,0,1);
    perspective: 600;

    li {
      opacity: 0;
      transition: 200ms opacity linear, 230ms transform cubic-bezier(.3,.7,0,1);

      transform: translateY(-200%);
      transform-origin: 50% 100% 0;

      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 20ms, $i * 30ms;
        }
      }
    }

    &--open {
      top: 1.07em;

      li {
        opacity: 1;
        transform: translateY(0%);
        transition: 200ms opacity linear, 240ms transform cubic-bezier(.3,.7,0,1);

        @for $i from 1 through 5 {
          &:nth-child(#{$i}) {
            transition-delay: 360ms - $i * 55ms, 350ms - $i * 50ms;
          }
        }

      }
    }

    overflow: hidden;
    z-index: 1;

    ul {
      position: absolute;
      bottom: 1px;
      left: 0.35em;
      right: 0.35em;
    }

    li + li {
      margin-top: .20em;
    }

    span, strong {
      display: block;
    }

    span {
      font-size: .2em;
    }
    strong {
      font-weight: 700;
      font-size: 0.27em;
      line-height: 1;

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
      border-bottom: none;
      pointer-events: none;
    }

  }

  &__label {
    position: relative;
    height: var(--s-label-height);
    z-index: 2;
    margin-top: -1px;
  }

  &__info {
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    bottom: 0;
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
    text-transform: uppercase;

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
