// @ts-ignore <>
import { Request, Response } from "express";

import ClientModelType from "../db/clients.ts";
import GestorModelType from "../db/gestores.ts"

const generateRandomNumbersString = (): string => {
  const getRandomDigit = (): number => Math.floor(Math.random() * 10);
  const randomNumbers = Array.from({ length: 18 }, getRandomDigit);
  return randomNumbers.join('');
};

const addClient = async (req: Request, res: Response) => {
  try {
    const {dni, name, phone} = req.body;
    
    if (!dni || !name || !phone) {
      res.status(400).send("Missing details in body");
      return;
    }
    else{
      const exist_client = await ClientModelType.findOne({dni});
      if (!exist_client){
        let exist_iban = undefined;
        const ibanDigits = generateRandomNumbersString();
        const iban = `ES${ibanDigits}`;

        while (!exist_iban) {
          exist_iban = await ClientModelType.findOne({ iban });
          if (!exist_iban) {
            const gestor = await GestorModelType.findOne({
              hipotecas: { $exists: true, $not: { $size: 10 } },
            });
            if (gestor) {
              const newClient = new ClientModelType({dni, name, phone, iban, gestor });
              await newClient.save();
              res.status(200).send(newClient);
              return;
            } else {
              res.status(400).send("No existen gestores o no hay gestores con menos de 10 hipotecas");
              return;
            }
          }
        }
      }
      else{
        req.status(400).send("Client with that dni already exist");
      }
    }
  
  } 
  catch{
    res.status(500).send("Error");
    return;
  }
}

export default addClient;