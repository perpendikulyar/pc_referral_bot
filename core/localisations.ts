interface Locale {
    welcome: string;
    welcomeMore: string;
    generatorExplain: string;
    generatorExplainMore: string;
    generatorMoreBtn: string;
    moreAboutLabel: string;
    moreAboutUrl: string;
    getLink: string;
    helpText: string;
    unknown: string;
    cmdGenerate: string;
    cmdHelp: string;
    getInvite: string;
    getAnotherInvite: string;
    register: string;
    getQr: string;
    qrReady: string;
    stories: string;
    storiesHelp: string;
    genKeyboard: string;
    orgPoll: string;
    orgPollLink: string;
    orgPollLabel: string;
    results: string;
}

const localeRU: Locale = {
    welcome: `Привет! \n 
Это бот Реферальной программы летнего ProductCamp 2026! \n  
Участвуй и получи шанс стать амбассадором ProductCamp и внеси свой ценный вклад в развитие продуктового сообщества!`,
    welcomeMore: `За подробностями переходи по ссылке 👇\n`,
    generatorExplain: `Это твоя персональная ссылка\n
Пригласи на ProductCamp своих коллег и друзей, мы уверены, среди них будет много заинтересованных 🙏`,
    generatorExplainMore: `😎 *Вот несколько классных рекомендаций, чтобы все получилось:*\n
❗️ Во-первых, для успеха тебе нужно *минимум 30 баоллов* для попадания в лидерборд. За участников, которые регистрируются на офлайн-формат начисляется 3 балла, за онлайн — 1 балл.\nЭто могут продакт-менеджеры, аналитики, продукт-маркетинг менеджеры, UX- и продуктовые дизайнеры, проджект-менеджеры, CPO, CEO и все, чья жизнь связана с разработкой продуктов.\n
🤓 Поделись ссылкой с коллегами и друзьями из индустрии — со своей компанией на кэмпе точно будет веселее!\n
👩‍🎤 У тебя наверняка есть чатики продактов, маркетологов, дизайнеров и других диджитал-профессионалов — закинь ссылку туда, им точно будет интересно. Можешь отправить даже в чат кэмпа 😜\n
🔳 Сгенери QR-код и добавь его на свою аватарку или используй в офлайне\n
🧑‍🚀 *Продвинутый левел:* попроси эйчаров в своей компании рассказать о кэмпе профильным сотрудникам и поделись с ними ссылкой \n
🎥 Запости сторисы с приглашением на кэмп и размести там ссылку\n
☝️ И не останавливайся на каком-то одном пункте — используй как можно больше способов, чтобы добиться успеха!\n
🫶 А еще мы сделали генератор инвайтов — воспользуйся им, и получишь прикольный текст приглашения 💅`,
    generatorMoreBtn: '🤔 Где размещать?',
    moreAboutLabel: `Подробнее о программе`,
    moreAboutUrl: `https://productcamp.ru/refprogram_autumn_2025?utm_medium=bot&utm_source=pc_referral_bot&utm_campaign=info`,
    getLink: '🎯 Получить новую ссылку',
    helpText: `Этот бот помогает создать специальную ссылку для участия в реферальной программе осеннего ProductCamp 2026.\n
А если ты столкнешься с проблемами, багами или у тебя будут предолжения по работе бота, то обязательно пиши нам сюда 👇\n
[Связаться с нами](https://forms.gle/tRqzyqUbUktuavep6)\n
С любовью ❤️‍🔥,
Команда ProductCamp`,
    unknown: `Этот бот был бы и рад поддержать разговор, но он очень занят созданием новых реферальных ссылок и приглашений, кстати, свою ты можешь получить выполнив команду /generate\n
    Увидимся на кэмпе!`,
    cmdGenerate: 'Получить ссылку',
    cmdHelp: 'Памагите',
    getInvite: 'Сгенерировать приглашение',
    getAnotherInvite: 'Еще одно',
    register: 'Регистрируйся по моей ссылке 👇',
    getQr: 'Создать QR-код',
    qrReady: 'Твой QR-код готов!',
    stories: 'Шаблоны для сторис',
    storiesHelp:
        'Лови! Ты отлично справляешься!\n\nНе забудь добавить свою ссылку 🤓',
    genKeyboard: `✨Скоро все появится!\n А пока, сгенерируй приглашение или сделай свой QR-код и делись им в офлайне.\n`,
    orgPoll: `Привет!\n\nЧтобы попробвать новые инструменты — сгенери свою ссылку ниже!\n\nА еще не забудь пройти опрос, это будет очень важно и полезно 🫶`,
    orgPollLink: `https://forms.yandex.ru/u/67dc2c7002848fb016767829/`,
    orgPollLabel: 'Пройти опрос',
    results: `*Финальные результаты реферальной программы ProductCamp 2026*\n
Вместе мы пригласить более 15% участников кэмпа и стали одним из лидирующих каналов 🏆 Каждый из вас внес свой неоценимый вклад в создание самой ламповой тусовки этой осени, собрав на неё своих друзей и коллег. Большое спасибо всем, вы большие молодцы! 🫶🫶🫶\n
Мы поздравляем лидеров этого сезона реферальной программы:\n
🥇 yuliya movie
🥈 mr powerlifter
🥉 alexandrardashev\n
Увидимся на кэмпе!
`,
};

const localeDefault: Locale = {
    welcome: `Hi \n
    This Bot can help you to generate a special link to take part in ProductCamp Referral Program! \n
    If you get enough referrals, you could get some rewards or take part in offline Camp events!`,
    welcomeMore: `Find more about Referral Program by link bellow 👇\n`,
    generatorExplain: `This is your personal link\n
    invite your colleagues and friends to ProductCamp 2025🙏`,
    generatorExplainMore: `😎 Here's some awesome tips and hints to don't screw up and get success:\n
🤓 Share the link with colleagues and friends from the industry - it will be more fun with your company at the camp!\n\n
👩‍🎤 You probably have chats of PM, Marketing Manager, Designers and other profesionals from digital industry - post the link there, they will definitely be interested\n\n
🧑‍🚀 *Advanced level:* ask the HR in your company to send invitation to relevant employees about Camp and share the link with them \n\n
🫶 Also we've made an invite generator - use it and you’ll get a cool invitation text 💅`,
    generatorMoreBtn: '🤔 How to get more referrals?',
    moreAboutLabel: `Learn more about programm`,
    moreAboutUrl: `https://mint-need-e65.notion.site/ProductCamp-2025-022a78a051b64c65b6fa4ccf571c1e59?utm_medium=bot&utm_source=pc_referral_bot`,
    getLink: '🎯 Get a new referral link',
    helpText: `This bot helps you create a special link to participate in the ProductCamp Spring 2025 referral program.\n
Run /generate command to get the link and send it to all your interested friends!`,
    unknown: `This bot is not provided unusual text commands, but you can use /generate command to get your own Refferal Link or use Menu tos see full list`,
    cmdGenerate: `Get new link`,
    cmdHelp: 'Help me',
    getInvite: 'Generate invite message',
    getAnotherInvite: 'One more',
    register: 'Register with link below 👇',
    getQr: 'Generate QR code',
    qrReady: 'Your QR code is ready!',
    stories: 'Stories templates',
    storiesHelp: 'You know what to do',
    genKeyboard: `А еще этот бот поможет тебе с оформлением приглашения! Мы подготовили шаблоны для сторис и сгенерили классыне тексты для приглашений, ты можешь забрать их ниже по ссылке.\n
    А еще ты можешь сгенерить QR-код и использовать его для привлечения даже в офлайне!`,
    orgPoll: '',
    orgPollLink: `https://forms.yandex.ru/u/67dc2c7002848fb016767829/`,
    orgPollLabel: 'Пройти опрос',
    results: ``,
};

export function locale(lang: string = ''): Locale {
    if (lang === 'ru') {
        return localeRU;
    } else {
        return localeDefault;
    }
}
