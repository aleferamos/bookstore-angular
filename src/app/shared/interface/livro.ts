import { IProduto } from './produto';
export interface ILivro {
    titulo?: String;
    autor?: String;
    numeroPaginas?: Number;
    edicao?: String;
    anoPublicacao?: String;
    produto?: IProduto;
}
