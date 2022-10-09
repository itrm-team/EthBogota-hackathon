import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

//* COMPONENTS
import { ButtonComponent } from './button/button.component';
import { ButtonLinkComponent } from './button-link/button-link.component';
import { TitleComponent } from './title/title.component';
import { ListComponent } from './list/list.component';
import { CompareComponent } from './compare/compare.component';
import { SubtitleComponent } from './subtitle/subtitle.component';
import { PairInputComponent } from './pair-input/pair-input.component';
import { BalanceComponent } from './balance/balance.component';
import { MenuComponent } from './menu/menu.component';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { ButtonChargeWithdrawComponent } from './button-charge-withdraw/button-charge-withdraw.component';
import { RouterModule } from '@angular/router';
import { TransactionResultComponent } from './transaction-result/transaction-result.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { ButtonLinkAyudaComponent } from './button-link-ayuda/button-link-ayuda.component';
//import { Web3ModalComponentWrapper } from './web3modalComponent/Web3ModalComponentWrapper';
import { Web3PairInputComponent } from './web3-pair-input/web3-pair-input.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ButtonLinkComponent,
    TitleComponent,
    SubtitleComponent,
    ListComponent,
    InputPasswordComponent,
    CompareComponent,
    PairInputComponent,
    BalanceComponent,
    MenuComponent,
    ShowHidePasswordComponent,
    ButtonChargeWithdrawComponent,
    TransactionResultComponent,
    ButtonLinkAyudaComponent,
    //Web3ModalComponentWrapper,
    Web3PairInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    ButtonLinkComponent,
    TitleComponent,
    SubtitleComponent,
    ListComponent,
    InputPasswordComponent,
    CompareComponent,
    PairInputComponent,
    BalanceComponent,
    MenuComponent,
    IonicModule,
    ShowHidePasswordComponent,
    ButtonChargeWithdrawComponent,
    TransactionResultComponent,
    ButtonLinkAyudaComponent,
    //Web3ModalComponentWrapper,
    Web3PairInputComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
