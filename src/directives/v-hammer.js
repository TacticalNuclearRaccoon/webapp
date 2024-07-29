// src/directives/v-hammer.js

import Hammer from 'hammerjs';

export default {
  mounted(el, binding) {
    const hammer = new Hammer(el);

    // Set the direction to all
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    // Add event listeners
    Object.keys(binding.value).forEach(eventType => {
      hammer.on(eventType, binding.value[eventType]);
    });

    // Store the hammer instance on the element
    el.__hammer = hammer;
  },
  unmounted(el) {
    if (el.__hammer) {
      el.__hammer.destroy();
      delete el.__hammer;
    }
  }
};
