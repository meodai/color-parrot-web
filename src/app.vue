<template>
  <main class="app" v-bind:class="{'is-ready': isReady}">
    <router-view></router-view>
  </main>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  components: {
  },
  data() {
    return {
      isReady: true,
    }
  },
  computed: {
  },
});
</script>
<style lang="scss">

html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}

:root {
  font-family: Inter, sans-serif;
  font-size: calc(0.7rem + 0.8vw);

  --c-bg: #fff;
  --c-color: #212121;

  --s-gutter: 2rem;

  background: var(--c-bg);
  color: var(--c-color);
}

@media (prefers-color-scheme: dark) {
  :root {
    --c-bg: #212121;
    --c-color: #fff;
  }
}

body, html, input {
  font-family: Inter, sans-serif;
  line-height: 1.4;
}

h1,
h2,
h3,
legend {
  font-weight: 900;
  line-height: 1.2;
}

// input hell
input, select {
  font-size: 0.6rem;
  display: block;
  box-sizing: border-box;
  touch-action: manipulation;
  border: none;
  width: auto;
}

select {
  color: var(--c-bg);
  width: 100%;
  box-sizing: border-box;
  -webkit-appearance: none;
  border: 0;
  box-shadow: 0 1px 0 0 var(--c-bg);
  border-radius: 0;
  padding: 0.25rem 1rem 0.25rem 0rem;
  background-color: transparent;
  background-size: 1.25em 1.25em;
  background-image: conic-gradient(var(--c-bg) 5%, transparent 0 95%, var(--c-bg) 0);
  background-repeat: no-repeat;
  background-position: right 0% top 120%;

  option {
    color: var(--c-color);
  }

  &:focus {
    outline: none;
    background-color: transparent;
  }
}

button {
  border: 0;
  -webkit-appearance: none;
  background: transparent;
  padding: 0;
}
</style>
