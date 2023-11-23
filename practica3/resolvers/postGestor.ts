// @ts-ignore <>
import { Request, Response } from "express";
import GestorModelType from "../db/gestores.ts";

const addGestor = async (req: Request, res: Response) => {
  try {
    const {name} = req.body;
    
    if (!name) {
      res.status(400).send("Missing details in body");
      return;
    }
    else{
      const exist_gestor = await GestorModelType.findOne({name});
    
      if (!exist_gestor){
        const newGestor = new GestorModelType({ name });
        await newGestor.save();

        res.status(200).send(newGestor);
      }
      else{
        res.status(400).send("Gestor already exist");
      }
    }
  } catch{
    res.status(500).send("Error");
    return;
  }
};

export default addGestor;