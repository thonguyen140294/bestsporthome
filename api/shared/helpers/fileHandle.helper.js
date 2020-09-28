const fs = require('fs')
const admin = require('firebase-admin');
const bucket = admin.storage().bucket();
const uuidv4 = require('uuid/v4')

const upload = async (dir, name, extension, base64String) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${dir}/${name}.${extension}`, base64String, 'base64', function(err) {
            if(err){
                reject(err);
            }
            else{
                resolve()
            }
        });
    })
  }

const remove = async (dir) => {
    return new Promise((resolve, reject) => {
        fs.unlink(dir, function(err) {
            if(err){
                reject(err);
            }
            else{
                resolve()
            }
        });
    })
}

const  uploadToFirebase = async (directory, name, extension, base64String) => {
    let imageBuffer = new Buffer.from(base64String, 'base64');
    let file = bucket.file(`${directory}/${name}.${extension}`);
    let uuid = uuidv4()
    return new Promise((resolve, reject) => {
        file.save(imageBuffer, {
            metadata: { 
                contentType: `image/${extension}`,
                metadata: {
                    firebaseStorageDownloadTokens: uuid,
                }
            },
        })
        .then(() => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/bestsporthome-713ca.appspot.com/o/${(encodeURI(`${directory}/${name}.${extension}`)).replace("\/", "%2F")}?alt=media&token=${uuid}`;
            resolve(publicUrl);
        })
        .catch(error => {
            console.log(error)
            reject(error)
        })
    });
  }

const removeFromFirebase = async (dir, filename) => {
    return new Promise((resolve, reject) => {
        bucket.deleteFiles({
            prefix: `${dir}/${filename}`
        }, ((error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        }));
    });
}

module.exports = {
    upload,
    remove,
    uploadToFirebase,
    removeFromFirebase
}
