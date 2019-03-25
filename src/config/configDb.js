import Dexie from 'dexie';
const db = new Dexie("userDb");
db.version(1).stores({
    review: 'imgId,email,title,year,type,poster,imdbRating,userRating,userCategory'
});

export default db;