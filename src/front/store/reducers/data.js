export default [
  {
    id: 'order1',
    owner: 'Вася',
    members: {
      Вася: {
        approve: false,
        readyToPaySum: 550,
        paid: false,
      },
      Петя: {
        approve: true,
        readyToPaySum: 250,
        paid: false,
      },
      Саша: {
        approve: false,
        readyToPaySum: 300,
        paid: false,
      },
    },
    cartItems: {
      Вася: {
        pizza: 1,
        burger: 1,
      },
      Петя: {
        salad: 1,
      },
    },
    chat: [
      {
        eventType: 'message',
        userId: 'Вася',
        text: 'Всем привет в этом чатике',
      },
      {
        eventType: 'message',
        userId: 'Вася',
        text: 'Привет. Я закажу салат.',
      },
      {
        eventType: 'add to cart',
        userId: 'Петя',
        productId: 'salad',
      },
      {
        eventType: 'set pay sum',
        userId: 'Петя',
        paySum: 250,
      },
    ],
  },
  {
    id: 'order2',
    owner: 'Галя',
    members: {
      Галя: {
        approve: true,
        readyToPaySum: 250,
        paid: false,
      },
      Вика: {
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
      Галя: {
        pizza: 1,
      },
    },
    chat: [
      {
        eventType: 'message',
        userId: 'Галя',
        text:
          'Девчонки, делим одну пиццу на всех. Я буду половину, сейчас закину деньги.',
      },
      {
        eventType: 'add to cart',
        userId: 'Галя',
        productId: 'pizza',
      },
      {
        eventType: 'set pay sum',
        userId: 'Галя',
        paySum: 250,
      },
      {
        eventType: 'message',
        userId: 'Вика',
        text: 'Привет. Я буду четвертинку. Сейчас закину денег и аппрувну.',
      },
      {
        eventType: 'set pay sum',
        userId: 'Вика',
        paySum: 125,
      },
      {
        eventType: 'message',
        userId: 'Настя',
        text: 'Привет всем. Я съем остальное :)',
      },
      {
        eventType: 'set pay sum',
        userId: 'Настя',
        paySum: 125,
      },
    ],
  },
  {
    id: 'order3',
    owner: 'Витя',
    members: {
      Витя: {
        approve: true,
        readyToPaySum: 1000,
        paid: false,
      },
      Надо: {
        approve: false,
        readyToPaySum: 400,
        paid: false,
      },
      Выйти: {
        approve: false,
        readyToPaySum: 400,
        paid: false,
      },
    },
    cartItems: {
      Витя: {
        pizza: 2,
        burger: 2,
      },
      Надо: {
        salad: 1,
        burger: 1,
      },
      Выйти: {
        cocaCola: 4,
      },
    },
    chat: [
      {
        eventType: 'message',
        userId: 'Витя',
        text: 'Остановите, пожалуйста',
      },
      {
        eventType: 'message',
        userId: 'Надо',
        text: 'А что такое.',
      },
      {
        eventType: 'message',
        userId: 'Выйти',
        text: 'Мне кажется, ему стоит выйти',
      },
      {
        eventType: 'add to cart',
        userId: 'Витя',
        productId: 'pizza',
      },
      {
        eventType: 'add to cart',
        userId: 'Витя',
        productId: 'pizza',
      },
      {
        eventType: 'add to cart',
        userId: 'Витя',
        productId: 'burger',
      },
      {
        eventType: 'add to cart',
        userId: 'Витя',
        productId: 'burger',
      },
      {
        eventType: 'set pay sum',
        userId: 'Витя',
        paySum: 1000,
      },
      {
        eventType: 'message',
        userId: 'Надо',
        text: 'Надеюсь, он сможет',
      },
      {
        eventType: 'set pay sum',
        userId: 'Надо',
        paySum: 400,
      },
      {
        eventType: 'message',
        userId: 'Выйти',
        text: 'Да куда он денется',
      },
      {
        eventType: 'set pay sum',
        userId: 'Выйти',
        paySum: 400,
      },
    ],
  },
]
