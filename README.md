# Dokumentáció -- BibleVerse v.1.0.0

## **1. Az alkalmazás célja**
Jelen alkalmazás a **BibleVerse v.1.0.0** , mely a Szentiras.hu backend API-a segítségével lehetővé teszi a gyors igehelykeresést és navigációt a Biblia szövegében.

A program tulajdonképpeni front-endjét Dr. Porkoláb Ádám készítette (https://www.porkolab.digital). A szerző további szoftverei és jelen program forráskódja a GitHubról tölthető le ([https://github.com/APorkolab](https://github.com/APorkolab)).

Az alkalmazás képes:

 - véletlenszerű igehely(ek) megjelenítésére,
 - ismert igehelyek esetén gyors kiválasztásra és lekérésre,
 - kulcsszó alapú keresésre.

A program alapértelmezetten a Káldi-Neovulgáta fordításból dolgozik. A későbbi programverziókban már lehetőség nyúlik fordítást választani.

### **1.1.  Verziótörténet**
#### *v1.0*

 - Frontend Angular 15-es alapú. 
 - A program Szentiras.hu API 2023.01.08-i változatával kompatibilis HTTP kéréseket generál,
 - A teljes, tervezett funkcionalitás elkészült.

## **2. Az alkalmazás telepítése**

1. Ha nincs telepítve a Git verziókezelő szoftver, akkor a https://git-scm.com weboldalról töltsük le és telepítsük fel a főoldalon megtalálható változatok közül az operációs rendszerünknek megfelelőt.

2. Ha nincs telepítve a NodeJS futtatókörnyezet, akkor a https://nodejs.org/en/ weboldalról töltsük le és telepítsük fel a főoldalon található, "LTS" megjelölésű változatot.

3. Ha nincs telepítve az Angular keretrendszer a rendszeren, akkor azt a PowerShell-ben kiadott `npm i -g @angular/cli` paranccsal ezt tegyük meg.

4. Le kell klónozni az adott GitHub repository tartalmát. Tehát a PowerShell-ben a következő parancsot kell kiadni:

   `git clone https://github.com/APorkolab/Bibleverse.git`

5. Telepíteni kell az alkalmazás függőségeit:

     - A terminálon be kell lépni a /frontend mappába és futtatni az `npm i` parancsot.*

6.1. Manuális telepítés esetén:

   - A terminálban ki kell adni az `ng build` parancsot.

   - A /frontend/dist/frontend mappa tartalmát be kell másolni a /backend/public mappába.

   VAGY

6.2. Automatikus telepítés esetén:

   - A terminálon be kell lépni a /backend mappába és futtatni az `npm run build` parancsot.
   - Fontos, hogy csak az egyik módszer szerint kell telepíteni.


## **3. Az alkalmazás indítása**

- Mind a backend, mind a frontend az `npm start` paranccsal indítható.
- A játék aktuális verziója a [https://bibleverse.porkolab.digital/] címen elérhető.

## **4. Kapcsolattartási információ**
##### Webfejlesztés, design: Dr. Porkoláb Ádám
 -   **A weboldallal és általános kérdésekkel, észrevételekkel kapcsolatban:**
Dr. Porkoláb Ádám (adam@porkolab.digital)
  
  
## **5. Felhasznált technológiák**
 - Legelőször is hálásan köszönöm a [Szentírás.hu](https://szentiras.hu/) fejlesztőinek, [Fodor Bertalannak](https://github.com/briff), [Elek Lászlónak](https://github.com/borazslo) és [Molnár Mártonnak](https://github.com/molnarm) a backend API-t! Isten áldja meg és segítse a készítőket további munkájuk során!

-   Köszönöm a Biblia könyveinek fejezet- és versszámait tartalmazó JSON file-t Ben Kuhlnak ([https://github.com/bkuhl/bible-verse-counts-per-chapter](https://github.com/bkuhl/bible-verse-counts-per-chapter)). Ez alapvető fontosságú volt, hogy véletlenszerű igehelyeket tudjak generálni. A hiányzó könyvek (Tób, Judit, Bölcs, Sír, Bár, 1Makk és 2Makk) adatait a [Szentírás.hu](https://szentiras.hu/) alapján pótoltam.
    
-   Köszönöm a TemplateMo-nak az ingyenes, Astro Motion sablont, amit testre szabhattam. ([https://templatemo.com/tm-560-astro-motion](https://templatemo.com/tm-560-astro-motion))

## **6. Tervek a következő verzióhoz:**
- Választható fordítás,
- Többnyelvűsítés (Biblaszöveg + kezelőfelület).
- Reszponzivitás fejlesztése.

------------------
# Documentation -- BibleVerse v.1.0.0

## **1. Purpose of the application**
This application is called **BibleVerse v.1.0.0** , which allows quick search and navigation in the Bible text using the Szentiras.hu backend API.

The front-end of the application was actually created by Dr. Ádám Porkoláb (https://www.porkolab.digital). Other software by the author and the source code of this application can be downloaded from GitHub ([https://github.com/APorkolab](https://github.com/APorkolab)).

The application can be downloaded from:

 - display random verb(s),
 - quick selection and retrieval of known verbs,
 - keyword-based search.

By default, the application works from the Káldi-Neovulgáta translation. In later versions of the program, it is possible to choose a long translation.

### **1.1. Version history**
#### *v1.0*

 - Frontend based on Angular 15. 
 - It generates HTTP requests compatible with Szentiras.hu API version 2023.01.08,
 - The complete designed functionality is ready.

## **2. Installing the application**

1. If you don't have the Git version control software installed, download and install the version for your operating system from https://git-scm.com.

2. If you do not have the NodeJS runtime environment installed, download and install the version marked "LTS" from https://nodejs.org/en/.

3. If you do not have the Angular framework installed on your system, do so by issuing the `npm i -g @angular/cli` command in PowerShell.

4. clone the contents of the GitHub repository. So in PowerShell, issue the following command:

   `git clone https://github.com/APorkolab/Bibleverse.git`

5. Install the application dependencies:

     - In the terminal, go to the /frontend folder and run `npm i`.

6.1. For manual installation:

   - In the terminal, issue the `ng build` command.

   - The contents of the /frontend/dist/frontend folder must be copied to the /backend/public folder.

   OR

6.2. For automatic installation:

   - In the terminal, go to the /backend folder and run `npm run build`.
   - It is important to install using only one of the methods.


## **3. Start the application**

- Both the backend and the frontend can be started with `npm start`.
- The current version of the game is available at [https://bibleverse.porkolab.digital/].

## **4. Contact information**
##### Web development, design by Dr. Ádám Porkoláb
 - **About the website and general questions and comments:**
Dr. Ádám Porkoláb (adam@porkolab.digital)
  
  
## **5. Technologies used**
 - First of all, I would like to thank the developers of [Szentírás.hu](https://szentiras.hu/), [Bertalan Fodor](https://github.com/briff), [László Elek](https://github.com/borazslo) and [Márton Molnár](https://github.com/molnarm) for the backend API! God bless and help the developers in their future work!

- Thanks to Ben Kuhl ([https://github.com/bkuhl/bible-verse-counts-per-chapter](https://github.com/bkuhl/bible-verse-counts-per-chapter)) for the JSON file containing the chapter and verse numbers of the books of the Bible. This was essential for generating random verses. I filled in the missing books (Tob, Judith, Wise, Sirius, Bar, 1 Macc and 2 Macc) using data from [Scripture.com](https://szentiras.hu/).
    
- Thanks to TemplateMo for the free Astro Motion template that I could customize ([https://templatemo.com/tm-560-astro-motion](https://templatemo.com/tm-560-astro-motion))

## **6. Plans for the next version:**
- Optional translation,
- Multilingualization (Bible text + interface).
- Improving responsiveness.
