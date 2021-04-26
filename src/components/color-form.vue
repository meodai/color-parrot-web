<template>
  <section class="form">
    <color-card class="form__icon" v-bind:name="normalizedName" v-bind:hex="color"></color-card>
    <form class="form__content" name="colorsubmission" method="POST" data-netlify="true">
      <fieldset>
        <legend>Color Name Submission!</legend>
        <p>
          Join our contributors by inventing an orginal name.
        </p>
        <label for="colorvalue">
          <input name="colorvalue" id="colorvalue" type="color" v-model="color" value="#f12c43" required />
        </label>
        <label for="colorname">
          <input type="text" placeholder="proposed color name" id="colorname" v-model="name" name="colorname" value="" required />
        </label>
        <button type="submit">Submit a name</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
  import Vue from 'vue';
  import chroma from 'chroma-js';
  import colorCard from './color-card.vue';
  import Filter from 'bad-words';

  const filter = new Filter({ placeHolder: '*'});
  filter.removeWords('hells', 'hell', 'sadist');
  export default Vue.extend({
    components: {
      colorCard,
    },
    props: [],
    data: () => {
      return {
        color: chroma.random(),
        name: 'Your color',
      }
    },
    computed: {
      //filter.isProfane(this.name)
      normalizedName: function () {
        return filter.clean(this.name);
      }
    },
    methods: {

    },
    mounted: function () {

    }
  });
</script>

<style lang="scss">
  .form {
    display: flex;
    padding: 2rem;

    &__icon {
      margin-right: 1rem;
    }
  }
</style>
