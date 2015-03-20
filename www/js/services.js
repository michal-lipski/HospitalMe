angular.module('starter.services', [])
    .factory('Map',function(){
        return {
            get: function (lat,long) {
                var myLatlng = new google.maps.LatLng(lat,long);
                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"),mapOptions);
                return map;
            }
        };
    })

    .factory('Hospitals', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var hospitals = [
            {
                id: 0,
                name: "Mazowiecki Szpital Bródnowski w Warszawie Sp. z o.o.",
                address: "ul. Kondratowicza 8, 03-242 Warszawa",
                phone: "(22)-326-58-88",
                www: "www.szpital-brodnowski.waw.pl",
                type: ['okulista']
            },

            {
                id: 1,
                name: "Międzyleski Szpital Specjalistyczny w Warszawie",
                address: "ul. Bursztynowa 2, 04-749 Warszawa",
                phone: "(22)-473-53-33",
                www: "www.mssw.pl",
                type: ['okulista']
            },


            {
                id: 2,
                name: "Szpital Czerniakowski",
                address: "ul. Stępińska 19-25, 00-739 Warszawa",
                phone: "(22)-318-63-06",
                www: "www.szpitalczerniakowski.waw.pl",
                type: ['okulista']
            },


            {
                id: 3,
                name: "Centralny Szpital Kliniczny MSW w Warszawie",
                address: "ul. Wołoska 137, 02-507 Warszawa",
                phone: "(22)-508-15-10",
                www: "www.cskmswia.pl",
                type: ['okulista']
            },


            {
                id: 4,
                name: "Wojskowy Instytut Medyczny",
                address: "ul. Szaserów 128, 04-141 Warszawa",
                phone: "(22)-810-08-16",
                www: "www.wim.mil.pl",
                type: ['okulista']
            },


            {
                id: 5,
                name: "Samodzielny Publiczny Kliniczny Szpital Okulistyczny",
                address: "ul. Sierakowskiego 13, 03-709 Warszawa",
                phone: "(22)-511-62-10",
                www: "www.spkso.waw.pl",
                type: ['okulista']
            },


            {
                id: 6,
                name: "Szpital Kliniczny Dzieciątka Jezus",
                address: "ul. Williama Lindleya 4, 02-005 Warszawa",
                phone: "(22)-502-12-80",
                www: "www.dzieciatkajezus.pl",
                type: ['okulista']
            },


            {
                id: 7,
                name: "Samodzielny Szpital Kliniczny im. Prof. W. Orłowskiego",
                address: "ul. Czerniakowska 231, 00-416 Warszawa",
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
