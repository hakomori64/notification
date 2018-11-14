import { Component, OnInit, NgModule } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from '../../article';
import { FormControl } from '@angular/forms';
import { CompileTemplateMetadata } from '@angular/compiler';

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
  public title:string;

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
    },
    {
      name: 'その他',
      departments: [
        {value: 'ME', viewValue: 'ME'},
        {value: 'EE', viewValue: 'EE'}
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
  public numberOfArticles;
  
  p: number = 1;
  

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.initDepartmentList();
    let departmentsforInit = this.departmentList.concat();
    departmentsforInit.push("All");
    //console.log("departmentsforInit: " + departmentsforInit);
    let genresforInit = this.genres.concat();
    genresforInit.push("All");
    //console.log("genresforInit: " + genresforInit);
    this.articles = [];
    this.getArticles();
    this.departmentControl = new FormControl(departmentsforInit);
    this.genreControl = new FormControl(genresforInit);
    this.selectedDepartment = this.departmentList.concat();
    this.selectedGenre = this.genres.concat();
    this.title = '';
    /*for(let i = 0; i < this.selectedGenre.length; i++) {
      console.log(this.selectedGenre[i]);
    }*/
  }

  getArticles(): void {
    this.articlesService.getArticles().subscribe((data: Article[]) => {
      this.articles = data.concat();
      this.originalArticles = data.concat();
    },
    
    () => {
      this.numberOfArticles = this.articles.length;
      console.log(this.numberOfArticles);
    });
  }

  initDepartmentList(): void {
    for(let i = 0; i < this.departmentGroups.length; i++) {
      for(let j = 0; j < this.departmentGroups[i].departments.length; j++) {
        this.departmentList.push(this.departmentGroups[i].departments[j].value);
      }
    }
  }

  filtering(departmentList:string[], genreList:string[], title:string) {
    this.articles = [];
    let _articles = [];
    let __articles = [];

    if (this.title == null) {
      this.title = '';
    }
    
    for(let i = 0; i < this.originalArticles.length; i++) {
      if(this.originalArticles[i].tags[0].some(function (v) {
        return departmentList.includes(v);
      })) {
        _articles.push(this.originalArticles[i]);
      }
    }

    for(let i = 0; i < _articles.length; i++) {
      if(_articles[i].tags[1].some(function (v) {
        return genreList.includes(v);
      })) {
        //console.log(_articles[i]);
        __articles.push(_articles[i]);
      }
    }

    if (title !== '') {
      for(let i = 0; i < __articles.length; i++) {
        if(__articles[i].title.toUpperCase().search(title.toUpperCase()) >= 0) {
          this.articles.push(__articles[i]);
        }
      }
    } else {
      this.articles = __articles.concat();
    }
  }

  changeDepartment(event) {
    //console.log(event);
    
    this.filtering(this.selectedDepartment.concat(), this.selectedGenre.concat(), this.title.concat());
    
  }

  changeGenre(event) {
    //console.log(event);
    this.filtering(this.selectedDepartment.concat(), this.selectedGenre.concat(), this.title.concat());
   
  }

  checkallDepartments(event) {
    console.log("checkallDepartments function is called");
    this.selectedDepartment = this.departmentList.concat();
    this.filtering(this.selectedDepartment.concat(), this.selectedGenre.concat(), this.title.concat());
  }

  uncheckallDepartments(event) {
    console.log("uncheckallDepartments function is called");
    this.selectedDepartment = [];
    this.filtering(this.selectedDepartment.concat(), this.selectedGenre.concat(), this.title.concat());
  }

  checkallGenre(event) {
    console.log("checkallGenre function is called");
    this.selectedGenre = this.genres.concat();
    this.filtering(this.selectedDepartment.concat(), this.selectedGenre.concat(), this.title.concat());
  }

  uncheckallGenre(event) {
    console.log("uncheckallGenre function is called");
    this.selectedGenre = [];
    this.filtering(this.selectedDepartment.concat(), this.selectedGenre.concat(), this.title.concat());
  }

  onKey(event: any) {
    if (this.title == null) {
      this.title = '';
    }
    console.log(this.title);
    this.filtering(this.selectedDepartment.concat(), this.selectedGenre.concat(), this.title.concat());
  }
}
