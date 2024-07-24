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
}

const localeRU: Locale = {
    welcome: `Привет! \n 
С помощью этого бота ты можешь создать специальную ссылку для участия в реферальной программе ProductCamp 2024! \n
Набрав достаточное количество реферралов, ты можешь получить плюшки от организаторов и даже проходку на сам Кэмп`,
    welcomeMore: `За подробностями переходи по ссылке 👇\n`,
    generatorExplain: `Это твоя персональная ссылка\n
Пригласи на ProductCamp своих коллег и друзей, мы уверены среди них будет много заинтересованных 🙏`,
    generatorExplainMore: `😎 Вот несколько несколько классынх рекомендаций, чтобы все получилось и ты не облажался:\n
    ...`,
    generatorMoreBtn: '🤔 Как мне привести много реферралов?',
    moreAboutLabel: `Подробнее о программе`,
    moreAboutUrl: `https://productcamp.ru`,
    getLink: '🎯 Получить новую ссылку',
    helpText: `Этот бот помогает создать специальную ссылку для участия в реферальной программе ProductCamp 2024.\n
Выполни команду /generate, чтобы получить ссылку, и отправь ее всем своим заинтересованным друзьям!`,
    unknown: `Этот бот пока не умеет общаться по всем вопросам, но ты можешь выполнить команду /generate для создания своей реферальной ссылки`,
    cmdGenerate: 'Получить ссылку',
    cmdHelp: 'Памагите',
};

const localeDefault: Locale = {
    welcome: `Hi \n
    This Bot can help you to generate a special link to take part in ProductCamp Referral Program! \n
    If you get enough referrals, you could get some rewards or take part in offline Camp events!`,
    welcomeMore: `Find more about Referral Program by link bellow 👇\n`,
    generatorExplain: `This is your personal link\n
    invite your colleagues and friends to ProductCamp 2024🙏`,
    generatorExplainMore: `😎 Here's some awesome tips and hints to don't screw up and get success:\n
    ...`,
    generatorMoreBtn: '🤔 How to get more referrals?',
    moreAboutLabel: `Learn more about programm`,
    moreAboutUrl: `https://productcamp.ru`,
    getLink: '🎯 Get a new referral link',
    helpText: `This bot helps you create a special link to participate in the ProductCamp 2024 referral program.\n
Run /generate command to get the link and send it to all your interested friends!`,
    unknown: `This bot is not provided unusual text commands, but you can use /generate command to get your own Refferal Link or use Menu tos see full list`,
    cmdGenerate: `Get new link`,
    cmdHelp: 'Help me',
};

export function locale(lang: string = ''): Locale {
    if (lang === 'ru') {
        return localeRU;
    } else {
        return localeDefault;
    }
}
