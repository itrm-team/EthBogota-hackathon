import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { InfoModalPage } from 'src/app/pages/modals/info-modal/info-modal.page';
import { StorageService } from 'src/app/services/storage/storage.service';
//import { TerminosCondicionesComponent } from '../terminos-condiciones/terminos-condiciones.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Output() logOutEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();
  terms: any = `
  <p class=MsoNormal align=center style='margin-left:35.4pt;text-align:center;
  text-indent:-35.4pt'><b style='mso-bidi-font-weight:normal'><span lang=ES-CO
  style='font-family:"Cambria",serif;color:red'>VERSIÓN 1 – FECHA DE PUBLICACIÓN 3
  DE NOVIEMBRE de 2021</span></b></p>
  
  <p class=MsoNormal align=center style='text-align:center'><b style='mso-bidi-font-weight:
  normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoNormal align=center style='text-align:center'><b style='mso-bidi-font-weight:
  normal'><span lang=ES-CO style='font-family:"Cambria",serif'>ACUERDO DE USO DEL
  SITIO POKKASH </span></b></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:18.0pt;
  mso-add-space:auto;text-align:center;text-indent:-18.0pt;mso-list:l11 level1 lfo16'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO PRIMERO – INTRODUCCIÓN</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Los
  términos y condiciones contenidos en este documento y sus anexos, que para
  todos los efectos se denominará (el &quot;ACUERDO&quot;) constituyen y forman
  un contrato entre EL USUARIO E INTELLIGENT TRADING MACHINES SAS, sociedad
  constituida y existente bajo las leyes de la República de Colombia, así como
  sus matrices y subordinadas y quienes de manera individual o conjunta para
  efectos del Acuerdo se denominará “POKKASH” </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Este
  Acuerdo rige la relación jurídica entre EL USUARIO y POKKASH para la
  utilización del SITIO, entendido como https://services.itrmachines.com/pokkash
  o la aplicación móvil de POKKASH o cualquier sistema informático
  (colectivamente, el &quot;SITIO&quot;). <span style='mso-spacerun:yes'></span></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO acepta que ha leído, entendido y aceptado todos los términos y
  condiciones contenidos en este ACUERDO, así como la Política de Privacidad de POKKASH
  y por lo tanto se obliga a su cumplimiento.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Se
  entiende que el USUARIO y POKKASH están vinculados a través de este ACUERDO y
  sujetos al mismo en los siguientes casos: </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.4.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Al
  registrarse el USUARIO para crear y/o usar una CUENTA en el SITIO. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.4.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Al
  usar o navegar el SITIO o usar cualquiera de los SERVICIOS. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  virtud de lo anterior el USUARIO acepta que ha leído, entendido y aceptado
  todos los términos y condiciones contenidos en el ACUERDO y la Política de
  Privacidad de POKKASH y por lo tanto se obliga a su cumplimiento.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  el presente ACUERDO, cuando se hace referencia a POKKASH, para todos los
  efectos se incluye a sus funcionarios, directores, administradores, empleados,
  agentes, contratistas independientes y/o licenciantes accionistas,
  inversionistas, empleados o cualquier persona natural o jurídica relacionada,
  así como a sus matrices, subsidiarias, subordinadas, filiales vinculadas,
  proveedores o sus respectivos funcionarios, directores, administradores,
  empleados, agentes, contratistas independientes y/o licenciantes.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  podrá hacer cambios y/o modificaciones al ACUERDO en cualquier momento y sin
  previo aviso, notificándolo al USUARIO de la manera regulada en el aparte
  correspondiente del presente documento. El USUARIO comprende y acepta el uso
  continuo de los SERVICIOS o del SITIO con posterioridad a la fecha de
  actualización, constituye su aceptación y obligación de pleno cumplimiento.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.8.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  no tiene obligación de pagar ni de reconocer ningún tipo de interés o
  remuneración relacionados con los fondos que se encuentren en la CUENTA ni en
  la BILLETERA POKKASH del USUARIO.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.9.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  no es una entidad financiera ni entidad de economía solidaria por lo que no
  capta dinero de sus usuarios ni de tercero alguno ni realiza recepción de
  depósitos ni adelanta actividades que son exclusivas a dichos entes, así como
  tampoco se sujeta a la vigilancia de las autoridades supervisoras de entidades
  financieras en ningún Estado.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.10.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  violación de cualquier disposición de EL ACUERDO por parte del USUARIO dará
  derecho a POKKASH para rescindir y/o terminar justificadamente su CUENTA,
  prohibiéndole y / o el acceso a los SERVICIOS o al SITIO, en cualquier momento
  a su exclusivo criterio, con o sin previo aviso. Esta situación no dará derecho
  a indemnización ni reconocimiento alguno a favor del USUARIO.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.11.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Son
  anexos del presente documento y hacen parte integral del mismo, los siguientes:
  </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level3 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.11.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Anexo
  1: Consentimiento para Entrega y Firmas Electrónicas</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level3 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.11.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Anexo
  2: Política de Uso Prohibido, Negocios Prohibidos y Uso Condicionado</span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'>ANTES DE REALIZAR CUALQUIER ACCIÓN U
  OPERACIÓN EN O A TRAVÉS DEL SITIO, EL USUARIO DEBE LEER CUIDADOSAMENTE LA
  INTEGRIDAD DEL PRESENTE ACUERDO, ASÍ COMO LA POLÍTICA DE PRIVACIDAD. EN CASO DE
  NO ESTAR DE ACUERDO, EL USUARIO DEBE ABSTENERSE DE USAR EL SITIO Y EN CASO DE
  USO, CESAR EL MISMO INMEDIATAMENTE.<span style='mso-spacerun:yes'> </span></span></p>
  
  <p class=MsoNormal align=center style='text-align:center'><b style='mso-bidi-font-weight:
  normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <b style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-size:11.0pt;
  line-height:107%;font-family:"Cambria",serif;mso-fareast-font-family:Calibri;
  mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
  mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;mso-fareast-language:
  EN-US;mso-bidi-language:AR-SA'><br clear=all style='mso-special-character:line-break;
  page-break-before:always'>
  </span></b>
  
  <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoNormal align=center style='text-align:center'><b style='mso-bidi-font-weight:
  normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoNormal align=center style='text-align:center'><b style='mso-bidi-font-weight:
  normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:18.0pt;
  mso-add-space:auto;text-align:center;text-indent:-18.0pt;mso-list:l11 level1 lfo16'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO SEGUNDO – APERTURA DE
  CUENTA Y REGISTRO</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Existen
  dos tipos de CUENTAS dentro del SITIO: CUENTAS PERSONALES y CUENTAS
  EMPRESARIALES, LAS CUALES SE DENOMINARÁN INDISTINTAMENTE CUENTAS para efectos
  del acuerdo. </span></p>
  
  <p class=MsoNormal style='text-align:justify;text-indent:35.4pt'><span
  lang=ES-CO style='font-family:"Cambria",serif'>El USUARIO sólo podrá ser
  titular de una cuenta personal.</span></p>
  
  <p class=MsoListParagraphCxSpFirst style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Para
  crear una CUENTA PERSONAL se debe: <span style='mso-spacerun:yes'></span></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.2.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Ser
  residente de uno de los países en los que POKKASH  tiene soporte. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.2.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Ser
  mayor de edad en su país de residencia y usar un número de teléfono celular /
  inalámbrico que sea de su propiedad. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>CUENTA
  por regla general será personal, salvo que exista una aprobación previa por
  parte de POKKASH para la apertura de una CUENTA EMPRESARIAL. No puede existir
  bajo ninguna circunstancia una CUENTA EMPRESARIAL sin la aprobación directa de POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  CUENTA será la base para la prestación de los servicios por parte de POKKASH al
  USUARIO. Se enfoca en las transferencias electrónicas de pagos y transferencias
  del USUARIO como repositorio de información custodiado y administrado por POKKASH,
  en el que se registra la totalidad de las transacciones y pagos efectuados a
  través del SITIO y de la CUENTA específica y de conformidad con los términos de
  este ACUERDO. La CUENTA y todos los SERVICIOS proveídos por el SITIO son de uso
  personal, exclusivo e intransferible, por lo cual está terminantemente
  prohibida la venta, cesión o transferencia de la CUENTA, por parte del USUARIO,
  lo cual tendrá como consecuencia su cierre.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO se obliga a mantener confidencialidad y no divulgar cualquier
  credencial que utilice para acceder a su CUENTA y a los SERVICIOS. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO se obliga mantener su número de teléfono, dirección de correo
  electrónico y demás información de contacto actualizada en el perfil de su CUENTA.
  </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH&nbsp;no
  se responsabiliza por la certeza de los datos e información provistos por el
  USUARIO. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.8.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO garantiza y responde, en cualquier caso, sobre la veracidad, exactitud,
  integridad, vigencia y autenticidad de los datos e información suministrada a POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.9.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Toda
  la información y los datos suministrados e ingresados por el USUARIO para la
  apertura de la CUENTA tienen carácter de declaración juramentada. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.10.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  se reserva el derecho de solicitar comprobantes y/o información adicional a
  efectos de corroborar los datos suministrados por el USUARIO, así como de
  suspender temporal o definitivamente al USUARIO cuyos datos y/o información no
  haya podido ser confirmada o no sea actualizada.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.11.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  se reserva el derecho de rechazar una solicitud de registro o de cancelar o
  suspender, temporal o definitivamente una CUENTA, en caso de detectar
  incongruencias o inconsistencias en la información y/o datos brindados por un USUARIO
  o en caso de detectar actividades sospechosas, sin que tal decisión genere para
  el usuario derechos de indemnización o resarcimiento de ningún tipo.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.12.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  no realizará el registro de la cuenta si: </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.12.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Directa o indirectamente a
  través de sus subsidiarias, afiliadas, directores, funcionarios, empleados o
  agentes se encuentren: </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:70.9pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l11 level4 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.12.1.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Sujetas
  a sanciones o </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:70.9pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l11 level4 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.12.1.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Situadas
  en, constituidas en, o residentes de un país o territorio que sea sujeto a
  sanciones, o cuyo gobierno sea sujeto a sanciones, incluyendo sin limitaciones
  a: la Región de Crimea, Cuba, Irán, Siria y Corea del Norte.&nbsp;Para efectos
  de lo anterior se entenderá por sanciones: las restricciones o prohibiciones en
  la capacidad de participar en negocios y otras actividades económicas con
  ciertos países, regiones, personas, entidades y sectores industriales o
  cualquier medida gubernamental diseñada para privar a una entidad objetivo
  (incluyendo individuos, corporaciones, territorios, países, etc.) de activos
  financieros y económicos con el fin de contrarrestar e intentar reducir el
  comportamiento que amenace la seguridad nacional o internacional o contravenga
  el derecho internacional. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.12.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Serán rechazados como USUARIOS o
  se les suspenderá o inhabilitará la CUENTA de<span style='mso-spacerun:yes'>
  </span> quienes se encuentren incluidos en las Listas de Sancionados de OFAC
  (Office of <span class=SpellE>Foreign</span> <span class=SpellE>Assets</span>
  Control de Estados Unidos), Listas de terroristas de las Naciones Unidas
  (UN),&nbsp; Lista de Organizaciones terroristas extranjeras del Departamento de
  Estado de Estados Unidos, y Listas de la Unión Europea de organizaciones y de
  personas catalogadas como terroristas, así como en cualesquier lista nacional
  de personas bloqueadas, quedando prohibida la registración o utilización del SITIO
  en los mencionados territorios o jurisdicciones sancionadas.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.13.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Al
  abrir una CUENTA en el SITIO y pasar a ser un USUARIO, éste garantiza expresamente
  que:</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.13.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Acepta y se obliga por el
  presente Acuerdo y la Política de Privacidad, los cuales son vinculantes;</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.13.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>La información que ha
  suministrado es cierta, veraz y precisa y sujeta a confirmación; y</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.13.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Que tiene todas las capacidades
  para aceptar y obligarse por el ACUERDO.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.13.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Acepta que POKKASH puede verse
  impedida a ofrecer los SERVICIOS en todo momento.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.13.5.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Sin perjuicio de que el Sitio
  está orientado para usuarios registrados residentes en los países que soporta POKKASH,
  dependiendo del país de residencia, se puede dar el caso que un usuario no
  tenga la posibilidad de usar todas las funcionalidades del SITIO. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.14.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Es
  responsabilidad del USUARIO cumplir las reglamentaciones y leyes propias del
  país donde reside, o el país desde donde está accediendo al SITIO y a los SERVICIOS,
  incluyendo, pero sin limitarse al régimen cambiario y de transferencias de cada
  uno de los países donde tenga incidencia su transacción. En esa medida, el USUARIO
  no puede usar el SITIO y/o los SERVICIOS para transgredir o pasar por alto,
  directa o indirectamente cualquier disposición del ordenamiento jurídico donde
  reside ni donde opera POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.15.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cualquier
  referencia a una CUENTA, para los efectos del ACUERDO, comprende todos los
  servicios prestados por POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.16.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Con
  el fin de llevar a cabo la verificación y o autenticación de identidad, durante
  el registro de la CUENTA o en cualquier momento posterior, el USUARIO acepta
  proporcionar a POKKASH la información que solicite, con el fin de facilitar la detección
  de cualquier operación o acto de lavado de dinero, financiamiento del
  terrorismo, fraude o cualquier otro delito, así como permitir mantener un
  registro, uso y tratamiento de dicha información y datos personales. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.17.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>EL
  USUARIO deberá completar los procedimientos de verificación exigidos a criterio
  de POKKASH antes de poder ingresar y acceder a los SERVICIOS del SITIO. El acceso
  por parte del USUARIO a uno o más SERVICIOS y los límites que se aplican a su
  uso de los SERVICIOS pueden modificarse por POKKASH como resultado de la
  información recopilada, tanto en el registro como posteriormente. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.18.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  información solicitada por POKKASH puede incluir cierta información personal o
  datos personales. Al proporcionar a POKKASH esta o cualquier otra información
  que pueda ser requerida, el USUARIO confirma que la información es precisa,
  veraz y auténtica. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.19.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO deberá realizar la actualización de la información en caso de cambios,
  ya que dicha información será utilizada en caso de necesidad de contacto por
  parte de POKKASH. El USUARIO autoriza a POKKASH para realizar, ya sea
  directamente o a través de terceros, averiguaciones, consultas, cruce de bases
  de datos y cualquier otra acción que se considere necesaria, a criterio de POKKASH
  para verificar y/o autenticar la identidad, su origen de fondos del USUARIO,
  así como para proteger contra cualquier evento de fraude, delitos o cualquier
  otra irregularidad o violación a la ley, así como para fines estadísticos,
  comerciales y/o de evaluación de riesgos. De igual manera permitirá a POKKASH tomar
  medidas que considere necesarias en función de los resultados de tales consultas.
  El USUARIO reconoce y acepta que su información personal puede divulgarse a
  personas y/ o entidades de referencia crediticia y prevención de fraude o
  delitos para efectos de consulta. POKKASH se reserva el derecho de solicitar
  toda la información que considere pertinente y necesaria para que el USUARIO pueda
  acceder a cualquiera de los SERVICIOS.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.20.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  caso de encontrar o sospechar de alguna actividad inadecuada relacionada a la
  CUENTA del USUARIO, POKKASH podrá solicitar información adicional, incluyendo
  autentificación de documentos, pudiendo congelar transacciones de la CUENTA para
  ser revisadas. En caso de no cumplimiento de esta solicitud por parte del
  USUARIO, la CUENTA será cerrada y el presente ACUERDO terminado
  justificadamente por parte de POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>2.21.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  razón y con ocasión de su uso del SITIO, el USUARIO deberá: <span
  style='mso-spacerun:yes'></span></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.21.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Proporcionar información
  precisa, cierta actual y completa, según lo solicite cualquier formulario de
  registro en el SITIO. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.21.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Mantener la seguridad y
  confidencialidad de su contraseña e identificación como cualquier credencial o
  dato para el uso de la CUENTA o los SERVICIOS; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.21.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Mantener y actualizar de manera
  precisa, cierta y completa su información </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.21.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Notificar de inmediato a POKKASH
  sobre cualquier cambio material en la información o circunstancias que puedan
  afectar su elegibilidad para continuar usando el SITIO o los SERVICIOS; y </span></p>
  
  <p class=MsoListParagraphCxSpLast style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>2.21.5.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp; </span></span></span><span
  lang=ES-CO style='font-family:"Cambria",serif'>Ser totalmente responsable del
  uso de su Cuenta.</span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <b style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-size:11.0pt;
  line-height:107%;font-family:"Cambria",serif;mso-fareast-font-family:Calibri;
  mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
  mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;mso-fareast-language:
  EN-US;mso-bidi-language:AR-SA'><br clear=all style='mso-special-character:line-break;
  page-break-before:always'>
  </span></b>
  
  <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:18.0pt;
  mso-add-space:auto;text-align:center;text-indent:-18.0pt;mso-list:l11 level1 lfo16'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO TERCERO - ACTIVIDADES
  PROHIBIDAS</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>3.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO acepta y se obliga a no usar el SITIO para ningún propósito que no esté
  autorizado en este ACUERDO. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>3.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO no desarrollará ningún tipo de actividad ilegal o acción que afecte
  negativamente el funcionamiento del SITIO o de los SERVICIOS proporcionados o a
  cualquier tercero; o que de alguna manera esté prohibido en otras disposiciones
  de este ACUERDO o por la ley. Sin limitar lo anterior, usted no puede
  participar en ninguna de las siguientes actividades a través del SITIO, ni
  ayudará a un tercero en ninguna de estas actividades:</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>3.2.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Usar
  ilegal o inapropiadamente el SITIO, de acuerdo con las leyes locales
  aplicables;</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>3.2.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Intentar
  obtener u obtener acceso no autorizado a el SITIO o a los SERVICIOS, o a la cuenta
  de otro usuario;</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>3.2.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Hacer
  cualquier intento de eludir o evadir cualquier funcionalidad de seguridad del
  SITIO;</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>3.2.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Violar
  cualquier ley, estatuto, ordenanza o regulación. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>3.2.5.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Incurrir
  en actividades relacionadas con el lavado de activos, financiación al
  terrorismo y financiamiento de la proliferación de armas de destrucción masiva.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>3.2.6.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Reproducir,
  duplicar, copiar, vender o revender los SERVICIOS del SITIO para cualquier
  propósito;</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>3.2.7.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Participar
  en cualquier actividad que sea abusiva o que interfiera o interrumpa el SITIO o
  los SERVICIOS.</span></p>
  
  <p class=MsoListParagraphCxSpLast style='margin-left:49.65pt;mso-add-space:
  auto;text-align:justify;text-indent:-36.0pt;mso-list:l11 level3 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>3.2.8.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Utilizar
  el SITIO para la realización de actividades relacionadas con remesas.</span></p>
  
  <p class=MsoNormal style='margin-left:35.4pt;text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Cada vez que el USUARIO utiliza
  el SITIO y los SERVICIOS declara el cumplimiento de los parámetros acá
  establecidos y el no ejercicio de las actividades acá establecidas, así como
  todas las demás incorporadas en el presente ACUERDO.<span
  style='mso-spacerun:yes'> </span></span></p>
  
  <p class=MsoListParagraphCxSpFirst style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>3.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Si
  POKKASH bloquea el acceso del USUARIO al SITIO (incluido el bloqueo de su
  dirección IP), el USUARIO no podrá aplicar ninguna medida para evitar o desviar
  dicho bloqueo, a través de medidas como enmascarar la dirección IP o con una
  dirección IP proxy. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level2 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>3.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>EL
  USUARIO acepta que cualquier pago realizado utilizando los SERVICIOS, se
  realizará a cambio de bienes y servicios o como donación; o exclusivamente para
  aquellas operaciones que no requieran efectuarse a través de un Intermediario
  del Mercado Cambiario o cualquier entidad financiera u otra entidad de
  conformidad con la ley aplicable.</span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoNormal style='text-align:justify'><b style='mso-bidi-font-weight:
  normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoNormal style='text-align:justify'><b style='mso-bidi-font-weight:
  normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoNormal style='text-align:justify'><b style='mso-bidi-font-weight:
  normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraph align=center style='margin-left:18.0pt;mso-add-space:
  auto;text-align:center;text-indent:-18.0pt;mso-list:l11 level1 lfo16'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO CUARTO – SERVICIOS</span></b></p>
  
  <p class=MsoNormal><span lang=ES-CO style='font-family:"Cambria",serif'>Para
  todos los efectos, los servicios regulados en este aparte, se denominarán
  conjuntamente LOS SERVICIOS.</span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'>Los activos o recursos acreditados en la
  CUENTA y/o BILLETERA no generan intereses de ningún tipo y el USUARIO podrá
  disponer libremente de ellos para realizar las operaciones descritas en el
  presente ACUERDO, ello una vez que resulten acreditados en su CUENTA y conforme
  los plazos y mecanismos y reglas determinados por POKKASH.</span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'>Toda información sobre los fondos y/o
  activos disponibles y acreditados en la CUENTA y/o la BILLETERA debe ser
  siempre verificada por el USUARIO a través del SITIO.<b style='mso-bidi-font-weight:
  normal'></b></span></p>
  
  <p class=MsoNormal><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='text-align:center;
  text-indent:-36.0pt;mso-list:l11 level2 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Título Primero – Servicio de Método
  de Pago.</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l11 level3 lfo16'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  servicio de método de pago consiste en que El SITIO permite a los usuarios
  organizar y facilitar el pago o transferencia a un destinatario que: <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l11 level4 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.1.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Es
  titular de una CUENTA y/o de una cuenta bancaria en un banco respaldado por el
  SITIO y autorizado por una autoridad estatal; y, <b style='mso-bidi-font-weight:
  normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l11 level4 lfo16'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.1.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Es
  residente de un país donde POKKASH preste SERVICIOS. Una lista de bancos y
  países admitidos para lo anterior, está disponible en el SITIO. <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO comprende y acepta que cuando utiliza el SERVICIO Método de Pago, POKKASH
  envía sus fondos a través de un procesador o pasarela o agregador de pagos
  externo o afiliado (&quot;PROCESADORES DE PAGO&quot;). El USUARIO comprende y
  acepta que POKKASH puede realizar préstamos, cambio de divisas u otras
  transacciones comerciales o financieras para facilitar dichos pagos. Además,
  comprende y acepta que POKKASH puede participar en la compra de activos
  digitales para facilitar los pagos y/o transferencias.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  disponibilidad y la transferencia de fondos a la cuenta bancaria del
  beneficiario o en la CUENTA está sujeta a una serie de factores, que incluyen,
  sin limitarse a: el procesamiento de pagos y liquidación del banco del
  beneficiario, los procesos de pago y liquidación del SITIO, la liquidez en los
  mercados de divisas y activos digitales. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  disponibilidad de fondos en la cuenta bancaria del beneficiario depende de
  varios factores, que incluyen la cantidad enviada, los requisitos
  reglamentarios, los requisitos de protección del consumidor, los requisitos de
  identificación, las restricciones de entrega, las reglas bancarias y las horas
  de operación, tanto de los bancos como de las entidades de procesamiento de
  transferencias bancarias.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Ciertos
  países y jurisdicciones pueden imponer tributos, impuestos, tarifas, cargas y/o
  recargos, entre otros, para la realización de transacciones de pago, y/o la
  recepción de fondos por parte del beneficiario designado o su acceso a fondos o
  fondos depositados, los cuales en todos los casos deberá asumir el USUARIO.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO autoriza a la POKKASH a confiar y tomar como cierta la información proporcionada
  y en este sentido, ésta no se encuentra obligada a realizar ninguna investigación
  previa o posterior. De igual manera, el USUARIO autoriza a la POKKASH a confiar
  únicamente en el banco receptor para la información de la cuenta bancaria que
  proporcione, independientemente de si el beneficiario aparece o no en los
  registros del banco del destinatario como titular de la cuenta.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  en ninguno de los casos garantiza, ni es ni será responsable bajo ningún evento
  o circunstancia respecto de la autenticidad o legalidad de las transacciones de
  pago que se procesen a través de la CUENTA. El riesgo de fraude por
  suplantación de identidad de un usuario, o el de ilegalidad de una transacción
  son asumidos total y exclusivamente por el USUARIO.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.8.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>EL
  USUARIO SE DEBE ASEGURAR DE QUE LA INFORMACIÓN QUE PROPORCIONE, <span
  class=GramE>INCLUYENDO</span> PERO SIN LIMITARSE A SU NOMBRE, NÚMERO DE
  TELÉFONO Y NÚMERO DE IDENTIFICACIÓN NACIONAL DEL RECEPTOR, EL NOMBRE DEL BANCO
  RECEPTOR Y EL NÚMERO DE CUENTA BANCARIA SON CORRECTOS. SI CUALQUIERA DE ESTA
  INFORMACIÓN ES INCORRECTA, LOS FONDOS PUEDEN SER TRANSFERIDOS A LA CUENTA
  INCORRECTA Y NO SE PUEDEN RECUPERAR. EL USUARIO ASUME TODO EL RIESGO DE LA
  INFORMACIÓN INCORRECTA O INCOMPLETA QUE PROPORCIONA.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.9.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cuando
  se realice un pago o transferencia desde y hacia la CUENTA del USUARIO, éste
  podrá ser requerido por POKKASH para que proporcione información y
  documentación adicional, incluida la prueba del origen de los fondos. El
  USUARIO acepta cumplir con dichos requisitos y proporción de la información
  solicitada y comprende y reconoce que POKKASH puede cancelar cualquier
  transacción si no cumple de forma completa y adecuada con estas solicitudes,
  así como también puede restringir o suspender el acceso y uso del SITIO y los SERVICIOS
  o cancelar la CUENTA.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.10.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Salvo
  lo dispuesto en este ACUERDO o según lo permitido por la ley aplicable, el
  USUARIO no podrá cancelar, terminar y/o revocar un pago y/o transferencia
  después de realizar la transacción a través del Procesador de Pago o en general
  respecto de cualquier instrucción y/u orden de pago o transferencia. Sin
  perjuicio de lo anterior, y sujeto a las leyes aplicables del consumidor, las
  transferencias a través de los Procesadores de Pago pueden cancelarse para
  obtener un reembolso completo del monto y las tarifas pagadas al informar a POKKASH
  dentro de los cinco (5) días de su pago, a menos que el monto del pago ya se
  haya depositado en la cuenta bancaria del beneficiario o iniciado su
  transferencia a través de un agente externo. El USUARIO también puede recibir
  un reembolso completo en ciertas circunstancias, o si demuestra con éxito un
  error de POKKASH, o cuando lo establece expresamente la ley aplicable, siendo
  posible, dicha restitución. En relación con los activos digitales, el USUARIO debe
  tener presente que, dada su operatividad y funcionamiento, así como protocolos
  y reglas informáticas, las transacciones y operaciones a través del SITIO, son
  irrevocables </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.11.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  puede imponer límites o restricciones a cualquier transacción con ocasión de la
  revisión de la actividad de la CUENTA y/o su información y/o por cualquier otro
  motivo a criterio de POKKASH. Adicionalmente, la CUENTA está sujetas a un límite
  de transacciones por país de origen. El límite de transacciones y los
  requisitos de documentación se encuentran en el SITIO. Además, cualquier pago
  con tarjeta de crédito o débito u otro medio de terceros también puede estar
  sujeto a un límite transaccional. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.12.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Los
  procesadores de pago estarán autorizados a recibir un número limitado de pagos,
  tanto de salida como de entrada, como parte de los SERVICIOS. Los pagos no se
  realizarán si se rechaza la autorización de la tarjeta de crédito, tarjeta de
  débito o medio de pago, independientemente del motivo de rechazo.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.13.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  liquidación en la cuenta del beneficiario se determina únicamente mediante un
  contrato bilateral entre POKKASH y las contrapartes de activos digitales y/o
  proveedores de liquidez en los mercados extrabursátiles. Estos mercados no
  publican tipos de cambio consolidados determinados por una entidad
  gubernamental, asociación de la industria, mercado de divisas centralizado (FX)
  u otros. La liquidación de los activos digitales está sujeta a ganancias o
  pérdidas con ocasión de las volatilidades, el precio/valor definitivo de venta
  y/o compra del activo digital, el riesgo cambiario y otros factores de riesgo
  descritos en este ACUERDO.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.14.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Las
  siguientes declaraciones se realizan de conformidad con las leyes vigentes de
  la República de Colombia con respecto a pagos electrónicos y otras
  transferencias electrónicas a cada cuenta del banco receptor. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.14.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Puede
  haber limitaciones en la actividad de la cuenta bancaria del beneficiario que
  restringen su capacidad de realizar transferencias electrónicas. Cualquiera de
  estos límites se revela en los acuerdos aplicables que rigen cada cuenta del
  banco receptor. Una transferencia electrónica significa una transferencia que
  se inicia a través de un dispositivo electrónico o computadora para instruir a POKKASH
  para que realice un débito o crédito en una cuenta. Las transferencias
  electrónicas incluyen transacciones electrónicas como transferencias directas o
  retiros de fondos, transferencias iniciadas por teléfono móvil o cualquier
  dispositivo conectado a Internet, a través del Sitio o de los Procesadores de
  Pago.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.14.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  usuario acepta, declara, encarga, garantiza y asegura que el dinero que adelante
  en su CUENTA, ya sea vía transferencia bancaria u otro método, y ya sea
  personalmente o a través de un tercero, sólo podrá ser usado, única, exclusiva
  y específicamente, para adelantar transferencias determinadas y/o un pago
  y/o&nbsp;la adquisición de activos digitales determinados por POKKASH y/o los SERVICIOS,
  por su cuenta y no otro fin.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.14.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Recíprocamente,
  el USUARIO acepta y asegura que los activos digitales soportados por POKKASH que
  adelante en su BILLETERA POKKASH, cualquiera sea el método utilizado, sólo
  podrán ser usados, única, exclusiva y específicamente para ser ofrecidas por su
  cuenta y para fines legales.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.14.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO también entiende, declara, garantiza, encarga, asegura y acepta que los
  fondos que adelante en el SITIO o el saldo con ocasión de una transacción,
  deben ser retirados una vez que la transacción haya sido realizada, y que POKKASH
  no es un depósito ni bóveda donde podrá dejar los fondos indefinidamente. En
  esa medida, POKKASH podrá, vencido un plazo de 90 días calendario contados a
  partir del momento en que se hubieren acreditado recursos en cuenta y el
  usuario no hubiese dado una instrucción de transferencia o pago, el usuario
  autoriza de manera irrevocable a POKKASH  para que pueda: (a) realizar una
  transferencia de estos dineros en la cuenta bancaria que el USUARIO hubiera
  registrado o utilizado con anterioridad, o en caso de Mercado Pago, o &nbsp;(b)
  adelantar su devolución a la cuenta bancaria que conozca del USUARIO correspondiente
  o a adelantar un depósito judicial o cualquier otro mecanismo legal para la
  entrega de esos recursos, autorizando el usuario dicha devolución por
  cualquiera de estos mecanismos.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.14.5.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO también entiende, declara, garantiza, encarga, asegura y acepta que la
  transferencia y/o pago electrónico se está realizando entre los usuarios y el
  destinatario y no con POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.15.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El<b
  style='mso-bidi-font-weight:normal'> </b> USUARIO<b style='mso-bidi-font-weight:
  normal'> </b> es responsable de todas las transferencias electrónicas que
  autorice, ya sea directa o indirectamente, responsabilidad que puede implicar
  la pérdida de todos sus recursos por el mal manejo, la omisión, culpa o dolo o
  cualquier otro evento o condición atribuible de responsabilidad del USUARIO. <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.16.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO deberá enviar un correo electrónico inmediatamente a&nbsp;<span
  class=MsoHyperlink>pokkash@itrmachines.com </span>si considera que su CUENTA o
  PIN o información de inicio de sesión se ha perdido o ha sido robada o ha
  estado o puede estar sujeto a transferencias electrónicas no autorizadas.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.17.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Con
  la aceptación del presente ACUERDO, el USUARIO con una Cuenta empresarial,
  otorga un mandato irrevocable de destinación especifica de gestión de pagos a POKKASH,
  mediante el cual, POKKASH brinde servicios de gestión o procesamiento de pagos
  con el fin de pagar o percibir por cuenta y orden de dicho USUARIO, utilizando
  los Servicios o cualquier herramienta prevista en el SITIO o por POKKASH, que
  comprende los siguientes encargos concretos y específicos: <b style='mso-bidi-font-weight:
  normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.17.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Pagar
  y/o transferir por su cuenta y orden una determinada suma de dinero y/o USD
  según las instrucciones para cada caso <span class=GramE>concreto&nbsp; de</span>
  transacción o pago, <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.17.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cobrar
  recursos y/o <span class=GramE>USD &nbsp;por</span> su cuenta y orden, según
  las instrucciones otorgadas por el USUARIO para cada caso concreto&nbsp; de
  transacción o pago; <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.17.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Autorizar
  a POKKASH para disponer en su nombre de ciertos fondos y/o activos de su CUENTA
  y/o BILLETERA USD y transferir los mismos a cierto destinatario mediante
  acreditación en una CUENTA o BILLETERA dentro del SITIO, <b style='mso-bidi-font-weight:
  normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.17.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Autorizar
  a POKKASH para cobrar y acreditar en la CUENTA del USUARIO y/o en la BILLETERA USD
  del usuario fondos o USD de acuerdo con sus instrucciones, <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.17.5.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Que
  POKKASH acepte y reciba pagos en favor del usuario en nombre y por cuenta de
  este, a través del SITIO, la BILLETERA o cualquier otro mecanismo dispuesto por
  POKKASH.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.18.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  no utilizará los recursos y/o activos del USUARIO para fines distintos a los
  instruidos por el USUARIO. El USUARIO es el exclusivo responsable por las
  instrucciones de pago, transferencia y cobro y sus consecuencias. POKKASH no
  verificará la causa u obligación subyacente que originó la instrucción de pago,
  transferencia y/o cobro ni las demás circunstancias relativas a la respectiva
  instrucción.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.19.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  no será responsable ni garantizará el cumplimiento de las obligaciones que
  hubiese asumido el USUARIO usuarios con terceros en relación a los pagos a
  efectuar o a cobrar a través del SITIO. El USUARIO reconoce y acepta que al
  realizar transacciones con otros usuarios o terceros lo hace por su propia
  voluntad, prestando su consentimiento libremente y bajo su propio riesgo y
  responsabilidad. En ningún caso, POKKASH será responsable por ningún tipo de
  daño o perjuicio que haya podido sufrir el USUARIO, debido a las transacciones
  realizadas o no realizadas a través del SITIO.<b style='mso-bidi-font-weight:
  normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.20.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  no será responsable ni verificará ningún tipo de elemento, incluyendo las
  causas, importe o cualquier otra circunstancia relativa a dicha instrucción así
  como respecto de la existencia, calidad, cantidad, funcionamiento, publicidad,
  envío, ubicación, garantía, estado, integridad o legitimidad de los bienes o
  servicios ofrecidos, adquiridos o enajenados por los usuarios y pagados
  utilizando el SITIO y/o la CUENTA y/o los SERVICIOS y/o la BILLETERA, así como
  de la capacidad para contratar de los usuarios y la veracidad de los datos personales,
  información por ellos ingresados, ni el precio, promociones o cualquier otro
  asunto derivado de la compraventa o cualquier acto o negocio jurídico
  subyacente respecto de los bienes y servicios, el cual corresponde a las partes
  que lo celebran.<span style='mso-spacerun:yes'> </span><b style='mso-bidi-font-weight:
  normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.21.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  caso de cualquier tipo de reclamación entre usuarios y/o terceros, a través del
  ACUERDO eximen de cualquier responsabilidad a POKKASH y a sus directores,
  gerentes, empleados, agentes, operarios, representantes y apoderados,
  manteniéndolos indemnes. <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.22.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH 
  ingresará en la CUENTA y/o BILLETERA del USUARIO, el importe que efectivamente
  haya sido acreditado por el medio de pago utilizado, independientemente del
  monto declarado por el USUARIO en aquellos supuestos en que el medio de pago
  elegido permita realizar una declaración por un monto de dinero distinto al
  realmente ingresado.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.23.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  su CUENTA y/o BILLETERA, el USUARIO sólo puede recibir pagos a través de las
  herramientas habilitadas por POKKASH. Si POKKASH considera que posiblemente el
  USUARIO podría estar utilizando de manera irregular los mecanismos para agregar
  fondos, podrá suspender o terminar la relación con dicho <span class=GramE>USUARIO</span>
  así como los accesos y SERVICIOS.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.24.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO se compromete a no aplicar ningún cargo adicional por aceptar pagos o
  recibir fondos a través de los SERVICIOS del SITIO.<b style='mso-bidi-font-weight:
  normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.25.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  seguirá las instrucciones ingresadas por el USUARIO, sea para (i) realizar un
  pago o envío de USD en su CUENTA y/o BILLETERA o transferidos a tal efecto o;
  (ii) acreditar y/o recibir los USD en su CUENTA y/o BILLETERA. Se aclara que
  el usuario al registrarse en el SITIO y mantener una CUENTA y/o BILLETERA
  activa, acuerda, acepta y autoriza recibir USD que oportunamente envíen otros
  usuarios a su CUENTA y/o BILLETERA y que se le debite cualquier cargo que
  resulte aplicable.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.26.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Una
  vez que los USD se encuentren acreditados en la CUENTA y/o BILLETERA del
  USUARIO y estén disponibles, éste podrá optar por <b style='mso-bidi-font-weight:
  normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.26.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Retirar
  todo o parte del saldo disponible en su CUENTA y/o BILLETERA; o <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.26.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Dar
  nuevas instrucciones a POKKASH para usar los USD para realizar otros pagos y/o
  <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.26.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Convertir
  y/o vender los USD y dar una instrucción para el retiro de los recursos
  derivados de dicha conversión y/o venta.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:24.75pt;mso-add-space:
  auto;text-align:justify'><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.27.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Los
  retiros de los recursos derivados de dicha conversión y/o venta se harán
  mediante transferencia a una cuenta bancaria indicada oportunamente por el USUARIO.
  Dicha transferencia puede tardar 2 días hábiles después de que se realiza la
  solicitud de retiro. Cualquier gasto originado por la transferencia será a
  cargo del USUARIO sin que medie ningún tipo de autorización previa. Bajo esta
  opción, POKKASH transferirá los recursos a la/s cuenta/s bancaria/s indicada
  por el USUARIO y de titularidad del mismo. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.28.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Para
  efectos de esta venta y/o conversión, POKKASH no estará obligado a seguir las
  instrucciones del usuario en caso de existir distintas opciones de
  reprogramación, canje, disposición, conversión o devolución de los fondos. En
  esas situaciones, POKKASH tendrá el derecho a optar por la opción que, a su
  solo criterio, sea la más conveniente pudiendo POKKASH optar incluso por
  aquella que considere más apropiada a fin de liquidar de manera rápida,
  sencilla y ordenada los USD.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.29.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  podrá determinar un importe máximo para las solicitudes de gestión de cobro,
  pago y/o transferencia de los SERVICIOS indicados en esta sección, monto que
  podrá variar de acuerdo al método de pago elegido, tipo de solicitud y/o a
  criterio de POKKASH e incluso podrá ser modificado en cualquier momento siendo
  suficiente su información al usuario.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.30.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  el evento que el comprador de un bien y/o servicio y/o titular del medio de
  pago que transfirió los USD o recursos al USUARIO realizara una cancelación,
  anulación, contracargo, desconocimiento o reversión sobre los importes
  involucrados en la operación con posterioridad al envío, cualquiera sea el
  medio de pago utilizado, dichos importes serán descontados y debitados de la
  CUENTA del USUARIO. En virtud de ello, el USUARIO autoriza expresamente a la POKKASH
  a debitar de su CUENTA los recursos necesarios para cubrir la anulación,
  contracargo, desconocimiento o reversión, y si no dispusiera de fondos
  suficientes, a debitarlos de cualquier otro ingreso futuro de fondos a su
  CUENTA y/o la BILLETERA, o el USUARIO se compromete a pagarlos dentro de los
  treinta (30) días siguientes al descuento correspondiente. Esta obligación
  prestará mérito ejecutivo a favor de POKKASH, sin necesidad de requerimiento en
  mora.<span style='mso-spacerun:yes'> </span></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.31.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  puede libremente disponer de cualquier Herramienta de Venta y/o modificarla y/o
  sustituirla o dejar de proveerla en cualquier momento.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.32.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Se
  prohíbe la utilización de cualquiera de las Herramientas de Venta, en cualquier
  sitio Web o físico que se encuentre dentro de los Usos Prohibidos y negocios
  prohibidos indicados en este ACUERDO y sus anexos, así como que </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.32.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Tenga
  contenido o permita o realice cualquier actividad contraria a las disposiciones
  legales y administrativas, la moral y las buenas costumbres, o que tengo objeto
  o causa ilícita; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.32.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Promueva
  o tenga contenidos de sexo en el que participen menores de 18 años,
  relacionados con pedofilia, pornografía, desnudos de menores, ya sean reales o
  simulados; o </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.32.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>De
  cualquier <span class=GramE>modo</span> involucre menores de 18 años, o se
  trate de películas o fotografías que hayan sido tomadas de forma ilegal de
  menores de 18 años o sin el consentimiento de las personas que en ellas
  aparecen; o </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.32.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Promueva
  la violencia de cualquier tipo, la discriminación de cualquier tipo,
  prostitución, lavado de dinero, tráfico de armas, de personas o de animales, u
  otras actividades ilegales; y/u </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.32.5.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Ofrezca
  contenidos que violen cualquier legislación vigente, en especial aquellas
  referidas a la protección de derechos de propiedad intelectual, piratería de
  software, etc.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.33.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  podrá dar por terminado este ACUERDO y/o suspender, cancelar, temporal o definitivamente
  una CUENTA, sin notificación previa, en caso que determine que el sitio Web y/o
  físico donde se utiliza una Herramienta de Venta, no se adecua en todo o en
  parte a los estándares antes mencionados o en caso de descubrirse o sospecharse
  comportamientos fraudulentos o que atenten contra la imagen de POKKASH y a su
  criterio. POKKASH se reserva el derecho de iniciar las acciones judiciales o
  extrajudiciales que estime pertinentes.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.34.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Luego
  de la autorización para utilizar alguna de las Herramientas de Venta, el
  USUARIO podrá colocar en su sitio web o físico, alguno de los códigos
  facilitados por POKKASH para generar el carrito de compras, el enlace de pago,
  el código QR o el botón comprar con los parámetros necesarios para dirigir a
  sus usuarios al SITIO o la herramienta de pago. Los Códigos mencionados
  anteriormente podrán tener distintas formas, según la disponibilidad de POKKASH
  y en ningún caso podrán ser modificados por el USUARIO. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.35.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  se reserva el derecho de actualizar o modificar periódicamente el contenido y/o
  apariencia de las Herramientas de Venta y de las URL donde estén direccionados
  los Códigos. POKKASH no será responsable si el Código fuera modificado y con
  ello se cause un daño o perjuicio a un tercero.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.36.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  es titular y/o licenciatario de los derechos de propiedad intelectual
  contenidos en los Códigos y las Herramientas de Venta, y las entregará al
  USUARIO para la correcta comunicación del servicio de medio de pago de POKKASH.
  El USUARIO se obliga a <span class=GramE>utilizarlos</span> así como sus
  contenidos de conformidad con lo estipulado en el presente ACUERDO y las
  instrucciones otorgadas para el efecto por POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.37.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  la difusión, promoción y utilización de las Herramientas de Venta o de cualquiera
  de los SERVICIOS, el USUARIO se obliga a utilizar exclusivamente aquellos
  logos, banners y demás material promocional que sea proporcionado por POKKASH.
  En este sentido, el USUARIO se abstendrá de utilizar banners o logos diseñados
  por si y/o terceros, como cualquier otro material promocional utilizando
  derechos intelectuales de POKKASH, sin su autorización previa y escrita. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.38.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO se obliga a comunicar y utilizar en la página de inicio de su sitio web
  las marcas, logos, banners de promociones bancarias y medios de pago de los
  SERVICIOS ofrecidos por POKKASH para los pagos. El Vendedor se compromete a
  comunicar a su base de usuarios que la plataforma de pago en su sitio web o
  físico es provista por POKKASH, a cuyo fin lo informará en forma clara e
  inequívoca en la sección de selección de medio de pago, mediante el uso del
  banner de selección de medio de pago provisto por POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.39.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  caso de que el <span class=SpellE>el</span> USUARIO cuente con más de un
  proveedor de soluciones pagos, deberá posicionar el banner de selección de
  medio de pago de POKKASH en la primera o segunda posición.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.40.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO debe integrar las soluciones de POKKASH en su sitio web cumpliendo con
  las <span class=SpellE>las</span> políticas de integración efectiva de éste,
  las cuales incluyen: </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.40.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Provisión
  del correo electrónico del Comprador al momento de conexión entre el sitio web
  del Vendedor y POKKASH, para lo cual, el USUARIO deberá contar con las
  autorizaciones de los Compradores; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.40.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Implementación
  de la versión de <span class=SpellE>checkout</span> de POKKASH; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l18 level4 lfo17'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.1.40.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Inclusión
  de logo del USUARIO y precio del/los productos en el <span class=SpellE>checkout</span>
  de POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:24.75pt;mso-add-space:
  auto;text-align:justify'><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.41.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Mediante
  la creación de una CUENTA EMPRESARIAL, el USUARIO otorga a POKKASH una
  autorización de uso gratuito y sin límite temporal del nombre comercial,
  marcas, logos, símbolos, emblemas, colores y/o diseños del USUARIO que fueran
  remitidos a POKKASH para su utilización en acciones promocionales,
  publicitarias y/o comunicaciones relacionadas con los SERVICIOS. La
  autorización conferida faculta a POKKASH a exhibir, reproducir, difundir y/o
  publicar el nombre comercial, marcas, logos, símbolos, emblemas, colores y/o
  diseños del Vendedor en cualquier medio de comunicación y en cualquier soporte,
  incluyendo en particular, pero de ningún modo limitándose al Sitio y a la y los
  correos electrónicos remitidos a usuarios de POKKASH y/o del POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.42.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Todos
  los derechos intelectuales e industriales, sobre el SITIO, Herramientas de
  Venta, Códigos, desarrollo, software, hardware, dominio, logos, emblemas,
  logotipos, diseños, estructura, contenidos, información, etc. son de propiedad
  de POKKASH. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.43.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  ningún caso se entenderá que el USUARIO tendrá algún tipo de derecho sobre los
  mismos, independientemente de los derechos conferidos sobre las Herramientas de
  Venta que POKKASH pone a su disposición durante la vigencia de este ACUERDO,
  sin que esto implique ningún tipo de transferencia o derecho.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.44.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  sólo autoriza al USUARIO a hacer uso de su propiedad intelectual, en lo
  referido a las Herramientas de Venta puestas a su disposición, para el
  cumplimiento de las actividades que se derivan del presente ACUERDO, en su
  sitio web o físico haciendo relación directa a los SERVICIOS. Cualquier otra
  utilización de tal propiedad intelectual de POKKASH, queda estrictamente
  prohibida. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l18 level3 lfo17'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.1.45.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  no garantiza el acceso y uso continuado o ininterrumpido de su SITIO, los
  SERVICIOS o de las Herramientas de Venta. El sistema puede eventualmente no
  estar disponible debido a dificultades técnicas o fallas de Internet en los
  enlaces, códigos QR o Herramientas de Venta o por cualquier otra circunstancia
  ajena a POKKASH. El USUARIO no podrá imputarle responsabilidad alguna a POKKASH,
  ni exigir resarcimiento alguno, en virtud de perjuicios resultantes de las
  mencionadas dificultades, así como por cualquier otra clase de daños,
  incluyendo daños indirectos, especiales o consecuentes que surjan o
  experimenten los usuarios, incluso en el caso que dichas fallas afecten los montos
  que deban ser pagados o acreditados.</span></p>
  
  <p class=MsoListParagraphCxSpLast><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='text-align:center;
  text-indent:-36.0pt;mso-list:l18 level2 lfo17'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>4.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Título Segundo - Servicio de BILLETERA
  Digital.</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.2.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Como
  parte de su CUENTA, POKKASH proporcionará al USUARIO que califique, el acceso a
  una o varias <span class=SpellE>BILLETERAs</span> digitales alojadas (en
  adelante la &quot;BILLETERA &quot;), para mantener un activo digital cuyo valor
  es equivalente a la tasa representativa del mercado en dólares de los Estados
  Unidos de América. La BILLETERA le permite almacenar, rastrear, transferir y
  administrar dichos activos digitales. Los Servicios y los activos admitidos
  pueden variar según la jurisdicción.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.2.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  titularidad de los activos digitales en la BILLETERA permanecerá en todo
  momento bajo propiedad del USUARIO y no será transferido bajo ninguna
  circunstancia a POKKASH. Como propietario de la BILLETERA, el USUARIO asume
  cualquier riesgo de pérdida de activos digitales, así como todas las
  obligaciones derivadas de tal calidad.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.2.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO<b style='mso-bidi-font-weight:normal'> </b> controla los activos
  digitales que se encuentran en la BILLETERA. En cualquier momento, sujeto a
  interrupciones, tiempo de inactividad, problemas de funcionalidades de
  tecnología y otras políticas aplicables, puede retirar sus activos digitales
  enviándolos a otro u otros usuarios(s) del SITIO, o solicitando un retiro a un
  banco respaldado o a través de la red de un Procesador de Pagos.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.2.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO<b style='mso-bidi-font-weight:normal'> </b> reconoce que la BILLETERA no
  está sujeta a ninguna protección para los riesgos que la misma pueda sufrir, ni
  a o seguros provistos por ninguna entidad estatal, lo cual, en caso de pérdida
  total de los recursos, no se verá beneficiado con ningún tipo de reembolso ni
  de indemnización por parte de POKKASH. <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.2.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Para
  la custodia de sus activos de forma más segura, por conveniencia o para recibir
  términos más favorables con contrapartes y socios bancarios, POKKASH puede usar
  cuentas o <span class=SpellE>BILLETERAs</span> <span class=SpellE>blockchain</span>,
  controladas, con el fin de mantener y agrupar activos digitales en nombre de
  los usuarios y / o celebrada en nombre de POKKASH. Aunque POKKASH mantiene contabilidad
  separadas para los usuarios y CUENTAS, no tendrá la obligación de segregar los activos
  digitales de la dirección <span class=SpellE>blockchain</span> que poseen los
  usuarios.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.2.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  instrucción otorgada por el USUARIO para realizar una transacción o cualquier
  orden u acto o negocio jurídico, es irrevocable. No puede el USUARIO retirar su
  consentimiento para esa transacción u orden u acto o negocio jurídico, a menos
  que la correspondiente transacción u orden u acto o negocio jurídico esté
  programada para una fecha futura.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.2.7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO podrá acceder a la siguiente información a través del SITIO: <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l7 level4 lfo18'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.2.7.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Balance
  de sus activos digitales de su BILLETERA <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l7 level4 lfo18'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.2.7.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Historial
  de transacciones, incluyendo <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l7 level5 lfo18'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.2.7.2.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  monto de cada transacción, <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l7 level5 lfo18'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.2.7.2.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Una
  referencia a la identidad del pagador y / o beneficiario (según corresponda)<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l7 level5 lfo18'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.2.7.2.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cualquier
  tarifa cobrada (excluyendo cualquier diferencial o margen, sobre la tasa de
  mercado prevaleciente)<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l7 level5 lfo18'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.2.7.2.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Si
  corresponde respecto a las operaciones con sus activos digitales, la tasa de
  cambio y la cantidad (en la nueva moneda) después del cambio (donde usted se es
  el pagador) o la cantidad (en la moneda original) antes el intercambio (donde
  usted se es beneficiario) y <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l7 level5 lfo18'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>4.2.7.2.5.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  fecha de cada transacción.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify'><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.2.8.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO<b style='mso-bidi-font-weight:normal'> </b>no podrá cancelar, revertir
  ni cambiar ninguna transacción marcada como completa o pendiente. Si el pago no
  es exitoso, si el método de pago no cuenta con fondos suficientes, o si se
  revierte un pago realizado con fondos en su cuenta bancaria, el USUARIO autoriza
  a POKKASH, a su exclusivo criterio, a cancelar la transacción, y/o a realizar
  cargos y/o debitar su pago a través de otros métodos, incluidos, pero sin
  limitarse a los saldos disponibles en la BILLETERA, la CUENTA u otras cuentas
  vinculadas, y en cualquier cantidad necesaria para completar la transacción.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'>En relación con los pagos efectuados,
  el USUARIO es responsable de mantener un saldo adecuado y/o límites de crédito
  suficientes para evitar sobregiros, fondos insuficientes (NSF) o tarifas
  similares cobradas por su proveedor de pagos. POKKASH se reserva el derecho de
  negarse a procesar, cancelar o revertir cualquier transacción o transferencia a
  su exclusivo criterio, incluso después de que los fondos hayan sido debitados
  de la (s) CUENTA (s) del USUARIO, si se sospecha que la transacción involucra
  (o tiene un alto riesgo de participación en) lavado de activos, financiamiento
  del terrorismo, fraude o cualquier otro tipo de delito o actividad ilegal. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.2.9.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  se encuentra facultada para usar un procesador y/o servicios de pagos de
  terceros para procesar cualquier pago y/o transferencias entre el USUARIO, POKKASH
  y otros usuarios.</span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='text-align:center;
  text-indent:-36.0pt;mso-list:l7 level2 lfo18'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>4.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Título Tercero - Servicio de Compra
  y Venta de USD de POKKASH.</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.3.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El<b
  style='mso-bidi-font-weight:normal'> </b>USUARIO<b style='mso-bidi-font-weight:
  normal'> </b>puede adquirir<b style='mso-bidi-font-weight:normal'> </b>USD a
  través de la transferencia de pesos colombianos (“COP”) realizado directamente
  a POKKASH. El número de USD que recibe el USUARIO, a cambio de la transferencia
  realizada, se determinará de acuerdo con la tasa representativa del mercado de
  cambio aplicable del mercado colombiano informada por la autoridad estatal
  competente en Colombia para el intercambio entre USD y COP para el día de la
  celebración efectiva de la transacción. Los USD comprados por el USUARIO se
  almacenarán en su BILLETERA a su nombre, siendo su único propietario.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.3.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO es titular de un derecho de venta sobre los USD y a cargo de POKKASH.
  En el evento, en que el USUARIO decida ejercer su derecho de venta, POKKASH adquirirá
  los USD del usuario pagando una suma de dinero en COP equivalente al valor del
  USD en el momento de la recompra. El número de COP que recibirá el usuario se
  determinará de acuerdo con la tasa representativa del mercado de cambio actual
  del mercado colombiano informada por la autoridad estatal competente en
  Colombia para el día de la celebración efectiva de la transacción.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.3.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cualquier
  operación que adelante POKKASH sobre los USD, se realizará con fondos propios
  de POKKASH.&nbsp; El usuario reconoce y acepta que POKKASH tendrá un derecho
  preferente y exclusivo de compra sobre todos los USD vendidos al USUARIO para
  garantizar la liquidación efectiva de USD y garantizar el retiro oportuno de
  la BILLETERA y su funcionamiento.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.3.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Para
  custodiar de manera más segura los activos digitales del USUARIO, POKKASH puede
  usar cuentas compartidas y/o controladas, con el fin de mantener los activos
  digitales en nombre del USUARIO y/o en nombre de POKKASH . Aunque se mantiene
  una contabilidad separada para cada usuario y las cuentas de POKKASH, no se tendrá
  la obligación de segregar activos digitales propiedad del USUARIO con aquellos
  de propiedad de otros usuarios y/o de la POKKASH.<b style='mso-bidi-font-weight:
  normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.3.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  conversión de USD a cualquier precio de un bien y/o servicio es
  responsabilidad exclusiva del USUARIO en el uso de los SERVICIOS del SITIO. <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l7 level3 lfo18'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>4.3.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Una
  vez recibidos por POKKASH los USD o recursos de la venta y/o transferencia,
  los mismos serán acreditados en la CUENTA del USUARIO o la BILLETERA, según
  corresponda, en un plazo no mayor a 48 horas hábiles. POKKASH realizará los
  esfuerzos razonables para asegurar el cumplimiento del plazo antes indicado. No
  <span class=GramE>obstante</span> ello, el USUARIO entiende y acepta que por
  determinados factores, en su mayoría externos a POKKASH, se pueden originar
  retrasos, motivo por el cual el USUARIO exime a POKKASH  de toda
  responsabilidad por los inconvenientes o perjuicios derivados de tal situación.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpLast><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <b style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-size:11.0pt;
  line-height:107%;font-family:"Cambria",serif;mso-fareast-font-family:Calibri;
  mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
  mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;mso-fareast-language:
  EN-US;mso-bidi-language:AR-SA'><br clear=all style='mso-special-character:line-break;
  page-break-before:always'>
  </span></b>
  
  <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:24.75pt;
  mso-add-space:auto;text-align:center;text-indent:-24.75pt;mso-list:l7 level1 lfo18'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO QUINTO – FACTORES DE
  RIESGO</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:24.75pt;mso-add-space:
  auto'><b style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:
  "Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle align=center style='text-align:center;
  text-indent:-36.0pt;mso-list:l20 level2 lfo19'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>5.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Título Primero - Factores Generales
  de Riesgo.</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>5.1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>A
  pesar de que POKKASH realizará su mejor esfuerzo para eliminar o mitigar los
  factores de riesgo propios de la operación, el USUARIO toma la autónomamente la
  decisión de adelantar actos y relaciones en el SITIO, la <span class=GramE>CUENTA,<span
  style='mso-spacerun:yes'> </span>los</span> USD y cualquier relación con POKKASH,
  los cuales tienen un riesgo que es considerado alto. En este sentido declara
  conocer los riesgos, y libremente y de forma informada se encuentra en
  capacidad de decidir si está de acuerdo en asumirlos. En caso afirmativo, el
  USUARIO estará aceptando asumir los riesgos derivados de su relación con POKKASH
  y la utilización del SITIO y los SERVICIOS. <span
  style='mso-spacerun:yes'></span></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>5.1.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Los
  riesgos específicos relacionados con todas las actividades del ACUERDO son los
  siguientes: </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l20 level4 lfo19'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>5.1.2.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Riesgo
  de inversión: Las tasas de cambio, valor de los activos, riesgos sistemáticos,
  y en general las condiciones del mercado son variables, lo que significa que
  pueden fluctuar incluso después de que el usuario haya depositado sus fondos.
  Como resultado, el valor de los activos, puede cambiar de forma considerable. POKKASH
  no es responsable de estas fluctuaciones y cambios de las condiciones y/o
  precio y/o valoración.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l20 level4 lfo19'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>5.1.2.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>No
  aseguramiento: La CUENTA del USUARIO no se encuentra asegurada ni protegida por
  ningún tipo de seguro. De igual <span class=GramE>manera, <span
  style='mso-spacerun:yes'></span>los</span> activos digitales no son moneda de
  curso legal, por lo cual <span style='mso-spacerun:yes'></span>no tiene poder
  liberatorio ilimitado, no está respaldado por Estado ni autoridad, y las
  cuentas de activos digitales, sus saldos y/o balances y los saldos en la CUENTA
  o la BILLETERA no están cubiertos ni respaldados por ningún esquema público o
  privado, incluyendo el Fondo de Garantía de Instituciones Financieras (&quot;<span
  class=SpellE>Fogafin</span>&quot;). </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l20 level4 lfo19'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>5.1.2.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Riesgo
  técnico:<b style='mso-bidi-font-weight:normal'> </b>POKKASH ha implementado
  medidas técnicas y organizaciones para asegurar la información personal del
  USUARIO contra pérdidas accidentales o accesos uso, alteraciones o revelaciones
  no autorizados. Sin embargo, POKKASH no garantiza que terceras personas sin
  autorización no puedan anular o romper estas medidas, o usar información
  personal para propósitos inadecuados. El USUARIO provee su información personal
  bajo su propio riesgo.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l20 level4 lfo19'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>5.1.2.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Riesgo
  de dependencia de terceros:<b style='mso-bidi-font-weight:normal'> </b>Los SERVICIOS
  se basan, total o parcialmente, en software de terceros y en el desarrollo y
  soporte continuo de terceros. No hay garantía de que esos terceros mantendrán
  su soporte de su software, lo que podría tener un efecto materia adverso en los
  SERVICIOS. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l20 level4 lfo19'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>5.1.2.5.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Riesgo
  de seguridad de la información:<b style='mso-bidi-font-weight:normal'> </b>Los SERVICIOS
  pueden estar sujetos a robo o enajenación por parte de agentes externos a POKKASH.
  De igual manera dichos agentes pueden intentar interferir con los SERVICIOS
  mediante ataques de malware, ataques de denegación de servicio, ataques basados
  en consenso, ataques de <span class=SpellE>Sybil</span>, <span class=SpellE>pitufeo</span>
  y suplantación de identidad, entre otros. Además, los Servicios pueden tener
  errores o debilidades que pueden afectar negativamente a los SERVICIOS o
  provocar la pérdida de la CUENTA y los activos del usuario y/o la pérdida de la
  capacidad del usuario para acceder o controlar su CUENTA. En el caso de un
  error o debilidad de software de este tipo, puede que no haya remedio y no se
  garantiza a el USUARIO ningún remedio, reembolso o compensación.</span></p>
  
  <p class=MsoListParagraphCxSpLast style='margin-left:54.0pt;mso-add-space:auto;
  text-align:justify;text-indent:-54.0pt;mso-list:l20 level4 lfo19'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>5.1.2.6.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>USD
  no es moneda ni moneda de curso legal ni tiene poder liberatorio ilimitado:<b
  style='mso-bidi-font-weight:normal'> </b>El USUARIO reconoce y acepta que, en
  Colombia, (i) los activos digitales no son reconocidos como moneda por ningún
  tipo de autoridad, (ii) los activos digitales no constituyen un activo
  equivalente a la moneda de curso legal, (iii) la unidad monetaria y la unidad
  de cuenta de Colombia es únicamente el peso colombiano (COP) emitido por el
  Banco de la República, los activos digitales no se reconocen como moneda de
  curso legal para el cumplimiento de las obligaciones, (iv) los activos
  digitales no han sido reconocidos por el régimen cambiario colombiano ni por
  ninguna autoridad como divisas, ya que no cuentan con el apoyo o la
  participación ni emisión de ningún Estado ni sus bancos centrales, (v) el
  régimen cambiario no autoriza el uso de activos digitales o <span class=SpellE>BILLETERAs</span>
  virtuales como medio para cumplir con el intercambio operaciones a que se
  refiere el régimen cambiario. El USUARIO se obliga a dar cumplimiento a toda la
  regulación y cualquier disposición cambiaria, monetaria, tributaria, contable y
  de cualquier índole, y reconoce igualmente las limitaciones legales que tienen
  los activos digitales, eximiendo de cualquier actividad y en tal sentido de
  cualquier responsabilidad a POKKASH . </span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='text-align:center;
  text-indent:-36.0pt;mso-list:l20 level2 lfo19'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>5.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Título Segundo – Riesgos
  Específicos del SITIO.</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>5.2.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Acceso
  y disponibilidad: El acceso a los SERVICIOS puede degradarse o no estar
  disponible en momentos de gran volatilidad o volumen. Esto podría resultar en
  la imposibilidad de adelantar cualquier acto y/o negocio jurídico por períodos
  de tiempo y también puede dar lugar a retrasos en el tiempo de respuesta del
  soporte. Aunque POKKASH se esfuerza por brindarle un excelente servicio, no se
  garantiza que el SITIO o los SERVICIOS estarán disponibles sin interrupción,
  así como tampoco que las solicitudes para cualquier transacción sean exitosas.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>5.2.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Precisión
  del Sitio:<b style='mso-bidi-font-weight:normal'> </b>EL SITIO puede no ser
  siempre completamente exacto, completo o actual y también puede incluir
  imprecisiones técnicas o errores tipográficos, situación que es entendida y
  aceptada por el USUARIO. En un esfuerzo por continuar proporcionándole la información
  más completa y precisa posible, la información puede, en la medida permitida
  por la ley aplicable, ser cambiada o actualizada de vez en cuando y sin previo
  aviso, incluida, pero sin limitación a, información sobre nuestras políticas,
  productos y Servicios. En consecuencia, usted debe verificar toda la
  información antes de confiar en ella, y todas las decisiones basadas en la
  información contenida en el SITIO son de su exclusiva responsabilidad y POKKASH
  no tendrá ninguna responsabilidad por tales decisiones. POKKASH no es
  responsable de ningún aspecto de la información, el contenido o los servicios
  contenidos en dichos materiales de terceros accesibles o vinculados desde el SITIO.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <b style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-size:11.0pt;
  line-height:107%;font-family:"Cambria",serif;mso-fareast-font-family:Calibri;
  mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
  mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;mso-fareast-language:
  EN-US;mso-bidi-language:AR-SA'><br clear=all style='mso-special-character:line-break;
  page-break-before:always'>
  </span></b>
  
  <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:18.0pt;
  mso-add-space:auto;text-align:center;text-indent:-18.0pt;mso-list:l20 level1 lfo19'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO 6 - RESOLUCIÓN DE
  ERRORES EN LAS TRANSFERENCIAS ELECTRÓNICAS</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>6.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  caso de reportar errores o tener preguntas sobre transacciones, por favor
  póngase en contacto con nosotros por correo electrónico a&nbsp;<span
  class=MsoHyperlink>pokkash@itrmachines.com </span>si considera: <span
  style='mso-spacerun:yes'></span></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>6.1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Que
  un recibo o documento de la transacción es incorrecto, o </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>6.1.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Si
  necesita más información sobre una transacción en el recibo o documentos
  asociados. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>6.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  término para ponerse en contacto será de sesenta (60) días después de que le
  sea enviado el primer recibo o documento donde aparece el error o problema. Su
  consulta debe incluir:</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>6.2.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Su
  nombre, correo electrónico asociado con su CUENTA y el número de teléfono
  asociado con la Cuenta; y </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>6.2.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Una
  descripción del error, cuyo número de la transacción que origina el
  cuestionamiento, así como una explicación clara de por qué considera que hay un
  error o por qué necesita más información; y (3) el monto del presunto error. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>6.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  investigará de inmediato y, a menos que se indique lo contrario en este
  párrafo, para determinar si se produjo un error dentro de los diez (10) días
  hábiles posteriores a la recepción de una notificación de error. Se informará
  al USUARIO de los resultados por escrito dentro de los tres (3) días hábiles
  después de completar la investigación. En caso tal, POKKASH corregirá el error
  dentro del día hábil siguiente después de determinar su efectiva ocurrencia.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>6.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Devoluciones
  de Transacciones Fallidas:<b style='mso-bidi-font-weight:normal'> </b>En
  relación con cualquier pago y/o transacción fallida o error o situación que dé
  lugar a que un pago /o transacción no pueda ser completada y que dé lugar a una
  devolución de los recursos de la transacción por parte de los Procesadores de
  Pago y/o el destinatario del pago y/o la transferencia, dichos recursos serán
  destinados por POKKASH para la adquisición de USD por nombre y a cargo del USUARIO.
  En esa medida, le serán acreditados al usuario en su BILLETERA USD los
  correspondientes USD adquiridos por el usuario con los recursos de la
  devolución, que serán adquiridos al valor que tengan los USD al momento en que
  se haga efectiva la devolución de los recursos. Se aclara que se entiende que
  el uso de dichos recursos para la adquisición de USD tendrá lugar únicamente
  en el evento que se devuelvan efectivamente los recursos destinados para el
  pago y/o transacción correspondiente. En el evento en que el usuario no desee
  adquirir USD con dichos recursos de la devolución, deberá comunicarlo a POKKASH
  a través de mensaje electrónico dirigido al correo electrónico de soporte. La
  venta y uso de dichos USD seguirán las mismas reglas y condiciones
  establecidos en el presente Acuerdo para los USD.</span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoNormal style='text-align:justify'><b style='mso-bidi-font-weight:
  normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <b style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-size:11.0pt;
  line-height:107%;font-family:"Cambria",serif;mso-fareast-font-family:Calibri;
  mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
  mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;mso-fareast-language:
  EN-US;mso-bidi-language:AR-SA'><br clear=all style='mso-special-character:line-break;
  page-break-before:always'>
  </span></b>
  
  <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:18.0pt;
  mso-add-space:auto;text-align:center;text-indent:-18.0pt;mso-list:l20 level1 lfo19'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO 7 - HONORARIOS, CARGOS,
  PAGOS E IMPUESTOS</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>7.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Al
  usar los SERVICIOS, el USUARIO acepta pagar todas las tarifas, comisiones y/o
  honorarios aplicables (&quot;Tarifas&quot;). POKKASH se reserva el derecho de
  ajustar sus Tarifas y cualquier comisión aplicable en cualquier momento. <span
  class=GramE>POKKASH <span style='mso-spacerun:yes'></span>siempre</span> notificará
  al USUARIO las Tarifas que se aplican a la transacción específica cuando éste la
  autorice y en cada recibo y/o documento que le sea enviado.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>7.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO puede estar sujeto a otros cargos de terceros para el manejo de su
  CUENTA. <span style='mso-spacerun:yes'></span>Cualquier cargo cobrado por
  transacción pueden deducirse por POKKASH del monto liquidado de su pago a un
  beneficiario y/o el saldo en el SITIO. El USUARIO asumirá de sus recursos las
  tarifas adicionales cobradas por cualquier efecto. POKKASH no procesará una
  compra o venta si las tarifas asociadas exceden el valor de la compra y/o venta
  y/o transacción. Es posible que el USUARIO deba transferir dinero adicional
  para cubrir las tarifas bancarias, de tarjeta de crédito o débito o cualquier
  otro cargo, si desea completar dicha transacción. POKKASH genera honorarios a
  su favor sobre la tasa de cambio de moneda u otro diferencial (es decir, la diferencia
  entre la tasa vigente y la tasa que puede alcanzar o las fluctuaciones en las
  tasas).</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>7.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Las
  tarifas serán publicadas en el SITIO o en cualquiera de los sistemas
  informáticos de POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>7.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cargos
  de terceros: El SITIO y los SERVICIOS pueden generar cargos a favor de terceros
  o proveedores externos (&quot;Cargos de Terceros&quot;). POKKASH no controla
  los Cargos de Terceros y son de exclusiva responsabilidad del USUARIO, quien
  deberá responder por los mismos. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>7.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  entidad financiera del beneficiario puede imponer tarifas o cargos adicionales
  como resultado de las transferencias recibidas por éste, así como reglas
  particulares aplicables y negativa a la realización de transacciones, las
  cuales deberán ser acatadas por el beneficiario y serán su responsabilidad. En
  caso tal, las tarifas y gastos bancarios de destino reducirá los fondos netos
  disponibles para retirar de la CUENTA o BILLETERA. En ningún momento POKKASH
  será responsable por situaciones relacionadas entre el beneficiario y la
  entidad financiera. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>7.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Adicional
  a lo ya establecido, el USUARIO acepta que es responsable de todos los
  honorarios, costos, gastos, cargos y similares incurridos por la POKKASH como
  resultado de las transacciones que aquél ha iniciado y los cuales sean
  reversadas, fallen, sean fraudulentas o provocaron errores cuando se procesaron,
  así como cuando sean devueltas. La Tarifa para una transacción determinada se
  denominará en la moneda oficial del país donde se originó la transacción.
  Además, usted acepta que cualquier transacción se considerará completada
  mediante la transferencia de fondos en la cuenta del beneficiario o en la
  cuenta bancaria. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>7.7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Todos
  los impuestos y retenciones serán asumidos por el USUARIO. De igual manera el
  USUARIO es responsable de determinar los impuestos que aplican a todas las
  transacciones asociadas con el uso de los SERVICIOS, así como con respecto de
  la propiedad de los activos digitales y cualquier acto relacionado o generador
  fiscal. POKKASH no retendrá ninguna suma, salvo que considere que dicha retención
  es requerida por la ley aplicable para <span class=SpellE>tranferirla</span> en
  nombre del USUARIO a la autoridad recaudadora competente, lo cual es autorizado
  por el USUARIO. <span style='mso-spacerun:yes'></span></span></p>
  
  <b style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-size:11.0pt;
  line-height:107%;font-family:"Cambria",serif;mso-fareast-font-family:Calibri;
  mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
  mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;mso-fareast-language:
  EN-US;mso-bidi-language:AR-SA'><br clear=all style='mso-special-character:line-break;
  page-break-before:always'>
  </span></b>
  
  <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:18.0pt;
  mso-add-space:auto;text-align:center;text-indent:-18.0pt;mso-list:l20 level1 lfo19'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>8.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO 8 - PROPIEDAD
  INTELECTUAL; LICENCIA LIMITADA PARA EL USO AUTORIZADO</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>8.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Propiedad
  intelectual:<b style='mso-bidi-font-weight:normal'> </b>El SITIO y su
  contenido, materiales e información relacionada, los SERVICIOS y toda la
  propiedad intelectual sin limitación son propiedad de POKKASH o de terceros,
  situación que no se modificará por la ejecución del ACUERDO. <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>8.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO no podrá duplicar, publicar, imitar, modificar, crear trabajos
  derivados, participar o de ninguna manera usar, distribuir o explotar el SITIO,
  los SERVICIOS, el Contenido o cualquier parte de el para cualquier uso público
  o comercial sin el consentimiento expreso y por escrito de POKKASH. <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>8.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO no utilizará un robot, araña, raspador u otro dispositivo automatizado
  para acceder al SITIO o a los SERVICIOS ni eliminará o alterará cualquier
  autoría, marca u otro aviso de propiedad o enseña que se muestre en el SITIO (o
  las páginas impresas del mismo). <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>8.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  otorga al USUARIO una licencia limitada, no exclusiva, revocable en cualquier
  momento e intransferible, sujeta a los términos de este Acuerdo, para acceder y
  usar el SITIO y su contenido sólo en relación con su uso autorizado. <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>8.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cualquier
  otro uso del SITIO o su Contenido está expresamente prohibido. El USUARIO acepta
  que no copiará (excepto lo expresamente autorizado en este documento, si
  corresponde), transmitirá, distribuirá, venderá, licenciará, aplicará
  ingeniería inversa, modificará, publicará o participará en la transferencia o
  venta, creación de trabajos derivados o de cualquier de otra manera, el SITIO o
  cualquiera de los Contenidos.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>8.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  Contenido o la información<b style='mso-bidi-font-weight:normal'> </b>del SITIO<b
  style='mso-bidi-font-weight:normal'> </b>podrá estar incompleta, no actualizada
  o inexacta y también puede incluir imprecisiones técnicas o errores
  tipográficos. Para el efecto, la misma será actualizada por POKKASH, sin previo
  aviso. El USUARIO se obliga a verificar toda la información antes de confiar en
  ella, y todas las decisiones basadas en la información en el Contenido son de
  su exclusiva responsabilidad, manteniendo indemne a POKKASH. <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <b style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-size:11.0pt;
  line-height:107%;font-family:"Cambria",serif;mso-fareast-font-family:Calibri;
  mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
  mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;mso-fareast-language:
  EN-US;mso-bidi-language:AR-SA'><br clear=all style='mso-special-character:line-break;
  page-break-before:always'>
  </span></b>
  
  <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:18.0pt;
  mso-add-space:auto;text-align:center;text-indent:-18.0pt;mso-list:l20 level1 lfo19'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>9.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO NOVENO - SUSPENSIÓN,
  RESTRICCIÓN Y TERMINACIÓN DEL LA CUENTA Y/O LOS SERVICIOS</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>9.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Sin
  limitar algún otro derecho que POKKASH pueda tener, éste puede a su sola
  discreción y sin previo aviso, suspender, restringir o cancelar el acceso al SITIO
  y/o SERVICIOS en los siguientes casos: </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>9.1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Notificación,
  orden judicial u otra orden de cualquier otra autoridad; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>9.1.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Sospecha
  razonable de que el USUARIO su CUENTA en relación con cualquier actividad
  prohibida por este ACUERDO o por la ley aplicable </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>9.1.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Si
  el uso de la CUENTA por parte del USUARIO está sujeto a cualquier litigio,
  investigación o procedimiento pendiente por parte de las autoridades y/o se
  percibe un mayor riesgo de incumplimiento legal o regulatorio asociado con la
  actividad de la CUENTA del USUARIO; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>9.1.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Si
  los terceros con los que contrata POKKASH no pueden respaldar su uso; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>9.1.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Si
  el USUARIO toma cualquier medida que POKKASH considere una violación de los
  controles de POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>9.1.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Si
  la CUENTA ha estado inactiva por un período de seis (6) meses o más, o para
  modificar o descontinuar el SITIO o los SERVICIOS.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>9.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO acepta que POKKASH no es responsable ante éste o terceros por la
  suspensión o terminación de CUENTA o su acceso. La suspensión o terminación de la
  CUENTA no afecta ninguna obligación que tenga con el USUARIO con POKKASH en
  cuanto a Tasas o Recargos relacionados con las transacciones ejecutadas antes
  de la fecha de suspensión o terminación. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>9.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Si
  la CUENTA se suspende o cancela mientras hay una transacción incompleta o no
  reembolsada, esta será transferida a la cuenta bancaria o de la entidad
  financiera informada por el USUARIO. Dicha cuenta bancaria debe pertenecer al
  USUARIO y debe estar ubicada en el país de origen. Todos los reembolsos se
  denominarán en la moneda oficial del país de origen. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>9.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Si
  POKKASH no puede tener contacto con el USUARIO o su ubicación, durante un
  periodo de tres (3) años, podrá liberar dichos fondos de acuerdo con la
  jurisdicción aplicable, en calidad de propiedad no reclamada y bajo la figura o
  institución jurídica que se considere pertinente. POKKASH se reserva el derecho
  de deducir una tarifa administrativa por inactividad u otros cargos de dichos
  fondos no reclamados. Todo esto es autorizado por el USUARIO. </span></p>
  
  <span lang=ES-CO style='font-size:11.0pt;line-height:107%;font-family:"Cambria",serif;
  mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:
  "Times New Roman";mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;
  mso-fareast-language:EN-US;mso-bidi-language:AR-SA'><br clear=all
  style='mso-special-character:line-break;page-break-before:always'>
  </span>
  
  <p class=MsoNormal><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:18.0pt;
  mso-add-space:auto;text-align:center;text-indent:-18.0pt;mso-list:l20 level1 lfo19'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>10.<span style='font:7.0pt "Times New Roman"'>&nbsp; </span></span></span></b><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO
  DÉCIMO - LIMITACIONES DE RESPONSABILIDAD DE POKKASH</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>10.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO<b style='mso-bidi-font-weight:normal'> </b>reconoce y declara que su
  acceso al SITIO o a los Servicios se realiza bajo su propio riesgo y que, en
  consecuencia, y <span class=GramE>que</span> en tal sentido, la POKKASH sólo es
  responsable de los elementos a los que se refiere el ACUERDO, asumiendo el
  USUARIO los riesgos. En virtud de lo anterior POKKASH no es responsable, entre
  otros, por: </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>10.1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Errores,
  omisiones, inexactitudes y/o falsedades en el contenido publicado por sus
  usuarios, especialmente en su Cuenta; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>10.1.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cualquier
  daño o lesión causada por fallas en el Sitio, los Servicios y/o sus sistemas;</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>10.1.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cualquier
  virus que pueda infectar los equipos del USUARIO su como resultado del acceso y
  o uso de los SERVICIOS.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level3 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>10.1.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Infracciones
  de las leyes de propiedad intelectual que el USUARIO pueda cometer en el Sitio</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>10.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO acepta que POKKASH tiene el derecho de monitorear la CUENTA electrónicamente,
  en cualquier momento, y hacer un seguimiento de cualquier información y/o
  comportamiento sospechoso de los usuarios, de acuerdo con los propios criterios
  de POKKASH y el servicio y satisfacción de la ley, los reglamentos y / o los
  requisitos de la autoridad competente, para garantizar el correcto
  funcionamiento del SITIO y para protegerse a sí mismo y a otros usuarios, en
  relación con conductas que puedan ser fraudulentas y/o puedan atentar contra
  los derechos de los usuarios; comportamientos fraudulentos, acosadores, denigrantes,
  difamatorios, discriminatorios, amenazantes, inmorales, obscenos, pornográficos
  u ofensivos en los que los usuarios o personas incurren en el SITIO.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>10.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO no puede imputar ninguna responsabilidad legal a POKKASH ni exigir
  compensación o pagos por daños consecuentes, pérdida de ganancias y otros
  daños, en virtud de los daños derivados de los casos enumerados anteriormente.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l20 level2 lfo19'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>10.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cualquier
  enlace externo<b style='mso-bidi-font-weight:normal'> </b>al<b
  style='mso-bidi-font-weight:normal'> </b>que dirija<b style='mso-bidi-font-weight:
  normal'> </b>el SITIO no está controlado por POKKASH. En tal sentido no es
  responsable de ninguna forma por la información, contenido, productos o
  servicios contenidos o disponibles a través de Sitios Enlazados y cualquier
  riesgo al respecto será asumido por el USUARIO. El USUARIO debe dirigir
  cualquier inquietud con respecto a cualquier Sitio Enlazado al administrador
  del sitio o al <span class=SpellE>webmaster</span> de dichos Sitios Enlazados. </span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <span lang=ES-CO style='font-size:11.0pt;line-height:107%;font-family:"Cambria",serif;
  mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:
  "Times New Roman";mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;
  mso-fareast-language:EN-US;mso-bidi-language:AR-SA'><br clear=all
  style='mso-special-character:line-break;page-break-before:always'>
  </span>
  
  <p class=MsoNormal><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:18.0pt;
  mso-add-space:auto;text-align:center;text-indent:-18.0pt;mso-list:l20 level1 lfo19'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>11.<span style='font:7.0pt "Times New Roman"'>&nbsp; </span></span></span></b><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO
  ONCE – DATOS</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:18.0pt;mso-add-space:
  auto'><b style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:
  "Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle align=center style='text-align:center;
  text-indent:-36.0pt;mso-list:l20 level2 lfo19'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>11.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Título Primero – Tratamiento de
  Datos Personales.</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  reconoce que el USUARIO es el único titular de sus datos personales y por ello
  toma las medidas de seguridad y almacenamiento pertinentes para proteger la
  privacidad y confidencialidad de estos, en los términos que le exija la ley
  aplicable.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.1.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  tratará la información personal del USUARIO, <span class=GramE>incluyendo</span>
  pero sin limitarse a correo electrónico, teléfonos, dirección de domicilio,
  información de los medios de pago y los datos informáticos, tales como IP,
  cookies, entre otros, conforme con su Política de Privacidad, la cual puedes
  consultar en el Sitio o en la URL que con posterioridad disponga POKKASH para
  estos efectos.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.1.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Al
  usar o navegar el SITIO y/o aceptar este ACUERDO, el USUARIO autoriza a POKKASH
  procesar, usar y tratar sus datos personales, lo que incluye la recopilación y
  divulgación de información personal a terceros. Recopilamos información
  personal, a través de cualquier uso u utilización del SITIO por parte del
  USUARIO o a través de diversas fuentes. La información divulgada puede incluir
  datos financieros (por ejemplo, información sobre transacciones con nosotros y
  otros datos financieros), información de contacto, identificación, computadora,
  dispositivo móvil e información de redes sociales. Las entidades de la
  información que recopilamos pueden incluir entidades financieras y no financieras,
  proveedores de servicios, agencias gubernamentales&nbsp;y estatales y/o
  compañías de ventas directas.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.1.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  realiza los esfuerzos razonables para proteger derechos tales como Habeas Data,
  privacidad, intimidad, buen nombre, imagen y autonomía, por lo que las acciones
  llevadas a cabo para estos efectos se guiarán por los principios de buena fe,
  legalidad y transparencia, respetando la legislación vigente. marco que incluye
  la Constitución Política de Colombia, la Ley 1266 de 2008, la Ley 1581 de 2012,
  los Decretos Reglamentarios 1727 de 2009 y 2952 de 2010, el Decreto
  Reglamentario 1377 de 2013, entre otros, y las normas que los modifiquen o
  deroguen.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.1.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Datos
  personales:<b style='mso-bidi-font-weight:normal'> </b>En relación con datos
  proporcionados por el USUARIO tanto propios como de terceros,<b
  style='mso-bidi-font-weight:normal'> </b>el USUARIO declara y garantiza que: <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l17 level4 lfo20'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>11.1.5.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Su
  divulgación a POKKASH se hará de acuerdo con todas las leyes de protección de
  datos y privacidad de datos aplicables, y esos datos son precisos, hasta fecha
  de suministro; <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l17 level4 lfo20'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>11.1.5.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Antes
  de proporcionar dichos datos personales, ha leído y entendido la Política de
  Privacidad del SITIO, que está disponible en la URL que así se disponga, y, en
  el caso de los datos personales relacionados con una persona distinta del
  USUARIO, ha proporcionado una copia de esa Política de Privacidad (actualizada)
  a esa persona; y <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l17 level4 lfo20'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>11.1.5.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Si
  de vez en cuando le proporcionamos una nueva versión o modificación la Política
  de Privacidad, leerá de inmediato esa notificación y proporcionará una copia a
  cualquier persona cuyos datos personales nos haya proporcionado.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify'><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l17 level4 lfo20'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>11.1.5.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO autoriza a POKKASH para solicitar a su operador móvil/telefonía que
  comparta su información y detalles de su móvil con POKKASH para la verificación
  y/o autenticación de identificación. Esto puede incluir nombre, dirección de
  facturación, correo electrónico y número de teléfono/móvil del USUARIO. De
  igual manera, la información puede incluir también ubicación, si está
  disponible. El USUARIO autoriza e instruye a su operador de telefonía móvil
  para compartir toda esta información con POKKASH.<b style='mso-bidi-font-weight:
  normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='margin-left:54.0pt;mso-add-space:auto;
  text-align:justify;text-indent:-54.0pt;mso-list:l17 level4 lfo20'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>11.1.5.5.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO reconoce y acepta que la información sobre la ubicación y/o
  localización y/o georreferenciación de su dispositivo móvil se puede utilizar
  para conocer y/o verificar su ubicación y/o información. La ubicación, y/o
  localización y/o georreferenciación se puede obtener en cualquier momento
  mientras usted esté registrado en este SITIO. El USUARIO autoriza a POKKASH
  para capturar y utilizar su ubicación como parte de la plataforma y para
  determinar su elegibilidad para el uso de la plataforma y los servicios. Todos
  los datos recogidos están sujetos al ACUERDO, de conformidad con el marco legal
  de protección de datos en Colombia.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='text-align:center;
  text-indent:-36.0pt;mso-list:l17 level2 lfo20'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>11.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Título Segundo - Protección y
  Seguridad de Datos:</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.2.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Seguridad
  de contraseña:<b style='mso-bidi-font-weight:normal'> </b>Para acceder a la
  CUENTA, se le solicitará que proporcione su nombre y dirección de correo
  electrónico y que cree una contraseña. El USUARIO es responsable del control y
  de mantener seguro el dispositivo electrónico a través del cual accede a la CUENTA
  y de mantener la seguridad y el control adecuados de ID, contraseñas y todos y
  cada uno de los detalles de seguridad que utiliza para acceder a los SERVICIOS,
  a través de todas las medidas razonables para el efecto. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.2.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  no asume ninguna responsabilidad por cualquier pérdida o perjuicio que pueda
  sufrir el USUARIO debido al compromiso de las credenciales de inicio de sesión
  de la cuenta, siempre y cuando dicha situación no sea por dolo y/o
  incumplimiento de los requisitos establecidos en esta Sección, o seguir o
  actuar sobre cualquier aviso o alerta que podemos enviarte. En caso en que el
  USUARIO considere que la información de acceso a su Cuenta ha sido
  comprometida, deberá contacta inmediatamente al correo <span
  class=MsoHyperlink>pokkash@itrmachines.com</span>. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.2.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Pérdida:<b
  style='mso-bidi-font-weight:normal'> </b>Cualquier pérdida o circunstancia que
  comprometa los dispositivos electrónicos del USUARIO o sus datos de seguridad
  puede dar lugar a un acceso no autorizado a su CUENTA por parte de terceros y
  la subsecuente pérdida o robo de activos digitales o fondos en su CUENTA o BILLETERA
  y cualquier cuenta asociada, incluidas sus cuentas bancarias (vinculadas) y
  tarjeta (s) de crédito. Es responsabilidad del USUARIO mantener sus datos de
  seguridad custodiados, controlados y seguros en todo momento.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.2.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Acceso
  compartido:<b style='mso-bidi-font-weight:normal'> </b>El USUARIO nunca debe
  permitir el acceso remoto o compartir la pantalla de su computadora o
  dispositivo electrónico con otra persona cuando inicie sesión en su CUENTA. POKKASH
  nunca, bajo ninguna circunstancia, solicitará las contraseñas del USUARIO o que
  le sea compartida la pantalla o intentarán acceder a su dispositivo y/o CUENTA.
  El USUARIO deberá iniciar sesión de su CUENTA a través del SITIO para revisar
  cualquier acción requerida o si tiene alguna duda con respecto a la
  autenticidad de cualquier comunicación o aviso.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.2.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Infracción
  de seguridad:<b style='mso-bidi-font-weight:normal'> </b>Si el USUARIO sospecha
  que su CUENTA o cualquiera de sus datos de seguridad se han visto comprometidos
  o si se da cuenta de cualquier fraude o intento de fraude o cualquier otro
  incidente de seguridad (incluido un ataque de seguridad cibernética) que lo
  afecte o a POKKASH, deberá notificar a POKKASH en el término de la distancia al
  correo electrónico <span class=MsoHyperlink>pokkash@itrmachines.com</span> y
  continuar proporcionando información precisa y actualizada durante la duración
  del Incumplimiento de Seguridad. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.2.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO debe adoptar inmediatamente las medidas que razonablemente le sean
  solicitadas por POKKASH para reducir, mitigar, eliminar, administrar o informar
  cualquier Incumplimiento de Seguridad. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.2.7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>La
  falta de notificación inmediata de cualquier Incumplimiento de Seguridad puede
  tenerse en cuenta en nuestra determinación de la resolución adecuada del
  asunto.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>11.2.8.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Seguridad
  y protección de su computadora y dispositivos:<b style='mso-bidi-font-weight:
  normal'> </b>POKKASH no es responsable de ningún daño o interrupción causada
  por virus informáticos u otro código malicioso que pueda afectar los
  dispositivos del USUARIO, incluyendo aquellos derivados de los servicios de SMS
  y correo electrónico, los cuales son vulnerables a ataques de suplantación de
  identidad y phishing.</span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <b style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-size:11.0pt;
  line-height:107%;font-family:"Cambria",serif;mso-fareast-font-family:Calibri;
  mso-fareast-theme-font:minor-latin;mso-bidi-font-family:"Times New Roman";
  mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;mso-fareast-language:
  EN-US;mso-bidi-language:AR-SA'><br clear=all style='mso-special-character:line-break;
  page-break-before:always'>
  </span></b>
  
  <p class=MsoNormal><b style='mso-bidi-font-weight:normal'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:30.75pt;
  mso-add-space:auto;text-align:center;text-indent:-30.75pt;mso-list:l17 level1 lfo20'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>12.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO DOCE - USO GENERAL, USO
  PROHIBIDO Y TERMINACIÓN</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>12.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Suspensión:
  POKKASH puede suspender y restringir su acceso a cualquier SERVICIO, el SITIO y/o
  cualquier relación y/o acto y/o servicio de POKKASH si: </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>12.1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Está
  obligada por una notificación, una orden judicial o una orden vinculante de una
  autoridad estatal competente; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>12.1.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Sospecha
  razonablemente que el USUARIO utiliza su CUENTA en relación con un Uso
  Prohibido; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>12.1.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  uso de la CUENTA está sujeto a cualquier litigio, investigación o procedimiento
  gubernamental pendiente y/o percibimos un mayor riesgo de incumplimiento legal
  o regulatorio asociado con la actividad de su CUENTA; </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>12.1.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Los
  asociados y/o proveedores de servicio de POKKASH no pueden respaldar su uso;
  y/o</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level3 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>12.1.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO toma cualquier acción que POKKASH considere usada para eludir nuestros
  controles, incluida pero no limitada a la apertura de varias CUENTAS de POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>12.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Uso
  prohibido: En relación con el uso de la CUENTA, el USUARIO acepta que no
  participará en ninguna actividad ilegal, actividad abusiva, fraude, juego,
  infracción de propiedad intelectual o actividades prohibidas o restringidas y
  según se define más detalladamente en nuestra Política de Uso Prohibido
  incluida en este ACUERDO como Anexo 2, que hace parte integral del ACUERDO. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>12.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  se reserva el derecho en todo momento de monitorear, revisar, retener y/o
  divulgar cualquier información según sea necesario para cumplir con cualquier
  ley, regulación aplicable, programas de sanciones, proceso legal o solicitud de
  cualquier entidad estatal competente. Igualmente, POKKASH se reserva el derecho
  de cancelar y/o suspender la CUENTA y o bloquear transacciones o congelar
  fondos de inmediato y sin previo aviso, si se determina a criterio exclusivo de
  POKKASH, que la CUENTA está asociada con un Uso Prohibido. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>12.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>No
  asesoramiento:<b style='mso-bidi-font-weight:normal'> </b>POKKASH no hace
  ninguna representación o garantía, expresa o implícita, en la medida en que no
  lo prohíba la ley aplicable, con respecto a la conveniencia de invertir en
  valores, fondos, intereses sobre materias primas, participaciones y/o intereses
  de sociedades u otras inversiones o con respecto al uso de la CUENTA y/o la BILLETERA.
  En virtud de lo anterior no es un asesor ni presta servicios de asesoramiento. <span
  style='mso-spacerun:yes'></span></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'>Todos los informes o reportes elaborados
  por POKKASH, en caso de presentarse, independientemente de su medio de
  divulgación, han sido creados con la finalidad de proporcionar información de
  carácter general y están sujetos a cambios sin previo aviso, sin ningún
  propósito adicional, por lo cual no se asume ninguna responsabilidad sobre los
  mismos. Ni POKKASH ni ninguno de sus directores, administradores, gerentes,
  empleados o representantes serán responsables en cuanto a la exactitud, error,
  omisión o uso de cualquier contenido de este reporte o informe, o de su
  precisión, veracidad o entereza. La decisión sobre cualquier operación será
  directamente del USUARIO quien podrá apoyarse en agentes externos para
  cualquier efecto. </span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:30.75pt;
  mso-add-space:auto;text-align:center;text-indent:-30.75pt;mso-list:l17 level1 lfo20'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>13.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO TRECE – QUEJAS Y
  RECLAMOS</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>13.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Contacto:
  Cualquier contacto deberá hacerse a través del correo electrónico: <span
  class=MsoHyperlink>pokkash@itrmachines.com</span></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Es indispensable que el USUARIO
  en el texto del correo nombre, dirección de correo electrónico y cualquier otra
  información que pueda ser requerida para plena identificación, así como el
  número de la CUENTA y la transacción sobre la cual tiene comentarios o
  preguntas. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>13.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Proceso
  de quejas: Cualquier queja controversia con POKKASH, será comunicada por el
  USUARIO de manera previa a medios judiciales, prejudiciales o del ejercicio de
  la cláusula compromisoria. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>13.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO debe enviar su queja a través de cualquier enlace de atención al USUARIO
  con la información indicada previamente y el detalle del objeto de la Queja -
  hechos que dan lugar a la Queja, objeto de la Queja, motivos en los cuales se
  fundamente la Queja dirección y los documentos que pretenda hacer valer como
  soporte.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>13.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>En
  el evento que la información anterior resulta incompleta, POKKASH requerirá al USUARIO
  para que subsane las fallas dentro del mes siguiente, so pena de archivo de la
  Queja.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>13.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Una
  vez presentada la Queja en cumplimiento de los aspectos formales anteriores, la
  misma será resuelta por POKKASH, dentro de los siguientes 15 días hábiles,
  contados desde el recibo de esta.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>13.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Se
  espera por parte de POKKASH que el uso del SITIO y los SERVICIOS por parte del
  USUARIO esté libre de errores y disputas. Sin embargo, si alguna vez hay una
  disputa con respecto al SITIO o los SERVICIOS que no está cubierta por las
  disposiciones de este ACUERDO, POKKASH inicialmente realizará su propia
  investigación. El USUARIO acepta cooperar razonablemente en dicha investigación
  al proporcionar la información solicitada. Si se determina que el USUARIO le
  debe a POKKASH montos económicos debido a un error, fraude o de otra manera, aquél
  acepta hacer el pago dentro de los siguientes quince (15) días. Si POKKASH determina
  razonablemente que se le debe al USUARIO ciertas cantidades, acuerda hacer el
  pago de dichas cantidades dentro de los quince (15) días hábiles siguientes a
  la definición de esta determinación.</span></p>
  
  <span lang=ES-CO style='font-size:11.0pt;line-height:107%;font-family:"Cambria",serif;
  mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:
  "Times New Roman";mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;
  mso-fareast-language:EN-US;mso-bidi-language:AR-SA'><br clear=all
  style='mso-special-character:line-break;page-break-before:always'>
  </span>
  
  <p class=MsoNormal><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='margin-left:30.75pt;
  mso-add-space:auto;text-align:center;text-indent:-30.75pt;mso-list:l17 level1 lfo20'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>14.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO CATORCE – LIMITACIÓN Y
  DESCARGOS DE RESPONSABILIDAD E INDEMNIDAD</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>14.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  no garantiza la precisión, adecuación, puntualidad, confiabilidad, integridad,
  o la utilidad de cualquiera de los contenidos y/o información del SITIO y en
  tal sentido no se hace responsable por errores u omisiones respecto de dicho
  contenido y/o información. El contenido se proporciona &quot;tal cual&quot; y
  &quot;según esté disponible&quot;, sin ninguna garantía, ya sea expresa o
  implícita, para un propósito particular. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>14.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Disponibilidad:<b
  style='mso-bidi-font-weight:normal'> </b>El SITIO y los SERVICIOS pueden no
  estar disponibles temporalmente de vez en cuando por mantenimiento u otros
  motivos. POKKASH no asume ninguna responsabilidad por cualquier error, omisión,
  interrupción, eliminación, defecto, retraso en la operación o transmisión,
  falla de la línea de comunicaciones, robo o destrucción o acceso no autorizado
  o alteración de las comunicaciones del USUARIO. </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Igualmente, POKKASH no es
  responsable por ningún problema o mal funcionamiento técnico de ninguna red o
  línea telefónica, sistemas informáticos en línea, servidores o proveedores,
  equipos informáticos, software, fallas de correo electrónico o reproductores
  debido a problemas técnicos o congestión de tráfico en Internet o en el SITIO o
  una combinación de los mismos, ni por ninguna pérdida o daño.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>14.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>EXCEPTO
  EN JURISDICCIONES DONDE ESTAS DISPOSICIONES ESTÉN RESTRINGIDAS, EN NINGÚN CASO POKKASH,
  O SUS DIRECTORES, ADMINISTRADORES, CONTRATISTAS, EMPLEADOS O AGENTES SERÁN
  RESPONSABLES FRENTE AL USUARIO O CUALQUIER TERCERO POR CUALQUIER DAÑO
  INDIRECTO, CONSECUENTE, EJEMPLAR, INCIDENTAL, ESPECIAL O PUNITIVO, INCLUSO
  PÉRDIDA DE DATOS DERIVADOS DEL USO DEL SITIO O DEL SERVICIO O CUALQUIERA DEL
  CONTENIDO DEL SITIO U OTROS MATERIALES EN EL SITIO O ACCEDIDO A TRAVÉS DEL
  SITIO, INCLUSO SI POKKASH ES CONSCIENTE O HA SIDO INFORMADO DE LA POSIBILIDAD
  DE DICHOS DAÑOS.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'>EN DADO CASO, LA RESPONSABILIDAD
  DE POKKASH POR CUALQUIER CAUSA Y SIN IMPORTAR LA FORMA DE LA ACCIÓN, EN TODO
  MOMENTO SE LIMITARÁ A LA CANTIDAD PAGADA Y SOLAMENTE SERÁ RESPONSABLE ANTE
  CUALQUIER DAÑO POR DOLO. EN NINGÚN CASO LA RESPONSABILIDAD DE POKKASH EXCEDERÁ
  LOS USD$1000.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>14.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Indemnidad:<b
  style='mso-bidi-font-weight:normal'> </b>EL USUARIO<b style='mso-bidi-font-weight:
  normal'> </b>acepta mantener indemne a POKKASH, sus subsidiarias y afiliadas, y
  cada uno de sus directores, funcionarios, agentes, contratistas, socios y
  empleados, por cualquier pérdida, responsabilidad, reclamo, demanda, daños,
  costos y gastos, incluidos los honorarios de abogados, derivados de cualquier
  disputa con otro usuario del SITIO o cualquier tercero. Esto aplicará también
  para cualquier reclamo o demanda (incluidos los honorarios de abogados y
  cualquier multas, tarifas o sanciones impuestas por cualquier autoridad
  reguladora) que surjan de o estén relacionadas con su incumplimiento de este
  ACUERDO o su violación de cualquier ley, norma o regulación, o los derechos de
  un tercero.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle align=center style='margin-left:30.75pt;
  mso-add-space:auto;text-align:center;text-indent:-30.75pt;mso-list:l17 level1 lfo20'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>15.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>CAPÍTULO QUINCE - GENERALES</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Ley
  aplicable; Lugar y jurisdicción:<b style='mso-bidi-font-weight:normal'> </b>Este
  ACUERDO, el SITIO y/o los SERVICIOS se rigen por las leyes de la República de
  Colombia.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cláusula
  Compromisoria:<b style='mso-bidi-font-weight:normal'> </b>Cualquier diferencia
  entre las partes será resuelta de forma amistosa y directa entre las mismas. En
  caso en que esto no sea posible, se resolverá por un Tribunal Arbitral que
  sesionará en el Centro de Arbitraje y Conciliación de la Cámara de Comercio de
  Bogotá, de acuerdo con el Reglamento de Procedimiento de Arbitraje Nacional del
  Centro de Arbitraje y Conciliación de la Cámara de Comercio de Bogotá.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'>En todo caso, el USUARIO goza y
  es titular de los derechos de consumidor para adelantar las denuncias y/o
  demandas que considere de conformidad con la ley aplicable, <span class=GramE>incluyendo</span>
  pero sin limitarse a los estatutos y normas del consumidor.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Renuncia
  a acciones de grupo:<b style='mso-bidi-font-weight:normal'> </b>Las partes
  expresamente renuncian a iniciar o tomar parte en una acción de grupo o
  colectiva, la cual se encuentra excluida por la cláusula compromisoria. <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Modificaciones:<b
  style='mso-bidi-font-weight:normal'> </b>POKKASH podrá modificar este ACUERDO publicando
  en el SITIO o enviándole por correo electrónico el Acuerdo revisado y/o
  modificado al USUARIO. La última versión del ACUERDO entrará en vigencia desde
  el momento de su publicación. Si el USUARIO no está de acuerdo con la última
  versión del ACUERDO deberá terminar y cesar de forma inmediata el uso de los SERVICIOS
  y cerrar su CUENTA. <b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cesión:<b
  style='mso-bidi-font-weight:normal'> </b>El USUARIO no puede ceder ningún
  derecho ni obligación otorgada bajo este Acuerdo, por lo cual su
  materialización no tendrá efectos jurídicos de pleno derecho y sin necesidad de
  pronunciamiento judicial. POKKASH se reserva el derecho de ceder sus derechos
  sin restricciones ni necesidad de autorización alguna, a cualquier agente. <b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Acuerdo
  completo:<b style='mso-bidi-font-weight:normal'> </b>Este Acuerdo comprende la
  totalidad de las previsiones acordadas entre el USUARIO y POKKASH y reemplaza
  todas las conversaciones, acuerdos y entendimientos anteriores de cualquier
  tipo.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Fuerza
  mayor:<b style='mso-bidi-font-weight:normal'> </b>Las Partes no serán
  responsables de ningún tipo de incumplimiento debido a cualquier acto de
  terceros, acto de autoridades civiles o militares, acto de terroristas,
  disturbios civiles, guerra, huelga u otra disputa laboral, incendio,
  interrupción en servicios de telecomunicaciones o Internet o servicios de
  proveedores de red, fallas de equipo y / o software, otra catástrofe o
  cualquier otro.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.8.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Encabezados:<b
  style='mso-bidi-font-weight:normal'> </b>Los títulos y encabezados de las
  secciones contenidos en este ACUERDO sólo facilitan su referencia, y no se
  considerarán para ningún otro propósito, incluida la interpretación o el
  cumplimiento de este Acuerdo o cualquiera de sus disposiciones.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.9.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Interpretación
  del contrato:<b style='mso-bidi-font-weight:normal'> </b>Los términos no
  exclusivos como &quot;incluyendo&quot;, &quot;como&quot; &quot;por
  ejemplo&quot; y &quot;por ejemplo&quot;, solo enumeran ejemplos y no indican
  una lista exhaustiva de situaciones en las que se aplica una cláusula. Estos
  términos tienen el mismo significado que la frase &quot;incluyendo, sin
  limitación&quot;. Cuando se usa en este Acuerdo, el singular incluirá el plural
  y viceversa, y los pronombres y referencias específicos de género se aplicarán
  a todos los géneros y fideicomisos o entidades, según lo requiera el contexto y
  el significado de este Acuerdo. Cualquier referencia a cualquier estatuto,
  reglamento, norma, ordenanza, ley o documento incluye cualquier enmienda,
  modificación, reemplazo, <span class=SpellE>reexpresión</span> o recodificación
  de los mismos, y todas las subsecciones de la sección o cláusula a la que se
  hace referencia. El USUARIO reconoce que está aceptando este Acuerdo de forma
  libre, informada y voluntaria, y no está obligado por ninguna otra persona, ha
  leído este Acuerdo en su totalidad y lo entiende en su totalidad.<b
  style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.10.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Idioma:<b
  style='mso-bidi-font-weight:normal'> </b>El idioma del presente contrato es el
  español. Cualquier traducción puede no representar con precisión la información
  en el idioma español original. La versión en español prevalecerá en el caso de
  que exista una inconsistencia entre la versión en español y la versión en
  cualquier otro idioma.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.11.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>No
  renuncias: El hecho de que POKKASH no ejerza o haga cumplir algún derecho o
  disposición de este Acuerdo no constituirá una renuncia a dicho derecho o
  disposición en esa o en cualquier otra instancia. Si alguna disposición de este
  ACUERDO se considera inválida, nula, ineficaz, inoponible y/o inexigible, el
  resto de este ACUERDO continuará en pleno vigor y efecto. Si alguna disposición
  de este ACUERDO.<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.12.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Notificaciones:
  POKKASH puede notificar a el USUARIO por medio de un aviso general en el SITIO,
  por correo electrónico a la última dirección de correo electrónico debidamente
  registrada, en la CUENTA, o por comunicación escrita enviada por correo
  certificado a la última dirección registrada. Dicha notificación se considerará
  recibida cuando ocurra la primero entre (a) la publicación en el SITIO, o (b)
  el vencimiento de cuarenta y ocho (48) horas después de ser enviada por correo
  postal, o (c) doce (12) horas después del envío (si se envía por correo
  electrónico).<b style='mso-bidi-font-weight:normal'></b></span></p>
  
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
  justify;line-height:normal'><span lang=ES-CO style='font-family:"Cambria",serif'>POKKASH
  recibirá notificaciones así: </span></p>
  
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
  justify;line-height:normal'><span class=SpellE><span lang=ES-CO
  style='font-family:"Cambria",serif'>Attn</span></span><span lang=ES-CO
  style='font-family:"Cambria",serif'>: POKKASH</span></p>
  
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
  justify;line-height:normal'><span style='font-family:"Cambria",serif;
  mso-ansi-language:EN-US'>C/O: POKKASH</span></p>
  
  <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;text-align:
  justify;line-height:normal'><span style='font-family:"Cambria",serif;
  mso-ansi-language:EN-US'>Email: <span class=MsoHyperlink>pokkash@itrmachines.com</span></span></p>
  
  <p class=MsoListParagraphCxSpFirst style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.13.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Supervivencia:<b
  style='mso-bidi-font-weight:normal'> </b>Las siguientes disposiciones de este
  Acuerdo sobrevivirán a la terminación de su uso o acceso al Sitio y de la
  cesación del uso de los Servicios: las secciones relativas a Indemnización,
  Renuncia de garantías, Limitación de responsabilidad, Renuncia, Ley aplicable,
  Resolución de disputas y disposiciones generales, y cualquier otra disposición
  que por <span class=GramE>su los términos</span> sobreviven a la terminación de
  su uso o acceso al Sitio y/o de la cesación del uso de los Servicios.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l17 level2 lfo20'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>15.14.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Promociones:<b
  style='mso-bidi-font-weight:normal'> </b>Serán a criterio de POKKASH, sin que
  esté obligada a realizarlas. </span></p>
  
  <span lang=ES-CO style='font-size:11.0pt;line-height:107%;font-family:"Cambria",serif;
  mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:
  "Times New Roman";mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;
  mso-fareast-language:EN-US;mso-bidi-language:AR-SA'><br clear=all
  style='mso-special-character:line-break;page-break-before:always'>
  </span>
  
  <p class=MsoNormal><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoNormal align=center style='text-align:center'><a name="_Hlk86313200"><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'>ANEXO
  1: CONSENTIMIENTO PARA ENTREGA Y FIRMAS ELECTRÓNICAS</span></b></a></p>
  
  <span style='mso-bookmark:_Hlk86313200'></span>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpFirst style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level2 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Debido
  a que POKKASH opera solo por Internet, ya sea que el USUARIO elija usar los SERVICIOS
  de <span class=GramE>cualquier&nbsp; manera</span>, es necesario que consienta
  en realizar transacciones comerciales con POKKASH en línea y electrónicamente. POKKASH
  requiere el consentimiento del USUARIO para que le sea proporcionadas ciertas
  divulgaciones electrónicamente, ya sea a través de nuestro SITIO o a la
  dirección de correo electrónico registrada, o a través de cualquier otro
  sistema informático. A través de este ACUERDO, el USUARIO acepta recibir
  electrónicamente todos los documentos, comunicaciones, avisos, contratos y
  acuerdos que surjan o estén relacionados con su uso del SITIO y los SERVICIOS.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level2 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO declara y garantiza que este ACUERDO es legalmente vinculante y que han
  acordado suscribir el presente ACUERDO y demás actos que se deriven del mismo
  así como cualquier acto y/o Servicios y bajo el Sitio a través de medios
  electrónicos y firma electrónica, renunciando expresamente a repudiarlo o
  desconocer su validez y/o contenido por el solo hecho de usarse mensajes de
  datos, de conformidad con la Ley 527 de 1999 y sus decretos reglamentarios o
  las normas que lo modifiquen o deroguen.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level2 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO declara y garantiza que los registros de los mensajes de intercambio
  electrónico de datos que se hayan utilizado y se utilicen con POKKASH serán
  admisibles ante cualquier autoridad sea jurisdiccional, administrativa o de
  cualquier índole como ante cualquier persona, y constituirán plena prueba de
  los hechos que en ellos figuran, salvo que se aporte prueba en contrario.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level2 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.4.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO reconoce y acepta que las firmas usadas en el ACUERDO y respecto de
  cualquier acto y/o SERVICIOS y bajo el SITIO son confiables, integras y
  vinculantes para obligarlo legal y contractualmente en relación con su
  contenido y tienen la misma validez y los mismos efectos jurídicos de la firma
  manuscrita, y, que, de conformidad con la Ley 527 de 1.999 y sus decretos reglamentarios,
  así como las normas que lo modifiquen o deroguen. Los USUARIOS como firmantes
  se obligan a: </span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level3 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.4.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Mantener
  el control y custodia exclusiva sobre los datos de creación de la firma, </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level3 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.4.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Garantizar
  que los datos de creación de la firma no sean utilizados de forma indebida o no
  autorizada y </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level3 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.4.3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Dar
  aviso inmediato a POKKASH sobre cualquier evento que den lugar a que los datos
  de creación de la firma sean cuestionados, repudiados y/o queden en entredicho,
  amenazando la confiabilidad e integridad de los mismo.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level2 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.5.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Comunicaciones:
  Al aceptar este ACUERDO, el USUARIO acepta expresamente ser contactado por POKKASH,
  sus agentes, representantes, administradores, afiliados o cualquier persona que
  se comunique en su nombre para cualquier propósito, en cualquier número de
  teléfono o dirección física o electrónica que proporcione o en la que pueda ser
  contactado. El USUARIO acepta que POKKASH puede comunicarse con aquél de
  cualquier manera, <span class=GramE>incluidos</span> pero sin limitarse a los
  mensajes SMS (incluidos los mensajes de texto), mensajes de Whatsapp o a través
  de cualquier otra red social, las llamadas con mensajes pregrabados o voz
  artificial, y las llamadas y mensajes entregados mediante el sistema de
  marcación telefónica automática o un sistema de mensajes de texto automático.
  Si el USUARIO requiere copia física de cualquier acuerdo o divulgación, puede
  iniciar sesión en su CUENTA e imprimir los documentos deseados.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level2 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.6.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Alcance
  del consentimiento: El consentimiento otorgado por el USUARIO incluye recibir
  información y divulgaciones y realizar transacciones comerciales
  electrónicamente, y nuestro acuerdo para hacerlo, se aplica a cualquier
  transacción relacionada con dichas divulgaciones y/o información, ya sea entre
  usted y POKKASH o un tercero por y a través de los Servicios. Su consentimiento
  permanecerá vigente mientras sea usuario y, si ya no lo es, continuará hasta el
  momento en que todas las divulgaciones y/o informaciones relevantes a los SERVICIOS
  recibidos a través del SITIO.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level2 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.7.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>El
  USUARIO puede retirar su consentimiento para recibir acuerdos o divulgaciones
  electrónicamente comunicándose con POKKASH al correo electrónico: <span
  class=MsoHyperlink>pokkash@itrmachines.com</span> o a las direcciones de notificación
  incluidas en el ACUERDO. Sin embargo, una vez que haya retirado su
  consentimiento, el USUARIO no podrá publicar solicitudes en el SITIO.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpLast style='text-align:justify;text-indent:-36.0pt;
  mso-list:l6 level2 lfo21'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.8.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cambio
  en su información de contacto: El USUARIO debe informar a POKKASH sobre
  cualquier cambio en sus datos de contacto para que pueda continuar recibiendo
  todos elementos propios de comunicación. La actualización de datos debe
  realizarse al correo electrónico los acuerdos, información y divulgaciones de
  manera oportuna. Si su dirección de correo electrónico <span
  class=MsoHyperlink>pokkash@itrmachines.com</span>.</span></p>
  
  <span lang=ES-CO style='font-size:11.0pt;line-height:107%;font-family:"Cambria",serif;
  mso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:
  "Times New Roman";mso-bidi-theme-font:minor-bidi;mso-ansi-language:ES-CO;
  mso-fareast-language:EN-US;mso-bidi-language:AR-SA'><br clear=all
  style='mso-special-character:line-break;page-break-before:always'>
  </span>
  
  <p class=MsoNormal><span lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoNormal align=center style='text-align:center'><a name="_Hlk86313185"><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif'>ANEXO
  2: POLÍTICA DE USO PROHIBIDO, NEGOCIOS PROHIBIDOS Y USO CONDICIONADO</span></b></a></p>
  
  <span style='mso-bookmark:_Hlk86313185'></span>
  
  <p class=MsoListParagraphCxSpFirst align=center style='text-align:center;
  text-indent:-36.0pt;mso-list:l12 level2 lfo22'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Título Primero – Usos y Negocios
  Prohibidos del SITIO y/o la CUENTA</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l12 level3 lfo22'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.1.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>A
  través de la aceptación del ACUERDO, El USUARIO acepta que no puede utilizar el
  SITIO ni las cuentas para las actividades o negocios incluidos en el presente
  título, las cuales se otorgan de manera expresa y no enunciativa. Si el USUARIO
  tiene dudas sobre actividades específicas acá expuestas o adicionales, se podrá
  contactar al correo electrónico <span class=MsoHyperlink>pokkash@itrmachines.com</span>.
  </span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Actividad
  abusiva: acciones que imponen una carga irrazonable o desproporcionadamente
  grande a la infraestructura de POKKASH, o interfieren, interceptan o expropian
  perjudicialmente cualquier sistema, datos o información; transmitir o cargar
  cualquier material en el SITIO que contenga virus, troyanos, gusanos o
  cualquier otro programa dañino o perjudicial; intentar obtener acceso no
  autorizado al SITIO, a otras Cuentas, sistemas informáticos o redes conectadas
  al Sitio, a través de la extracción de contraseñas o cualquier otro medio; usar
  la información de la Cuenta de otra persona para acceder o usar el SITIO,
  excepto en el caso de comerciantes específicos y/o aplicaciones que estén
  específicamente autorizadas por un usuario para acceder a la información y la CUENTA
  de dicho usuario; o transferir el acceso o los derechos de su CUENTA a un
  tercero, a menos que sea por ley o con el permiso expreso de POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Abusar
  de otros usuarios: interferir con el acceso o uso de cualquier persona o
  entidad de cualquier SERVICIO del SITIO; difamar, abusar, extorsionar, acosar,
  acechar, amenazar o de otra manera violar o infringir los derechos legales
  (tales como, entre otros, los derechos de privacidad, publicidad y propiedad
  intelectual) de otros; incitar, amenazar, facilitar, promover o alentar el
  odio, la intolerancia racial o los actos violentos contra otros; recolectar o
  de otro modo recopilar información del SITIO sobre otros, incluidas pero sin
  limitarse a, direcciones de correo electrónico, sin el debido consentimiento.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Fraude:
  actividades para defraudar a POKKASH, los usuarios de POKKASH o cualquier otra
  persona; proporcionar información falsa, inexacta o engañosa a POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Juegos
  de azar: loterías; subastas de tarifas de licitación; pronósticos deportivos o
  cuotas; ligas deportivas de fantasía con premios en efectivo o cualquier tipo;
  juegos de internet; concursos lotería de carreras; y/o juegos de azar y/o
  apuestas en general.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.5.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Infracción
  de la propiedad intelectual: participar en transacciones que involucren bienes
  que infrinjan o violen cualquier derecho de autor, marca, derecho de publicidad
  o privacidad o cualquier otro derecho de propiedad legal según la ley,
  incluidas pero no limitadas a, ventas, distribución o acceso a música,
  películas falsificadas, software u otros materiales con licencia sin la
  autorización apropiada del titular de los derechos; uso de la propiedad
  intelectual, nombre o figuras de POKKASH, incluido el uso de las marcas
  comerciales o de servicio de POKKASH, sin el consentimiento expreso de POKKASH
  o de una manera que perjudique a POKKASH o la marca POKKASH; Cualquier acción
  que implique una aprobación o afiliación falsa de POKKASH.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.6.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Actividad
  ilegal: actividad que violaría o ayudaría en la violación de cualquier ley,
  estatuto, ordenanza o regulación, norma en los países donde POKKASH o POKKASH
  realizan negocios, <span class=GramE>incluidos</span> pero no limitados a, el
  Departamento del Tesoro de los EE. UU. Oficina de Control de Activos
  Extranjeros (&quot;OFAC&quot;), SAGRILAFT, o que involucraría el producto de
  cualquier actividad ilegal; publicar, distribuir o difundir cualquier material
  o información ilegal.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.7.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Contenido
  y servicios para adultos: pornografía y otros materiales obscenos (incluyendo
  literatura, imágenes y otros medios); sitios que ofrecen servicios relacionados
  con la sexualidad, como prostitución, acompañantes, pago por evento, funciones
  de chat en vivo para adultos.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.8.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Productos
  falsificados o no autorizados: venta o reventa no autorizadas de productos o
  servicios de marca o diseñador; venta de bienes o servicios que se importan o
  exportan ilegalmente o que son robados.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.9.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Drogas
  y bienes asociados: venta de narcóticos, sustancias controladas y cualquier
  equipo diseñado para fabricar o usar drogas, como bongs, vaporizadores y narguiles.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.10.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Negocios
  de alto riesgo: cualquier negocio que creemos plantea un riesgo financiero
  elevado, responsabilidad legal o viola la red de tarjetas o las políticas
  bancarias.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.11.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Infracción
  de propiedad intelectual o derechos de propiedad: venta, distribución o acceso
  a música, películas, software u otros materiales con licencia falsificados sin
  la autorización adecuada del titular de los derechos.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.12.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Servicios
  de inversión y crédito: corredores de valores; consultoría hipotecaria o
  servicios de reducción de deuda; asesoramiento o reparación de crédito;
  oportunidades inmobiliarias; esquemas de inversión.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.13.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Marketing
  multinivel: esquemas piramidales, mercadeo en red y programas de marketing de
  referencia.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.14.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span class=SpellE><span lang=ES-CO
  style='font-family:"Cambria",serif'>Pseudo</span></span><span lang=ES-CO
  style='font-family:"Cambria",serif'>-productos farmacéuticos: productos
  farmacéuticos y otros productos que hacen declaraciones de propiedades
  saludables que no han sido aprobadas o verificadas por el organismo regulador
  local y / o nacional aplicable.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.15.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Productos
  y servicios regulados: dispensarios de marihuana y negocios relacionados; venta
  de tabaco, cigarrillos electrónicos y líquidos electrónicos; prescripción en
  línea o servicios farmacéuticos; bienes o servicios restringidos por edad;
  armas y municiones; pólvora y otros explosivos; fuegos artificiales y productos
  relacionados; materiales tóxicos, inflamables y radioactivos; productos y
  servicios con diferente estatus o regulación legal.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.16.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Servicios
  financieros restringidos: cambio de cheques, títulos valores, fianzas y
  agencias de cobranza.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.17.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Sustancias
  diseñadas para imitar las drogas ilegales: venta de una sustancia legal que
  proporciona el mismo efecto que una droga ilegal (por ejemplo, salvia, <span
  class=SpellE>kratom</span>).</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.18.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Prácticas
  injustas, depredadoras o engañosas: oportunidades de inversión u otros
  servicios que prometen grandes recompensas; venta o reventa de un servicio sin
  beneficio adicional para el comprador; reventa de ofertas gubernamentales sin
  autorización o valor agregado; sitios que, a nuestro exclusivo criterio,
  determinamos que son injustos, engañosos o depredadores hacia los consumidores.</span></p>
  
  <p class=MsoListParagraphCxSpLast style='margin-left:54.0pt;mso-add-space:auto;
  text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.1.1.19.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Cualquier
  actividad con objeto y/o causa ilícita. </span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'>Estos Usos Prohibidos comprenden la venta,
  comercialización, distribución y en general cualquier acto y/o negocio jurídico
  o instrumento que se utilice con los mismos fines.</span></p>
  
  <p class=MsoListParagraphCxSpFirst align=center style='text-align:center;
  text-indent:-36.0pt;mso-list:l12 level2 lfo22'><b
  style='mso-bidi-font-weight:normal'><span lang=ES-CO style='font-family:"Cambria",serif;
  mso-fareast-font-family:Cambria;mso-bidi-font-family:Cambria'><span
  style='mso-list:Ignore'>1.2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span></b><b style='mso-bidi-font-weight:normal'><span
  lang=ES-CO style='font-family:"Cambria",serif'>Título Segundo – Usos
  Condicionales</span></b></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify'><span
  lang=ES-CO style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='text-align:justify;text-indent:-36.0pt;
  mso-list:l12 level3 lfo22'><span lang=ES-CO
  style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;mso-bidi-font-family:
  Cambria'><span style='mso-list:Ignore'>1.2.1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Los
  usos establecidos en esta sección deberán obtener autorización previa y por
  escrito de POKKASH, consentimiento que se puede solicitar a través del correo
  electrónico <span class=MsoHyperlink>pokkash@itrmachines.com</span></span><span
  class=MsoHyperlink><span lang=ES-CO>. </span></span><span lang=ES-CO
  style='font-family:"Cambria",serif'>POKKASH puede exigirle al USUARIO que para
  el efecto de <span class=GramE>autorización, <span
  style='mso-spacerun:yes'></span>acepte</span> condiciones adicionales, haga
  representaciones y garantías suplementarias, complete&nbsp; procedimientos
  adicionales y opere sujeto a restricciones si utiliza los SERVICIOS en relación
  con cualquiera de los siguientes negocios, actividades o prácticas:</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.2.1.1.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Servicios
  de dinero: transmisores de dinero, transmisores de activos digitales; cambio de
  moneda o activos digitales o distribuidores; tarjetas de regalo; tarjetas
  prepagadas; venta de moneda en el juego a menos que el comerciante sea el operador
  del mundo virtual; actuar como intermediario o agregador de pagos o revender
  cualquiera de los Servicios.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.2.1.2.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Juegos
  de habilidad: juegos que no se definen como juegos de apuestas según este
  Acuerdo o por ley, pero que requieren una tarifa de entrada y otorgan un
  premio.</span></p>
  
  <p class=MsoListParagraphCxSpMiddle style='margin-left:54.0pt;mso-add-space:
  auto;text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.2.1.3.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Caridades:
  aceptación de donaciones para entidades sin fines de lucro.</span></p>
  
  <p class=MsoListParagraphCxSpLast style='margin-left:54.0pt;mso-add-space:auto;
  text-align:justify;text-indent:-54.0pt;mso-list:l12 level4 lfo22'><span
  lang=ES-CO style='font-family:"Cambria",serif;mso-fareast-font-family:Cambria;
  mso-bidi-font-family:Cambria'><span style='mso-list:Ignore'>1.2.1.4.<span
  style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span></span></span><span lang=ES-CO style='font-family:"Cambria",serif'>Organizaciones
  religiosas / espirituales: Operación de una organización religiosa o espiritual
  con fines de lucro.</span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>
  
  <p class=MsoNormal style='text-align:justify'><span lang=ES-CO
  style='font-family:"Cambria",serif'></span></p>`;

  constructor(
    private storage: StorageService,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) { }

  content: any = "Noticias";

  ngOnInit() { }

  async showTerms() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        title: 'Términos y condiciones',
        content: this.terms,
        btnLabel: 'Entendido',
      },
    });
    await modal.present();
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      componentProps: {
        icon: 'assets/images/pup_land/Log_out.svg',
        title: 'Cerra sesión',
        content: '¿Seguro que quiere cerrar sesión?',
        btnCallback: () => {
          this.logOutEvent.emit();
          this.storage.removeAll();
          this.navCtrl.navigateForward('');
        },
        btnLabelA: 'Si',
        btnLabel: 'No',
      },
    });
    return await modal.present();
  }

  async logOut() {
    this.logOutEvent.emit();
    await this.storage.removeAll();
    this.navCtrl.navigateForward('');
    // setTimeout(() => {
    //   let intercome: any = document.getElementsByClassName(
    //     'intercom-lightweight-app'
    //   )['0'];
    //   intercome.style.setProperty('display', 'none', 'important');
    // }, 300);
  }


  close() {
    this.closeEvent.emit();
  }
}
