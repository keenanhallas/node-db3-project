const db = require("../data/db-config"); //import the connection/db-config file here
const { where } = require("../data/db-config");


//These all return promises
module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
};

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes")
        .where({ id })
        .first();
}

function findSteps(id) {
        
    /*
    select
        steps.id, steps.step_number, steps.instructions,
        schemes.scheme_name
    from steps
    join schemes on steps.scheme_id = schemes.id;
    */
    
    return db.select("sch.scheme_name", "s.step_number", "s.instructions", "s.id")
        .from("steps as s")
        .join("schemes as sch", "sch.id", "=", "s.scheme_id")
        .where({ scheme_id: id })
        .orderBy("s.step_number");
}

function add(scheme) {
    return db("schemes")
        .insert(scheme, "id") //is the "id" for Postgres?
        .returning("id")
        .then(([id]) => {
            return findById(id);
        });
}

function addStep(step, schemeId) {
    return db("steps")
        .where({ scheme_id: schemeId })
        .insert(step, "id") //is the "id" for Postgres?
        .returning("id")
        .then(() => {
            return findSteps(schemeId);
        });
}

function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes)
        .then(() => { //doesn't really matter on this layer what's being returned or any http details
            return findById(id);
        });
}

function remove(id) {
    const removed = findById(id);
    db("schemes")
        .where({ id })
        .del();
    return removed;
}

/*
function remove(id) {
    return db("schemes")
        .where({ id })
        .del();
        //should resolve to the removed scheme or null
}
*/