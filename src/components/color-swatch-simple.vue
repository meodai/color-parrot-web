<template>
  <aside v-bind:style="{ '--color': hex }" class="color-card">
    <div>
      <h2>{{name}}</h2>
      <span>{{hex}}</span>
    </div>
  </aside>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: {
    hex: String,
    name: String,
  },
});
</script>

<style lang="scss">

.color-card {
  --c-card: #fff;
  --c-text: #000;

  font-size: .75rem;
  color: var(--c-text);
  width: 7rem;
  background: var(--c-card);
  //border-radius: 0.25rem;
  overflow: hidden;
  //box-shadow: 0 0 0 5px var(--c-card), 0 0 1rem rgba(#212121, .2), 0 0 8rem var(--color);
  box-shadow: 0 0 0 1px var(--c-card), 0 0 1rem rgba(#212121, .2);


  div {
    display: block;
    padding: 0.5em 0.4rem 0.3rem;
  }

  h2 {
    display: block;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: .2em;
    font-weight: 300;
  }

  span {
    display: block;
    font-weight: 100;
    font-size: .7em;
  }

  span:empty,
  h2:empty {
    &::after {
      content: '\00a0\00a0'
    }
  }

  &::before {
    display: block;
    content: '';
    width: 100%;
    padding-top: 100%;
    background-color: var(--color);
  }
}
</style>
