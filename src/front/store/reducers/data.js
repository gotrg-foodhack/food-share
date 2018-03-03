export default [
  {
    id: 'order1',
    owner: '111',
    members: {
      '111': {
        approve: false,
        readyToPaySum: 550,
        paid: false,
      },
      '222': {
        approve: true,
        readyToPaySum: 250,
        paid: false,
      },
      '333': {
        approve: false,
        readyToPaySum: 300,
        paid: false,
      },
    },
    cartItems: {
      '111': {
        pizza: 1,
        burger: 1,
      },
      '222': {
        salad: 1,
      },
    },
    chat: [
      {
        eventType: 'message',
        login: 'Вася',
        userId: '111',
        text: 'Всем привет в этом чатике',
      },
      {
        eventType: 'message',
        login: 'Вася',
        userId: '111',
        text: 'Хочу заказать пиццу и бургер',
      },
      {
        eventType: 'add to cart',
        login: 'Вася',
        userId: '111',
        productId: 'pizza',
      },
      {
        eventType: 'add to cart',
        login: 'Вася',
        userId: '111',
        productId: 'burger',
      },
      {
        eventType: 'set pay sum',
        login: 'Вася',
        userId: '111',
        paySum: 550,
      },
      {
        eventType: 'message',
        login: 'Петя',
        userId: '222',
        text: 'Привет. Я закажу салат.',
      },
      {
        eventType: 'add to cart',
        login: 'Петя',
        userId: '222',
        productId: 'salad',
      },
      {
        eventType: 'set pay sum',
        login: 'Петя',
        userId: '222',
        paySum: 250,
      },
      {
        eventType: 'message',
        login: 'Саша',
        userId: '333',
        text: 'Привет. А я буду пол-пиццы',
      },
      {
        eventType: 'set pay sum',
        login: 'Саша',
        userId: '333',
        paySum: 300,
      },
    ],
  },
  {
    id: 'order2',
    owner: '444',
    members: {
      '444': {
        approve: true,
        readyToPaySum: 250,
        paid: false,
      },
      '555': {
        approve: true,
        readyToPaySum: 125,
        paid: false,
      },
      Настя: {
        approve: true,
        readyToPaySum: 125,
        paid: false,
      },
    },
    cartItems: {
      '444': {
        pizza: 1,
      },
    },
    chat: [
      {
        eventType: 'message',
        userId: '444',
        login: 'Галя',
        text:
          'Девчонки, делим одну пиццу на всех. Я буду половину, сейчас закину деньги.',
      },
      {
        eventType: 'add to cart',
        userId: '444',
        login: 'Галя',
        productId: 'pizza',
      },
      {
        eventType: 'set pay sum',
        userId: '444',
        login: 'Галя',
        paySum: 250,
      },
      {
        eventType: 'message',
        userId: '555',
        login: 'Вика',
        text: 'Привет. Я буду четвертинку. Сейчас закину денег и аппрувну.',
      },
      {
        eventType: 'set pay sum',
        userId: '555',
        login: 'Вика',
        paySum: 125,
      },
      {
        eventType: 'message',
        userId: '666',
        login: 'Настя',
        text: 'Привет всем. Я съем остальное :)',
      },
      {
        eventType: 'set pay sum',
        userId: '666',
        login: 'Настя',
        paySum: 125,
      },
    ],
  },
  {
    id: 'order3',
    owner: '777',
    members: {
      '777': {
        approve: true,
        readyToPaySum: 1000,
        paid: false,
      },
      '888': {
        approve: false,
        readyToPaySum: 400,
        paid: false,
      },
      '999': {
        approve: false,
        readyToPaySum: 400,
        paid: false,
      },
    },
    cartItems: {
      '777': {
        pizza: 2,
        burger: 2,
      },
      '888': {
        salad: 1,
        burger: 1,
      },
      '999': {
        cocaCola: 4,
      },
    },
    chat: [
      {
        eventType: 'message',
        userId: '777',
        login: 'Витя',
        text: 'Остановите, пожалуйста',
      },
      {
        eventType: 'message',
        userId: '888',
        login: 'Надо',
        text: 'А что такое.',
      },
      {
        eventType: 'message',
        userId: 'Выйти',
        text: 'Мне кажется, ему стоит выйти',
      },
      {
        eventType: 'add to cart',
        userId: '777',
        login: 'Витя',
        productId: 'pizza',
      },
      {
        eventType: 'add to cart',
        userId: '777',
        login: 'Витя',
        productId: 'pizza',
      },
      {
        eventType: 'add to cart',
        userId: '777',
        login: 'Витя',
        productId: 'burger',
      },
      {
        eventType: 'add to cart',
        userId: '777',
        login: 'Витя',
        productId: 'burger',
      },
      {
        eventType: 'set pay sum',
        userId: '777',
        login: 'Витя',
        paySum: 1000,
      },
      {
        eventType: 'message',
        userId: '888',
        login: 'Надо',
        text: 'Надеюсь, он сможет',
      },
      {
        eventType: 'set pay sum',
        userId: '888',
        login: 'Надо',
        paySum: 400,
      },
      {
        eventType: 'message',
        userId: '999',
        login: 'Выйти',
        text: 'Да куда он денется',
      },
      {
        eventType: 'set pay sum',
        userId: '999',
        login: 'Выйти',
        paySum: 400,
      },
    ],
  },
]
