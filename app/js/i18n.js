// Lightweight native i18n module for dopa-drill (zero external dependencies).
// Supports 'uk' (Ukrainian), 'en' (English), and 'ja' (Japanese).

const STORAGE_KEY = 'dopa-drill-lang';

export const SUPPORTED_LANGS = [
  { code: 'uk', name: 'Українська' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
];

// Active language state. Default is Ukrainian ('uk').
let currentLang = (() => {
  try {
    if (typeof location !== 'undefined') {
      const p = new URLSearchParams(location.search);
      const urlLang = p.get('lang');
      if (urlLang && ['uk', 'en', 'ja'].includes(urlLang)) return urlLang;
    }
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved && ['uk', 'en', 'ja'].includes(saved)) return saved;
    return 'uk';
  } catch {
    return 'uk';
  }
})();

export function getLanguage() {
  return currentLang;
}

export function setLanguage(lang) {
  if (!['uk', 'en', 'ja'].includes(lang)) return;
  currentLang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
  }
}

// ---------------------------------------------------------------- Dictionaries
const STRINGS = {
  uk: {
    // Brand & General
    appTitle: 'Допа Дріл (Dopa Drill)',
    gameName: 'Допа Дріл',
    logoBurstTop: 'Допа',
    logoBurstRibbon: 'Дріл',
    mascotName: 'Допакічі',
    noscript: 'Для роботи гри потрібен увімкнений JavaScript.',
    loading: 'Завантаження...',
    pts: 'балів',
    timesUnit: 'разів',
    problemsUnit: 'завдань',
    secondsUnit: 'с',
    minutesUnit: 'хв',
    streakDaysUnit: 'дн.',
    starCountUnit: 'зірок',

    // Top HUD & Controls
    helpBtnAria: 'Як грати та довідка',
    settingsBtnAria: 'Налаштування',
    keyboardHint: 'Можна відповідати цифровими клавішами та Backspace',
    cellInputAria: 'Поле вводу',
    muteBtnAria: 'Перемкнути звук',
    muteOn: 'Без звуку',
    muteOff: 'Зі звуком',
    demoTag: 'ДЕМО',

    // Modes & Main Menu
    myLevel: 'Мій рівень',
    myLevelSub: 'Починається з перевірки знань',
    review: 'Робота над помилками',
    skillTree: 'Дерево навичок',
    trophy: 'Трофеї',
    collection: 'Колекція',
    grade1: 'кл',
    grade2: 'кл',
    grade3: 'кл',
    grade4: 'кл',
    grade5: 'кл',
    grade6: 'кл',
    gradeGroupAria: 'Тренування за класами',

    // Quests & Calendar
    todayQuests: 'Щоденні завдання',
    questComplete: 'Виконано!',
    questAllBonus: 'Бонус за всі завдання',
    calendarTitle: 'Календар тренувань',
    calPrevMonth: 'Попередній місяць',
    calNextMonth: 'Наступний місяць',
    weekDays: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],

    // Play Screen HUD
    targetTime: 'Ціль: {time}',
    targetOver: 'Понад ціль',
    correctCount: 'Правильно',
    missCount: 'Близько',
    comboLabel: 'Комбо',
    dopaLabel: 'Допа',
    dopaMultMax: 'Допа×2 МАКС',
    dopaMult: 'Допа×{val}',
    stepInputAria: 'Поле вводу',
    hintLabel: 'Підказка',
    questionLast: 'Останнє завдання!',
    questionIndex: 'Завдання {num}',
    questionExtra: 'EX {num}',
    unlockCutin: 'Відкрито навичку! {name}',
    correctStampText: 'Вірно!',
    fullScoreStamp: '100 балів!',
    fullScoreBanner: '100 балів досягнуто!',
    perfectRun: 'Бездоганно! Усі відповіді правильні!',

    // Result Screens
    basicResultTitle: 'Основне тренування завершено',
    reviewResultTitle: 'Роботу над помилками завершено',
    finalResultTitle: 'Додатковий раунд завершено',
    modeResultTitle: '{mode} пройдено',
    scoreLabel: 'Рахунок',
    accuracyLabel: 'Влучність з 1-ї спроби',
    timeLabel: 'Час',
    growthHeader: 'Твій прогрес!',
    firstTimeTry: 'Уперше ({day})',
    yesterday: 'Учора',
    today: 'Сьогодні',
    btnGoExtra: 'Додатковий раунд',
    btnGoExtraSub: '90 секунд',
    btnReviewMistakes: 'Повторити помилки',
    btnViewTree: 'Дерево навичок',
    btnPlayAgain: 'Ще раз',
    btnFinish: 'Завершити',
    finalBreakdown: 'Базові {basic} ＋ Додаткові {extra}',
    extraSolvedLabel: 'Розвʼязано в екстра',
    extraMissLabel: 'Помилок в екстра',
    basicMissLabel: 'Базових помилок',
    basicTimeLabel: 'Базовий час',

    // Skill Tree Screen
    treeHeadTitle: 'Дерево навичок',
    treeBackAria: 'Назад',
    treeNote: 'Торкнись для тренування (виконай умову ☆ для опанування) · Затисни для скидання',
    treeMasterCond: 'Умова опанування: 5 правильних з 1-ї спроби за останні 6 разів',
    treeMastered: 'Опановано',
    treeLearning: 'Тренування',
    treeLocked: 'Заблоковано',
    treeStarPrefix: '☆{count}',

    // Trophies Screen
    trophyHeadTitle: 'Трофеї',
    trFilterAll: 'Усі',
    trFilterGot: 'Здобуті',
    trFilterNext: 'Не здобуті',
    trFilterSoon: 'Майже здобуто',
    trCategoryLabel: 'Категорія',
    trGotTitle: 'Новий трофей здобуто!',
    trGotButton: 'Чудово!',

    // Collection Screen
    collectHeadTitle: 'Колекція',
    collectNote: 'Обирай фони, музику та ефекти, відкриті за трофеї (або ввімкни «Випадково»)',
    collectAuto: 'Випадково',

    // Settings Modal
    settingsTitle: 'Налаштування',
    setLanguage: 'Мова / Language',
    setProblemCount: 'Кількість завдань',
    setSound: 'Звук та музика',
    setSoundOn: 'Увімкнено',
    setSoundOff: 'Вимкнено',
    setVolumeAria: 'Гучність',
    setMotion: 'Інтенсивність анімацій',
    setMotionNote: '0% вимикає тремтіння екрана, спалахи та конфеті',
    setDemo: 'Демо-гра',
    setDemoBtn: '▶ Переглянути демо-гру',
    setDemoNote: 'Торкнись екрана або натисни будь-яку клавішу для виходу (без збереження)',
    setData: 'Дані гри',
    setDataReset: 'Скинути все',
    setDataResetNote: 'Очистити весь прогрес, трофеї та налаштування в цьому браузері',
    setCreditsLabel: 'Про проєкт та подяка',
    setCreditsDesc: 'Дякуємо автору @grmchn4ai за чудову ідею та відкритий код',
    setCreditsRepo: 'Репозиторій автора на GitHub',
    setCreditsAria: 'Відкрити оригінальний репозиторій на GitHub',
    btnClose: 'Закрити',

    // Modals: Bonus, Hammer, Confirm, Info
    bonusTitle: 'Щоденний бонус',
    bonusGetBtn: 'Отримати',
    bonusConsecutive: 'Серія тренувань: {days} дн.',
    bonusHammerReward: 'Отримано ремонтний молоток ×1',
    bonusCardNote: 'Тренуйся щодня, розвивай швидкість і памʼять!',
    hammerTitle: 'Ремонтний молоток',
    hammerNoUse: 'Не використовувати',
    hammerUse: 'Використати',
    hammerHave: 'У наявності: {count}',
    hammerOfferMsg: 'Пропущено {days} дн. тренувань! Використай молоток, щоб зберегти свою серію у {run} дн.!',
    confirmRelockTitle: 'Скинути навичку',
    confirmRelockMsg: 'Скинути записи для цієї навички та всіх залежних від неї?',
    confirmCancel: 'Скасувати',
    confirmDanger: 'Скинути',
    dayLogTitle: 'Історія тренувань',
    siPracticeBtn: 'Тренувати',
    siNextStarLabel: 'До ☆{n}',
    siMaxStars: '☆5 Досягнуто! Справжній майстер!',
    siRustyNote: 'Навичка призабулась. Розвʼяжи 1 завдання з першої спроби, щоб освіжити її!',
    siSolvedCount: 'Розвʼязано завдань: {count}',
    siBestSpeed: 'Найкращий час: {sec} с',

    // Guide Tour
    guideIntroTitle: 'Ласкаво просимо до Допа Дріл!',
    guideIntroText: 'Тут є 3 зручні формати\nтренування усного рахунку',
    guideLevelTitle: 'Мій рівень',
    guideLevelText: 'Підлаштовує складність під тебе.\nНа старті перевірить твої поточні знання.',
    guideGradesTitle: 'Тренування за класами',
    guideGradesText: 'Програма 1–6 класів для закріплення\nвсіх шкільних тем.',
    guideTreeTitle: 'Дерево навичок',
    guideTreeText: 'Обирай будь-які математичні теми\nта відкривай нові вершини крок за кроком.',
    guideTrophyTitle: 'Трофеї та нагороди',
    guideTrophyText: 'Розвʼязуй завдання, відкривай медалі\nта отримуй щоденні бонуси!',
    guideCollectTitle: 'Теми та музика',
    guideCollectText: 'За досягнення ти розблокуєш круті скіни,\nмелодії та ефекти для святкування!',
    guideLastTitle: 'Сумніваєшся? Обирай «Мій рівень»!',
    guideLastText: 'Кнопка допомоги вгорі ліворуч\nзавжди поверне цю підказку.',
    guideSkip: 'Пропустити',
    guideBack: 'Назад',
    guideNext: 'Далі',
    guideStart: 'Почати гру!',
    guideRecommend: 'Рекомендовано',
    guidePageOf: '{cur} із {total}',

    // Almost / Miss Feedback
    almost: 'Близько!',
    almostTimeout: 'Комбо перервано',
    almostEnded: 'Серія з {count} комбо завершилась',
    comboCountTxt: '{count} комбо!',
  },

  ja: {
    // Brand & General
    appTitle: 'ドパドリル',
    gameName: 'ドパドリル',
    logoBurstTop: 'ドパ',
    logoBurstRibbon: 'ドリル',
    mascotName: 'ドパキチ',
    noscript: 'このゲームの操作にはJavaScriptが必要です。',
    loading: '読み込み中...',
    pts: '点',
    timesUnit: '回',
    problemsUnit: '問',
    secondsUnit: '秒',
    minutesUnit: '分',
    streakDaysUnit: '日',
    starCountUnit: 'こ',

    // Top HUD & Controls
    helpBtnAria: 'あそびかた',
    settingsBtnAria: 'せってい',
    keyboardHint: '数字キーとBackspaceでも操作できます',
    cellInputAria: '入力欄',
    muteBtnAria: '音を消す',
    muteOn: 'ミュート中',
    muteOff: '音あり',
    demoTag: 'DEMO',

    // Modes & Main Menu
    myLevel: 'じぶんレベル',
    myLevelSub: 'はじめは じつりょくチェック',
    review: 'ふくしゅう',
    skillTree: 'スキルツリー',
    trophy: 'トロフィー',
    collection: 'コレクション',
    grade1: '1ねんせい',
    grade2: '2ねんせい',
    grade3: '3ねんせい',
    grade4: '4ねんせい',
    grade5: '5ねんせい',
    grade6: '6ねんせい',
    gradeGroupAria: '学年べつ',

    // Quests & Calendar
    todayQuests: 'きょうの クエスト',
    questComplete: 'コンプリート！',
    questAllBonus: 'ぜんぶで',
    calendarTitle: 'カレンダー',
    calPrevMonth: '前の月',
    calNextMonth: '次の月',
    weekDays: ['日', '月', '火', '水', '木', '金', '土'],

    // Play Screen HUD
    targetTime: '目標 {time}',
    targetOver: '目標超過',
    correctCount: '正解',
    missCount: 'おしい',
    comboLabel: 'コンボ',
    dopaLabel: 'ドパ',
    dopaMultMax: 'ドパ×2 MAX',
    dopaMult: 'ドパ×{val}',
    stepInputAria: '入力欄',
    hintLabel: 'ヒント',
    questionLast: 'ラスト1問',
    questionIndex: '第{num}問',
    questionExtra: 'EX {num}',
    unlockCutin: 'かいほう！ {name}',
    correctStampText: 'せいかい',
    fullScoreStamp: '100点',
    fullScoreBanner: '100てん！',
    perfectRun: 'パーフェクト！',

    // Result Screens
    basicResultTitle: '基本結果',
    reviewResultTitle: 'ふくしゅう クリア',
    finalResultTitle: 'エクストラ終了',
    modeResultTitle: '{mode} クリア',
    scoreLabel: '得点',
    accuracyLabel: '初回正解率',
    timeLabel: 'タイム',
    growthHeader: 'のびたよ！',
    firstTimeTry: 'はじめて（{day}）',
    yesterday: 'きのう',
    today: 'きょう',
    btnGoExtra: 'エクストラへ',
    btnGoExtraSub: '90秒',
    btnReviewMistakes: 'まちがえた問題を やりなおす',
    btnViewTree: 'スキルツリーを見る',
    btnPlayAgain: 'もう一度',
    btnFinish: 'おわる',
    finalBreakdown: '基本 {basic} ＋ エクストラ {extra}',
    extraSolvedLabel: 'エクストラ正解',
    extraMissLabel: 'エクストラのおしい',
    basicMissLabel: '基本のおしい',
    basicTimeLabel: '基本タイム',

    // Skill Tree Screen
    treeHeadTitle: 'スキルツリー',
    treeBackAria: 'もどる',
    treeNote: 'タップで れんしゅう（マスターは ☆の じょうけん）　ながおしで けす',
    treeMasterCond: 'マスター条件：直近6回中5回初回正解',
    treeMastered: 'マスター',
    treeLearning: 'れんしゅうちゅう',
    treeLocked: '未解放',
    treeStarPrefix: '☆{count}',

    // Trophies Screen
    trophyHeadTitle: 'トロフィー',
    trFilterAll: 'ぜんぶ',
    trFilterGot: 'ゲットした',
    trFilterNext: 'まだ',
    trFilterSoon: 'もうすぐ',
    trCategoryLabel: 'カテゴリ',
    trGotTitle: 'トロフィー ゲット！',
    trGotButton: 'やったね！',

    // Collection Screen
    collectHeadTitle: 'コレクション',
    collectNote: 'トロフィーのごほうびでふえる はいけい・おんがく・きせかえなどを えらべるよ',
    collectAuto: 'おまかせ',

    // Settings Modal
    settingsTitle: 'せってい',
    setLanguage: '言語 / Language',
    setProblemCount: '問題の数',
    setSound: '音',
    setSoundOn: 'オン',
    setSoundOff: 'オフ',
    setVolumeAria: '音の大きさ',
    setMotion: '動きの強さ',
    setMotionNote: '0%で揺れ・光・紙吹雪・移動を止めます',
    setDemo: 'デモプレイ',
    setDemoBtn: '▶ 自動でプレイを見る',
    setDemoNote: '画面をタップするか、キーを押すと終わります（記録には残りません）',
    setData: 'データ',
    setDataReset: 'すべて リセット',
    setDataResetNote: 'すべての データを けして さいしょに もどします',
    setCreditsLabel: 'クレジット',
    setCreditsDesc: '原作者 @grmchn4ai さんの素晴らしい発想と公開に感謝します',
    setCreditsRepo: 'GitHub 原作リポジトリ',
    setCreditsAria: 'GitHubの原作リポジトリを開く',
    btnClose: 'とじる',

    // Modals: Bonus, Hammer, Confirm, Info
    bonusTitle: 'ログインボーナス',
    bonusGetBtn: 'もらう',
    bonusConsecutive: '{days}日 れんぞく プレイ中！',
    bonusHammerReward: 'ノーカンハンマー ＋1',
    bonusCardNote: 'まいにち つづけて あそぼう！',
    hammerTitle: 'ノーカンハンマー',
    hammerNoUse: 'つかわない',
    hammerUse: 'つかう',
    hammerHave: 'もっているかず：{count}本',
    hammerOfferMsg: '{days}日ぶんの やすみを ノーカンにして {run}日れんぞくを まもる？',
    confirmRelockTitle: 'スキルを けす',
    confirmRelockMsg: 'この スキルと、この スキルから つながる スキルの きろくを けしますか？',
    confirmCancel: 'やめる',
    confirmDanger: 'けす',
    dayLogTitle: 'きろく',
    siPracticeBtn: 'れんしゅう する',
    siNextStarLabel: 'つぎの ☆{n}',
    siMaxStars: '☆5 たっせい！ すごい！',
    siRustyNote: 'すこし さびてきたよ。1もん しょかいせいかいで ピカピカに もどるよ',
    siSolvedCount: 'といたかず：{count}問',
    siBestSpeed: 'さいそく：{sec}秒',

    // Guide Tour
    guideIntroTitle: 'ドパドリルへ ようこそ！',
    guideIntroText: '計算の れんしゅうの しかたが\n3つ あります',
    guideLevelTitle: 'じぶんレベル',
    guideLevelText: 'あなたに あわせた 問題が 出ます。\nさいしょは「じつりょくチェック」から。',
    guideGradesTitle: '学年べつ',
    guideGradesText: '学年ごとの 計算を まとめて\nれんしゅう できます。',
    guideTreeTitle: 'スキルツリー',
    guideTreeText: 'すきな スキルを えらんで\nじっくり れんしゅう できます。',
    guideTrophyTitle: 'トロフィー',
    guideTrophyText: 'れんしゅうすると メダルが もらえます。\nまいにち あそぶと いいことが あるかも！',
    guideCollectTitle: 'コレクション',
    guideCollectText: 'トロフィーを あつめると、がめんの\nもよう や おんがくが ふえます。',
    guideLastTitle: 'まよったら「じぶんレベル」！',
    guideLastText: 'ひだりうえの「？」から\nいつでも この せつめいを みられます。',
    guideSkip: 'スキップ',
    guideBack: 'まえへ',
    guideNext: 'つぎへ',
    guideStart: 'はじめる！',
    guideRecommend: 'おすすめ',
    guidePageOf: '{total} まい中 {cur} まいめ',

    // Almost / Miss Feedback
    almost: 'おしい！',
    almostTimeout: 'コンボストップ',
    almostEnded: '{count}コンボ ストップ',
    comboCountTxt: '{count}コンボ！',
  },

  en: {
    // Brand & General
    appTitle: 'Dopa Drill',
    gameName: 'Dopa Drill',
    logoBurstTop: 'Dopa',
    logoBurstRibbon: 'Drill',
    mascotName: 'Dopakichi',
    noscript: 'JavaScript is required to play this game.',
    loading: 'Loading...',
    pts: 'Pts',
    timesUnit: 'times',
    problemsUnit: 'Qs',
    secondsUnit: 's',
    minutesUnit: 'min',
    streakDaysUnit: 'days',
    starCountUnit: 'stars',

    // Top HUD & Controls
    helpBtnAria: 'How to Play & Help',
    settingsBtnAria: 'Settings',
    keyboardHint: 'You can also use number keys and Backspace',
    cellInputAria: 'Input field',
    muteBtnAria: 'Toggle Mute',
    muteOn: 'Muted',
    muteOff: 'Sound On',
    demoTag: 'DEMO',

    // Modes & Main Menu
    myLevel: 'My Level',
    myLevelSub: 'Starts with an assessment test',
    review: 'Review Mistakes',
    skillTree: 'Skill Tree',
    trophy: 'Trophies',
    collection: 'Collection',
    grade1: 'Grade 1',
    grade2: 'Grade 2',
    grade3: 'Grade 3',
    grade4: 'Grade 4',
    grade5: 'Grade 5',
    grade6: 'Grade 6',
    gradeGroupAria: 'Practice by Grade',

    // Quests & Calendar
    todayQuests: "Today's Quests",
    questComplete: 'Complete!',
    questAllBonus: 'All Clear Bonus',
    calendarTitle: 'Calendar',
    calPrevMonth: 'Previous Month',
    calNextMonth: 'Next Month',
    weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    // Play Screen HUD
    targetTime: 'Target {time}',
    targetOver: 'Over Target',
    correctCount: 'Correct',
    missCount: 'Almost',
    comboLabel: 'Combo',
    dopaLabel: 'Dopa',
    dopaMultMax: 'Dopa×2 MAX',
    dopaMult: 'Dopa×{val}',
    stepInputAria: 'Input field',
    hintLabel: 'Hint',
    questionLast: 'Final Question!',
    questionIndex: 'Q {num}',
    questionExtra: 'EX {num}',
    unlockCutin: 'Skill Unlocked! {name}',
    correctStampText: 'Correct!',
    fullScoreStamp: '100 Pts!',
    fullScoreBanner: '100 Points Clear!',
    perfectRun: 'Perfect! All questions answered correctly!',

    // Result Screens
    basicResultTitle: 'Drill Complete',
    reviewResultTitle: 'Review Cleared',
    finalResultTitle: 'Extra Cleared',
    modeResultTitle: '{mode} Cleared',
    scoreLabel: 'Score',
    accuracyLabel: 'First-Try Accuracy',
    timeLabel: 'Time',
    growthHeader: 'Your Growth!',
    firstTimeTry: 'First Try ({day})',
    yesterday: 'Yesterday',
    today: 'Today',
    btnGoExtra: 'Go to Extra',
    btnGoExtraSub: '90s Limit',
    btnReviewMistakes: 'Review Mistakes',
    btnViewTree: 'View Skill Tree',
    btnPlayAgain: 'Play Again',
    btnFinish: 'Finish',
    finalBreakdown: 'Base {basic} ＋ Extra {extra}',
    extraSolvedLabel: 'Extra Solved',
    extraMissLabel: 'Extra Slips',
    basicMissLabel: 'Base Slips',
    basicTimeLabel: 'Base Time',

    // Skill Tree Screen
    treeHeadTitle: 'Skill Tree',
    treeBackAria: 'Back',
    treeNote: 'Tap to practice (meet ☆ conds to master) · Long press to reset',
    treeMasterCond: 'Master cond: 5 of last 6 first-try correct',
    treeMastered: 'Mastered',
    treeLearning: 'Learning',
    treeLocked: 'Locked',
    treeStarPrefix: '☆{count}',

    // Trophies Screen
    trophyHeadTitle: 'Trophies',
    trFilterAll: 'All',
    trFilterGot: 'Earned',
    trFilterNext: 'Not Yet',
    trFilterSoon: 'Almost',
    trCategoryLabel: 'Category',
    trGotTitle: 'Trophy Earned!',
    trGotButton: 'Awesome!',

    // Collection Screen
    collectHeadTitle: 'Collection',
    collectNote: 'Choose backgrounds, music, and effects unlocked via trophies (or Pick Random)',
    collectAuto: 'Random',

    // Settings Modal
    settingsTitle: 'Settings',
    setLanguage: 'Language',
    setProblemCount: 'Questions per set',
    setSound: 'Sound & Music',
    setSoundOn: 'On',
    setSoundOff: 'Off',
    setVolumeAria: 'Volume',
    setMotion: 'Motion Intensity',
    setMotionNote: 'Set to 0% to turn off screen shake, flashes, and confetti',
    setDemo: 'Demo Play',
    setDemoBtn: '▶ Watch Demo',
    setDemoNote: 'Tap screen or press any key to exit (not saved to personal records)',
    setData: 'Save Data',
    setDataReset: 'Reset All',
    setDataResetNote: 'Clear all game progress, trophies, and custom settings on this browser',
    setCreditsLabel: 'Credits & Thanks',
    setCreditsDesc: 'Special thanks to original author @grmchn4ai for wonderful design and open source sharing',
    setCreditsRepo: 'Original GitHub Repository',
    setCreditsAria: 'Open original GitHub repository',
    btnClose: 'Close',

    // Modals: Bonus, Hammer, Confirm, Info
    bonusTitle: 'Daily Login Bonus',
    bonusGetBtn: 'Claim',
    bonusConsecutive: 'Streak: {days} Days!',
    bonusHammerReward: '+1 No-Count Hammer',
    bonusCardNote: 'Keep practicing daily to build your momentum!',
    hammerTitle: 'No-Count Hammer',
    hammerNoUse: 'Keep Saved',
    hammerUse: 'Use Hammer',
    hammerHave: 'Currently held: {count}',
    hammerOfferMsg: 'You missed {days} day(s)! Use a hammer to save your {run}-day streak?',
    confirmRelockTitle: 'Reset Skill',
    confirmRelockMsg: 'Are you sure you want to reset this skill and all downstream dependent skills?',
    confirmCancel: 'Cancel',
    confirmDanger: 'Reset',
    dayLogTitle: 'Play History',
    siPracticeBtn: 'Practice',
    siNextStarLabel: 'Next: ☆{n}',
    siMaxStars: '☆5 Reached! True Master!',
    siRustyNote: 'Skill is getting rusty. Solve 1 question on first try to polish it up!',
    siSolvedCount: 'Total solved: {count}',
    siBestSpeed: 'Best time: {sec}s',

    // Guide Tour
    guideIntroTitle: 'Welcome to Dopa Drill!',
    guideIntroText: 'There are 3 ways to practice\nmental arithmetic',
    guideLevelTitle: 'My Level',
    guideLevelText: 'Dynamic difficulty tuned for you.\nStarts with a quick diagnostic test.',
    guideGradesTitle: 'Grade Practice',
    guideGradesText: 'Grade 1–6 math curricula to\nsystematically consolidate skills.',
    guideTreeTitle: 'Skill Tree',
    guideTreeText: 'Freely pick and master specific skills\nstep by step.',
    guideTrophyTitle: 'Trophies',
    guideTrophyText: 'Earn badges as you practice.\nDaily check-ins bring extra surprises!',
    guideCollectTitle: 'Themes & Music',
    guideCollectText: 'Unlock dynamic backgrounds, music tracks,\nhit effects, and mascot styles!',
    guideLastTitle: 'Unsure? Start with My Level!',
    guideLastText: 'Tap the help button at the top left\nto view this guide anytime.',
    guideSkip: 'Skip',
    guideBack: 'Back',
    guideNext: 'Next',
    guideStart: "Let's Play!",
    guideRecommend: 'Recommended',
    guidePageOf: '{cur} of {total}',

    // Almost / Miss Feedback
    almost: 'Almost!',
    almostTimeout: 'Combo Lost',
    almostEnded: '{count}-Combo ended',
    comboCountTxt: '{count} Combo!',
  },
};

export function t(key, params = {}) {
  const dict = STRINGS[currentLang] || STRINGS.uk;
  let text = dict[key] || STRINGS.en[key] || key;
  for (const [k, v] of Object.entries(params)) {
    text = text.split('{' + k + '}').join(v);
  }
  return text;
}

// ---------------------------------------------------------------- Skills Translation
export const SKILL_NAMES = {
  uk: {
    'g1-compose10': 'Склад числа 10',
    'g1-add-nc': 'Додавання в межах 10',
    'g1-sub-nb': 'Віднімання в межах 10',
    'g1-add-c': 'Додавання з переходом через 10',
    'g1-sub-b': 'Віднімання з переходом через 10',
    'g1-add3': 'Дії з 3 числами',
    'g1-add-2d1': 'Двоцифрове + одноцифрове',
    'g1-sub-2d1': 'Двоцифрове - одноцифрове',
    'g2-vadd2-nc': 'Додавання 2-цифрових у стовпчик',
    'g2-vadd2-c': 'Додавання у стовпчик з перенесенням',
    'g2-vsub2-nb': 'Віднімання 2-цифрових у стовпчик',
    'g2-vsub2-b': 'Віднімання у стовпчик з позичанням',
    'g2-vadd3s': 'Додавання з переходом через 100',
    'g2-vsub3s': 'Віднімання від 100',
    'g2-kuku25': 'Множення: на 2 і 5',
    'g2-kuku34': 'Множення: на 3 і 4',
    'g2-kuku67': 'Множення: на 6 і 7',
    'g2-kuku891': 'Множення: на 8, 9, 1',
    'g2-kuku-mix': 'Таблиця множення: мікс',
    'g2-mul-tens': 'Множення круглих десятків',
    'g2-frac-of': 'Частини: 1/2 та 1/4',
    'g3-vadd3': 'Додавання 3-цифрових чисел',
    'g3-vsub3': 'Віднімання 3-цифрових чисел',
    'g3-vadd4': 'Додавання 4-цифрових чисел',
    'g3-vsub4': 'Віднімання 4-цифрових чисел',
    'g3-div-basic': 'Табличне ділення',
    'g3-div-rem': 'Ділення з остачею',
    'g3-div-tens': 'Ділення круглих десятків',
    'g3-vmul-2x1': 'Множення 2-значного на 1-значне',
    'g3-vmul-3x1': 'Множення 3-значного на 1-значне',
    'g3-vmul-2x2': 'Множення 2-значного на 2-значне',
    'g3-vmul-3x2': 'Множення 3-значного на 2-значне',
    'g3-dec-add1': 'Додавання десяткових (десяті)',
    'g3-dec-sub1': 'Віднімання десяткових (десяті)',
    'g3-frac-same': 'Дроби з однаковими знаменниками',
    'g4-vdiv-2d1': 'Ділення 2-значного на 1-значне куточком',
    'g4-vdiv-3d1': 'Ділення 3-значного на 1-значне',
    'g4-vdiv-2d2': 'Ділення 2-значного на 2-значне',
    'g4-vdiv-3d2': 'Ділення 3-значного на 2-значне',
    'g4-order': 'Порядок виконання дій',
    'g4-round': 'Округлення чисел',
    'g4-dec-add2': 'Додавання й віднімання десяткових (соті)',
    'g4-dec-mul': 'Множення десяткового на ціле',
    'g4-dec-div': 'Ділення десяткового на ціле',
    'g4-frac-mixed': 'Дії з мішаними числами',
    'g5-dec-mul': 'Множення десяткових дробів',
    'g5-dec-div': 'Ділення десяткових дробів',
    'g5-gcd': 'Найбільший спільний дільник (НСД)',
    'g5-lcm': 'Найменше спільне кратне (НСК)',
    'g5-frac-reduce': 'Скорочення дробів',
    'g5-frac-diff': 'Дроби з різними знаменниками',
    'g5-frac-int': 'Дроби та цілі числа (× ÷)',
    'g5-percent': 'Відсотки',
    'g6-frac-mul': 'Множення звичайних дробів',
    'g6-frac-div': 'Ділення звичайних дробів',
    'g6-frac-dec': 'Десяткові та звичайні дроби',
    'g6-ratio': 'Відношення та пропорції',
    'g6-letter': 'Рівняння (знаходження x)',
  },
  en: {
    'g1-compose10': 'Pairs to 10',
    'g1-add-nc': '1-Digit Addition',
    'g1-sub-nb': 'Subtraction within 10',
    'g1-add-c': 'Addition with Regrouping',
    'g1-sub-b': 'Subtraction with Regrouping',
    'g1-add3': '3-Number Operations',
    'g1-add-2d1': '2-Digit + 1-Digit',
    'g1-sub-2d1': '2-Digit - 1-Digit',
    'g2-vadd2-nc': 'Vertical Addition (2 Digits)',
    'g2-vadd2-c': 'Vertical Addition w/ Carry',
    'g2-vsub2-nb': 'Vertical Subtraction (2 Digits)',
    'g2-vsub2-b': 'Vertical Subtraction w/ Borrow',
    'g2-vadd3s': 'Addition Past 100',
    'g2-vsub3s': 'Subtraction from 100',
    'g2-kuku25': 'Multiplication: 2s & 5s',
    'g2-kuku34': 'Multiplication: 3s & 4s',
    'g2-kuku67': 'Multiplication: 6s & 7s',
    'g2-kuku891': 'Multiplication: 8s, 9s, 1s',
    'g2-kuku-mix': 'Mixed Times Tables',
    'g2-mul-tens': 'Multiples of 10 × 1-Digit',
    'g2-frac-of': 'Fractions 1/2 & 1/4',
    'g3-vadd3': '3-Digit Addition',
    'g3-vsub3': '3-Digit Subtraction',
    'g3-vadd4': '4-Digit Addition',
    'g3-vsub4': '4-Digit Subtraction',
    'g3-div-basic': 'Basic Division',
    'g3-div-rem': 'Division with Remainder',
    'g3-div-tens': 'Multiples of 10 ÷ 1-Digit',
    'g3-vmul-2x1': '2-Digit × 1-Digit Vertical',
    'g3-vmul-3x1': '3-Digit × 1-Digit',
    'g3-vmul-2x2': '2-Digit × 2-Digit',
    'g3-vmul-3x2': '3-Digit × 2-Digit',
    'g3-dec-add1': '1-Place Decimal Addition',
    'g3-dec-sub1': '1-Place Decimal Subtraction',
    'g3-frac-same': 'Fractions with Like Denominators',
    'g4-vdiv-2d1': '2-Digit ÷ 1-Digit Vertical',
    'g4-vdiv-3d1': '3-Digit ÷ 1-Digit',
    'g4-vdiv-2d2': '2-Digit ÷ 2-Digit',
    'g4-vdiv-3d2': '3-Digit ÷ 2-Digit',
    'g4-order': 'Order of Operations',
    'g4-round': 'Rounding Numbers',
    'g4-dec-add2': '2-Place Decimal Addition/Sub',
    'g4-dec-mul': 'Decimal × Integer',
    'g4-dec-div': 'Decimal ÷ Integer',
    'g4-frac-mixed': 'Mixed Numbers Operations',
    'g5-dec-mul': 'Decimal × Decimal',
    'g5-dec-div': 'Decimal ÷ Decimal',
    'g5-gcd': 'Greatest Common Divisor',
    'g5-lcm': 'Least Common Multiple',
    'g5-frac-reduce': 'Simplifying Fractions',
    'g5-frac-diff': 'Fractions with Unlike Denominators',
    'g5-frac-int': 'Fractions ×÷ Integers',
    'g5-percent': 'Percentages',
    'g6-frac-mul': 'Fraction × Fraction',
    'g6-frac-div': 'Fraction ÷ Fraction',
    'g6-frac-dec': 'Mixed Decimals and Fractions',
    'g6-ratio': 'Ratios & Proportions',
    'g6-letter': 'Solving for x',
  },
};

export const LANES_I18N = {
  uk: ['Додавання і віднімання', 'Множення і ділення', 'Дроби та десяткові', 'Інші теми'],
  ja: ['たし・ひき', 'かけ・わり', '小数・分数', 'そのほか'],
  en: ['Add & Sub', 'Mult & Div', 'Dec & Frac', 'Other Topics'],
};

// ---------------------------------------------------------------- Trophy Translations
export const CATS_I18N = {
  uk: {
    'つづける': 'Постійність',
    'たくさん': 'Кількість',
    'スキル': 'Навички',
    'せいちょう': 'Розвиток',
    'エクストラ': 'Екстра-раунд',
    'コンボ': 'Комбо',
    'せいかく': 'Точність',
    'ドパ': 'Допа-енергія',
    'ふくしゅう': 'Повторення',
    'がくねん': 'Класи',
    'コレクション': 'Колекція',
    'ひみつ': 'Таємниці',
  },
  ja: {
    'つづける': 'つづける',
    'たくさん': 'たくさん',
    'スキル': 'スキル',
    'せいちょう': 'せいちょう',
    'エクストラ': 'エクストラ',
    'コンボ': 'コンボ',
    'せいかく': 'せいかく',
    'ドパ': 'ドパ',
    'ふくしゅう': 'ふくしゅう',
    'がくねん': 'がくねん',
    'コレクション': 'コレクション',
    'ひみつ': 'ひみつ',
  },
  en: {
    'つづける': 'Consistency',
    'たくさん': 'Volume',
    'スキル': 'Skills',
    'せいちょう': 'Growth',
    'エクストラ': 'Extra Stage',
    'コンボ': 'Combos',
    'せいかく': 'Accuracy',
    'ドパ': 'Dopa Energy',
    'ふくしゅう': 'Review',
    'がくねん': 'Grades',
    'コレクション': 'Collection',
    'ひみつ': 'Secrets',
  },
};

export const RANK_NAME_I18N = {
  uk: { bronze: 'Бронза', silver: 'Срібло', gold: 'Золото', rainbow: 'Веселка', secret: 'Секрет' },
  ja: { bronze: 'どう', silver: 'ぎん', gold: 'きん', rainbow: 'にじ', secret: 'ひみつ' },
  en: { bronze: 'Bronze', silver: 'Silver', gold: 'Gold', rainbow: 'Rainbow', secret: 'Secret' },
};

const fmtUk = (n) => Number(n).toLocaleString('uk-UA');
const DOPA_LABELS_UK = { 2: '100', 3: '1 000', 4: '10 тис.', 5: '100 тис.', 6: '1 млн', 7: '10 млн', 8: '100 млн', 9: '1 млрд' };
const DOPA_LABELS_EN = { 2: '100', 3: '1,000', 4: '10K', 5: '100K', 6: '1M', 7: '10M', 8: '100M', 9: '1B' };

export const TROPHY_SERIES_I18N = {
  uk: {
    days: { title: 'Днів у грі', name: (v) => `${v} дн.`, desc: (v) => `Грати ${v} різних днів` },
    streak: { title: 'Серія тренувань', name: (v) => `Серія ${v} дн.`, desc: (v) => `Тренуватися ${v} днів поспіль` },
    stickers: { title: 'Штампи календаря', name: (v) => `Штампів: ${v}`, desc: (v) => `Зібрати ${v} штампів у календарі` },
    crowns: { title: 'Ідеальні корони', name: (v) => `Корон: ${v}`, desc: (v) => `Зібрати ${v} корон за 100 балів у календарі` },
    plays: { title: 'Зіграно раундів', name: (v) => `${v} раундів`, desc: (v) => `Пройти ${v} раундів тренувань` },
    minutes: { title: 'Загальний час', name: (v) => (v >= 60 ? `${v / 60} год` : `${v} хв`), desc: (v) => `Тренуватися загалом ${v} хв` },
    problems: { title: 'Розвʼязано завдань', name: (v) => `${fmtUk(v)} завдань`, desc: (v) => `Правильно розвʼязати ${fmtUk(v)} завдань` },
    cells: { title: 'Введено цифр', name: (v) => `${fmtUk(v)} цифр`, desc: (v) => `Правильно ввести ${fmtUk(v)} цифр у розвʼязках` },
    unlocked: { title: 'Відкрито навичок', name: (v) => `Відкрито ${v}`, desc: (v) => `Розблокувати ${v} навичок у дереві` },
    mastered: { title: 'Опановано навичок', name: (v) => `Опановано ${v}`, desc: (v) => `Повністю опанувати ${v} навичок у дереві` },
    extras: { title: 'Екстра-раунди', name: (v) => `Екстра ${v}`, desc: (v) => `Увійти до екстра-раунду ${v} разів` },
    extraBest: { title: 'Рекорд в екстра', name: (v) => `Рекорд екстра: ${v}`, desc: (v) => `Розвʼязати ${v} завдань за один екстра-раунд` },
    extraSolved: { title: 'Всього в екстра', name: (v) => `Всього в екстра: ${fmtUk(v)}`, desc: (v) => `Загалом розвʼязати ${fmtUk(v)} завдань в екстра-раундах` },
    combo: { title: 'Майстер комбо', name: (v) => `Комбо ${v}`, desc: (v) => `Досягти серії з ${v} правильних відповідей` },
    perfects: { title: 'Ідеальні 100 балів', name: (v) => `100 балів ×${v}`, desc: (v) => `Пройти раунд на 100 балів ${v} разів` },
    firstTry: { title: 'З першої спроби', name: (v) => `З 1-ї спроби: ${fmtUk(v)}`, desc: (v) => `Розвʼязати ${fmtUk(v)} завдань з першої спроби` },
    dopa: { title: 'Допа-енергія', name: (v) => `${DOPA_LABELS_UK[v] || v} Допа`, desc: (v) => `Досягти ${DOPA_LABELS_UK[v] || v} енергії за раунд` },
    bestDopa: { title: 'Допа-енергія', name: (v) => `${DOPA_LABELS_UK[v] || v} Допа`, desc: (v) => `Досягти ${DOPA_LABELS_UK[v] || v} енергії за раунд` },
    review: { title: 'Виправлення помилок', name: (v) => `Повторено: ${v}`, desc: (v) => `Виправити ${v} помилок у режимі повторення` },
    questDays: { title: 'Дні бездоганних квестів', name: (v) => `Квести: ${v} дн.`, desc: (v) => `Виконати всі 3 щоденні завдання ${v} днів` },
    questRun: { title: 'Серія щоденних квестів', name: (v) => `Квести поспіль: ${v} дн.`, desc: (v) => `Виконувати всі квести ${v} днів поспіль` },
    hammer: { title: 'Рятувальний молоток', name: (v) => (v === 1 ? 'Перший порятунок' : `Молотків: ${v}`), desc: (v) => `Використати ремонтний молоток ${v} разів` },
    starsTotal: { title: 'Зірки дерева навичок', name: (v) => `Зірок: ${v}`, desc: (v) => `Зібрати ${v} зірок у дереві навичок` },
    star5: { title: 'Навички рівня ☆5', name: (v) => `☆5 навичок: ${v}`, desc: (v) => `Розвинути ${v} навичок до максимального рівня ☆5` },
    gradeStar3: { title: 'Всі навички класу на ☆3', name: (g) => `${g} клас: всі на ☆3`, desc: (g) => `Підняти всі навички ${g} класу до ☆3 і вище` },
    gradeDone: { title: 'Опанування класу', name: (g) => `${g} клас опановано`, desc: (g) => `Повністю опанувати всі навички ${g} класу` },
    gradePlays: { title: 'Тренування за класами', name: (g) => `${g} клас тренування`, desc: (g, v) => `Зіграти ${v} раундів у розділі ${g} класу` },
    laneDone: { title: 'Опанування розділу', name: (idx) => `Розділ: ${LANES_I18N.uk[idx]} опановано`, desc: (idx) => `Опанувати всі навички розділу «${LANES_I18N.uk[idx]}»` },
    polished: { title: 'Освіження навичок', name: (v) => `Освіжено: ${v}`, desc: (v) => `Освіжити забуті навички ${v} разів` },
    capsules: { title: 'Капсули часу', name: (v) => `Капсул: ${v}`, desc: (v) => `Відкрити ${v} капсул часу` },
    capsuleFaster: { title: 'Швидше за минуле', name: (v) => `Швидше: ${v}`, desc: (v) => `Розвʼязати завдання з капсули швидше, ніж уперше (${v} разів)` },
    grew: { title: 'Особистий прогрес', name: (v) => `Прогрес ×${v}`, desc: (v) => `Побачити екран «Твій прогрес!» ${v} разів` },
    items: { title: 'Збирання колекції', name: (v) => `Предметів: ${v}`, desc: (v) => `Відкрити ${v} предметів у скарбниці` },
    catComplete: { title: 'Повна категорія', name: (v) => `Категорій: ${v}`, desc: (v) => `Повністю зібрати всі предмети в ${v} категоріях` },
  },
  en: {
    days: { title: 'Days Played', name: (v) => `${v} Days`, desc: (v) => `Play on ${v} different days` },
    streak: { title: 'Daily Streak', name: (v) => `${v}-Day Streak`, desc: (v) => `Play ${v} consecutive days` },
    stickers: { title: 'Calendar Stamps', name: (v) => `${v} Stamps`, desc: (v) => `Collect ${v} calendar stamps` },
    crowns: { title: 'Perfect Crowns', name: (v) => `${v} Crowns`, desc: (v) => `Collect ${v} 100-pt crowns on the calendar` },
    plays: { title: 'Sessions Played', name: (v) => `${v} Sessions`, desc: (v) => `Finish ${v} play sessions` },
    minutes: { title: 'Total Time', name: (v) => `${v} Minutes`, desc: (v) => `Play for a total of ${v} minutes` },
    problems: { title: 'Problems Solved', name: (v) => `${v} Problems`, desc: (v) => `Solve ${v} problems correctly` },
    cells: { title: 'Cells Filled', name: (v) => `${v} Cells`, desc: (v) => `Fill ${v} math digits correctly` },
    unlocked: { title: 'Skills Unlocked', name: (v) => `${v} Skills`, desc: (v) => `Unlock ${v} skills in the tree` },
    mastered: { title: 'Skills Mastered', name: (v) => `${v} Mastered`, desc: (v) => `Master ${v} skills in the tree` },
    extras: { title: 'Extras Entered', name: (v) => `${v} Extras`, desc: (v) => `Enter the Extra stage ${v} times` },
    extraBest: { title: 'Extra Best Solved', name: (v) => `${v} Solved`, desc: (v) => `Solve ${v} problems in a single Extra stage` },
    extraSolved: { title: 'Extra Total Solved', name: (v) => `${v} Solved`, desc: (v) => `Solve ${v} problems total in Extra stages` },
    combo: { title: 'Combo Master', name: (v) => `${v} Combo`, desc: (v) => `Achieve a streak of ${v} correct answers` },
    perfects: { title: '100% Clears', name: (v) => `${v} Perfects`, desc: (v) => `Clear with 100% first-try accuracy ${v} times` },
    firstTry: { title: 'First-Try Solved', name: (v) => `${v} Solved`, desc: (v) => `Solve ${v} problems correctly on the first try` },
    dopa: { title: 'Dopa Energy', name: (v) => `${DOPA_LABELS_EN[v] || v} Dopa`, desc: (v) => `Reach ${DOPA_LABELS_EN[v] || v} Dopa in a single session` },
    bestDopa: { title: 'Dopa Energy', name: (v) => `${DOPA_LABELS_EN[v] || v} Dopa`, desc: (v) => `Reach ${DOPA_LABELS_EN[v] || v} Dopa in a single session` },
    review: { title: 'Mistakes Cleared', name: (v) => `${v} Cleared`, desc: (v) => `Re-solve ${v} mistakes in Review mode` },
    questDays: { title: 'All Quests Done', name: (v) => `${v} Days`, desc: (v) => `Clear all 3 daily quests on ${v} days` },
    questRun: { title: 'Quest Streak', name: (v) => `${v} Days`, desc: (v) => `Clear all daily quests for ${v} consecutive days` },
    hammer: { title: 'No-Count Hammer', name: (v) => (v === 1 ? '1st Save' : `${v} Saves`), desc: (v) => `Use a No-Count Hammer to protect your streak ${v} times` },
    starsTotal: { title: 'Total Stars', name: (v) => `${v} Stars`, desc: (v) => `Collect a total of ${v} stars across skills` },
    star5: { title: '5-Star Skills', name: (v) => `${v} Skills`, desc: (v) => `Upgrade ${v} skills to max ☆5` },
    gradeStar3: { title: 'All Skills to ☆3', name: (g) => `Grade ${g} ☆3`, desc: (g) => `Raise all skills in Grade ${g} to ☆3 or higher` },
    gradeDone: { title: 'Grade Mastered', name: (g) => `Grade ${g} Mastered`, desc: (g) => `Master all skills in Grade ${g}` },
    gradePlays: { title: 'Grade Practice', name: (g) => `Grade ${g} Practice`, desc: (g, v) => `Play ${v} sessions in Grade ${g}` },
    laneDone: { title: 'Lane Mastered', name: (idx) => `${LANES_I18N.en[idx]} Mastered`, desc: (idx) => `Master all skills under "${LANES_I18N.en[idx]}"` },
    polished: { title: 'Skills Polished', name: (v) => `${v} Polished`, desc: (v) => `Polish rusty skills ${v} times` },
    capsules: { title: 'Time Capsules', name: (v) => `${v} Capsules`, desc: (v) => `Open ${v} Time Capsules from past plays` },
    capsuleFaster: { title: 'Faster than Past', name: (v) => `${v} Faster`, desc: (v) => `Solve a Time Capsule problem faster than your past record ${v} times` },
    grew: { title: 'Growth Moments', name: (v) => `${v} Growths`, desc: (v) => `Trigger the "Your Growth!" breakdown ${v} times` },
    items: { title: 'Items Collected', name: (v) => `${v} Items`, desc: (v) => `Unlock ${v} customization items` },
    catComplete: { title: 'Categories Done', name: (v) => `${v} Categories`, desc: (v) => `Collect all items in ${v} different categories` },
  }
};

export const SECRET_TROPHIES_I18N = {
  uk: {
    'secret-perfect14': { name: '14 завдань без помилок', desc: 'Пройти раунд із 14 завдань без жодної похибки' },
    'secret-extraClean': { name: 'Бездоганна екстра', desc: 'Розвʼязати від 5 завдань в екстра-раунді без жодної помилки' },
    'secret-sunday': { name: 'Недільна математика', desc: 'Тренуватися у неділю' },
    'secret-newyear': { name: 'Новорічний старт', desc: 'Зіграти 1 січня' },
    'secret-comeback': { name: 'З поверненням!', desc: 'Повернутися до гри після перерви у тиждень або більше' },
    'secret-allmodes': { name: 'Універсальний гравець', desc: 'Спробувати всі режими: Мій рівень, Класи, Тренування та Повторення' },
  },
  en: {
    'secret-perfect14': { name: '14-Problem Perfect', desc: 'Clear a 14-problem set with zero misses' },
    'secret-extraClean': { name: 'Flawless Extra', desc: 'Solve 5+ problems in Extra with zero misses' },
    'secret-sunday': { name: 'Sunday Math', desc: 'Play on a Sunday' },
    'secret-newyear': { name: 'New Year Practice', desc: 'Play on January 1st' },
    'secret-comeback': { name: 'Welcome Back!', desc: 'Play again after taking a week or more off' },
    'secret-allmodes': { name: 'All Modes Explorer', desc: 'Play My Level, Grades, Practice, and Review' },
  }
};

// ---------------------------------------------------------------- Unlocks Translation
export const UNLOCK_CATS_I18N = {
  uk: {
    bg: 'Тема фону',
    mark: 'Позначка успіху',
    particle: 'Ефект конфеті',
    music: 'Музика',
    costume: 'Костюм',
    color: 'Колір Допакічі',
    crowd: 'Глядачі',
    finale: 'Фінальне шоу',
  },
  ja: {
    bg: 'はいけい',
    mark: 'せいかいの しるし',
    particle: 'かみふぶき',
    music: 'おんがく',
    costume: 'きせかえ',
    color: 'ドパキチの いろ',
    crowd: 'おきゃくさん',
    finale: 'フィナーレ',
  },
  en: {
    bg: 'Background',
    mark: 'Correct Stamp',
    particle: 'Confetti',
    music: 'Music',
    costume: 'Costume',
    color: "Dopakichi's Color",
    crowd: 'Crowd',
    finale: 'Finale',
  }
};

export const UNLOCK_ITEMS_I18N = {
  uk: {
    'bg:classic': 'Динамічні промені',
    'mark:hanamaru': 'Квіткове коло',
    'particle:classic': 'Різнокольорове конфеті',
    'music:classic': 'Марш маримби',
    'costume:none': 'Без костюма',
    'color:pink': 'Класичний рожевий',
    'crowd:classic': 'Яскраві глядачі',
    'finale:classic': 'Свято кульок',
    'bg:night': 'Нічне небо',
    'bg:sea': 'Морська блакить',
    'bg:space': 'Глибокий космос',
    'bg:festival': 'Яскравий фестиваль',
    'bg:paper': 'Паперовий колаж',
    'mark:star': 'Золота зірка',
    'mark:check': 'Зелена галочка',
    'mark:heart': 'Червоне серце',
    'mark:double': 'Подвійне коло',
    'mark:crown': 'Королівська корона',
    'particle:note': 'Музичні ноти',
    'particle:petal': 'Пелюстки квітів',
    'particle:bubble': 'Мильні бульбашки',
    'particle:candy': 'Солодощі',
    'particle:digit': 'Сяючі цифри',
    'music:electro': 'Електронний пульс',
    'music:carnival': 'Карнавальний біт',
    'music:chiptune': '8-бітний ретро-звук',
    'music:brass': 'Святкові мідні духові',
    'costume:ribbon': 'Милий бант',
    'costume:cap': 'Кепка козирком назад',
    'costume:glasses': 'Розумні окуляри',
    'costume:crown': 'Сяюча корона',
    'costume:headphones': 'DJ-навушники',
    'costume:grad': 'Академічна шапочка',
    'color:mint': 'Свіжа мʼята',
    'color:yellow': 'Сонячно-жовтий',
    'color:blue': 'Небесно-блакитний',
    'color:violet': 'Чарівний фіолетовий',
    'color:white': 'Сніжно-білий',
    'crowd:costume': 'Глядачі в костюмах',
    'crowd:rainbow': 'Веселкова група',
    'crowd:twins': 'Близнюки-вболівальники',
    'finale:fireworks': 'Грандіозний феєрверк',
    'finale:rocket': 'Запуск ракети',
    'finale:parade': 'Святковий парад',
  },
  en: {
    'bg:classic': 'Dynamic Rays',
    'mark:hanamaru': 'Cherry Ring',
    'particle:classic': 'Confetti Streamers',
    'music:classic': 'Marimba March',
    'costume:none': 'Default (No Costume)',
    'color:pink': 'Classic Pink',
    'crowd:classic': 'Colorful Crowd',
    'finale:classic': 'Balloon Fiesta',
    'bg:night': 'Starlit Night',
    'bg:sea': 'Ocean Breeze',
    'bg:space': 'Cosmic Galaxy',
    'bg:festival': 'Carnival Stripes',
    'bg:paper': 'Origami Scrapbook',
    'mark:star': 'Golden Star',
    'mark:check': 'Green Check',
    'mark:heart': 'Bright Heart',
    'mark:double': 'Double Ring',
    'mark:crown': 'Royal Crown',
    'particle:note': 'Musical Notes',
    'particle:petal': 'Sakura Petals',
    'particle:bubble': 'Soap Bubbles',
    'particle:candy': 'Fruity Candies',
    'particle:digit': 'Glowing Digits',
    'music:electro': 'Electro Pulse',
    'music:carnival': 'Carnival Beat',
    'music:chiptune': '8-Bit Chiptune',
    'music:brass': 'Festival Brass',
    'costume:ribbon': 'Cute Ribbon',
    'costume:cap': 'Backwards Cap',
    'costume:glasses': 'Smart Glasses',
    'costume:crown': 'Golden Crown',
    'costume:headphones': 'DJ Headphones',
    'costume:grad': 'Graduation Cap',
    'color:mint': 'Mint Breeze',
    'color:yellow': 'Sunny Yellow',
    'color:blue': 'Sky Blue',
    'color:violet': 'Magic Violet',
    'color:white': 'Snow White',
    'crowd:costume': 'Costumed Crowd',
    'crowd:rainbow': 'Rainbow Friends',
    'crowd:twins': 'Cheering Twins',
    'finale:fireworks': 'Sky Fireworks',
    'finale:rocket': 'Rocket Launch',
    'finale:parade': 'Gala Parade',
  }
};

export function skillName(id) {
  if (currentLang === 'ja') return null;
  const dict = SKILL_NAMES[currentLang];
  return (dict && dict[id]) || null;
}

export function laneName(index) {
  const lanes = LANES_I18N[currentLang] || LANES_I18N.uk;
  return lanes[index] || '';
}

export function trophyCatName(cat) {
  const dict = CATS_I18N[currentLang] || CATS_I18N.uk;
  return dict[cat] || cat;
}

export function rankName(rank) {
  const dict = RANK_NAME_I18N[currentLang] || RANK_NAME_I18N.uk;
  return dict[rank] || rank;
}

export function unlockCatName(cat) {
  const dict = UNLOCK_CATS_I18N[currentLang] || UNLOCK_CATS_I18N.uk;
  return dict[cat] || cat;
}

export function unlockItemName(id) {
  if (currentLang === 'ja') return null;
  const dict = UNLOCK_ITEMS_I18N[currentLang];
  return (dict && dict[id]) || null;
}

export function trophySeriesTitle(seriesKey, jaTitle) {
  if (currentLang === 'ja') return jaTitle;
  const lang = currentLang === 'en' ? 'en' : 'uk';
  const dict = TROPHY_SERIES_I18N[lang] || TROPHY_SERIES_I18N.uk;
  const gm = /^grade([1-6])$/.exec(seriesKey);
  if (gm) {
    const g = gm[1];
    return lang === 'uk' ? `Тренування ${g} класу` : `Grade ${g} Practice`;
  }
  return (dict[seriesKey] && dict[seriesKey].title) || jaTitle;
}

export function trophyItemName(item) {
  if (!item) return '';
  if (currentLang === 'ja') return item.name;
  const lang = currentLang === 'en' ? 'en' : 'uk';
  const id = item.id || '';
  const seriesKey = item.series || '';
  const need = item.need;

  if (item.secret) {
    const sdict = SECRET_TROPHIES_I18N[lang] || {};
    if (sdict[id]) return sdict[id].name;
  }
  const gDone = /^gradeDone-([1-6])$/.exec(id);
  if (gDone) {
    const g = gDone[1];
    return lang === 'uk' ? `${g} клас опановано` : `Grade ${g} Mastered`;
  }
  const gStar = /^gradeStar3-([1-6])$/.exec(id);
  if (gStar) {
    const g = gStar[1];
    return lang === 'uk' ? `${g} клас: всі на ☆3` : `Grade ${g} All ☆3`;
  }
  const lDone = /^laneDone-([0-3])$/.exec(id);
  if (lDone) {
    const idx = Number(lDone[1]);
    const lName = (LANES_I18N[lang] && LANES_I18N[lang][idx]) || `Розділ ${idx}`;
    return lang === 'uk' ? `${lName} опановано` : `${lName} Mastered`;
  }
  const gPlay = /^grade([1-6])$/.exec(seriesKey);
  if (gPlay) {
    const g = gPlay[1];
    return lang === 'uk' ? `${g} клас: ${need} раундів` : `Grade ${g}: ${need} Plays`;
  }
  if (seriesKey === 'dopa') {
    const dLabel = (lang === 'uk' ? DOPA_LABELS_UK[need] : DOPA_LABELS_EN[need]) || String(need);
    return lang === 'uk' ? `${dLabel} Допа` : `${dLabel} Dopa`;
  }

  const dict = TROPHY_SERIES_I18N[lang] || {};
  const sdict = dict[seriesKey] || (seriesKey === 'dopa' ? dict.bestDopa : null);
  if (sdict) {
    const name = typeof sdict.name === 'function' ? sdict.name(need) : sdict.name;
    if (name) return name;
  }
  return item.name;
}

export function trophyItemDesc(item) {
  if (!item) return '';
  if (currentLang === 'ja') return item.desc;
  const lang = currentLang === 'en' ? 'en' : 'uk';
  const id = item.id || '';
  const seriesKey = item.series || '';
  const need = item.need;

  if (item.secret) {
    const sdict = SECRET_TROPHIES_I18N[lang] || {};
    if (sdict[id]) return sdict[id].desc;
  }
  const gDone = /^gradeDone-([1-6])$/.exec(id);
  if (gDone) {
    const g = gDone[1];
    return lang === 'uk' ? `Повністю опанувати всі навички ${g} класу` : `Master all skills in Grade ${g}`;
  }
  const gStar = /^gradeStar3-([1-6])$/.exec(id);
  if (gStar) {
    const g = gStar[1];
    return lang === 'uk' ? `Підняти всі навички ${g} класу до ☆3 і вище` : `Raise all skills in Grade ${g} to ☆3 or higher`;
  }
  const lDone = /^laneDone-([0-3])$/.exec(id);
  if (lDone) {
    const idx = Number(lDone[1]);
    const lName = (LANES_I18N[lang] && LANES_I18N[lang][idx]) || `Розділ ${idx}`;
    return lang === 'uk' ? `Повністю опанувати всі навички розділу «${lName}»` : `Master all skills under "${lName}"`;
  }
  const gPlay = /^grade([1-6])$/.exec(seriesKey);
  if (gPlay) {
    const g = gPlay[1];
    return lang === 'uk' ? `Зіграти ${need} раундів у розділі ${g} класу` : `Play ${need} sessions in Grade ${g}`;
  }
  if (seriesKey === 'dopa') {
    const dLabel = (lang === 'uk' ? DOPA_LABELS_UK[need] : DOPA_LABELS_EN[need]) || String(need);
    return lang === 'uk' ? `Досягти ${dLabel} енергії Допа за один раунд` : `Reach ${dLabel} Dopa in a single session`;
  }

  const dict = TROPHY_SERIES_I18N[lang] || {};
  const sdict = dict[seriesKey] || (seriesKey === 'dopa' ? dict.bestDopa : null);
  if (sdict) {
    const desc = typeof sdict.desc === 'function' ? sdict.desc(need) : sdict.desc;
    if (desc) return desc;
  }
  return item.desc;
}

export function problemTitle(jaTitle) {
  if (currentLang === 'ja' || !jaTitle) return jaTitle;
  const dictUk = {
    'わりざん': 'Ділення',
    'あまりのあるわりざん': 'Ділення з остачею',
    '小数のたしざん': 'Додавання десяткових дробів',
    '小数のひきざん': 'Віднімання десяткових дробів',
    '小数のかけざん': 'Множення десяткових дробів',
    '小数のわりざん': 'Ділення десяткових дробів',
    'たしざん': 'Додавання',
    'ひきざん': 'Віднімання',
    '3つのかず': 'Дії з 3 числами',
    'かけざん': 'Множення',
    'ぶんすう': 'Дроби',
    '最大公約数': 'НСД',
    '最小公倍数': 'НСК',
    'けいさんのきまり': 'Порядок дій',
    'がい数': 'Округлення',
    '百分率': 'Відсотки',
    'ひ': 'Пропорції',
    'xをもとめる': 'Знаходження x',
    '約分': 'Скорочення дробів',
    '分数のたしひき': 'Додавання та віднімання дробів',
    '分数と整数': 'Дроби та цілі числа',
    '分数のかけざん': 'Множення дробів',
    '分数のわりざん': 'Ділення дробів',
    '小数と分数': 'Десяткові та звичайні дроби',
    'いくつといくつ': 'Склад числа',
  };
  const dictEn = {
    'わりざん': 'Division',
    'あまりのあるわりざん': 'Division with Remainder',
    '小数のたしざん': 'Decimal Addition',
    '小数のひきざん': 'Decimal Subtraction',
    '小数のかけざん': 'Decimal Multiplication',
    '小数のわりざん': 'Decimal Division',
    'たしざん': 'Addition',
    'ひきざん': 'Subtraction',
    '3つのかず': '3 Numbers',
    'かけざん': 'Multiplication',
    'ぶんすう': 'Fractions',
    '最大公約数': 'Greatest Common Divisor',
    '最小公倍数': 'Least Common Multiple',
    'けいさんのきまり': 'Order of Operations',
    'がい数': 'Rounding',
    '百分率': 'Percentages',
    'ひ': 'Ratios',
    'xをもとめる': 'Solve for x',
    '約分': 'Simplifying Fractions',
    '分数のたしひき': 'Fraction Add & Sub',
    '分数と整数': 'Fractions & Integers',
    '分数のかけざん': 'Fraction Multiplication',
    '分数のわりざん': 'Fraction Division',
    '小数と分数': 'Decimals & Fractions',
    'いくつといくつ': 'Making Numbers',
  };
  const d = currentLang === 'en' ? dictEn : dictUk;
  return d[jaTitle] || jaTitle;
}

export function stepLabel(jaLabel) {
  if (currentLang === 'ja' || !jaLabel) return jaLabel;
  const isEn = currentLang === 'en';
  const dictUk = {
    '一の位': 'Одиниці',
    '十の位': 'Десятки',
    '百の位': 'Сотні',
    '千の位': 'Тисячі',
    '万の位': 'Десятки тисяч',
    '十万の位': 'Сотні тисяч',
    '小数第一位': 'Десяті',
    '小数第二位': 'Соті',
    '小数第三位': 'Тисячні',
    '整数の部分': 'Ціла частина',
    '分子': 'Чисельник',
    '分母': 'Знаменник',
    '商': 'Частка',
    'あまり': 'Остача',
    'こたえ': 'Відповідь',
    'くりあがり': 'Перенесення',
    'くりさがり': 'Позичання',
    'ひいた のこり': 'Різниця',
  };
  const dictEn = {
    '一の位': 'Ones',
    '十の位': 'Tens',
    '百の位': 'Hundreds',
    '千の位': 'Thousands',
    '万の位': 'Ten Thousands',
    '十万の位': 'Hundred Thousands',
    '小数第一位': 'Tenths',
    '小数第二位': 'Hundredths',
    '小数第三位': 'Thousandths',
    '整数の部分': 'Integer Part',
    '分子': 'Numerator',
    '分母': 'Denominator',
    '商': 'Quotient',
    'あまり': 'Remainder',
    'こたえ': 'Answer',
    'くりあがり': 'Carry',
    'くりさがり': 'Borrow',
    'ひいた のこり': 'Remainder',
  };
  const d = isEn ? dictEn : dictUk;
  if (d[jaLabel]) return d[jaLabel];

  const mMul = /^(\d+)をかける$/.exec(jaLabel);
  if (mMul) {
    return isEn ? `Multiply by ${mMul[1]}` : `Помножити на ${mMul[1]}`;
  }
  const mAdd = /^たす（(.+)）$/.exec(jaLabel);
  if (mAdd) {
    const sub = d[mAdd[1]] || mAdd[1];
    return isEn ? `Add (${sub})` : `Додати (${sub})`;
  }
  const mQuot = /^商の(.+)$/.exec(jaLabel);
  if (mQuot) {
    const sub = d[mQuot[1]] || mQuot[1];
    return isEn ? `Quotient (${sub})` : `Частка (${sub})`;
  }
  return jaLabel;
}

export function formatDopaValue(L) {
  if (L <= 0) return '0';
  const v = Math.round(10 ** L);
  if (currentLang === 'ja') {
    if (v >= 100000000) return `${v / 100000000}億`;
    if (v >= 10000) return `${v / 10000}万`;
    return String(v);
  }
  if (currentLang === 'uk') {
    if (v >= 1000000000) return `${v / 1000000000} млрд`;
    if (v >= 1000000) return `${v / 1000000} млн`;
    if (v >= 1000) return `${v / 1000} тис.`;
    return String(v);
  }
  if (v >= 1000000000) return `${v / 1000000000}B`;
  if (v >= 1000000) return `${v / 1000000}M`;
  if (v >= 1000) return `${v / 1000}K`;
  return String(v);
}

export function nextStarI18n(next) {
  if (!next) return next;
  const { n, text, now } = next;
  if (currentLang === 'ja') return next;

  if (currentLang === 'uk') {
    let ukText = text;
    let ukNow = now;
    if (n === 2) {
      ukText = text.replace(/さいきん\s*(\d+)もんの\s*初回正解が\s*(\d+)%\s*いじょう/, 'Влучність з 1-ї спроби за останні $1 завдань від $2%');
      ukNow = now.replace(/いま\s*(\d+)もん・(\d+)%/, 'Зараз $1 завд. · $2%');
    } else if (n === 3) {
      ukText = text.replace(/1もんを\s*だいたい\s*([\d.]+)\s*びょう\s*いないで\s*とく/, 'Середній час на завдання до $1 с');
      ukNow = now.replace(/いま\s*([\d.]+)\s*びょう（(\d+)\/(\d+)もん）/, 'Зараз $1 с ($2/$3 завд.)');
    } else if (n === 4) {
      ukText = text.replace(/☆3から\s*(\d+)日\s*たってから、(\d+)もん\s*つづけて\s*初回正解/, 'Через $1 дн. після ☆3, $2 поспіль з 1-ї спроби');
      ukNow = now.replace(/あと\s*(\d+)日\s*まってね/, 'Зачекай ще $1 дн.');
    } else if (n === 5) {
      ukText = text.replace(/☆4から\s*(\d+)日\s*たってから、(\d+)もん\s*つづけて\s*初回正解/, 'Через $1 дн. після ☆4, $2 поспіль з 1-ї спроби');
      ukNow = now.replace(/あと\s*(\d+)日\s*まってね/, 'Зачекай ще $1 дн.');
    }
    return { n, text: ukText, now: ukNow };
  }

  // English fallback
  let enText = text;
  let enNow = now;
  if (n === 2) {
    enText = text.replace(/さいきん\s*(\d+)もんの\s*初回正解が\s*(\d+)%\s*いじょう/, 'First-try accuracy 80%+ over last 10 questions');
    enNow = now.replace(/いま\s*(\d+)もん・(\d+)%/, 'Currently $1 Qs · $2%');
  } else if (n === 3) {
    enText = text.replace(/1もんを\s*だいたい\s*([\d.]+)\s*びょう\s*いないで\s*とく/, 'Solve each in approx. $1s or less');
    enNow = now.replace(/いま\s*([\d.]+)\s*びょう（(\d+)\/(\d+)もん）/, 'Now $1s ($2/$3 Qs)');
  } else if (n === 4) {
    enText = text.replace(/☆3から\s*(\d+)日\s*たってから、(\d+)もん\s*つづけて\s*初回正解/, '$1 days after ☆3, get $2 in a row on first try');
    enNow = now.replace(/あと\s*(\d+)日\s*まってね/, '$1 day(s) remaining');
  } else if (n === 5) {
    enText = text.replace(/☆4から\s*(\d+)日\s*たってから、(\d+)もん\s*つづけて\s*初回正解/, '$1 days after ☆4, get $2 in a row on first try');
    enNow = now.replace(/あと\s*(\d+)日\s*まってね/, '$1 day(s) remaining');
  }
  return { n, text: enText, now: enNow };
}

export function monthYearText(year, month) {
  if (currentLang === 'ja') return `${year}年${month + 1}月`;
  if (currentLang === 'uk') {
    const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    return `${months[month]} ${year}`;
  }
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[month]} ${year}`;
}

export function dayLogTitleText(m, d) {
  if (currentLang === 'ja') return `${m}月${d}日の きろく`;
  if (currentLang === 'uk') {
    const genitive = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
    return `Записи за ${d} ${genitive[m - 1] || m}`;
  }
  return `Record for ${m}/${d}`;
}

export function cellTextI18n(text) {
  if (!text) return text;
  if (currentLang === 'en') {
    if (text === 'НСД' || text === '最大公約数') return 'GCD';
    if (text === 'НСК' || text === '最小公倍数') return 'LCM';
    if (text === 'ост.' || text === 'あまり') return 'rem.';
    if (text === 'до десятків' || text === '十の位まで') return 'to tens';
    if (text === 'до сотень' || text === '百の位まで') return 'to 100s';
    if (text === 'до тисяч' || text === '千の位まで') return 'to 1000s';
    return text;
  }
  if (currentLang === 'ja') {
    if (text === 'НСД') return '最大公約数';
    if (text === 'НСК') return '最小公倍数';
    if (text === 'ост.') return 'あまり';
    return text;
  }
  // Ukrainian default
  if (text === '最大公約数') return 'НСД';
  if (text === '最小公倍数') return 'НСК';
  if (text === 'あまり') return 'ост.';
  if (text === '十の位まで') return 'до десятків';
  if (text === '百の位まで') return 'до сотень';
  if (text === '千の位まで') return 'до тисяч';
  return text;
}

export function problemHelpText(jaHint) {
  if (currentLang === 'ja' || !jaHint) return jaHint;
  if (currentLang === 'uk') {
    if (jaHint === 'どちらも わりきれる 数') return 'Спільний дільник: ділить обидва числа';
    if (jaHint === 'どちらの 倍数にも なっている 数') return 'Спільне кратне: ділиться на обидва числа';
    const m = /^(\d+)の中に(\d+)はいくつ$/.exec(jaHint);
    if (m) return `Скільки разів ${m[2]} вміщується в ${m[1]}?`;
    return jaHint;
  }
  if (jaHint === 'どちらも わりきれる 数') return 'Common factor: divides both';
  if (jaHint === 'どちらの 倍数にも なっている 数') return 'Common multiple: multiple of both';
  const m = /^(\d+)の中に(\d+)はいくつ$/.exec(jaHint);
  if (m) return `How many ${m[2]}s in ${m[1]}?`;
  return jaHint;
}

export function answerTextI18n(ansText) {
  if (currentLang === 'ja' || !ansText) return ansText;
  if (currentLang === 'uk') {
    return ansText
      .replace(/と/g, ' і ')
      .replace(/の最大公約数/g, ' НСД')
      .replace(/の最小公倍数/g, ' НСК')
      .replace(/あまり/g, ' остача ');
  }
  return ansText
    .replace(/と/g, ' and ')
    .replace(/の最大公約数/g, ' GCD')
    .replace(/の最小公倍数/g, ' LCM')
    .replace(/あまり/g, ' rem ');
}

export function questTextI18n(q, fallback) {
  if (currentLang === 'ja' || !q) return fallback;
  const id = q.id || '';
  const isUk = currentLang === 'uk';
  if (id === 'play1') return isUk ? 'Зіграти 1 раунд тренування' : 'Play 1 session of math drill';
  if (id === 'play2') return isUk ? 'Зіграти 2 раунди тренувань' : 'Play 2 sessions of math drill';
  if (id === 'combo5') return isUk ? 'Досягти 5 комбо' : 'Achieve a 5-combo';
  if (id === 'combo10') return isUk ? 'Досягти 10 комбо' : 'Achieve a 10-combo';
  if (id === 'combo20') return isUk ? 'Досягти 20 комбо' : 'Achieve a 20-combo';
  if (id === 'first5') return isUk ? '5 правильних з 1-ї спроби' : '5 first-try correct';
  if (id === 'review1' || id === 'review') return isUk ? '1 виправлена помилка' : 'Review 1 mistake';
  if (id === 'new1') return isUk ? '1 завдання з нової навички' : '1 problem from a new skill';
  if (id === 'extra') return isUk ? 'Увійти до додаткового раунду' : 'Enter the Extra Stage';
  if (id === 'extra5') return isUk ? 'Розвʼязати 5 завдань в екстра' : 'Solve 5 problems in Extra';
  if (id === 'perfect') return isUk ? 'Пройти раунд на 100 балів' : 'Clear with 100 points';
  if (id === 'grade1' || id === 'grade') return isUk ? 'Зіграти 1 раунд у розділі класів' : 'Play 1 session in Grade mode';
  if (id === 'learn10') return isUk ? '10 завдань навичок, що вивчаються' : 'Solve 10 problems of learning skills';
  if (id === 'polish') {
    const sName = (q.skill && skillName(q.skill)) || q.skill || '';
    return isUk ? `Освіжити «${sName}» (3 завдання)` : `Polish "${sName}" (3 Qs)`;
  }
  if (id === 'speed') return isUk ? 'Розвʼязати завдання швидше ніж за 2.5 с' : 'Solve a problem under 2.5s';
  return fallback;
}
