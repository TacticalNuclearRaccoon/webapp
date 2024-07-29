<template>
    <div class="container">
      <div :style="fillerStyles">
        <span class="label">{{ `${completed}%` }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from "vue";
  export default {
    name: "ProgressBar",
    props: {
      bgcolor: String,
      completed: Number,
    },
    setup(props) {
      const fillerStyles = computed(() => {
        return {
          height: "100%",
          width: `${props.completed}%`,
          backgroundColor: props.bgcolor,
          transition: "width 1s ease-in-out",
          borderRadius: "5px",
          textAlign: "right"
        };
      });
  
      return { fillerStyles };
    },
  };
  </script>

  <style scoped>
   .container {
    width: 100%;
    display: flex;
    border-radius: 60px;
    background-color: rgba(167, 161, 161, 0.1);
    height: 16px;
  }
  
  .label {
    padding: 5px;
    color: white;
    font-weight: bold;
  }
  </style>
  