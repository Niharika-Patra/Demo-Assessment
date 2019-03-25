import Dexie from 'dexie';
export const db = new Dexie("userDb");
db.version(1).stores({
    review: 'imgId,email,title,year,type,poster,imdbRating,userRating,userCategory'
});

export const dbReg = new Dexie("registrationDb");
dbReg.version(1).stores({
    registration : 'email,name,mobile,address,password'
});
