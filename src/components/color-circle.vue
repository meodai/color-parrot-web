<template>
  <div class="color-circle" ref="wrap">
    <canvas ref="canvas" width="800" height="800"></canvas>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    props: ['colors'],
    methods: {

    },
    mounted () {
      const can = this.$refs.canvas;
      const ctx = can.getContext('2d');
      let w = can.width;
      let h = can.height;
      let s = Math.min(w,h) * .75;

      this.colors.forEach((color,i) => {
        const part = i/this.colors.length;
        const partInCircle = part * Math.PI * 2;

        const x = Math.sin(-partInCircle);
        const y = Math.cos(partInCircle);

        ctx.save();

        ctx.translate(
          w * .5 + x * (s * .2),
          h * .5 + y * (s * .2)
        );

        const gradient = ctx.createRadialGradient(w*.5,h*.5,s*.01, w*.5,h*.5,s*.6);

        gradient.addColorStop(0, color.hex());
        gradient.addColorStop(1, color.alpha(0).css());

        ctx.fillStyle = gradient;
        ctx.translate(-w*.5,-h*.5,)
        ctx.fillRect(0, 0, w, h);

        ctx.restore();
      });

      ctx.fillStyle = '#212121';
      ctx.beginPath();
      ctx.arc(w * .5, h * .5, s * .5, 0, 2 * Math.PI);
      ctx.fill();
    }
  });
</script>

<style lang="scss">
  .color-circle {
    canvas {
      display: block;
      width: 100%;
    }
  }
</style>
