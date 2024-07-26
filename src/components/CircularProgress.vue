<template>
    <div class="circular-progress-bar">
      <svg viewBox="0 0 36 36" class="circular-chart">
        <path
          class="circle-bg"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="circle"
          :stroke-dasharray="progress + ', 100'"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" class="percentage">{{ progress }}%</text>
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      progress: {
        type: Number,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .circular-chart {
    width: 40px;
    height: 40px;
    display: flex;
  }
  
  .circle-bg {
    fill: none;
    stroke: #eee;
    stroke-width: 3.8;
  }
  
  .circle {
    fill: none;
    stroke-width: 2.8;
    stroke: #ff5f6d;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
  }
  
  .percentage {
    fill: #666;
    font-size: 0.5em;
    text-anchor: middle;
  }
  
  @keyframes progress {
    0% {
      stroke-dasharray: 0, 100;
    }
  }
  </style>
  