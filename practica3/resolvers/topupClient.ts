// @ts-ignore <>
import { Request, Response } from "express";
import ClientModelType from "../db/clients.ts";
import MovementModelType from "../db/movements.ts";

const topupClient = async (req: Request, res: Response) => {
    try {
        const {iban, quantity} = req.body;
        
        if (!iban ||  !quantity) {
        res.status(400).send("Missing details in body");
        return;
        }
        else{
            const client = await ClientModelType.findOne({iban})

            if (!client) {
                res.status(404).send("Client not Found");
            }
            else{
                client.balance += quantity
                const newMovement = new MovementModelType({
                    sender: "ES000000000000000000",
                    receiver: client.iban,
                    quantity: quantity,
                });

                await newMovement.save();  
                client.movements.push(newMovement);
                await client.save();
                res.status(200).send("Client topup correctly");
            }
        } 
    }
    catch (error){
        res.status(500).send("Error" + error);
    }
};

export default topupClient;