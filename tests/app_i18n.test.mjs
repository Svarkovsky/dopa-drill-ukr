import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getLanguage, setLanguage, t, skillName, laneName,
  problemTitle, stepLabel, nextStarI18n, monthYearText,
  dayLogTitleText, questTextI18n, formatDopaValue,
  trophyItemName, trophyItemDesc, trophySeriesTitle,
  cellTextI18n, problemHelpText, answerTextI18n
} from '../app/js/i18n.js';
import { SKILLS } from '../app/js/skills.js';
import { TROPHIES, SERIES } from '../app/js/trophies.js';

test('i18n default language and switching', () => {
  // Reset to uk
  setLanguage('uk');
  assert.equal(getLanguage(), 'uk');
  assert.equal(t('appTitle'), 'Допа Дріл (Dopa Drill)');
  assert.equal(t('correctStampText'), 'Вірно!');
  assert.equal(t('fullScoreBanner'), '100 балів досягнуто!');

  // Switch to ja
  setLanguage('ja');
  assert.equal(getLanguage(), 'ja');
  assert.equal(t('appTitle'), 'ドパドリル');
  assert.equal(t('correctStampText'), 'せいかい');

  // Switch to en
  setLanguage('en');
  assert.equal(getLanguage(), 'en');
  assert.equal(t('appTitle'), 'Dopa Drill');
  assert.equal(t('correctStampText'), 'Correct!');

  // Switch back to uk
  setLanguage('uk');
  assert.equal(getLanguage(), 'uk');
});

test('every skill has a Ukrainian name mapping', () => {
  setLanguage('uk');
  assert.equal(SKILLS.length, 58);
  for (const sk of SKILLS) {
    const uk = skillName(sk.id);
    assert.ok(uk, `Missing Ukrainian translation for skill: ${sk.id} (${sk.name})`);
    assert.notEqual(uk.trim(), '');
  }
});

test('problemTitle and stepLabel translate accurately', () => {
  setLanguage('uk');
  assert.equal(problemTitle('あまりのあるわりざん'), 'Ділення з остачею');
  assert.equal(problemTitle('分数のたしひき'), 'Додавання та віднімання дробів');
  assert.equal(problemTitle('小数のかけざん'), 'Множення десяткових дробів');
  assert.equal(stepLabel('一の位'), 'Одиниці');
  assert.equal(stepLabel('くりあがり'), 'Перенесення');
  assert.equal(stepLabel('あまり'), 'Остача');
  assert.equal(stepLabel('2をかける'), 'Помножити на 2');
  assert.equal(stepLabel('たす（一の位）'), 'Додати (Одиниці)');
  assert.equal(stepLabel('商の一の位'), 'Частка (Одиниці)');
  assert.equal(cellTextI18n('最大公約数'), 'НСД');
  assert.equal(cellTextI18n('あまり'), 'остача');
  assert.equal(cellTextI18n('十の位まで'), 'до десятків');
  assert.equal(problemHelpText('どちらも わりきれる 数'), 'Спільний дільник: ділить обидва числа');
  assert.equal(answerTextI18n('14と42の最大公約数 ＝ 7'), '14 і 42 НСД ＝ 7');

  setLanguage('en');
  assert.equal(problemTitle('あまりのあるわりざん'), 'Division with Remainder');
  assert.equal(problemTitle('小数のかけざん'), 'Decimal Multiplication');
  assert.equal(stepLabel('一の位'), 'Ones');
  assert.equal(stepLabel('2をかける'), 'Multiply by 2');
  assert.equal(stepLabel('たす（一の位）'), 'Add (Ones)');
  assert.equal(cellTextI18n('最大公約数'), 'GCD');
  assert.equal(problemHelpText('どちらも わりきれる 数'), 'Common factor: divides both');

  setLanguage('ja');
  assert.equal(problemTitle('あまりのあるわりざん'), 'あまりのあるわりざん');
  assert.equal(stepLabel('一の位'), '一の位');
  assert.equal(stepLabel('2をかける'), '2をかける');
  assert.equal(cellTextI18n('最大公約数'), '最大公約数');
  assert.equal(problemHelpText('どちらも わりきれる 数'), 'どちらも わりきれる 数');
});

test('nextStarI18n translates star upgrade requirements to Ukrainian', () => {
  setLanguage('uk');
  // ☆2
  const next2 = { n: 2, text: 'さいきん 10もんの 初回正解が 80% いじょう', now: 'いま 6もん・83%' };
  const res2 = nextStarI18n(next2);
  assert.match(res2.text, /Влучність з 1-ї спроби за останні 10 завдань від 80%/);
  assert.match(res2.now, /Зараз 6 завд\. · 83%/);

  // ☆3
  const next3 = { n: 3, text: '1もんを だいたい 2.5びょう いないで とく', now: 'いま 2.1びょう（4/5もん）' };
  const res3 = nextStarI18n(next3);
  assert.match(res3.text, /Середній час на завдання до 2\.5 с/);
  assert.match(res3.now, /Зараз 2\.1 с \(4\/5 завд\.\)/);

  // ☆4
  const next4 = { n: 4, text: '☆3から 7日 たってから、5もん つづけて 初回正解', now: 'あと 3日 まってね' };
  const res4 = nextStarI18n(next4);
  assert.match(res4.text, /Через 7 дн\. після ☆3/);
  assert.match(res4.now, /Зачекай ще 3 дн\./);
});

test('date and calendar formatting in Ukrainian', () => {
  setLanguage('uk');
  assert.equal(monthYearText(2026, 8), 'Вересень 2026');
  assert.equal(dayLogTitleText(9, 29), 'Записи за 29 вересня');
});

test('questTextI18n translations', () => {
  setLanguage('uk');
  assert.equal(questTextI18n({ id: 'play1' }, 'fallback'), 'Зіграти 1 раунд тренування');
  assert.equal(questTextI18n({ id: 'combo5' }, 'fallback'), 'Досягти 5 комбо');
  assert.equal(questTextI18n({ id: 'extra' }, 'fallback'), 'Увійти до додаткового раунду');
});

test('trophy translations cover all series and items without empty results', () => {
  setLanguage('uk');

  // Verify series titles
  for (const s of SERIES) {
    const title = trophySeriesTitle(s.key, s.title);
    assert.ok(title, `Missing title for series ${s.key}`);
    assert.notEqual(title.trim(), '');
  }

  // Verify specific series titles
  assert.equal(trophySeriesTitle('streak', 'れんぞくで あそぶ'), 'Серія тренувань');
  assert.equal(trophySeriesTitle('items', 'コレクション'), 'Збирання колекції');
  assert.equal(trophySeriesTitle('unlocked', 'スキル かいほう'), 'Відкрито навичок');
  assert.equal(trophySeriesTitle('stickers', 'ログインシール'), 'Штампи календаря');
  assert.equal(trophySeriesTitle('dopa', 'ドパ'), 'Допа-енергія');

  // Verify all trophies have non-empty Ukrainian name and desc
  assert.ok(TROPHIES.length > 300, `Expected 300+ trophies, found ${TROPHIES.length}`);
  for (const t of TROPHIES) {
    const name = trophyItemName(t);
    const desc = trophyItemDesc(t);
    assert.ok(name, `Missing name for trophy ${t.id}`);
    assert.ok(desc, `Missing desc for trophy ${t.id}`);
    assert.notEqual(name.trim(), '');
    assert.notEqual(desc.trim(), '');
  }

  // Verify sample item translations
  const tStreak3 = TROPHIES.find((x) => x.id === 'streak-3');
  assert.equal(trophyItemName(tStreak3), 'Серія 3 дн.');

  const tItems10 = TROPHIES.find((x) => x.id === 'items-10');
  assert.equal(trophyItemName(tItems10), 'Предметів: 10');

  const tUnlocked3 = TROPHIES.find((x) => x.id === 'unlocked-3');
  assert.equal(trophyItemName(tUnlocked3), 'Відкрито 3');

  const tSecretSunday = TROPHIES.find((x) => x.id === 'secret-sunday');
  assert.equal(trophyItemName(tSecretSunday), 'Недільна математика');
});

test('settings credits translations in all supported languages', () => {
  setLanguage('uk');
  assert.equal(t('setCreditsLabel'), 'Про проєкт та подяка');
  assert.ok(t('setCreditsDesc').includes('@grmchn4ai'));
  assert.equal(t('setCreditsRepo'), 'Репозиторій автора на GitHub');

  setLanguage('ja');
  assert.equal(t('setCreditsLabel'), 'クレジット');
  assert.ok(t('setCreditsDesc').includes('@grmchn4ai'));
  assert.equal(t('setCreditsRepo'), 'GitHub 原作リポジトリ');

  setLanguage('en');
  assert.equal(t('setCreditsLabel'), 'Credits & Thanks');
  assert.ok(t('setCreditsDesc').includes('@grmchn4ai'));
  assert.equal(t('setCreditsRepo'), 'Original GitHub Repository');

  // Reset to default
  setLanguage('uk');
});
