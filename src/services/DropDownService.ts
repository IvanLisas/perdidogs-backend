import { getRepository } from 'typeorm'
import { Color } from '../models/Color'
import { Size } from '../models/Size';
import { FurLength } from '../models/FurLength';
import { Breed } from '../models/Breed';
import { PostStatus } from '../models/PostStatus';
import { AlertStatus } from '../models/AlertStatus';
class DropDownService {
    async getAllColors(): Promise<Color[] | undefined>{
        return await getRepository(Color).find({order:{description:'ASC'}});
    }

    async getAllSizes(): Promise<Size[] | undefined>{
        return await getRepository(Size).find({order:{description:'DESC'}});
    }

    async getAllLengths(): Promise<FurLength[] | undefined>{
        return await getRepository(FurLength).find({order:{description:'DESC'}});
    }

    
    async getAllBreeds(): Promise<Breed[] | undefined>{
        return await getRepository(Breed).find({order:{description:'ASC'}});
    }

        
    async getPostStatusById(id:number): Promise<PostStatus >{
        return await getRepository(PostStatus).findOneOrFail({Id:id});
    }

    async getAlertStatusById(id:number): Promise<AlertStatus >{
        return await getRepository(AlertStatus).findOneOrFail({Id:id});
    }
}

const dropDownService = new DropDownService()
export default dropDownService
