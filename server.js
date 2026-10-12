const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

// Carrega o arquivo OpenAPI para visualização no Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 40 registos da série histórica do trabalho
const dadosBanco = [
  { id_venda: 1, data_do_pagamento: "2023-08-10", valor_do_pagamento: 5000, codigo_imovel: 1001, tipo_imovel: "Apartamento" },
  { id_venda: 1, data_do_pagamento: "2023-09-10", valor_do_pagamento: 4500, codigo_imovel: 1001, tipo_imovel: "Apartamento" },
  { id_venda: 1, data_do_pagamento: "2023-10-10", valor_do_pagamento: 6000, codigo_imovel: 1001, tipo_imovel: "Apartamento" },
  { id_venda: 1, data_do_pagamento: "2023-11-10", valor_do_pagamento: 5500, codigo_imovel: 1001, tipo_imovel: "Apartamento" },
  { id_venda: 1, data_do_pagamento: "2023-12-10", valor_do_pagamento: 4000, codigo_imovel: 1001, tipo_imovel: "Apartamento" },
  { id_venda: 1, data_do_pagamento: "2024-01-10", valor_do_pagamento: 5000, codigo_imovel: 1001, tipo_imovel: "Apartamento" },
  { id_venda: 2, data_do_pagamento: "2023-08-15", valor_do_pagamento: 7000, codigo_imovel: 1002, tipo_imovel: "Apartamento" },
  { id_venda: 2, data_do_pagamento: "2023-09-15", valor_do_pagamento: 6500, codigo_imovel: 1002, tipo_imovel: "Apartamento" },
  { id_venda: 2, data_do_pagamento: "2023-10-15", valor_do_pagamento: 8000, codigo_imovel: 1002, tipo_imovel: "Apartamento" },
  { id_venda: 2, data_do_pagamento: "2023-11-15", valor_do_pagamento: 7500, codigo_imovel: 1002, tipo_imovel: "Apartamento" },
  { id_venda: 2, data_do_pagamento: "2023-12-15", valor_do_pagamento: 6000, codigo_imovel: 1002, tipo_imovel: "Apartamento" },
  { id_venda: 3, data_do_pagamento: "2023-08-05", valor_do_pagamento: 9000, codigo_imovel: 1003, tipo_imovel: "Casa" },
  { id_venda: 3, data_do_pagamento: "2023-09-05", valor_do_pagamento: 8500, codigo_imovel: 1003, tipo_imovel: "Casa" },
  { id_venda: 3, data_do_pagamento: "2023-10-05", valor_do_pagamento: 9500, codigo_imovel: 1003, tipo_imovel: "Casa" },
  { id_venda: 3, data_do_pagamento: "2023-11-05", valor_do_pagamento: 8000, codigo_imovel: 1003, tipo_imovel: "Casa" },
  { id_venda: 3, data_do_pagamento: "2023-12-05", valor_do_pagamento: 10000, codigo_imovel: 1003, tipo_imovel: "Casa" },
  { id_venda: 4, data_do_pagamento: "2023-08-20", valor_do_pagamento: 11000, codigo_imovel: 1004, tipo_imovel: "Casa" },
  { id_venda: 4, data_do_pagamento: "2023-09-20", valor_do_pagamento: 10500, codigo_imovel: 1004, tipo_imovel: "Casa" },
  { id_venda: 4, data_do_pagamento: "2023-10-20", valor_do_pagamento: 12000, codigo_imovel: 1004, tipo_imovel: "Casa" },
  { id_venda: 4, data_do_pagamento: "2023-11-20", valor_do_pagamento: 10000, codigo_imovel: 1004, tipo_imovel: "Casa" },
  { id_venda: 4, data_do_pagamento: "2023-12-20", valor_do_pagamento: 11500, codigo_imovel: 1004, tipo_imovel: "Casa" },
  { id_venda: 5, data_do_pagamento: "2023-08-08", valor_do_pagamento: 6000, codigo_imovel: 1005, tipo_imovel: "Terreno" },
  { id_venda: 5, data_do_pagamento: "2023-09-08", valor_do_pagamento: 7000, codigo_imovel: 1005, tipo_imovel: "Terreno" },
  { id_venda: 5, data_do_pagamento: "2023-10-08", valor_do_pagamento: 6500, codigo_imovel: 1005, tipo_imovel: "Terreno" },
  { id_venda: 5, data_do_pagamento: "2023-11-08", valor_do_pagamento: 7500, codigo_imovel: 1005, tipo_imovel: "Terreno" },
  { id_venda: 5, data_do_pagamento: "2023-12-08", valor_do_pagamento: 8000, codigo_imovel: 1005, tipo_imovel: "Terreno" },
  { id_venda: 6, data_do_pagamento: "2023-09-12", valor_do_pagamento: 8000, codigo_imovel: 1006, tipo_imovel: "Terreno" },
  { id_venda: 6, data_do_pagamento: "2023-10-12", valor_do_pagamento: 8500, codigo_imovel: 1006, tipo_imovel: "Terreno" },
  { id_venda: 6, data_do_pagamento: "2023-11-12", valor_do_pagamento: 9000, codigo_imovel: 1006, tipo_imovel: "Terreno" },
  { id_venda: 6, data_do_pagamento: "2023-12-12", valor_do_pagamento: 8500, codigo_imovel: 1006, tipo_imovel: "Terreno" },
  { id_venda: 6, data_do_pagamento: "2024-01-12", valor_do_pagamento: 10000, codigo_imovel: 1006, tipo_imovel: "Terreno" },
  { id_venda: 7, data_do_pagamento: "2023-09-18", valor_do_pagamento: 5000, codigo_imovel: 1007, tipo_imovel: "Sala Comercial" },
  { id_venda: 7, data_do_pagamento: "2023-10-18", valor_do_pagamento: 5500, codigo_imovel: 1007, tipo_imovel: "Sala Comercial" },
  { id_venda: 7, data_do_pagamento: "2023-11-18", valor_do_pagamento: 6000, codigo_imovel: 1007, tipo_imovel: "Sala Comercial" },
  { id_venda: 7, data_do_pagamento: "2023-12-18", valor_do_pagamento: 6500, codigo_imovel: 1007, tipo_imovel: "Sala Comercial" },
  { id_venda: 7, data_do_pagamento: "2024-01-18", valor_do_pagamento: 7000, codigo_imovel: 1007, tipo_imovel: "Sala Comercial" },
  { id_venda: 8, data_do_pagamento: "2023-10-25", valor_do_pagamento: 9000, codigo_imovel: 1008, tipo_imovel: "Sala Comercial" },
  { id_venda: 8, data_do_pagamento: "2023-11-25", valor_do_pagamento: 9500, codigo_imovel: 1008, tipo_imovel: "Sala Comercial" },
  { id_venda: 8, data_do_pagamento: "2023-12-25", valor_do_pagamento: 10000, codigo_imovel: 1008, tipo_imovel: "Sala Comercial" },
  { id_venda: 8, data_do_pagamento: "2024-01-25", valor_do_pagamento: 10500, codigo_imovel: 1008, tipo_imovel: "Sala Comercial" }
];

// Item A: Acumulado por imóvel
app.get('/api/vendas/acumulado-por-imovel', (req, res) => {
  const resultado = {};
  dadosBanco.forEach(item => {
    const id = item.codigo_imovel;
    const valor = Number(item.valor_do_pagamento) || 0;
    resultado[id] = (resultado[id] || 0) + valor;
  });
  res.json(resultado);
});

// Item B: Total por período (mês/ano)
app.get('/api/vendas/total-por-periodo', (req, res) => {
  const acumulado = dadosBanco.reduce((acc, item) => {
    const [ano, mes] = item.data_do_pagamento.split('-');
    const periodo = `${mes}/${ano}`;
    const valor = Number(item.valor_do_pagamento) || 0;
    acc[periodo] = (acc[periodo] || 0) + valor;
    return acc;
  }, {});

  const resultado = Object.keys(acumulado).map(periodo => ({
    mes_ano: periodo,
    total_vendas: acumulado[periodo]
  }));
  res.json(resultado);
});

// Item C: Percentual por tipo de imóvel
app.get('/api/vendas/percentual-por-tipo', (req, res) => {
  const totalGeral = dadosBanco.reduce((total, item) => total + Number(item.valor_do_pagamento), 0);
  const totaisPorTipo = {};

  dadosBanco.forEach(item => {
    const tipo = item.tipo_imovel;
    const valor = Number(item.valor_do_pagamento) || 0;
    totaisPorTipo[tipo] = (totaisPorTipo[tipo] || 0) + valor;
  });

  const resultado = {};
  for (const tipo in totaisPorTipo) {
    const perc = ((totaisPorTipo[tipo] / totalGeral) * 100).toFixed(2);
    resultado[tipo] = `${perc}%`;
  }
  res.json(resultado);
});

// Arranca o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Interface Swagger: http://localhost:${PORT}/api-docs`);
});