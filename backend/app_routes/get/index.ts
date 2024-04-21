import { PrismaClient } from '@prisma/client';
import { Express, Request, Response, Router } from 'express';
const prisma = new PrismaClient();

const router = Router();

type TableName = 'user' | 'target' | 'location'; 

router.get('/:table', async (req: Request, res: Response) => {
    try {
        const { table } = req.params;
        const where = req.body.where;
        const orderBy = req.body.orderBy;
        const maxRows = req.body.maxRows;
        const take = maxRows ? parseInt(maxRows, 10) : undefined;

        let record;
        switch (table) {
            case 'user':
                record = await prisma.user.findMany({ where, orderBy: orderBy, take });
                break;
            case 'target':
                record = await prisma.target.findMany({ where, orderBy: orderBy, take });
                break;
            case 'location':
                record = await prisma.location.findMany({ where, orderBy: orderBy, take });
                break;
            case 'targetsOnUsers':
                record = await prisma.targetsOnUsers.findMany({ where, orderBy: orderBy, take });
                break;
            default:
                return res.status(400).json({ error: 'Invalid table name' });
        }

        res.json({
            record
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export { router as router_get };

