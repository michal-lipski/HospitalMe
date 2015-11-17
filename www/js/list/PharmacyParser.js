angular.module('app.list')
    .factory('PharmacyParser', function () {
        return {
            parse: function (data) {
                var parsedData = _.map(data.result.featureMemberList, function (location) {

                    function prop(key, defaultValue) {
                        defaultValue = defaultValue || "";
                        var property = _.find(location.properties, {key: key});
                        return ( property ) ? property.value : defaultValue
                    }

                    return {
                        id: prop("OBJECTID"),
                        position: location.geometry.coordinates[0],
                        name: prop("OPIS", "Apteka"),
                        address: prop("ULICA") + " " + prop("NUMER"),
                        phone: prop("TEL_FAX").split("/")[0].split(",")[0],
                        hours: prop("godziny_pracy")
                    }
                });
                return parsedData;
            }
        };
    });