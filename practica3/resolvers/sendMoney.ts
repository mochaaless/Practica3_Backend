// @ts-ignore <>
import { Request, Response } from "express";
import MovementModelType from "../db/movements.ts";
import ClientModelType from "../db/clients.ts";

const sendMoney = async (req: Request, res: Response) => {
  try {
    const {iban_sender, iban_receiver, quantity} = req.body;
    
    if (!iban_sender || !iban_receiver || !quantity) {
      res.status(400).send("Missing details in body");
      return;
    }
    else{
        const exist_sender = await ClientModelType.findOne({iban : iban_sender});
        const exist_receiver = await ClientModelType.findOne({iban : iban_receiver});
        if (exist_sender && exist_receiver){
            if (exist_sender.balance < quantity){
                res.status(400).send("Insufficient balance");
            }
            else{
                exist_sender.balance -= quantity
                exist_receiver.balance += quantity
                const newMovement_sender = new MovementModelType({
                    sender: exist_sender.dni,
                    receiver: exist_receiver.dni,
                    quantity: -quantity,
                  });
                const newMovement_receiver = new MovementModelType({
                sender: exist_sender.iban,
                receiver: exist_receiver.iban,
                quantity: quantity,
                });
                await newMovement_sender.save();  
                await newMovement_receiver.save();

                exist_sender.movements.push(newMovement_sender);
                exist_receiver.movements.push(newMovement_receiver);
                
                await exist_sender.save();
                await exist_receiver.save();
                res.status(200).send("Successfully sent money" + newMovement_sender);
            }
        }
        else{
            res.status(404).send("Iban sender or Iban receiber dont exist");
        }
    }
  
  } 
  catch{
    res.status(500).send("Error");
    return;
  }
};

export default sendMoney;