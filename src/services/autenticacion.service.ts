import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { AdministradorRepository } from '../repositories';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({ scope: BindingScope.TRANSIENT })
export class AutenticacionService {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository
  ) { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarAdministrador(usuario: string, clave: string) {
    try {
      let p = this.administradorRepository.findOne({
        where: {
          correo: usuario,
          clave: clave
        }
      });
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }





}
