angular.module('starter.services', [])

    .factory('Hospitals', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var hospitals = [
            {
                id: 0,
                name: "Mazowiecki Szpital Bródnowski w Warszawie Sp. z o.o.",
                address: "03-242 Warszawa, ul. Kondratowicza 8",
                phone: "(22)-326-58-88",
                www: "www.szpital-brodnowski.waw.pl",
                type: ['okulista']
            },

            {
                id: 1,
                name: "Międzyleski Szpital Specjalistyczny w Warszawie",
                address: "04-749 Warszawa, ul. Bursztynowa 2",
                phone: "(22)-473-53-33",
                www: "www.mssw.pl",
                type: ['okulista']
            },


            {
                id: 2,
                name: "Szpital Czerniakowski",
                address: "00-739 Warszawa, ul. Stępińska 19-25",
                phone: "(22)-318-63-06",
                www: "www.szpitalczerniakowski.waw.pl",
                type: ['okulista']
            },


            {
                id: 3,
                name: "Centralny Szpital Kliniczny MSW w Warszawie",
                address: "02-507 Warszawa, ul. Wołoska 137",
                phone: "(22)-508-15-10",
                www: "www.cskmswia.pl",
                type: ['okulista']
            },


            {
                id: 4,
                name: "Wojskowy Instytut Medyczny",
                address: "04-141 Warszawa, ul. Szaserów 128",
                phone: "(22)-810-08-16",
                www: "www.wim.mil.pl",
                type: ['okulista']
            },


            {
                id: 5,
                name: "Samodzielny Publiczny Kliniczny Szpital Okulistyczny",
                address: "03-709 Warszawa, ul. Sierakowskiego 13",
                phone: "(22)-511-62-10",
                www: "www.spkso.waw.pl",
                type: ['okulista']
            },


            {
                id: 6,
                name: "Szpital Kliniczny Dzieciątka Jezus",
                address: "02-005 Warszawa, ul. Lindleya 4",
                phone: "(22)-502-12-80",
                www: "www.dzieciatkajezus.pl",
                type: ['okulista']
            },


            {
                id: 7,
                name: "Samodzielny Szpital Kliniczny i. Prof. W. Orłowskiego",
                address: "00-416 Warszawa, ul. Czerniakowska 231",
                phone: "(22)-584-12-62",
                www: "www.szpital-orlowskiego.pl",
                type: ['okulista']
            }
        ];

        return {
            all: function () {
                return hospitals;
            },
            get: function (hospitalId) {
                for (var i = 0; i < hospitals.length; i++) {
                    if (hospitals[i].id === parseInt(hospitalId)) {
                        return hospitals[i];
                    }
                }
                return null;
            }
        };
    });
