# 🎧 Áudios do convite

Coloque aqui os DOIS arquivos de áudio reais, **com exatamente estes nomes**:

| Arquivo | O que é | Comportamento no site |
|---|---|---|
| `musica.mp3` | Música animada de ~30s ("Hino da galera 🎶") | Player play/pause normal, pode tocar **quantas vezes quiser** |
| `pegadinha.mp3` | Recado/pegadinha do aniversariante | Toca **UMA única vez**; depois o botão vira 😂 e nunca mais toca (estado salvo no navegador) |

## Como substituir
1. Grave/exporte os áudios em **MP3** (recomendado < 1 MB cada para abrir rápido no zap).
2. Renomeie para `musica.mp3` e `pegadinha.mp3`.
3. Jogue os dois aqui dentro da pasta `audio/`, **sobrescrevendo** estes placeholders.
4. Pronto — o `index.html` já aponta para eles.

> Os arquivos atuais (`musica.mp3` e `pegadinha.mp3`) são **placeholders** e não tocam.
> O site foi feito para **não quebrar** se o áudio faltar ou estiver inválido: o player
> apenas mostra um aviso discreto.

## Dica sobre a pegadinha (importante!)
O "toca só 1x" é controlado por `localStorage` (chave `pv_niver_pegadinha_feita`) e é
**por navegador/dispositivo**. Se você testar no seu celular, a pegadinha já vai contar
como "usada" só pra você. Para testar de novo, abra numa aba anônima ou limpe os dados
do site. Cada convidado tem o seu próprio "uma vez".
