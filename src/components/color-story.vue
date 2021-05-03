<template>
  <section
    class="color-story"
    v-bind:aria-label="name"
    v-bind:class="{'color-story--visible': isVisible}"
    v-bind:style="{'--currentColor': color}"
  >
    <article
      v-for="article in entries"
      class="color-story__article"
      v-bind:key="article.source"
    >
      <h2 v-html="article.title"></h2>
      <img
        v-if="article.image"
        v-bind:src="article.image"
        v-bind:alt="article.title"
      />
      <div
        v-html="article.html"
        class="color-story__body"
      ></div>
      <a
        v-bind:href="article.link"
        class="color-story__link"
      >read more</a>
    </article>
  </section>
</template>

<script>
  import Vue from 'vue';

  const nahWords = ['the', 'a', 'in', 'of', 'an', 'on'];

  function nahWordsInExtremities (Word) {
    const word = Word.toLowerCase();
    return !!nahWords.find(nw => (word.startsWith(nw + ' ') || word.endsWith(' ' + nw)));
  }

  function splitWords (str) {
    const arr = str.split(' ')
    const min = 2
    const result = new Set()

    for (var i = arr.length; i >= min; i--) {
      for (var j = 1; j <= i - min; j++) {
        result.add(arr.slice(j, i).join(' '))
      }
    }

    for (var k = arr.length - 1; k >= min; k--) {
      result.add(arr.slice(0, k).join(' '))
    }

    arr.forEach(item => {
      result.add(item)
    })

    const filtered = [...result].filter(e => !nahWordsInExtremities(e) && !nahWords.find(w => w === e.toLowerCase()));

    return filtered;
  }

  /// wikipedia part
  const unwantedProps = [
    'dir',
    'revision',
    'tid',
    'timestamp',
    'pageid',
    'namespace',
    'titles',
    'api_urls'
  ]

  function colorMeaning (name) {
    const splits = splitWords(name);
    const lookupnames = [...new Set([name, ...splits])];

    lookupnames.forEach(part =>
      {
        if( part.endsWith("'s") ) lookupnames.push(part.slice(0, -2));
        if( !/\s/g.test(part) ) lookupnames.push(`${part} (color)`);
      }
    );

    lookupnames.forEach(subWord => extract(subWord));
  }

  export default Vue.extend({
    props: ['name', 'color', 'isVisible'],
    data: function () {
      return {
        responses: [],
      };
    },
    computed: {
      entries: function () {
        return this.responses
          .filter((v,i,a) =>
            a.findIndex(t=>(t.wikibase_item === v.wikibase_item))===i
          )
          .sort((a,b) => b.displaytitle.length - a.displaytitle.length)
          .map((response,i) => {
            return {
              title: response.displaytitle,
              image: response.hasOwnProperty('thumbnail') ? response.thumbnail.source : null,
              html: response.extract_html,
              link: response.content_urls.desktop.page,
            }
          });
      },
      nameVariants: function () {
        const splits = splitWords(this.name);
        const lookupnames = [...new Set([this.name, ...splits])];

        lookupnames.forEach(part =>
          {
            if( part.endsWith("'s") ) lookupnames.push(part.slice(0, -2));
            if( !/\s/g.test(part) ) lookupnames.push(`${part} (color)`);
          }
        );

        return lookupnames;
      }
    },
    watch: {
      name: function (newName, oldName) {
        if (newName) this.getInfo();
      }
    },
    methods: {
      lookup: function (query) {
        const url = new URL(
          `https://en.wikipedia.org` +
          `/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/ /g, '_'))}?redirect=true`
        );

        fetch(url).then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json()
        })
        .then(data => {
          unwantedProps.forEach(prop => {
            delete data[prop];
          });

          if (data.text) {
            data.text = data.text.trim().replace(/\[\d+\]/g, '');
          } // remove footnotes like [1]

          if (data.html) data.html = data.html.trim();

          this.responses.push( Object.assign({}, { query: query }, data) );

          return data;
        }).catch(err => console.log(err));
      },
      getInfo () {
        this.responses = [];
        this.nameVariants.forEach(this.lookup);
      },
    },
    mounted () {
      if (this.name) this.getInfo();
    }
  });
</script>

<style lang="scss">
.color-story__article {
  --gutter: 2rem;

  padding: var(--gutter);

  font-size: .7rem;

  h2 {
    font-weight: 900;
    font-size: 2.2em;
    margin-bottom: 1em;
  }

  & + & {
    margin-top: calc(-.5 * var(--gutter));
  }

  img {
    display: block;
    max-width: 50%;
    float: left;
    margin-right: 0em;
    margin-bottom: 2em;
    transform: translateX(calc(var(--gutter) * -1 - 1px));
  }

  &::after {
    display: block;
    content: '';
    clear: both;
  }

  a {
    display: inline-block;
    text-transform: capitalize;
    margin-top: 1em;
    color: #000;
    text-decoration-thickness: .4em;
    text-decoration-color: var(--currentColor);
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5em;
    li {
      margin-top: 1em ;
    }
  }

  ::selection {
    background: var(--currentColor);
  }

}
</style>
