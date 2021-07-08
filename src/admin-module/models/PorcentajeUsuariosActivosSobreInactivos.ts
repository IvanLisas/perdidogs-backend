export class PorcentajeUsuariosActivosSobreInactivos {

  constructor(init?: Partial<PorcentajeUsuariosActivosSobreInactivos>) {
    Object.assign(this, init)
  }

 usuariosTotales?: number
 usuariosActivos?: number
 usuariosinactivos?: number

static fromJson(FilterJson: string): PorcentajeUsuariosActivosSobreInactivos {
  return Object.assign(new PorcentajeUsuariosActivosSobreInactivos(), FilterJson)

}
}