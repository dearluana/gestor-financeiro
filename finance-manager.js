import readlineSync from 'readline-sync';
import chalk from 'chalk';
import fs from 'fs';

// Caminho do arquivo JSON
const arquivoDividas = 'dividas.json';

// Função para calcular quantos dias faltam até o vencimento
function calcularDiasRestantes(dataVencimento) {
  const [dia, mes, ano] = dataVencimento.split('/').map(Number);
  const dataVenc = new Date(ano, mes - 1, dia);
  const hoje = new Date();

  dataVenc.setHours(0, 0, 0, 0);
  hoje.setHours(0, 0, 0, 0);

  const diffTempo = dataVenc.getTime() - hoje.getTime();
  const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));

  return diffDias;
}

// Função principal
function main() {
  console.log(chalk.cyanBright('\n=== GESTOR FINANCEIRO ===\n'));

  let dividas = [];
  let adicionarMais = true;

  while (adicionarMais) {
    const banco = readlineSync.question('Digite o nome do banco: ');
    const valor = parseFloat(readlineSync.question('Digite o valor da dívida: R$ '));
    const vencimento = readlineSync.question('Digite a data de vencimento (dd/mm/aaaa): ');

    const diasRestantes = calcularDiasRestantes(vencimento);

    dividas.push({
      banco,
      valor,
      vencimento,
      diasRestantes,
    });

    const resposta = readlineSync.question('\nDeseja adicionar outra dívida? (s/n): ');
    adicionarMais = resposta.toLowerCase() === 's';
    console.log();
  }

  // Salvar no arquivo JSON
  fs.writeFileSync(arquivoDividas, JSON.stringify(dividas, null, 2));

  console.log(chalk.cyanBright('\n=== RESUMO DAS DÍVIDAS ===\n'));
  let total = 0;

  dividas.forEach((divida, index) => {
    total += divida.valor;

    let statusMensagem;
    if (divida.diasRestantes < 0) {
      statusMensagem = chalk.redBright(`⚠️  Já venceu há ${Math.abs(divida.diasRestantes)} dias!`);
    } else if (divida.diasRestantes === 0) {
      statusMensagem = chalk.yellowBright('🟡 Vence hoje!');
    } else {
      statusMensagem = chalk.greenBright(`✅ Faltam ${divida.diasRestantes} dias para o vencimento.`);
    }

    console.log(
      chalk.whiteBright(
        `${index + 1}. Banco: ${divida.banco}\n   Valor: R$ ${divida.valor.toFixed(2)}\n   Vencimento: ${divida.vencimento}\n   ${statusMensagem}\n`
      )
    );
  });

  console.log(chalk.magentaBright(`💰 Total de dívidas: R$ ${total.toFixed(2)}\n`));

  // === PLANEJADOR DE PAGAMENTOS ===
  console.log(chalk.cyanBright('=== PLANO DE PAGAMENTOS RECOMENDADO ===\n'));

  const dividasOrdenadas = [...dividas].sort((a, b) => a.diasRestantes - b.diasRestantes);

  dividasOrdenadas.forEach((divida, index) => {
    let prioridadeMsg;

    if (divida.diasRestantes < 0) {
      prioridadeMsg = chalk.redBright('⚠️ URGENTE: JÁ VENCEU!');
    } else if (divida.diasRestantes === 0) {
      prioridadeMsg = chalk.yellowBright('🟡 PAGAR HOJE!');
    } else if (divida.diasRestantes <= 5) {
      prioridadeMsg = chalk.yellowBright('⚠️ ALTA PRIORIDADE: vence em poucos dias.');
    } else {
      prioridadeMsg = chalk.greenBright('✅ Pode esperar um pouco.');
    }

    console.log(
      chalk.whiteBright(
        `${index + 1}. ${divida.banco} — R$ ${divida.valor.toFixed(2)} — Vencimento: ${divida.vencimento}\n   ${prioridadeMsg}\n`
      )
    );
  });

  console.log(chalk.cyanBright('✅ Toma vergonha na cara e vai pagar suas contas caloteiro(a)\n'));
}

// Executa o programa
main();