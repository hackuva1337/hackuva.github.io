<template>
  <div>
    <section class="header start">
      <div class="container">
        <h2>
          Auch das Kleingedruckte<br />
          wird bei uns <em>groß</em> geschrieben.
        </h2>
        <p>
          In einer nahezu digitalisierten Welt verschwimmen allzu oft die
          Grenzen zwischen virtueller Schein- und der realen Welt.
        </p>
      </div>
    </section>
    <section class="content container">
      <h1>Impressum</h1>
      <p>Angaben gemäß § 5 TMG:</p>
      <p>
        <span class="console"><b>Hackuva - Inh. Kemal Aslan</b></span> <br />
        <br />
        Hoffmannallee 28<br />
        47533 Kleve<br />
        Germany
      </p>
      <table class="contact">
        <tr>
          <td>Telefon:</td>
          <td>+49 1522 / 4141 605</td>
        </tr>
        <tr>
          <td>E-Mail:</td>
          <td>info@hackuva.de</td>
        </tr>
        <tr>
          <td>Website:</td>
          <td>https://hackuva.de</td>
        </tr>
      </table>
      <span class="title"
        >Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</span
      >
      <p class="last">Hackuva, Kontaktdaten wie zuvor</p>
      <span class="title">Haftung für Inhalte</span>
      <p class="last">
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
        bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
        Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </p>
      <span class="title">Haftung für Inhalte</span>
      <p>
        Die Nutzung unserer Webseite ist in der Regel ohne Angabe
        personenbezogener Daten möglich. Soweit auf unseren Seiten
        personenbezogene Daten (beispielsweise Name, Anschrift oder
        eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf
        freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
        Zustimmung nicht an Dritte weitergegeben.
      </p>
      <p>
        Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei
        der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
        lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
        möglich.
      </p>
      <p class="last">
        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
        Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
        angeforderter Werbung und Informationsmaterialien wird hiermit
        ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
        ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von
        Werbeinformationen, etwa durch Spam-Mails, vor.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "presse",
  head() {
    return {
      tite: "Impressum - Hackuva ▊",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Hackuva ▊ - Impressum",
        },
        {
          hid: "robots",
          name: "robots",
          content: "noindex, follow, noarchive",
        },
      ],
    };
  },
};
</script>
