const { fetchPnr } = require("../service/confirmtkt")

const confirmtkt = async (req,res)=>{

    const {pnr} = req.body

    const data = await fetchPnr(pnr)

    

    const response = {
        "pnr": data.Pnr,
        "trainno": data.TrainNo,
        "trainname": data.TrainName,
        "doj": data.Doj,
        "bookingdate": data.BookingDate,
        "sourcedoj": data.SourceDoj,
        "from": data.From,
        "to": data.To,
        "class": data.Class,
        "reservationupto": data.ReservationUpto,
        "boardingpoint": data.BoardingPoint,
        "class": data.Class,
        "passengercount": data.PassengerCount,
        "passengerstatus": data.PassengerStatus.map(passenger => ({
            "currentberthno": passenger.CurrentBerthNo,
            "currentcoachid": passenger.CurrentStatusNew === 'CNF' ? passenger.CurrentCoachId : passenger.CurrentStatusNew + ' ' + passenger.CurrentCoachId
        }))
    };

    res.status(200).json(response)

}

module.exports = confirmtkt