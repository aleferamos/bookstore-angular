import { IPessoaAuthenticad } from 'src/app/shared/interface/pessoa';
import { IPessoa, IPessoaSave } from './pessoa';
import { ICart } from './cart';
export interface IPayment {
  id?: number;
  cart?: ICart;
  pessoa?: IPessoaAuthenticad;
  total: number;
}
