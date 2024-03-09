// const { fetchPnr } = require("../service/confirmtkt")
const { fetchTrainno } = require("../service/confirmtkt-trainno")
const fs = require('fs').promises;
const path = require('path');

          var inputtrainno = path.join(__dirname, '..','input.txt');
          var outputtrainno = path.join(__dirname, '..' , 'output.txt');
const trainnoViaConfirmTkt = async (req,res)=>{

    try {
        const inputData = await fs.readFile(inputtrainno, 'utf-8');
        const dataArray = inputData.trim().split(',');
    
        // Process each data point one by one using await
        for (const trainNo of dataArray) {  
          const inputData = await fs.readFile(inputtrainno, 'utf-8');
          const dataArray = inputData.trim().split(',');
          try {
            const data = await fetchTrainno(trainNo);
      
            const outputFilePath = path.join(__dirname, '..', 'data', `${data.TrainNo}.json`);
            await fs.writeFile(`${outputFilePath}`, JSON.stringify(data, null, 2));

            if (typeof (data.TrainNo) != undefined) {
                await fs.appendFile(outputtrainno, `${dataArray.join(',')}\n`);
            }
  
            console.log({ message: data.TrainNo });
            await fs.writeFile(inputtrainno, '');
      
          //   res.status(200).json({ message: data.TrainNo });
          } catch (error) {
            console.error('Error processing train number:', trainNo, error);
          }
          }
  
        // Clear the contents of the input file
        await fs.writeFile(inputtrainno, '');
    
        console.log('Processing complete.');
      } catch (error) {
        console.error('Error processing file:', error.message);
      }
    };


module.exports = trainnoViaConfirmTkt