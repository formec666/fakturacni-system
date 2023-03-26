import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    
    const body = JSON.parse(req.body);
    if ( body.vystaveno !== null) {
        body.vystaveno = new Date();
    }
    if ( body.splatnost !== null) {
        body.splatnost = new Date(body.splatnost);
    }
    if (Number.isNaN(body.cena)) {
        body.cena = null;
    }
    
    const update = await prisma.faktura.update({
        where:{
            id: body.id,
        },
        data:{...body, cena: parseInt(body.cena)}
    })
    res.status(200).json({update});
  }
  