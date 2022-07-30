import { ILivro } from './livro';
export interface ICart {
  id?: number;
  livros?: ILivro[];
}
