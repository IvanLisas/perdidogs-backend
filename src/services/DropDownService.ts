import { getRepository } from 'typeorm'
import { Color } from '../models/Color'
import { Size } from '../models/Size';
import { Length } from '../models/Length';
import { Breed } from '../models/Breed';
class DropDownService {
    async getAllColors(): Promise<Color[] | undefined>{
        return await getRepository(Color).find({order:{description:'ASC'}});
    }

    async getAllSizes(): Promise<Size[] | undefined>{
        return await getRepository(Size).find({order:{description:'DESC'}});
    }

    async getAllLengths(): Promise<Length[] | undefined>{
        return await getRepository(Length).find({order:{description:'DESC'}});
    }

    
    async getAllBreeds(): Promise<Breed[] | undefined>{
        return await getRepository(Breed).find({order:{description:'ASC'}});
    }
}

const dropDownService = new DropDownService()
export default dropDownService
