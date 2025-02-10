# Todo Sovellus

Tämä on Todo-sovellus, joka on rakennettu Reactin ja Viten avulla. Sovellus käyttää Firebasea käyttäjien todennukseen ja tietojen tallentamiseen.

## Ominaisuudet

- Käyttäjien rekisteröinti ja kirjautuminen
- Tehtävien lisääminen, muokkaaminen ja poistaminen
- Tehtävien priorisointi (korkea, keskitaso, matala)
- Tehtävien määräaikojen asettaminen
- Suojatut reitit, jotka estävät pääsyn kirjautumattomilta käyttäjiltä
- Automaattinen kirjautuminen ulos, jos käyttäjä on ollut passiivinen tietyn ajan

## Teknologiat

- **React**: Käyttöliittymän rakentamiseen
- **Vite**: Kehitysympäristön ja rakennustyökalun tarjoamiseen
- **Firebase**: Käyttäjien todennukseen ja tietokannan hallintaan
- **React Router**: Reitityksen hallintaan
- **Tailwind CSS**: Tyylien hallintaan

## Asennus

1. **Kloonaa tämä repositorio**:
   ```bash
   git clone https://github.com/kayttajanimi/todo-app.git
   ```

2. **Siirry projektikansioon**:
   ```bash
   cd todo-app
   ```

3. **Asenna riippuvuudet**:
   ```bash
   npm install
   ```

4. **Määritä Firebase**:
   - Luo Firebase-projekti ja lisää tarvittavat konfiguraatiot `src/firebase.js` tiedostoon.

5. **Käynnistä kehityspalvelin**:
   ```bash
   npm run dev
   ```

6. **Avaa selain** ja siirry osoitteeseen `http://localhost:3000`.

## Käyttö

- **Rekisteröityminen**: Luo uusi käyttäjätili syöttämällä sähköposti ja salasana.
- **Kirjautuminen**: Kirjaudu sisään olemassa olevalla käyttäjätililläsi.
- **Tehtävien hallinta**: Lisää, muokkaa ja poista tehtäviä. Voit myös asettaa tehtäville prioriteetteja ja määräaikoja.

