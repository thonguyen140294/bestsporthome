const admin = require('firebase-admin');

const db = admin.firestore();
const moment = require('moment');
const _ = require('lodash');

const create = async (url, data) => {
    return new Promise(async (resolve) => {
        let ref = await getRefFromUrl(url)
        data = _.omitBy(data, (value, key) => {
            return _.isUndefined(value)
        });
        if (data) {
            data.created_at = data.created_at ? data.created_at : moment().valueOf()
            data.updated_at = data.updated_at ? data.updated_at : data.created_at
        }
        ref.add(data).then(ref => {
            resolve(ref.id)
        })
        .catch((error) => {
            throw Error(error)
        });
    })
}

const update = async (url, data, isUpdateDate) => {
    return new Promise(async (resolve) => {
        data = _.omitBy(data, (value, key) => {
            return _.isUndefined(value)
        });
        if (!isUpdateDate) {
            data.updated_at = moment().valueOf()
        }
        let usersRef = await getRefFromUrl(url)
        usersRef.get()
        .then((docSnapshot) => {
            if (docSnapshot.exists) {
                usersRef.update(data).then(() => {
                    resolve('success')
                })
            }
            else {
                resolve()
            }
        })
        .catch((error) => {
            throw Error(error)
        });
    })
}

const remove = async (url, field) => {
    return new Promise(async (resolve) => {
        if(_.isUndefined(field)){
            const usersRef = await getRefFromUrl(url)
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    usersRef.delete().then(() => {
                        resolve('success')
                    })
                }
                else {
                    resolve()
                }
            });
        }
        else{
            const usersRef = await getRefFromUrl(url)
            usersRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    if(doc.data()[`${field}`]){
                        const FieldValue = admin.firestore.FieldValue;
                        usersRef.update({
                            [`${field}`]: FieldValue.delete()
                        }).then(() => {
                            resolve('success')
                        })
                        .catch((error) => {
                            throw Error(error)
                        });
                    }
                    else{
                        resolve()
                    }
                }
                else {
                    resolve()
                }
            });
        }
    })
}

const read = async (url) => {
    return new Promise(async (resolve) => {
        let queries = url.split(',')
        let id = queries[queries.length-1].split('/')[1]
        if(!id){
            let ref = await getRefFromUrl(url)
            ref.get()
            .then(snapshot => {
                const ref = []
                snapshot.forEach(doc => {
                    const data = doc.data()
                    data.id = doc.id
                    ref.push(data)
                });
                resolve(ref)
              })
              .catch(err => {
                console.log(err);
              });
        }
        else{
            let ref = await getRefFromUrl(url)
            ref.get()
            .then(doc => {
                if (!doc.exists) {
                    resolve();
                } else {
                    const data = doc.data()
                    data.id = doc.id
                    resolve(data);
                }
            })
            .catch(err => {
                throw Error(err);
            });
        }
    })
}

const queryTo = async (url, queries, limit, page) => {
    if(_.isUndefined(limit) && _.isUndefined(page)){
        return new Promise(async (resolve) => {
            let ref = await getRefFromUrl(url)
            for(const query of queries){
                ref = ref.where(query.field,query.compare,query.value)
            }
            ref.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    resolve();
                } else {
                    let ret = []
                    snapshot.forEach(doc => {
                        let data = doc.data()
                        data.id = doc.id
                        ret.push(data)
                    });
                    resolve(ret);
                }
            })
            .catch(err => {
                throw Error(err);
            });
        })
    }
    if(_.isUndefined(limit))limit = 10
    if(_.isUndefined(page))page = 1
    return new Promise(async (resolve) => {
        let ref = await getRefFromUrl(url)
        for(const query of queries){
            ref = ref.where(query.field,query.compare,query.value)
        }
        ref.limit(limit*page).get()
        .then(async snapshot => {
            if (snapshot.empty) {
                resolve()
            }
            if(page > 1){
                var lastVisible = snapshot.docs[limit*(page-1)-1];
                var ref = await getRefFromUrl(url)
                for(const query of queries){
                    ref = ref.where(query.field,query.compare,query.value)
                }
                ref.startAfter(lastVisible)
                .limit(limit)
                .get()
                .then(snap => {
                    const ref = []
                    snap.docs.forEach(doc=> {
                        const data = doc.data()
                        data.id = doc.id
                        ref.push(data)
                    })
                    resolve(ref)
                });
            }
            else{
                const ref = []
                snapshot.docs.forEach(doc=> {
                    const data = doc.data()
                    data.id = doc.id
                    ref.push(data)
                })
                resolve(ref)
            }
        })
    })
}

const queryPaginate = async (url, queries, limit, page) => {
    if(!limit)limit = 10
    else limit = parseInt(limit)
    if(!page)page = 1
    else page = parseInt(page)
    return new Promise(async (resolve) => {
        var ref = await getRefFromUrl(url)
        if(queries){
            for(const query of queries){
                ref = ref.where(query.field,query.compare,query.value)
            }
        }
        ref.orderBy('updated_at').limit(limit*page).get()
        .then(async snapshot => {
            if (snapshot.empty) {
                resolve()
            }
            if(page > 1){
                let total_page = snapshot.size/limit + (snapshot.size%limit ? 1 : 0)
                if(page > total_page){
                    resolve()
                }
                var lastVisible = snapshot.docs[limit*(page-1)-1];
                var ref = await getRefFromUrl(url)
                if(queries){
                    for(const query of queries){
                        ref = ref.where(query.field,query.compare,query.value)
                    }
                }
                ref.orderBy('updated_at').startAfter(lastVisible)
                .limit(limit)
                .get()
                .then(async snap => {
                    const items = []
                    snap.docs.forEach(doc=> {
                        const data = doc.data()
                        data.id = doc.id
                        items.push(data)
                    })
                    var ref = await getRefFromUrl(url)
                    if(queries){
                        for(const query of queries){
                            ref = ref.where(query.field,query.compare,query.value)
                        }
                    }
                    ref.get().then(snapshot => {
                        const total = {
                            amount : snapshot.size,
                            limit : limit,
                            page : page,
                            data : items,
                        }
                        resolve(total)
                    })
                });
            }
            else{
                const items = []
                snapshot.docs.forEach(doc=> {
                    const data = doc.data()
                    data.id = doc.id
                    items.push(data)
                })
                var ref = await getRefFromUrl(url)
                if(queries){
                    for(const query of queries){
                        ref = ref.where(query.field,query.compare,query.value)
                    }
                }
                ref.get().then(snapshot =>{
                    const total = {
                        amount : snapshot.size,
                        limit : limit,
                        page : page,
                        data : items,
                    }
                    resolve(total)
                })
            }
        })
    })
}

const getRefFromUrl = async (url) => {
    let ref = db;
    let queries = url.split(",");
    for(const query of queries){
        let collection = query.split('/')[0];
        let doc = query.split('/')[1];
        if(doc){
            ref = await ref.collection(collection).doc(doc)
        }
        else ref = await ref.collection(collection)
    }
    return ref
}

module.exports = {
    create,
    update,
    remove,
    read,
    queryTo,
    queryPaginate
}
