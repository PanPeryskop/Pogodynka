# Pogodynka - projekt AMIW

### Aplikacja: [pogodynka.almeron.online](http://pogodynka.almeron.online)

## Funkcje
- **Aktualna Pogoda**: Wyświetla temperaturę, wilgotność, prędkość/kierunek wiatru i jakość powietrza. Kierunek wyświetlany jest w formie "strzałki" skierowanej w odpowiednim kierunku.
- **Prognoza 7-dniowa**: Prognoza pogody z temperaturą, prawdopodobieństwem opadów, wiatrem, wilgotnością oraz jakością powietrza.
- **Interaktywna Mapa**: Aplikacja posiada zakładkę ```Maps```. W tej zakładce użytkownik może wybrać dowolne miejsce na mapie i sprawdzić prognozę pogody dla tego miejsca. W prawym dolnym rogu znajduje się przycisk help, który wyświetla wskazówki jak sprawdzić prognozę na mapie.
- **Wyszukiwanie Lokalizacji**: W prawym górnym rogu w pasku nawigacji oraz na środku strony głównej można wyszukać prognozę dla wybranego miejsca.
- **Responsywność**: Działa na komputerach i urządzeniach mobilnych.
- **Animacje Pogodowe**: Unikatowe animacje ikon dla różnych warunków pogodowych. Gdy wyłączy się ```Switch``` na stronie głównej, włączane jest także animowane tło kafelka, które koresponduje z aktualną pogodą w mieście.
- **Indeks Jakości Powietrza**: Dane jakości powietrza (Europejski AQI).
- **Wykresy Pogodowe**: Wizualizacja prognozy pogody w formie wykresów przy użyciu biblioteki [Recharts](https://recharts.org/). Wykresy przedstawiają opady oraz temperaturę.

## Wykorzystane API
- [Open Meteo Weather API](https://open-meteo.com/)
- [Open Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api)
- [IP Geolocation API](https://ip-api.com/)
- [Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

## Aplikacja a wymagania:
- Wykorzystanie wyżej wymienionych API 
- Wykorzystanie komponentów - (każdy dzień posiada osobny komponent z prognozą pogody, zgodnie z wymaganiami komponenty z aktualną pogodą znajdują się w ```src/components/forecast/CurrentWeather.jsx``` oraz komponenty z prognozą na kolejne dni w ```src/components/forecast/DailyForecast.jsx```)
- Pobieranie danych asynchroniczne 
- Aktualna prognoza pogody dla wybranego miejsca na świecie - wyszukiwarka miejsc oraz zakładka ```'Maps'```
- Kierunek wiatru i jego prędkość w prognozie na 7 dni - zakładka ```'Forecast'``` (w formie ikony odwróconej w odpowiednim kierunku)
- Informacje o teraźniejszej pogodzie - zakładka ```'Forecast'```
- Komponenty są odpowiednio odgraniczone, każdy posiada kafelek, który odpowiada za dane informacje
- Responsywność - strona dostosowuje się do szerokości, działa również na urządzeniach mobilnych
- Zmiana tła w zależności od warunków pogodowych poprzez `Switch` w kafelkach (domyślnie wyłączona ze względu na moją wizję designu strony, możliwość włączenia przez użytkownika)