<template>
    <div class="thank-you-page">
      <div class="thank-you-content">
        <h1>Grazie per il tuo feedback!</h1>
        <p>Il tuo contributo è prezioso per noi e ci aiuta a migliorare ogni giorno.</p>
        <button @click="goHome" class="thank-you-button">Torna alla Home</button>
      </div>
    </div>
  </template>
  
  <script>
  import { startInactivityTimeout } from "@/utils/GlobalTimeout";
  
  export default {
    name: "ThankYouPage",
    methods: {
      goHome() {
        this.$router.push("/");
      },
    },
    mounted() {
      startInactivityTimeout(this.$router, 20000);
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .thank-you-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    background-color: #f4f4f9;
    padding: 2rem;
  
    .thank-you-content {
      position: relative;
      max-width: 600px;
      padding: 2rem;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #28a745;
      }
  
      p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        color: #333;
      }
  
      .thank-you-button {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        color: #ffffff;
        background: linear-gradient(45deg, #28a745, #218838);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
  
        position: absolute;
        bottom: 0%;
        left: 50%;
        transform: translate(-50%, 50%);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  
        &:hover {
          background: linear-gradient(45deg, #218838, #1e7e34);
          transform: translate(-50%, 50%) scale(1.05);
        }
  
        &:active {
          background: linear-gradient(45deg, #1e7e34, #145a27);
          transform: translate(-50%, 50%) scale(0.95);
        }
      }
    }
  }
  </style>