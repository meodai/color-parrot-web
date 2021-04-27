<template>
  <article class="colorspaces" ref="wrap">
    <canvas ref="canvas" class="colorspaces__canvas"></canvas>
  </article>
</template>

<script>
  import Vue from 'vue';
  import Zdog from 'zdog';
  import Zfont from 'zfont';

  export default Vue.extend({
    components: {},
    props: {
      colors: Array,
    },
    data: () => {
      return {
        currentMode: 'gl',
        colorShapes: [],
        labels: [],
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
        const s = Math.min(w,h) * .6;
        const stroke = 10;

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
        const s = Math.min(w,h) * .6;

        this.colors.forEach(color => {
          const position = color[this.currentMode]();

          const shape = new Zdog.Shape({
            addTo: this.illo,
            // no path set, default to single point
            stroke: 30,
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
      addLabels: function () {
        this.labels = [];

        let myFont = new Zdog.Font({
          src: 'inter/Inter-Black.ttf'
        });

        const w = this.illo.width;
        const h = this.illo.height;
        const s = Math.min(w,h) * .6;

        this.labels.push(
          new Zdog.Text({
            addTo: this.illo,
            font: myFont,
            value: 'R',
            fontSize: 20,
            color: '#f00',
            stroke: 1,
            fill: true,
            translate: {
                x: s * .5 + 10,
                y: -s * .5 - 10,
                z: -s * .5 - 10,
            },
            rotate: { z: -Zdog.TAU/2, y: -Zdog.TAU/2 }
          })
        )

        this.labels.push(
          new Zdog.Text({
            addTo: this.illo,
            font: myFont,
            value: 'G',
            fontSize: 20,
            color: '#0f0',
            stroke: 1,
            fill: true,
            translate: {
                x: -s * .5 - 20,
                y: s * .5 + 10,
                z: -s * .5 - 10,
            },
            rotate: { z: -Zdog.TAU/2, y: -Zdog.TAU/2 }
          })
        );

        this.labels.push(
          new Zdog.Text({
            addTo: this.illo,
            font: myFont,
            value: 'B',
            fontSize: 20,
            color: '#00f',
            stroke: 1,
            fill: true,
            translate: {
                x: -s * .5 - 20,
                y: -s * .5 - 10,
                z: s * .5 + 10,
            },
            rotate: { z: -Zdog.TAU/2, y: -Zdog.TAU/2 }
          })
        );
      },
      removeShapes: function () {
        this.colorShapes.forEach(shape => shape.remove());
        this.colorShapes = [];
      }
    },
    mounted () {
      Zfont.init(Zdog);

      this.createCanvas();
      this.addShapes();
      this.addBox();
      //  this.addLabels();

      this.illo.updateRenderGraph();
      this.illo.rotate.x -= .1;

      const animate = () => {
        // rotate illo each frame
        this.illo.rotate.y += 0.001;

        this.labels.forEach(label => {
          label.rotate.y = -this.illo.rotate.y;
        });

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
