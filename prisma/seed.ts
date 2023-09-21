import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.prompt.deleteMany();

  await prisma.prompt.create({
    data: {
      title: "Título do YouTube",
      template: `Seu papel é gerar três títulos para um video do YouTube
      Abaixo você receberá uma transcrição desse video, use essa transcrição para gerar os títulos.
      Abaixo você também receberá uma lista de títulos, use essa lista como referência para os títulos a serem gerados.

      Os títulos devem ter no máximo 60 caracteres.

      Os títulos devem ser chamativos e atrativos para maximizar cliques.

      Retorne APENAS os tres títulos em formato de lista como no exemplo abaixo:

      '''
      - Título 1
      - Título 2
      - Título 3
      '''

      transcrição:
      '''
      {transcription}
      '''`.trim(),
    },
  });

  await prisma.prompt.create({
    data: {
      title: "Descrição YouTube",
      template:
        `Seu papel é gerar um descrição sucinta  para um video do YouTube

      Abaixo você receberá uma transcrição desse video, use essa transcrição para gerar os títulos.
    
      A descrição deve possuir mo máximo 80 palavras em primeira pessoa contendo os pontos principais do vídeo.

    Use palavras chamativas e que cativam a atenção de quem está lendo.

     Além disso, no final da descrição inclua uma lista de 3 até 10 hashtags em letras minúsculas contendo palavras-chave do vídeo 

     O retorno deve seguir o seguinte formato:

      '''
      Descrição

      #hashtags1 #hashtags2 #hashtags3 
      '''

      transcrição:
      '''
      {transcription}
      '''`.trim(),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
