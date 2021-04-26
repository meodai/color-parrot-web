<template>
  <div class="picker" v-bind:style="{'--currentcolor': hex, '--ui-color': uicolor}">
    <div class="picker__circle" ref="pickerwheel" v-on:pointerdown="pointerdown" v-on:pointermove="pointermove">
      <div class="picker__arrow" v-bind:style="{'--angle-percent': pointAnglePercent}"></div>
      <div class="picker-pointer" ref="pointer"></div>
    </div>
    <div class="picker__slider">
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
      }
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

      placePointer: function (x,y) {
        if (!this.isDraggin) return;

        requestAnimationFrame(() => {
          this.$refs.pointer.style.top = y + 'px';
          this.$refs.pointer.style.left = x + 'px';

          const centerX = this.pickerWheelRect.width * 0.5;
          const centerY = this.pickerWheelRect.height * 0.5;

          const distToCenterPercent = Math.sqrt(Math.pow(Math.abs(centerY - y), 2) + Math.pow(Math.abs(centerX - x), 2)) / (this.pickerWheelRect.width * .5);

          const pointAnglePercent = pointToAnglePercentile(
            x,
            y,
            centerX,
            centerY
          );

          this.pointAnglePercent = pointAnglePercent;

          this.h = pointAnglePercent * 360 % 360;
          this.l = 1 - distToCenterPercent;

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
          })
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
        const x = r + (r * (1 - l)) * Math.cos(angle);
        const y = r + (r * (1 - l)) * Math.sin(angle);

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

.picker {
  position: relative;
}

.picker__circle {
  --size: 10rem;
  position: relative;
  border-radius: 50%;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 50%),
  conic-gradient(hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%));
  border: 2px solid var(--ui-color, #212121);
  overflow: hidden;
}

.picker__arrow {
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

.picker-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1rem;
  height: 1rem;
  border: 1px solid var(--ui-color, #212121);
  //background: hsl(calc(var(--angle-percent, 0) * 360), 100%, 50%);
  background: var(--currentcolor);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

</style>
