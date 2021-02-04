new Vue({
  // ELEMENTO //
  el : '#app',

  // DATI //
  data : {
    // Lista contatti-chat
    contacts: [
      {
        name: 'Ottavio',
        avatar: '_1',
        visible: true,
        messages: [
          {
            date: '04/02/2021 10:30:55',
            text: 'A che ora finisce la lezione?',
            status: 'sent'
          },
          {
            date: '04/02/2021 10:34:00',
            text: 'MAI!',
            status: 'received'
          },
          {
            date: '04/02/2021 10:35:00',
            text: 'La lezione è in loop, perchè ho sbagliato a scrivere il ciclo',
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
            date: '03/02/2021 15:50:00',
            text: 'Ti piace la nuova versione di Facebook?',
            status: 'received'
          },
          {
            date: '03/02/2021 15:55:00',
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
            date: '03/02/2021 09:50:00',
            text: 'I want to ride my bicycle =(',
            status: 'received'
          },
          {
            date: '03/02/2021 14:30:35',
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
            date: '02/02/2021 20:50:00',
            text: 'Ho dimenticato gli occhiali a casa',
            status: 'received'
          },
          {
            date: '02/02/2021 21:00:15',
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
            date: '02/02/2021 15:30:55',
            text: 'Hai portato a spasso il cane?',
            status: 'sent'
          },
          {
            date: '02/02/2021 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent'
          },
          {
            date: '02/02/2021 16:15:22',
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
            date: '01/02/2021 16:30:00',
            text: 'Ciao come stai?',
            status: 'sent'
          },
          {
            date: '01/02/2021 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
          },
          {
            date: '01/02/2021 16:35:00',
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
            date: '01/02/2021 10:10:40',
            text: 'La Marianna va in campagna',
            status: 'received'
          },
          {
            date: '01/02/2021 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
          },
          {
            date: '01/02/2021 16:15:22',
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
            date: '01/02/2021 15:30:55',
            text: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
          },
          {
            date: '01/02/2021 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received'
          }
        ],
      }
    ],
    // Array accessi
    accesses : [],
    // Index contatto-chat selezionato
    selectedChat : 0,
    // Chiave di ricerca
    searchKey : '',
    // Visibilità opzioni messaggio
    menuView : {
      click : false,
      chat : false,
      index : false
    },
    // Visibilità submit button
    submitView : false,
    // Mio messaggio
    myMsg : ''
  },

  // METODI //
  methods : {
    // Funzione data corrente
    getCurrentDate : function(){
      const today = new Date();
      return {
        day : ('0' + today.getDate()).slice(-2),
        month :  ('0' + (today.getMonth()+1)).slice(-2),
        year : today.getFullYear(),
        hour : ('0' + today.getHours()).slice(-2),
        min: ('0' + today.getMinutes()).slice(-2),
        sec: ('0' + today.getSeconds()).slice(-2)
      }
    },

    // Funzione ultimo valore (messaggio-data)
    getLastValue : function(element, value, cut){
      if (element.messages.length > 0) {
        // recuperiamo l'ultima value in messages, definendone una lunghezza max
        let last = element.messages[element.messages.length - 1][value].slice(0, cut);
        // se lunghezza è uguale a lunghezza di caratteri max
        if (last.length > 5 && last.length === cut) {
          last += '...'
        }
        return last;
      }
    },

    // Funzione ricerca
    findMatch : function(){
      let key = this.searchKey.toLowerCase(); // searchKey in minuscolo
      let name;
      this.contacts.forEach((element) => {
        name = element.name.toLowerCase(); // name dell'elemnte in minuscolo
        if ( name.startsWith(key) || !key) { // se name include key, oppure è vuota
          element.visible = true;
        } else {
          element.visible = false;
        }
      });
    },

    // Funzione condizioni visibilità elemento in chat-list
    showIf : function(item){
      return item.messages.length > 0 && item.visible
    },

    // Funzione selezione index contatto-chat
    selectChat : function(index){
      this.selectedChat = index;
    },

    // Funzione ultimo accesso
    getLastAccess : function(){
      // recuperiamo array di messaggi dell'index contatto selezionato
      const msgs = this.contacts[this.selectedChat].messages;
      msgs.forEach(el => {
        // se il valore status è 'received' e 'date' non è già presente in accesses
        if (el.status === 'received' && !this.accesses.includes(el.date)) {
          this.accesses.push(el.date); // il valore 'date' entra in accesses
        }
      });
      return this.accesses[this.accesses.length - 1] // ultimo elemento di accesses
    },

    // Funzione toggle opzioni-messaggio
    toggMsgMenu : function(i){
      this.menuView = {
        click : !this.menuView.click,
        chat : this.selectedChat,
        index : i
      }
    },

    // Funzione condizioni toggle opzioni-messaggio
    toggMsgMenuIf : function(i){
      return this.menuView.click === true &&
      this.menuView.chat === this.selectedChat &&
      this.menuView.index === i
    },

    // Funzione nascondi pulsante submit
    hideMsgMenu : function(){
      this.menuView.click = false;
    },

    // Funzione toggle pulsante submit
    toggleSubmit : function(index){
      this.submitView = !this.submitView;
    },

    // Funzione nascondi pulsante submit
    hideSubmit : function(){
      return this.submitView = false;
    },

    // Funzione elimina messaggio
    deleteMsg : function(index){
      this.contacts[this.selectedChat].messages.splice(index, 1);
    },

    // Funzione scambio messaggi
    msgPass : function(){
      // destrutturazione data corrente
      const currentDate = this.getCurrentDate();
      let {day, month, year, hour, min, sec} = currentDate;
      // recuperiamo array di messaggi dell'index contatto selezionato
      const msgs = this.contacts[this.selectedChat].messages;
      if (this.myMsg) {
        msgs.push({   // invio mio messaggio
          date : `${day}/${month}/${year} ${hour}:${min}:${sec}`,
          text : this.myMsg,
          status : 'sent'
        });
        this.myMsg = ''; // l'input myMsg viene pulito
        // riposta dinamica interlocutore, dopo circa 1 secondo
        setTimeout(() => {
          let msg;
          switch (msgs[msgs.length - 1]['text']) {
            case 'ciao': msg = 'Ciao!'
            break;
            case 'Ciao': msg = 'Ciao!'
            break;
            case 'come stai?': msg = 'Bene, tu?'
            break;
            case 'Come stai?': msg = 'Bene, tu?'
            break;
            default: msg = 'Ok'
          }
          msgs.push({
            date : `${day}/${month}/${year} ${hour}:${min}:${sec}`,
            text : msg,
            status : 'received'
          });
        }, 1600)
      }
    }
  }
});
