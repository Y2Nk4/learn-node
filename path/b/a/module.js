let path = require('path'),
    knex = require('knex')
module.exports = function () {
    let db = knex({
        client: 'sqlite3',
        connection: {
            filename: path.resolve('./data/mq_rpc_consumed_record_db.sqlite3')
        },
        useNullAsDefault: true
    })

    db.schema.hasTable('consumed_record')
        .then(result => {
            if (!result) {
                db.schema.createTable('consumed_record', (t) => {
                    t.string('request_id').unique()
                    t.string('created_at')
                })
                    .then((result) => {
                        console.log('created', result)
                        return Promise.resolve()
                    })
            } else {
                return Promise.resolve()
            }
        })
        .then(() => {
            return db('consumed_record').insert({
                request_id: 'asdada',
                created_at: Math.floor(Date.now()/1000)
            }).catch(() => {
                return Promise.resolve()
            })
        })
        .then(() => {
            return db('consumed_record').where('request_id', 'asdada')
                .count('request_id', {as: 'amount'})
                .then((result) => {
                    console.log(result[0].amount > 0)
                    return result[0].amount > 0
                })
        })
        .catch((error) => {
            console.error('Error while creating table', error)
        })
}