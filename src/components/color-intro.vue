<template>
  <section class="picker-section" ref="wrap">
    <div class="picker-section__background">
      <span v-for="c,i in colors" v-bind:key="c.hex" v-bind:style="{'color': c.hex}">{{c.name}}</span>
    </div>
    <div class="picker-section__cards">
      <div class="picker-section__content">
        <!--div class="picker-section__text">
          <h2 class="picker-section__title">Looking for a fitting color-name?</h2>
          <p>
            This curated and ever growing list helps creators to come up with fitting colors names.
            The site showcases a currated subset of names and provides some exploring and seaching tools for
            authors of all kind.
          </p>
        </div-->
      </div>
    </div>

  </section>
</template>

<script>
  import Vue from 'vue';
  import chroma from 'chroma-js';
  import colorCard from './color-card.vue';

  export default Vue.extend({
    components: {
      colorCard
    },
    props: [],
    data: () => {
      return {
        colors: [],
        exampleColorLength: 55,
        currentColor: "",
        color: "",
        bb: {},
        freeze: false,
        botton: Infinity,
      }
    },
    methods: {
      changeColor: function (color) {
        this.currentColor = color;

        let colorScale = chroma.scale([color, chroma(color).set('hsl.h', '+100').hex()]).mode('lch').colors(this.exampleColorLength);
        //(new Array(this.exampleColorLength)).fill(color)
        this.colors = this.$store.getters.namedColors(
          colorScale
        , true);
      },
      measure: function () {
        this.bb = this.$refs.wrap.getBoundingClientRect();
        this.bottom = document.documentElement.scrollTop + this.bb.bottom;
      },
      scroll: function (e) {
        requestAnimationFrame(() => {
          const shouldFreeze = document.documentElement.scrollTop + (window.innerHeight * .5) > this.bottom;

          console.log(shouldFreeze)
          if ( this.freeze !== shouldFreeze ) {
            this.$store.commit('freezeWheel', shouldFreeze);
            this.freeze = shouldFreeze;
          }
        });
      },
    },
    mounted: function () {
      this.changeColor('#ffffff');

      this.$store.subscribe(change => {
        if( change.type === 'setColor' ) {
          this.changeColor(change.payload);
        }
      }, { prepend: true });


      this.measure();
      window.addEventListener('resize', this.measure);
      window.addEventListener('scroll', this.scroll);

    },
  });
</script>

<style lang="scss">

.picker-section {
  padding-top: 4rem;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.picker-section__content {
  position: fixed;
  padding: 1rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.picker-section__title {
  font-size: 1rem;
}
.picker-section__text {
  padding-top: 3rem;
  color: #fff;
  width: 24rem;
  font-weight: 900;
}

.picker-section__background {
  pointer-events: none;
  user-select: none;
  position: absolute;
  top: 0rem;
  right: -5rem;
  left: -5rem;
  bottom: 0rem;

  overflow: hidden;

  font-size: 3rem;
  font-weight: 900;
  word-break: break-all;

  &::after {
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
  //     background: linear-gradient( rgba(21,21,21,0) 0%, rgba(21,21,21,1) 80%);

  }

  background: linear-gradient( rgba(21,21,21,0) 0%, rgba(21,21,21,1) 50%, rgba(21,21,21,1) 60%);

  span {
    margin-right: .75em;
  }
}

.picker-section__cards {
  &::after {
    content: '';
    z-index: -1;
    background: #212121;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}

.picker-section__card {
  width: auto;
  justify-self: stretch;
  align-self: stretch;
  //height: 9.2rem;
}

</style>
