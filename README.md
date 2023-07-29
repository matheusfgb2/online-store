# :construction: README em construção ! :construction:
<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
# Projeto Online Store
## Descrição do Projeto
Este projeto foi começado durante o curso da Trybe no módulo de front-end e consistiu no desenvolvimento de uma aplicação web simplificada que permite aos usuários buscar produtos através da API do Mercado Livre. Eles podem adicionar itens ao carrinho de compras, ajustar as quantidades e visualizar detalhes completos, incluindo descrições, imagens e informações técnicas. Além disso, a aplicação exibe avaliações de outros clientes para auxiliar nas decisões de compra. Os dados são temporariamente armazenados no LocalStorage, garantindo que o carrinho mantenha as informações mesmo após fechar a página. Em resumo, o projeto oferece uma experiência interativa para explorar e gerenciar produtos de forma prática e eficiente.

Após o desenvolvimento dos requisitos obrigatórios e bônus, dei andamento ao projeto adicionando as seguintes funcionalidades:
- Exibição da quantidade de produtos restantes, tanto na home quanto na página de detalhes do produto.
- Desativar o botão de adicionar o produto ao carrinho quando a quantidade restante dele chega a 0.
- Exibição, na página de Checkout, do valor unitário e total de cada produto, quando adicionado mais de um mesmo item.
- Exibição, na página de detalhes de um produto, de todas as imagens disponíveis do mesmo, além da implementação de imagem modal (ao clicar na miniatura de uma imagem, esta é expandida em uma janela).

**Estilização CSS ainda em desenvolvimento.**

## Habilidades Utilizadas

- React JS
- Roteamento (React Router)
- Ciclos de Vida de Componentes de Classe
- Manipulação de Estado e Eventos
- Consumo de API (Mercado Livre)
- Armazenamento Local (LocalStorage)
- Validação de Formulários
- Ordenação e Filtragem de Dados


## Instalação e Uso

1. Faça o clone do repositório: ```git clone git@github.com:matheusfgb2/online-store.git```

2. Navegue até o diretório do projeto: ```cd online-store```

3. Execute o comando `npm i` para fazer as instalações necessárias 

4. Execute o comando `npm start` para rodar o projeto localmente ```(http://localhost:3000)```
