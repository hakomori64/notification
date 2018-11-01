import { Component, OnInit, NgModule } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from '../../article';
import { FormControl } from '@angular/forms';

export interface Department {
  value: string;
  viewValue: string;
}

export interface DepartmentGroup {
  disabled?: boolean;
  name: string;
  departments: Department[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  public articles:Article[];
  public tags:string[];

  public departmentControl = new FormControl();
  public genreControl = new FormControl();
  public departmentGroups: DepartmentGroup[] = [
    {
      name: '八王子',
      departments: [
        {value: 'BS', viewValue: 'BS'},
        {value: 'CS', viewValue: 'CS'},
        {value: 'MS', viewValue: 'MS'},
        {value: 'ES', viewValue: 'ES'},
        {value: '院', viewValue: '院'}
      ]
    },
    {
      name: '蒲田',
      departments: [
        {value: 'HS', viewValue: 'HS'},
        {value: 'DS', viewValue: 'DS'},
        {value: 'NU', viewValue: 'NU'}
      ]
    }
  ];
  public genres: string[] = [
    '休講情報',
    '補講情報',
    'クラス分け',
    '募集',
    '発表',
    '就職情報',
    '告知',
    'その他'
  ]

  public selectedDepartment;
  public selectedGenre;


  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.articlesService.getArticles().subscribe((data: Article[]) => this.articles = data);
  }

}
