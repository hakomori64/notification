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
  public originalArticles:Article[];
  public tags:string[];

  public departmentControl;
  public genreControl;
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
  public departmentList:string[] = [];

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

  public selectedDepartment:string[];
  public selectedGenre:string[];


  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.initDepartmentList();
    let departmentsforInit = this.departmentList.concat();
    departmentsforInit.push("All");
    //console.log("departmentsforInit: " + departmentsforInit);
    let genresforInit = this.genres.concat();
    genresforInit.push("All");
    //console.log("genresforInit: " + genresforInit);
    this.getArticles();
    this.departmentControl = new FormControl(departmentsforInit);
    this.genreControl = new FormControl(genresforInit);
    this.selectedDepartment = this.departmentList.concat();
    this.selectedGenre = this.genres.concat();
    /*for(let i = 0; i < this.selectedGenre.length; i++) {
      console.log(this.selectedGenre[i]);
    }*/
  }

  getArticles(): void {
    this.articlesService.getArticles().subscribe((data: Article[]) => {
      this.articles = data;
      this.originalArticles = data;
    });
  }

  initDepartmentList(): void {
    for(let i = 0; i < this.departmentGroups.length; i++) {
      for(let j = 0; j < this.departmentGroups[i].departments.length; j++) {
        this.departmentList.push(this.departmentGroups[i].departments[j].value);
      }
    }
  }

  changeDepartment(event) {
    //console.log(event);
    this.articles = [];
    let _articles:Article[] = [];
    let genreList = this.selectedGenre.concat();

    if (event.value.includes("All")) {
      this.selectedDepartment = this.departmentList.concat();
      this.selectedDepartment.push("All");
    }

    //console.log(event)
    for(let i = 0; i < this.originalArticles.length; i++) {
      if (this.originalArticles[i].tags[0].some(function (v) {
        return event.value.includes(v);
      })) {
        _articles.push(this.originalArticles[i]);
      }
    }

    for(let i = 0; i < _articles.length; i++) {
      if (_articles[i].tags[1].some(function (v) {
        return genreList.includes(v);
      })) {
        this.articles.push(_articles[i]);
      }
    }

  }

  changeGenre(event) {
    //console.log(event);
    this.articles = [];
    let _articles:Article[] = [];
    let departmentList = this.selectedDepartment.concat();

    if (event.value.includes("All")) {
      this.selectedGenre = this.genres.concat();
      this.selectedGenre.push("All");
      //console.log(this.selectedGenre);
      //console.log(this.genres);
    }

    //console.log(event)
    for(let i = 0; i < this.originalArticles.length; i++) {
      if (this.originalArticles[i].tags[1].some(function (v) {
        return event.value.includes(v);
      })) {
        _articles.push(this.originalArticles[i]);
      }
    }
    for(let i = 0; i < _articles.length; i++) {
      if (_articles[i].tags[0].some(function (v) {
        return departmentList.includes(v);
      })) {
        this.articles.push(_articles[i]);
      }
    }
  }
}
