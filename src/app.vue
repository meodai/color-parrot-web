
<template>
  <main class="app" v-bind:class="{'is-ready': isReady}">
    <h1 class="palette__title">{{paletteName}}</h1>
    <span aria-hidden class="palette__title palette__title--placeholder">{{paletteName}}</span>
    <aside aria-label="options" class="pannel">
      <!--label class="pannel__setting pannel__setting--inline">
        <input type="checkbox" v-model="show" />
        <i class="pannel__checkbox"></i>
        <strong class="pannel__settingtitle">Show</span>
      </label-->

      <label class="pannel__setting">
        <strong class="pannel__settingtitle">Sorting</strong>
        <div class="pannel__inputs">
          <select v-model="sort">
            <option value="">Default</option>
            <option value="magic">Magic</option>
            <option value="luminance">Luminance</option>
          </select>
        </div>
      </label>

      <label class="pannel__setting">
        <strong class="pannel__settingtitle">Color Values</strong>
        <div class="pannel__inputs">
          <select v-model="colorDisplayMode">
            <option value="hex">hex</option>
            <option value="rgb">rgb</option>
            <option value="hsl">hsl</option>
            <option value="lab">lab</option>
            <option value="cmyk">cmyk</option>
          </select>
        </div>
      </label>

      <label class="pannel__setting pannel__setting--inline">

        <input type="checkbox" v-model="goodnamesonly" />
        <i class="pannel__checkbox"></i>
        <strong class="pannel__settingtitle">Better color-names</strong>
      </label>


      <button @click="newRandomColors">new colors</button>
    </aside>

    <section class="swatches">
      <colorswatch
        v-for="(c, i) in colorNames"
        v-bind:key="i"
        v-bind:color="sortedColors[i]"
        v-bind:colorValue="colorValue(sortedColors[i])"
        v-bind:name="c.name"
        v-bind:isVisible="show"
      ></colorswatch>
    </section>
    <color3d v-bind:colors="colors">
    </color3d>
    <colorgradient v-bind:colors="sortedColors">
    </colorgradient>
  </main>
</template>

<script>
import chroma from 'chroma-js';
import Vue from "vue";
import colorswatch from './components/color-swatch';
import color3d from './components/color-3d';
import colorgradient from './components/color-gradient';

const sorts = {
  'magic': colors => colors.sort((a, b) => (b.luminance() - a.luminance()) - (b.hcl()[0] - a.hcl()[0])),
  'luminance': colors => colors.sort((a, b) => (b.luminance() - a.luminance())),
};

export default Vue.extend({
  components: {
    colorswatch,
    color3d,
    colorgradient
  },
  data() {
    return {
      colors: [
        chroma.random(),
        chroma.random()
      ],
      colorDisplayMode: 'hex',
      show: false,
      goodnamesonly: false,
      colorNames: [],
      isReady: false,
      sort: ''
    }
  },
  computed: {
    paletteName: function getNamePart(name1, name2) {
      if (!this.namesSortedByLum.length) return '';
      const first = this.namesSortedByLum[0].name.match(/[^\s-]+-?/g)[0];
      const last = this.namesSortedByLum[this.namesSortedByLum.length - 1].name.match(/[^\s-]+-?/g);
      return `${first} ${last[last.length - 1]}`;
    },
    colorsHex: function () {
      return this.sortedColors.map(c => c.hex());
    },
    namesSortedByLum: function () {
      return [...this.colorNames].sort((a,b) => chroma(b.requestedHex).luminance() - chroma(a.requestedHex).luminance() )
    },
    sortedColors: function () {
      if (sorts.hasOwnProperty(this.sort)) {
        return sorts[this.sort]([...this.colors]);
      } else {
        return this.colors;
      }
    },
  },
  watch: {
    sort: function () {
      this.fetchNames();
    },
    goodnamesonly: function () {
      this.fetchNames();
    }
  },
  methods: {
    urlToColors: function () {
      if( window.location.hash ) {
        let hashStr = window.location.hash;
        hashStr = hashStr.substring(1);
        const rawColors = hashStr.split('-');

        this.colors = rawColors
          .map(rawColor => chroma.valid('#' + rawColor) && chroma('#' + rawColor))
          .filter(c => c);
      }

      if ( !window.location.hash || !this.colors.length) {
        this.colors = [
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
        ]
      }
    },
    newRandomColors: function () {
      this.show = false;

      setTimeout(() => {
        this.colors = [
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
          chroma.random(),
        ];
        this.fetchNames();
      }, 500);

    },
    colorValue: function(color) {
      let colorValue = color[this.colorDisplayMode]();

      if ( this.colorDisplayMode === 'hsl') {
        colorValue.pop();
        colorValue = colorValue.reduce((r,v,i) => `${r} ${i ? Math.floor(v * 100) + '%' : Math.floor(v) + '°'}`,'');
      } else if (this.colorDisplayMode === 'lab') {
        colorValue = colorValue.reduce((r,v,i) => `${r} ${Math.floor(v)}`,'');
      } else if (this.colorDisplayMode === 'cmyk') {
        colorValue = colorValue.reduce((r,v,i) => `${r} ${Math.floor(v * 100)}°`,'');
      } else if (this.colorDisplayMode === 'rgb') {
        colorValue = colorValue.reduce((r,v,i) => `${r} ${v}`,'');
      }
      return colorValue;
    },
    fetchNames: function() {
      const url = new URL('https://api.color.pizza/v1/');

      const params = {
        values: this.colorsHex.map(c => c.replace('#', '')),
        goodnamesonly: this.goodnamesonly,
        noduplicates: true,
      }

      url.search = new URLSearchParams(params).toString();

      fetch(url)
      .then(response => response.json())
      .then(data => {
        this.isReady = true;
        setTimeout(() => {
          this.show = true;
        }, 200);
        this.colorNames = Object.freeze(data.colors);
      });
    }
  },
  mounted () {
    this.urlToColors();
    this.fetchNames();
  },
});
</script>
<style lang="scss">

html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}

:root {
  font-family: Inter, sans-serif;
  font-size: calc(0.7rem + 0.8vw);

  --c-bg: #212121;
  --c-color: #fff;

  --s-gutter: 3rem;

  background: var(--c-bg);
  color: var(--c-color);
}

body, html {
  line-height: 1.4;
}

body {
  padding-right: calc(12rem + 2rem);
}

h1,
h2,
h3,
legend {
  font-weight: 900;
  line-height: 1.2;

}


/*@media (max-width:500px) {

}*/

input {
  font-family: Inter, sans-serif;
}

.swatches {
  display: flex;
  flex-wrap: wrap;
  margin: 0 calc(var(--s-gutter) - 1rem) var(--s-gutter);
  align-content: center;
  justify-content: center;

  .colorswatch {
    flex: 0 0 calc(33.333% - 2rem);
    margin: 1rem;
  }
}

.palette__title {
  font-size: 5rem;
  position: fixed;
  top: var(--s-gutter);
  left: var(--s-gutter);
  font-weight: 900;
  padding-right: calc(12rem + 2rem);
  line-height: 1;

  &--placeholder {
    opacity: 0;
    display: block;
    position: relative;
    margin-top: 0;
    margin-left: 0;
    padding-bottom: .75em;
    padding-right: 2rem;
  }
}

.app {
  //padding-top: calc(3rem + var(--s-gutter) * 2);
}


.pannel {
  z-index: 3;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 12rem;

  --color-bg: #212121;
  --color-inverted: #fff;
  --size-gutter: 0.5rem;

  padding: calc(var(--size-gutter) * 2);
  padding-top: calc(var(--s-gutter) + var(--size-gutter));
  padding-right: var(--s-gutter);
  background: var(--color-bg);
  //backdrop-filter: blur(5px);

  display: block;
  cursor: default;

  color: var(--color-inverted);


  input[type=checkbox] {
    display: none;
  }

  input[type=checkbox]:checked + &__checkbox {
    &::after {
      opacity: 1;
      transform: translate(-55%, -50%) scale(.8);
    }
  }

  &__checkbox {
    position: relative;
    display: inline-block;
    width: .8em;
    height: .8em;
    border: 1px solid var(--color-inverted);
    margin-top: -0.2em;

    &::after {
      opacity: 0;
      content: '✓';
      transform: translate(-55%, -50%) scale(.1);
      transition: 60ms opacity linear,
                  120ms transform cubic-bezier(0.7, 0.3, .8, 2);
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  &__setting {
    display: block;
    touch-action: manipulation;

    & + & {
      margin-top: calc(var(--size-gutter) * 2);
    }

    &--inline {
      display: flex;
      align-items: center;
      .pannel__settingtitle {
        margin-left: calc(var(--size-gutter) * .5);
      }
    }
  }

  &__desc {
    margin: 1em 0 3em;
    font-size: .6em;
  }

  select {
    font-size: .8em;
    border-radius: 2rem;
    padding: .2rem;
  }

  input, select {
    display: block;
    box-sizing: border-box;
    touch-action: manipulation;
    font-family: 'Space Mono', monospace;
    border: none;
    width: auto;

    &[type=number] {
      color: var(--color-inverted);
      background: none;
      border: none;
      text-align: right;
      font-size: .8em;
      flex: 0 0 3rem;
      width: 3rem;
    }
  }
  input {
    background-color: transparent;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
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

  select {
    color: var(--color-inverted);
    width: 100%;
    box-sizing: border-box;
    -webkit-appearance: none;
    border: 0;
    box-shadow: 0 1px 0 0 var(--color-inverted);
    border-radius: 0;
    padding: 0.25rem 1rem 0.25rem 0rem;
    background-color: transparent;
    background-size: 1.25em 1.25em;
    background-image: conic-gradient(var(--color-inverted) 5%, transparent 0 95%, var(--color-inverted) 0);
    background-repeat: no-repeat;
    background-position: right 0% top 120%;

    option {
      color: var(--color-bg);
    }

    &:focus {
      outline: none;
      background-color: transparent;
    }
  }
}

.pannel__settingtitle {
  font-weight: 900;
  font-size: 0.7rem;
  line-height: 1;
  margin-bottom: .4em;

  i {
    display: inline-block;
    font-size: .7em;
    margin-left: 1em;
  }
}

.pannel__inputs,
.pannel__settingtitle {
  display: flex;
  > *:first-child {
    flex: 1 0 auto;
  }
}



</style>
