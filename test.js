const path = require('path');
const fs = require('fs').promises;
const processData = async (req, res) => {
  
    try {
      const inputData = await fs.readFile(inputFilePath, 'utf-8');
      const dataArray = inputData.trim().split(',');
  
      // Process each data point one by one using await
      for (const trainNo of dataArray) {  
        const inputtrainno = path.join(__dirname, '..','input.txt');
        const outputtrainno = path.join(__dirname, '..' , 'output.txt');
        const inputData = await fs.readFile(inputtrainno, 'utf-8');
        const dataArray = inputData.trim().split(',');
        try {
          const data = await fetchTrainno(trainNo);
    
          const outputFilePath = path.join(__dirname, '..', 'data', `${data.TrainNo}.json`);
          await fs.writeFile(`${outputFilePath}.json`, JSON.stringify(data, null, 2));

          console.log({ message: data.TrainNo });
          if (data.TrainNo != undefined) {
            
          await fs.appendFile(outputtrainno, `${dataArray.join(',')}\n`);
          }
          await fs.writeFile(inputtrainno, '');
    
        //   res.status(200).json({ message: data.TrainNo });
        } catch (error) {
          console.error('Error processing train number:', trainNo, error);
        }
        }

      // Clear the contents of the input file
      await fs.writeFile(inputFilePath, '');
  
      console.log('Processing complete.');
    } catch (error) {
      console.error('Error processing file:', error.message);
    }
  };

module.exports = processData