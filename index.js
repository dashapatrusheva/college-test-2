#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path"
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
const rows = content.split('\r\n');
const data = rows.slice(1).map((row) =>
  row.split('|').slice(1, 8).map(element => element.trim()));
//1.задание
console.log('Количество видов существ' + ' ' + String(data.length));
//2.задание
const strenghts = data.map((row) => row[1]);
const creatures = data.map((row) => row[0]);
const prices = data.map((row) => row[6]);
const troops = data.map((row) => row[3]);
const maxStrenghts = Math.max(...strenghts);
const indexMaxStrenghts = strenghts.indexOf(String(maxStrenghts));
console.log(`Стоимость 10 самых сильных существ: ${prices[indexMaxStrenghts] * 10}`);
//ищем вторых по силе
const strenghts2 = strenghts.slice(0, indexMaxStrenghts).concat(strenghts.slice(indexMaxStrenghts + 1));
const maxStrenghts2 = Math.max(...strenghts2);
const indexMaxStrenghts2 = strenghts.indexOf(String(maxStrenghts2));
console.log(`Стоимость 20 вторых по силе существ: ${prices[indexMaxStrenghts2] * 20}`);
//3.задание
const weights = data.map((row) => row[5]);
//самый толстый
const weightsMax = Math.max(...weights);
const indexWeightsMax = weights.indexOf(String(weightsMax));
//самый худой
const weightsMin = Math.min(...weights);
const indexWeightsMin = weights.indexOf(String(weightsMin));
console.log(`Стоимость найма отряда самых толстых существ: ${Number(troops[indexWeightsMax]) * Number(prices[indexWeightsMax])}`);
console.log(`Стоимость найма отряда самых худых существ: ${Number(troops[indexWeightsMin]) * Number(prices[indexWeightsMin])}`);
//4.задание
//константа, которая будет хранить сколько стоит одна единица силы
const priceForStrength = data.map((row) => {
  const index = data.indexOf(row);
  return Math.floor(Number(prices[index]) / Number(strenghts[index]));
});
const bestPrice = Math.min(...priceForStrength);
const worstPrice = Math.max(...priceForStrength);
const profitableCreature = creatures[priceForStrength.indexOf(bestPrice)];
const nonProfitableCreature = creatures[priceForStrength.indexOf(worstPrice)];
console.log(`Самый выгодный юнит по соотношению цены и силы: ${profitableCreature}`);
console.log(`Самый невыгодный юнит по соотношению цены и силы: ${nonProfitableCreature}`);
//5.задание
const bestPriceForCreature = prices[priceForStrength.indexOf(bestPrice)];
const quantity = 10000 / bestPriceForCreature;
console.log(`Самая сильная армия за 10000: ${quantity} ${creatures[priceForStrength.indexOf(bestPrice)]}`);
// END
