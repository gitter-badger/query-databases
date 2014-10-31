var mongodb = require('mongodb');
var async = require('async');

function queryCompany(callback) {

    db.collection('company').find({}).toArray(function (companies) {
        callback(null, companies);
    });

}

function queryOrg(companies, callback) {

    async.each(companies, function (company, cb) {
        db.collection('org').find({}).toArray(function (orgs) {
            allOrgs.push(orgs)
            cb();
        });
    }, function (err) {
        if (err) {
            console.log('error');
        } else {
            callback(null, allOrg)
        }
    });

}

function queryRole(orgs, callback) {
    async.each(orgs, function (org, cb) {
        db.collection('role').find({}).toArray(function (roles) {
            allRoles.push(roles);
            cb();
        });
    }, function (err) {
        callback(null, allRole)
    });
}

function queryUser(roles, callback) {
    async.each(roles, function (role, cb) {
        db.collection('user').find({}).toArray(function (users) {
            allUser.push(users);
            cb();
        });
    }, function (err) {
        callback(null, allUser);
    });
}

function done(err, result) {
    // process allOrg, allRole, allUser
    console.log('done');
}

function deleteCompanyRelateInfo() {

    var allOrg = [];
    var allRole = [];
    var allUser = [];

    async.waterfall([
        queryCompany,
        queryOrg,
        queryRole,
        queryUser
    ], done );
}

deleteCompanyRelateInfo();
