import { getRepository } from 'typeorm'
import { Breed } from '../models/Breed'
import { Color } from '../models/Color'
import { FurLength } from '../models/FurLength'
import { Location } from '../models/Location'
import { Pet } from '../models/Pet'
import { Picture } from '../models/Picture'
import { Post } from '../models/Post'
import { Role } from '../models/Role'
import { Size } from '../models/Size'
import { User } from '../models/User'
import { Comment } from '../models/Comment'
import { Chat } from '../models/Chat'
import { Message } from '../models/Message'
import { Alert } from '../models/Alert'
import { UserStatus } from '../models/UserStatus'
import { PostStatus } from '../models/PostStatus'
import { AlertStatus } from '../models/AlertStatus'
import bcrypt, { hash } from 'bcrypt'

export class Bootstrap {
  //----------------------------ESTADOS DE USUARIOS----------------------------------------------
  static userStatusActive = new UserStatus({ description: 'Active' })
  static userStatusInactive = new UserStatus({ description: 'Inactive' })
  //----------------------------ROL DE USUARIOS----------------------------------------------
  static adminRole = new UserStatus({ description: 'Admin' })
  static notAdminRole = new UserStatus({ description: 'Usuario final' })
  //----------------------------ESTADOS DE POSTS----------------------------------------------
  static postActive = new PostStatus({ description: 'Active' })
  static inactivePost = new PostStatus({ description: 'Inactive' })
  static pendingPost = new PostStatus({ description: 'Pending' })
  //----------------------------ESTADOS DE ALERTAS----------------------------------------------
  static alertStatusActivo: AlertStatus
  static alertStatusInActivo: AlertStatus
  // activo!: PostStatus
  // pendiente!: PostStatus
  // cancelada!: PostStatus
  // inactiva!: PostStatus
  // resuelto!: PostStatus
  //----------------------RAZAS-----------------------------------------------
  sinRaza = new Breed({ description: 'Sin Raza' })
  borderCollie = new Breed({ description: 'Border Collie' })
  overjeroAleman = new Breed({ description: 'Ovejero Aleman' })
  caniche = new Breed({ description: 'Caniche' })
  pastorIngles = new Breed({ description: 'Pastor Inglés' })
  chihuahua = new Breed({ description: 'Chihuaha' })
  bulldogFrances = new Breed({ description: 'Bulldog Frances' })
  bulldogIngles = new Breed({ description: 'Bulldog Ingles' })
  HuskySiberia = new Breed({ description: 'Husky Siberian' })
  coker = new Breed({ description: 'Cocker' })
  canicheToy = new Breed({ description: 'Caniche Toy' })
  barbincho = new Breed({ description: 'Barbincho' })
  ovejeroBelga = new Breed({ description: 'Ovejero Belga' })
  galgo = new Breed({ description: 'Galgo' })
  yorkshire = new Breed({ description: 'Yorkshire' })
  corgie = new Breed({ description: 'Corgie' })
  dalmata = new Breed({ description: 'Dalmata' })
  golden = new Breed({ description: 'Golden' })
  labrador = new Breed({ description: 'Labrador' })
  //----------------------COLORES-----------------------------------------------
  blanco = new Color({ description: 'Blanco', hexCode: '#ffffff' })
  negro = new Color({ description: 'Negro', hexCode: '#000000' })
  beige = new Color({ description: 'Beige', hexCode: '#edb021' })
  gris = new Color({ description: 'Gris', hexCode: '#9d9e99' })
  marron = new Color({ description: 'Marrón', hexCode: '#6e4605' })
  //----------------------LARGOS DE PELO-----------------------------------------------
  corto = new FurLength({ description: 'Corto' })
  largo = new FurLength({ description: 'Largo' })
  //----------------------TAMAÑO-----------------------------------------------
  pequenio = new Size({ description: 'Pequeño' })
  mediano = new Size({ description: 'Mediano' })
  grande = new Size({ description: 'Grande' })

  //----------------------USUARIOS-----------------------------------------------
  estefania!: User
  gabriel!: User
  ivan!: User
  mariano!: User
  laura!: User
  horacio!: User
  pablo!: User
  pedro!: User
  omar!: User

  //-----------------------LOCATION---------------------------------------------------------------------------------
  location_0001 = new Location({ lat: -34.600585579493, long: -58.5127015868307 })
  location_0002 = new Location({ lat: -34.6275450762093, long: -58.4095720793038 })
  location_0003 = new Location({ lat: -34.5656755865268, long: -58.4701920657306 })
  location_0004 = new Location({ lat: -34.5848468758467, long: -58.4003567653869 })
  location_0005 = new Location({ lat: -34.6033788550838, long: -58.42654700069 })
  location_0006 = new Location({ lat: -34.6208161377736, long: -58.4679537700269 })
  location_0007 = new Location({ lat: -34.6161634167228, long: -58.4792055548214 })
  location_0008 = new Location({ lat: -34.5922954562596, long: -58.4542924673157 })
  location_0009 = new Location({ lat: -34.6278086583641, long: -58.4874410874275 })
  location_0010 = new Location({ lat: -34.5416441888152, long: -58.4528025584817 })
  location_0011 = new Location({ lat: -34.5912662690564, long: -58.4784363545438 })
  location_0012 = new Location({ lat: -34.6607775494006, long: -58.5019842585195 })
  location_0013 = new Location({ lat: -34.5984063340249, long: -58.3905971334064 })
  location_0014 = new Location({ lat: -34.6016548116584, long: -58.4246113191213 })
  location_0015 = new Location({ lat: -34.6491238226729, long: -58.497364203403 })
  location_0016 = new Location({ lat: -34.569254585532, long: -58.5066768333949 })
  location_0017 = new Location({ lat: -34.6168578111961, long: -58.389502672739 })
  location_0018 = new Location({ lat: -34.6175391298145, long: -58.4581715541145 })
  location_0019 = new Location({ lat: -34.6210862925472, long: -58.4099333582122 })
  location_0020 = new Location({ lat: -34.6654628899305, long: -58.4720827828095 })

  //----------------------------FOTOS------------------------------------------------
  picture_0001 = new Picture({ url: 'https://www.ecestaticos.com/image/clipping/7a6b6e93f92f61a94fd9d269e8ffd237/tu-perro-es-un-privilegiado-el-70-de-sus-congeneres-vive-en-la-calle.jpg' })
  picture_0002 = new Picture({ url: 'https://revista.weepec.com/wp-content/uploads/2017/07/perro-de-la-calle-01.jpg' })
  picture_0003 = new Picture({ url: 'https://t2.ea.ltmcdn.com/es/images/7/2/4/img_cuanto_vive_un_perro_callejero_22427_paso_1_600.jpg' })
  picture_0004 = new Picture({ url: 'http://1.bp.blogspot.com/-fPPi-wskwjg/TiUEi2UqGTI/AAAAAAAAB4k/wjLNydAjDF0/s1600/Barbincho.jpg' })
  picture_0005 = new Picture({ url: 'https://c8.alamy.com/compes/t87pa8/el-aspecto-de-un-perro-callejero-triste-solitario-perro-en-la-calle-abrigo-sucio-y-humedo-el-animal-esta-buscando-su-dueno-t87pa8.jpg' })
  picture_0006 = new Picture({ url: 'https://thumbs.dreamstime.com/b/un-perro-perdido-est%C3%A1-buscando-su-due%C3%B1o-sucio-y-mojado-blanco-el-animal-mira-con-una-mirada-triste-la-gente-de-paso-primer-148175857.jpg' })
  picture_0007 = new Picture({ url: 'https://pbs.twimg.com/media/BvfgPU3CcAAGkxu.jpg' })
  picture_0008 = new Picture({ url: 'https://pbs.twimg.com/media/DnLSyPwW0AAELDv.jpg' })
  picture_0009 = new Picture({ url: 'https://www.elsiglodetorreon.com.mx/m/i/2020/05/1306610.jpeg' })
  picture_0010 = new Picture({ url: 'https://concienciaanimalmdq.files.wordpress.com/2011/05/ovejero-perdido-may11.jpg' })
  picture_0011 = new Picture({ url: 'https://www.rosario3.com/__export/1595092712690/sites/rosario3/img/2020/07/18/whatsapp_image_2020-07-17_at_17_53_03_crop1595092606977.jpeg_1756841869.jpeg' })
  picture_0012 = new Picture({ url: 'https://images.clasiar.com/2010/01/01/ovejero-aleman-manto-negro-perdido_fcb7322b6e_3.jpg' })
  picture_0013 = new Picture({ url: 'https://ih1.redbubble.net/image.731288633.9994/flat,750x,075,f-pad,750x1000,f8f8f8.jpg' })
  picture_0014 = new Picture({ url: 'https://www.galgosdelsur.eu/wp-content/uploads/2018/05/dina-1024x1024.jpg' })
  picture_0015 = new Picture({ url: 'https://www.petdarling.com/wp-content/uploads/2014/08/Galgo-espa%C3%B1ol.jpg' })
  picture_0016 = new Picture({ url: 'https://brownonline.com.ar/wp-content/uploads/2017/06/19190772_1414162912009581_1859857499_n.jpg' })
  picture_0017 = new Picture({ url: 'http://2.bp.blogspot.com/_Ydk4i1dZcjo/Sl9Cc5lJyxI/AAAAAAAAAnc/FdmKc-DDAAQ/w1200-h630-p-k-no-nu/Imagen+1.jpg' })
  picture_0018 = new Picture({ url: 'https://pbs.twimg.com/media/DvgzCYTX4AEsjdv.jpg' })
  picture_0019 = new Picture({ url: 'https://1.bp.blogspot.com/-ZSAkkn_g7yM/XOxPw8-o-SI/AAAAAAAAv2A/2APvIPktMtopm5EOWJzFYSmnKOqkmP-_ACLcBGAs/s1600/60964144_2186554078118892_3066096222545641472_o.jpg' })
  picture_0020 = new Picture({ url: 'https://www.multimediosmaldoni.tv/img/noticias/800Imagece67af42778741328cb6d791d2b5881b.jpg' })
  picture_0021 = new Picture({ url: 'http://3.bp.blogspot.com/-jGsdLgbyxWY/UjOcAzfqj4I/AAAAAAAAdWo/b465Yjl8HUc/s1600/SOL.jpg' })
  picture_0022 = new Picture({ url: 'http://3.bp.blogspot.com/-ekBe9Hi8Nkc/UjOb-5Ge1-I/AAAAAAAAdWg/grgN0ddANFs/s1600/LUNA.jpg' })
  picture_0023 = new Picture({ url: 'https://www.albergaria.es/media/photos/big-square/canfelin-protectora-grado-y-sus-valles-1529942078-X3Pq5.jpg' })
  picture_0024 = new Picture({ url: 'http://4.bp.blogspot.com/-T-596ClMxEs/UjOTzp39_JI/AAAAAAAAdV8/VsP-cuCoKyc/s1600/IMG_4553.JPG' })
  picture_0025 = new Picture({ url: 'http://3.bp.blogspot.com/-ldI6gHiByIQ/UjOTy80h2pI/AAAAAAAAdVs/Ce7Usv_HH8Q/s1600/IMG_4551.JPG' })
  picture_0026 = new Picture({ url: 'https://pbs.twimg.com/media/DvgzCYTX4AEsjdv.jpg' })
  picture_0027 = new Picture({
    url: 'https://s3-eu-west-1.amazonaws.com/barkibu-production/images/contents/000/023/240/original/uploads_2F1456934521386-va7sh1dz7gco9a4i-f348392e3c5e4537187730e873e7737d_2F145693446809792658303.jpg?1456934852'
  })

  //----------------------MASCOTAS-----------------------------------------------
  perro1 = new Pet({ name: 'coki', sex: 'Macho', hasCollar: false, color: this.blanco, furLength: this.corto, breed: this.sinRaza, size: this.grande })
  perro2 = new Pet({ name: 'NN', sex: 'Macho', hasCollar: true, color: this.beige, furLength: this.largo, breed: this.barbincho, size: this.mediano })
  perro3 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: true, color: this.negro, furLength: this.negro, breed: this.sinRaza, size: this.pequenio })
  perro4 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, color: this.beige, furLength: this.largo, breed: this.overjeroAleman, size: this.pequenio })
  perro5 = new Pet({ name: 'NN', sex: 'Macho', hasCollar: false, color: this.beige, furLength: this.largo, breed: this.galgo, size: this.grande })
  perro6 = new Pet({ name: 'pepito', sex: 'Macho', hasCollar: false, color: this.beige, furLength: this.largo, breed: this.galgo, size: this.pequenio })
  perro7 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, color: this.blanco, furLength: this.corto, breed: this.caniche, size: this.grande })
  perro8 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: true, color: this.blanco, furLength: this.corto, breed: this.sinRaza, size: this.grande })
  perro9 = new Pet({ name: 'tyson', sex: 'Macho', hasCollar: true, color: this.beige, furLength: this.largo, breed: this.sinRaza, size: this.pequenio })
  perro10 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, color: this.blanco, furLength: this.corto, breed: this.sinRaza, size: this.grande })
  perro11 = new Pet({ name: 'Severino', sex: 'Macho', hasCollar: false, color: this.blanco, furLength: this.corto, breed: this.sinRaza, size: this.grande })
  perro12 = new Pet({ name: 'Lalo', sex: 'Macho', hasCollar: false, color: this.beige, furLength: this.largo, breed: this.sinRaza, size: this.grande })
  perro13 = new Pet({ name: 'NN', sex: 'Macho', hasCollar: false, color: this.beige, furLength: this.largo, breed: this.sinRaza, size: this.grande })
  perro14 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, color: this.beige, furLength: this.largo, breed: this.caniche, size: this.pequenio })
  perro15 = new Pet({ name: 'NN', sex: 'Macho', hasCollar: false, color: this.beige, furLength: this.largo, breed: this.sinRaza, size: this.grande })
  perro16 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, color: this.blanco, furLength: this.corto, breed: this.sinRaza, size: this.grande })
  perro17 = new Pet({ name: 'Ramon', sex: 'Macho', hasCollar: false, color: this.negro, furLength: this.negro, breed: this.sinRaza, size: this.grande })
  perro18 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, color: this.beige, furLength: this.largo, breed: this.galgo, size: this.grande })
  perro19 = new Pet({ name: 'NN', sex: 'Macho', hasCollar: false, color: this.blanco, furLength: this.corto, breed: this.sinRaza, size: this.grande })
  perro20 = new Pet({ name: 'NN', sex: 'Hembra', hasCollar: false, color: this.negro, furLength: this.negro, breed: this.bulldogIngles, size: this.mediano })

  //---------------------------POSTS-----------------------------------------------------------------------------------------------------------------

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
  //--------------------------------COMENTARIOS------------------------------------------------------
  comentario1 = new Comment({
    owner: this.pedro,
    text: 'Lo retuviste?',
    creation: new Date('2021-01-20T17:31:01.456Z'),
    post: this.post0001
  })
  comentario2 = new Comment({
    owner: this.estefania,
    text: 'Sí. Lo tengo en mi casa. ',
    creation: new Date('2021-01-20T18:31:01.456Z'),
    post: this.post0001
  })
  comentario3 = new Comment({
    owner: this.estefania,
    text: 'Si conoces de alguien que quiera adoptarlo me avisa?',
    creation: new Date('2021-01-20T23:31:01.456Z'),
    post: this.post0001
  })
  comentario4 = new Comment({
    owner: this.pedro,
    text: 'Se lleva bien con otros perros?',
    creation: new Date('2021-01-20T18:31:01.456Z'),
    post: this.post0001
  })
  comentario5 = new Comment({
    owner: this.horacio,
    text: 'Lo quiero adoptar. Como te contacto?',
    creation: new Date('2021-03-20T11:31:01.456Z'),
    post: this.post0002
  })
  comentario6 = new Comment({
    owner: this.mariano,
    text: 'Hablame a mi WP 15467676454',
    creation: new Date('2021-03-20T12:31:01.456Z'), //probar sin horario
    post: this.post0002
  })
  comentario7 = new Comment({
    owner: this.omar,
    text: 'Es mi tomy! ya mismo te contacto para coordinar',
    creation: new Date('2021-02-15T15:10:01.456Z'),
    post: this.post0002
  })
  comentario8 = new Comment({
    owner: this.ivan,
    text: 'Si es tuyo, tenes que contestar algun detalle caracteristico del perro',
    creation: new Date('2021-02-15T15:31:01.456Z'),
    post: this.post0002
  })
  comentario9 = new Comment({
    owner: this.omar,
    text: 'Ya la respondo..',
    creation: new Date('2021-02-15T15:36:01.456Z'),
    post: this.post0002
  })
  comentario35 = new Comment({
    owner: this.ivan,
    text: 'Sigue en adopción.. El que quiera adoptar me avisa! slds!',
    creation: new Date('2021-02-15T15:36:01.456Z'),
    post: this.post0002
  })
  comentario10 = new Comment({
    owner: this.laura,
    text: 'Tiene collar, dice algo la chapita?.',
    creation: new Date('2021-06-15T12:36:01.456Z'),
    post: this.post0003
  })
  comentario11 = new Comment({
    owner: this.gabriel,
    text: 'Hablame al chat, y hablamos..slds!',
    creation: new Date('2021-06-15T12:36:01.456Z'),
    post: this.post0003
  })
  comentario12 = new Comment({
    owner: this.pablo,
    text: 'Lo quiero adoptar.',
    creation: new Date('2021-01-23T10:25:00.456Z'),
    post: this.post0004
  })
  comentario13 = new Comment({
    owner: this.pedro,
    text: 'Hola, lo tenes? o quiero adoptar.',
    creation: new Date('2021-01-28T10:25:00.456Z'),
    post: this.post0004
  })
  comentario14 = new Comment({
    owner: this.pedro,
    text: 'Hola, por qué no me contestas.',
    creation: new Date('2021-01-30T10:25:00.456Z'),
    post: this.post0004
  })
  comentario15 = new Comment({
    owner: this.estefania,
    text: 'Me lo regalas? Es hermoso!',
    post: this.post0005
  })
  comentario16 = new Comment({
    owner: this.omar,
    text: 'Lo quiero adoptar',
    post: this.post0006
  })
  comentario17 = new Comment({
    owner: this.laura,
    text: 'Soy la dueña! de donde sos? Me lo mandas a mi casa?',
    post: this.post0006
  })
  comentario18 = new Comment({
    owner: this.estefania,
    text: 'Pobrecitos, por favor alguien que los quiera adoptarr',
    post: this.post0009
  })
  comentario19 = new Comment({
    owner: this.ivan,
    text: 'Los que quieran adoptar hablenme al chat por favor',
    post: this.post0009
  })

  comentario20 = new Comment({
    owner: this.mariano,
    text: 'El perro fallecio. cierro la publicación',
    post: this.post0008
  })
  comentario21 = new Comment({
    owner: this.estefania,
    text: 'Pobrecitoo. Gracias por al menos ocuparte de publicarlo para al menos ubicar a sus dueños',
    post: this.post0008
  })
  comentario22 = new Comment({
    owner: this.estefania,
    text: 'Para que no pase frío lo entre a mi casa. El que lo reconozca me avisa',
    post: this.post0007
  })
  comentario23 = new Comment({
    owner: this.horacio,
    text: 'Tiene una mancha negra en la pata?',
    post: this.post0007
  })
  comentario24 = new Comment({
    owner: this.estefania,
    text: 'No. No tiene una mancha negra. Slds',
    post: this.post0007
  })
  comentario25 = new Comment({
    owner: this.laura,
    text: 'Buenas! te puedo contactar? tengo a alguien que quiere adoptarlo',
    post: this.post0010
  })
  comentario26 = new Comment({
    owner: this.estefania,
    text: 'Escribime al chat..Slds!',
    post: this.post0011
  })
  comentario27 = new Comment({
    owner: this.gabriel,
    text: 'Final feliz! Paco! como lo apodaron, fue adoptado!! Por más publicaciones como estas',
    post: this.post0012
  })
  comentario28 = new Comment({
    owner: this.pablo,
    text: 'Necesitamos transito por favor. No la puedo retener pero no la quiero dejar en la calle',
    post: this.post0012
  })
  comentario29 = new Comment({
    owner: this.estefania,
    text: 'Alguien nos da una mano con balanceado para poder alimnentarla? Cuchas, abrigo..todo será bienvenido',
    post: this.post0012
  })
  comentario30 = new Comment({
    owner: this.gabriel,
    text: 'Por favor. Ayudenme a difundirla. Está embarazada',
    post: this.post0012
  })

  comentario31 = new Comment({
    owner: this.laura,
    text: 'Lo quiero.',
    post: this.post0005
  })

  comentario32 = new Comment({
    owner: this.pedro,
    text: 'lo puedo ir a ver? Estoy interesado en adoptarlo',
    creation: new Date('2021-01-20T23:31:01.456Z'),
    post: this.post0001
  })
  comentario33 = new Comment({
    owner: this.estefania,
    text: 'No tengo otros animales. Pero es super buena. Por las dudas vuelvo a recordar que es hembra!',
    creation: new Date('2021-01-20T18:31:01.456Z'),
    post: this.post0001
  })

  //-----------------MENSAJES-----------------------------------------------------------------------------
  message1!: Message
  message2!: Message
  message3!: Message
  message4!: Message
  message5!: Message
  message6!: Message
  message7!: Message
  message8!: Message
  message9!: Message
  message10!: Message
  message11!: Message
  message12!: Message
  message13!: Message
  message14!: Message
  message15!: Message
  message16!: Message
  message17!: Message
  message18!: Message
  message19!: Message
  message20!: Message
  //------------------------------------------CHATS----------------------------------------------------------------
  chat1!: Chat
  chat2!: Chat
  chat3!: Chat
  chat4!: Chat
  chat5!: Chat

  //------------------------------------------------------------------------------------------------------------------------------
  alertaGabrielPerro1!: Alert
   // activo!: UserStatus
  // pendiente!:UserStatus
  // inactivo!:UserStatus

  async run(): Promise<void> {
    if ((await getRepository(Color).find()).length == 0) {
      await this.createUserStatus()
      await this.createUserRole()
      await this.createAlertStatus()
      await this.createPostStatus()
      await this.createColors()
      await this.createSizes()
      await this.createLengths()
      await this.createBreed()
      await this.createLocations()
      await this.createPictures()
      await this.createUsers()
      await this.createDogs()
      await this.createPosts()
      await this.createComments()
      await this.createChats()
      await this.createMessages()
      await this.createAlerts()
    }
  }

  //UserStatus
  async createUserStatus(): Promise<void> {
    console.log('******************************Creando User Status***************************************')
    Bootstrap.userStatusActive = new UserStatus({ description: 'Active' })
    Bootstrap.userStatusInactive = new UserStatus({ description: 'Inactive' })
    await getRepository(UserStatus).save([Bootstrap.userStatusActive, Bootstrap.userStatusInactive])
  }

  //User Rol
  async createUserRole(): Promise<void> {
    console.log('******************************Creando User Role***************************************')
    Bootstrap.adminRole = new UserStatus({ description: 'Admin' })
    Bootstrap.notAdminRole = new UserStatus({ description: 'Final User' })
    await getRepository(Role).save([Bootstrap.adminRole, Bootstrap.notAdminRole])
  }

  //PostStatus
  async createPostStatus(): Promise<void> {
    console.log('******************************Creando Post Status***************************************')
    Bootstrap.postActive = new PostStatus({ description: 'Active' })
    Bootstrap.inactivePost = new PostStatus({ description: 'Inactive' })
    Bootstrap.pendingPost = new PostStatus({ description: 'Pending' })
    await getRepository(PostStatus).save([Bootstrap.postActive, Bootstrap.inactivePost, Bootstrap.pendingPost])
  
  }

  //AlertStatus
  async createAlertStatus(): Promise<void> {
    console.log('******************************Creando Alert Status***************************************')
    Bootstrap.alertStatusActivo = new AlertStatus({ description: 'Active' })
    Bootstrap.alertStatusInActivo = new AlertStatus({ description: 'Inactive' })
    await getRepository(AlertStatus).save([Bootstrap.alertStatusActivo, Bootstrap.alertStatusInActivo])
  }

  //Colors
  async createColors(): Promise<void> {
    console.log('******************************Creando Colores***************************************')
    await getRepository(Color).save([this.blanco, this.negro, this.beige, this.gris, this.marron])
  }

  async createBreed(): Promise<void> {
    console.log('******************************Creando Razas*****************************************')
    await getRepository(Breed).save([
      this.sinRaza,
      this.borderCollie,
      this.overjeroAleman,
      this.caniche,
      this.pastorIngles,
      this.chihuahua,
      this.bulldogFrances,
      this.bulldogIngles,
      this.HuskySiberia,
      this.coker,
      this.canicheToy,
      this.barbincho,
      this.ovejeroBelga,
      this.galgo,
      this.yorkshire,
      this.corgie,
      this.dalmata
    ])
  }

  async createSizes(): Promise<void> {
    console.log('******************************Creando Tamaños***************************************')
    await getRepository(Size).save([this.pequenio, this.mediano, this.grande])
  }

  async createLengths(): Promise<void> {
    console.log('******************************Creando Largos de pelos*******************************')
    await getRepository(FurLength).save([this.corto, this.largo])
  }
  //mascotas
  async createDogs(): Promise<void> {
    console.log('******************************Creando Perritos**************************************')
    //este metodo es para buscar en la BD.
    // const color9 = await getRepository(Color)
    //cuando hago fur voy a tener que hacer fur:: marron

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

  async hashPassword(password: string): Promise<string> {
    const salt = 10
    return await bcrypt.hash(password, salt)
  }
  async createUsers(): Promise<void> {
    console.log('******************************Creando User******************************************')
    this.estefania = new User({
      firstName: 'Estefanía',
      lastName: 'Di Pietro',
      email: 'estefaniadipietro@gmail.com',
      password: await this.hashPassword('12345678'),
      userStatus: Bootstrap.userStatusActive,
      avatar: 'https://s03.s3c.es/imag/_v0/635x300/3/a/8/Perro-mascota-getty-635.jpg',
      role: Bootstrap.adminRole
    })
    this.mariano = new User({
      firstName: 'Mariano',
      lastName: 'Bottazzi',
      email: 'bottazzimariano@gmail.com',
      password: await this.hashPassword('12345678'),
      userStatus: Bootstrap.userStatusActive,
      avatar: 'https://www.hogarmania.com/archivos/201710/mascotas-perros-personas-mayores-ejercicio-XxXx80.jpg',
      role: Bootstrap.adminRole
    })
    this.gabriel = new User({
      firstName: 'Gabriel',
      lastName: 'Loy',
      email: 'loygabriel@hotmail.com',
      password: await this.hashPassword('12345678'),
      userStatus: Bootstrap.userStatusActive,
      avatar: 'https://www.ayudafamiliar.es/blog/wp-content/uploads/2019/11/perros-ancianos.jpg',
      role: Bootstrap.adminRole
    })
    this.ivan = new User({
      firstName: 'Ivan',
      lastName: 'Lisas',
      email: 'ivanelisas@gmail.com',
      password: await this.hashPassword('12345678'),
      userStatus: Bootstrap.userStatusActive,
      avatar: 'https://image.freepik.com/foto-gratis/retrato-cuerpo-entero-nino-perro-parque_13339-271579.jpg',
      role: Bootstrap.adminRole
    })

    this.laura = new User({
      firstName: 'Laura',
      lastName: 'Ibañez',
      email: 'lauritaIbañez1982@gmail.com',
      password: await this.hashPassword('12345678'),
      userStatus: Bootstrap.userStatusActive,
      avatar: 'https://imgv3.fotor.com/images/homepage-feature-card/one-tap-photo-enhancer.jpg',
      role: Bootstrap.notAdminRole
    })
    this.horacio = new User({
      firstName: 'Horacio',
      lastName: 'Ramos',
      email: 'hramos@gmail.com',
      password: await this.hashPassword('12345678'),
      userStatus: Bootstrap.userStatusActive,
      avatar: 'https://static8.depositphotos.com/1311503/875/i/600/depositphotos_8758702-stock-photo-insant-camera-kid.jpg',
      role: Bootstrap.notAdminRole
    })
    this.pablo = new User({
      firstName: 'Pablo',
      lastName: 'Rimolo',
      email: 'primlo1988@gmail.com',
      password: await this.hashPassword('12345678'),
      userStatus: Bootstrap.userStatusActive,
      avatar: 'https://cdn-images.livecareer.es/pages/foto_cv_lc_es_2.jpg',
      role: Bootstrap.notAdminRole
    })
    this.pedro = new User({
      firstName: 'Pedro',
      lastName: 'Paredes',
      email: 'pedrin12721@gmail.com',
      password: await this.hashPassword('12345678'),
      userStatus: Bootstrap.userStatusActive,
      avatar: 'https://cdn-images.livecareer.es/pages/foto_cv_lc_es_4.jpg',
      role: Bootstrap.notAdminRole
    })

    this.omar = new User({
      firstName: 'Omar',
      lastName: 'Gili',
      email: 'giliOmar@gmail.com',
      password: await this.hashPassword('12345678'),
      userStatus: Bootstrap.userStatusActive,
      avatar: 'https://i.pinimg.com/originals/bc/fe/d9/bcfed93239d2a49726d0dc97912af5b2.jpg',
      role: Bootstrap.notAdminRole
    })

    await getRepository(User).save([this.estefania, this.mariano, this.ivan, this.gabriel, this.pedro, this.pablo, this.laura, this.horacio, this.omar])
  }
  //location
  async createLocations(): Promise<void> {
    console.log('******************************Creando Localizaciones********************************')

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
    console.log('******************************Creando Pictures**************************************')
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
      this.picture_0020,
      this.picture_0021,
      this.picture_0022,
      this.picture_0023,
      this.picture_0024,
      this.picture_0025,
      this.picture_0026
    ])
  }
  //posts
  async createPosts(): Promise<void> {
    console.log('******************************Creando Publicaciones*********************************')
    this.post0001 = new Post({
      title: 'Post N°1',
      description: 'Perra encontrada en la calle Constitución al 3100, San Cristobal ',
      location: this.location_0002,
      pet: this.perro1,
      creationDate: new Date('2021-06-20T04:34:01.456Z'),
      owner: this.estefania,
      postStatus: Bootstrap.pendingPost,
      pictures: [this.picture_0001]
    })
    this.post0002 = new Post({
      title: 'Post N°2',
      description: 'Encontrado en Villa Devoto, está lastimado',
      location: this.location_0001,
      pet: this.perro2,
      creationDate: new Date('2021-01-20T15:55:01.456Z'),
      owner: this.gabriel,
      postStatus: Bootstrap.pendingPost,
      pictures: [this.picture_0004, this.picture_0005, this.picture_0006]
    })
    this.post0003 = new Post({
      title: 'Post N°3',
      description: 'Perro negro, tenía collar rojo sin placa y correa. Está siguiendo a cualquier persona que pasa. Lo retuve en casa hasta dar con sus dueños.',
      location: this.location_0003,
      pet: this.perro3,
      postStatus: Bootstrap.pendingPost,
      creationDate: new Date('2021-07-20T19:31:01.456Z'),
      pictures: [this.picture_0007, this.picture_0008, this.picture_0009],
      owner: this.gabriel
    })
    this.post0004 = new Post({
      title: 'Post N°4',
      description: 'Ovejero perdido en Av Las Heras al 2600',
      location: this.location_0004,
      pet: this.perro4,
      creationDate: new Date('2021-01-20T14:31:01.456Z'),
      owner: this.mariano,
      postStatus: Bootstrap.pendingPost,
      pictures: [this.picture_0010, this.picture_0011, this.picture_0012]
    })
    this.post0005 = new Post({
      title: 'Post N°5',
      description: 'Galgo atigrado, está en buenas condiciones pero se nota que busca a sus dueños',
      location: this.location_0005,
      pet: this.perro5,
      creationDate: new Date('2021-01-20T18:31:01.456Z'),
      owner: this.estefania,
      postStatus: Bootstrap.pendingPost,
      pictures: [this.picture_0013, this.picture_0014, this.picture_0015]
    })
    this.post0006 = new Post({
      title: 'Post N°6',
      description: 'Dos perritos perdidos sobre avenida crovara',
      location: this.location_0006,
      pet: this.perro7,
      creationDate: new Date('2021-01-20T17:31:01.456Z'),
      owner: this.estefania,
      postStatus: Bootstrap.pendingPost,
      pictures: [this.picture_0016, this.picture_0017, this.picture_0018]
    })
    this.post0007 = new Post({
      title: 'Post N°7',
      description: 'Alguien lo conoce? está en la puerta de mi casa',
      location: this.location_0007,
      pet: this.perro8,
      owner: this.estefania,
      creationDate: new Date('2021-03-20T17:31:01.456Z'),
      postStatus: Bootstrap.pendingPost,
      pictures: [this.picture_0019, this.picture_0020]
    })
    this.post0008 = new Post({
      title: 'Post N°8',
      description: 'Caniche encontrado,tiene chapita y un celu que nadie contesta',
      location: this.location_0008,
      pet: this.perro11,
      creationDate: new Date('2020-03-20T17:31:01.456Z'),
      owner: this.ivan,
      postStatus: Bootstrap.pendingPost,
      pictures: [this.picture_0021, this.picture_0022]
    })
    this.post0009 = new Post({
      title: 'Post N°9',
      description: 'Cachorros abandonados en la autopista',
      location: this.location_0009,
      pet: this.perro10,
      owner: this.mariano,
      postStatus: Bootstrap.pendingPost,
      pictures: [this.picture_0023, this.picture_0024, this.picture_0025]
    })
    this.post0010 = new Post({
      title: 'Post N°10',
      description: 'Perro vagando por la plaza, está muy deteriorado, por favor alguien que le de tránsito',
      location: this.location_0010,
      pet: this.perro12,
      owner: this.gabriel,
      creationDate: new Date('2021-06-20T11:31:01.456Z'),
      postStatus: Bootstrap.pendingPost,
      pictures: [this.picture_0002]
    })
    this.post0011 = new Post({
      title: 'Post N°11',
      description: 'Lo retuve, es un perro abandonado, el que quiera adoptarlo me puede contactar',
      location: this.location_0011,
      pet: this.perro13,
      owner: this.mariano,
      creationDate: new Date('2020-12-20T23:31:01.456Z'),
      postStatus: Bootstrap.pendingPost,
      pictures: [this.picture_0003]
    })
    this.post0012 = new Post({
      title: 'Post N°12',
      description: 'Perra hembra embarazada, está muy gordita',
      location: this.location_0012,
      pet: this.perro14,
      owner: this.ivan,
      postStatus: Bootstrap.pendingPost,
      creationDate: new Date('2021-06-20T13:31:01.456Z'),
      pictures: [this.picture_0027]
    })
    await getRepository(Post).save([this.post0001, this.post0002, this.post0003, this.post0004, this.post0005, this.post0006, this.post0007, this.post0008, this.post0009, this.post0010, this.post0011, this.post0012])
  }

  async createComments(): Promise<void> {
    console.log('******************************Creando Comentarios*********************************')
    await getRepository(Comment).save([
      this.comentario1,
      this.comentario2,
      this.comentario3,
      this.comentario4,
      this.comentario5,
      this.comentario6,
      this.comentario7,
      this.comentario8,
      this.comentario9,
      this.comentario10,
      this.comentario11,
      this.comentario12,
      this.comentario13,
      this.comentario14,
      this.comentario15,
      this.comentario16,
      this.comentario17,
      this.comentario18,
      this.comentario19,
      this.comentario20,
      this.comentario21,
      this.comentario22,
      this.comentario23,
      this.comentario24,
      this.comentario25,
      this.comentario26,
      this.comentario27,
      this.comentario28,
      this.comentario29,
      this.comentario30,
      this.comentario31
    ])
  }
  async createAlerts(): Promise<void> {
    console.log('ALERTA ACTIVA ', Bootstrap.alertStatusActivo)
    this.alertaGabrielPerro1 = new Alert({ owner: this.gabriel, pet: this.perro1, location: this.location_0001, alertStatus: Bootstrap.alertStatusActivo })
    console.log('******************************Creando Alertas*********************************')
    //await getRepository(Alert).save([this.alertaGabrielPerro1])
  }

  async createChats(): Promise<void> {
    this.chat1 = new Chat({
      owner: this.estefania,
      owner2: this.pedro,
      messageList: [this.message1, this.message2, this.message3, this.message3]
    })

    this.chat2 = new Chat({
      owner: this.ivan,
      owner2: this.pedro,
      messageList: [this.message4, this.message5, this.message6]
    })

    this.chat3 = new Chat({
      owner: this.ivan,
      owner2: this.laura,
      messageList: [this.message7, this.message8, this.message9]
    })

    this.chat4 = new Chat({
      owner: this.ivan,
      owner2: this.pablo,
      messageList: [this.message6, this.message7]
    })

    this.chat5 = new Chat({
      owner: this.ivan,
      owner2: this.mariano,
      messageList: [this.message8, this.message9]
    })
    console.log('******************************Creando Chats*********************************')
    await getRepository(Chat).save([this.chat1, this.chat2, this.chat3, this.chat4, this.chat5])
  }

  async createMessages(): Promise<void> {
    console.log('******************************Creando Mensajes de chat*********************************')
    this.message1 = new Message({
      sender: this.pedro,
      adressee: this.estefania,
      chat: this.chat1,
      body: 'Hola, me pasas tu telefono así te contacto',
      read: true
    })

    this.message2 = new Message({
      sender: this.estefania,
      adressee: this.pedro,
      chat: this.chat1,
      body: 'Hola. Mi celu es 1154265446',
      read: true
    })

    this.message3 = new Message({
      sender: this.pedro,
      adressee: this.estefania,
      chat: this.chat1,
      body: 'Gracias',
      read: false
    })

    this.message4 = new Message({
      sender: this.pedro,
      adressee: this.ivan,
      chat: this.chat2,
      body: 'Lo quiero adoptar. te puedo mandar mensaje?',
      read: true
    })

    this.message5 = new Message({
      sender: this.ivan,
      adressee: this.pedro,
      chat: this.chat2,
      body: 'Mira al final como nadie lo reclamo me lo quedé. Gracias igual.',
      read: false
    })

    this.message6 = new Message({
      sender: this.pedro,
      adressee: this.ivan,
      chat: this.chat3,
      body: 'Uh. Bueno, me alegro mucho. ',
      read: true
    })

    this.message7 = new Message({
      sender: this.laura,
      adressee: this.ivan,
      chat: this.chat3,
      body: 'Hola, me decís si tiene una mancha negra en la pata derecha?',
      read: true
    })

    this.message8 = new Message({
      sender: this.ivan,
      adressee: this.laura,
      chat: this.chat3,
      body: 'Hola. No, no tiene una mancha',
      read: true
    })

    this.message9 = new Message({
      sender: this.laura,
      adressee: this.ivan,
      chat: this.chat3,
      body: 'Ok, seguiré buscando entonces. Gracias! ',
      read: true
    })

    this.message10 = new Message({
      sender: this.pablo,
      adressee: this.ivan,
      chat: this.chat4,
      body: 'Hola. yo perdí uno igual. Lo puedo ir a ver a ver si es mi perro?',
      read: true
    })

    this.message11 = new Message({
      sender: this.ivan,
      adressee: this.pablo,
      chat: this.chat4,
      body: 'Hola. Sí como no, te paso mi dirección: Masiano castex 2332, San Martín',
      read: true
    })

    this.message12 = new Message({
      sender: this.pablo,
      adressee: this.ivan,
      chat: this.chat4,
      body: 'Dale, vos estas este sabado? ',
      read: false
    })

    this.message13 = new Message({
      sender: this.mariano,
      adressee: this.ivan,
      chat: this.chat5,
      body: 'Hola. Responde a nombre de rocco? ',
      read: true
    })
    await getRepository(Message).save([
      this.message1,
      this.message2,
      this.message3,
      this.message4,
      this.message5,
      this.message6,
      this.message7,
      this.message8,
      this.message9,
      this.message10,
      this.message11,
      this.message12,
      this.message13
    ])
  }
}
const bootstrap = new Bootstrap()
export default bootstrap
