<template>
  <article class="colorspaces" ref="wrap">
    <canvas ref="canvas" class="colorspaces__canvas"></canvas>
  </article>
</template>

<script>
  import Vue from 'vue';
  import Zdog from 'zdog';

  export default Vue.extend({
    components: {},
    props: {
      colors: Array,
    },
    data: () => {
      return {
        currentMode: 'gl',
        colorShapes: [],
        illo: null,
      }
    },
    watch: {
      colors: function () {
        this.removeShapes();
        this.addShapes();
      }
    },
    methods: {
      updateWidth: function () {

      },
      createCanvas: function () {
        this.illo = new Zdog.Illustration({
          element: this.$refs.canvas,
          resize: true,
          dragRotate: true,
        });
      },
      addBox: function () {

        const w = this.illo.width;
        const h = this.illo.height;
        const s = Math.min(w,h) * .7;
        const stroke = 2;

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { y: -s * .5, x: -s * .5, z: -s * .5},
            { y:  s * .5, x: -s * .5, z: -s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { y: -s * .5, x: s * .5, z: -s * .5},
            { y:  s * .5, x: s * .5, z: -s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { y: -s * .5, x: s * .5, z: s * .5},
            { y:  s * .5, x: s * .5, z: s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { y: -s * .5, x: -s * .5, z: s * .5},
            { y:  s * .5, x: -s * .5, z: s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { z: -s * .5, y: -s * .5, x: -s * .5},
            { z: s * .5, y: -s * .5, x: -s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { z: -s * .5, y: s * .5, x: -s * .5},
            { z: s * .5, y: s * .5, x: -s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { z: -s * .5, y: s * .5, x: s * .5},
            { z: s * .5, y: s * .5, x: s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { z: -s * .5, y: -s * .5, x: s * .5},
            { z: s * .5, y: -s * .5, x: s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { x: -s * .5, y: s * .5, z: s * .5},
            { x: s * .5, y: s * .5, z: s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { x: -s * .5, y: -s * .5, z: s * .5},
            { x: s * .5, y: -s * .5, z: s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { x: -s * .5, y: -s * .5, z: -s * .5},
            { x: s * .5, y: -s * .5, z: -s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });

        new Zdog.Shape({
          addTo: this.illo,
          path: [
            { x: -s * .5, y: s * .5, z: -s * .5},
            { x: s * .5, y: s * .5, z: -s * .5},
          ],
          stroke: stroke,
          color: '#fff',
        });


      },
      addShapes: function () {

        const w = this.illo.width;
        const h = this.illo.height;
        const s = Math.min(w,h) * .7;

        this.colors.forEach(color => {
          const position = color[this.currentMode]();

          const shape = new Zdog.Shape({
            addTo: this.illo,
            // no path set, default to single point
            stroke: 5,
            color: color.hex(),
            translate: {
              x: s * position[0] - (s * .5),
              y: s * position[1] - (s * .5),
              z: s * position[2] - (s * .5),
            },
          });

          this.colorShapes.push(shape);
        });
      },
      removeShapes: function () {
        this.colorShapes.forEach(shape => shape.remove());
        this.colorShapes = [];
      }
    },
    mounted () {
      this.createCanvas();
      this.addShapes();
      this.addBox();

      this.illo.updateRenderGraph();
      this.illo.rotate.x -= 10;

      const animate = () => {
        // rotate illo each frame
        this.illo.rotate.y += 0.001;
        this.illo.updateRenderGraph();
        // animate next frame
        requestAnimationFrame( animate );
      }
      // start animation
      animate();
    }
  });
</script>

<style lang="scss" >
  .colorspaces__canvas {
    display: block;
    width: 100%;
  }
</style>
