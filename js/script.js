new Vue({
    // ELEMENTO //
    el : '#app',

    // DATI //
    data : {
      // Lista contatti-chat
      contacts: [
        {
          name: 'Boolen teacher',
          avatar: '_1',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              text: 'A che ora finisce la lezione?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              text: 'La lezione è in loop, perchè ho sbagliato a scrivere il ciclo',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
              text: 'Quindi MAI! Ahahahahahaha!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Zuckerberg',
          avatar: '_2',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:50:00',
              text: 'Ti piace la nuova versione di Facebook?',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
              text: 'Senti, è la quarantesima volta che me lo chiedi.',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Freddie Mercury',
          avatar: '_3',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:50:00',
              text: 'I want to ride my bicycle =(',
              status: 'received'
            },
            {
              date: '10/01/2020 15:30:55',
              text: 'La bicycle è ancora in assistenza, purtroppo',
              status: 'sent'
            },
          ],
        },
        {
          name: 'Clark Kent',
          avatar: '_4',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:50:00',
              text: 'Ho dimenticato gli occhiali a casa',
              status: 'received'
            },
            {
              date: '10/01/2020 15:30:55',
              text: 'Superman!??? Ma dove è andato Clark?',
              status: 'sent'
            },
          ],
        },
        {
          name: 'Michele',
          avatar: '_5',
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
          avatar: '_6',
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
          avatar: '_7',
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
          avatar: '_8',
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
        }
      ],
      // Index contatto-chat selezionato
      selectedChat : 0,
      // Chiave di ricerca
      searchKey : '',
      // Array Lista visualizzata
      listOnDisplay : [],
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

      // Funzione ricerca
      stampList : function(){
        if (this.searchKey === '') {
          this.listOnDisplay = this.contacts
        } else {
          this.listOnDisplay = this.contacts.filter((element) => {
            return element.name == this.searchKey
          })
        }
      },

      // Funzione ultimo accesso
      getLastAccess : function(){
        // recuperiamo array di messaggi dell'index contatto selezionato
        const msgs = this.listOnDisplay[this.selectedChat].messages;
        // filtriamone solo i messaggi ricevuti
        const received = msgs.filter((element) => {
          return element.status === 'received';
        });
        // ritorniamo il valore data dell'ultimo messaggio
        return received[received.length - 1]['date'];
      },

      // Funzione data corrente
      getCurrentDate : function(){
        const today = new Date();
        return {
          day : ('0' + (today.getDate()+1)).slice(0, 2),
          month :  ('0' + (today.getMonth()+1)).slice(0, 2),
          year : today.getFullYear(),
          hour : today.getHours(),
          min: today.getMinutes(),
          sec: today.getSeconds()
        }
      },

      // Funzione scambio messaggi
      msgPass : function(){
        // destrutturazione data corrente
        const currentDate = this.getCurrentDate();
        let {day, month, year, hour, min, sec} = currentDate;
        // recuperiamo array di messaggi dell'index contatto selezionato
        const msgs = this.listOnDisplay[this.selectedChat].messages;
        msgs.push({   // invio mio messaggio
          date : `${day}/${month}/${year} ${hour}:${min}:${sec}`,
          text : this.myMsg,
          status : 'sent'
        });
        setTimeout(()=>{
          msgs.push({   // riposta dinamica interlocutore, dopo circa 1 secondo
            date : `${day}/${month}/${year} ${hour}:${min}:${sec}`,
            text : (msgs[msgs.length - 1]['text'] === 'Ciao') ? 'Ciao!' : 'Ok',

            /*
             text : {
              'Ciao' : (msgs[msgs.length - 1]['text'] === 'Ciao'),
              'Ok' : (msgs[msgs.length - 1]['text'] !== 'Ciao'),
            }
            */

            status : 'received'
          });
        }, 1500)
        this.myMsg = ''; // l'input myMsg viene pulito
      }
    }
  });
