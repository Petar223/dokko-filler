"use strict";(self.webpackChunkdokko_filler=self.webpackChunkdokko_filler||[]).push([[6153],{35717:(e,n,t)=>{t.d(n,{L:()=>g});var s=t(31317),r=t(77232),a=t(80824),o=(t(13504),t(21859)),i=t(23095),c=t(73696),d=t(36118),u=t(29856);async function g({username:e,password:n,clientMetadata:t,config:g,tokenOrchestrator:m,authFlow:l,preferredChallenge:p}){const{userPoolId:y,userPoolClientId:E,userPoolEndpoint:S}=g,P=y?.split("_")[1]||"",h=await(0,a.H)(P),I={USERNAME:e,SRP_A:h.A.toString(16)};"USER_AUTH"===l&&p&&(I.PREFERRED_CHALLENGE=p);const f={AuthFlow:l,AuthParameters:I,ClientMetadata:t,ClientId:E,UserContextData:(0,r.d)({username:e,userPoolId:y,userPoolClientId:E})},A=(0,i.R)({endpointResolver:(0,c.o)({endpointOverride:S})}),R=await A({region:(0,d.J)(y),userAgentValue:(0,u.A)(s.BM.SignIn)},f),{ChallengeParameters:w,Session:v}=R,C=w?.USERNAME??e;return(0,o.d5)(C),"PASSWORD_VERIFIER"===R.ChallengeName?(0,o.iI)(o.ff,[n,w,t,v,h,g,m],C,m):R}},53548:(e,n,t)=>{t.d(n,{c:()=>l});var s=t(31317),r=t(77232),a=t(23095),o=t(88e3),i=t(73696),c=t(36118),d=t(29856),u=t(35717),g=t(75284),m=t(21859);async function l({username:e,clientMetadata:n,config:t,tokenOrchestrator:l,preferredChallenge:p,password:y,session:E}){const{userPoolId:S,userPoolClientId:P,userPoolEndpoint:h}=t,I=(0,r.d)({username:e,userPoolId:S,userPoolClientId:P}),f={USERNAME:e};if(p){if("PASSWORD_SRP"===p)return(0,g.M)(!!y,o.P.EmptySignInPassword),(0,u.L)({username:e,password:y,clientMetadata:n,config:t,tokenOrchestrator:l,authFlow:"USER_AUTH",preferredChallenge:p});"PASSWORD"===p&&((0,g.M)(!!y,o.P.EmptySignInPassword),f.PASSWORD=y),f.PREFERRED_CHALLENGE=p}const A={AuthFlow:"USER_AUTH",AuthParameters:f,ClientMetadata:n,ClientId:P,UserContextData:I};E&&(A.Session=E);const R=(0,a.R)({endpointResolver:(0,i.o)({endpointOverride:h})}),w=await R({region:(0,c.J)(S),userAgentValue:(0,d.A)(s.BM.SignIn)},A);return(0,m.d5)(e),w}},46300:(e,n,t)=>{t.d(n,{_:()=>O});var s,r=t(20126),a=t(57675),o=t(31317),i=t(21899),c=t(35781),d=t(62805),u=t(36118),g=t(73696),m=t(91401),l=t(75446),p=t(21859),y=t(59948),E=t(29856),S=t(16736),P=t(18594),h=t(87525);class I extends S.x{constructor(e){super(e),this.constructor=I,Object.setPrototypeOf(this,I.prototype)}}!function(e){e.PasskeyNotSupported="PasskeyNotSupported",e.PasskeyAlreadyExists="PasskeyAlreadyExists",e.InvalidPasskeyRegistrationOptions="InvalidPasskeyRegistrationOptions",e.InvalidPasskeyAuthenticationOptions="InvalidPasskeyAuthenticationOptions",e.RelyingPartyMismatch="RelyingPartyMismatch",e.PasskeyRegistrationFailed="PasskeyRegistrationFailed",e.PasskeyRetrievalFailed="PasskeyRetrievalFailed",e.PasskeyRegistrationCanceled="PasskeyRegistrationCanceled",e.PasskeyAuthenticationCanceled="PasskeyAuthenticationCanceled",e.PasskeyOperationAborted="PasskeyOperationAborted"}(s||(s={}));const f="Passkeys may not be supported on this device. Ensure your application is running in a secure context (HTTPS) and Web Authentication API is supported.",A="User may have canceled the ceremony or another interruption has occurred. Check underlying error for details.",R="Ensure your user pool is configured to support the WEB_AUTHN as an authentication factor.",w={[s.PasskeyNotSupported]:{message:"Passkeys may not be supported on this device.",recoverySuggestion:f},[s.InvalidPasskeyRegistrationOptions]:{message:"Invalid passkey registration options.",recoverySuggestion:R},[s.InvalidPasskeyAuthenticationOptions]:{message:"Invalid passkey authentication options.",recoverySuggestion:R},[s.PasskeyRegistrationFailed]:{message:"Device failed to create passkey.",recoverySuggestion:f},[s.PasskeyRetrievalFailed]:{message:"Device failed to retrieve passkey.",recoverySuggestion:"Passkeys may not be available on this device. Try an alternative authentication factor like PASSWORD, EMAIL_OTP, or SMS_OTP."},[s.PasskeyAlreadyExists]:{message:"Passkey already exists in authenticator.",recoverySuggestion:"Proceed with existing passkey or try again after deleting the credential."},[s.PasskeyRegistrationCanceled]:{message:"Passkey registration ceremony has been canceled.",recoverySuggestion:A},[s.PasskeyAuthenticationCanceled]:{message:"Passkey authentication ceremony has been canceled.",recoverySuggestion:A},[s.PasskeyOperationAborted]:{message:"Passkey operation has been aborted.",recoverySuggestion:A},[s.RelyingPartyMismatch]:{message:"Relying party does not match current domain.",recoverySuggestion:"Ensure relying party identifier matches current domain."}},v=(0,P.p)(w,I),C=e=>{if(e instanceof Error){if("AbortError"===e.name){const{message:n,recoverySuggestion:t}=w[s.PasskeyOperationAborted];return new I({name:s.PasskeyOperationAborted,message:n,recoverySuggestion:t,underlyingError:e})}if("SecurityError"===e.name){const{message:n,recoverySuggestion:t}=w[s.RelyingPartyMismatch];return new I({name:s.RelyingPartyMismatch,message:n,recoverySuggestion:t,underlyingError:e})}}return new I({name:h.m.Unknown,message:"An unknown error has occurred.",underlyingError:e})};var U=t(48104);var T=t(10577),N=t(91311);const k=async e=>{try{const n=(0,U.B)()&&window.isSecureContext&&"credentials"in navigator&&"function"==typeof window.PublicKeyCredential;v(n,s.PasskeyNotSupported);const t=(e=>{const n=(0,N.e)(e.challenge),t=(e.allowCredentials||[]).map((e=>({...e,id:(0,N.e)(e.id)})));return{...e,challenge:n,allowCredentials:t}})(e),r=await navigator.credentials.get({publicKey:t});return function(e){v(e&&e instanceof PublicKeyCredential&&e.response instanceof AuthenticatorAssertionResponse,s.PasskeyRetrievalFailed)}(r),(e=>{const n={clientDataJSON:(0,T.E)(e.response.clientDataJSON),authenticatorData:(0,T.E)(e.response.authenticatorData),signature:(0,T.E)(e.response.signature)};e.response.userHandle&&(n.userHandle=(0,T.E)(e.response.userHandle));const t={id:e.id,rawId:(0,T.E)(e.rawId),type:e.type,clientExtensionResults:e.getClientExtensionResults(),response:n};return e.authenticatorAttachment&&(t.authenticatorAttachment=e.authenticatorAttachment),t})(r)}catch(e){throw(e=>{if(e instanceof I)return e;if(e instanceof Error&&"NotAllowedError"===e.name){const{message:n,recoverySuggestion:t}=w[s.PasskeyAuthenticationCanceled];return new I({name:s.PasskeyAuthenticationCanceled,message:n,recoverySuggestion:t,underlyingError:e})}return C(e)})(e)}};async function O(e){const n=r.H.getConfig().Auth?.Cognito;(0,a.$y)(n);const{username:t,signInSession:S,signInDetails:P,challengeName:h}=y.c$.getState();if("WEB_AUTHN"!==h||!t)throw new c.l({name:i.nC.SignInException,message:"Unable to proceed due to invalid sign in state."});const{CREDENTIAL_REQUEST_OPTIONS:I}=e;v(!!I,s.InvalidPasskeyAuthenticationOptions);const f=await k(JSON.parse(I)),A=(0,d.H)({endpointResolver:(0,g.o)({endpointOverride:n.userPoolEndpoint})}),{ChallengeName:R,ChallengeParameters:w,AuthenticationResult:C,Session:U}=await A({region:(0,u.J)(n.userPoolId),userAgentValue:(0,E.A)(o.BM.ConfirmSignIn)},{ChallengeName:"WEB_AUTHN",ChallengeResponses:{USERNAME:t,CREDENTIAL:JSON.stringify(f)},ClientId:n.userPoolClientId,Session:S});if((0,y.wr)({signInSession:U,username:t,challengeName:R,signInDetails:P}),C)return await(0,m.i)({...C,username:t,NewDeviceMetadata:await(0,p.iG)({userPoolId:n.userPoolId,userPoolEndpoint:n.userPoolEndpoint,newDeviceMetadata:C.NewDeviceMetadata,accessToken:C.AccessToken}),signInDetails:P}),y.c$.dispatch({type:"RESET_STATE"}),await(0,l.Q)(),{isSignedIn:!0,nextStep:{signInStep:"DONE"}};if("WEB_AUTHN"===R)throw new c.l({name:i.nC.SignInException,message:"Sequential WEB_AUTHN challenges returned from underlying service cannot be handled."});return(0,p.q2)({challengeName:R,challengeParameters:w})}},1099:(e,n,t)=>{t.d(n,{z:()=>s});const s=(e=>{let n=e({active:!1},{type:"RESET"});return{getState:()=>n,dispatch:t=>{n=e(n,t)}}})(((e,n)=>{switch(n.type){case"SET_USERNAME":return{...e,username:n.value};case"SET_SESSION":return{...e,session:n.value};case"START":return{...e,active:!0};case"RESET":return{active:!1};default:return e}}))},59948:(e,n,t)=>{t.d(n,{c$:()=>u,jN:()=>o,wr:()=>g});var s=t(10612);const r="CognitoSignInState",a={username:`${r}.username`,challengeName:`${r}.challengeName`,signInSession:`${r}.signInSession`,expiry:`${r}.expiry`},o=()=>{u.dispatch({type:"RESET_STATE"})},i=()=>{for(const e of Object.values(a))s.pR.removeItem(e)},c=()=>({username:void 0,challengeName:void 0,signInSession:void 0}),d=()=>{const e=s.pR.getItem(a.expiry);if(!e||Number(e)<=Date.now())return i(),c();return{username:s.pR.getItem(a.username)??void 0,challengeName:s.pR.getItem(a.challengeName)??void 0,signInSession:s.pR.getItem(a.signInSession)??void 0}},u=(e=>{let n=e(c(),{type:"SET_INITIAL_STATE"});return{getState:()=>n,dispatch:t=>{n=e(n,t)}}})(((e,n)=>{switch(n.type){case"SET_SIGN_IN_SESSION":return m({signInSession:n.value}),{...e,signInSession:n.value};case"SET_SIGN_IN_STATE":return m(n.value),{...n.value};case"SET_CHALLENGE_NAME":return m({challengeName:n.value}),{...e,challengeName:n.value};case"SET_USERNAME":return m({username:n.value}),{...e,username:n.value};case"SET_INITIAL_STATE":return d();case"RESET_STATE":return i(),c();default:return e}}));function g(e){u.dispatch({type:"SET_SIGN_IN_STATE",value:e})}const m=({challengeName:e,signInSession:n,username:t})=>{t&&s.pR.setItem(a.username,t),e&&s.pR.setItem(a.challengeName,e),n&&(s.pR.setItem(a.signInSession,n),s.pR.setItem(a.expiry,String(Date.now()+18e4)))}},21899:(e,n,t)=>{t.d(n,{nC:()=>o,ut:()=>r});var s=t(88e3);const r={[s.P.EmptyChallengeResponse]:{message:"challengeResponse is required to confirmSignIn"},[s.P.EmptyConfirmResetPasswordUsername]:{message:"username is required to confirmResetPassword"},[s.P.EmptyConfirmSignUpCode]:{message:"code is required to confirmSignUp"},[s.P.EmptyConfirmSignUpUsername]:{message:"username is required to confirmSignUp"},[s.P.EmptyConfirmResetPasswordConfirmationCode]:{message:"confirmationCode is required to confirmResetPassword"},[s.P.EmptyConfirmResetPasswordNewPassword]:{message:"newPassword is required to confirmResetPassword"},[s.P.EmptyResendSignUpCodeUsername]:{message:"username is required to confirmSignUp"},[s.P.EmptyResetPasswordUsername]:{message:"username is required to resetPassword"},[s.P.EmptySignInPassword]:{message:"password is required to signIn"},[s.P.EmptySignInUsername]:{message:"username is required to signIn"},[s.P.EmptySignUpPassword]:{message:"password is required to signUp"},[s.P.EmptySignUpUsername]:{message:"username is required to signUp"},[s.P.CustomAuthSignInPassword]:{message:"A password is not needed when signing in with CUSTOM_WITHOUT_SRP",recoverySuggestion:"Do not include a password in your signIn call."},[s.P.IncorrectMFAMethod]:{message:"Incorrect MFA method was chosen. It should be either SMS, TOTP, or EMAIL",recoverySuggestion:"Try to pass SMS, TOTP, or EMAIL as the challengeResponse"},[s.P.EmptyVerifyTOTPSetupCode]:{message:"code is required to verifyTotpSetup"},[s.P.EmptyUpdatePassword]:{message:"oldPassword and newPassword are required to changePassword"},[s.P.EmptyConfirmUserAttributeCode]:{message:"confirmation code is required to confirmUserAttribute"}};var a,o;!function(e){e.DEFAULT_MSG="Authentication Error",e.EMPTY_EMAIL="Email cannot be empty",e.EMPTY_PHONE="Phone number cannot be empty",e.EMPTY_USERNAME="Username cannot be empty",e.INVALID_USERNAME="The username should either be a string or one of the sign in types",e.EMPTY_PASSWORD="Password cannot be empty",e.EMPTY_CODE="Confirmation code cannot be empty",e.SIGN_UP_ERROR="Error creating account",e.NO_MFA="No valid MFA method provided",e.INVALID_MFA="Invalid MFA type",e.EMPTY_CHALLENGE="Challenge response cannot be empty",e.NO_USER_SESSION="Failed to get the session because the user is empty",e.NETWORK_ERROR="Network Error",e.DEVICE_CONFIG="Device tracking has not been configured in this User Pool",e.AUTOSIGNIN_ERROR="Please use your credentials to sign in",e.OAUTH_ERROR="Couldn't finish OAuth flow, check your User Pool HostedUI settings"}(a||(a={})),function(e){e.SignInException="SignInException",e.OAuthSignInError="OAuthSignInException"}(o||(o={}))},35781:(e,n,t)=>{t.d(n,{l:()=>r});var s=t(16736);class r extends s.x{constructor(e){super(e),this.constructor=r,Object.setPrototypeOf(this,r.prototype)}}},80602:(e,n,t)=>{t.d(n,{$6:()=>u,A0:()=>i,Cs:()=>m,RW:()=>c,jK:()=>d,kM:()=>o,mh:()=>g,yA:()=>l,z0:()=>a,zz:()=>r});var s=t(35781);const r="UserUnAuthenticatedException",a="UserAlreadyAuthenticatedException",o="DeviceMetadataNotFoundException",i="AutoSignInException",c=new s.l({name:"InvalidRedirectException",message:"signInRedirect or signOutRedirect had an invalid format or was not found.",recoverySuggestion:"Please make sure the signIn/Out redirect in your oauth config is valid."}),d=(new s.l({name:"InvalidAppSchemeException",message:"A valid non-http app scheme was not found in the config.",recoverySuggestion:"Please make sure a valid custom app scheme is present in the config."}),new s.l({name:"InvalidPreferredRedirectUrlException",message:"The given preferredRedirectUrl does not match any items in the redirectSignOutUrls array from the config.",recoverySuggestion:"Please make sure a matching preferredRedirectUrl is provided."})),u=new s.l({name:"InvalidOriginException",message:"redirect is coming from a different origin. The oauth flow needs to be initiated from the same origin",recoverySuggestion:"Please call signInWithRedirect from the same origin."}),g="OAuthSignOutException",m="TokenRefreshException",l="UnexpectedSignInInterruptionException"},88e3:(e,n,t)=>{var s;t.d(n,{P:()=>s}),function(e){e.EmptySignInUsername="EmptySignInUsername",e.EmptySignInPassword="EmptySignInPassword",e.CustomAuthSignInPassword="CustomAuthSignInPassword",e.EmptySignUpUsername="EmptySignUpUsername",e.EmptySignUpPassword="EmptySignUpPassword",e.EmptyConfirmSignUpUsername="EmptyConfirmSignUpUsername",e.EmptyConfirmSignUpCode="EmptyConfirmSignUpCode",e.EmptyResendSignUpCodeUsername="EmptyresendSignUpCodeUsername",e.EmptyChallengeResponse="EmptyChallengeResponse",e.EmptyConfirmResetPasswordUsername="EmptyConfirmResetPasswordUsername",e.EmptyConfirmResetPasswordNewPassword="EmptyConfirmResetPasswordNewPassword",e.EmptyConfirmResetPasswordConfirmationCode="EmptyConfirmResetPasswordConfirmationCode",e.EmptyResetPasswordUsername="EmptyResetPasswordUsername",e.EmptyVerifyTOTPSetupCode="EmptyVerifyTOTPSetupCode",e.EmptyConfirmUserAttributeCode="EmptyConfirmUserAttributeCode",e.IncorrectMFAMethod="IncorrectMFAMethod",e.EmptyUpdatePassword="EmptyUpdatePassword"}(s||(s={}))},20434:(e,n,t)=>{t.d(n,{e:()=>a});var s=t(87525),r=t(35781);function a(e){if(!e||"Error"===e.name||e instanceof TypeError)throw new r.l({name:s.m.Unknown,message:"An unknown error has occurred.",underlyingError:e})}},75284:(e,n,t)=>{t.d(n,{M:()=>a});var s=t(21899),r=t(35781);function a(e,n){const{message:t,recoverySuggestion:a}=s.ut[n];if(!e)throw new r.l({name:n,message:t,recoverySuggestion:a})}}}]);