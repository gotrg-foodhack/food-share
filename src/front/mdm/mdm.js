/* @flow */

import { values } from 'ramda'

import forAll from './combo/forAll.jpg'
import forTwo from './combo/forTwo.jpg'
import zaNashih from './combo/zaNashih.jpg'

import newYorkCheesecake from './desserts/newYorkCheesecake.jpg'
import cookiesChocolate from './desserts/cookiesChocolate.jpg'
import cookiesVanilla from './desserts/cookiesVanilla.jpg'
import maffinChocolate from './desserts/maffinChocolate.jpg'
import maffinVanilla from './desserts/maffinVanilla.jpg'

import cheeseburgerPizza from './pizza/cheeseburgerPizza.jpg'
import dodo from './pizza/dodo.jpg'
import margarita from './pizza/margarita.jpg'
import mexican from './pizza/mexican.jpg'
import pepperoniWithLove from './pizza/pepperoniWithLove.jpg'

import potato from './snacks/potato.jpg'
import wings from './snacks/wings.jpg'
import rolls from './snacks/rolls.jpg'
import greek from './snacks/greek.jpg'
import cesar from './snacks/cesar.jpg'

import cocaCola from './drinks/cocaCola.jpg'
import fanta from './drinks/fanta.jpg'
import sprite from './drinks/sprite.jpg'

import montesodi from './alcohol/montesodi.png'

const combo = {}
const pizza = {}
const snacks = {}
const desserts = {}
const drinks = {}
const alcohol = {}

combo.forAll = {
  id: 'forAll',
  name: 'На всех',
  price: 2995,
  photo: forAll,
  category: combo,
}

combo.forTwo = {
  id: 'forTwo',
  name: 'Для двох',
  price: 995,
  photo: forTwo,
  category: combo,
}

combo.zaNashih = {
  id: 'zaNashih',
  name: 'За наших!',
  price: 1995,
  photo: zaNashih,
  category: combo,
}

pizza.cheeseburgerPizza = {
  id: 'cheeseburgerPizza',
  name: 'Чизбургер-пицца',
  price: 575,
  photo: cheeseburgerPizza,
  category: pizza,
}

pizza.pepperoniWithLove = {
  id: 'pepperoniWithLove',
  name: 'Пепперони с любовью',
  price: 595,
  photo: pepperoniWithLove,
  category: pizza,
}

pizza.dodo = {
  id: 'dodo',
  name: 'Додо',
  price: 596,
  photo: dodo,
  category: pizza,
}

pizza.margarita = {
  id: 'margarita',
  name: 'Маргарита',
  price: 475,
  photo: margarita,
  category: pizza,
}

pizza.mexican = {
  id: 'mexican',
  name: 'Мексикано',
  price: 575,
  photo: mexican,
  category: pizza,
}

snacks.potato = {
  id: 'potato',
  name: 'Картофель из печи',
  price: 160,
  photo: potato,
  category: snacks,
}

snacks.wings = {
  id: 'wings',
  name: 'Крылья «Барбекю», 10 шт',
  price: 350,
  photo: wings,
  category: snacks,
}

snacks.rolls = {
  id: 'newYorkCheasecake',
  name: 'Рулетики с сыром, 8 шт',
  price: 145,
  photo: rolls,
  category: snacks,
}

snacks.greek = {
  id: 'greek',
  name: 'Салат Греческий',
  price: 170,
  photo: greek,
  category: snacks,
}

snacks.cesar = {
  id: 'cesar',
  name: 'Салат Цезарь',
  price: 120,
  photo: cesar,
  category: snacks,
}

desserts.newYorkCheesecake = {
  id: 'newYorkCheesecake',
  name: 'Чизкейк Нью-Йорк',
  price: 120,
  photo: newYorkCheesecake,
  category: desserts,
}

desserts.cookiesChocolate = {
  id: 'cookiesChocolate',
  name: 'Кукис шоколадный',
  price: 50,
  photo: cookiesChocolate,
  category: desserts,
}

desserts.cookiesVanilla = {
  id: 'cookiesVanilla',
  name: 'Кукис шоколадный',
  price: 50,
  photo: cookiesVanilla,
  category: desserts,
}

desserts.maffinChocolate = {
  id: 'maffinChocolate',
  name: 'Маффин шоколадный',
  price: 75,
  photo: maffinChocolate,
  category: desserts,
}

desserts.maffinVanilla = {
  id: 'maffinVanilla',
  name: 'Маффин ванильный',
  price: 75,
  photo: maffinVanilla,
  category: desserts,
}

drinks.cocaCola = {
  id: 'cocaCola',
  name: 'Coca-Cola',
  price: 135,
  photo: cocaCola,
  category: drinks,
}

drinks.fanta = {
  id: 'fanta',
  name: 'Fanta',
  price: 135,
  photo: fanta,
  category: drinks,
}

drinks.sprite = {
  id: 'sprite',
  name: 'Sprite',
  price: 135,
  photo: sprite,
  category: drinks,
}

alcohol.montesodi = {
  id: 'wine',
  name: 'Вино Montesodi, 0.75 л., 2012 г.',
  price: 5290,
  photo: montesodi,
  category: alcohol,
}

export const menu = {
  combo: {
    id: ('combo': 'combo'),
    name: 'Комбо',
    products: combo,
  },
  pizza: {
    id: ('pizza': 'pizza'),
    name: 'Пицца',
    products: pizza,
  },
  snacks: {
    id: ('snacks': 'snacks'),
    name: 'Закуски',
    products: snacks,
  },
  desserts: {
    id: ('desserts': 'desserts'),
    name: 'Десерты',
    products: desserts,
  },
  drinks: {
    id: ('drinks': 'drinks'),
    name: 'Напитки',
    products: drinks,
  },
  alcohol: {
    id: ('alcohol': 'alcohol'),
    name: 'Алкоголь',
    products: alcohol,
    hidden: true,
  },
}

export const products = values(menu)
  .map(category => category.products)
  .reduce((scope, next) => ({ ...scope, ...next }))
