Przykładowe wywołanie (pobranie danych mapy)
https://api.um.warszawa.pl/api/action/wfsstore_get?id=fd137190-3d65-4306-a85e-5e97e7f29a23&apikey=wartość

Przykładowe wywołanie (limit 5 rekordów)
https://api.um.warszawa.pl/api/action/wfsstore_get?id=fd137190-3d65-4306-a85e-5e97e7f29a23&limit=5&apikey=wartość

Przykładowe wywołanie (bbox)
https://api.um.warszawa.pl/api/action/wfsstore_get?id=fd137190-3d65-4306-a85e-5e97e7f29a23&bbox=21.02,52.21,21.03,51.25&apikey=wartość

Przykładowe wywołanie (circle)
https://api.um.warszawa.pl/api/action/wfsstore_get?id=fd137190-3d65-4306-a85e-5e97e7f29a23&circle=21.02,52.21,1000&apikey=wartość

Przykładowe wywołanie (filter)
https://api.um.warszawa.pl/api/action/wfsstore_get?id=fd137190-3d65-4306-a85e-5e97e7f29a23&filter=filter_parameters...... &apikey=wartość

Uwaga wartości parametrów należy dobrać do każdej mapy wektorowej indywidualnie w przypadku niepoprawnych wartości (np. parametrów bbox, circle lub filter) API zwraca błąd