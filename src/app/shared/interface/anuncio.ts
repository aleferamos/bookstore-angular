import { IPessoa, IPessoaAuthenticad } from './pessoa';
import { ILivro } from './livro';
export interface IAnuncioList{
  descricao?: String;
  nomeImagem?: String;
  data?: String;
  dataModificacao?: String;
  preco: number;
  curtida?: Number;
  livro?: ILivro;
  pessoa?: IPessoa;
}

export interface IAnuncioSave {
  descricao: string;
  preco: string;
  livro: ILivro;
  pessoa: IPessoaAuthenticad;
}
