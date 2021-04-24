
const express = require('express');
const path = require('path');

//------------------------------------------------

const app = express();
const PORT = process.env.PORT || 3000;

//------------------------------------------------

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//----------------- OBJECTS ------------------------------

let reservationsList = [
    {
        customerName: "hulk",
        phoneNumber: "555-555-5555",
        customerEmail: "hulk@mail.com",
        customerID: 02
    },
    {
        customerName: "Charlie",
        phoneNumber: "555-555-5555",
        customerEmail: "hulk@mail.com",
        customerID: 03
    }
];

let waitList = [
    {
        customerName: "Jane",
        phoneNumber: "555-555-5555",
        customerEmail: "jane@mail.com",
        customerID: 03
    }
]

//------------------ ROUTES ----------------------------

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')))
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'home.html')))
app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')))
app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')))

// app.get('/tables', (req, res) => {
//     const pathParam = req.params.revervationlist;
//     res.send([reservationsList, waitList]);

//     // return res.json(reservationsList);
// })

//Links to API data
app.get('/api/tables', (req, res) => res.json(reservationsList));
app.get('/api/waitlist', (req, res) => res.json(waitList));

//Make a reservation
app.post('/api/reserve', (req, res) => {
    const newReservation = req.body;
    newReservation.routeName = newReservation.customerName.replace(/\s+/g, '').toLowerCase();

    if(reservationsList.length > 4){
        newReservation.isBooked = false;
        waitList.push(newReservation);
        res.send("Tables are full, You will be added to the wait list");
    }else{
        newReservation.isBooked = true;
        reservationsList.push(newReservation);
    }
    
    res.json(newReservation);
})

//Clear the table
app.get('/api/clear', (req, res) => {
    reservationsList = [];
    waitList = [];
    res.send("Reservation and Wait lists are cleared");
})



//------------------ LISTENER ------------------------
app.listen(PORT, () => console.log("App is running..."));