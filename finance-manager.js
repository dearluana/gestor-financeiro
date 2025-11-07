const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const debts = [];

function askDebt() {
  rl.question("Digite o nome da dívida (ou 'sair' para encerrar): ", (name) => {
    if (name.toLowerCase() === "sair") {
      showSummary();
      rl.close();
      return;
    }

    rl.question("Digite o valor da dívida (R$): ", (value) => {
      const amount = parseFloat(value.replace(",", "."));
      if (isNaN(amount)) {
        console.log("❌ Valor inválido! Tente novamente.\n");
      } else {
        debts.push({ name, amount });
        console.log(`✅ ${name} adicionada com sucesso!\n`);
      }
      askDebt();
    });
  });
}

function showSummary() {
  console.log("\n📋 Resumo das Dívidas:");
  debts.forEach((d, i) => console.log(`${i + 1}. ${d.name} — R$ ${d.amount.toFixed(2)}`));

  const total = debts.reduce((sum, d) => sum + d.amount, 0);
  console.log(`\n💰 Total Devido: R$ ${total.toFixed(2)}\n`);
  console.log("✅ Toma vergonha na cara e vai pagar suas contas!");
}

console.log("=== Gestor Financeiro Pessoal ===");
askDebt();