new Vue({
    // ELEMENTO //
    el : '#app',

    // DATI //
    data : {
      // Lista contatti-chat
      contacts: [
        {
          name: 'Michele',
          avatar: '_1',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              text: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Ricordati di dargli da mangiare',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              text: 'Tutto fatto!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Fabio',
          avatar: '_2',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              text: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              text: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
              text: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Samuele',
          avatar: '_3',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              text: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              text: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
              text: 'Ah scusa!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Luisa',
          avatar: '_4',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              text: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
          ],
        },
      ],
      // Data corrente
      currentDate : {
        day : ('0' + (new Date().getDate()+1)).slice(0, 2) ,
        month :  ('0' + (new Date().getMonth()+1)).slice(0, 2) ,
        year : new Date().getFullYear(),
        hour : new Date().getHours(),
        min: new Date().getMinutes(),
        sec: new Date().getSeconds()
      },
      // Index contatto-chat selezionato
      selectedChat : 0,
      // Mio messaggio
      myMsg : ''
    },
    // METODI //
    methods : {
      // Funzione ultimo valore (messaggio-data)
      getLastValue : function(element, value, cut){
        // recuperiamo l'ultima value in messages, definendone una lunghezza max
        let last = element.messages[element.messages.length - 1][value].slice(0, cut);
        // se lunghezza è uguale a lunghezza di caratteri max
        if (last.length > 5 && last.length === cut) {
          last += '...'
        }
        return last;
      },

      // Funzione selezione index contatto-chat
      selectChat : function(index){
        this.selectedChat = index;
      },

      // Funzione ultimo accesso
      getLastAccess : function (){
        // recuperiamo array di messaggi dell'index contatto selezionato
        const msgs = this.contacts[this.selectedChat].messages;
        // filtriamone solo i messaggi ricevuti
        const received = msgs.filter((element) => {
          return element.status === 'received'
        });
        // ritorniamo il valore data dell'ultimo messaggio
        return received[received.length - 1]['date'];
      },

      // Funzione scambio messaggi
      msgPass : function(){
        // destrutturazione data corrente
        let {day, month, year, hour, min, sec} = this.currentDate;
        // recuperiamo array di messaggi dell'index contatto selezionato
        const msgs = this.contacts[this.selectedChat].messages;
        msgs.push({   // invio mio messaggio
          date : `${day}/${month}/${year} ${hour}:${min}:${sec}`,
          text : this.myMsg,
          status : 'sent'
        });
        this.myMsg = '';
        setTimeout(()=>{
          msgs.push({   // riposta interlocutore, dopo circa 1 secondo
            date : `${day}/${month}/${year} ${hour}:${min}:${sec}`,
            text : 'Ok',
            status : 'received'
          });
        }, 1500)
      }
    }
  });
