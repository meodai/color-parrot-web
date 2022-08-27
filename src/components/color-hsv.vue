<template>
  <div class="picker-hsv" v-bind:style="{
    '--currentcolor': hex,
    '--ui-color': uicolor,
    '--h': h,
    '--s': s,
    '--l': l,
  }">
    <div class="picker-hsv__circle"
      ref="pickerwheel"
      v-on:pointerdown="pointerdown"
      v-on:pointermove="pointermove"
    >
      <div class="picker-hsv-pointer" ref="pointer"></div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import chroma from 'chroma-js';

  function pointToAnglePercentile (
    x, y, centerX, centerY
  ) {
    const radians = Math.atan2(y - centerY, x - centerX);
    const deg = radians * (180 / Math.PI);
    return ((deg + 360 + 90) % 360) / 360;
  }

  export default Vue.extend({
    props: {
      colorhex: String,
      colorhsl: Array,
      uicolor: {
        type: String,
        default: '#212121',
      },
      saturationSlider: {
        type: Boolean,
        default: false,
      },
    },
    data: () => {
      return {
        h: 0,
        s: 1,
        l:.5,
        hex: '#fff',
        pickerWheelRect: {},
        isDraggin: false,
        pointAnglePercent: 0,
      }
    },
    methods: {
      updateSaturation: function (e) {
        this.s = parseFloat(e.target.value);
        this.setColor();
      },

      pointerdown: function (e) {
        this.isDraggin = true;
        this.placePointer(e.offsetX, e.offsetY);

        document.documentElement.addEventListener('pointerup', (e) => {
          this.isDraggin = false;
        }, {once: true})
      },

      pointermove: function (e) {
        this.placePointer(e.offsetX, e.offsetY);
      },

      updateBoundingRect: function () {
        this.pickerWheelRect = this.$refs.pickerwheel.getBoundingClientRect();
      },

      placePointer: function (x, y) {
        if (!this.isDraggin) return;

        requestAnimationFrame(() => {

          const centerX = this.pickerWheelRect.width * 0.5;
          const centerY = this.pickerWheelRect.height * 0.5;

          const distToCenterPercent = Math.sqrt(
            Math.pow(Math.abs(centerY - y), 2) +
            Math.pow(Math.abs(centerX - x), 2)) / (this.pickerWheelRect.width * .5
          );

          const pointAnglePercent = pointToAnglePercentile(
            x, y, centerX, centerY
          );

          const r = this.pickerWheelRect.width / 2;

          const xc = Math.round( Math.cos(pointAnglePercent) * r);
          const yc = Math.round(-Math.sin(pointAnglePercent) * r);


          this.$refs.pointer.style.top = yc + 'px';
          this.$refs.pointer.style.left = xc + 'px';

          this.pointAnglePercent = pointAnglePercent;

          this.h = pointAnglePercent * 360 % 360;
          //this.l = distToCenterPercent;

          this.setColor();
        });
      },

      setColor: function(){
        this.hex = chroma.hsl(this.h, this.s, this.l).hex();

        this.$emit('color-update', {
          h: this.h,
          s: this.s,
          l: this.l,
          hex: this.hex,
        });
      },

      setColorFromProp: function() {
        let [h,s,l] = [0,0,0];

        if (this.colorhex) {
          [h,s,l] = chroma(this.colorhex).hsl();
        } else if (this.colorhsl) {
          [h,s,l] = this.colorhsl;
        } else {
          [h,s,l] = chroma(this.hex).hsl()
        }

        this.h = h || 0;
        this.s = s;
        this.l = l;

        const r = this.pickerWheelRect.width * 0.5;

        const angle = (this.h - 90) / 180 * Math.PI;
        const x = r + r * Math.cos(angle);
        const y = r + r * Math.sin(angle);

        this.$refs.pointer.style.top = `${y}px`;
        this.$refs.pointer.style.left = `${x}px`;

        this.setColor();
      }
    },
    watch: {
      colorhex: function () {this.setColorFromProp()},
      colorhsl: function () {this.setColorFromProp()},
    },
    mounted: function () {
      this.updateBoundingRect();
      this.setColorFromProp();

      let debounce;

      window.addEventListener('resize', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          this.updateBoundingRect();
        }, 100);
      });
    }
  });
</script>
<style lang="scss">

.picker-hsv {
  position: relative;
}

.picker-hsv__circle {
  position: relative;
  border-radius: 50%;
  aspect-ratio: 1;
  background: conic-gradient(hsl(0, calc(var(--s, 1) * 100%), 50%), hsl(60, calc(var(--s, 1) * 100%), 50%), hsl(120, calc(var(--s, 1) * 100%), 50%), hsl(180, calc(var(--s, 1) * 100%), 50%), hsl(240, calc(var(--s, 1) * 100%), 50%), hsl(300, calc(var(--s, 1) * 100%), 50%), hsl(360, calc(var(--s, 1) * 100%), 50%));

  overflow: hidden;
}

.picker-hsv__arrow {
  position: absolute;
  width: 1rem;
  height: 100%;
  left: 50%;
  top: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(calc(var(--angle-percent, 0) * 360deg));

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: .5rem;
    height: .5rem;
    background: var(--ui-color, #212121);
    //border: 2px solid var(--ui-color, #212121);
    transform: translate(-50%, -50%) rotate(45deg);
  }
}

.picker-hsv-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--ui-color, #212121);
  //background: hsl(calc(var(--angle-percent, 0) * 360), calc(var(--s, 1) * 100%), 50%);
  background: var(--currentcolor);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.picker-hsv__slider {
  margin-top: 1rem;
}

.picker-hsv {
   --color-inverted: #fff;
  --c-black: #212121;

}

</style>
