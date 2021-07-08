export class PorcentajeAlertasActivasSobreInactivas {

  constructor(init?: Partial<PorcentajeAlertasActivasSobreInactivas>) {
    Object.assign(this, init)
  }

 alertasTotales?: number
 alertasActivos?: number
 alertasInactivas?: number

static fromJson(FilterJson: string): PorcentajeAlertasActivasSobreInactivas {
  return Object.assign(new PorcentajeAlertasActivasSobreInactivas(), FilterJson)

}
}