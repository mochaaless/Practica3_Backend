// @ts-ignore <>
import { Request, Response } from "express";
import ClientModelType from "../db/clients.ts";

const deleteClientsbyDNI = async (req: Request, res: Response) => {
  const dni = req.params.dni;

  try {
    const client = await ClientModelType.findOneAndRemove({dni}).exec();

    if (!client) {
      res.status(404).send("Client not Found");
      return;
    }
    else{
      res.status(200).send("Client deleted correctly");
    }
  } 
  catch{
    res.status(500).send("Error");
  }
};

export default deleteClientsbyDNI;