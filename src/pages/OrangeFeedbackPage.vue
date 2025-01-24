<template>
  <div class="feedback-page">
    <div v-if="store.loading" class="loading">
      <p>Caricamento dati...</p>
    </div>
    <div v-else>
      <!-- Titolo -->
      <div class="feedback-header">
        <h1>Feedback - {{ selectedChoiceText }}</h1>
      </div>

      <!-- Campi di feedback -->
      <div class="feedback-fields">
        <FeedbackField v-for="q in selectedChoiceList" :key="q.id" :choiceText="q.text" :questionId="q.id"
          :choiceId="$route.params.choiceId" />
      </div>

      <!-- Textarea per commenti -->
      <div class="feedback-comments">
        <h3>Hai un ulteriore suggerimento per noi?</h3>
        <TextArea v-model="selectedChoiceAdditionalComment" />
      </div>

      <!-- Pulsanti di navigazione -->
      <div class="feedback-footer">
        <NavigationButtons @back="goBack" 
        :choiceId="$route.params.choiceId"
        @submit="submitFeedback()" />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "@/store.js";
import { startInactivityTimeout, resetInactivityTimeout } from "@/utils/GlobalTimeout";
import FeedbackField from "@/components/FeedbackField.vue";
import TextArea from "@/components/TextArea.vue";
import NavigationButtons from "@/components/NavigationButtons.vue";

export default {
  name: "OrangeFeedbackPage",
  components: { FeedbackField, TextArea, NavigationButtons },
  data() {
    return {
      store,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },

    //per tornare alla home page dopo 1 minuto di inattività
    handleUserInteraction() {
      resetInactivityTimeout(this.$router, 60000);
    },
    //per inviare i dat al server e andare alla pag thankyou
    submitFeedback() {
      // Passa il router al metodo submitFeedback dello store
      store.submitFeedback(this.$router); // Passa il router
    },

  },
  mounted() {
    // console.log("Choice ID ricevuto:", this.$route.params.choiceId);
    startInactivityTimeout(this.$router, 60000);
  },
  watch: {
    //controllo se l'utente ha interagito con la pagina
    "store.feedbackData.questions": {
      handler() {
        this.handleUserInteraction();
      },
      deep: true,
    },
    //controllo se l'utente ha interagito con la textarea
    "store.feedbackData.additionalComments"() {
      this.handleUserInteraction();
    },
  }, computed: {
    //genero la lista dei valori selezionati in base all id inviato
    selectedChoiceList() {
      let choiceId = this.$route.params.choiceId;
      let selectedChoice = this.store.feedbackData.choices.find(choice => choice.id === choiceId);
      return selectedChoice ? selectedChoice.list : [];
    },

    //genero il titolo dinamico del feedback
    selectedChoiceText() {
      let choiceId = this.$route.params.choiceId;
      let selectedChoice = this.store.feedbackData.choices.find(choice => choice.id === choiceId);
      return selectedChoice ? selectedChoice.text : "";
    },

    //sto provando a generare il textarea dinamico collegato all id della list
    selectedChoiceAdditionalComment: {
      // Getter: recupera additionalComment per l'oggetto corretto
      get() {
        const choiceId = this.$route.params.choiceId;
        const selectedChoice = this.store.feedbackData.choices.find(
          (choice) => choice.id === choiceId
        );
        return selectedChoice ? selectedChoice.additionalComment : ""; 
      },
      // Setter: aggiorna additionalComment per l'oggetto corretto
      set(newValue) {
        const choiceId = this.$route.params.choiceId; 
        const selectedChoice = this.store.feedbackData.choices.find(
          (choice) => choice.id === choiceId
        );
        if (selectedChoice) {
          selectedChoice.additionalComment = newValue;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.feedback-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0 0;
  width: 100%;

  .feedback-header {
    width: 100vw;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0;
    background: radial-gradient(circle, #ff9c3a 50%, #ff8930 80%, #ff7e28 100%);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

    h1 {
      font-size: 2.5rem;
      font-weight: bold;
      color: #3c3c3c;
      margin: 0;
    }
  }

  .feedback-comments {
    width: 80vw;
    margin: 0 auto;
    text-align: center;
    padding-top: 20px;

    h3 {
      text-align: center;
      font-size: 2rem;
    }
  }

  .feedback-footer {
    width: 50vw;
    margin: 0 auto;
    padding-top: 10px;
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
