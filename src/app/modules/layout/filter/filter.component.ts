import { TransferLivroService } from './../../../shared/service/Transfer_object/TransferLivro.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAnuncioList } from './../../../shared/interface/anuncio';
import { AnuncioService } from './../../../shared/service/anuncio.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  rangeValues: number[] = [20,80];
  val: number;

  anuncioLoaded: IAnuncioList[] = [];
  form_filterName: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private anuncioService: AnuncioService,
    private formBuilder: FormBuilder,
    private transferLivro: TransferLivroService
  ) {
    this.form_filterName = this.formBuilder.group({
      nome: ['']
    })
  }

  ngOnInit(): void {
    this.anuncioService.getAllByNameAndRageCustom(this.route.snapshot.paramMap.get('title')!).then(success => {
      this.anuncioLoaded = success!;
    });
  }

  filterBooks(){
    this.anuncioService.getAllByNameAndRageCustom(this.form_filterName.value.nome, this.rangeValues[0].toString(), this.rangeValues[1].toString()).then(success => {
      this.anuncioLoaded = success!;
    });
  }

  addBooksToCart(book: IAnuncioList){
    this.transferLivro.addBookToCart(book);
  }

  ViewAnnouncement(anuncio: IAnuncioList){
    setTimeout(() => {
      this.router.navigate([`announcement/${anuncio.id}`])
    }, 100);
  }
}
