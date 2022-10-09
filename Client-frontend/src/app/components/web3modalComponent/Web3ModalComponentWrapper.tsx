import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
  } from '@angular/core';
  import { Web3ModalComponent } from 'src/app/components/web3modalComponent/Web3ModalComponent';
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
  
  //import * as Web3ModalReact from '@web3modal/react';
  const containerElementName = 'Web3ModalComponentContainer';
  
  @Component({
    selector: 'app-my-component',
    template: `<span #${containerElementName}></span>`,
    styleUrls: ['./Web3ModalComponent.scss'],
    encapsulation: ViewEncapsulation.None,
  })

  /* const config: Web3ModalReact.ConfigOptions = {
    projectId: '332d91c46a80fb4d46fe309ab040cd6d',
    theme: 'dark',
    accentColor: 'default',
    ethereum: {
      appName: 'web3Modal'
    }
  } */
  export class Web3ModalComponentWrapper implements OnChanges, OnDestroy, AfterViewInit {
    
    
    @ViewChild(containerElementName, {static: false}) containerRef: ElementRef;
  
    @Input() public counter = 10;
    @Output() public componentClick = new EventEmitter<void>();
  
    constructor() {
      this.handleDivClicked = this.handleDivClicked.bind(this);
    }
  
    public handleDivClicked() {
      console.log("click handled")
      if (this.componentClick) {
        this.componentClick.emit();
        this.render();
      }
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      this.render();
    }
  
    ngAfterViewInit() {
      this.render();
    }
  
    ngOnDestroy() {
      ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
    }
  
    private render() {
      const {counter} = this;
  
      ReactDOM.render(
      <>
        <div className={'i-am-classy'}>
          <Web3ModalComponent counter={counter} onClick={this.handleDivClicked}/>
        </div>
      </>
      
      , this.containerRef.nativeElement);
    }
  }