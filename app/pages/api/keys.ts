import type { NextApiRequest, NextApiResponse } from "next";
import { encode, decode } from "js-base64";
import  sha1  from "sha1";

type Data = {
  commerce: string;
  development: {
    api_key: string;
    basic_auth: string;
  };
  production: {
    api_key: string;
    basic_auth: string;
  };
  date:string;
};

function RandomString(length:number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        let apiKeyDev = sha1(RandomString(4));
        let apiKeyProd = sha1(RandomString(4));

        const commerce = req.body.commerce;

        let basic_dev = encode(`${commerce}:${apiKeyDev}`);
        let basic_prod = encode(`${commerce}:${apiKeyProd}`);

        res.status(200).json({
        commerce,
        development: {
            api_key: apiKeyDev,
            basic_auth: basic_dev,
        },
        production: {
            api_key: apiKeyProd,
            basic_auth: basic_prod,
        },
        date: (new Date()).toISOString()
        });
    }else{
        //@ts-ignore 
        res.status(404).send("Bad Request");
    }

}
