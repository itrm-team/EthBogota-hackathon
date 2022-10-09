const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const userController = require("../controller/user_controller");
const { Users, Sequelize } = require("./../models");
const { UserRefreshClient } = require("google-auth-library");
const { createToken } = require("../controller/user_controller");
const emailTemplates = getEmailTemplates();
const axios = require("axios");
require("dotenv").config();

const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET);
OAuth2_client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

function sendMail(type, payload, recipient) {
	return new Promise((resolve, reject) => {
		const accessToken = OAuth2_client.getAccessToken();
		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: process.env.EMAIL_ACCOUNT,
				clientId: process.env.GMAIL_CLIENT_ID,
				clientSecret: process.env.GMAIL_CLIENT_SECRET,
				refreshToken: process.env.GMAIL_REFRESH_TOKEN,
				accessToken: accessToken,
			},
		});

		const mail_options = getEmailOptions(type, payload, recipient);
		transport.sendMail(mail_options, function (error, result) {
			if (error) {
				console.error("Error: ", error);
				resolve(false);
			} else {
				console.log("Success: ", result);
				resolve(true);
			}
			transport.close();
		});
	});
}

function getEmailOptions(type, payload, recipient) {
	const mail_options = {
		from: `Support VIIO. -no responder- <${process.env.EMAIL_ACCOUNT}>`,
		to: recipient,
		subject: getSubjectFromType(type),
		html: getHtmlMessage(type, payload),
	};

	return mail_options;
}

function getSubjectFromType(type) {
	/* Asuntos de correos electrónicos */
	let subject = {
		welcomeVIIO: "Bienvenido a VIIO",
		confirmationCode: "Código de verificación VIIO",
		recoverPassword: "Recuperación de contraseña",
		basicRegistration: "Registro exitoso en VIIO",
		depositConfirmation: "Deposito confirmado",
		withdrawalConfirmation: "Retiro confirmado",
		verifyEmail: "Verifica tu correo para unirte a la lista de espera",
		WelcomeCampaingEmail: "Bienvenido a la lista de espera",
    referrerEmail:"Tus amigos también están Viio"
	};
	return subject[type];
}

function getHtmlMessage(type, payload) {
	//buscar plantilla de recuperación de correo
	let html = {
		confirmationCode: emailTemplates.confirmationEmail,
		basicRegistration: emailTemplates.basicRegistration,
		depositConfirmation: emailTemplates.depositConfirmation,
		withdrawalConfirmation: emailTemplates.withdrawalConfirmation,
		recoverPassword: emailTemplates.recoverPassword,
		welcomeVIIO: emailTemplates.welcomeVIIO,
		verifyEmail: emailTemplates.verifyEmail,
		WelcomeCampaingEmail: emailTemplates.WelcomeCampaingEmail,
    referrerEmail:emailTemplates.referrerEmail
	};
	return html[type](payload);
}

async function checkReferrals(req) {
	if (req) {
		let body = {
			apiToken: "PkTenRWO0eWMkbeDCtxL1q26xCQ",
			participants: [{ email: req }],
		};
		try {
			response = await axios.get(
				`
                https://app.viral-loops.com/api/v2/participant_data`,
				{ params: body }
			);
		} catch (error) {
			console.error(error);
		}
		console.error(">>response:", response.data);
		return response;
	}
	return 0;
}

exports.functions = {
	recoverPassword: async (req, res) => {
		if (req.body.email) {
			let user = await Users.findOne({ where: { email: req.body.email } });
			if (!user) return res.status(201).json({ 
                icon: "Invalid_access",
                title: "Acceso inválido",
                content: "El usuario no se encuentra registrado. Realiza el registro para acceder a billetera DeFi de latinoamérica. Toma menos de 5 minutos. "});
			const token = await createToken(user.dataValues);
			const url = `${process.env.URL_CALLBACK}/recuperar-contrasena?token=`;
			payload = url + token;
			let emailStatus = await sendMail("recoverPassword", payload, req.body.email);
			if (emailStatus) {
				return res.status(200).json({ 
                    icon: "Email_1",
                    title: "Se enviará un link de recuperación a tu correo", 
                    content: "Al dar aceptar, enviaremos un link de recuperación a tu correo. Ten a la mano las preguntas de seguridad que fijaste al momento de crear la cuenta. " });
			} else {
				return res.status(400).json({ msg: "couldn't send email" });
			}
		}
		return res.status(400).json({ msg: "couldn't send email" });
	},

	welcomeVIIO: async (req, res) => {
		if (req.body.email) {
			let emailStatus = await sendMail("welcomeVIIO", req.body.payload, req.body.email);
			if (emailStatus) {
				return res.status(200).json({ msg: "email send successfully" });
			} else {
				return res.status(400).json({ msg: "couldn't send email" });
			}
		}
		return res.status(400).json({ msg: "couldn't send email" });
	},

	verifyEmailForCampaing: async (req, res) => {
		try {
			if (req.body.email) {
				let emailStatus = await sendMail("verifyEmail", req.body, req.body.email);
				if (emailStatus) {
					return res.status(200).json({ msg: "email send successfully" });
				} else {
					return res.status(400).json({ msg: "couldn't send email" });
				}
			}
			return res.status(400).json({ msg: "couldn't send email" });
		} catch (error) {
			return res.status(400).json({ msg: error.message });
		}
	},

	sendEmailForReferrer: async (body) => {
		try {
			if (body.email) {
				await sendMail("referrerEmail", body, body.email);
        return 
			}
      return 
		} catch (error) {
      console.error(error)
			return 
		}
	},

	addUserForCampaing: async (req, res) => {
		try {
			if (req.body.email) {
				let body = {
					apiToken: "PkTenRWO0eWMkbeDCtxL1q26xCQ",
					params: {
						event: "registration",
						user: {
							email: req.body.email,
						},
						referrer: { referralCode: req.body.referralCode },
						refSource: "email",
					},
				};
				let data = JSON.stringify({
					apiToken: "PkTenRWO0eWMkbeDCtxL1q26xCQ",
					participants: [{ email: req.body.email }],
				});
				let config = {
					method: "get",
					url: "https://app.viral-loops.com/api/v2/participant_data",
					headers: {
						"Content-Type": "application/json",
					},
					data: data,
				};
				response = await axios.post(`https://app.viral-loops.com/api/v2/events`, body);
				if (response.data.isNew == true) {
					//send email
					await sendMail("WelcomeCampaingEmail", req.body, req.body.email);
				}
				responseFromReferrals = await axios(config);
				return res.status(200).json({
					msg: response.data,
					referals: responseFromReferrals.data.data[0].counters.referrals.total,
					referalCode: responseFromReferrals.data.data[0].user.referralCode,
				});
			}
			return res.status(400).json({ msg: "no email" });
		} catch (error) {
			return res.status(400).json({ msg: error.message });
		}
	},

	confirmationCode: async (req, res) => {
		let code;
		if (req.body.email) {
			code = await userController.updateVerificationCode(req.body.email);
			code = code ? code : Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
			if (!code) return res.status(400).json({ msg: "couldn't send email" });
			let emailStatus = await sendMail("confirmationCode", { code }, req.body.email);
			if (emailStatus) {
				return res.status(200).json({ msg: "email send successfully", code });
			} else {
				return res.status(400).json({ msg: "couldn't send email" });
			}
		}
		return res.status(400).json({ msg: "couldn't send email" });
	},

	confirmationDeposit: async (req, res) => {
		if (req.body.email) {
			let emailStatus = await sendMail("depositConfirmation", req.body.payload, req.body.email);
			if (emailStatus) {
				return res.status(200).json({ msg: "email send successfully" });
			} else {
				return res.status(400).json({ msg: "couldn't send email" });
			}
		}
		return res.status(400).json({ msg: "couldn't send email" });
	},

	confirmationWithdrawal: async (req, res) => {
		if (req.body.email) {
			let emailStatus = await sendMail("withdrawalConfirmation", req.body.payload, req.body.email);
			if (emailStatus) {
				return res.status(200).json({ msg: "email send successfully" });
			} else {
				return res.status(400).json({ msg: "couldn't send email" });
			}
		}
		return res.status(400).json({ msg: "couldn't send email" });
	},
};

function getEmailTemplates() {
	return {
		confirmationEmail: function (payload) {
			return `
            <div class=""><div class="aHl"></div><div id=":2t" tabindex="-1"></div><div id=":2i" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":2h" class="a3s aiL msg8931798965495087677"><u></u>
            <div style="background-color:#f9f9f9" bgcolor="#f9f9f9">
            <div style="color:transparent;opacity:0;font-size:0px;border:0;max-height:1px;width:1px;margin:0px;padding:0px;border-width:0px!important;display:none!important;line-height:0px!important"><img border="0" width="1" height="1" src="https://ci6.googleusercontent.com/proxy/vYebfLYq1SlxGj79lSy2KOextx_Ez2FhBmYX7MaqXjsrbQWknDDFjTOcAO9cZWBbVv6KENyqciEDK_vLbqtCQfkkNWBCgMCSGfTihOZ6pc5oZiSW17vCgB4VqageLi8cuqTROaxGIbnwSl2Mlp-DUbRYBbkiWbmLZxMF2EOC3SSOWMorAKucnhNCs-jeEoKa7bq3TuMxPztZKOI5cBTFBpxMh5QHKXZSurN4pqg=s0-d-e1-ft#https://littio.intercom-mail.com/q/VzO5aTCZYpgXxNaffkK3iw~~/AAAAAQA~/RgRkOE5SPVcIaW50ZXJjb21CCmJLUslVYioy7T9SGXJvY2hhY3NlYmFzdGlhbkBnbWFpbC5jb21YBAAExtE~" alt="" class="CToWUd"></div>
            
            
            
            <font color="#888888">
                        </font><font color="#888888">
            </font><table cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;line-height:100%!important;margin:0;padding:0;width:100%!important">
              <tbody>
            <tr>
                <td>
                
                  <font color="#888888">
            </font><font color="#888888">
                            </font><font color="#888888">
            </font><table style="border-collapse:collapse;margin:auto;max-width:635px;min-width:320px;width:100%" class="m_8931798965495087677main-wrap">
                    <tbody>
            <tr>
                      <td valign="top">
                        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;color:#c0c0c0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:26px;margin:0 auto 26px;width:100%">
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" class="m_8931798965495087677main_wrapper" style="padding:0 20px">
            
                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="background-clip:padding-box;border-collapse:collapse;border-radius:3px;color:#545454;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:20px;margin:0 auto 10px;width:100%">
                          <tbody>
            <tr>
                            <td valign="top">
                              <table cellpadding="0" cellspacing="0" border="0" class="m_8931798965495087677comment_body" style="background-clip:padding-box;border-bottom-style:none;border-collapse:collapse;width:100%">
                                <tbody>
            <tr>
                                  <td class="m_8931798965495087677content-td" style="background-clip:padding-box;background-color:white;border-radius:0 0 3px 3px;color:#525252;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:22px;overflow:hidden;padding:40px 40px 30px" bgcolor="white">
                                    
            
                                    
                                      <div style="margin:0;padding:0;background-color:#ffffff"><div style="display:none;max-height:0px;overflow:hidden">Get DeFi and Metaverse access in a few taps.</div><div style="display:none;max-height:0px;overflow:hidden">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
                
                <table style="table-layout:fixed;vertical-align:top;min-width:320px;border-spacing:0;border-collapse:collapse;background-color:#ffffff;width:100%" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#ffffff" valign="top">
                    <tbody>
                        <tr style="vertical-align:top" valign="top">
                            <td style="word-break:break-word;vertical-align:top" valign="top">
                                
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:10px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        <div class="m_6672540726590903157img-container" align="left" style="padding-right:0px;padding-left:0px">
                                                            
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img border="0" src="https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA" alt="VIIO" title="VIIO" style="text-decoration:none;height:auto;border:0;width:140px;max-width:100%;display:block" width="106" class="CToWUd"></a>
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:0px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        
                                                        <h1
                                                            style="line-height:100%">
                                                            Código de registro
                                                        </h1>


                                                        <br>
                                                        <b>¡Buen día!</b>
                                                        Este es tu código de VIIO:
                                                        ${payload.code}
                                                        <br>
                                                        Si
                                                        no
                                                        ha
                                                        solicitado
                                                        un código para registro,
                                                        ignore
                                                        y
                                                        elimine
                                                        este
                                                        mensaje.
                                                        <br><br><br><br><br>
                                                        
                                                        <div style="color:#333332;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:15px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#333332">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><strong><span style="font-size:24px">Necesitas ayuda con algo?</span></strong></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                        <div style="color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;font-size:18px;margin-top:0;margin-bottom:0"><span style="font-size:18px">No te preocupes, tenemos la respuesta! <br> Escríbenos un email a <a href="mailto:viio@itrmachines.com" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" >viio@itrmachines.com</a> y el equipo de VIIO te ayudará.<br> También puedes unirte a nuestro <a href="https://instagram.com/viio.me?igshid=YmMyMTA2M2Y=" rel="noopener" style="text-decoration:none;color:#0092ff" target="_blank" >Instagram</a>.<br> Encuentranos en Twitter en <a href="https://twitter.com/VIIO_ME?t=5LYAHNhSWyxZXY3CENMf0g&s=08" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" >@VIIO_ME</a><br><br></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:5px;padding-bottom:5px;padding-right:15px;padding-left:15px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:0px;padding-bottom:10px;padding-left:0px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:1px solid #cdcdcd;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                            <tbody><tr style="vertical-align:top" valign="top">
                                                                <td style="word-break:break-word;vertical-align:top;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" role="presentation" align="left" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                                        <tbody><tr style="vertical-align:top" valign="top">
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Twitter" src="https://ci5.googleusercontent.com/proxy/zFo3V8wu2ymA0nii8X2siWaFrJ_Jzh-84zVFjE7kpe69f6zlf9eJI078HlSkpVvqDI4d2IpIMXqdHS_krZeShlzZ_IiPYsMPM72yml57Equ_ND1xOHExWrH1SxZe=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-94825/twitter.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Instagram" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Feather-logos-instagram.svg/24px-Feather-logos-instagram.svg.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                        
                                                        <div style="color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:10px;padding-right:0px;padding-bottom:10px;padding-left:0px">
                                                            <div style="font-size:12px;line-height:1.5;color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <div style="font-size:14px;line-height:1.5;text-align:center">
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span><span class="il">VIIO</span></span><br><span>Bogotá D.C., Colombia</span><br><br></p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><a style="text-decoration:none;color:#0092ff" href="" rel="noopener" target="_blank" data-saferedirecturl="">Desuscribirse</a>&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">Este mensaje es únicamente de carácter informativo. Esta comunicación no es asesoría financiera.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:20px;padding-bottom:20px;padding-right:0px;padding-left:0px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:0px solid #bbbbbb;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
                    `;
		},
		recoverPassword: function (payload) {
			return `
            <div class=""><div class="aHl"></div><div id=":2t" tabindex="-1"></div><div id=":2i" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":2h" class="a3s aiL msg8931798965495087677"><u></u>
            <div style="background-color:#f9f9f9" bgcolor="#f9f9f9">
            <div style="color:transparent;opacity:0;font-size:0px;border:0;max-height:1px;width:1px;margin:0px;padding:0px;border-width:0px!important;display:none!important;line-height:0px!important"><img border="0" width="1" height="1" src="https://ci6.googleusercontent.com/proxy/vYebfLYq1SlxGj79lSy2KOextx_Ez2FhBmYX7MaqXjsrbQWknDDFjTOcAO9cZWBbVv6KENyqciEDK_vLbqtCQfkkNWBCgMCSGfTihOZ6pc5oZiSW17vCgB4VqageLi8cuqTROaxGIbnwSl2Mlp-DUbRYBbkiWbmLZxMF2EOC3SSOWMorAKucnhNCs-jeEoKa7bq3TuMxPztZKOI5cBTFBpxMh5QHKXZSurN4pqg=s0-d-e1-ft#https://littio.intercom-mail.com/q/VzO5aTCZYpgXxNaffkK3iw~~/AAAAAQA~/RgRkOE5SPVcIaW50ZXJjb21CCmJLUslVYioy7T9SGXJvY2hhY3NlYmFzdGlhbkBnbWFpbC5jb21YBAAExtE~" alt="" class="CToWUd"></div>
            
            
            
            <font color="#888888">
                        </font><font color="#888888">
            </font><table cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;line-height:100%!important;margin:0;padding:0;width:100%!important">
              <tbody>
            <tr>
                <td>
                
                  <font color="#888888">
            </font><font color="#888888">
                            </font><font color="#888888">
            </font><table style="border-collapse:collapse;margin:auto;max-width:635px;min-width:320px;width:100%" class="m_8931798965495087677main-wrap">
                    <tbody>
            <tr>
                      <td valign="top">
                        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;color:#c0c0c0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:26px;margin:0 auto 26px;width:100%">
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" class="m_8931798965495087677main_wrapper" style="padding:0 20px">
            
                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="background-clip:padding-box;border-collapse:collapse;border-radius:3px;color:#545454;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:20px;margin:0 auto 10px;width:100%">
                          <tbody>
            <tr>
                            <td valign="top">
                              <table cellpadding="0" cellspacing="0" border="0" class="m_8931798965495087677comment_body" style="background-clip:padding-box;border-bottom-style:none;border-collapse:collapse;width:100%">
                                <tbody>
            <tr>
                                  <td class="m_8931798965495087677content-td" style="background-clip:padding-box;background-color:white;border-radius:0 0 3px 3px;color:#525252;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:22px;overflow:hidden;padding:40px 40px 30px" bgcolor="white">
                                    
            
                                    
                                      <div style="margin:0;padding:0;background-color:#ffffff"><div style="display:none;max-height:0px;overflow:hidden">Get DeFi and Metaverse access in a few taps.</div><div style="display:none;max-height:0px;overflow:hidden">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
                
                <table style="table-layout:fixed;vertical-align:top;min-width:320px;border-spacing:0;border-collapse:collapse;background-color:#ffffff;width:100%" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#ffffff" valign="top">
                    <tbody>
                        <tr style="vertical-align:top" valign="top">
                            <td style="word-break:break-word;vertical-align:top" valign="top">
                                
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:10px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        <div class="m_6672540726590903157img-container" align="left" style="padding-right:0px;padding-left:0px">
                                                            
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img border="0" src="https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA" alt="VIIO" title="VIIO" style="text-decoration:none;height:auto;border:0;width:140px;max-width:100%;display:block" width="106" class="CToWUd"></a>
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:0px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        
                                                        <h1
                                                            style="line-height:100%">
                                                            Recuperar
                                                            Contraseña
                                                        </h1>


                                                        <br>
                                                        Le
                                                        enviamos
                                                        este
                                                        mensaje
                                                        debido
                                                        a
                                                        que
                                                        hemos
                                                        recibido
                                                        una
                                                        solicitud
                                                        para
                                                        recuperar
                                                        su
                                                        clave,
                                                        acceda
                                                        al
                                                        siguiente
                                                        enlace:
                                                        <a
                                                            href="${payload}">link</a>
                                                        <br>
                                                        Si
                                                        no
                                                        ha
                                                        solicitado
                                                        el
                                                        restablecimiento
                                                        de
                                                        su
                                                        clave,
                                                        ignore
                                                        y
                                                        elimine
                                                        este
                                                        mensaje.
                                                        <br><br><br><br><br>
                                                        
                                                        <div style="color:#333332;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:15px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#333332">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><strong><span style="font-size:24px">Necesitas ayuda con algo?</span></strong></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                        <div style="color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;font-size:18px;margin-top:0;margin-bottom:0"><span style="font-size:18px">No te preocupes, tenemos la respuesta! <br> Escríbenos un email a <a href="mailto:viio@itrmachines.com" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" >viio@itrmachines.com</a> y el equipo de VIIO te ayudará.<br> También puedes unirte a nuestro <a href="https://instagram.com/viio.me?igshid=YmMyMTA2M2Y=" rel="noopener" style="text-decoration:none;color:#0092ff" target="_blank" >Instagram</a>.<br> Encuentranos en Twitter en <a href="https://twitter.com/VIIO_ME?t=5LYAHNhSWyxZXY3CENMf0g&s=08" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" >@VIIO_ME</a><br><br></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:5px;padding-bottom:5px;padding-right:15px;padding-left:15px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:0px;padding-bottom:10px;padding-left:0px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:1px solid #cdcdcd;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                            <tbody><tr style="vertical-align:top" valign="top">
                                                                <td style="word-break:break-word;vertical-align:top;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" role="presentation" align="left" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                                        <tbody><tr style="vertical-align:top" valign="top">
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Twitter" src="https://ci5.googleusercontent.com/proxy/zFo3V8wu2ymA0nii8X2siWaFrJ_Jzh-84zVFjE7kpe69f6zlf9eJI078HlSkpVvqDI4d2IpIMXqdHS_krZeShlzZ_IiPYsMPM72yml57Equ_ND1xOHExWrH1SxZe=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-94825/twitter.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Instagram" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Feather-logos-instagram.svg/24px-Feather-logos-instagram.svg.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                        
                                                        <div style="color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:10px;padding-right:0px;padding-bottom:10px;padding-left:0px">
                                                            <div style="font-size:12px;line-height:1.5;color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <div style="font-size:14px;line-height:1.5;text-align:center">
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span><span class="il">VIIO</span></span><br><span>Bogotá D.C., Colombia</span><br><br></p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><a style="text-decoration:none;color:#0092ff" href="" rel="noopener" target="_blank" data-saferedirecturl="">Desuscribirse</a>&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">Este mensaje es únicamente de carácter informativo. Esta comunicación no es asesoría financiera.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:20px;padding-bottom:20px;padding-right:0px;padding-left:0px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:0px solid #bbbbbb;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
                    `;
		},

		welcomeVIIO: function (payload) {
			return `
            <div class=""><div class="aHl"></div><div id=":2t" tabindex="-1"></div><div id=":2i" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":2h" class="a3s aiL msg8931798965495087677"><u></u>
            <div style="background-color:#f9f9f9" bgcolor="#f9f9f9">
            <div style="color:transparent;opacity:0;font-size:0px;border:0;max-height:1px;width:1px;margin:0px;padding:0px;border-width:0px!important;display:none!important;line-height:0px!important"><img border="0" width="1" height="1" src="https://ci6.googleusercontent.com/proxy/vYebfLYq1SlxGj79lSy2KOextx_Ez2FhBmYX7MaqXjsrbQWknDDFjTOcAO9cZWBbVv6KENyqciEDK_vLbqtCQfkkNWBCgMCSGfTihOZ6pc5oZiSW17vCgB4VqageLi8cuqTROaxGIbnwSl2Mlp-DUbRYBbkiWbmLZxMF2EOC3SSOWMorAKucnhNCs-jeEoKa7bq3TuMxPztZKOI5cBTFBpxMh5QHKXZSurN4pqg=s0-d-e1-ft#https://littio.intercom-mail.com/q/VzO5aTCZYpgXxNaffkK3iw~~/AAAAAQA~/RgRkOE5SPVcIaW50ZXJjb21CCmJLUslVYioy7T9SGXJvY2hhY3NlYmFzdGlhbkBnbWFpbC5jb21YBAAExtE~" alt="" class="CToWUd"></div>
            
            
            
            <font color="#888888">
                        </font><font color="#888888">
            </font><table cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;line-height:100%!important;margin:0;padding:0;width:100%!important">
              <tbody>
            <tr>
                <td>
                
                  <font color="#888888">
            </font><font color="#888888">
                            </font><font color="#888888">
            </font><table style="border-collapse:collapse;margin:auto;max-width:635px;min-width:320px;width:100%" class="m_8931798965495087677main-wrap">
                    <tbody>
            <tr>
                      <td valign="top">
                        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;color:#c0c0c0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:26px;margin:0 auto 26px;width:100%">
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" class="m_8931798965495087677main_wrapper" style="padding:0 20px">
            
                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="background-clip:padding-box;border-collapse:collapse;border-radius:3px;color:#545454;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:20px;margin:0 auto 10px;width:100%">
                          <tbody>
            <tr>
                            <td valign="top">
                              <table cellpadding="0" cellspacing="0" border="0" class="m_8931798965495087677comment_body" style="background-clip:padding-box;border-bottom-style:none;border-collapse:collapse;width:100%">
                                <tbody>
            <tr>
                                  <td class="m_8931798965495087677content-td" style="background-clip:padding-box;background-color:white;border-radius:0 0 3px 3px;color:#525252;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:22px;overflow:hidden;padding:40px 40px 30px" bgcolor="white">
                                    
            
                                    
                                      <div style="margin:0;padding:0;background-color:#ffffff"><div style="display:none;max-height:0px;overflow:hidden">Get DeFi and Metaverse access in a few taps.</div><div style="display:none;max-height:0px;overflow:hidden">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
                
                <table style="table-layout:fixed;vertical-align:top;min-width:320px;border-spacing:0;border-collapse:collapse;background-color:#ffffff;width:100%" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#ffffff" valign="top">
                    <tbody>
                        <tr style="vertical-align:top" valign="top">
                            <td style="word-break:break-word;vertical-align:top" valign="top">
                                
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:10px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        <div class="m_6672540726590903157img-container" align="left" style="padding-right:0px;padding-left:0px">
                                                            
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img border="0" src="https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA" alt="VIIO" title="VIIO" style="text-decoration:none;height:auto;border:0;width:140px;max-width:100%;display:block" width="106" class="CToWUd"></a>
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:0px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        
                                                        <h1
                                                            style="line-height:100%">
                                                            Welcome
                                                            VIIO
                                                        </h1>


                                                        <br>
                                                        Disfruta de la experiencia VIIO,
                                                        recuerda estamos para hacer mas facil tu vida
                                                        <br><br><br><br><br>
                                                        
                                                        <div style="color:#333332;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:15px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#333332">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><strong><span style="font-size:24px">Necesitas ayuda con algo?</span></strong></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                        <div style="color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;font-size:18px;margin-top:0;margin-bottom:0"><span style="font-size:18px">No te preocupes, tenemos la respuesta! <br> Escríbenos un email a <a href="mailto:viio@itrmachines.com" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" >viio@itrmachines.com</a> y el equipo de VIIO te ayudará.<br> También puedes unirte a nuestro <a href="https://instagram.com/viio.me?igshid=YmMyMTA2M2Y=" rel="noopener" style="text-decoration:none;color:#0092ff" target="_blank" >Instagram</a>.<br> Encuentranos en Twitter en <a href="https://twitter.com/VIIO_ME?t=5LYAHNhSWyxZXY3CENMf0g&s=08" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" >@VIIO_ME</a><br><br></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:5px;padding-bottom:5px;padding-right:15px;padding-left:15px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:0px;padding-bottom:10px;padding-left:0px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:1px solid #cdcdcd;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                            <tbody><tr style="vertical-align:top" valign="top">
                                                                <td style="word-break:break-word;vertical-align:top;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" role="presentation" align="left" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                                        <tbody><tr style="vertical-align:top" valign="top">
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Twitter" src="https://ci5.googleusercontent.com/proxy/zFo3V8wu2ymA0nii8X2siWaFrJ_Jzh-84zVFjE7kpe69f6zlf9eJI078HlSkpVvqDI4d2IpIMXqdHS_krZeShlzZ_IiPYsMPM72yml57Equ_ND1xOHExWrH1SxZe=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-94825/twitter.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Instagram" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Feather-logos-instagram.svg/24px-Feather-logos-instagram.svg.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                        
                                                        <div style="color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:10px;padding-right:0px;padding-bottom:10px;padding-left:0px">
                                                            <div style="font-size:12px;line-height:1.5;color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <div style="font-size:14px;line-height:1.5;text-align:center">
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span><span class="il">VIIO</span></span><br><span>Bogotá D.C., Colombia</span><br><br></p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><a style="text-decoration:none;color:#0092ff" href="" rel="noopener" target="_blank" data-saferedirecturl="">Desuscribirse</a>&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">Este mensaje es únicamente de carácter informativo. Esta comunicación no es asesoría financiera.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:20px;padding-bottom:20px;padding-right:0px;padding-left:0px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:0px solid #bbbbbb;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
                    `;
		},

		verifyEmail: function (payload) {
			return `
            <!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VIIO - Verificación correo electrónico </title>
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

    body {
      font-family: 'Open Sans', sans-serif;
      margin: 0;
      background-color: #f5f5f5;
    }

    table {
      border-spacing: 0;
      padding: 35px;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f5f5f5;
      padding: 30px 0;
    }

    .main {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      color: #171a1b;
    }

    .title {
      color: #000;
      font-weight: 700;
      font-size: 24px;
      margin-top: 45px;
    }

    .subtitle {
      font-size: 18px;
      margin: 0;
      margin-top: 25px;
    }

    .paragraph {
      font-size: 14px;
      margin-bottom: 60px;
    }

    .box {
      width: 100%;
      background-color: #F9F9F9;
      border-radius: 5px;
      border-bottom: 6px solid #0092FF;
      margin-bottom: 20px;
    }

    .box__title {
      font-size: 16px;
      font-weight: 700;
      width: 100%;
      height: 48px;
      border-bottom: 1px dashed #C1C1C1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .box__data-content {
      padding-bottom: 20px;
    }

    .box__data-content.first {
      padding-top: 20px;
    }

    .box__data01 {
      font-size: 12px;
      width: 100%;
      text-align: center;
      margin: 0;
    }

    .box__data02 {
      font-size: 12px;
      width: 100%;
      text-align: center;
      color: #0092FF;
      margin: 0;
    }

    .box__data-focus {
      font-size: 24px;
      font-weight: 700;
      width: 100%;
      text-align: center;
      color: #0092FF;
      margin: 0;
    }

    .image {
      width: 100%;
    }

    .button {
      text-decoration: none;
    }

    .button__content {
      width: 100%;
      height: 42px;
      background-color: #0092FF;
      color: #ffffff;
      font-size: 16px;
      text-align: center;
      border-radius: 5px;
    }

    .button__content p {
      margin: 0;
      padding-top: 9px;
    }

    .divider {
      background-color: #ffffff;
      width: 100%;
      height: 42px;
      border-bottom: 1px solid #808080;
      opacity: 0.5;
    }

    .footer__title {
      font-size: 14px;
      text-align: center;
      font-weight: 700;
      opacity: 0.5;
    }

    .footer__paragraph {
      font-size: 12px;
      text-align: center;
      opacity: 0.5;
    }

    .footer__paragraph.special {
      font-size: 10px;
      font-style: italic;
    }

    .footer__link {
      margin: 20px 0;
      width: 100%;
      text-align: center;
    }

    .footer__location {
      width: 100%;
      text-align: center;
    }

    .footer__bluelink {
      width: 100%;
      font-size: 12px;
      text-align: center;
      color: #0092FF;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      <!-- LOGO SECTION -->
      <tr>
        <td>
          <a href="https://viio.me/" target="_blank">
            <img
              src="https://ci6.googleusercontent.com/proxy/Tj5jc1Ly14XQxkfxHPoXmccpD0tarR72QVZgG-XF0V8bKO1VbvQv2Zyg7eyUm7b_SoUEVMRGcQZBhokuZi9o1jXDEJETkmTJaG9v0X2PP8-0QArNrFnzZXRilIaUGdU=s0-d-e1-ft#https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA"
              alt="VIIO logo" width="120">
          </a>
        </td>
      </tr>
      <!-- TITLE SECTION -->
      <tr>
        <td>
          <h1 class="title">👋 Verifica tu correo electrónico</h1>
        </td>
      </tr>
      <!-- PARAGRAPH SECTION -->
      <tr>
        <td>
          <p class="paragraph">Nos alegra que quieras ser un pionero de VIIO y te quieras unir a la campaña de lanzamiento del beta. Por favor verifica tu correo electrónico para quedar registrado en la campaña y ganar recompensas por tus referidos junto con early access a nuevos servicios.</p>
        </td>
      </tr>
      <!-- BUTTON SECTION -->
      <tr>
        <td>
          <a href="${process.env.VIRAL_LOOPS}/?email=${payload.email}&reffrom=${payload.referralCode}" target="_blank" class="button">
            <div class="button__content">
                <p> Listo!  </p>
            </div>
          </a>
        </td>
      </tr>
      <!-- DIVIDER SECTION -->
      <tr>
        <td>
          <div class="divider"></div>
        </td>
      </tr>
      <!-- FOOTER SECTION -->
      <tr>
        <td>
          <table class="main">
            <tr>
              <td>
                <h3 class="footer__title">¿Necesitas ayuda con algo?</h3>
              </td>
            </tr>
            <tr>
              <td>
                <p class="footer__paragraph">¡No te preocupes, tenemos la respuesta!<br>
                  Puedes escribirnos a nuestro centro de ayuda en la <a class="footer__bluelink"
                    href="https://viio.me/" target="_blank" rel="noopener noreferrer">app</a>.<br>
                  También puedes contactarnos en nuestras redes sociales o escríbenos a <a class="footer__bluelink"
                    href="mailto:viio@itrmachines.com" target="_blank"
                    rel="noopener noreferrer">viio@itrmachines.com</a>.</p>
              </td>
            </tr>
            <tr>
              <td>
                <div class="footer__link">
                  <a href="https://www.instagram.com/viio.me/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://lh6.googleusercontent.com/WFuDI6C030bGqr9-iZmutIqnsAKqzcRRcVQA0CnDqbtSu7J7zXCq9tyatnPvENt9L5Y=w2400"
                      alt="VIIO instagram" width="30">
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="footer__location">
                  <a href="https://viio.me/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://ci6.googleusercontent.com/proxy/Tj5jc1Ly14XQxkfxHPoXmccpD0tarR72QVZgG-XF0V8bKO1VbvQv2Zyg7eyUm7b_SoUEVMRGcQZBhokuZi9o1jXDEJETkmTJaG9v0X2PP8-0QArNrFnzZXRilIaUGdU=s0-d-e1-ft#https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA"
                      alt="VIIO logo" width="120">
                  </a>
                  <p class="footer__paragraph">Bogota D.C., Colombia</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p class="footer__paragraph special">Este mensaje es únicamente de carácter informativo. Esta comunicación no es asesoría financiera.</p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="footer__paragraph">
                  <a class="footer__bluelink" href="http://" target="_blank" rel="noopener noreferrer">unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>

</html>
                    `;
		},

        referrerEmail: function (payload) {
			return `
            <!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VIIO - Verificación correo electrónico </title>
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

    body {
      font-family: 'Open Sans', sans-serif;
      margin: 0;
      background-color: #f5f5f5;
    }

    table {
      border-spacing: 0;
      padding: 35px;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f5f5f5;
      padding: 30px 0;
    }

    .main {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      color: #171a1b;
    }

    .title {
      color: #000;
      font-weight: 700;
      font-size: 24px;
      margin-top: 45px;
    }

    .subtitle {
      font-size: 18px;
      margin: 0;
      margin-top: 25px;
    }

    .paragraph {
      font-size: 14px;
      margin-bottom: 60px;
    }

    .box {
      width: 100%;
      background-color: #F9F9F9;
      border-radius: 5px;
      border-bottom: 6px solid #0092FF;
      margin-bottom: 20px;
    }

    .box__title {
      font-size: 16px;
      font-weight: 700;
      width: 100%;
      height: 48px;
      border-bottom: 1px dashed #C1C1C1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .box__data-content {
      padding-bottom: 20px;
    }

    .box__data-content.first {
      padding-top: 20px;
    }

    .box__data01 {
      font-size: 12px;
      width: 100%;
      text-align: center;
      margin: 0;
    }

    .box__data02 {
      font-size: 12px;
      width: 100%;
      text-align: center;
      color: #0092FF;
      margin: 0;
    }

    .box__data-focus {
      font-size: 24px;
      font-weight: 700;
      width: 100%;
      text-align: center;
      color: #0092FF;
      margin: 0;
    }

    .image {
      width: 100%;
    }

    .button {
      text-decoration: none;
    }

    .button__content {
      width: 100%;
      height: 42px;
      background-color: #0092FF;
      color: #ffffff;
      font-size: 16px;
      text-align: center;
      border-radius: 5px;
    }

    .button__content p {
      margin: 0;
      padding-top: 9px;
    }

    .divider {
      background-color: #ffffff;
      width: 100%;
      height: 42px;
      border-bottom: 1px solid #808080;
      opacity: 0.5;
    }

    .footer__title {
      font-size: 14px;
      text-align: center;
      font-weight: 700;
      opacity: 0.5;
    }

    .footer__paragraph {
      font-size: 12px;
      text-align: center;
      opacity: 0.5;
    }

    .footer__paragraph.special {
      font-size: 10px;
      font-style: italic;
    }

    .footer__link {
      margin: 20px 0;
      width: 100%;
      text-align: center;
    }

    .footer__location {
      width: 100%;
      text-align: center;
    }

    .footer__bluelink {
      width: 100%;
      font-size: 12px;
      text-align: center;
      color: #0092FF;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      <!-- LOGO SECTION -->
      <tr>
        <td>
          <a href="https://viio.me/" target="_blank">
            <img
              src="https://ci6.googleusercontent.com/proxy/Tj5jc1Ly14XQxkfxHPoXmccpD0tarR72QVZgG-XF0V8bKO1VbvQv2Zyg7eyUm7b_SoUEVMRGcQZBhokuZi9o1jXDEJETkmTJaG9v0X2PP8-0QArNrFnzZXRilIaUGdU=s0-d-e1-ft#https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA"
              alt="VIIO logo" width="120">
          </a>
        </td>
      </tr>
      <!-- TITLE SECTION -->
      <tr>
        <td>
          <h1 class="title">Tus amigos también están Viio </h1>
        </td>
      </tr>
      <!-- PARAGRAPH SECTION -->
      <tr>
        <td>
          <p class="paragraph">Tus amigos se acaban de unir a Viral Loop.

          ¡Eso significa que cada vez estás más cerca de una recompensa! Haz clic en el link para ver el número de referidos.</p>
        </td>
      </tr>
      <!-- BUTTON SECTION -->
      <tr>
        <td>
          <a href="${process.env.VIRAL_LOOPS}/?email=${payload.email}&reffrom=${payload.referralCode}" target="_blank" class="button">
            <div class="button__content">
                <p> Listo!  </p>
            </div>
          </a>
        </td>
      </tr>
      <!-- DIVIDER SECTION -->
      <tr>
        <td>
          <div class="divider"></div>
        </td>
      </tr>
      <!-- FOOTER SECTION -->
      <tr>
        <td>
          <table class="main">
            <tr>
              <td>
                <h3 class="footer__title">¿Necesitas ayuda con algo?</h3>
              </td>
            </tr>
            <tr>
              <td>
                <p class="footer__paragraph">¡No te preocupes, tenemos la respuesta!<br>
                  Puedes escribirnos a nuestro centro de ayuda en la <a class="footer__bluelink"
                    href="https://viio.me/" target="_blank" rel="noopener noreferrer">app</a>.<br>
                  También puedes contactarnos en nuestras redes sociales o escríbenos a <a class="footer__bluelink"
                    href="mailto:viio@itrmachines.com" target="_blank"
                    rel="noopener noreferrer">viio@itrmachines.com</a>.</p>
              </td>
            </tr>
            <tr>
              <td>
                <div class="footer__link">
                  <a href="https://www.instagram.com/viio.me/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://lh6.googleusercontent.com/WFuDI6C030bGqr9-iZmutIqnsAKqzcRRcVQA0CnDqbtSu7J7zXCq9tyatnPvENt9L5Y=w2400"
                      alt="VIIO instagram" width="30">
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="footer__location">
                  <a href="https://viio.me/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://ci6.googleusercontent.com/proxy/Tj5jc1Ly14XQxkfxHPoXmccpD0tarR72QVZgG-XF0V8bKO1VbvQv2Zyg7eyUm7b_SoUEVMRGcQZBhokuZi9o1jXDEJETkmTJaG9v0X2PP8-0QArNrFnzZXRilIaUGdU=s0-d-e1-ft#https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA"
                      alt="VIIO logo" width="120">
                  </a>
                  <p class="footer__paragraph">Bogota D.C., Colombia</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p class="footer__paragraph special">Este mensaje es únicamente de carácter informativo. Esta comunicación no es asesoría financiera.</p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="footer__paragraph">
                  <a class="footer__bluelink" href="http://" target="_blank" rel="noopener noreferrer">unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>

</html>
                    `;
		},

		WelcomeCampaingEmail: function (payload) {
			return `
            <!DOCTYPE html
            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VIIO - Verificación correo electrónico </title>
    <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

    body {
      font-family: 'Open Sans', sans-serif;
      margin: 0;
      background-color: #f5f5f5;
    }

    table {
      border-spacing: 0;
      padding: 35px;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
    }

    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f5f5f5;
      padding: 30px 0;
    }

    .main {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      color: #171a1b;
    }

    .title {
      color: #000;
      font-weight: 700;
      font-size: 24px;
      margin-top: 45px;
    }

    .subtitle {
      font-size: 18px;
      margin: 0;
      margin-top: 25px;
    }

    .paragraph {
      font-size: 14px;
      margin-bottom: 60px;
    }

    .box {
      width: 100%;
      background-color: #F9F9F9;
      border-radius: 5px;
      border-bottom: 6px solid #0092FF;
      margin-bottom: 20px;
    }

    .box__title {
      font-size: 16px;
      font-weight: 700;
      width: 100%;
      height: 48px;
      border-bottom: 1px dashed #C1C1C1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .box__data-content {
      padding-bottom: 20px;
    }

    .box__data-content.first {
      padding-top: 20px;
    }

    .box__data01 {
      font-size: 12px;
      width: 100%;
      text-align: center;
      margin: 0;
    }

    .box__data02 {
      font-size: 12px;
      width: 100%;
      text-align: center;
      color: #0092FF;
      margin: 0;
    }

    .box__data-focus {
      font-size: 24px;
      font-weight: 700;
      width: 100%;
      text-align: center;
      color: #0092FF;
      margin: 0;
    }

    .image {
      width: 100%;
    }

    .button {
      text-decoration: none;
    }

    .button__content {
      width: 100%;
      height: 42px;
      background-color: #0092FF;
      color: #ffffff;
      font-size: 16px;
      text-align: center;
      border-radius: 5px;
    }

    .button__content p {
      margin: 0;
      padding-top: 9px;
    }

    .divider {
      background-color: #ffffff;
      width: 100%;
      height: 42px;
      border-bottom: 1px solid #808080;
      opacity: 0.5;
    }

    .footer__title {
      font-size: 14px;
      text-align: center;
      font-weight: 700;
      opacity: 0.5;
    }

    .footer__paragraph {
      font-size: 12px;
      text-align: center;
      opacity: 0.5;
    }

    .footer__paragraph.special {
      font-size: 10px;
      font-style: italic;
    }

    .footer__link {
      margin: 20px 0;
      width: 100%;
      text-align: center;
    }

    .footer__location {
      width: 100%;
      text-align: center;
    }

    .footer__bluelink {
      width: 100%;
      font-size: 12px;
      text-align: center;
      color: #0092FF;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main" width="100%">
      <!-- LOGO SECTION -->
      <tr>
        <td>
          <a href="https://viio.me/" target="_blank">
            <img
              src="https://ci6.googleusercontent.com/proxy/Tj5jc1Ly14XQxkfxHPoXmccpD0tarR72QVZgG-XF0V8bKO1VbvQv2Zyg7eyUm7b_SoUEVMRGcQZBhokuZi9o1jXDEJETkmTJaG9v0X2PP8-0QArNrFnzZXRilIaUGdU=s0-d-e1-ft#https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA"
              alt="VIIO logo" width="120">
          </a>
        </td>
      </tr>
      <!-- TITLE SECTION -->
      <tr>
        <td>
          <h1 class="title">👋 🎉👌👌 Bienvenido a la lista de espera</h1>
        </td>
      </tr>
      <!-- PARAGRAPH SECTION -->
      <tr>
        <td>
          <p class="paragraph">Nos alegra que quieras ser un pionero de VIIO y te quieras unir a la campaña de lanzamiento del beta
          ¿Sabías que puedes obtener recompensas refiriendo a amigos?
          Corre la voz acerca de VIO y cuando tus amigos se registren, ¡ambos ganarán recompensas!</p>
        </td>
      </tr>
      <!-- BUTTON SECTION -->
      <tr>
        <td>
          <a href="${process.env.VIRAL_LOOPS}/?email=${payload.email}&reffrom=${payload.referralCode}" target="_blank" class="button">
            <div class="button__content">
                <p> Listo!  </p>
            </div>
          </a>
        </td>
      </tr>
      <!-- DIVIDER SECTION -->
      <tr>
        <td>
          <div class="divider"></div>
        </td>
      </tr>
      <!-- FOOTER SECTION -->
      <tr>
        <td>
          <table class="main">
            <tr>
              <td>
                <h3 class="footer__title">¿Necesitas ayuda con algo?</h3>
              </td>
            </tr>
            <tr>
              <td>
                <p class="footer__paragraph">¡No te preocupes, tenemos la respuesta!<br>
                  Puedes escribirnos a nuestro centro de ayuda en la <a class="footer__bluelink"
                    href="https://viio.me/" target="_blank" rel="noopener noreferrer">app</a>.<br>
                  También puedes contactarnos en nuestras redes sociales o escríbenos a <a class="footer__bluelink"
                    href="mailto:viio@itrmachines.com" target="_blank"
                    rel="noopener noreferrer">viio@itrmachines.com</a>.</p>
              </td>
            </tr>
            <tr>
              <td>
                <div class="footer__link">
                  <a href="https://www.instagram.com/viio.me/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://lh6.googleusercontent.com/WFuDI6C030bGqr9-iZmutIqnsAKqzcRRcVQA0CnDqbtSu7J7zXCq9tyatnPvENt9L5Y=w2400"
                      alt="VIIO instagram" width="30">
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="footer__location">
                  <a href="https://viio.me/" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://ci6.googleusercontent.com/proxy/Tj5jc1Ly14XQxkfxHPoXmccpD0tarR72QVZgG-XF0V8bKO1VbvQv2Zyg7eyUm7b_SoUEVMRGcQZBhokuZi9o1jXDEJETkmTJaG9v0X2PP8-0QArNrFnzZXRilIaUGdU=s0-d-e1-ft#https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA"
                      alt="VIIO logo" width="120">
                  </a>
                  <p class="footer__paragraph">Bogota D.C., Colombia</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p class="footer__paragraph special">Este mensaje es únicamente de carácter informativo. Esta comunicación no es asesoría financiera.</p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="footer__paragraph">
                  <a class="footer__bluelink" href="http://" target="_blank" rel="noopener noreferrer">unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>

</html>
                    `;
		},

		withdrawalConfirmation: function (payload) {
			return `
            <div class=""><div class="aHl"></div><div id=":2t" tabindex="-1"></div><div id=":2i" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":2h" class="a3s aiL msg8931798965495087677"><u></u>
    
            <div style="background-color:#f9f9f9" bgcolor="#f9f9f9">
            <div style="color:transparent;opacity:0;font-size:0px;border:0;max-height:1px;width:1px;margin:0px;padding:0px;border-width:0px!important;display:none!important;line-height:0px!important"><img border="0" width="1" height="1" src="https://ci6.googleusercontent.com/proxy/vYebfLYq1SlxGj79lSy2KOextx_Ez2FhBmYX7MaqXjsrbQWknDDFjTOcAO9cZWBbVv6KENyqciEDK_vLbqtCQfkkNWBCgMCSGfTihOZ6pc5oZiSW17vCgB4VqageLi8cuqTROaxGIbnwSl2Mlp-DUbRYBbkiWbmLZxMF2EOC3SSOWMorAKucnhNCs-jeEoKa7bq3TuMxPztZKOI5cBTFBpxMh5QHKXZSurN4pqg=s0-d-e1-ft#https://littio.intercom-mail.com/q/VzO5aTCZYpgXxNaffkK3iw~~/AAAAAQA~/RgRkOE5SPVcIaW50ZXJjb21CCmJLUslVYioy7T9SGXJvY2hhY3NlYmFzdGlhbkBnbWFpbC5jb21YBAAExtE~" alt="" class="CToWUd"></div>
            
            
            
            <font color="#888888">
                        </font><font color="#888888">
            </font><table cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;line-height:100%!important;margin:0;padding:0;width:100%!important">
              <tbody>
            <tr>
                <td>
                
                  <font color="#888888">
            </font><font color="#888888">
                            </font><font color="#888888">
            </font><table style="border-collapse:collapse;margin:auto;max-width:635px;min-width:320px;width:100%" class="m_8931798965495087677main-wrap">
                    <tbody>
            <tr>
                      <td valign="top">
                        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;color:#c0c0c0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:26px;margin:0 auto 26px;width:100%">
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" class="m_8931798965495087677main_wrapper" style="padding:0 20px">
            
                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="background-clip:padding-box;border-collapse:collapse;border-radius:3px;color:#545454;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:20px;margin:0 auto 10px;width:100%">
                          <tbody>
            <tr>
                            <td valign="top">
                              <table cellpadding="0" cellspacing="0" border="0" class="m_8931798965495087677comment_body" style="background-clip:padding-box;border-bottom-style:none;border-collapse:collapse;width:100%">
                                <tbody>
            <tr>
                                  <td class="m_8931798965495087677content-td" style="background-clip:padding-box;background-color:white;border-radius:0 0 3px 3px;color:#525252;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:22px;overflow:hidden;padding:40px 40px 30px" bgcolor="white">
                                    
            
                                    
                                      <div style="margin:0;padding:0;background-color:#ffffff"><div style="display:none;max-height:0px;overflow:hidden">Get DeFi and Metaverse access in a few taps.</div><div style="display:none;max-height:0px;overflow:hidden">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
                
                <table style="table-layout:fixed;vertical-align:top;min-width:320px;border-spacing:0;border-collapse:collapse;background-color:#ffffff;width:100%" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#ffffff" valign="top">
                    <tbody>
                        <tr style="vertical-align:top" valign="top">
                            <td style="word-break:break-word;vertical-align:top" valign="top">
                                
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:10px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        <div class="m_6672540726590903157img-container" align="left" style="padding-right:0px;padding-left:0px">
                                                            
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img border="0" src="https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA" alt="VIIO" title="VIIO" style="text-decoration:none;height:auto;border:0;width:140px;max-width:100%;display:block" width="106" class="CToWUd"></a>
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:0px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        
                                                        <h1 style="line-height:100%">Tu dinero está en camino🏧 </h1>
            
                                        
                                        <br>
                                                                    Aquí está el resumen de tu transferencia. Guárdalo en caso de necesitarlo, este es el comprobante de tu operación.<br><br><br><br>
            
                                                                    <div align="center"style="background-color:rgb(249,249,249);padding:20px;margin-left:auto;margin-right:auto">
                            
            
                            <span style="color:"rgb(0,0,0)";text-transform:uppercase"><span style="font-weight:600">Detalles de tu Retiro</span></span>
                            <br>
            
                            <div style="color:rgb(0,0,0);border-bottom:2px dashed rgb(221,221,221);margin-bottom:10px;padding:10px 0px">
                                
                            </div>
                                    <font color="000000">Total:</font><br><font color="#0092ff">${new Intl.NumberFormat(
																			"en-US",
																			{ style: "currency", currency: "USD" }
																		).format(payload.total)}<br><br>
                                    <font color="000000">Email:</font><br><font color="#0092ff">${
																			payload.metadata.userData?.recipientEmail
																		}<br><br>
                                    <font color="000000">Nombre: </font><br><font color="#0092ff">${
																			payload.metadata.userData?.recipientName
																		}<br><br>
                                    <font color="000000">Datos transacción:</font><br><font color="#0092ff">${
																			payload.metadata.userData.data1
																		}<br><br></font><br><font color="#0092ff">${
				payload.metadata.userData?.data2
			}<br><br></font><br><font color="#0092ff">${
				payload.metadata.userData?.data3
			}<br><br></font><br><font color="#0092ff">${
				payload.metadata.userData?.data4
			}<br><br></font><br><font color="#0092ff">${
				payload.metadata.userData?.data5
			}<br><br></font><br><font color="#0092ff">${
				payload.metadata.userData?.data6
			}<br><br></font><br><font color="#0092ff">${
				payload.metadata.userData?.data7
			}<br><br></font><br><font color="#0092ff">${payload.metadata.userData?.data8}<br><br>
                            </div>
            
                                                        
                                                      
                                                        
                                                        <div style="color:#333332;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:15px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#333332">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><strong><span style="font-size:24px">Necesitas ayuda con algo?</span></strong></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                        <div style="color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;font-size:18px;margin-top:0;margin-bottom:0"><span style="font-size:18px">No te preocupes, tenemos la respuesta! <br>Puedes escribirnos a <a href="mailto:viio@itrmachines.com" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" >viio@itrmachines.com</a>.<br>También puedes seguirnos en<a href="https://instagram.com/viio.me?igshid=YmMyMTA2M2Y=" rel="noopener" style="text-decoration:none;color:#0092ff" target="_blank" > Instagram</a>.<br>Puedes encontrarnos en Twitter como <a href="https://twitter.com/VIIO_ME?t=5LYAHNhSWyxZXY3CENMf0g&s=08" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" >@VIIO_ME</a> </span></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:5px;padding-bottom:5px;padding-right:15px;padding-left:15px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:0px;padding-bottom:10px;padding-left:0px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:1px solid #cdcdcd;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                            <tbody><tr style="vertical-align:top" valign="top">
                                                                <td style="word-break:break-word;vertical-align:top;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" role="presentation" align="left" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                                        <tbody><tr style="vertical-align:top" valign="top">
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Twitter" src="https://ci5.googleusercontent.com/proxy/zFo3V8wu2ymA0nii8X2siWaFrJ_Jzh-84zVFjE7kpe69f6zlf9eJI078HlSkpVvqDI4d2IpIMXqdHS_krZeShlzZ_IiPYsMPM72yml57Equ_ND1xOHExWrH1SxZe=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-94825/twitter.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Instagram" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Feather-logos-instagram.svg/24px-Feather-logos-instagram.svg.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Linkedin" src="https://upload.wikimedia.org/wikipedia/commons/7/76/Font_Awesome_5_brands_linkedin.svg" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                        
                                                        <div style="color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:10px;padding-right:0px;padding-bottom:10px;padding-left:0px">
                                                            <div style="font-size:12px;line-height:1.5;color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <div style="font-size:14px;line-height:1.5;text-align:center">
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span><span class="il">VIIO</span></span><br><span>Bogotá D.C., Colombia</span><br><br></p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><a style="text-decoration:none;color:#0092ff" href="" rel="noopener" target="_blank" data-saferedirecturl="">Unsubscribe</a>&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><br>Este mensaje es únicamente de carácter informativo. Esta comunicación no es asesoría financiera.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:20px;padding-bottom:20px;padding-right:0px;padding-left:0px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:0px solid #bbbbbb;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;
		},

		depositConfirmation: function (payload) {
			return `
            <div class=""><div class="aHl"></div><div id=":2t" tabindex="-1"></div><div id=":2i" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":2h" class="a3s aiL msg8931798965495087677"><u></u>
            <div style="background-color:#f9f9f9" bgcolor="#f9f9f9">
            <div style="color:transparent;opacity:0;font-size:0px;border:0;max-height:1px;width:1px;margin:0px;padding:0px;border-width:0px!important;display:none!important;line-height:0px!important"><img border="0" width="1" height="1" src="https://ci6.googleusercontent.com/proxy/vYebfLYq1SlxGj79lSy2KOextx_Ez2FhBmYX7MaqXjsrbQWknDDFjTOcAO9cZWBbVv6KENyqciEDK_vLbqtCQfkkNWBCgMCSGfTihOZ6pc5oZiSW17vCgB4VqageLi8cuqTROaxGIbnwSl2Mlp-DUbRYBbkiWbmLZxMF2EOC3SSOWMorAKucnhNCs-jeEoKa7bq3TuMxPztZKOI5cBTFBpxMh5QHKXZSurN4pqg=s0-d-e1-ft#https://littio.intercom-mail.com/q/VzO5aTCZYpgXxNaffkK3iw~~/AAAAAQA~/RgRkOE5SPVcIaW50ZXJjb21CCmJLUslVYioy7T9SGXJvY2hhY3NlYmFzdGlhbkBnbWFpbC5jb21YBAAExtE~" alt="" class="CToWUd"></div>
            
            
            
            <font color="#888888">
                        </font><font color="#888888">
            </font><table cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;line-height:100%!important;margin:0;padding:0;width:100%!important">
              <tbody>
            <tr>
                <td>
                
                  <font color="#888888">
            </font><font color="#888888">
                            </font><font color="#888888">
            </font><table style="border-collapse:collapse;margin:auto;max-width:635px;min-width:320px;width:100%" class="m_8931798965495087677main-wrap">
                    <tbody>
            <tr>
                      <td valign="top">
                        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;color:#c0c0c0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:26px;margin:0 auto 26px;width:100%">
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" class="m_8931798965495087677main_wrapper" style="padding:0 20px">
            
                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="background-clip:padding-box;border-collapse:collapse;border-radius:3px;color:#545454;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:20px;margin:0 auto 10px;width:100%">
                          <tbody>
            <tr>
                            <td valign="top">
                              <table cellpadding="0" cellspacing="0" border="0" class="m_8931798965495087677comment_body" style="background-clip:padding-box;border-bottom-style:none;border-collapse:collapse;width:100%">
                                <tbody>
            <tr>
                                  <td class="m_8931798965495087677content-td" style="background-clip:padding-box;background-color:white;border-radius:0 0 3px 3px;color:#525252;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:22px;overflow:hidden;padding:40px 40px 30px" bgcolor="white">
                                    
            
                                    
                                      <div style="margin:0;padding:0;background-color:#ffffff"><div style="display:none;max-height:0px;overflow:hidden">Get DeFi and Metaverse access in a few taps.</div><div style="display:none;max-height:0px;overflow:hidden">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
                
                <table style="table-layout:fixed;vertical-align:top;min-width:320px;border-spacing:0;border-collapse:collapse;background-color:#ffffff;width:100%" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#ffffff" valign="top">
                    <tbody>
                        <tr style="vertical-align:top" valign="top">
                            <td style="word-break:break-word;vertical-align:top" valign="top">
                                
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:10px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        <div class="m_6672540726590903157img-container" align="left" style="padding-right:0px;padding-left:0px">
                                                            
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img border="0" src="https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA" alt="VIIO" title="VIIO" style="text-decoration:none;height:auto;border:0;width:140px;max-width:100%;display:block" width="106" class="CToWUd"></a>
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:0px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        
                                                        <h1 style="line-height:100%">Se ha acreditado tu VIIO <img data-emoji="🚀" class="an1" alt="🚀" aria-label="🚀" src="https://fonts.gstatic.com/s/e/notoemoji/14.0/1f680/32.png" loading="lazy"></h1>
            
                                        
                                        <br>
                                        Tu carga de dólares digitales en la app fue un <b>éxito!</b><br>Ahora puedes seguir cubriéndote de la devaluación y darle movilidad a tu dinero con VIIO.<br>Aquí está el comprobante de tu operación: <br><br><br><br><br>
            
                                                                    <div align="center"style="background-color:rgb(249,249,249);padding:20px;margin-left:auto;margin-right:auto">
                            
            
                            <span style="color:"rgb(0,0,0)";text-transform:uppercase"><span style="font-weight:600">Comprobante de Operación</span></span>
                            <br>
            
                            <div style="color:rgb(0,0,0);border-bottom:2px dashed rgb(221,221,221);margin-bottom:10px;padding:10px 0px"></div><font color="#000000">
                            ${
															payload.metadata.selectedExchangeRate.quoteCurrency.ticker
														} acreditados: </font><br><font color="#0092ff"><span style="font-size:30px"><b>${new Intl.NumberFormat(
				"en-US",
				{ style: "currency", currency: "USD" }
			).format(
				payload.total / parseFloat(payload.metadata.selectedExchangeRate.buy_rate)
			)}</b></span></font><br><br><font color="000000">
                            Referencia:
                            </font><br><font color="#0092ff">${Math.floor(
															Math.random() * (999999 - 100000 + 1) + 10000
														)}<br></div>
                                                        
                                                      
                                                        
                                                        <div style="color:#333332;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:15px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#333332">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><strong><span style="font-size:24px">Necesitas ayuda con algo?</span></strong></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                        <div style="color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;font-size:18px;margin-top:0;margin-bottom:0"><span style="font-size:18px">No te preocupes, tenemos la respuesta! <br> Escríbenos un email a <a href="mailto:viio@itrmachines.com" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" >viio@itrmachines.com</a> y el equipo de VIIO te ayudará.<br> También puedes unirte a nuestro <a href="https://instagram.com/viio.me?igshid=YmMyMTA2M2Y=" rel="noopener" style="text-decoration:none;color:#0092ff" target="_blank" >Instagram</a>.<br> Encuentranos en Twitter en <a href="https://twitter.com/VIIO_ME?t=5LYAHNhSWyxZXY3CENMf0g&s=08" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" >@VIIO_ME</a><br><br></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:5px;padding-bottom:5px;padding-right:15px;padding-left:15px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:0px;padding-bottom:10px;padding-left:0px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:1px solid #cdcdcd;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                            <tbody><tr style="vertical-align:top" valign="top">
                                                                <td style="word-break:break-word;vertical-align:top;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" role="presentation" align="left" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                                        <tbody><tr style="vertical-align:top" valign="top">
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Twitter" src="https://ci5.googleusercontent.com/proxy/zFo3V8wu2ymA0nii8X2siWaFrJ_Jzh-84zVFjE7kpe69f6zlf9eJI078HlSkpVvqDI4d2IpIMXqdHS_krZeShlzZ_IiPYsMPM72yml57Equ_ND1xOHExWrH1SxZe=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-94825/twitter.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Instagram" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Feather-logos-instagram.svg/24px-Feather-logos-instagram.svg.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                        
                                                        <div style="color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:10px;padding-right:0px;padding-bottom:10px;padding-left:0px">
                                                            <div style="font-size:12px;line-height:1.5;color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <div style="font-size:14px;line-height:1.5;text-align:center">
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span><span class="il">VIIO</span></span><br><span>Bogotá D.C., Colombia</span><br><br></p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><a style="text-decoration:none;color:#0092ff" href="" rel="noopener" target="_blank" data-saferedirecturl="">Desuscribirse</a>&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">Este mensaje es únicamente de carácter informativo. Esta comunicación no es asesoría financiera.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:20px;padding-bottom:20px;padding-right:0px;padding-left:0px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:0px solid #bbbbbb;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;
		},

		basicRegistration: function (payload) {
			return `
            <div class=""><div class="aHl"></div><div id=":2t" tabindex="-1"></div><div id=":2i" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":2h" class="a3s aiL msg8931798965495087677"><u></u>
    
    
            <div style="background-color:#f9f9f9" bgcolor="#f9f9f9">
            <div style="color:transparent;opacity:0;font-size:0px;border:0;max-height:1px;width:1px;margin:0px;padding:0px;border-width:0px!important;display:none!important;line-height:0px!important"><img border="0" width="1" height="1" src="https://ci6.googleusercontent.com/proxy/vYebfLYq1SlxGj79lSy2KOextx_Ez2FhBmYX7MaqXjsrbQWknDDFjTOcAO9cZWBbVv6KENyqciEDK_vLbqtCQfkkNWBCgMCSGfTihOZ6pc5oZiSW17vCgB4VqageLi8cuqTROaxGIbnwSl2Mlp-DUbRYBbkiWbmLZxMF2EOC3SSOWMorAKucnhNCs-jeEoKa7bq3TuMxPztZKOI5cBTFBpxMh5QHKXZSurN4pqg=s0-d-e1-ft#https://littio.intercom-mail.com/q/VzO5aTCZYpgXxNaffkK3iw~~/AAAAAQA~/RgRkOE5SPVcIaW50ZXJjb21CCmJLUslVYioy7T9SGXJvY2hhY3NlYmFzdGlhbkBnbWFpbC5jb21YBAAExtE~" alt="" class="CToWUd"></div>
            
            
            
            <font color="#888888">
                        </font><font color="#888888">
            </font><table cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;line-height:100%!important;margin:0;padding:0;width:100%!important">
              <tbody>
            <tr>
                <td>
                
                  <font color="#888888">
            </font><font color="#888888">
                            </font><font color="#888888">
            </font><table style="border-collapse:collapse;margin:auto;max-width:635px;min-width:320px;width:100%" class="m_8931798965495087677main-wrap">
                    <tbody>
            <tr>
                      <td valign="top">
                        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;color:#c0c0c0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:26px;margin:0 auto 26px;width:100%">
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td valign="top" class="m_8931798965495087677main_wrapper" style="padding:0 20px">
            
                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="background-clip:padding-box;border-collapse:collapse;border-radius:3px;color:#545454;font-family:'Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:20px;margin:0 auto 10px;width:100%">
                          <tbody>
            <tr>
                            <td valign="top">
                              <table cellpadding="0" cellspacing="0" border="0" class="m_8931798965495087677comment_body" style="background-clip:padding-box;border-bottom-style:none;border-collapse:collapse;width:100%">
                                <tbody>
            <tr>
                                  <td class="m_8931798965495087677content-td" style="background-clip:padding-box;background-color:white;border-radius:0 0 3px 3px;color:#525252;font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:22px;overflow:hidden;padding:40px 40px 30px" bgcolor="white">
                                    
            
                                    
                                      <div style="margin:0;padding:0;background-color:#ffffff"><div style="display:none;max-height:0px;overflow:hidden">Get DeFi and Metaverse access in a few taps.</div><div style="display:none;max-height:0px;overflow:hidden">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>
                
                <table style="table-layout:fixed;vertical-align:top;min-width:320px;border-spacing:0;border-collapse:collapse;background-color:#ffffff;width:100%" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#ffffff" valign="top">
                    <tbody>
                        <tr style="vertical-align:top" valign="top">
                            <td style="word-break:break-word;vertical-align:top" valign="top">
                                
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:10px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        <div class="m_6672540726590903157img-container" align="left" style="padding-right:0px;padding-left:0px">
                                                            
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img border="0" src="https://drive.google.com/uc?export=view&id=1UAlfXlLMrXPuSmkpYq06QKoiOXffMSyA" alt="VIIO" title="VIIO" style="text-decoration:none;height:auto;border:0;width:140px;max-width:100%;display:block" width="106" class="CToWUd"></a>
                                                            <div style="font-size:1px;line-height:10px">&nbsp;</div>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:0px;padding-bottom:0px;padding-right:15px;padding-left:15px">
                                                        
                                                        
                                                        <div style="color:#333332;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.2;padding-top:20px;padding-right:0px;padding-bottom:00px;padding-left:0px">
                                                            <div style="line-height:1.2;font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#333332">
                                                                <p style="margin:0;line-height:1.2;word-break:break-word;margin-top:0;margin-bottom:0"><strong><span style="font-size:46px"><span>Bienvenido</span></span></strong></p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="m_6672540726590903157img-container m_6672540726590903157big" align="center" style="padding-right:0px;padding-left:0px">
                                                            
                                                            <div style="font-size:1px;line-height:20px">&nbsp;</div><img align="center" border="0" src="https://ci4.googleusercontent.com/proxy/NcNI10ktuf3cG6RaAXgf2driZQP38-EoZQlaNTG1y9R5QAWMBF-su09u6LLDw8RpP8QZtfffoG_uIiC8CBpxZOT24-NleydTafqaXrUMYR7-ofp1N_PMcDXUi9zyx24=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-94825/crm-trade.png" style="text-decoration:none;height:auto;border:0;width:530px;max-width:100%;display:block" width="530" class="CToWUd a6T" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 649px; top: 343.26px;"><div id=":7eo" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Descargar el archivo adjunto " data-tooltip-class="a1V" data-tooltip="Descargar"><div class="akn"><div class="aSK J-J5-Ji aYr"></div></div></div></div>
                                                            
                                                        </div>
                                                        
                                                        <div style="color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#5c5b59">
                                                                <p style="margin:0;font-size:18px;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span style="font-size:18px">Hey,</span></p>
                                                                <p style="margin:0;font-size:18px;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">&nbsp;</p>
                                                                <p style="margin:0;font-size:18px;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span style="font-size:18px">Nothing should stand in the way of you buying and trading crypto. Not unreasonable fees, not over-complex platforms, not banks, not concerns about security. Nothing.</span></p>
                                                                <p style="margin:0;font-size:18px;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">&nbsp;</p>
                                                                <p style="margin:0;font-size:18px;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span style="font-size:18px">Simple, safe, affordable crypto trading without the B.S. It’s what we believe you want, and it’s what we’re committed to building.&nbsp;</span></p>
                                                                <p style="margin:0;font-size:18px;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">&nbsp;</p>
                                                                <p style="margin:0;font-size:18px;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span style="font-size:18px">Right now on <span class="il">Argent</span> you can trade over 30 tokens, as well as invest in baskets of tokens, giving you access to DeFi and the Metaverse from a single, easy-to-use account. You can also store, stake, and earn interest on your crypto, all in one place with <span class="il">Argent</span>.</span></p>
                                                                <p style="margin:0;font-size:18px;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">&nbsp;</p>
                                                                <p style="margin:0;font-size:18px;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span style="font-size:18px">You can trade in just a few taps, and the first step is funding your wallet.</span></p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div align="center" style="padding-top:20px;padding-right:0px;padding-bottom:10px;padding-left:0px">
                                                            <a href="https://viio.me/" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#0092ff;border-radius:24px;width:auto;width:auto;border-top:1px solid #0092ff;border-right:1px solid #0092ff;border-bottom:1px solid #0092ff;border-left:1px solid #0092ff;padding-top:16px;padding-bottom:16px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;text-align:center;word-break:keep-all" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><span style="padding-left:24px;padding-right:24px;font-size:16px;display:inline-block;letter-spacing:undefined"><span style="font-size:16px;line-height:1.2;word-break:break-word"><span style="font-size:16px;line-height:19px"><b>Fondea tu VIIO<b></span></span></span></a>
                                                            
                                                        </div>
                                                        
                                                        <div style="color:#333332;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:15px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;color:#333332">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><strong><span style="font-size:24px">Need help with something?</span></strong></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                        <div style="color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px">
                                                            <div style="line-height:1.5;font-size:12px;color:#5c5b59;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <p style="margin:0;line-height:1.5;word-break:break-word;font-size:18px;margin-top:0;margin-bottom:0"><span style="font-size:18px">We've got answers. check out our <a href="http://links.argent.net/e/c/eyJlbWFpbF9pZCI6IlJPbmtCUUFBQVhfSFIyWnJDaXh1TW02VExYWEtLZz09IiwiaHJlZiI6Imh0dHBzOi8vc3VwcG9ydC5hcmdlbnQueHl6L2hjL2VuLXVzIiwiaW50ZXJuYWwiOiJlOWU0MDUwOTkyZGIwMWMzOTgxMiIsImxpbmtfaWQiOjl9/d7449bc4425f815dbe9074a1e4b40cafad15c66b1f33434bac63d6e60cd4490c" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://links.argent.net/e/c/eyJlbWFpbF9pZCI6IlJPbmtCUUFBQVhfSFIyWnJDaXh1TW02VExYWEtLZz09IiwiaHJlZiI6Imh0dHBzOi8vc3VwcG9ydC5hcmdlbnQueHl6L2hjL2VuLXVzIiwiaW50ZXJuYWwiOiJlOWU0MDUwOTkyZGIwMWMzOTgxMiIsImxpbmtfaWQiOjl9/d7449bc4425f815dbe9074a1e4b40cafad15c66b1f33434bac63d6e60cd4490c&amp;source=gmail&amp;ust=1651946153400000&amp;usg=AOvVaw3W6P3dgMFYwlTpxyvP_mA_">help center</a>. You can also join our <a href="http://links.argent.net/e/c/eyJlbWFpbF9pZCI6IlJPbmtCUUFBQVhfSFIyWnJDaXh1TW02VExYWEtLZz09IiwiaHJlZiI6Imh0dHBzOi8vZGlzY29yZC5nZy9YcWc5Q3BGIiwiaW50ZXJuYWwiOiJlOWU0MDUwOTkyZGIwMWMzOTgxMiIsImxpbmtfaWQiOjR9/0cf0dd0e0e9e05ed5600ae9d13e503f15da20f5b2e563a42304e3e50b5574876" rel="noopener" style="text-decoration:none;color:#0092ff" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://links.argent.net/e/c/eyJlbWFpbF9pZCI6IlJPbmtCUUFBQVhfSFIyWnJDaXh1TW02VExYWEtLZz09IiwiaHJlZiI6Imh0dHBzOi8vZGlzY29yZC5nZy9YcWc5Q3BGIiwiaW50ZXJuYWwiOiJlOWU0MDUwOTkyZGIwMWMzOTgxMiIsImxpbmtfaWQiOjR9/0cf0dd0e0e9e05ed5600ae9d13e503f15da20f5b2e563a42304e3e50b5574876&amp;source=gmail&amp;ust=1651946153401000&amp;usg=AOvVaw3CCLeqmuyOPJo0ShVM9-gV">Discord</a>. Tweet us <a href="http://links.argent.net/e/c/eyJlbWFpbF9pZCI6IlJPbmtCUUFBQVhfSFIyWnJDaXh1TW02VExYWEtLZz09IiwiaHJlZiI6Imh0dHBzOi8vdHdpdHRlci5jb20vYXJnZW50SFEiLCJpbnRlcm5hbCI6ImU5ZTQwNTA5OTJkYjAxYzM5ODEyIiwibGlua19pZCI6NX0/9461003ee51c1b103516d2db7e18e9351e0d32e59f15fbec383bdf1737a358b4" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://links.argent.net/e/c/eyJlbWFpbF9pZCI6IlJPbmtCUUFBQVhfSFIyWnJDaXh1TW02VExYWEtLZz09IiwiaHJlZiI6Imh0dHBzOi8vdHdpdHRlci5jb20vYXJnZW50SFEiLCJpbnRlcm5hbCI6ImU5ZTQwNTA5OTJkYjAxYzM5ODEyIiwibGlua19pZCI6NX0/9461003ee51c1b103516d2db7e18e9351e0d32e59f15fbec383bdf1737a358b4&amp;source=gmail&amp;ust=1651946153401000&amp;usg=AOvVaw0rSj6Ao061SVS_CIgwTYA_">@argenthq</a> or email <a href="mailto:support@argent.xyz" title="support@argent.xyz" style="text-decoration:none;color:#0092ff" rel="noopener" target="_blank">support@<span class="il">argent</span>.xyz</a>.</span></p>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:5px;padding-bottom:5px;padding-right:15px;padding-left:15px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:0px;padding-bottom:10px;padding-left:0px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:1px solid #cdcdcd;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                            <tbody><tr style="vertical-align:top" valign="top">
                                                                <td style="word-break:break-word;vertical-align:top;padding-top:20px;padding-right:0px;padding-bottom:0px;padding-left:0px" valign="top">
                                                                    <table cellpadding="0" cellspacing="0" role="presentation" align="left" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse" valign="top">
                                                                        <tbody><tr style="vertical-align:top" valign="top">
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Twitter" src="https://ci5.googleusercontent.com/proxy/zFo3V8wu2ymA0nii8X2siWaFrJ_Jzh-84zVFjE7kpe69f6zlf9eJI078HlSkpVvqDI4d2IpIMXqdHS_krZeShlzZ_IiPYsMPM72yml57Equ_ND1xOHExWrH1SxZe=s0-d-e1-ft#https://userimg-bee.customeriomail.com/images/client-env-94825/twitter.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Instagram" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Feather-logos-instagram.svg/24px-Feather-logos-instagram.svg.png" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                            <td style="word-break:break-word;vertical-align:top;text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px" align="center" valign="top"><a href="https://viio.me/" style="outline:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://viio.me/"><img alt="Linkedin" src="https://upload.wikimedia.org/wikipedia/commons/7/76/Font_Awesome_5_brands_linkedin.svg" height="32" width="null" align="center" style="border:0" class="CToWUd"></a></td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                        
                                                        <div style="color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;line-height:1.5;padding-top:10px;padding-right:0px;padding-bottom:10px;padding-left:0px">
                                                            <div style="font-size:12px;line-height:1.5;color:#8f8e8c;font-family:Arial,Helvetica Neue,Helvetica,sans-serif">
                                                                <div style="font-size:14px;line-height:1.5;text-align:center">
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><span><span class="il">VIIO</span></span><br><span>Bogotá D.C., Colombia</span><br><br></p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0"><a style="text-decoration:none;color:#0092ff" href="http://links.argent.net/unsubscribe/ROnkBQAAAX_HR2ZrCixuMm6TLXXKKg==" rel="noopener" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://links.argent.net/unsubscribe/ROnkBQAAAX_HR2ZrCixuMm6TLXXKKg%3D%3D&amp;source=gmail&amp;ust=1651946153401000&amp;usg=AOvVaw2LpT0KxrFN7vHYB98XS_0z">Unsubscribe</a>&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">&nbsp;</p>
                                                                    <p style="margin:0;text-align:left;line-height:1.5;word-break:break-word;margin-top:0;margin-bottom:0">This message is for informational purposes only. It is not financial advice. <span class="il">Argent</span> is not a regulated financial services company and holds no authorization from the Financial Conduct Authority. Capital at risk. The price of crypto can be highly volatile.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                <div style="background-color:transparent">
                                    <div class="m_6672540726590903157block-grid" style="min-width:320px;max-width:560px;word-wrap:break-word;word-break:break-word;Margin:0 auto;background-color:transparent">
                                        <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                                            
                                            
                                            <div class="m_6672540726590903157col" style="min-width:320px;max-width:560px;display:table-cell;vertical-align:top;width:560px">
                                                <div class="m_6672540726590903157col_cont" style="width:100%!important">
                                                    
                                                    <div style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:20px;padding-bottom:20px;padding-right:0px;padding-left:0px">
                                                        
                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;min-width:100%" role="presentation" valign="top">
                                                            <tbody>
                                                                <tr style="vertical-align:top" valign="top">
                                                                    <td style="word-break:break-word;vertical-align:top;min-width:100%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px" valign="top">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;border-top:0px solid #bbbbbb;width:100%" align="center" role="presentation" valign="top">
                                                                            <tbody>
                                                                                <tr style="vertical-align:top" valign="top">
                                                                                    <td style="word-break:break-word;vertical-align:top" valign="top"><span></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;
		},
	};
}
