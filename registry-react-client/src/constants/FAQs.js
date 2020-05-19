import React from "react";

export const FAQs = [
  {
    question: "Cum pot înregistra un document nou?",
    steps: [
      <React.Fragment>Accesați pagina <i className="fas fa-plus accordion-icon"/> <strong>Document nou</strong>.</React.Fragment>,
      <React.Fragment>Opțional: Dacă documentul are origine externă, alegeți opțiunea <strong>Document extern</strong> și introduceți originea sub câmpul <strong>Autor</strong>.</React.Fragment>,
      <React.Fragment>Introduceți titlul documentului.</React.Fragment>,
      <React.Fragment>Dacă destinația documentului este internă, indicați unul sau mai mulți destinatari scriind numele în câmpul respectiv și selectând opțiunea dorită din sugestiile apărute.</React.Fragment>,
      <React.Fragment>Opțional: Dacă documentul are destinație externă, alegeți opțiunea <strong>Destinație externă</strong> și introduceți destinația.</React.Fragment>,
      <React.Fragment>Opțional: Introduceți un mesaj pentru destinatar.</React.Fragment>,
      <React.Fragment>Confirmați înregistrarea noului document apăsând butonul <strong>Confirmă</strong>.</React.Fragment>
    ]
  },
  {
    question: "Cum pot vizualiza documentele care mi-au fost trimise?",
    steps: [
      <React.Fragment>De fiecare dată când primiți un document nou, veți fi notificat prin email.</React.Fragment>,
      <React.Fragment>Pentru a vizualiza documentele primite în aplicație, accesați pagina <i className="fas fa-inbox accordion-icon"/> <strong>Documente primite</strong>.</React.Fragment>,
    ]
  },
  {
    question: "Cum pot rezolva un document care mi-a fost trimis?",
    steps: [
      <React.Fragment>Accesați pagina <i className="fas fa-inbox accordion-icon"/> <strong>Documente primite</strong>.</React.Fragment>,
      <React.Fragment>Selectați documentul pe care vreți să îl rezolvați și apăsați butonul <strong>Rezolvă</strong>.</React.Fragment>,
      <React.Fragment>Opțional: Introduceți un comentariu.</React.Fragment>,
      <React.Fragment>Confirmați rezolvarea documentului apăsând butonul <strong>Confirmă</strong>.</React.Fragment>,
    ]
  },
  {
    question: "Cum pot trimite un document după ce a fost înregistrat?",
    steps: [
      <React.Fragment>Dacă documentul a fost înregistrat de către dumneavoastră, accsați pagina <i className="fas fa-paper-plane accordion-icon"/> <strong>Documentele mele</strong>.
      Dacă sunteți printre destinatarii documentului și doriți să îl trimiteti mai departe, accesați pagina <i className="fas fa-inbox accordion-icon"/> <strong>Documente primite</strong>.</React.Fragment>,
      <React.Fragment>Selectați documentul pe care vreți să îl trimiteți și apăsați butonul <strong>Trimite</strong>.</React.Fragment>,
      <React.Fragment>Indicați unul sau mai mulți destinatari scriind numele în câmpul respectiv și selectând opțiunea dorită din sugestiile apărute.</React.Fragment>,
      <React.Fragment>Opțional: Introduceți un mesaj pentru destinatar.</React.Fragment>,
      <React.Fragment>Confirmați trimiterea documentului apăsând butonul <strong>Confirmă</strong>.</React.Fragment>,
    ],
    note: <React.Fragment>Această acțiune nu poate fi realizată dacă documentul a fost deja arhivat.</React.Fragment>
  },
  {
    question: "Cum pot vedea dacă documentul meu a fost rezolvat de către destinatari?",
    steps: [
      <React.Fragment>Accesați pagina <i className="fas fa-paper-plane accordion-icon"/> <strong>Documentele mele</strong>.</React.Fragment>,
      <React.Fragment>Fiecare document are întreaga listă de destinatari indicată în dreptul câmpului <strong>Destinatari</strong>. Prezența unei bife <i className="fas fa-check-circle"/> în dreptul unui destinatar semnalează faptul ca acesta a rezolvat documentul respectiv.</React.Fragment>,
      <React.Fragment>Pentru a viazualiza toate detaliile despre acțiunile efectuate asupra documentului, accesați <strong>Istoric</strong>.</React.Fragment>,
    ]
  },
  {
    question: "Cum pot arhiva un document?",
    steps: [
      <React.Fragment>Accesați pagina <i className="fas fa-paper-plane accordion-icon"/> <strong>Documentele mele</strong>.</React.Fragment>,
      <React.Fragment>Selectați documentul pe care vreți să îl arhivați și apăsați butonul <strong>Arhivează</strong>.</React.Fragment>,
      <React.Fragment>Opțional: Introduceți un comentariu.</React.Fragment>,
      <React.Fragment>Confirmați arhivarea documentului apăsând butonul <strong>Confirmă</strong>.</React.Fragment>,
    ],
    note: <React.Fragment>Puteți arhiva doar documentele înregistrate de către dumneavoastră.</React.Fragment>
  },
  {
    question: "Cum pot încărca un fișier pentru un document?",
    steps: [
      <React.Fragment>Accesați pagina <i className="fas fa-paper-plane accordion-icon"/> <strong>Documentele mele</strong> sau <i className="fas fa-inbox accordion-icon"/> <strong>Documente primite</strong> și navigați către documentul dorit.</React.Fragment>,
      <React.Fragment>Apăsați butonul <i className="fas fa-file-upload fa-file-download-rem4"/> din dreptul câmpului <strong>Atașament</strong>.</React.Fragment>,
      <React.Fragment>Apăsați <strong>Choose File</strong> și alegeți fișierul dorit.</React.Fragment>,
      <React.Fragment>Confirmați apăsând butonul <strong>Confirmă</strong>.</React.Fragment>,
    ],
    note: <React.Fragment>Această acțiune nu poate fi realizată dacă documentul are deja un fișier încărcat. Descărcați fișierul existent folosind butonul <i className="fas fa-file-download fa-file-download-rem4 "/></React.Fragment>
  },
  {
    question: "Cum pot căuta documente?",
    steps: [
      <React.Fragment>Accesați pagina <i className="fas fa-table accordion-icon"/> <strong>Toate documentele</strong></React.Fragment>,
      <React.Fragment>Pentru a căuta după numărul de înregistrare, introduceți numărul în bara de căutare.</React.Fragment>,
      <React.Fragment>Pentru a căuta după titlu, introduceți termenul sau termenii care se regăsesc în titlu în bara de căutare.</React.Fragment>,
      <React.Fragment>Pentru a filtra documentele afișate după criterii adiționale, expandați bara de căutare apăsând pe <i className="fas fa-caret-down accordion-icon"/> și alegeți opțiunile dorite.</React.Fragment>,
      <React.Fragment>Apăsați <strong>Căutați</strong> pentru a afișa rezultatul căutării.</React.Fragment>,
    ]
  },
  {
    question: "Cum pot genera rapoarte?",
    steps: [
      <React.Fragment>Accesați pagina <i className="fas fa-table accordion-icon"/> <strong>Toate documentele</strong></React.Fragment>,
      <React.Fragment>Opțional: Folosiți bara de căutare pentru a restrânge lista de documente care vor apărea în raport.</React.Fragment>,
      <React.Fragment>Navigați spre partea de jos a paginii și apăsați <strong>Generare raport</strong>.</React.Fragment>,
      <React.Fragment>Selectați formatul dorit.</React.Fragment>,
      <React.Fragment>După ce va fi generat, raportul se va descărca automat.</React.Fragment>,
    ]
  }
]