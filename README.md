# DDD (Domain-driven Design)

Design dirigido à domínio

## Domínio

Área de entendimento onde todas as pessoas envolvidas no desenvolvimento de software possuem um conhecimento muito semelhante.

- Domain Experts (pessoas que entendem a fundo a problemática que estamos resolvendo com o software. Pessoas que estão no dia-a-dia lidando com as situações as quais você está criando um software para auxiliar);
   - Conversas com vários experts de domínio antes de iniciar o desenvolvimento.
- Linguagem ubíqua (linguagem comum entre todas as partes envolvidas);

- Agregados
- Value Objects
- Eventos de domínio
- Subdomínios (Bounded Contexts)
- Entidades
- Casos de uso



# Conceitos
- Aggregates: conjuntos de entidades que são manipuladas ao mesmo tempo, que juntas compõe o agregado. Por exemplo, pedido e items do pedido. Quando um pedido vai ser salvo os items do pedido são salvos também no mesmo instante

- Watched Lists: É um pattern que permite identificar de forma isolada os items contidos em uma lista para que possa efetuar as ações de criação, exclusão e atualização. Nesse array há os dados dos items, mas também informação que identifica se é um item novo, um item que foi removido ou excluído.

# Subdomínios
- Core: O que dá dinheiro. Em um e-commerce seria compra, catálogo, pagamento, entrega, etc. É tudo que não pode parar.
- Supporting: Dá suporte para o core funcionar. Por exemplo, em um e-commerce seria estoque.
- Generic: É necessário, porém não tão importantes. Por exemplo, em um e-commerce seria notificação ao cliente, promoções, chat, etc.

## Obs.: Não pode haver dependencia de código entre os subdomínios. Precisa haver comunicação entre eles.

