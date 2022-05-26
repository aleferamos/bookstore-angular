import { IUsuario } from './usuario';
import { IEndereco } from './endereco';
export interface IPessoa {
  nome: String;
  endereco: IEndereco;
}

export interface IPessoaSave {
  nome: String;
  usuario: IUsuario;
  endereco: IEndereco;
}
