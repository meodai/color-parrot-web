<template>
  <div class="gradient"  v-bind:style="{'--gradient': gradient}" >

  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      colors: Array,
    },
    computed: {
      gradient: function () {
        //return `linear-gradient(45deg, ${this.colors.join(',')})`;
        const part = 360 / this.colors.length;
        console.log(
          this.colors
        );
        return this.colors.reduce((r,c,i) =>
        `${r}${r ? ',' : ''}linear-gradient(${part * i}deg,${c.alpha(.99).css()},${c.alpha(0).css()})`
        , '');
      },
    },
  });
</script>

<style lang="scss">
  .gradient {
    position: relative;
    height: 100vh;
    &::after {
      position: absolute;
      content: '';
      top: 3rem;
      left: 3rem;
      bottom: 3rem;
      right: 3rem;
      background-image: var(--gradient);
    }
  }
</style>
