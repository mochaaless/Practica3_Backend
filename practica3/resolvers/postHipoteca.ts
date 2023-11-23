// @ts-ignore <>
import { Request, Response } from "express";
import ClientModelType from "../db/clients.ts";
import HipotecaModelType from "../db/hipotecas.ts";
const addHipoteca = async (req: Request, res: Response) => {
  try {
    const {dni, quantity} = req.body;
    
    if (!dni || !quantity) {
      res.status(400).send("Missing details in body");
      return;
    }
    else{
      const exist_client = await ClientModelType.findOne({dni});
    
      if (exist_client){
        const cuote_price = quantity/20;
        const cuotes: number[] = new Array(20).fill(cuote_price);
        const newHipoteca = new HipotecaModelType({
            total_quantity: quantity,
            cuotes: cuotes,
            dni_client: dni,
        });

        await newHipoteca.save();  
        exist_client.hipoteca.push(newHipoteca);
        await exist_client.save();
        res.status(200).send(exist_client);
      }
      else{
        res.status(404).send("Client dont found");
      }
    }
  } catch{
    res.status(500).send("Error");
    return;
  }
};

export default addHipoteca;