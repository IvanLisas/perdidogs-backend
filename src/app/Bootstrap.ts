import { Breed } from "../models/Breed";
import { Color } from "../models/Color";
import { Fur } from "../models/Fur";
import { Length } from "../models/Length";
import { Location } from "../models/Location";
import { Pet } from "../models/Pet";
import { Post } from "../models/Post";
import { PostStatus } from "../models/PostStatus";
import { Size } from "../models/Size";
import { User } from "../models/User";
import PostRepo from "../repos/PostRepo";
import { UserRepo } from "../repos/UserRepo";

export class Bootstrap {

  repoUser!: UserRepo
  repoPost!: PostRepo
  activo!:PostStatus
  pendiente!:PostStatus
  cancelada!: PostStatus
  inactiva!:PostStatus
  resuelto!:PostStatus
  sinRaza!: Breed
  borderCollie!: Breed
  overjeroAleman!: Breed
  caniche!: Breed
  pastorIngles!: Breed
  chihuahua!: Breed
  bulldogFrances!: Breed
  bulldogIngles!: Breed
  HuskySiberia!: Breed
  coker!: Breed
  canicheToy!: Breed
  barbincho!: Breed
  ovejeroBelga!: Breed
  galgo!:Breed
  yorkshire!:Breed
  corgie!:Breed
  dalmata!:Breed
  marronYBlanco!:Color
  blanco!:Color
  gris!: Color
  negro!: Color
  negroYBlanco!:Color
  marronYNegro!:Color
  marronNegroYBlanco!:Color
  marronBlancoYGris!:Color

  marron!: Color
  grisYBlanco!: Color
  largo!:Length
  corto!:Length
  sinPelo!:Length
  pequeño!: Size
  mediano!:Size
  grande!:Size
    
  //mascotas
    perro1 = new Pet ({name:"coki", sex:"Macho",hasCollar: false, fur: new Fur({color:this.negroYBlanco, length:this. corto}), breed:this.dalmata, size: this.grande})
    perro2 = new Pet ({name:"NN", sex:"Macho",hasCollar: true, fur: new Fur({color:this.grisYBlanco, length:this.corto}), breed:this.sinRaza, size: this.grande})
    perro3 = new Pet ({name:"NN", sex:"Hembra",hasCollar: true, fur: new Fur({color:this.blanco, length:this.largo}), breed:this.sinRaza, size: this.pequeño})
    perro4 = new Pet ({name:"NN", sex:"Hembra",hasCollar: false, fur: new Fur({color:this.marronYBlanco, length:this.largo}), breed:this.corgie, size: this.pequeño})
    perro5 = new Pet ({name:"NN", sex:"Macho",hasCollar: false, fur: new Fur({color:this.marronYNegro, length:this.largo}), breed:this.overjeroAleman, size: this.grande})
    perro6 = new Pet ({name:"pepito", sex:"Macho",hasCollar: false, fur: new Fur({color:this.marron, length:this.corto}), breed:this.chihuahua, size: this.pequeño})
    perro7 = new Pet ({name:"NN", sex:"Hembra",hasCollar: false, fur: new Fur({color:this.gris, length:this.corto}), breed:this.galgo, size: this.grande})
    perro8 = new Pet ({name:"NN", sex:"Hembra",hasCollar: true, fur: new Fur({color:this.blanco, length:this.mediano}), breed:this.sinRaza, size: this.grande})
    perro9 = new Pet ({name:"tyson", sex:"Macho",hasCollar: true, fur: new Fur({color:this.negro, length:this.corto}), breed:this.bulldogFrances, size: this.pequeño})
    perro10 = new Pet ({name:"NN", sex:"Hembra",hasCollar: false, fur: new Fur({color:this.blanco, length:this.mediano}), breed:this.ovejeroBelga, size: this.grande})
    perro11 = new Pet ({name:"Severino", sex:"Macho",hasCollar: false, fur: new Fur({color:this.negroYBlanco, length:this.mediano}), breed:this.HuskySiberia, size: this.grande})
    perro12 = new Pet ({name:"Lalo", sex:"Macho",hasCollar: false, fur: new Fur({color:this.marronYNegro, length:this.mediano}), breed:this.overjeroAleman, size: this.grande})
    perro13 = new Pet ({name:"NN", sex:"Macho",hasCollar: false, fur: new Fur({color:this.marronNegroYBlanco, length:this.mediano}), breed:this.sinRaza, size: this.grande})
    perro14 = new Pet ({name:"NN", sex:"Hembra",hasCollar: false, fur: new Fur({color:this.marronBlancoYGris, length:this.mediano}), breed:this.caniche, size: this.pequeño})
    perro15 = new Pet ({name:"NN", sex:"Macho",hasCollar: false, fur: new Fur({color:this.blanco, length:this.mediano}), breed:this.sinRaza, size: this.grande})
    perro16 = new Pet ({name:"NN", sex:"Hembra",hasCollar: false, fur: new Fur({color:this.marron, length:this.mediano}), breed:this.sinRaza, size: this.grande})
    perro17 = new Pet ({name:"Ramon", sex:"Macho",hasCollar: false, fur: new Fur({color:this.marronNegroYBlanco, length:this.mediano}), breed:this.sinRaza, size: this.grande})
    perro18 = new Pet ({name:"NN", sex:"Hembra",hasCollar: false, fur: new Fur({color:this.marronBlancoYGris, length:this.corto}), breed:this.galgo, size: this.grande})
    perro19 = new Pet ({name:"NN", sex:"Macho",hasCollar: false, fur: new Fur({color:this.negro, length:this.mediano}), breed:this.sinRaza, size: this.grande})
    perro20 = new Pet ({name:"NN", sex:"Hembra",hasCollar: false, fur: new Fur({color:this.marronBlancoYGris, length:this.corto}), breed:this.bulldogIngles, size: this.mediano})

   
   //users
    estefania= new User({ firstName: "Estefanía", lastName:"Di Pietro", email:"estefaniadipietro@gmail.com", password:"1234", isActive:true, pictures:["1.png","2.png","3.png","4.png"] })
    mariano= new User({ firstName: "Mariano", lastName:"Bottazzi", email:"bottazzimariano@gmail.com", password:"1234", isActive:true, pictures:[{"3.png"] })
    gabriel= new User({ firstName: "Gabriel", lastName:"Loy", email:"loygabriel@gmail.com", password:"1234", isActive:true, pictures:[{"3.png"] })
    ivan= new User({ firstName: "Ivan", lastName:"Lisa", email:"ivanelisas@gmail.com", password:"1234", isActive:true, pictures:[{"3.png"] })
  
    //location

          location_0001: Location = new Location({ x:-34.600585579493, y: -58.5127015868307})
          location_0002: Location = new Location({ x:-34.6275450762093, y: -58.4095720793038})
          location_0003: Location = new Location({ x:-34.5656755865268, y: -58.4701920657306})
          location_0004: Location = new Location({ x:-34.5848468758467, y: -58.4003567653869})
          location_0005: Location = new Location({ x:-34.6033788550838, y: -58.42654700069})
          location_0006: Location = new Location({ x:-34.6208161377736, y: -58.4679537700269})
          location_0007: Location = new Location({ x:-34.6161634167228, y: -58.4792055548214})
          location_0008: Location = new Location({ x:-34.5922954562596, y: -58.4542924673157})
          location_0009: Location = new Location({ x:-34.6278086583641, y: -58.4874410874275})
          location_0010: Location = new Location({ x:-34.5416441888152, y: -58.4528025584817})
          location_0011: Location = new Location({ x:-34.5912662690564, y: -58.4784363545438})
          location_0012: Location = new Location({ x:-34.6607775494006, y: -58.5019842585195})
          location_0013: Location = new Location({ x:-34.5984063340249, y: -58.3905971334064})
          location_0014: Location = new Location({ x:-34.6016548116584, y: -58.4246113191213})
          location_0015: Location = new Location({ x:-34.6491238226729, y: -58.497364203403})
          location_0016: Location = new Location({ x:-34.569254585532, y: -58.5066768333949})
          location_0017: Location = new Location({ x:-34.6168578111961, y: -58.389502672739})
          location_0018: Location = new Location({ x:-34.6175391298145, y: -58.4581715541145})
          location_0019: Location = new Location({ x:-34.6210862925472, y: -58.4099333582122})
          location_0020: Location = new Location({ x:-34.6654628899305, y: -58.4720827828095})
        
}