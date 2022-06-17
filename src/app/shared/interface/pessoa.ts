import { IUsuario, IUsuarioAuthenticad } from './usuario';
import { IEndereco, IEnderecoAuthenticad } from './endereco';
export interface IPessoa {
  nome: String;
  endereco: IEndereco;
}

export interface IPessoaSave {
  nome: String;
  usuario: IUsuario;
  endereco: IEndereco;
}

export interface IPessoaAuthenticad {
  id: number;
  nome: string;
  usuario: IUsuarioAuthenticad;
  endereco: IEnderecoAuthenticad;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  token: string;
  password: string;
  password_confirm: string;
}
