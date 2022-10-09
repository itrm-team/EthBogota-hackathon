import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Web3serviceService } from 'src/app/services/web3service/web3service.service';
import { Web3walletVerifierService } from 'src/app/services/web3wallet-verifier/web3wallet-verifier.service';

@Component({
  selector: 'app-web3',
  templateUrl: './web3.page.html',
  styleUrls: ['./web3.page.scss'],
})
export class Web3Page implements OnInit {
  user: any;
  mode: string = 'connect';
  userWallet: any;

  constructor(
    private web3Service: Web3serviceService,
    private web3verifier: Web3walletVerifierService,
    private storage: StorageService,
    private modalCtrl: ModalController,
  ) { }
  
  async runTest() {
    console.log("> user:", this.user);
    let wallet: any = await this.web3verifier.getLinkedWallet(this.user.id_user);
    console.log("> wallet:", wallet);
    let wallets = await this.web3verifier.getLinkedWallets();
    console.log("> wallets:", wallets);
    if (!wallet) {
      let next = {
        id_user: this.user.id_user,
        walletAddress: '0xc244B5132AaCd2047fDBbE02C95b0e2ee3366669',
        trustContractAddress: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942'
      };
      console.log("> linking a new wallet:", next);
      await this.web3verifier.setLinkedWallet(next);
    }
    wallet[0].trustContractAddress = "0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38";
    console.log("> updating wallet:", wallet[0]);
    await this.web3verifier.updateLinkedWallet(wallet[0]);

  }

  

  async ngOnInit() {
    this.user = await this.storage.get( this.storage.getMemo().CURRENT_USER );
    const wallet = await this.storage.get(this.storage.getMemo().WALLET);
    console.log("got wallet", wallet);
    if(wallet?.walletAddress) this.mode = 'connected';
    else this.mode = 'connect';
    this.web3Service.accountStatus$.subscribe((externalWallet)=>{
      console.log("we got some stuff", externalWallet);
      this.userWallet = {walletAddress: externalWallet[0]};
      console.log("> user wallet:", this.userWallet);
      this.verifyUserWalletFlux();
    })
  }

  async verifyUserWalletFlux(){
    await this.checkDBWalletExistance();
    const dbWallet: any = await this.web3verifier.getLinkedWallet(this.user.id_user);
    console.log("> dbWallet:", dbWallet);
    console.log("> userWallet:", this.userWallet);
    if (dbWallet) {
      if(dbWallet.walletAddress) {
        // show modal that acknowledges that you will be synching your wallet
        // crear contrato 
       const tCAddress = await this.web3Service.createUserContract(dbWallet, []);
       console.log("address after creation", tCAddress);
        // vincular billetera
       dbWallet.trustContractAddress = tCAddress;
       await this.web3verifier.updateLinkedWallet(dbWallet);
       await this.storage.set(this.storage.getMemo().WALLET, dbWallet);
       //change mode
       this.mode = 'connected'
  
      } else {
        // check that wallet is the same as the one obtained
        if(this.userWallet.walletAddress != dbWallet?.walletAddress) {
          //present modal : la direccion de la billetera no es la misma que la vinculada
          this.mode = 'invalid'
        } else {
          await this.storage.set(this.storage.getMemo().WALLET, dbWallet)
          this.mode = 'connected';
          //change interaction in the web3 page
        }
      }
    } else {
      this.mode = 'fail';
    }
  }

  async checkDBWalletExistance() {
    const dbWallet: any = await this.web3verifier.getLinkedWallet(this.user.id_user);
    if (!dbWallet && this.userWallet?.walletAddress) {
      let wallet = {
        id_user: this.user.id_user,
        walletAddress: this.userWallet?.walletAddress,
        trustContractAddress: new Date().toISOString()
      };
      console.log("> storing wallet:", wallet);
      await this.web3verifier.setLinkedWallet(wallet);
    }
  }


  async connect(){
    await this.web3Service.connectAccount();    
  }

}
