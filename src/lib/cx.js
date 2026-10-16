/** Unisce classi CSS ignorando i valori falsy: cx('a', cond && 'b'). */
export const cx = (...classes) => classes.filter(Boolean).join(' ')
