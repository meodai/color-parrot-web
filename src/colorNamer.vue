<template>
  <div class="submit-outer">
    <form autocomplete="off" name="usercolors" method="POST" data-netlify="true">

    <section class="submit">
      <div class="submit__main">
        <div class="submit__section">
          <div class="submit__section-meta">
            <div class="submit__logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
                <path d="M30 170h80v-60a39.8 39.8 0 0 0-5.25-19.81A80 80 0 0 0 30 170z" fill="#f69"/>
                <path d="M80.36 81.34L63 71.34c-.73-.42-1.42-.87-2.1-1.34H20a30 30 0 0 0 30 30h20a10.07 10.07 0 0 1 1.15.07 79.54 79.54 0 0 1 13.28-5.87 10 10 0 0 0-4.07-12.86zM120 140a10 10 0 0 1-10-10v40a30 30 0 0 0 30-30z" fill="#ed0"/>
                <path d="M70 70h-9.06c.68.47 1.37.92 2.1 1.34l17.32 10a10 10 0 0 1 4.07 12.86 79.64 79.64 0 0 1 20.32-4A40 40 0 0 0 70 70z" fill="#5a0"/><path d="M120 70V50c0-.84 0-1.67.11-2.49L114.64 38l-15-26a30 30 0 0 0-12.13 38.83l7.85 4.53a39.86 39.86 0 0 1 18.51 23.86A10 10 0 0 0 120 70z" fill="#19f"/><path d="M98.66 70.36L88.66 53c-.42-.73-.8-1.46-1.15-2.21L78 45.36l-26-15A30 30 0 0 0 60.94 70H70a39.86 39.86 0 0 1 28 11.41 10 10 0 0 0 .66-11.05z" fill="#6c6"/>
                <path d="M114 100.2a40 40 0 0 0-18.64-44.84l-7.85-4.53c.35.74.73 1.48 1.15 2.21l10 17.32A10 10 0 0 1 98 81.41 40 40 0 0 1 108.74 100H110q2 0 4 .2z" fill="#176"/>
                <path d="M120.11 47.51l4.53 7.85a40 40 0 0 1-4.25 46 39.74 39.74 0 0 1 9 3.63A40 40 0 0 0 150 70V20a30 30 0 0 0-29.89 27.51z" fill="#f69"/>
                <path d="M129.37 105a39.81 39.81 0 0 1-19.37 5v20a10 10 0 0 0 10 10h30a40 40 0 0 0-20.63-35z" fill="#19f"/>
                <path d="M110 110a39.81 39.81 0 0 0 19.37-5 39.47 39.47 0 0 0-9-3.63 40 40 0 0 0 4.25-46l-4.53-7.85c-.07.82-.11 1.65-.11 2.49V70a10 10 0 0 1-6.13 9.22 40 40 0 0 1 .17 21s-2.51-.2-4.05-.2h-1.27A39.89 39.89 0 0 1 110 110z" fill="#139"/>
                <circle cx="87.5" cy="127.5" r="7.5" fill="#fff"/>
              </svg>
            </div>
            <hsv-picker
                v-bind:colorhex="pickedColorsHex"
                :saturationSlider="true"
                @color-update="setCurrentcolor">
            </hsv-picker>
          </div>
          <div class="submit__section-content">
            <h1 class="submit__title">Submit a<br />Color-Name</h1>
            <p>Contribute to open-source by naming a unique color</p>
          </div>
        </div>

        <div class="submit__section">
          <div class="submit__section-meta">
            <div class="submit__stick">
              <h2>Rules</h2>
              <p>
                Please read the naming rules before submitting a color,
                to make sure to maintain a good quality of color-names
              </p>
            </div>
          </div>
          <div class="submit__section-content">
            <ul>
              <li>No racist, offensive or obscene names</li>
              <li>No protected brand-names (Facebook Blue, Coca Cola Red)</li>
              <li>No enumerations (Grey 1, Grey 2, Grey 3, Grey 4)</li>
              <li>British English spelling (ex. Grey not Gray), unless its something U.S. typical.</li>
              <li>Capitalize colors: Kind of Orange</li>
              <li>Prefer common names, especially when adding colors of flora and fauna (plants and animals ;) ) ex. Venus Slipper Orchid instead of Paphiopedilum.</li>
            </ul>
          </div>
        </div>

        <div class="submit__section">
          <div class="submit__section-meta">
            <div class="sidewheel">
              <color-wheel
                v-bind:colorhex="pickedColorsHex"
                :saturationSlider="true"
                @color-update="setCurrentcolor"
              ></color-wheel>
            </div>
            <!--h2>Pick a name</h2-->
          </div>
          <div class="submit__section-content">
            <fieldset class="fieldset-field">
                <label>
                  <strong>Color Name</strong>
                  <input
                    class="submit__text"
                    type="text"
                    name="colorname"
                    v-model="currentName"
                    placeholder="Enter a color name"
                    required
                    v-bind:aria-invalid="!isValidName"
                  />
                </label>
                <section class="validation" aria-errormessage>
                  <div v-if="isProfane" class="validation__warn">
                    <h3>Come on…</h3>
                    <p>No racist, offensive or obscene names please.</p>
                  </div>
                  <div v-if="duplicateIndex > -1">
                    <h3>We have have a color named "<strong>{{ cleanName }}</strong>"</h3>
                  </div>
                  <div v-if="nameSearchResults.length">
                    <h4>Similar Names</h4>
                    <ol class="similars">
                      <li
                        class="validation__similar-name"
                        v-for="(entry, i) in nameSearchResults"
                        v-bind:style="{'--c': entry.item.hex}"
                        v-bind:key="i"
                      >
                        {{entry.item.name}}
                      </li>
                    </ol>
                  </div>
                </section>


                <input type="hidden" name="colorvalue" v-bind:value="pickedColorsHex" />
              </fieldset>

          </div>
        </div>

        <div class="submit__section">
          <div class="submit__section-meta">
            <div class="submit__stick">
              <h2>Choose a color from a Picture</h2>
              <p>Pick a color for that name</p>
              <button v-on:click.prevent="showEyeDropper">Pick a color</button>
            </div>
          </div>
          <div class="submit__section-content image-samples">
            <div
              v-for="imgUrl in relatedImages"
              class="submit__image-container"
              v-bind:key="imgUrl"
            >
              <img
                class="submit__image"
                v-bind:src="imgUrl"
              />
            </div>
          </div>
        </div>

        <div class="submit__section">
          <div class="submit__section-meta">
            <div class="submit__stick">
              <h2>Choose a color</h2>
              <p>
                We have picked an unnamed color for you. Feel free to change
                it on the color picker below if you had something else in mind.
              </p>
            </div>
          </div>
          <div class="submit__section-content">
              <div class="controls">
                <div class="controls__wheel">
                  <color-wheel
                    v-bind:colorhex="pickedColorsHex"
                    :saturationSlider="true"
                    @color-update="setCurrentcolor"
                  ></color-wheel>
                </div>
                <div class="controls__swatch">
                  <colorswatch
                    v-bind:color="chromaColor"
                    v-bind:name="cleanName"
                    v-bind:isVisible="true"
                  ></colorswatch>
                  <input type="color" class="controls__input" v-model="pickedColorsHex" />
                </div>
              </div>
          </div>
        </div>

        <div class="submit__section">
          <div class="submit__section-meta">
            <div class="submit__stick">
              <h2>Submit your name</h2>
            </div>
          </div>
          <div class="submit__section-content">
              <button class="submit__button" type="submit">Send Name</button>
          </div>
        </div>
      </div>
    </section>

  </form>
  </div>

</template>

<script>
import chroma from 'chroma-js';
import Vue from "vue";
import colorswatch from './components/color-swatch';
import colorWheel from './components/color-wheel.vue';
import hsvPicker from './components/color-hsv.vue';
import Filter from 'bad-words';
import Fuse from 'fuse.js';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: '1casNbfJB9m4Cl-PTu2cYzagkuOHl9NtKm5AKFAXYfs',
  fetch,
});

const toTitleCase = word => {
  const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
  const alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/;
  const wordSeparators = /([ :–—-])/;

  return word.split(wordSeparators)
    .map(function (current, index, array) {
      if (
        /* Check for small words */
        current.search(smallWords) > -1 &&
        /* Skip first and last word */
        index !== 0 &&
        index !== array.length - 1 &&
        /* Ignore title end and subtitle start */
        array[index - 3] !== ':' &&
        array[index + 1] !== ':' &&
        /* Ignore small words that start a hyphenated phrase */
        (array[index + 1] !== '-' ||
          (array[index - 1] === '-' && array[index + 1] === '-'))
      ) {
        return current.toLowerCase()
      }

      /* Ignore intentional capitalization */
      if (current.substr(1).search(/[A-Z]|\../) > -1) {
        return current
      }

      /* Ignore URLs */
      if (array[index + 1] === ':' && array[index + 2] !== '') {
        return current
      }

      /* Capitalize the first letter */
      return current.replace(alphanumericPattern, function (match) {
        return match.toUpperCase()
      })
  }).join('')
}

const filter = new Filter();

export default Vue.extend({
  components: {
    colorswatch,
    colorWheel,
    hsvPicker,
  },
  metaInfo() {
    return {

    }
  },
  watch: {
    currentName: function(val) {
      this.isProfane = filter.isProfane(val);

      clearTimeout(this.validationTimer);

      this.validationTimer = setTimeout(() => {
        if (this.fuse) {
          const results = this.fuse.search(val);
          if (results.length) {
            this.nameSearchResults = results.slice(0, 10);
          }
        }

        const normalized = val.toLowerCase().replace(/(\s\s+)/g, ' ').trim();

        if(normalized.length > 1) {
          this.duplicateIndex = this.namesOnly
            .map(n => n.toLowerCase())
            .indexOf(normalized);

          this.fetchImages(normalized);
        }
      }, 500);
    },
  },
  data: function () {
    return {
      isProfane: false,
      dictonary: false,
      pickedColorsHex: '#f00f00',
      currentName: '',
      colors: [],
      colorsNamed: [],
      randomColorIndex: null,
      timers: [],
      fuse: null,
      nameSearchResults: [],
      namesOnly: [],
      duplicateIndex: -1,
      validationTimer: null,
      relatedImages: [],
      eyeDropper: null,
    }
  },
  computed: {
    chromaColor: function () {
      return chroma(this.pickedColorsHex);
    },
    cleanName: function () {
      return toTitleCase(this.currentName ? filter.clean(this.currentName) : '');
    },
    isValidName: function () {
      return !this.isProfane && this.cleanName.length > 1 && !(this.duplicateIndex > -1);
    },
  },
  methods: {
    showEyeDropper () {
      this.eyeDropper.open().then(result => {
        const hex = result.sRGBHex;
        this.pickedColorsHex = hex;
        console.log(hex);
      }).catch(e => {
        console.log(e);
      });
    },
    setCurrentcolor (obj) {
      this.pickedColorsHex = obj.hex;
    },
    changeColor (index) {
      this.colors[index].ready = false;
      const timer = setTimeout(() => {
        this.colors[index].color = chroma.random();
        this.colors[index].ready = true;
      }, 1000);
    },
    fetchImages: function (name) {
      unsplash.search.getPhotos({
        query: name,
        page: 1,
        per_page: 9,
      }).then((result) => {
        this.relatedImages = result.response.results.map(r => r.urls.thumb);
      });
    },
    fetchAllNames: function () {
      fetch('https://api.color.pizza/v1/')
        .then(response => response.json())
        .then(data => {
          this.allNamedColors = data.colors;
          this.namesOnly = data.colors.map(c => c.name);
          this.fuse = new Fuse(data.colors, {
            includeScore: true,
            keys: ['name']
          });
        });
    },
    fetchColors() {
      const apiURL = new URL('https://api.color.pizza/v1/');

      const params = {
        values: this.colors.map(c => c.color.hex().replace('#', '')),
        goodnamesonly: false,
        noduplicates: true,
      }

      apiURL.search = new URLSearchParams(params).toString();

      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          this.colorsNamed = data.colors.map(c => {
            return {
              name: c.name,
              requestedHex: c.requestedHex,
              color: chroma(c.hex),
            }
          });
        }).catch(error => {
          throw new Error(`API ${error}`);
        });
    }
  },
  created () {
    this.fetchAllNames();
    //setInterval(this.changeRandomColor, 2000);

    this.eyeDropper = new EyeDropper();
  },
});
</script>
<style lang="scss">
  .validation {
    margin-top: 1.5rem;
    --stack-start: 5rem;
    font-size: 1em;

    h3, h4 {
      margin-top: 1em;
      font-size: 1em;
      margin-bottom: .2em;
      font-weight: 900;
      &::before {
        content: '⚠️';
        color: red;
        margin-right: .25em;
      }
    }

    h4::before {
      display: none;
    }
  }

  .similars {
    display: flex;
    flex-wrap: wrap;
    gap: .5em;
  }

  .validation__similar-name {
    display: inline-block;
    &::before {
      display: inline-block;
      font-size: .7em;
      position: relative;
      top: -.25em;
      content: '⬤';
      color: var(--c);
    }
  }

  .sidewheel {
    display: inline-block;
    width: 9rem;
  }

  .submit__section {
    display: flex;
    gap: 2rem;

    ul {
      padding-left: 1em;
      list-style: disc;
      li + li {
        margin-top: 1em;
      }
    }
    & + & {
      margin-top: 4rem;
    }

    &-meta {
      box-sizing: border-box;
      padding-left: 3vw;
      flex: 0 0 15rem;
      text-align: right;

      h2 {
        font-size: 2rem;
        margin-bottom: .2em;
        line-height: .9;
      }
    }
    &-content {
      flex: 0 0 25rem;
    }


    button {
      background: #fff;
      padding: .25em 1em;
      color: #000;
    }
  }

  .submit__stick {
    position: sticky;
    top: 1em;
  }

  .submit {
    padding-bottom: 7rem;
    font-size: .75em;
    &__title {
      font-size: 4rem;
      line-height: .9;
      margin-top: var(--stack-start, 5rem);
    }

    &__logo {
      position: relative;
      display: inline-block;
      width: 7rem;
      background: #fff;
      border-radius: 50%;
      padding: 1rem;
      top: -1.1em;
      margin-top: var(--stack-start, 5rem);
    }

    &__main {
      order: 2;
      flex: 0 0 50vw;
    }

    &__side {
      order: 1;
      flex:0 1 30vw;
    }

    &__validation {
      margin-top: 1.5rem;
    }

    legend {
      font-size: 2rem;
      display: block;
      padding-top: .75em;
      margin-bottom: .5em;
    }

    .submit__text {
      font-size: 2rem;
      display: block;
      width: 100%;
      background: transparent;
      border-bottom: 2px solid #fff;
      color: #fff;

      &:focus {
        outline: none;
        box-shadow: 0 .25em 0 #fff;
      }

      &:focus[aria-invalid] {
        border-color: #f00;
        box-shadow: 0 .25em 0 #f00;
      }
    }
  }

  .controls {
    width: 100%;
    display: flex;
    gap: 2rem;
    &__wheel,
    &__swatch {
      flex: 1 1 35%;
    }
    &__swatch {
      order: 1;
      position: relative;
    }
    &__wheel {
      order: 2;
    }
  }

  .controls__input {
    appearance: none;
    --webkit-appearance: none;
    border: none;
    display: block;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 100%;
    opacity: 0;

    background: none;
    -webkit-appearance: none;

  }

  .submit__button {
    display: block;
    background: #fff;
    font-size: 2rem;
    color: #000;
    padding: 1rem 2rem;
  }

  .image-samples {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    grid-template-rows: masonry;
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: column dense;
    gap: 1rem;

    img {
      display: block;
      width: 100%;
    }
  }

  .fieldset-field {
    margin-top: 2.5rem;
  }


</style>
