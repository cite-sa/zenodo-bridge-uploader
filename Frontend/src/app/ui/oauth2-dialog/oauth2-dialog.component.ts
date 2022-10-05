import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/common/base/base.component';


@Component({
  selector: 'app-oauth2-dialog',
  templateUrl: './oauth2-dialog.component.html',
  styleUrls: ['./oauth2-dialog.component.scss']
})
export class Oauth2DialogComponent extends BaseComponent implements OnInit {

  constructor(private route:ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this._destroyed)).subscribe((params:Params)=> {

      const url = params['url'];
      if(!params['code'] && (!params['oauth_token'] && !params['aouth_verifier'])){this.loadUrl(url)} else {this.sendCode(params);}

    });
  }

  private loadUrl(url: string){
    window.location.href = url;
  }

  private sendCode(params:Params){
    if(params['code']){
      localStorage.setItem('oauthCode', params['code']);
    }
    if(params['state']){
      localStorage.setItem('oauthState', params['state']);
    }
    if(params['oauth_token'] && params['oauth_verifier']){
      localStorage.setItem('oauthObject', JSON.stringify({oauth_token: params['oauth_token'], oauth_verifier: params['oauth_verifier']}));
    }
    window.close();
  }

}
