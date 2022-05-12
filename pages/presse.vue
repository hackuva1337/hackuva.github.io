<template>
  <div>
    <section class="header start">
      <div class="container">
        <h2>Hackuva in der Presse</h2>
        <p>
          Lesen Sie selbst was die Presse über Hackuva und oder über seine
          Projekte schreibt.
        </p>
      </div>
    </section>
    <section class="content container">
      <h1>Presse</h1>
    </section>
    <section class="content container">
      <p><strong>Hackuva und Smart Cities</strong></p>
      <p>
        Bochumer Zeitung:
        <a
          href="https://www.bochumer-zeitung.com/regionales/87235619-stadt-dortmund-infos-allianz-f%C3%BCr-smart-cities-neue-internetseite-und-erste-pilotprojekte"
          >Allianz für Smart Cities</a
        >
      </p>
      <br />
      <p><strong>Hackuva Security Research</strong></p>
      <p>
        WIRED Magazin Meldung vom Oktober 2017:
        <a
          href="https://www.wired.de/collection/business/ueber-500-millionen-nutzer-schuerfen-unwissend-nach-kryptowaehrungen"
          >Über 500 Millionen Nutzer schürfen unwissend nach Kryptowährungen</a
        >
      </p>
      <p>
        ZDNet Meldung vom Oktober 2017:
        <a
          href="https://www.zdnet.de/88316269/coinhive-ueber-1-000-webseiten-mit-versteckten-krypto-minern/"
          >Über 1.000 Webseiten mit versteckten Krypto-Minern</a
        >
      </p>
      <p>
        Adguard Security Research Project vom November 2017:
        <a href="https://crypto.adguard.com/">The State of Cryptojacking</a>
      </p>
      <p>
        Golem Meldung vom November 2017:
        <a
          href="https://www.golem.de/news/coinhive-kryptominingskript-in-chat-widget-entdeckt-1711-131327.html"
          >Kryptominingskript in Chat-Widget entdeckt
        </a>
      </p>
      <p>
        Tages Anzeiger Meldung vom Feburar 2018:
        <a
          href="https://bazonline.ch/digital/internet/Schuerft-auch-Ihr-Computer-Bitcoins-fuer-Fremde/story/10926115"
          >Schürft auch Ihr Computer Bitcoins für Fremde?</a
        >
      </p>
    </section>
  </div>
</template>


<script>
export default {
  name: "presse",
  head() {
    return {
      tite: "Presse - Hackuva ▊",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Von Beiträgen zum Thema Smart Cities, bis hin zu IT-Sicherheit. Lesen Sie selbst, was die Presse über Hackuva schreibt.",
        },
      ],
    };
  },
};
</script>
