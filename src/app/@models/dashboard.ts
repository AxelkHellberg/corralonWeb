/* export interface RoundsQuantity {
  cantidadCompleta: string;
  cantidadSinCompletar: string;
  cantidadTotal: string;
}
 */

export interface RoundsQuantity {
  estadoRondaId: number;
  nombre: string;
  cantidad: number;
}

/* export interface RoundsByUserData {
  user_id: number;
  user_name: string;
  user_lastName: string;
  user_fileNumber: string;
  user_dni: string;
  user_username: string;
  user_password: string;
  user_profileId: number;
  cantidadRondasHechas: string;
} */
export interface RoundsByUserData {
  username: string;
  userId: number;
  cantidad: number;
}
