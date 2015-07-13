describe('Pharmacy parese', function () {

    beforeEach(module('starter.services'));

    var pharmacyParser;

    beforeEach(inject(function (PharmacyParser) {
        pharmacyParser = PharmacyParser
    }));

    it("parses list of locations", function () {

        var data = {
            result: {
                featureMemberList: [
                    {
                        geometry: {
                            type: "ShapePoint",
                            coordinates: [
                                {
                                    latitude: "52.235154",
                                    longitude: "20.971456"
                                }
                            ]
                        },
                        properties: [
                            {
                                value: "1634",
                                key: "OBJECTID"
                            },
                            {
                                value: "Poligonowa",
                                key: "ULICA"
                            },
                            {
                                value: "1 lok. 2",
                                key: "NUMER"
                            },
                            {
                                value: "04-051",
                                key: "KOD"
                            },
                            {
                                value: "APTEKA",
                                key: "OPIS"
                            },
                            {
                                value: "pon.-pt. 08.00-21.00, sob. 09.00-15.00",
                                key: "godziny_pracy"
                            },
                            {
                                value: "Praga-Południe",
                                key: "DZIELNICA"
                            },
                            {
                                value: "Warszawa",
                                key: "JEDN_ADM"
                            },
                            {
                                value: "22 870-68-68",
                                key: "TEL_FAX"
                            },
                            {
                                value: "poligonowa@neostrada.pl",
                                key: "MAIL"
                            },
                            {
                                value: "czerwiec 2014",
                                key: "AKTU_DAN"
                            }
                        ]
                    }
                ]
            }
        };
        var parsedData = pharmacyParser.parse(data);

        expect(parsedData).toContain({
            id:"1634",
            position:{
                latitude: "52.235154",
                longitude: "20.971456"
            },
            name: "APTEKA",
            address: "Poligonowa 1 lok. 2",
            phone: "22 870-68-68",
            hours: "pon.-pt. 08.00-21.00, sob. 09.00-15.00"
        });
    });

});
