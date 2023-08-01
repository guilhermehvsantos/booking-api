const fastify = require("fastify");
const BookingRepository = require("./bookings/BookingRepository");
const BookingService = require("./bookings/BookingService");
const BookingController = require("./bookings/BookingController");

const app = fastify({ logger: true});

const bookingRepository = new BookingRepository();
const bookingService = new BookingService(bookingRepository);
const bookingController = new BookingController(bookingService)

app.get("/home", (req, res) => {
    res.send({message: "Home Page!!"});
});

app.get("/api/bookings", (req, res) => {
    const { code, body} = bookingController.index(req)
    res.code(code).send(body)
})

app.post("/api/bookings", (req, res) => {
    const { code, body} = bookingController.save(req)

    res.code(code).send(body)
});

module.exports = app;