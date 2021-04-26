
<template>
  <main v-bind:class="{'is-ready': isReady}">
    <h1 class="palette__title">{{paletteName}}</h1>
    <label>
    <input type="checkbox" v-model="show" />
    <span>show</span>
    </label>
    <label>
    <input type="checkbox" v-model="goodnamesonly" />
    <span>goodnamesonly</span>
    </label>
    <label>
      <select v-model="sort">
        <option value="">Default</option>
        <option value="magic">Magic</option>
        <option value="luminance">Luminance</option>
      </select>
    <span>Better color-names</span>
    </label>
    <label>
      <select v-model="colorDisplayMode">
        <option value="hex">hex</option>
        <option value="rgb">rgb</option>
        <option value="hsl">hsl</option>
        <option value="lab">lab</option>
        <option value="cmyk">cmyk</option>
      </select>
    <span>Color Values</span>
    </label>
    <button @click="newRandomColors">new colors</button>
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
    <ul>
      <li v-for="c,i in namesSortedByLum" v-bind:key="i" :style="{'background': c.requestedHex}">{{c.name}}</li>
    </ul>
  </main>
</template>

<script>
import Vue from "vue";
import colorinput from './components/color-input';
import colorswatch from './components/color-swatch';
import chroma from 'chroma-js';

const sorts = {
  'magic': colors => colors.sort((a, b) => (b.luminance() - a.luminance()) - (b.hcl()[0] - a.hcl()[0])),
  'luminance': colors => colors.sort((a, b) => (b.luminance() - a.luminance())),
};

export default Vue.extend({
  components: {
    colorinput,
    colorswatch
  },
  data() {
    return {
      colors: [
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
        chroma.random(),
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
        console.log(this.colorNames)
      });
    }
  },
  mounted () {
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

  background: var(--c-bg);
  color: var(--c-color);
}

body, html {
  line-height: 1.4;
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
  max-width: 40rem;
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem auto;
  align-content: center;
  justify-content: center;

  .colorswatch {
    flex: 0 0 calc(33.333% - 2rem);
    margin: .5rem;
  }
}

.palette__title {
  font-size: 3rem;
}

</style>
