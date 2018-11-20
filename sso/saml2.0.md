# SAML2.0 协议

## npm install passport-saml

## saml 协议的核心 | IDP 和 SP 通过用户的浏览器的重定向访问来实现交换数据

## SAML 过程

* SP 向 IDP 发出 SAML 身份认证请求消息，请求 IDP 鉴别用户身份
* IDP 向用户索要用户名和口令，并进行验证
* 验证无误，向 SP 返回 SAML 身份应答信息，应答里还有些额外信息确保应答不被篡改和伪造

## SAMLRequest 

* 发送重定向 url 一般为 `https://idp.uni.nl/sso?SAMLRequest=fVLLTuswEN0j8Q…c%3D` | 完整验证信息需要经过压缩和编码
* AuthnRequest: 
```xml
  <AuthnRequest  ID="kfcn...lfki" 
    Version="2.0" 
    IssueInstant="2013-02-05T08:28:50Z" 
    ProtocolBinding="urn:oasis:names:tc:SAML: 2.0:bindings:HTTP-POST" 
    ProviderName="google.com" 
    AssertionConsumerServiceURL="https://www.google.com/a/uni.nl/acs">
    <Issuer>google.com</Issuer>
    <NameIDPolicy  AllowCreate="true"
      Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"/>;
  </AuthnRequest>;
```
```json
{
  "AuthnRequest": {
    "ID": "kfcn...lfki",
    "Version": "2.0",
    "IssueInstant": "2013-02-05T08:28:50Z",
    "ProtocolBinding": "urn:oasis:names:tc:SAML: 2.0:bindings:HTTP-POST",
    "ProviderName": "google.com",
    "AssertionConsumerServiceURL": "https://www.google.com/a/uni.nl/acs",
    "Issuer": "google.com",
    "NameIDPolicy": {
      "AllowCreate": "true",
      "Format": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified"
    },
  }
}
```
* Response:
```xml
  <Response Version="2.0" 
  IssueInstant="2013-02-05T08:29:00Z" 
  Destination="https://www.google.com/a/my.uni.nl/acs" InResponseTo="kfcn...lfki">   
  <Issuer>https://idp.uni.nl/</Issuer>   
  <Status>
    <StatusCode   
      Value="urn:oasis:names:tc:SAML:2.0:status:Success"/> 
  </Status> 
  <Assertion Version="2.0" 
    IssueInstant="2013-02-05T08:29:00Z">     
    <Issuer>https://idp.uni.nl/</Issuer>   
    <Subject> 
      <NameID>alice</NameID>   
      <SubjectConfirmation ...> 
        <SubjectConfirmationData 
          NotOnOrAfter="2013-02-05T08:34:00Z"   
          Recipient="https://www.google.com/a/my.uni.nl/acs" InResponseTo="kfcn...lfki"/>  
        </SubjectConfirmation> 
    </Subject> 
    <Conditions NotBefore="2013-02-05T08:28:30Z" NotOnOrAfter="2013-02-05T08:34:00Z"> 
    </Conditions> 
    <AuthnStatement 
      AuthnInstant="2013-02-05T08:29:00Z" 
      SessionNotOnOrAfter="2013-02-05T16:29:00Z"> 
    </AuthnStatement> 
  </Assertion>
 </Response>
```
```json
{
  "Response": {
    "Version": "2.0",
    "IssueInstant": "2013-02-05T08:29:00Z",
    "Destination": "https://www.google.com/a/my.uni.nl/acs",
    "InResponseTo": "kfcn...lfki",
    "Issuer": "https://idp.uni.nl/",
    "Status": {
      "StatusCode": { "-Value": "urn:oasis:names:tc:SAML:2.0:status:Success" }
    },
    "Assertion": {
      "Version": "2.0",
      "IssueInstant": "2013-02-05T08:29:00Z",
      "Issuer": "https://idp.uni.nl/",
      "Subject": {
        "NameID": "alice",
        "SubjectConfirmation": {
          "SubjectConfirmationData": {
            "NotOnOrAfter": "2013-02-05T08:34:00Z",
            "Recipient": "https://www.google.com/a/my.uni.nl/acs",
            "InResponseTo": "kfcn...lfki"
          }
        }
      },
      "Conditions": {
        "NotBefore": "2013-02-05T08:28:30Z",
        "NotOnOrAfter": "2013-02-05T08:34:00Z"
      },
      "AuthnStatement": {
        "AuthnInstant": "2013-02-05T08:29:00Z",
        "SessionNotOnOrAfter": "2013-02-05T16:29:00Z"
      }
    }
  }
}
```