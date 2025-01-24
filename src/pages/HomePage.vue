<template>
    <div class="homepage">
      <div v-if="store.loading" class="loading">
        <p>Caricamento dati...</p>
      </div>
      <div v-else>
        <!-- Immagine della homepage -->
        <div class="homepage-image">
          <img :src="store.feedbackData.home.image" alt="Immagine della homepage" />
        </div>
  
        <!-- Titolo -->
        <div class="homepage-header">
          <h1>Come è stata la tua esperienza oggi?</h1>
        </div>
  
        <!-- Faccine -->
        <div class="emoji-container">
          <EmojiSelector
            :choice="store.feedbackData.choices"
            @select="store.selectedChoice($event, this.$router)"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { store } from "@/store.js";
  import EmojiSelector from "@/components/EmojiSelector.vue";
  
  export default {
    name: "HomePage",
    components: { EmojiSelector },
    data() {
      return {
        store,
      };
    },
    methods: {
     
    },
    mounted() {
      //carico tutti i dati in feeddbackData (e nello store)
      store.loadData(); 
    },
  };
  </script>
  
  <style lang="scss" scoped>
.homepage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  padding: 0;
  margin: 0;

  .homepage-image {
    flex: 0 0 60%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: cover;
    }
  }

  .homepage-header {
    flex: 0 0 auto;
    text-align: center;
    margin: 1rem 0;

    h1 {
      font-size: 2.5rem;
      font-weight: bold;
      color: #333;
    }
  }


}
  
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.5rem;
    color: #888;
  }
  </style>
  