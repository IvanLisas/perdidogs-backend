export class PorcentajePostActivosSobreInactivos {

  constructor(init?: Partial<PorcentajePostActivosSobreInactivos>) {
    Object.assign(this, init)
  }

 postTotales?: number
 postActivos?: number
 postinactivos?: number

static fromJson(FilterJson: string): PorcentajePostActivosSobreInactivos {
  return Object.assign(new PorcentajePostActivosSobreInactivos(), FilterJson)

}
}