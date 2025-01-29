import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
    loading: true,
    feedbackData: { home: {}, choices: [] },

    async loadData() {
        this.loading = true;
        this.error = null;

        try {
            const response = await axios.get("http://localhost:3000/api/v1/scl/getHome");
            this.feedbackData = response.data;
        } catch (error) {
            this.error = "Errore nel caricamento dei dati";
            console.error("Errore nella richiesta API:", error);
            console.log(1)
        } finally {
            this.loading = false;
        }
    },

    //assegno id 
    async selectedChoice(choiceId, router) {
        let indexChoice = this.feedbackData.choices.findIndex((e) => e.id === choiceId);

        // console.log("choiceId", choiceId);
        // console.log(this.feedbackData.choices);

        if (indexChoice !== -1) {
            this.feedbackData.choices[indexChoice].selected = 1;
        }

        if (this.feedbackData.choices[indexChoice].list.length === 0) {
            // console.log("Invio dati al server:", JSON.stringify(this.feedbackData, null, 2));

            //invio  al server
            try {
                const response = await axios.post("http://localhost:3000/api/v1/scl/addFeedbackData",
                    this.feedbackData,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log("Feedback inviato con successo!", response.data);
            } catch (error) {
                console.error("Errore nell'invio del feedback:", error);
            }
            router.push("/thank-you");
        } else {
            router.push(`/page-feedback/${choiceId}`);
        }
    },

    updateFieldValue(choiceId, questionId, newValue) {
        // Trova la scelta corrispondente
        const theChoice = this.feedbackData.choices.find(c => c.id === choiceId);
        if (!theChoice) return; //messo li in maniera facoltativa per il futuro 

        // Trova la domanda nella lista
        const question = theChoice.list.find(q => q.id === questionId);
        if (!question) return;  //messo li in maniera facoltativa per il futuro 

        //qua converto gli id 32cifre facc. in valori da 0 a 2 (faccio un ciclo per il valore)
        let numericValue = null;

        for (let i = 0; i < this.feedbackData.choices.length; i++) {
            if (newValue === this.feedbackData.choices[i].id) {
                numericValue = i;
                break;
            }
        }

        question.value = numericValue;

        //controlli vari
        // console.log("Scelta trovata:", theChoice);
        // console.log("Domanda trovata:", question);
        // console.log("Ho appena aggiornato question.value a:", newValue);
        // console.log("FeedbackData:", this.feedbackData);
    },


    async submitFeedback(router) {
        // Log dei dati inviati (facoltativo per debug)
        // console.log("Invio dati al server:", JSON.stringify(this.feedbackData, null, 2));

         //invio  al server
         try {
            const response = await axios.post("http://localhost:3000/api/v1/scl/addFeedbackData",
                this.feedbackData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("Feedback inviato con successo!", response.data);
        } catch (error) {
            console.error("Errore nell'invio del feedback:", error);
        }

        router.push("/thank-you");
    },

});
