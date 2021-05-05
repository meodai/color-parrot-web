<template>
  <section class="home">
    <div class="home__logo">
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

    <h1>Color Parrot</h1>
    <h2>The Color companion</h2>

    <article>
      <h2>Usage</h2>
      <p>
        Mention <a href="https://twitter.com/color_parrot">@color_parrot</a>
        in a reply to a Tweet containing an image and aks "@color_parrot what is this color?"
        to get a repsonse containg a palette per image.
      </p>

      <aside>
        <h3>Specify the number of colors to extract</h3>
        <p>
          When asking for a color you can specify the amount of colors you would like to get from the bot.
          (Max. 32) just include a number anywhere in the tweet. Ex: "@color_parrot what are those colors? I need 6 of them..."
        </p>
      </aside>

      <aside>
        <h3>Want more colors? No problem!</h3>
        <p>
          Repond with a tweet containg the word "more" to any of the bots reponses to get all the colors.
        </p>
      </aside>
    </article>

    <article>
      <h2>About color parrot</h2>

      <h3>Who?</h3>
      <p>
        The creator of the bot is <a href="https://twitter.com/meodai">David Aerne</a>.
      </p>
      <h3>Why?</h3>
      <p>
        I am maintaing an <a href="https://github.com/meodai/color-names">open-source list of names</a>
        that is <a href="https://github.com/meodai/color-names/issues/98">used by many other apps and websites</a>.
      </p>
      <p>
        To be able to measure what names are better then others, or that are just plain bad I collect the likes and the reactions
        to each individual color. So by using the bot you are actively contributing to an open-source project.
      </p>
      <h3>Who pais for all that?</h3>
      <p>I am so glad you asked. Hopefully you!</p>
      <h4>Costs of running the bot:</h4>
      <ol>
        <li>Logo by Metafizzy: 800USD</li>
        <li>External Developers: 3620.60USD</li>
        <li>Color Name API Server: 22USD/month</li>
        <li>color.pizza domain name 36.18USD/year</li>
        <li>Cloudflare PRO plan: 20USD/month</li>
      </ol>

      <p>
        This is not accounting for my own work: Over the past 4 years I have addad an average of
        19 color names per day. I have spend countless days/weeks/months bulding color tools:
        <a href="https://farbvelo.elastiq.ch/">FarbVelo</a>, <a href="https://cga.elastiq.ch/">cga</a>, <a href="https://codepen.io/meodai/">And many more...</a>
      </p>

      <h3>Donations &amp; Sponsoring</h3>
      <p>
        You can <a href="mailto:meodai@gmail.com">contact me</a> if you are interested in becoming a sponsor.
        You will get a special spot on this website and on the <a href="https://github.com/meodai/color-names">github-project page</a>.
      </p>
      <p>
        A one time donnation also helps a lot. You will be listed on this webpage under a section called "Patreons". The list will be sorted by amount donnated.
        You can include a link of your choosing.
      </p>
      <ul>
        <li><a href="https://www.paypal.com/paypalme/elastiq">Paypal</a></li>
        <li><a href='https://ko-fi.com/A530429S' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi2.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a></li>
        <li>ETH Address: 0xA16448c4caE9b95A3783EC29a56AB36D11660061</li>
        <li>Bitccoin Address: 383gmyiQruH5z2JnbsukhSMDDmVJ3Bxogr</li>
      </ul>
    </article>
  </section>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  components: {
  },
  metaInfo() {
    return {
      /*
      title: this.$store.state.currentColor.name + ': ' + this.$store.state.currentColor.requestedHex,
      meta: [
        { property: 'og:type', content: 'website'},
        { property: 'og:title', content: this.$store.state.currentColor.name + ': ' + this.$store.state.currentColor.requestedHex},
        { property: 'og:description', content: 'All you ever wanted to know about the color ' + this.$store.state.currentColor.name + ' (' + this.$store.state.currentColor.requestedHex + ')'},
        { property: 'og:url', content: `https://parrot.color.pizza/color/${this.$store.state.currentColor.requestedHex.replace('#','')}`},
        { property: 'og:image', content: `https://dummyimage.com/1200x627/${this.$store.state.currentColor.requestedHex.replace('#','')}/fff.png&text=${encodeURI(this.$store.state.currentColor.name)}`},

        { property: 'twitter:card', content: 'summary_large_image'},
        { property: 'twitter:title', content: this.$store.state.currentColor.name + ': ' + this.$store.state.currentColor.requestedHex},
        { property: 'twitter:description', content: 'All you ever wanted to know about the color ' + this.$store.state.currentColor.name + ' (' + this.$store.state.currentColor.requestedHex + ')'},
        { property: 'twitter:url', content: `https://parrot.color.pizza/color/${this.$store.state.currentColor.requestedHex.replace('#','')}`},        { property: 'og:image', content: `https://www.colorbook.io/imagecreator.php?hex=${this.$store.state.currentColor.requestedHex.replace('#','')}&width=1200&height=627`},
        { property: 'twitter:image', content: `https://dummyimage.com/1200x627/${this.$store.state.currentColor.requestedHex.replace('#','')}/fff.png&text=${encodeURI(this.$store.state.currentColor.name)}`},
      ],*/
    }
  },
  data: function () {
    return {
    }
  },
  computed: {

  },
  methods: {

  },


});
</script>
<style lang="scss">
  .home {
    max-width: 30rem;
    padding: var(--s-gutter);
    font-weight: 200;
    font-size: .75em;

    &__logo {
      width: 7rem;
      background: #fff;
      border-radius: 50%;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }


    h1 {
      font-size: 6rem;
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: .9;
    }

    h2 {
      margin-top: 1em;
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    h3 {
      margin-top: 1em;
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    h1 + h2 {
      font-weight: 600;
      margin-top: .5em;
    }

    p {
      margin: 1em 0;
      padding-right: 10rem;
    }


    a {
      color: rgb(238, 221, 0);
      animation: colorwalk 15s linear infinite;
      animation-direction: alternate;
    }

  }

  @keyframes colorwalk {
    0% {
      color: rgb(238, 221, 0);
    }
    25% {
      color: rgb(102, 204, 102);
    }
    50% {
      color: rgb(17, 153, 255);
    }
    75% {
      color: rgb(255, 102, 153);
    }
  }


</style>
