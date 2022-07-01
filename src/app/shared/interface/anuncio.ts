import { IPessoa, IPessoaAuthenticad } from './pessoa';
import { ILivro } from './livro';
export interface IAnuncioList{
  id?: number;
  descricao?: String;
  nomeImagem?: String;
  data?: String;
  dataModificacao?: String;
  preco: number;
  curtida?: Number;
  status?: string;
  livro?: ILivro;
  pessoa?: IPessoa;
}

export interface IAnuncioSave {
  descricao: string;
  preco: string;
  livro: ILivro;
  pessoa: IPessoaAuthenticad;
}
