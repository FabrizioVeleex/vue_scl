import { reactive } from "vue";

export const store = reactive({
  loading: true,
  error: null,

  feedbackData: {},
  // selectedSatisfaction: null,

  async loadData() {
    try {
      this.loading = true;

      //Simula un ritardo nel caricamento
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // const response = await fetch("/api/v1/scl/choice/getChoice");
      // if (!response.ok) {
      //   throw new Error(`Errore nel caricamento: ${response.statusText}`);
      // }
      // const data = await response.json();

      // this.feedbackData = data;

      this.feedbackData = {
        "id": "jerl3j4lk3j4lj3l4jl3j4",
        "home": {
          "image": "/images/scl.jpg"
        },
        "choices": [
          {
            "id": "ejrejr89jrkjreljrlejrlì",
            "color": "",
            "icon": "/images/smile_10637092.png",
            "selected": 0,
            "text": "Soddisfatto!",
            "additionalComment": "",
            "list": []
          },
          {
            "id": "aaaa143i9489038409",
            "color": "orange",
            "icon": "/images/neutral_16382351.png",
            "selected": 0,
            "text": "Parzialmente Soddisfatto!",
            "additionalComment": "",
            "list": [
              {
                "id": "0",
                "text": "Come valuti la pulizia del nostro negozio?",
                "value": ""
              },
              {
                "id": "1",
                "text": "Hai trovato la merce che cercavi disponibile?",
                "value": ""
              },
              {
                "id": "2",
                "text": "Hai non trovato la merce che cercavi ?",
                "value": ""
              }
            ]
          },
          {
            "id": "herwqiohuerk9099494",
            "color": "red",
            "icon": "/images/angry_3741288.png",
            "selected": 0,
            "text": "Non Soddisfatto!",
            "additionalComment": "",
            "list": [
              {
                "id": "0",
                "text": "Come valuti la pulizia del nostro negozio?",
                "value": ""
              },
              {
                "id": "1",
                "text": "Hai trovato la merce che cercavi disponibile?",
                "value": ""
              }
            ]
          }
        ]
      }


      this.loading = false;
      this.error = null;
    } catch (err) {
      this.error = err.message;
      this.loading = false;
    }
  },

  //assegno id 
  selectedChoice(choiceId, router) {
    let indexChoice = this.feedbackData.choices.findIndex((e) => e.id === choiceId);

    console.log("choiceId", choiceId);
    console.log(this.feedbackData.choices);

    if (indexChoice !== -1) {
      this.feedbackData.choices[indexChoice].selected = 1;
    };

    if (this.feedbackData.choices[indexChoice].list.length === 0) {
      console.log("invio al server:", this.feedbackData);

      //invio  al server
      /*
      try {
        const response = await fetch("https://your-server-endpoint.com/submit-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.feedbackData),
        });

        if (!response.ok) {
          throw new Error(`Errore durante l'invio: ${response.statusText}`);
        }

        console.log("Feedback inviato con successo!");
      } catch (err) {
        console.error("Errore durante l'invio del feedback:", err.message);
      }
      */
      router.push("/thank-you");
    } else {
      router.push(`/orange-feedback/${choiceId}`);
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
    console.log("Scelta trovata:", theChoice);
    console.log("Domanda trovata:", question);
    console.log("Ho appena aggiornato question.value a:", newValue);
    console.log("FeedbackData:", this.feedbackData);
  },


  submitFeedback(router) {
    // Log dei dati inviati (facoltativo per debug)
    console.log("Invio dati al server:", JSON.stringify(this.feedbackData, null, 2));

    /*
    // Invio della richiesta
    const serverUrl = "https://your-server-endpoint.com/submit-feedback";
    fetch(serverUrl, {
      method: "POST", // Metodo POST per inviare dati
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(this.feedbackData), 
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Errore durante l'invio: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Feedback inviato con successo:", data);
      })
      .catch(err => {
        console.error("Errore durante l'invio del feedback:", err.message);
      });
      */

    router.push("/thank-you");
  },

});
