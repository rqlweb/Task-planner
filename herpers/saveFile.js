const fs = require('fs');

const file = './db/data.json';

const saveDB = ( data ) => {

  

    fs.writeFileSync( file, JSON.stringify( data ) );

}

const seeDB = () => {

    if( !fs.existsSync( file ) ){
        return null;
    }

    const data = fs.readFileSync( file, { encoding: 'utf8'});
    const totalData = JSON.parse( data );
    //console.log( totalData );

    return totalData;
}

module.exports = {
    saveDB,
    seeDB
}




