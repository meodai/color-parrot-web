<template>
  <section class="blabla">
      <div class="blabla__left">
        <h1><i>Color</i> Parrot</h1>
        <h2>The Color Companion</h2>
      </div>

      <div class="blabla__right">
        <article>
          <h2>Usage</h2>
          <p>
            Mention <a href="https://twitter.com/color_parrot">@color_parrot</a>
            in a reply to a Tweet containing an image and ask "@color_parrot what is this color?"
            to get a response containing a palette per image.
          </p>

          <aside>
            <h3>Specify the number of colors to extract</h3>
            <p>
              When asking for a color you can specify the number of colors you would like to get from the bot.
              (Max. 32) just include a number anywhere in the tweet. Ex: "@color_parrot what are those colors? I need 6 of them..."
            </p>
          </aside>

          <aside>
            <h3>Want more colors? No problem!</h3>
            <p>
              Respond with a tweet containing the word "more" to any of the bot's responses to get all the colors.
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
            I am maintaining an <a href="https://github.com/meodai/color-names">open-source list of names</a>
            that is <a href="https://github.com/meodai/color-names/issues/98">used by many other apps and websites</a>.
          </p>
          <p>
            To be able to measure what names are better than others, or that are just plain bad I collect the likes and the reactions
            to each color. So by using the bot you are actively contributing to an open-source project.
          </p>
          <h3>Who pays for all that?</h3>
          <p>I am so glad you asked. Hopefully you!</p>
          <table>
              <caption>Costs of running the bot (in USD)</caption>
              <thead>
                  <tr>
                      <th scope="col">Items</th>
                      <th scope="col">Expenditure</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <th scope="row">Logo by Metafizzy</th>
                      <td>800</td>
                  </tr>
                  <tr>
                      <th scope="row">External Developers</th>
                      <td>3,620.60</td>
                  </tr>
                  <tr>
                      <th scope="row">Color Name API Server</th>
                      <td>264.60/year</td>
                  </tr>
                  <tr>
                      <th scope="row">color.pizza domain name</th>
                      <td>36.16/year</td>
                  </tr>
                  <tr>
                      <th scope="row">Cloudflare PRO Plan</th>
                      <td>240/year</td>
                  </tr>
              </tbody>
          </table>

          <p>
            This is not accounting for my own work: Over the past 4 years, I have added an average of 20 color names per day.
            I have spent countless days/weeks/months building color tools:
            <a href="https://farbvelo.elastiq.ch/">FarbVelo</a>, <a href="https://cga.elastiq.ch/">cga</a>, <a href="https://codepen.io/meodai/">And many more...</a>
          </p>

          <h3>Donations &amp; Sponsoring</h3>
          <p>
            You can <a href="mailto:color-parrot-web@elastiq.click">contact me</a> if you are interested in becoming a sponsor.
            You will get a special spot on this website and on the <a href="https://github.com/meodai/color-names">github-project page</a>.
          </p>
          <p>
            A one-time donation also helps a lot. You will be listed on this webpage under a section called "Patrons".
            The list will be sorted by the amount donated. You can include a link of your choosing.
          </p>
          <ul class="payme">
            <li><a href="https://www.paypal.com/paypalme/elastiq">Paypal</a></li>
            <li><a href='https://ko-fi.com/A530429S'>Ko-Fi</a></li>
            <li><strong>ETH Address</strong> 0xA16448c4caE9b95A3783EC29a56AB36D11660061</li>
            <li><strong>Bitcoin Address</strong> 383gmyiQruH5z2JnbsukhSMDDmVJ3Bxogr</li>
          </ul>
        </article>
      </div>
  </section>
</template>

<style lang="scss">
  .blabla-mask {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    clip-path: circle(20% at 50% 50%);
    -webkit-clip-path: circle(33% at 50% 50%);
    overflow-y: scroll;
  }

  .blabla {

    ::-moz-selection {
      color: #000;
      background: #fff;
      opacity: 1;
    }
    ::selection {
      color: #000;
      opacity: 1;
      background: #fff;
    }
    position: relative;
    margin: calc(50vh + 10rem) auto 2rem;

    padding: var(--s-gutter);
    font-weight: 200;
    font-size: .9em;
    line-height: 1.5;

    max-width: 25rem;
    padding-bottom: calc(var(--s-gutter) * 2);

    article {
      margin-top: 4rem;

      &:first-child {
        margin-top: 0;
      }
    }

    table {
      width: 100%;
    }

    thead {
      font-weight: 700;
    }

    tr,td,caption {
      text-align: left;
    }

    caption {
      font-weight: 700;
      margin-bottom: 1em;
    }

    h1 {
      font-size: 6rem;
      font-weight: 900;
      letter-spacing: -0.01em;
      line-height: .9;
      text-align: center;
      i {
        display: block;
        margin-bottom: -0.3em;
        margin-right: -0.25em;
        font-size: 0.82em;
      }
    }

    h2 {
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 1.1;
      letter-spacing: -0.03em;
    }

    h3 {
      margin-top: 3em;
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 1.15;
      letter-spacing: -0.03em;
      padding-right: 40%;
    }

    h1 + h2 {
      font-weight: 600;
      margin-top: .05em;
      text-align: center;
      margin-bottom: 2em;
      font-weight: 200;
      font-size: 1.7em;
    }

    p {
      margin: 2em 0;
      padding-left: 2em;
    }


    a {
      color: rgb(238, 221, 0);
      animation: colorwalk 15s linear infinite;
      animation-direction: alternate;
      font-weight: 700;
      text-decoration: none;
      position: relative;
      z-index: 15;

      &:hover {
        color: #fff;
        animation: none;
      }
    }

    li {
      margin-top: 1em;
    }
  }


  .payme {
    strong {
      display: block;
      font-weight: 700;
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

  @keyframes gradient {
    100% {
      background-position: 400% 50%;
    }
  }
</style>
