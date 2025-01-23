# Pogodynka - projekt AMIW

## Funkcje

- **Aktualna Pogoda**: Wyświetla temperaturę, wilgotność, prędkość/kierunek wiatru i jakość powietrza. Kierunek wyświetlany jest w formie "strzałki" skierowanej w odpowiednim kierunku.
- **Prognoza 7-dniowa**: Prognoza pogody z temperaturą, prawdopodobieństwem opadów, wiatrem, wilgotnością oraz jakością powietrza.
- **Interaktywna Mapa**: Apliakcja posiada zakładkę ```Maps```. W tej zakładce użytkownik może wybrać dowolne miejsce na mapie i sprawdzic prognozę pogody dla tego miejsca. W prawym dolnym rogu znajduje się przycisk help, który wyświetla wskazówki jak sprawdzić prognozę na mapie.
- **Wyszukiwanie Lokalizacji**: W prawym górnym rogu w pasku nawigacji oraz na środku strony głównej można wyszukac prognozę dla wybranego miejsca.
- **Responsywność**: Działa na komputerach i urządzeniach mobilnych
- **Animacje Pogodowe**: Unikalne animacje ikon dla różnych warunków pogodowych. Gdy wyłączy się ```Switch``` na stronie główne, włączane jest także animowane tło kafelka, które koresponduje z aktualną pogoda w mieście.
- **Indeks Jakości Powietrza**: Dane jakości powietrza (Europejski AQI).
- **Wykresy Pogodowe**: Wizualizacja prognozy pogody w formie wykresów przy użyciu biblioteki [Recharts](https://recharts.org/). Wykresy przedstawiają opady oraz temperature. 

## Wykorzystane API
- [Open Meteo Weather API](https://open-meteo.com/)
- [Open Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api)
- [IP Geolocation API](https://ip-api.com/)
- [Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

## Aplikacja a wymagania:
- Wykorzystanie wyżej wymienionych API 
- Wykorzystanie komponentow - (kazdy dzien posiada osobny komponent z prognoza pogody, zgodnie z wymaganiami komponenty z aktualną pogodą znajdują się w ```src/components/forecast/CurrentWeather.jsx``` oraz komponenty z prognozą na kolejne dni w ```src/components/forecast/DailyForecast.jsx```)
- Pobieranie danych asynchroniczne 
- Aktualna prognoza pogody dla wybranego miejsca na swiecie -  wyszkiwarka miejsc oraz zakładka ```'Maps'```
- Kierunek wiatru i jego predkosc w prognozie na 7 dni - zakladka ```'Forecast'``` (w formie iony odwróconej w odpowiednim kierunku)
- Informacje o terazniejszej pogodzie - zakladka ```'Forecast'```
- Komponenty sa odpowiednio odgraniczone, kazdy posiada kafelek ktory odpowiada za dane informacje
- Responsywnosc - strona dostosowuje sie do szerokosci, dziala rowniez na urzadzeniach mobilnych
- Zmiana tła w zależności od warunków pogodowych poprzez `Switch` w kafelkach (domyślnie wyłączona ze względu na moją wizję  designu strony, możliwość włączenia przez użytkownika)  