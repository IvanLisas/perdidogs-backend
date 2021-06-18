import { getRepository } from 'typeorm'

import { Breed } from '../models/Breed'
import { Color } from '../models/Color'
import { Fur } from '../models/Fur'
import { Length } from '../models/Length'
import { Location } from '../models/Location'
import { Pet } from '../models/Pet'
import { Picture } from '../models/Picture'
import { Post } from '../models/Post'
//import { PostStatus } from '../models/PostStatus'
import { Rol } from '../models/Rol'
import { Size } from '../models/Size'
import { User } from '../models/User'

export class Bootstrap {
  // activo!: PostStatus
  // pendiente!: PostStatus
  // cancelada!: PostStatus
  // inactiva!: PostStatus
  // resuelto!: PostStatus
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
  galgo!: Breed
  yorkshire!: Breed
  corgie!: Breed
  dalmata!: Breed
  color1!: Color
  color2!: Color
  color3!: Color
  color10!: Color
  color4!: Color
  color5!: Color
  color6!: Color
  color7!: Color
  color8!: Color
  color9!: Color
  estefania!: User
  gabriel!: User
  ivan!: User
  mariano!: User
  perro1!: Pet
  perro2!: Pet
  perro3!: Pet
  perro4!: Pet
  perro5!: Pet
  perro6!: Pet
  perro7!: Pet
  perro8!: Pet
  perro9!: Pet
  perro10!: Pet
  perro11!: Pet
  perro12!: Pet
  perro13!: Pet
  perro14!: Pet
  perro15!: Pet
  perro16!: Pet
  perro17!: Pet
  perro18!: Pet
  perro19!: Pet
  perro20!: Pet
  largo1!: Length
  largo2!: Length
  largo3!: Length
  size1!: Size
  size2!: Size
  size3!: Size
  rolGenerico!: Rol
  rolReestricto!: Rol
  location_0001!: Location
  location_0002!: Location
  location_0003!: Location
  location_0004!: Location
  location_0005!: Location
  location_0006!: Location
  location_0007!: Location
  location_0008!: Location
  location_0009!: Location
  location_0010!: Location
  location_0011!: Location
  location_0012!: Location
  location_0013!: Location
  location_0014!: Location
  location_0015!: Location
  location_0016!: Location
  location_0017!: Location
  location_0018!: Location
  location_0019!: Location
  location_0020!: Location
  picture_0001!: Picture
  picture_0002!: Picture
  picture_0003!: Picture
  picture_0004!: Picture
  picture_0005!: Picture
  picture_0006!: Picture
  picture_0007!: Picture
  picture_0008!: Picture
  picture_0009!: Picture
  picture_0010!: Picture
  picture_0011!: Picture
  picture_0012!: Picture
  picture_0013!: Picture
  picture_0014!: Picture
  picture_0015!: Picture
  picture_0016!: Picture
  picture_0017!: Picture
  picture_0018!: Picture
  picture_0019!: Picture
  picture_0020!: Picture
  picture_0021!: Picture
  picture_0022!: Picture
  picture_0023!: Picture
  picture_0024!: Picture
  picture_0025!: Picture
  picture_0026!: Picture
  picture_0027!: Picture
  picture_0028!: Picture
  picture_0029!: Picture
  picture_0030!: Picture
  post0001!: Post
  post0002!: Post
  post0003!: Post
  post0004!: Post
  post0005!: Post
  post0006!: Post
  post0007!: Post
  post0008!: Post
  post0009!: Post
  post0010!: Post
  post0011!: Post
  post0012!: Post
  post0013!: Post
  post0014!: Post
  post0015!: Post
  post0016!: Post
  post0017!: Post
  post0018!: Post
  post0019!: Post
  post0020!: Post
  post0021!: Post
  post0022!: Post
  post0023!: Post
  post0024!: Post
  pelaje1!: Fur
  pelaje2!: Fur
  pelaje3!: Fur
  // activo!: UserStatus
  // pendiente!:UserStatus
  // inactivo!:UserStatus

  async run(): Promise<void> {
    await this.createColors()
    await this.createSizes()
    await this.createLengths()
    await this.createFurs()
    await this.createBreed()
    await this.createUsers()
    await this.createDogs()
    await this.createLocations()
    await this.createPictures()
    await this.createPosts()
  }

  //Colors
  async createColors(): Promise<void> {
    console.log('******************************Creando colores******************************')
    this.color1 = new Color({ description: 'Blanco' })
    this.color2 = new Color({ description: 'Negro' })
    this.color3 = new Color({ description: 'Beige' })
    this.color4 = new Color({ description: 'Gris' })
    this.color5 = new Color({ description: 'Marrón' })

    await getRepository(Color).save([this.color1, this.color2, this.color3, this.color4, this.color5])
  }

  async createBreed(): Promise <void> {
    console.log("******************************creando razas******************************")
  this.sinRaza = new Breed ({description: "sinRaza"})
  this.borderCollie = new Breed ({description:"borderCollie"})
  this.overjeroAleman = new Breed ({ description: "overjeroAleman"})
  this.caniche = new Breed ({description: "pequeño"})
  this.pastorIngles = new Breed ({description:"mediano"})
  this.chihuahua = new Breed ({ description: "grande"})
  this.bulldogFrances = new Breed ({description: "pequeño"})
  this.bulldogIngles = new Breed ({description:"mediano"})
  this.HuskySiberia = new Breed ({ description: "grande"})
  this.coker = new Breed ({description: "pequeño"})
  this.canicheToy = new Breed ({description:"mediano"})
  this.barbincho = new Breed ({ description: "grande"})
  this.ovejeroBelga = new Breed ({ description: "grande"})
  this.galgo = new Breed ({description: "pequeño"})
  this.yorkshire = new Breed ({description:"mediano"})
  this.corgie = new Breed ({ description: "grande"})
  this.dalmata = new Breed ({ description: "grande"})
  await getRepository(Breed).save([this.sinRaza, this.borderCollie,this.overjeroAleman, this.caniche, this.pastorIngles,this.chihuahua, this.bulldogFrances, this.bulldogIngles,
  this.HuskySiberia,this.coker,this.canicheToy, this.barbincho,this.ovejeroBelga, this.galgo,this.yorkshire,this.corgie,this.dalmata])
 }


  async createSizes(): Promise <void> {
    console.log("******************************creando tamaños******************************")
  this.size1 = new Size ({description: "Pequeño"})
  this.size2 = new Size ({description:"Mediano"})
  this.size3 = new Size ({ description: "Grande"})
  await getRepository(Size).save([this.size1, this.size2,this.size3])
 }


  async createLengths(): Promise<void> {
    console.log('******************************Creando Largos de pelos******************************')
    this.largo1 = new Length({ description: 'Corto' })
    this.largo2 = new Length({ description: 'Largo' })
    this.largo3 = new Length({ description: 'No tiene' })
    await getRepository(Length).save([this.largo1, this.largo2, this.largo3])
  }

 async createFurs(): Promise <void>  {
  console.log("******************************pelo******************************")
  this.pelaje1 = new Fur ({color: this.color1, length: this.largo1})
  this.pelaje2 = new Fur ({ color: this.color2, length: this.largo2})
  this.pelaje3 = new Fur ({ color: this.color3, length: this.largo3})
  await getRepository(Fur).save([this.pelaje1, this.pelaje2,this.pelaje3])
 }
  //mascotas
  async createDogs(): Promise<void> {
    console.log('******************************Creando perritos******************************')
    //este metodo es para buscar en la BD.
    // const color9 = await getRepository(Color)
    //cuando hago fur voy a tener que hacer fur:: marron

    this.perro1 = new Pet({ name: 'coki', sex: 'Macho', hasCollar: false, fur: this.pelaje1, breed: this.dalmata, size: this.size3 })
    this.perro2 = new Pet({ name: 'NN', sex: 'Macho', hasCollar: true, fur: this.pelaje2, breed: this.sinRaza, size: this.size2 })
    this.perro3 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: true, fur: this.pelaje3, breed: this.sinRaza, size: this.size1 })
    this.perro4 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, fur: this.pelaje1, breed: this.corgie, size: this.size1 })
    this.perro5 = new Pet({ name: 'NN', sex: 'Macho', hasCollar: false, fur: this.pelaje2, breed: this.overjeroAleman, size: this.size3 })
    this.perro6 = new Pet({ name: 'pepito', sex: 'Macho', hasCollar: false, fur: this.pelaje3, breed: this.chihuahua, size: this.size1 })
    this.perro7 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, fur: this.pelaje1, breed: this.galgo, size: this.size3 })
    this.perro8 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: true, fur: this.pelaje2, breed: this.sinRaza, size: this.size3 })
    this.perro9 = new Pet({ name: 'tyson', sex: 'Macho', hasCollar: true, fur: this.pelaje3, breed: this.bulldogFrances, size: this.size1 })
    this.perro10 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, fur: this.pelaje1, breed: this.ovejeroBelga, size: this.size3 })
    this.perro11 = new Pet({ name: 'Severino', sex: 'Macho', hasCollar: false, fur: this.pelaje2, breed: this.HuskySiberia, size: this.size3 })
    this.perro12 = new Pet({ name: 'Lalo', sex: 'Macho', hasCollar: false, fur: this.pelaje3, breed: this.overjeroAleman, size: this.size3 })
    this.perro13 = new Pet({ name: 'NN', sex: 'Macho', hasCollar: false, fur: this.pelaje1, breed: this.sinRaza, size: this.size3 })
    this.perro14 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, fur: this.pelaje2, breed: this.caniche, size: this.size1 })
    this.perro15 = new Pet({ name: 'NN', sex: 'Macho', hasCollar: false, fur: this.pelaje3, breed: this.sinRaza, size: this.size3 })
    this.perro16 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, fur: this.pelaje1, breed: this.sinRaza, size: this.size3 })
    this.perro17 = new Pet({ name: 'Ramon', sex: 'Macho', hasCollar: false, fur: this.pelaje2, breed: this.sinRaza, size: this.size3 })
    this.perro18 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, fur: this.pelaje3, breed: this.galgo, size: this.size3 })
    this.perro19 = new Pet({ name: 'NN', sex: 'Macho', hasCollar: false, fur: this.pelaje1, breed: this.sinRaza, size: this.size3 })
    this.perro20 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, fur: this.pelaje2, breed: this.bulldogIngles, size: this.size2 })
    await getRepository(Pet).save([
      this.perro1,
      this.perro2,
      this.perro3,
      this.perro4,
      this.perro7,
      this.perro6,
      this.perro5,
      this.perro8,
      this.perro9,
      this.perro10,
      this.perro11,
      this.perro12,
      this.perro13,
      this.perro14,
      this.perro15,
      this.perro16,
      this.perro17,
      this.perro18,
      this.perro19,
      this.perro20
    ])
  }

  //userStatus

  // async createUserStatus(): Promise <void>{
  //   this.activo = new UserStatus({description:"activo"})
  //   this.pendiente = new UserStatus({description:"pendiente"})
  //   this.inactivo = new UserStatus({description:"inactivo"})

  //   await getRepository(UserStatus).save([this.activo, this.pendiente, this.inactivo])
  // }
  //users
  async createUsers(): Promise<void> {
    console.log('******************************Creando user******************************')
    this.estefania = new User({ firstName: 'Estefanía', lastName: 'Di Pietro', email: 'estefaniadipietro@gmail.com', password: '1234', isActive: true })
    this.mariano = new User({ firstName: 'Mariano', lastName: 'Bottazzi', email: 'bottazzimariano@gmail.com', password: '1234', isActive: true })
    this.gabriel = new User({ firstName: 'Gabriel', lastName: 'Loy', email: 'loygabriel@gmail.com', password: '1234', isActive: true })
    this.ivan = new User({ firstName: 'Ivan', lastName: 'Lisa', email: 'ivanelisas@gmail.com', password: '1234', isActive: true })
    await getRepository(User).save([this.estefania, this.mariano, this.ivan, this.gabriel])
  }
  //location
  async createLocations(): Promise<void> {
    console.log('******************************Creando Localizaciones******************************')
    this.location_0001 = new Location({ x: -34.600585579493, y: -58.5127015868307 })
    this.location_0002 = new Location({ x: -34.6275450762093, y: -58.4095720793038 })
    this.location_0003 = new Location({ x: -34.5656755865268, y: -58.4701920657306 })
    this.location_0004 = new Location({ x: -34.5848468758467, y: -58.4003567653869 })
    this.location_0005 = new Location({ x: -34.6033788550838, y: -58.42654700069 })
    this.location_0006 = new Location({ x: -34.6208161377736, y: -58.4679537700269 })
    this.location_0007 = new Location({ x: -34.6161634167228, y: -58.4792055548214 })
    this.location_0008 = new Location({ x: -34.5922954562596, y: -58.4542924673157 })
    this.location_0009 = new Location({ x: -34.6278086583641, y: -58.4874410874275 })
    this.location_0010 = new Location({ x: -34.5416441888152, y: -58.4528025584817 })
    this.location_0011 = new Location({ x: -34.5912662690564, y: -58.4784363545438 })
    this.location_0012 = new Location({ x: -34.6607775494006, y: -58.5019842585195 })
    this.location_0013 = new Location({ x: -34.5984063340249, y: -58.3905971334064 })
    this.location_0014 = new Location({ x: -34.6016548116584, y: -58.4246113191213 })
    this.location_0015 = new Location({ x: -34.6491238226729, y: -58.497364203403 })
    this.location_0016 = new Location({ x: -34.569254585532, y: -58.5066768333949 })
    this.location_0017 = new Location({ x: -34.6168578111961, y: -58.389502672739 })
    this.location_0018 = new Location({ x: -34.6175391298145, y: -58.4581715541145 })
    this.location_0019 = new Location({ x: -34.6210862925472, y: -58.4099333582122 })
    this.location_0020 = new Location({ x: -34.6654628899305, y: -58.4720827828095 })
    await getRepository(Location).save([
      this.location_0001,
      this.location_0002,
      this.location_0003,
      this.location_0004,
      this.location_0005,
      this.location_0006,
      this.location_0007,
      this.location_0008,
      this.location_0009,
      this.location_0010,
      this.location_0011,
      this.location_0012,
      this.location_0013,
      this.location_0014,
      this.location_0015,
      this.location_0016,
      this.location_0017,
      this.location_0018,
      this.location_0019,
      this.location_0020
    ])
  }
  //pictures
  async createPictures(): Promise<void> {
    console.log('******************************Creando pictures******************************')
    this.picture_0001 = new Picture({ url: 'im001.png' })
    this.picture_0002 = new Picture({ url: 'im002.png' })
    this.picture_0003 = new Picture({ url: 'im002.png' })
    this.picture_0004 = new Picture({ url: 'im003.png' })
    this.picture_0005 = new Picture({ url: 'im004.png' })
    this.picture_0006 = new Picture({ url: 'im004.png' })
    this.picture_0007 = new Picture({ url: 'im001.png' })
    this.picture_0008 = new Picture({ url: 'im002.png' })
    this.picture_0009 = new Picture({ url: 'im002.png' })
    this.picture_0010 = new Picture({ url: 'im003.png' })
    this.picture_0011 = new Picture({ url: 'im004.png' })
    this.picture_0012 = new Picture({ url: 'im004.png' })
    this.picture_0013 = new Picture({ url: 'im001.png' })
    this.picture_0014 = new Picture({ url: 'im002.png' })
    this.picture_0015 = new Picture({ url: 'im002.png' })
    this.picture_0016 = new Picture({ url: 'im003.png' })
    this.picture_0017 = new Picture({ url: 'im004.png' })
    this.picture_0018 = new Picture({ url: 'im034.png' })
    this.picture_0019 = new Picture({ url: 'im0341.png' })
    this.picture_0020 = new Picture({ url: 'im122.png' })
    this.picture_0021 = new Picture({ url: 'im112.png' })
    this.picture_0022 = new Picture({ url: 'im018.png' })
    this.picture_0023 = new Picture({ url: 'im019.png' })
    this.picture_0024 = new Picture({ url: 'im020.png' })
    this.picture_0025 = new Picture({ url: 'im021.png' })
    this.picture_0026 = new Picture({ url: 'im022.png' })
    this.picture_0027 = new Picture({ url: 'im023.png' })
    this.picture_0028 = new Picture({ url: 'im012.png' })
    this.picture_0029 = new Picture({ url: 'im006.png' })

    await getRepository(Picture).save([
      this.picture_0001,
      this.picture_0002,
      this.picture_0003,
      this.picture_0004,
      this.picture_0005,
      this.picture_0006,
      this.picture_0007,
      this.picture_0008,
      this.picture_0009,
      this.picture_0010,
      this.picture_0011,
      this.picture_0012,
      this.picture_0013,
      this.picture_0014,
      this.picture_0015,
      this.picture_0016,
      this.picture_0017,
      this.picture_0018,
      this.picture_0019,
      this.picture_0020
    ])
  }
  //posts
  async createPosts(): Promise<void> {
    console.log("******************************creando publicaciones******************************")
    this.post0001 = new Post({ 
      description: 'Perro encontrado en la calle artigas al 80..',
      location: this.location_0001, 
      pet: this.perro1,
      owner: this.estefania,   pictures: [this.picture_0001, this.picture_0002] })
    this.post0002 = new Post({
      description: 'encontrado en Berazategui, está lastimado...',
      location: this.location_0002,
      pet: this.perro2,
      owner: this.ivan,
      pictures: [this.picture_0004]
    })
    this.post0003 = new Post({
      description: 'La concha de tu madre..',
      location:this.location_0003,
      pet: this.perro3,
      pictures: [this.picture_0004, this.picture_0005, this.picture_0006],
      owner: this.gabriel
     
    })
    // this.post0004 = new Post({
    //   description: 'encontrado en ..',
    //   location: this.location_0003,
    //   pet: this.perro4,
    //   pictures: [this.picture_0014, this.picture_0015, this.picture_0017],
    //   owner: this.mariano
    // })
    // this.post0005 = new Post({ description: 'Perro encontrado en la calle artigas al 80..', location: this.location_0001, owner: this.estefania,  pictures: [this.picture_0001, this.picture_0002] })
    // this.post0006 = new Post({
    //   description: 'Dos perritos perdidos sobre avenida crovara...',
    //   location: this.location_0004,
    //   owner: this.estefania,
    //   pictures: [this.picture_0004, this.picture_0005, this.picture_0007]
    // })
    // this.post0007 = new Post({
    //   description: 'Alguien lo conoce? está en la puerta de mi casa...',
    //   location: this.location_0005,
    //   owner: this.estefania,
    //   pictures: [this.picture_0004, this.picture_0005, this.picture_0006]
    // })
    // this.post0008 = new Post({
    //   description: 'encontrado: tiene chapita y un celu que nadie contesta...',
    //   location: this.location_0006,
    //   owner: this.estefania, 
    //   pictures: [this.picture_0014, this.picture_0015, this.picture_0017]
    // })
    // this.post0009 = new Post({ description: 'galgos sueltos en av san martin..', location: this.location_0001, owner: this.estefania,   pictures: [this.picture_0001, this.picture_0002] })
    // this.post0010 = new Post({
    //   description: 'san martin 3400, perro macho con collar corriendo..',
    //   location: this.location_0002,
    //   owner: this.estefania,
    //   pictures: [this.picture_0004, this.picture_0005, this.picture_0007]
    // })
    // this.post0011 = new Post({
    //   description: 'Está muy asustada, por favor compartamos así localizamos a sus dueños...',
    //   location: this.location_0002,
    //   owner: this.estefania,
    //   pictures: [this.picture_0004, this.picture_0005, this.picture_0006]
    // })
    // this.post0012 = new Post({
    //   description: 'Perra hembra embarazada, está muy gordita...',
    //   location: this.location_0009,
    //   owner: this.estefania,
    //   pictures: [this.picture_0014, this.picture_0015, this.picture_0017]
    // })
    // this.post0013 = new Post({ description: 'Lola perdida. Me ayudan a encontrarla..', location: this.location_0001, owner: this.estefania,  pictures: [this.picture_0001, this.picture_0002] })
    // this.post0014 = new Post({
    //   description: 'perro perdido hace semanas....',
    //   location: this.location_0011,
    //   owner: this.estefania,
    //   pictures: [this.picture_0004, this.picture_0005, this.picture_0007]
    // })
    // this.post0015 = new Post({ description: 'encontrado en San Andres ...', location: this.location_0002, owner: this.estefania , pictures: [this.picture_0004, this.picture_0005, this.picture_0006] })
    // this.post0016 = new Post({
    //   description: 'se llama richard y está perdido..',
    //   location: this.location_0010,
    //   owner: this.estefania,
    //   pictures: [this.picture_0014, this.picture_0015, this.picture_0017]
    // })
    // this.post0017 = new Post({ description: 'manada de perros encontrados en la calle.', location: this.location_0001, owner: this.estefania,   pictures: [this.picture_0001, this.picture_0002] })
    // this.post0018 = new Post({
    //   description: 'caniche muy descuidado rondando por...',
    //   location: this.location_0012,
    //   owner: this.estefania,
 
    //   pictures: [this.picture_0004, this.picture_0005, this.picture_0007]
    // })
    // this.post0019 = new Post({
    //   description: 'Bulldog llorando en la puerta de...',
    //   location: this.location_0002,
    //   owner: this.estefania,
  
    //   pictures: [this.picture_0004, this.picture_0005, this.picture_0006]
    // })
    // this.post0020 = new Post({
    //   description: 'encontramos unos perritos recien nacidos...',
    //   location: this.location_0002,
    //   owner: this.estefania,
 
    //   pictures: [this.picture_0014, this.picture_0015, this.picture_0017]
    // })
    // this.post0021 = new Post({ description: 'Perro encontrado en la calle artigas al 80..', location: this.location_0001, owner: this.estefania,  pictures: [this.picture_0001, this.picture_0002] })
    // this.post0022 = new Post({ description: 'encontramos un husky ...', location: this.location_0002, owner: this.estefania,  pictures: [this.picture_0004, this.picture_0005, this.picture_0007] })
    // this.post0023 = new Post({
    //   description: 'lo retuvimos: perro perdido..',
    //   location: this.location_0002,
    //   owner: this.estefania,
 
    //   pictures: [this.picture_0004, this.picture_0005, this.picture_0006]
    // })
    // this.post0024 = new Post({
    //   description: 'encontrado en san martín, está rengo...',
    //   location: this.location_0002,
    //   owner: this.estefania,
 
    //   pictures: [this.picture_0014, this.picture_0015, this.picture_0017]
    // })

    await getRepository(Post).save([
      this.post0001,
      this.post0002,
      this.post0003,
      // this.post0004
      // this.post0005,
      // this.post0006,
      // this.post0007,
      // this.post0008,
      // this.post0009,
      // this.post0010,
      // this.post0011,
      // this.post0012,
      // this.post0013,
      // this.post0014,
      // this.post0015,
      // this.post0016,
      // this.post0017,
      // this.post0018,
      // this.post0019,
      // this.post0020,
      // this.post0021,
      // this.post0021,
      // this.post0022,
      // this.post0023,
      // this.post0024
    ])
  }
}
const bootstrap = new Bootstrap()
export default bootstrap
