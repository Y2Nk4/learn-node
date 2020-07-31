let Influx = require('influx'),
    request = require('request')

const ENV = {
    DB_HOST: 'localhost',
    DB_NAME: 'test_database',
    TEST_MEASUREMENT: 'test_measurement',
    STEAM_ACCOUNT_ID: '185512298'
}

let conn = new Influx.InfluxDB({
    host: ENV.DB_HOST,
    database: ENV.DB_NAME,
    schema: [
        {
            measurement: 'test_measurement', // equivalent to the concept of 'table' in MySQL
            fields: { // equivalent to column without index
                dynamic_contents: Influx.FieldType.STRING,
                steam_id64: Influx.FieldType.INTEGER,
                status: Influx.FieldType.INTEGER,
                playing_games: Influx.FieldType.STRING // game's id
            },
            tags: [ // equivalent to column with index
                'tag'
            ]
        }
    ]
});

(async () => {
    conn.getDatabaseNames()
        .then(result => {
            console.log('exist databases', result)
            if (!result.includes(ENV.DB_NAME)) {
                return conn.createDatabase(ENV.DB_NAME)
            }
        })
        /*.then(result => {
            request(`https://store.steampowered.com/dynamicstore/userdata/?id=${ENV.STEAM_ACCOUNT_ID}`, {
                method: 'GET'
            }, (err, res, body) => {
                if (err) {
                    console.error(err)
                    return Promise.reject(err)
                }
                let data = JSON.parse(body)
                return Promise.resolve(data)
            })
        })*/
        .then(() => {
            conn.writePoints()
        })
})()