# Guia de Contribuição

### 1. Configure seu ambiente de desenvolvimento

### 🚨🚨🚨 Atenção 🚨🚨🚨

A configuração do ambiente React Native é muito trabalhosa, pode ser muito frustrante e dar muito problema. Qualquer coisa que enfrente, fale com a gente pelo WhatsApp, Facebook etc.

Preparad@? Let's do it!

Recomendo que siga a documentação oficial do RN para configurar seu ambiente (abaixo), mas se preferir um tutorial em PT-BR: [Tutorial RN Rocketseat](https://docs.rocketseat.dev/ambiente-react-native/introducao)

- Acesse https://facebook.github.io/react-native/docs/getting-started
- Selecione "React Native CLI Quickstart". **NÃO siga o "Expo CLI Quickstart"**
- Siga os passos para seu OS e para Android/iOS
- OBS: Só é possível configurar para iOS no MacOS
- Depois de concluir a instalação você deve ter instalado:
  - NodeJS com NPM
  - Watchman
  - JDK
  - React Native CLI
  - Android Studio

- Instale o [Yarn](https://yarnpkg.com/pt-BR/docs/install)

### 2. Fork

Neste passo você irá criar uma cópia do repositório oficial. Ele vai ser importante para que você possa enviar seus pull requests depois.

- Acesse o repositório oficial: https://github.com/centralufabc/ufabccentral
- Clique em "Fork", na parte superior direita
- Pronto! Agora você tem uma cópia do repositório só sua!

### 3. Clonar o repositório

Agora você vai baixar o código do projeto para seu computador.

- Instale o [Git](https://git-scm.com/) no seu computador, caso ainda não tenha feito isso.
- Acesse o SEU repositório, que você acabou de fazer o Fork. A url vai ser https://github.com/seu_username/ufabccentral
- Clique no botão verde "Clone or download" e copie a url que vai ser https://github.com/seu_username/ufabccentral.git
- Abra seu terminal (CMD no Windows) e navegue até uma pasta onde queira salvar a pasta que vai conter o projeto ([Tutorial básico de como usar o terminal](https://tutorial.djangogirls.org/en/intro_to_command_line/#introduction-to-the-command-line-interface))
- Digite os seguintes comandos (não se esqueça de usar a url que você copiou antes!)

```
git clone https://github.com/seu_username/ufabccentral.git
```

- Uma pasta foi criada com o nome "ufabccentral"
- Entre na pasta

```
cd ufabccentral
```

- Rode o seguinte comando para baixar os node_modules
```
yarn install
```

- Existe um problema com a versão do React Native que estamos usando.
Para arrumá-lo siga os passos descritos [nesta issue](https://github.com/centralufabc/ufabccentral/issues/10#issue-472205955), em "Fix temporário".
Este problema será arrumado quando um upgrade da versão do React Native for feito no projeto.

- Nice! Agora você está pront@ para rodar o projeto!

### 4. Rodando o projeto

#### Android
Com o emulador Android rodando, execute:
```
react-native run-android
```

### iOS

```
react-native run-ios
```

Agora que o ambiente já está configurado e o projeto está rodando, vamos ver como vai funcionar o workflow de contribuição.

### 5. Escolhendo uma funcionalidade

Escolha uma funcionalidade da [lista](https://docs.google.com/document/d/1SKSl1pL0EYm1HPG2CUs3u2_tC4mQm4Q5DfuHcLs3usk/edit?usp=sharing) (ou faça uma sugestão) e crie uma Issue no repositório ORIGINAL, especificando qual é a funcionalidade. Você pode colocar suas ideias de como planeja implementá-la e nós vamos dar o máximo de detalhes sobre ela. Você pode acompanhar tudo que está acontecendo no projeto [neste board](https://github.com/orgs/centralufabc/projects/1?fullscreen=true).

Para criar uma Issue, vá no repositório original e depois Issues -> New Issue

Quanto mais documentada a funcionalidade estiver na Issue, melhor. Vamos tentar colocar o máximo de detalhes lá para orientar o desenvolvimento.

Quando estiver pront@ para começar a desenvolver, basta indicar na issue que está trabalhando nisso (assim ninguém mais pega a mesma funcionalidade para fazer)

Neste exemplo vou criar um card na tab Home para direcionar para o app [UFABC Library](https://play.google.com/store/apps/details?id=com.nintersoft.bibliotecaufabc):

![](https://i.imgur.com/cfbsYjV.png)

### 6. Config inicial do Git

🚨🚨🚨 Atenção: Isto precisa ser feito *uma única vez*  🚨🚨🚨

Usamos o Gitflow workflow para lidar com as releases, features etc...

Você pode ler mais sobre este workflow [aqui](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

Essa ilustração resume o funcionamento do Gitflow:

![](https://wac-cdn.atlassian.com/dam/jcr:61ccc620-5249-4338-be66-94d563f2843c/05%20(2).svg?cdnVersion=483)

(Crédito da imagem: [tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) da Atlassian)

Vamos configurar umas coisas:

Na pasta do projeto rode:

```
git remote add upstream https://github.com/centralufabc/ufabccentral.git

git fetch upstream

git checkout -b develop upstream/develop
```

Pronto! Agora você está no branch `develop`, de desenvolvimento.
Todos os branches de funcionalidade que você criar em seguida devem sair deste branch `develop`

### 7. Desenvolvendo a funcionalidade

Na pasta do seu projeto, estando no branch `develop`, crie um novo branch com o nome da funcionalidade. Vou chamar esta de "feature_link-app-biblioteca". Sempre coloque "feature_" na frente do nome da feature.

```
git checkout -b feature_link-app-biblioteca
```

Agora basta codar sua funcionalidade!

CODE FORREST, **CODE**!!!

Conforme for desenvolvendo, faça commits regularmente (a cada pequeno passo que você completar):

```
//Adicionando os arquivos modificados
git add *
//Fazendo o commit
git commit -m "Descrição do commit"
```

Suba as mudanças deste novo branch para seu repositório no GitHub:

```
//Apenas a primeira vez que for realizar o push deste novo branch
//***Nao esqueca de substituir o nome do branch***
git push --set-upstream origin feature_link-app-biblioteca

//Depois da primeira vez basta rodar
git push
```

Depois de ter completado a funcionalidade e subido todas as alterações para seu branch, basta fazer o Pull Request.

### 8. Pull Request

- Entre no seu repositório e clique em "New pull request"

![](https://i.imgur.com/u7O0bf2.png)

- Selecione o branch da funcionalidade na drop-down list

![](https://i.imgur.com/GQAtsC7.png)

- Clique em "Create pull request"

![](https://i.imgur.com/TeCBeKb.png)

- Preencha o título e a descrição do Pull Request (coloque o número da Issue da funcionalidade na descrição) e clique em "Create pull request"

![](https://i.imgur.com/dkgt61t.png)

Pronto! O Pull Request foi enviado!

Agora é só esperar que nós vamos avaliar seu código, enviar feedback se necessário e fazer um merge quando estiver tudo certinho!

### 9. Continuando a contribuir

Para começar a trabalhar em novas funcionalidades, você só precisa:

- Voltar para o branch develop no seu repositório local:

```
git checkout develop
```

- Atualizar o seu repositório com o repositório original:

```
git fetch upstream

git pull
```

- Atualizar sua pasta node_modules:
```
yarn
```

- Atualizar o seu remote:

```
git push
```

Pronto! Agora basta voltar para o passo 5 (escolher outra funcionalidade, criar outro branch etc...)

Qualquer dúvida ou sugestão sobre este guia, entre em contato conosco ou crie uma issue no repositório.

Agradecemos por contribuir com o projeto!
