# Sistema de Reserva de Passagens Aéreas entre LCCs Brasileiras

Este projeto propõe uma solução distribuída para integração de companhias aéreas de baixo custo (LCCs) no Brasil, permitindo a oferta colaborativa de voos e ampliando a disponibilidade de passagens para os passageiros.

## Introdução

Para maximizar o lucro e otimizar o uso dos assentos, três companhias aéreas de baixo custo (LCCs) brasileiras decidiram compartilhar trechos de voos, permitindo que clientes reservem passagens em uma única compra. Cada companhia possui seu próprio servidor centralizado do sistema VENDEPASS, mas desenvolvemos uma API RESTful que conecta esses servidores, facilitando o acesso às rotas e assentos disponíveis. Essa arquitetura distribuída e descentralizada elimina a necessidade de um servidor central e permite a expansão futura para outras LCCs. Com contêineres Docker, garantimos escalabilidade e portabilidade, enquanto um sistema de reserva sincronizado assegura a prioridade dos assentos na primeira compra. O resultado é uma plataforma integrada que amplia as opções de rotas e melhora a experiência do usuário.

## Arquitetura

A arquitetura do sistema é distribuída e descentralizada, com cada LCC operando seu próprio servidor que utiliza APIs RESTful para comunicação direta entre si. A interface para os usuários finais é uma aplicação web desenvolvida em React com Material-UI, garantindo uma experiência de usuário otimizada.

![Arquitetura do Sistema](images/diagrama_de_arquitetura_de_sistema.jpg)   
*Figura 1*: Diagrama da arquitetura do sistema, ilustrando a interação entre clientes e servidores das LCCs.

## Desenvolvimento dos Componentes

### Servidores das LCCs
- **Tecnologia**: Node.js com Express.js
- **Funcionalidades**:
  - Gerenciamento de voos e reservas
  - Comunicação com parceiros
  - APIs protegidas por autenticação via chave de API

### Cliente Web
- **Tecnologia**: React com Material-UI
- **Funcionalidades**:
  - Pesquisa e reserva de voos
  - Consumo das APIs das LCCs

### Containerização
- **Ferramentas**: Docker e Docker Compose
- **Objetivo**: Garantir portabilidade e facilitar a implantação dos serviços

## Comunicação entre os Componentes

### APIs RESTful

Endpoints principais:
- **Entre LCCs**:
  - `GET /flights/partner/flights`: Compartilhamento de voos entre parceiros
  - `POST /reservations`: Criação de reservas
- **Entre Cliente e Servidor**:
  - `GET /flights/allflights`: Listagem consolidada de voos
  - `POST /reservations`: Reserva de voos

### Segurança
- Autenticação via chave de API para parceiros
- Middleware de autenticação nos servidores

## Gerenciamento de Rotas e Reservas

### Agregação de Voos
- Os voos dos parceiros são integrados, exibindo uma lista unificada para o usuário final.

### Controle de Concorrência
- Implementado um controle de disponibilidade antes de confirmar a reserva.

## Ferramentas e Tecnologias

- **Backend**: Node.js, Express.js, Axios
- **Frontend**: React.js, Material-UI, Axios
- **Containerização**: Docker, Docker Compose
- **Controle de Versão**: Git e GitHub

## Testes Realizados

- **Funcionais**: Testes de reserva em voos próprios e de parceiros.
- **Desconexão de Servidores**: Verificação da continuidade do serviço em caso de falhas.
- **Concorrência**: Testes para garantir integridade das reservas.

## Avaliação da Solução

- **Vantagens**:
  - Arquitetura descentralizada
  - Escalabilidade e portabilidade via Docker
- **Limitações**:
  - Controle de concorrência a ser melhorado
  - Falta de roteamento complexo
- **Desempenho**: Resultados satisfatórios em testes locais

![Fluxo de Reserva](images/fluxo_reserva.jpg)  
*Figura 2*: Fluxo de interação durante o processo de reserva.

## Conclusão

A solução desenvolvida permite a colaboração entre LCCs brasileiras, ampliando a oferta de voos sem necessidade de centralização. É uma base sólida para futuras melhorias, como mecanismos mais robustos de sincronização e algoritmos de roteamento avançado.

## Referências

1. [Material-UI](https://mui.com/pt/)
2. [Docker Documentation](https://docs.docker.com/)
3. [Node.js Documentation](https://nodejs.org/en/docs/)
4. [React Documentation](https://reactjs.org/docs/getting-started.html)
5. Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*

---

