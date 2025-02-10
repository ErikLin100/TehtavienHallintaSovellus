# Tehtavien Hallinta Sovellus

Tämä on Tehtavien Hallinta Sovellus, joka on rakennettu Reactin ja Viten avulla. Sovellus mahdollistaa käyttäjien hallita tehtäviään tehokkaasti ja turvallisesti.

## Ominaisuudet

- **Käyttäjien Rekisteröinti ja Kirjautuminen**: Käyttäjät voivat luoda tilejä ja kirjautua sisään.
- **Tehtävien Hallinta**: Käyttäjät voivat lisätä, muokata ja poistaa tehtäviä.
- **Priorisointi**: Tehtäville voidaan asettaa prioriteetti (korkea, keskitaso, matala).
- **Määräajat**: Käyttäjät voivat asettaa määräaikoja tehtäville.
- **Suojatut Reitit**: Vain valtuutetut käyttäjät pääsevät suojattuihin osiin sovellusta.
- **Testit**: Sovelluksessa on kattavat testit komponenttien toiminnallisuuden varmistamiseksi.

## Asennus

1. **Kloonaa Repositorio**:
   ```bash
   git clone https://github.com/kayttajanimi/TehtavienHallintaSovellus.git
   ```

2. **Asenna Riippuvuudet**:
   ```bash
   npm install
   ```

3. **Käynnistä Kehitysympäristö**:
   ```bash
   npm run dev
   ```
## Testaus

Sovelluksessa on kattavat testit komponenttien toiminnallisuuden varmistamiseksi. Voit suorittaa testit seuraavalla komennolla:

```bash
npm run test
```

Testit on kirjoitettu käyttäen [Jest](https://jestjs.io/) -testauskehystä ja [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) -kirjastoa. Testit varmistavat, että sovelluksen eri osat toimivat odotetusti ja että käyttäjäkokemus on sujuva.

