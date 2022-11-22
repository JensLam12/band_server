const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand( new Band( 'Queen' ));
bands.addBand( new Band( 'Bon Jovi' ));
bands.addBand( new Band( 'Manowar' ));
bands.addBand( new Band( 'Iron Maiden' ));

//Sockets Messages
io.on('connection', client => {
    console.log('Connected client');
    client.emit('active-bands', bands.getBands() );
    
    client.on('disconnect', () => { 
        console.log('Disconnected client');
    });

    client.on('message', ( payload ) => {
        console.log(payload);
        io.emit('message', { admin: 'New message'})
    });

    client.on('vote-band', ( payload ) => {
        console.log(payload);

        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands() )
    });

    client.on('add-band', ( payload ) => {
        bands.addBand( new Band( payload.name ) );
        io.emit('active-bands', bands.getBands() )
    });

    client.on('remove-band', ( payload ) => {
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands() )
    });

    // client.on('emit-message', ( payload ) => {
    //     console.log(payload);
    //     //io.emit('new-message', payload ); // emmit everyone
    //     client.broadcast.emit('new-message', payload); // emmit everyone except the origin
    // });

});