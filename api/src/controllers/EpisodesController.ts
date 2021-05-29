import { Request, Response } from 'express'
import { validationResult } from 'express-validator'



const addEpisode = async (req: Request, res: Response) => {
	const errors = validationResult(req)

	if(!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array()})
	}

	return res.status(200).json({ success: 'Total'})			
}


export default {
	addEpisode
}
