<template>
  <div class="feedback-field">
    <p class="feedback-question">{{ choiceText }}</p>
    <EmojiSelector :choice="store.feedbackData.choices"  @select="onSelect" size="small" />
  </div>
</template>

<script>
import EmojiSelector from "@/components/EmojiSelector.vue";
import { store } from "@/store.js";

export default {
  name: "FeedbackField",
  props: {
    choiceText: {
      type: String,
      required: true,
    },
    choiceId: {
      type: String,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
  },
  components: { EmojiSelector },
  data() {
      return {
        store,
      };
    },
    methods: {
    onSelect(selectedValue) {
      console.log("Ho ricevuto la selezione:", selectedValue);
      // Aggiorna il "value" della domanda nello store
      store.updateFieldValue(this.choiceId, this.questionId, selectedValue);
    },
  },

};
</script>

<style lang="scss" scoped>
.feedback-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;
  padding-left: 1.25rem;
  margin: 1.25rem 0px;

  .feedback-question {
    font-size: 1.5rem;
    margin: 0px;
    flex: 0 0 40%;
  }

  .emoji-selector {
    flex: 0 0 40%;
  }


}
</style>