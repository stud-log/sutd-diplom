// Record указывает, что у нас будет обьект, в котором в качестве ключа у нас будет первый аргумент, а в качестве значения - второй
type Mods = Record<string, boolean | string>

/**
 *
 * @param cls - главный класс
 * @param mods - ключи - названия классов, значения - добавлять их или нет
 * @param additional - доп классы
 * @returns
 */
export function classNames (cls: string, mods: Mods = {}, additional: Array<string | undefined> = []) {
  return [
    cls,
    ...additional.filter(Boolean),
    Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className, _]) => className)
  ].join(' ').trim()
}
