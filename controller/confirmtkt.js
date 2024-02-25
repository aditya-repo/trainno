const { fetchPnr } = require("../service/confirmtkt")

const confirmtkt = async (req,res)=>{

    const {pnr} = req.body

    const response = await fetchPnr(pnr)

    res.json(response)

}

module.exports = confirmtkt