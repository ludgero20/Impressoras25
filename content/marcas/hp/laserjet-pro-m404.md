---
title: "HP LaserJet Pro M404: Instalação em Rede"
slug: "hp-laserjet-pro-m404"
brand: "HP"
brandSlug: "hp"
readTime: "12 min"
difficulty: "Avançado"
isPopular: false
---

## Passo 1: Preparação da Impressora Laser

Desembale a HP LaserJet Pro M404 e remova todos os materiais de proteção. Abra a tampa frontal e retire o cartucho de toner da embalagem. Agite-o suavemente de um lado para o outro e insira-o firmemente até travar.

## Passo 2: Conectar à Rede Ethernet

Para melhor desempenho em ambiente corporativo, conecte um cabo Ethernet (RJ45) da impressora ao seu roteador ou switch de rede. Aguarde cerca de 30 segundos para a impressora obter um endereço IP automaticamente.

## Passo 3: Imprimir Página de Configuração

No painel de controle da impressora, pressione e segure o botão "Cancelar" por 3 segundos para imprimir a página de configuração de rede. Esta página mostrará o endereço IP atribuído à impressora - anote-o.

## Passo 4: Acessar Interface Web da Impressora

Em qualquer computador na mesma rede, abra um navegador e digite o endereço IP da impressora na barra de endereços. Você acessará o HP Embedded Web Server (EWS). Faça login com as credenciais padrão (geralmente admin/senha vazia).

## Passo 5: Configurar Endereço IP Fixo (Recomendado)

No EWS, vá em "Rede" > "IPv4" e configure um IP fixo (ex: 192.168.1.100) que não conflite com outros dispositivos. Isso evita que o IP mude e cause problemas de conexão futuros.

## Passo 6: Baixar Universal Print Driver

Acesse hp.com/drivers e procure por "LaserJet Pro M404". Baixe o "HP Universal Print Driver" para gerenciar múltiplas impressoras HP de uma vez, ou o driver específico do modelo para recursos completos.

## Passo 7: Adicionar Impressora via IP

No Windows, vá em Configurações > Impressoras > Adicionar impressora. Escolha "Adicionar por endereço TCP/IP". Digite o IP fixo que você configurou, deixe o Windows detectar a impressora automaticamente e siga o assistente.

## Passo 8: Configurar Recursos Avançados

Nas propriedades da impressora, configure impressão frente e verso automática, qualidade de impressão, e gerenciamento de papel. Para compartilhar em rede Windows, habilite o compartilhamento nas propriedades e defina um nome amigável.
