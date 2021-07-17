import { Pet } from "../../models/Pet"

export class QueryResult {
    constructor(init?: Partial<QueryResult>) {
      Object.assign(this, init)
    }
  
    //estePrimerId puede ser postId o alertId dependiendo la query que lo llame
    alertOrPostId!:number
    locationId!: number
    pet!:Pet

    static fromJson(FilterJson: string): QueryResult {
      return Object.assign(new QueryResult(), FilterJson)
    }
  }
  