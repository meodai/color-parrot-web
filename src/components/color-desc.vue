<template>
  <div class="color-pie">
    <p>
      Because of its color temperature of {{color.temperature()}} Kelvin, <strong>{{name}}</strong> is considered a {{temperatureAdjectives.adjecives.join(' and ')}} color.
    </p>
    <!--p>Because it is close to the color {{meanings.color}}, <strong>{{name}}</strong> could be a associated with {{meanings.adjecives.join(', ')}}.</p>
    <p>{{meanings.color}}:, {{meanings.desc}}</p-->
    <p>
      On a screen <strong>{{name}}</strong> is made of
      {{(rgb[0] * 100).toFixed(2)}}% red, {{(rgb[1] * 100).toFixed(2)}}% green and
      {{(rgb[2] * 100).toFixed(2)}}% blue <b
        class="color-pie__pie"
      ><i v-bind:style="{'background-image': rgbGradient}"></i></b>. You would need {{(cmyk[0] * 100).toFixed(2)}}%
      cyan, {{(cmyk[1] * 100).toFixed(2)}}% magenta, {{(cmyk[2] * 100).toFixed(2)}}% yellow And
      {{(cmyk[3] * 100).toFixed(2)}}% black to print this color.
    </p>
    <!--figure>
      <div
        class="color-pie__pie"
        v-bind:style="{'background-image': cmykGradient}"
      ></div>
      <figcaption>
		    <strong
          v-for="(c, i) in cmyk"
          v-bind:key="i"
        >
          {{i === 0 && 'Cyan' || i === 1 && 'Magenta' || i === 2 && 'Yellow' || i === 3 && 'Black'}}
          {{(c * 100).toFixed(2)}}%
        </strong>
		  </figcaption>
    </figure-->
  </div>
</template>

<script>
import Vue from 'vue';
import chroma from 'chroma-js';

export default Vue.extend({
  data: function() {
    return {
      meaning: [
        {
          color: 'red',
          adjecives: ['lust', 'power', 'excitement', 'love', 'speed', 'anger'],
          desc: "Red is a primary color across all models of colour space. It is often associated with love, passion, and lust but also danger. It is frequently used in relation to Valentine's Day.[5] It can also be used to signify danger or warning but it is also associated with importance. For instance, it is used for stop signs and fire engines. In China, red is often used to symbolize good luck or happiness, and is used for many holidays or weddings",
        },
        {
          color: 'yellow',
          adjecives: ['competence', 'happiness', 'inexpensive', 'low quality'],
          desc: "Yellow is a primary color in many models of colour space, and a secondary in all others. It is a color often associated with sunshine or joy.[13] It is sometimes used in association with cowardice or fear, i.e., the phrase 'yellow-bellied'.[14] Children tend to like this color, and it is used to market products to children;[15] it is also used for school buses and taxi cabs since it is such a bright, noticeable color."
        },
        {
          color: 'green',
          adjecives: ['good taste', 'envy', 'eco-friendly', 'health'],
          desc: "Green is a primary color in many models of colour space, and a secondary in all others. It is most often used to represent nature, healing, health, youth, or fertility, since it is such a dominant color in nature. It can be a very relaxing color[16] but is also used in the US to symbolize money, greed, sickness or jealousy.[16] Saying that someone is 'green' means they're inexperienced or new.[17]",
        },
        {
          color: 'blue',
          adjecives: ['masculine', 'competence', 'high quality', 'corporate', 'reliability'],
          desc: "Blue is a primary color across all models of colour space. It is the color of the ocean and the sky; it often symbolizes serenity, stability, inspiration, wisdom or health. It can be a calming color, and symbolize reliability. In the Catholic Church, the Virgin Mary is most often depicted wearing blue, to symbolize being 'full of grace' by divine favor. Blue is widely used for baby boys' clothes or bedrooms, although the reason blue is so strongly associated with boys is debated.[12] Blue can also mean sadness in most cultures. It can also be associated with life.",
        },
        {
          color: 'pink',
          adjecives: ['sophistication', 'sincerity', 'feminine'],
          desc: "Pink is a prominent secondary or tertiary colour in many colour space models. It is associated with softness, sweetness, and love.[22] There is an urban legend that pink was a masculine color before the mid 20th century, based on evidence of conflicting traditions before about 1940. Del Guicide (2012) argues that pink-blue gender coding has been broadly consistent in the UK and the US since it appeared around 1890.",
        },
        {
          color: 'purple',
          adjecives: ['authority', 'sophistication', 'power'],
          desc: "Purple has long been associated with wealth and royalty, as purple dye was precious and expensive. If green is the color of spring, then purple conjures up autumn, fading light, and shorter days. Purple is insouciant–associated with creativity and irreverence (as in the Purple Hat groups of women who embrace aging as an excuse to flout convention.) Purple also represents harmony–the balance between opposing forces.",
        },
        {
          color: 'orange',
          adjecives: ['Warmth', 'excitement'],
          desc: "Orange is the least favorite color of 33% of women, beating out other least favorite colors by quite a margin, and professionals tend to use orange sparingly and carefully. Though it certainly attracts attention and elicits emotion, the color orange can also turn people off.Interestingly, hues like peach, rust, and terracotta – while all part of the range of colors classified as orange – have broad appeal.",
        },
        {
          color: 'brown',
          adjecives: ['ruggedness'],
          desc: "Brown is the ultimate in sensible, grounded colors, so it makes sense that it’s featured in a thrifty expression about taking your lunch with you. Brown represents the earth, and it’s a symbol of balance and of nature. Since brown is a warm neutral, it complements and balances a wide range of colors, and its earthiness gives designers the opportunity to play with splashes of more vibrant hues without overwhelming a project. The physical effects of brown include an increase in tryptophan, which can promote drowsiness (the same effect of that Thanksgiving turkey!) Brown helps us feel connected to our roots and to home. Brown packaging is also used to indicate a product that’s natural or includes recycled content. Typically, brown is a relaxing color that provides a warm, nurturing background.",
        },
        {
          color: 'black',
          adjecives: ['grief', 'sophistication', 'ellegance', 'expensive', 'fear', 'death'],
          desc: "Black is a primary color across all models of colour space. In Western culture, it is considered a negative color and usually symbolizes death, grief, or evil.[18] People often wear black for mourning, although this practice isn't as widespread as it was in the past.",
        },
        {
          color: 'white',
          adjecives: ['happyness', 'sincerity', 'purity'],
          desc: "White is a primary color across all models of colour space. It most often symbolizes perfection, faith, innocence, softness, and cleanliness.[20] Brides often wear white dresses to symbolize virginity or purity.",
        }
      ],
      temperatures: [
        {
          value: 1800,
          adjecives: [
            'ultra warm',
          ]
        },
        {
          value: 2400,
          adjecives: [
            'very warm',
          ]
        },
        {
          value: 2700,
          adjecives: [
            'warm',
          ]
        },
        {
          value: 3000,
          adjecives: [
            'warm white',
          ]
        },
        {
          value: 4000,
          adjecives: [
            'cool or cold',
          ]
        },
        {
          value: 6500,
          adjecives: [
            'cool',
            'bright',
          ]
        }
      ]
    }
  },
  props: [
    'color', 'name'
  ],
  computed: {
    temperatureAdjectives () {
      const goal = this.color.temperature();
      return this.temperatures.reduce((prev, curr) =>
        (Math.abs(curr.value - goal) < Math.abs(prev.value - goal) ? curr : prev)
      , {value: 0});
    },
    meanings () {
      return this.meaning.sort((prev, curr) =>
        (chroma.deltaE(this.color, prev.color) - chroma.deltaE(this.color, curr.color))
      )[0];
    },
    cmyk () {
      return this.color.cmyk();
    },
    cmykGradient () {
      const cmyk = this.cmyk;
      const total = cmyk.reduce((r,d) => r + d, 0);

      console.log(cmyk)

      return `radial-gradient(
        circle closest-side,
        transparent 25.74%,
        transparent 66%,
        white 0
      ),conic-gradient(
        black 0,
        black ${cmyk[0]/total * 100}%,
        #ff00ff 0,
        #ff00ff ${(cmyk[0] + cmyk[1])/total * 100}%,
        yellow 0,
        yellow ${(cmyk[0] + cmyk[1] + cmyk[2])/total * 100}%,
        #000000  0,
        #000000 ${(cmyk[0] + cmyk[1] + cmyk[2] + cmyk[3])/total * 100}%
      )`
    },
    rgb () {
      const gl = this.color.gl();
      gl.pop();
      return gl;
    },
    rgbGradient () {
      const gl = this.rgb;
      const total = this.rgb.reduce((r,d) => r + d, 0);
      return `radial-gradient(
        circle closest-side,
        transparent 25.74%,
        transparent 66%,
        white 0
      ),conic-gradient(
        rgb(255,0,0) 0,
        rgb(255,0,0) ${gl[0]/total * 100}%,
        rgb(0,255,0) 0,
        rgb(0,255,0) ${((gl[0] + gl[1])/total) * 100}%,
        rgb(0,0,255) 0,
        rgb(0,0,255) ${((gl[0] + gl[1] + gl[2])/total) * 100}%
      )`;
    }
  }
});
</script>


<style lang="scss">
  .color-pie {
    strong {
      font-weight: 700;
    }
    p + p {
      margin-top: 1em;
    }
    &__pie {
      position: relative;
      display: inline-block;
      width: 1em;
      height: 1em;
      margin-left: 0.25em;
      margin-right: 0.25em;

      > * {
        z-index: -1;
        display: block;
        width: 2em;
        height: 2em;
        position: absolute;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
