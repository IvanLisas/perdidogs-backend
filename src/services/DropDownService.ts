import { getRepository } from 'typeorm'
import { Color } from '../models/Color'
import { Size } from '../models/Size';
import { Length } from '../models/Length';
import { Breed } from '../models/Breed';
class DropDownService {
    async getAllColors(): Promise<Color[] | undefined>{
        return await getRepository(Color).find();
    }

    async getAllSizes(): Promise<Color[] | undefined>{
        return await getRepository(Size).find();
    }

    async getAllLengths(): Promise<Color[] | undefined>{
        return await getRepository(Length).find();
    }

    
    async getAllBreeds(): Promise<Color[] | undefined>{
        return await getRepository(Breed).find();
    }
}

const dropDownService = new DropDownService()
export default dropDownService
